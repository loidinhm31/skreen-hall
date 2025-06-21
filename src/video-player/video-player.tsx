import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';

import ErrorDisplay from '../components/file/ErrorDisplay';
import FileControls from '../components/file/FileControl';
import VideoPlayerHeader from '../components/file/VideoPlayerHeader';
import VideoPlayer from '../components/file/VideoPlayer';
import { useKeyboardShortcuts } from '../hook/useKeyboardShortcuts';
import VideoPlayerProvider from './provider/VideoPlayerProvider';

// Lazy load heavy components
const BlurOverlay = lazy(() => import('../components/BlurOverlay'));
const VideoPlaylist = lazy(() => import('../components/file/VideoPlayerList'));
const ShortcutsInfo = lazy(() => import('../components/file/ShortcutInfo'));

// Loading fallback component
const ComponentLoader: React.FC<{ name: string }> = ({ name }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10px',
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '12px',
    }}
  >
    Loading {name}...
  </div>
);

const KeyboardShortcutsHandler: React.FC = () => {
  useKeyboardShortcuts();
  return null;
};

const VideoPlayerApp: React.FC = () => {
  return (
    <VideoPlayerProvider>
      <div
        style={{
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <KeyboardShortcutsHandler />
        <VideoPlayerHeader />
        <ErrorDisplay />
        <FileControls />

        <div
          style={{
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '12px',
            padding: '20px',
            margin: '0 30px 30px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            flex: 1,
          }}
        >
          <VideoPlayer />

          {/* Lazy load the playlist */}
          <Suspense fallback={<ComponentLoader name="playlist" />}>
            <VideoPlaylist />
          </Suspense>
        </div>

        {/* Lazy load shortcuts info */}
        <Suspense fallback={null}>
          <ShortcutsInfo />
        </Suspense>

        {/* Lazy load blur overlay */}
        <Suspense fallback={null}>
          <BlurOverlay />
        </Suspense>
      </div>
    </VideoPlayerProvider>
  );
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('video-player-root');
  if (container) {
    const root = createRoot(container);
    root.render(<VideoPlayerApp />);
  }
});