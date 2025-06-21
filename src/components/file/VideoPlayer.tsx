import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useVideoPlayer } from '../../hook/useVideoPlayer';

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
  const [showControls, setShowControls] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showVolumeNotification, setShowVolumeNotification] = useState(false);
  const [showPlaybackRateNotification, setShowPlaybackRateNotification] = useState(false);

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

  // Auto-hide controls
  useEffect(() => {
    // @ts-ignore
    let timer: NodeJS.Timeout;

    const resetTimer = () => {
      setShowControls(true);
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    };

    resetTimer();

    return () => clearTimeout(timer);
  }, [isPlaying]);

  const handleVideoEnd = useCallback(() => {
    playNext();
  }, [playNext]);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
  }, [setIsPlaying]);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
  }, [setIsPlaying]);

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  }, []);

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlayPause = useCallback(() => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, []);

  const handleMouseMove = useCallback(() => {
    setShowControls(true);
  }, []);

  // Enhanced volume change with notification
  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);

    // Show volume notification
    setShowVolumeNotification(true);
    setTimeout(() => setShowVolumeNotification(false), 1500);
  }, [setVolume]);

  // Enhanced playback rate change with notification
  const handlePlaybackRateChange = useCallback(() => {
    const newRate = playbackRate === 1 ? 1.5 : playbackRate === 1.5 ? 2 : 1;
    setPlaybackRate(newRate);

    // Show playback rate notification
    setShowPlaybackRateNotification(true);
    setTimeout(() => setShowPlaybackRateNotification(false), 1500);
  }, [playbackRate, setPlaybackRate]);

  if (!currentVideo) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          textAlign: 'center',
          background: 'rgba(0, 0, 0, 0.2)',
          borderRadius: '12px',
          border: '2px dashed rgba(255, 255, 255, 0.3)',
        }}
      >
        <div style={{ fontSize: '64px', marginBottom: '20px', opacity: 0.7 }}>
          🎬
        </div>
        <div
          style={{ fontSize: '24px', marginBottom: '10px', fontWeight: 'bold' }}
        >
          No Video Selected
        </div>
        <div style={{ fontSize: '16px', opacity: 0.8 }}>
          Choose video files to start playing
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '900px',
          margin: '0 auto',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          background: '#000',
        }}
      >
        {/* Video Element */}
        <video
          ref={videoRef}
          onEnded={handleVideoEnd}
          onPlay={handlePlay}
          onPause={handlePause}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onMouseMove={handleMouseMove}
          onClick={togglePlayPause}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            background: '#000',
            cursor: showControls ? 'pointer' : 'none',
          }}
        >
          Your browser does not support the video element.
        </video>

        {/* Custom Controls Overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.8))',
            padding: '20px',
            opacity: showControls ? 1 : 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: showControls ? 'auto' : 'none',
          }}
        >
          {/* Progress Bar */}
          <div
            style={{
              marginBottom: '15px',
            }}
          >
            <input
              type='range'
              min={0}
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              style={{
                width: '100%',
                height: '4px',
                background: 'rgba(255, 255, 255, 0.3)',
                borderRadius: '2px',
                outline: 'none',
                cursor: 'pointer',
              }}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '12px',
                marginTop: '5px',
                opacity: 0.8,
              }}
            >
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Control Buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
            }}
          >
            {/* Play/Pause */}
            <button
              onClick={togglePlayPause}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderRadius: '50%',
                width: '45px',
                height: '45px',
                color: 'white',
                fontSize: '18px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {isPlaying ? '⏸️' : '▶️'}
            </button>

            {/* Current Video Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: currentVideo.isRenamed ? '#FFD700' : 'white',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {currentVideo.name}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  opacity: 0.7,
                  display: 'flex',
                  gap: '10px',
                }}
              >
                <span>
                  {currentVideoIndex + 1} of {videos.length}
                </span>
                {currentVideo.isRenamed && (
                  <span style={{ color: '#FFD700' }}>• Renamed</span>
                )}
              </div>
            </div>

            {/* Volume Control */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                minWidth: '120px',
              }}
            >
              <span style={{ fontSize: '16px' }}>🔊</span>
              <input
                type='range'
                min={0}
                max={1}
                step={0.1}
                value={volume}
                onChange={handleVolumeChange}
                style={{
                  width: '80px',
                  height: '3px',
                  background: 'rgba(255, 255, 255, 0.3)',
                  borderRadius: '2px',
                  outline: 'none',
                  cursor: 'pointer',
                }}
              />
            </div>

            {/* Playback Speed */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <button
                onClick={handlePlaybackRateChange}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '6px 10px',
                  color: 'white',
                  fontSize: '12px',
                  cursor: 'pointer',
                  minWidth: '40px',
                }}
              >
                {playbackRate}x
              </button>
            </div>

            {/* Fullscreen */}
            <button
              onClick={() => {
                if (videoRef.current && videoRef.current.requestFullscreen) {
                  videoRef.current.requestFullscreen();
                }
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderRadius: '4px',
                padding: '8px 12px',
                color: 'white',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              ⛶
            </button>
          </div>
        </div>

        {/* Video Title Overlay (top) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(rgba(0, 0, 0, 0.8), transparent)',
            padding: '20px',
            opacity: showControls ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          <div
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: currentVideo.isRenamed ? '#FFD700' : 'white',
            }}
          >
            {currentVideo.name}
          </div>
          {currentVideo.isRenamed && (
            <div
              style={{
                fontSize: '12px',
                color: '#888',
                marginTop: '4px',
              }}
            >
              Original: {currentVideo.originalName}
            </div>
          )}
        </div>
      </div>

      {/* Volume notification */}
      {showVolumeNotification && (
        <div
          style={{
            position: 'fixed',
            top: '20%',
            right: '20px',
            background: 'rgba(0, 0, 0, 0.9)',
            color: 'white',
            padding: '15px 20px',
            borderRadius: '8px',
            fontSize: '16px',
            fontFamily: 'Arial, sans-serif',
            zIndex: 1000002,
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
            textAlign: 'center',
            animation: 'slideInRight 0.3s ease-out',
            minWidth: '120px',
          }}
        >
          <div style={{ marginBottom: '5px' }}>🔊 Volume</div>
          <div
            style={{ fontSize: '20px', fontWeight: 'bold', color: '#4CAF50' }}
          >
            {Math.round(volume * 100)}%
          </div>
          <div style={{ fontSize: '11px', opacity: 0.8, marginTop: '4px' }}>
            Saved
          </div>
        </div>
      )}

      {/* Playback rate notification */}
      {showPlaybackRateNotification && (
        <div
          style={{
            position: 'fixed',
            top: '20%',
            right: '20px',
            background: 'rgba(0, 0, 0, 0.9)',
            color: 'white',
            padding: '15px 20px',
            borderRadius: '8px',
            fontSize: '16px',
            fontFamily: 'Arial, sans-serif',
            zIndex: 1000002,
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
            textAlign: 'center',
            animation: 'slideInRight 0.3s ease-out',
            minWidth: '120px',
          }}
        >
          <div style={{ marginBottom: '5px' }}>⚡ Speed</div>
          <div
            style={{ fontSize: '20px', fontWeight: 'bold', color: '#FF9800' }}
          >
            {playbackRate}x
          </div>
          <div style={{ fontSize: '11px', opacity: 0.8, marginTop: '4px' }}>
            Saved
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes slideInRight {
            0% { 
              opacity: 0; 
              transform: translateX(100%); 
            }
            100% { 
              opacity: 1; 
              transform: translateX(0); 
            }
          }
        `}
      </style>
    </>
  );
};

export default VideoPlayer;