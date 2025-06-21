import React, { useCallback, useEffect, useState } from 'react';

import {
  VideoFile,
  VideoPlayerContextType,
  VIDEO_PLAYER_STORAGE_KEYS,
} from '../../types/video-player-types';
import { VideoPlayerContext } from './VideoPlayerContext';

interface VideoPlayerSettings {
  volume: number;
  playbackRate: number;
  lastVideoIndex?: number;
}

const DEFAULT_SETTINGS: VideoPlayerSettings = {
  volume: 1,
  playbackRate: 1,
};

const VideoPlayerProvider: React.FC<{ children: React.ReactNode }> = ({
                                                                        children,
                                                                      }) => {
  const [videos, setVideos] = useState<VideoFile[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(1);
  const [playbackRate, setPlaybackRateState] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  console.log('VideoPlayerProvider rendered, isInitialized:', isInitialized);

  // Load settings from Chrome storage on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        if (
          typeof chrome !== 'undefined' &&
          chrome.storage &&
          chrome.storage.local
        ) {
          const result = await chrome.storage.local.get([
            VIDEO_PLAYER_STORAGE_KEYS.SETTINGS,
          ]);

          const settings: VideoPlayerSettings = {
            ...DEFAULT_SETTINGS,
            ...result[VIDEO_PLAYER_STORAGE_KEYS.SETTINGS],
          };

          setVolumeState(settings.volume);
          setPlaybackRateState(settings.playbackRate);

          console.log('Video player settings loaded:', settings);
        }
      } catch (error) {
        console.error('Failed to load video player settings:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    loadSettings();
  }, []);

  // Save settings to Chrome storage
  const saveSettings = useCallback(
    async (updatedSettings: Partial<VideoPlayerSettings>) => {
      try {
        if (
          typeof chrome !== 'undefined' &&
          chrome.storage &&
          chrome.storage.local
        ) {
          // Get current settings first
          const result = await chrome.storage.local.get([
            VIDEO_PLAYER_STORAGE_KEYS.SETTINGS,
          ]);

          const currentSettings: VideoPlayerSettings = {
            ...DEFAULT_SETTINGS,
            ...result[VIDEO_PLAYER_STORAGE_KEYS.SETTINGS],
          };

          const newSettings: VideoPlayerSettings = {
            ...currentSettings,
            ...updatedSettings,
          };

          await chrome.storage.local.set({
            [VIDEO_PLAYER_STORAGE_KEYS.SETTINGS]: newSettings,
          });

          console.log('Video player settings saved:', newSettings);
        }
      } catch (error) {
        console.error('Failed to save video player settings:', error);
      }
    },
    []
  );

  // Enhanced setVolume that also saves to storage
  const setVolume = useCallback(
    (newVolume: number) => {
      setVolumeState(newVolume);
      if (isInitialized) {
        saveSettings({ volume: newVolume });
      }
    },
    [isInitialized, saveSettings]
  );

  // Enhanced setPlaybackRate that also saves to storage
  const setPlaybackRate = useCallback(
    (newRate: number) => {
      setPlaybackRateState(newRate);
      if (isInitialized) {
        saveSettings({ playbackRate: newRate });
      }
    },
    [isInitialized, saveSettings]
  );

  // Enhanced setCurrentVideoIndex that also saves last video
  const handleSetCurrentVideoIndex = useCallback(
    (index: number) => {
      setCurrentVideoIndex(index);
      if (isInitialized && videos.length > 0) {
        saveSettings({ lastVideoIndex: index });
      }
    },
    [isInitialized, videos.length, saveSettings]
  );

  // Load last played video when videos are set
  useEffect(() => {
    const loadLastVideo = async () => {
      if (videos.length > 0 && isInitialized) {
        try {
          if (
            typeof chrome !== 'undefined' &&
            chrome.storage &&
            chrome.storage.local
          ) {
            const result = await chrome.storage.local.get([
              VIDEO_PLAYER_STORAGE_KEYS.SETTINGS,
            ]);

            const settings: VideoPlayerSettings = {
              ...DEFAULT_SETTINGS,
              ...result[VIDEO_PLAYER_STORAGE_KEYS.SETTINGS],
            };

            // Set last video index if it's valid
            if (
              settings.lastVideoIndex !== undefined &&
              settings.lastVideoIndex < videos.length &&
              settings.lastVideoIndex >= 0
            ) {
              setCurrentVideoIndex(settings.lastVideoIndex);
            }
          }
        } catch (error) {
          console.error('Failed to load last video index:', error);
        }
      }
    };

    loadLastVideo();
  }, [videos.length, isInitialized]);

  // Listen for storage changes from other instances
  useEffect(() => {
    const handleStorageChange = (changes: {
      [key: string]: chrome.storage.StorageChange;
    }) => {
      if (changes[VIDEO_PLAYER_STORAGE_KEYS.SETTINGS]) {
        const newSettings: VideoPlayerSettings = {
          ...DEFAULT_SETTINGS,
          ...changes[VIDEO_PLAYER_STORAGE_KEYS.SETTINGS].newValue,
        };

        setVolumeState(newSettings.volume);
        setPlaybackRateState(newSettings.playbackRate);

        console.log('Video player settings updated from storage:', newSettings);
      }
    };

    if (
      typeof chrome !== 'undefined' &&
      chrome.storage &&
      chrome.storage.onChanged
    ) {
      chrome.storage.onChanged.addListener(handleStorageChange);
      return () => {
        chrome.storage.onChanged.removeListener(handleStorageChange);
      };
    }
  }, []);

  const playNext = useCallback(() => {
    if (currentVideoIndex < videos.length - 1) {
      handleSetCurrentVideoIndex(currentVideoIndex + 1);
    }
  }, [currentVideoIndex, videos.length, handleSetCurrentVideoIndex]);

  const playPrevious = useCallback(() => {
    if (currentVideoIndex > 0) {
      handleSetCurrentVideoIndex(currentVideoIndex - 1);
    }
  }, [currentVideoIndex, handleSetCurrentVideoIndex]);

  const value: VideoPlayerContextType = {
    videos,
    currentVideoIndex,
    isPlaying,
    volume,
    playbackRate,
    isFullscreen,
    isLoading,
    error,
    setVideos,
    setCurrentVideoIndex,
    setIsPlaying,
    setVolume,
    setPlaybackRate,
    setIsFullscreen,
    setIsLoading,
    setError,
    playNext,
    playPrevious,
  };

  return (
    <VideoPlayerContext.Provider value={value}>
      {children}
    </VideoPlayerContext.Provider>
  );
};

export default VideoPlayerProvider;