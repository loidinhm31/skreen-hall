import { useEffect } from 'react';

import { useVideoPlayer } from './useVideoPlayer';

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
