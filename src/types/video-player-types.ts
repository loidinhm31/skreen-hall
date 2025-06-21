export interface VideoFile {
  file: File;
  url: string;
  name: string;
  originalName: string;
  size: number;
  id: string;
  isRenamed: boolean;
  duration?: number;
  thumbnail?: string;
}

export interface RenameFileAction {
  fileId: string;
  newName: string;
  oldName: string;
}

export interface FileOperationResult {
  success: boolean;
  message: string;
  newFileHandle?: any;
}

// Extend Window interface for File System Access API
declare global {
  interface Window {
    showDirectoryPicker?: () => Promise<FileSystemDirectoryHandle>;
    showOpenFilePicker?: (options?: any) => Promise<FileSystemFileHandle[]>;
  }
}

export interface VideoPlayerContextType {
  videos: VideoFile[];
  currentVideoIndex: number;
  isPlaying: boolean;
  volume: number;
  playbackRate: number;
  isFullscreen: boolean;
  isLoading: boolean;
  error: string | null;
  setVideos: (videos: VideoFile[]) => void;
  setCurrentVideoIndex: (index: number) => void;
  setIsPlaying: (playing: boolean) => void;
  setVolume: (volume: number) => void;
  setPlaybackRate: (rate: number) => void;
  setIsFullscreen: (fullscreen: boolean) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  playNext: () => void;
  playPrevious: () => void;
}

export interface VideoPlayerProps {
  className?: string;
  style?: React.CSSProperties;
  onVideoLoad?: (video: VideoFile) => void;
  onVideoEnd?: (video: VideoFile) => void;
  onError?: (error: string) => void;
}

export interface PlaylistProps {
  videos: VideoFile[];
  currentIndex: number;
  onVideoSelect: (index: number) => void;
  onVideoRemove?: (index: number) => void;
  showThumbnails?: boolean;
  maxHeight?: number;
}

export interface VideoControlsProps {
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  playbackRate: number;
  onPlayPause: () => void;
  onVolumeChange: (volume: number) => void;
  onSeek: (time: number) => void;
  onPlaybackRateChange: (rate: number) => void;
  onFullscreen: () => void;
}

// Storage keys for video player settings
export const VIDEO_PLAYER_STORAGE_KEYS = {
  SETTINGS: 'videoPlayer_settings',
  RECENT_FILES: 'videoPlayer_recentFiles',
  BOOKMARKS: 'videoPlayer_bookmarks',
  PLAYBACK_HISTORY: 'videoPlayer_playbackHistory',
} as const;

export interface VideoFile {
  file: File;
  url: string;
  name: string;
  size: number;
  id: string;
}
