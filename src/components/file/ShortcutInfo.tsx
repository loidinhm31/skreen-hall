import React, { useEffect, useState } from 'react';

const ShortcutsInfo: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '15px',
        borderRadius: '8px',
        fontSize: '12px',
        zIndex: 1000,
        backdropFilter: 'blur(10px)',
        opacity: isVisible ? 1 : 0.3,
        transition: 'opacity 0.3s ease',
      }}
    >
      <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
        Video Shortcuts:
      </div>
      <div>Space - Play/Pause</div>
      <div>← → - Previous/Next video</div>
      <div>F - Fullscreen</div>
      <div
        style={{
          marginTop: '8px',
          borderTop: '1px solid rgba(255,255,255,0.3)',
          paddingTop: '8px',
        }}
      >
        <div style={{ fontWeight: 'bold' }}>Blur Shortcuts:</div>
        <div>Ctrl+Shift+Q - Toggle blur</div>
        <div>Ctrl - Toggle unblur area</div>
      </div>
    </div>
  );
};

export default ShortcutsInfo;
