import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { VideoFile } from '../types/video-player-types';

interface VideoPlayerContextType {
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

// Context
export const VideoPlayerContext = createContext<VideoPlayerContextType | null>(
  null
);

export const useVideoPlayer = () => {
  const context = useContext(VideoPlayerContext);
  if (!context) {
    throw new Error('useVideoPlayer must be used within a VideoPlayerProvider');
  }
  return context;
};

export const useKeyboardShortcuts = () => {
  const { playNext, playPrevious, videos, currentVideoIndex } =
    useVideoPlayer();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip if user is typing in an input
      if (
        (e.target && (e.target as HTMLElement).tagName === 'INPUT') ||
        (e.target as HTMLElement).tagName === 'TEXTAREA'
      ) {
        return;
      }

      // Only handle video shortcuts if no modifier keys are pressed (to avoid blur shortcut conflicts)
      if (!e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey) {
        const video = document.querySelector('video') as HTMLVideoElement;

        switch (e.code) {
          case 'Space':
            e.preventDefault();
            if (video) {
              if (video.paused) {
                video.play();
              } else {
                video.pause();
              }
            }
            break;
          case 'ArrowLeft':
            e.preventDefault();
            playPrevious();
            break;
          case 'ArrowRight':
            e.preventDefault();
            playNext();
            break;
          case 'KeyF':
            e.preventDefault();
            if (video && video.requestFullscreen) {
              video.requestFullscreen();
            }
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [playNext, playPrevious]);
};
