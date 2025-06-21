import React from 'react';

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

export default VideoPlayerHeader;