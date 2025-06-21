import { useContext } from 'react';
import { VideoPlayerContext } from '../video-player/provider/VideoPlayerContext';


const useVideoPlayer = () => {
  const context = useContext(VideoPlayerContext);
  if (!context) {
    throw new Error('useVideoPlayer must be used within a VideoPlayerProvider');
  }
  return context;
};

export { useVideoPlayer };
