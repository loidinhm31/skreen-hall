import React, { useCallback, useRef } from 'react';

import { VideoFile } from '../../types/video-player-types';
import { useVideoPlayer } from '../../hook/useVideoPlayer';

const FileControls: React.FC = () => {
  const { setVideos, setError, setIsLoading } = useVideoPlayer();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isVideoFile = (file: File): boolean => {
    return file.type.startsWith('video/') || hasVideoExtension(file.name);
  };

  const hasVideoExtension = (filename: string): boolean => {
    const videoExtensions = [
      '.mp4',
      '.webm',
      '.ogg',
      '.mov',
      '.avi',
      '.mkv',
      '.m4v',
      '.3gp',
    ];
    const extension = filename
      .toLowerCase()
      .substring(filename.lastIndexOf('.'));
    return videoExtensions.includes(extension);
  };

  // UPDATED: Add originalName and isRenamed fields
  const createVideoFile = (file: File): VideoFile => ({
    file,
    url: URL.createObjectURL(file),
    name: file.name,
    originalName: file.name, // Store original name
    size: file.size,
    id: `${file.name}-${file.size}-${file.lastModified}`,
    isRenamed: false, // Initially false
  });

  const handleFileSelection = useCallback(
    (fileList: FileList | null) => {
      if (!fileList) return;

      const videoFiles = Array.from(fileList).filter(isVideoFile);

      if (videoFiles.length === 0) {
        setError(
          'No valid video files selected. Please select video files (MP4, WebM, OGG, MOV, AVI, MKV).'
        );
        return;
      }

      setError(null);
      const videos = videoFiles.map(createVideoFile);
      setVideos(videos);
    },
    [setVideos, setError]
  );

  const handleFolderSelection = useCallback(async () => {
    if (!('showDirectoryPicker' in window)) {
      setError(
        'Folder access is not supported in this browser. Please use Chrome 86+ or select individual files.'
      );
      return;
    }

    try {
      setIsLoading(true);
      const directoryHandle = await (window as any).showDirectoryPicker();
      const files: File[] = [];

      for await (const entry of directoryHandle.values()) {
        if (entry.kind === 'file') {
          const file = await entry.getFile();
          if (isVideoFile(file)) {
            files.push(file);
          }
        }
      }

      if (files.length === 0) {
        setError('No video files found in the selected folder.');
        return;
      }

      files.sort((a, b) => a.name.localeCompare(b.name));
      const videos = files.map(createVideoFile);
      setVideos(videos);
      setError(null);
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        setError(`Error accessing folder: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  }, [setVideos, setError, setIsLoading]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      handleFileSelection(e.dataTransfer.files);
    },
    [handleFileSelection]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

  return (
    <div
      style={{
        background: 'rgba(0, 0, 0, 0.2)',
        padding: '25px',
        borderRadius: '12px',
        margin: '30px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
        }}
      >
        <div
          style={{
            position: 'relative',
            display: 'inline-block',
            width: '100%',
          }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input
            ref={fileInputRef}
            type='file'
            multiple
            accept='video/*'
            onChange={(e) => handleFileSelection(e.target.files)}
            style={{
              position: 'absolute',
              opacity: 0,
              width: '100%',
              height: '100%',
              cursor: 'pointer',
            }}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '15px 25px',
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              border: '2px dashed rgba(255, 255, 255, 0.3)',
              borderRadius: '8px',
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textAlign: 'center',
              minHeight: '60px',
            }}
          >
            <span>📁</span>
            <span>Select Video Files or Drop Here</span>
          </div>
        </div>

        <button
          onClick={handleFolderSelection}
          disabled={!('showDirectoryPicker' in window)}
          style={{
            padding: '15px 25px',
            background:
              'showDirectoryPicker' in window
                ? 'linear-gradient(45deg, #4CAF50, #45a049)'
                : 'rgba(128, 128, 128, 0.5)',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'showDirectoryPicker' in window ? 'pointer' : 'not-allowed',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            opacity: 'showDirectoryPicker' in window ? 1 : 0.5,
          }}
        >
          <span>📂</span>
          <span>
            Open Folder {!('showDirectoryPicker' in window) && '(Chrome 86+)'}
          </span>
        </button>
      </div>

      {/* UPDATED: Enhanced info section */}
      <div
        style={{
          marginTop: '15px',
          padding: '12px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '6px',
          fontSize: '12px',
          opacity: 0.9,
        }}
      >
        <div style={{ marginBottom: '6px' }}>
          <strong>✅ Supported formats:</strong> MP4, WebM, OGG, MOV, AVI, MKV
        </div>
        <div style={{ marginBottom: '6px' }}>
          <strong>🏷️ File operations:</strong> Click-to-select, rename,
          auto-save
        </div>
        <div style={{ marginBottom: '6px' }}>
          <strong>💾 Save method:</strong> Directory access (Chrome 86+) or
          auto-download
        </div>
        <div style={{ color: '#FFD700' }}>
          <strong>💡 Tip:</strong> First save will ask for folder permission -
          grant it for seamless saving!
        </div>
      </div>
    </div>
  );
};

export default FileControls;
