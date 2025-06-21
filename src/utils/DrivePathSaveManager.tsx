import { VideoFile } from '../types/video-player-types';

export interface SaveSettings {
  customPath: string;
  useCustomPath: boolean;
  saveMethod: 'downloads' | 'directory' | 'auto';
  selectedDirectoryName?: string; // For File System Access API
}

export class DrivePathSaveManager {
  private static instance: DrivePathSaveManager;
  private settings: SaveSettings = {
    customPath: '',
    useCustomPath: false,
    saveMethod: 'auto',
  };
  private directoryHandle: any = null; // File System Access API handle

  private constructor() {
    this.loadSettings();
  }

  public static getInstance(): DrivePathSaveManager {
    if (!DrivePathSaveManager.instance) {
      DrivePathSaveManager.instance = new DrivePathSaveManager();
    }
    return DrivePathSaveManager.instance;
  }

  /**
   * Load settings from Chrome storage
   */
  private async loadSettings(): Promise<void> {
    try {
      if (typeof chrome !== 'undefined' && chrome.storage) {
        const result = await chrome.storage.local.get([
          'videoPlayer_saveSettings',
        ]);
        if (result.videoPlayer_saveSettings) {
          this.settings = {
            ...this.settings,
            ...result.videoPlayer_saveSettings,
          };
        }
      }
    } catch (error) {
      console.error('Failed to load save settings:', error);
    }
  }

  /**
   * Save settings to Chrome storage
   */
  private async saveSettings(): Promise<void> {
    try {
      if (typeof chrome !== 'undefined' && chrome.storage) {
        await chrome.storage.local.set({
          videoPlayer_saveSettings: this.settings,
        });
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  }

  /**
   * Check if path looks like an absolute drive path (Windows: C:\, D:\, etc.)
   */
  private isAbsoluteDrivePath(path: string): boolean {
    // Windows drive pattern: C:\, D:\, G:\, etc.
    const windowsDrivePattern = /^[A-Za-z]:[\\\/]/;
    // Unix absolute path: /home, /usr, etc.
    const unixAbsolutePattern = /^\/[^\/]/;

    return windowsDrivePattern.test(path) || unixAbsolutePattern.test(path);
  }

  /**
   * Set custom save path or select directory for absolute paths
   */
  public async setCustomPath(
    path: string
  ): Promise<{ success: boolean; message: string }> {
    // If it's an absolute drive path, we need to use directory picker
    if (this.isAbsoluteDrivePath(path)) {
      return await this.selectDirectoryForAbsolutePath(path);
    } else {
      // Relative path - use Downloads API
      this.settings.customPath = path;
      this.settings.useCustomPath = true;
      await this.saveSettings();
      return {
        success: true,
        message: `Custom path set: ${path}`,
      };
    }
  }

  /**
   * Use File System Access API to select directory for absolute paths
   */
  private async selectDirectoryForAbsolutePath(
    suggestedPath: string
  ): Promise<{ success: boolean; message: string }> {
    if (!this.isFileSystemAccessSupported()) {
      return {
        success: false,
        message: 'Drive paths require Chrome 86+. Use relative paths instead.',
      };
    }

    try {
      // Ask user to select the directory
      this.directoryHandle = await (window as any).showDirectoryPicker({
        mode: 'readwrite',
        startIn: 'documents', // Starting point for picker
      });

      // Store the directory info
      this.settings.customPath = suggestedPath;
      this.settings.useCustomPath = true;
      this.settings.selectedDirectoryName = this.directoryHandle.name;
      this.settings.saveMethod = 'directory'; // Force directory method
      await this.saveSettings();

      return {
        success: true,
        message: `Directory selected: ${this.directoryHandle.name}`,
      };
    } catch (error: any) {
      if (error.name === 'AbortError') {
        return {
          success: false,
          message: 'Directory selection cancelled',
        };
      }
      return {
        success: false,
        message: `Failed to select directory: ${error.message}`,
      };
    }
  }

  /**
   * Save file with enhanced drive support
   */
  public async saveFile(
    video: VideoFile,
    newName?: string
  ): Promise<{ success: boolean; message: string }> {
    const fileName = newName || video.name;
    const fileExtension = this.getFileExtension(video.originalName);
    const fullFileName = fileName.endsWith(fileExtension)
      ? fileName
      : `${fileName}${fileExtension}`;

    // If we have a directory handle (for absolute paths), use it
    if (this.directoryHandle && this.settings.useCustomPath) {
      return await this.saveToSelectedDirectory(video, fullFileName);
    }

    // For relative paths, use Downloads API
    if (
      this.settings.useCustomPath &&
      this.settings.customPath &&
      !this.isAbsoluteDrivePath(this.settings.customPath)
    ) {
      return await this.saveWithDownloadsAPI(video, fullFileName);
    }

    // Fallback methods
    if (
      this.settings.saveMethod === 'directory' ||
      (this.settings.saveMethod === 'auto' &&
        this.isFileSystemAccessSupported())
    ) {
      return await this.saveWithDirectoryPicker(video, fullFileName);
    }

    return await this.saveWithDownloadsAPI(video, fullFileName);
  }

  /**
   * Save to previously selected directory (for drive paths like G:\ws)
   */
  private async saveToSelectedDirectory(
    video: VideoFile,
    fileName: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      if (!this.directoryHandle) {
        throw new Error('No directory selected');
      }

      // Create file handle in the selected directory
      const fileHandle = await this.directoryHandle.getFileHandle(fileName, {
        create: true,
      });

      const writable = await fileHandle.createWritable();
      const arrayBuffer = await video.file.arrayBuffer();
      await writable.write(arrayBuffer);
      await writable.close();

      return {
        success: true,
        message: `Saved to: ${this.settings.selectedDirectoryName}/${fileName}`,
      };
    } catch (error: any) {
      console.error('Directory save failed:', error);
      // Try to re-select directory if it failed
      if (
        error.name === 'NotFoundError' ||
        error.message.includes('directory')
      ) {
        const reselect = await this.selectDirectoryForAbsolutePath(
          this.settings.customPath
        );
        if (reselect.success) {
          return await this.saveToSelectedDirectory(video, fileName);
        }
      }

      return {
        success: false,
        message: `Save failed: ${error.message}`,
      };
    }
  }

  /**
   * Save with directory picker (one-time selection)
   */
  private async saveWithDirectoryPicker(
    video: VideoFile,
    fileName: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      if (!this.directoryHandle) {
        this.directoryHandle = await (window as any).showDirectoryPicker({
          mode: 'readwrite',
        });

        // Store directory info for future use
        this.settings.selectedDirectoryName = this.directoryHandle.name;
        await this.saveSettings();
      }

      return await this.saveToSelectedDirectory(video, fileName);
    } catch (error: any) {
      if (error.name === 'AbortError') {
        return { success: false, message: 'Save cancelled by user' };
      }
      console.error('Directory picker failed:', error);
      return await this.saveWithDownloadsAPI(video, fileName);
    }
  }

