import React from 'react';

import { useVideoPlayer } from '../../hook/useKeyboardShortcuts';

const ErrorDisplay: React.FC = () => {
  const { error, setError } = useVideoPlayer();

  if (!error) return null;

  return (
    <div
      style={{
        background: 'rgba(255, 82, 82, 0.2)',
        border: '1px solid rgba(255, 82, 82, 0.4)',
        padding: '15px',
        borderRadius: '8px',
        margin: '15px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <span>{error}</span>
      <button
        onClick={() => setError(null)}
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          fontSize: '18px',
          padding: '0 5px',
        }}
      >
        ×
      </button>
    </div>
  );
};

export default ErrorDisplay;
