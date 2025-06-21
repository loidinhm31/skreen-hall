import React from 'react';

const TerminalApp: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#0c0c0c',
        color: '#cccccc',
        fontFamily: 'Consolas, monospace',
        fontSize: '14px',
        padding: '16px',
      }}
    >
      <div style={{ marginBottom: '8px' }}>
        Microsoft Windows [Version 10.0.22621.2715]
      </div>
      <div style={{ marginBottom: '8px' }}>
        (c) Microsoft Corporation. All rights reserved.
      </div>
      <br />
      <div style={{ marginBottom: '8px' }}>
        C:\Users\Developer&gt;{' '}
        <span style={{ color: '#00ff00' }}>npm run build</span>
      </div>
      <div style={{ marginBottom: '8px', color: '#ffff00' }}>
        Building application...
      </div>
      <div style={{ marginBottom: '8px' }}>
        ✓ Compiled successfully in 4.2s
      </div>
      <div style={{ marginBottom: '8px' }}>
        ✓ Build artifacts written to dist/
      </div>
      <br />
      <div style={{ marginBottom: '8px' }}>
        C:\Users\Developer&gt;{' '}
        <span style={{ color: '#00ff00' }}>git status</span>
      </div>
      <div style={{ marginBottom: '8px' }}>On branch main</div>
      <div style={{ marginBottom: '8px' }}>
        Your branch is up to date with 'origin/main'.
      </div>
      <br />
      <div style={{ marginBottom: '8px' }}>
        Changes not staged for commit:
      </div>
      <div style={{ marginBottom: '8px', color: '#ff0000' }}>
        {' '}
        modified: src/components/App.tsx
      </div>
      <div style={{ marginBottom: '8px', color: '#ff0000' }}>
        {' '}
        modified: package.json
      </div>
      <br />
      <div>
        C:\Users\Developer&gt; <span className='blink'>_</span>
      </div>
    </div>
  );
};

export default TerminalApp;