  /**
   * Save using Downloads API (for relative paths within user directory)
   */
  private async saveWithDownloadsAPI(
    video: VideoFile,
    fileName: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const arrayBuffer = await video.file.arrayBuffer();
      const blob = new Blob([arrayBuffer], { type: video.file.type });
      const blobUrl = URL.createObjectURL(blob);

      // Construct download path
      let downloadPath = fileName;
      if (this.settings.useCustomPath && this.settings.customPath) {
        downloadPath = `${this.settings.customPath}/${fileName}`.replace(
          /\/+/g,
          '/'
        );
      }

      if (typeof chrome !== 'undefined' && chrome.downloads) {
        // Use Chrome Downloads API
        await new Promise<void>((resolve, reject) => {
          chrome.downloads.download(
            {
              url: blobUrl,
              filename: downloadPath,
              saveAs: false,
            },
            (id) => {
              if (chrome.runtime.lastError) {
                reject(new Error(chrome.runtime.lastError.message));
              } else {
                resolve();
              }
            }
          );
        });

        setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);

        return {
          success: true,
          message: `Downloaded to: ${downloadPath}`,
        };
      } else {
        // Fallback to standard download
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = fileName;
        link.style.display = 'none';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);

        return {
          success: true,
          message: `Downloaded: ${fileName}`,
        };
      }
    } catch (error: any) {
      return {
        success: false,
        message: `Download failed: ${error.message}`,
      };
    }
  }

  /**
   * Reset directory selection (for when user wants to choose a different drive)
   */
  public async resetDirectorySelection(): Promise<void> {
    this.directoryHandle = null;
    this.settings.selectedDirectoryName = undefined;
    await this.saveSettings();
  }

  /**
   * Get current settings
   */
  public getSettings(): SaveSettings {
    return { ...this.settings };
  }

  /**
   * Update save method
   */
  public async setSaveMethod(
    method: 'downloads' | 'directory' | 'auto'
  ): Promise<void> {
    this.settings.saveMethod = method;
    await this.saveSettings();
  }

  /**
   * Toggle custom path usage
   */
  public async toggleCustomPath(enabled: boolean): Promise<void> {
    this.settings.useCustomPath = enabled;
    await this.saveSettings();
  }

  /**
   * Validate path and determine if it needs directory selection
   */
  public validatePath(path: string): {
    valid: boolean;
    message?: string;
    needsDirectorySelection?: boolean;
  } {
    if (!path.trim()) {
      return { valid: false, message: 'Path cannot be empty' };
    }

    // Check for invalid characters
    const invalidChars = /[<>"|?*]/;
    if (invalidChars.test(path)) {
      return { valid: false, message: 'Path contains invalid characters' };
    }

    // Check if it's an absolute drive path
    if (this.isAbsoluteDrivePath(path)) {
      if (!this.isFileSystemAccessSupported()) {
        return {
          valid: false,
          message:
            'Drive paths require Chrome 86+. Use relative paths like "Videos/MyFolder" instead.',
        };
      }
      return {
        valid: true,
        needsDirectorySelection: true,
        message: 'This drive path will require directory selection',
      };
    }

    return { valid: true };
  }

  /**
   * Get path examples based on detected OS
   */
  public getPathExamples(): { relative: string[]; absolute: string[] } {
    const userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.includes('win')) {
      return {
        relative: ['Videos/VideoPlayer', 'Documents/Videos', 'Desktop/Videos'],
        absolute: ['C:\\Projects\\Videos', 'D:\\Storage\\Videos', 'G:\\ws'],
      };
    } else if (userAgent.includes('mac')) {
      return {
        relative: ['Movies/VideoPlayer', 'Documents/Videos', 'Desktop/Videos'],
        absolute: ['/Users/username/Projects', '/Volumes/External/Videos'],
      };
    } else {
      return {
        relative: ['Videos/VideoPlayer', 'Documents/Videos', 'Desktop/Videos'],
        absolute: ['/home/username/projects', '/mnt/external/videos'],
      };
    }
  }

  /**
   * Get current save status
   */
  public getSaveStatusInfo(): string {
    if (this.directoryHandle) {
      return `📁 ${this.settings.selectedDirectoryName || 'Selected Directory'}`;
    }
    if (this.settings.useCustomPath && this.settings.customPath) {
      return `📂 ${this.settings.customPath}`;
    }
    return 'Downloads folder';
  }

  /**
   * Rename file virtually
   */
  public renameFile(
    videos: VideoFile[],
    fileId: string,
    newName: string
  ): VideoFile[] {
    return videos.map((video) => {
      if (video.id === fileId) {
        const fileExtension = this.getFileExtension(video.originalName);
        const fullNewName = newName.endsWith(fileExtension)
          ? newName
          : `${newName}${fileExtension}`;

        return {
          ...video,
          name: fullNewName,
          isRenamed: fullNewName !== video.originalName,
        };
      }
      return video;
    });
  }

  /**
   * Save multiple files
   */
  public async saveMultipleFiles(
    videos: VideoFile[]
  ): Promise<{ saved: number; failed: number; messages: string[] }> {
    const results = {
      saved: 0,
      failed: 0,
      messages: [] as string[],
    };

    for (const video of videos) {
      try {
        const result = await this.saveFile(video);
        if (result.success) {
          results.saved++;
          results.messages.push(`✅ ${result.message}`);
        } else {
          results.failed++;
          results.messages.push(`❌ ${result.message}`);
        }

        await new Promise((resolve) => setTimeout(resolve, 200));
      } catch (error: any) {
        results.failed++;
        results.messages.push(`❌ Failed: ${video.name} - ${error.message}`);
      }
    }

    return results;
  }

  /**
   * Check if File System Access API is supported
   */
  private isFileSystemAccessSupported(): boolean {
    return 'showDirectoryPicker' in window;
  }

  /**
   * Get file extension
   */
  private getFileExtension(filename: string): string {
    const lastDot = filename.lastIndexOf('.');
    return lastDot > 0 ? filename.slice(lastDot) : '';
  }
}
