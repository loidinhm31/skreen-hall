import React, { useCallback, useEffect, useRef } from 'react';

import { useVideoPlayer } from '../../hook/useKeyboardShortcuts';

const VideoPlayer: React.FC = () => {
  const {
    videos,
    currentVideoIndex,
    isPlaying,
    volume,
    playbackRate,
    setIsPlaying,
    setVolume,
    setPlaybackRate,
    playNext,
  } = useVideoPlayer();

  const videoRef = useRef<HTMLVideoElement>(null);
  const currentVideo = videos[currentVideoIndex];

  useEffect(() => {
    if (videoRef.current && currentVideo) {
      videoRef.current.src = currentVideo.url;
      videoRef.current.load();
      document.title = `Video Player - ${currentVideo.name}`;
    }
  }, [currentVideo]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  const handleVideoEnd = useCallback(() => {
    playNext();
  }, [playNext]);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
  }, [setIsPlaying]);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
  }, [setIsPlaying]);

  if (!currentVideo) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '40px',
          opacity: 0.7,
          fontSize: '18px',
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '15px' }}>🎬</div>
        <div>No video selected</div>
        <div style={{ fontSize: '14px', marginTop: '10px', opacity: 0.7 }}>
          Choose video files or a folder to start playing
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
      }}
    >
      <video
        ref={videoRef}
        controls
        onEnded={handleVideoEnd}
        onPlay={handlePlay}
        onPause={handlePause}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          background: '#000',
        }}
      >
        Your browser does not support the video element.
      </video>
    </div>
  );
};

const VideoPlayerHeader: React.FC = () => {
  return (
    <div
      style={{
        background: 'rgba(0, 0, 0, 0.3)',
        padding: '20px',
        textAlign: 'center',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <h1
        style={{
          fontSize: '28px',
          marginBottom: '8px',
          color: '#FFE4B5',
        }}
      >
        🎬 Video Player
      </h1>
      <p
        style={{
          opacity: 0.8,
          fontSize: '14px',
        }}
      >
        Select video files or folders to play your local media
      </p>
    </div>
  );
};

const VideoPlaylist: React.FC = () => {
  const { videos, currentVideoIndex, setCurrentVideoIndex } = useVideoPlayer();

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const sanitizeFileName = (filename: string): string => {
    return filename.replace(/\.[^/.]+$/, '');
  };

  if (videos.length <= 1) {
    return null;
  }

  return (
    <div
      style={{
        marginTop: '20px',
        maxHeight: '300px',
        overflowY: 'auto',
      }}
    >
      {videos.map((video, index) => (
        <div
          key={video.id}
          onClick={() => setCurrentVideoIndex(index)}
          style={{
            background:
              index === currentVideoIndex
                ? 'linear-gradient(45deg, #667eea, #764ba2)'
                : 'rgba(255, 255, 255, 0.1)',
            margin: '8px 0',
            padding: '12px 15px',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow:
              index === currentVideoIndex
                ? '0 4px 15px rgba(102, 126, 234, 0.3)'
                : 'none',
            transform: index === currentVideoIndex ? 'translateX(5px)' : 'none',
          }}
          onMouseEnter={(e) => {
            if (index !== currentVideoIndex) {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'translateX(5px)';
            }
          }}
          onMouseLeave={(e) => {
            if (index !== currentVideoIndex) {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'none';
            }
          }}
        >
          <span style={{ fontSize: '18px' }}>🎬</span>
          <span style={{ flex: 1, fontWeight: '500' }}>
            {sanitizeFileName(video.name)}
          </span>
          <span style={{ opacity: 0.7, fontSize: '12px' }}>
            {formatFileSize(video.size)}
          </span>
        </div>
      ))}
    </div>
  );
};

export { VideoPlayer, VideoPlayerHeader, VideoPlaylist };
