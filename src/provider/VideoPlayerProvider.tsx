import React, { useCallback, useState } from "react";
import { VideoFile, VideoPlayerContextType } from "../types/video-player-types";
import { VideoPlayerContext } from "../hook/useKeyboardShortcuts";

const VideoPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [videos, setVideos] = useState<VideoFile[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const playNext = useCallback(() => {
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  }, [currentVideoIndex, videos.length]);

  const playPrevious = useCallback(() => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
  }, [currentVideoIndex]);

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

  return <VideoPlayerContext.Provider value={value}>{children}</VideoPlayerContext.Provider>;
};

export default VideoPlayerProvider;
