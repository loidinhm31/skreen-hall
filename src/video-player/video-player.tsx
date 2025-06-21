import React from "react";
import { createRoot } from "react-dom/client";
import BlurOverlay from "../components/BlurOverlay";
import { useKeyboardShortcuts } from "../hook/useKeyboardShortcuts";
import ErrorDisplay from "../components/file/ErrorDisplay";
import FileControls from "../components/file/FileControl";
import { VideoPlayer, VideoPlayerHeader, VideoPlaylist } from "../components/file/VideoPlayer";
import ShortcutsInfo from "../components/file/ShortcutInfo";
import VideoPlayerProvider from "../provider/VideoPlayerProvider";

const KeyboardShortcutsHandler: React.FC = () => {
  useKeyboardShortcuts();
  return null;
};

const VideoPlayerApp: React.FC = () => {
  return (
    <VideoPlayerProvider>
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <KeyboardShortcutsHandler />
        <VideoPlayerHeader />
        <ErrorDisplay />
        <FileControls />

        <div
          style={{
            background: "rgba(0, 0, 0, 0.3)",
            borderRadius: "12px",
            padding: "20px",
            margin: "0 30px 30px",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            flex: 1,
          }}
        >
          <VideoPlayer />
          <VideoPlaylist />
        </div>

        <ShortcutsInfo />
        <BlurOverlay />
      </div>
    </VideoPlayerProvider>
  );
};

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("video-player-root");
  if (container) {
    const root = createRoot(container);
    root.render(<VideoPlayerApp />);
  }
});
