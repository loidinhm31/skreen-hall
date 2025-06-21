import React, { useCallback, useEffect, useState, Suspense, lazy } from 'react';
import { DrivePathSaveManager, SaveSettings } from '../../utils/DrivePathSaveManager';
import SimpleFileRename from './FileRenameManager';
import { useVideoPlayer } from '../../hook/useVideoPlayer';

// Lazy load the heavy SaveSettingsPanel
const SaveSettingsPanel = lazy(() => import('./SaveSettingsPanel'));

const VideoPlaylist: React.FC = () => {
  const {
    videos,
    currentVideoIndex,
    setCurrentVideoIndex,
    setVideos,
    setError,
  } = useVideoPlayer();
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [saveManager] = useState(() => DrivePathSaveManager.getInstance());
  const [saveSettings, setSaveSettings] = useState<SaveSettings>(
    saveManager.getSettings()
  );
  const [showSettings, setShowSettings] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize save manager on mount
  useEffect(() => {
    const initSaveManager = async () => {
      const currentSettings = saveManager.getSettings();
      setSaveSettings(currentSettings);
      setIsInitialized(true);
    };

    if (!isInitialized) {
      initSaveManager();
    }
  }, [saveManager, isInitialized]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileSelect = useCallback((fileId: string) => {
    setSelectedFiles((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(fileId)) {
        newSet.delete(fileId);
      } else {
        newSet.add(fileId);
      }
      return newSet;
    });
  }, []);

  const handleFileRename = useCallback(
    (fileId: string, newName: string) => {
      if (!newName.trim()) {
        setError('Filename cannot be empty');
        return;
      }

      const updatedVideos = saveManager.renameFile(videos, fileId, newName);
      setVideos(updatedVideos);
      setError(null);
    },
    [videos, setVideos, setError, saveManager]
  );

  const handleFileSave = useCallback(
    async (fileId: string, newName: string) => {
      const video = videos.find((v) => v.id === fileId);
      if (!video) return;

      try {
        const result = await saveManager.saveFile(video, newName);
        if (result.success) {
          setError(`✅ ${result.message}`);
          setTimeout(() => setError(null), 3000);
        } else {
          setError(`❌ ${result.message}`);
        }
      } catch (error) {
        setError('❌ Save failed');
      }
    },
    [videos, saveManager, setError]
  );

  const handlePlayVideo = useCallback(
    (index: number) => {
      setCurrentVideoIndex(index);
    },
    [setCurrentVideoIndex]
  );

  const handleSelectAll = useCallback(() => {
    if (selectedFiles.size === videos.length) {
      setSelectedFiles(new Set());
    } else {
      setSelectedFiles(new Set(videos.map((v) => v.id)));
    }
  }, [videos, selectedFiles.size]);

  const handleResetSelected = useCallback(() => {
    const updatedVideos =
      selectedFiles.size > 0
        ? videos.map((video) => {
          if (selectedFiles.has(video.id)) {
            return { ...video, name: video.originalName, isRenamed: false };
          }
          return video;
        })
        : videos.map((video) => ({
          ...video,
          name: video.originalName,
          isRenamed: false,
        }));

    setVideos(updatedVideos);
    setSelectedFiles(new Set());
    setError(null);
  }, [videos, selectedFiles, setVideos, setError]);

  const handleSaveSelected = useCallback(async () => {
    const filesToSave =
      selectedFiles.size > 0
        ? videos.filter((v) => selectedFiles.has(v.id) && v.isRenamed)
        : videos.filter((v) => v.isRenamed);

    if (filesToSave.length === 0) {
      setError('No renamed files to save');
      return;
    }

    setError(`💾 Saving ${filesToSave.length} files...`);

    try {
      const results = await saveManager.saveMultipleFiles(filesToSave);
      setError(`✅ Saved: ${results.saved}, Failed: ${results.failed}`);
      setTimeout(() => setError(null), 3000);
      setSelectedFiles(new Set());
    } catch (error) {
      setError('❌ Batch save failed');
    }
  }, [videos, selectedFiles, saveManager, setError]);

  const handleSettingsChange = useCallback((newSettings: SaveSettings) => {
    setSaveSettings(newSettings);
  }, []);

  const renamedCount = videos.filter((v) => v.isRenamed).length;
  const selectedCount = selectedFiles.size;

  if (videos.length <= 1) {
    return null;
  }

  return (
    <div style={{ marginTop: '20px' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '15px',
          padding: '12px',
          background: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div>
          <div
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              marginBottom: '4px',
            }}
          >
            📁 Playlist ({videos.length} files)
          </div>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>
            {renamedCount > 0 && (
              <span style={{ color: '#FFD700' }}>{renamedCount} renamed</span>
            )}
            {selectedCount > 0 && (
              <span
                style={{
                  color: '#4CAF50',
                  marginLeft: renamedCount > 0 ? ' • ' : '',
                }}
              >
                {selectedCount} selected
              </span>
            )}
            {renamedCount === 0 && selectedCount === 0 && (
              <span style={{ color: '#888' }}>
                Save:{' '}
                {saveSettings.useCustomPath && saveSettings.customPath
                  ? `📁 ${saveSettings.customPath}`
                  : saveManager.getSaveStatusInfo()}
              </span>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            onClick={() => setShowSettings(true)}
            style={{
              padding: '6px 10px',
              background: saveSettings.useCustomPath
                ? '#FF9800'
                : 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '4px',
              color: 'white',
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
            title='Configure save settings'
          >
            ⚙️ Save Path
          </button>

          <button
            onClick={handleSelectAll}
            style={{
              padding: '6px 12px',
              background:
                selectedFiles.size === videos.length ? '#FF9800' : '#2196F3',
              border: 'none',
              borderRadius: '4px',
              color: 'white',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            {selectedFiles.size === videos.length
              ? 'Deselect All'
              : 'Select All'}
          </button>

          {(renamedCount > 0 || selectedCount > 0) && (
            <>
              <button
                onClick={handleResetSelected}
                style={{
                  padding: '6px 12px',
                  background: '#FF5722',
                  border: 'none',
                  borderRadius: '4px',
                  color: 'white',
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
              >
                Reset {selectedCount > 0 ? 'Selected' : 'All'}
              </button>

              <button
                onClick={handleSaveSelected}
                style={{
                  padding: '6px 12px',
                  background: '#4CAF50',
                  border: 'none',
                  borderRadius: '4px',
                  color: 'white',
                  fontSize: '12px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                💾 Save {selectedCount > 0 ? 'Selected' : 'All'}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Video List */}
      <div
        style={{
          maxHeight: '400px',
          overflowY: 'auto',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          background: 'rgba(0, 0, 0, 0.1)',
        }}
      >
        {videos.map((video, index) => (
          <div
            key={video.id}
            style={{
              background:
                index === currentVideoIndex
                  ? 'linear-gradient(45deg, #667eea, #764ba2)'
                  : 'transparent',
              margin: '0',
              padding: '12px 15px',
              borderBottom:
                index < videos.length - 1
                  ? '1px solid rgba(255, 255, 255, 0.05)'
                  : 'none',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            {/* Video icon and play button */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                minWidth: '60px',
              }}
            >
              <span style={{ fontSize: '16px' }}>🎬</span>
              <button
                onClick={() => handlePlayVideo(index)}
                style={{
                  padding: '4px 8px',
                  background:
                    index === currentVideoIndex
                      ? '#4CAF50'
                      : 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  borderRadius: '4px',
                  color: 'white',
                  fontSize: '10px',
                  cursor: 'pointer',
                  minWidth: '40px',
                }}
              >
                {index === currentVideoIndex ? '▶️' : 'Play'}
              </button>
            </div>

            {/* File rename component */}
            <div style={{ flex: 1 }}>
              <SimpleFileRename
                video={video}
                isSelected={selectedFiles.has(video.id)}
                onSelect={() => handleFileSelect(video.id)}
                onRename={handleFileRename}
                onSave={handleFileSave}
              />
              {video.isRenamed && (
                <div
                  style={{
                    fontSize: '11px',
                    color: '#888',
                    marginTop: '4px',
                    marginLeft: '20px',
                  }}
                >
                  Original: {video.originalName}
                </div>
              )}
            </div>

            {/* File size */}
            <div
              style={{
                fontSize: '12px',
                opacity: 0.7,
                minWidth: '60px',
                textAlign: 'right',
              }}
            >
              {formatFileSize(video.size)}
            </div>
          </div>
        ))}
      </div>

      {/* Quick info */}
      <div
        style={{
          marginTop: '10px',
          padding: '8px 12px',
          background: 'rgba(0, 0, 0, 0.2)',
          borderRadius: '6px',
          fontSize: '11px',
          opacity: 0.8,
          textAlign: 'center',
        }}
      >
        💡 Click circles to select • Click ✏️ to rename • 💾 saves to:{' '}
        {saveSettings.useCustomPath && saveSettings.customPath
          ? saveSettings.customPath
          : 'default location'}
      </div>

      {/* Lazy Load Save Settings Panel */}
      {showSettings && (
        <Suspense
          fallback={
            <div style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              background: 'rgba(0,0,0,0.8)',
              padding: '20px',
              borderRadius: '8px'
            }}>
              Loading settings...
            </div>
          }
        >
          <SaveSettingsPanel
            isOpen={showSettings}
            onClose={() => setShowSettings(false)}
            onSettingsChange={handleSettingsChange}
          />
        </Suspense>
      )}
    </div>
  );
};

export default VideoPlaylist;