import React from 'react';

const CodeApp: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#1e1e1e',
        color: '#d4d4d4',
        fontFamily: 'Consolas, monospace',
        fontSize: '14px',
      }}
    >
      <div
        style={{
          background: '#2d2d30',
          padding: '8px 16px',
          borderBottom: '1px solid #3e3e42',
          color: '#cccccc',
        }}
      >
        VS Code - main.tsx
      </div>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            width: '200px',
            background: '#252526',
            borderRight: '1px solid #3e3e42',
            padding: '16px',
          }}
        >
          <div
            style={{ marginBottom: '8px', fontSize: '11px', color: '#888' }}
          >
            EXPLORER
          </div>
          <div style={{ marginLeft: '8px' }}>
            <div style={{ margin: '4px 0' }}>📁 src</div>
            <div style={{ margin: '4px 0', marginLeft: '16px' }}>
              📁 components
            </div>
            <div
              style={{
                margin: '4px 0',
                marginLeft: '32px',
                color: '#569cd6',
              }}
            >
              App.tsx
            </div>
            <div
              style={{
                margin: '4px 0',
                marginLeft: '32px',
                color: '#ce9178',
              }}
            >
              main.tsx
            </div>
          </div>
        </div>
        <div style={{ flex: 1, padding: '16px' }}>
          <div>
            <span style={{ color: '#569cd6' }}>import</span>{' '}
            <span style={{ color: '#ce9178' }}>React</span>{' '}
            <span style={{ color: '#569cd6' }}>from</span>
            <span style={{ color: '#ce9178' }}>'react'</span>;
          </div>
          <div>
            <span style={{ color: '#569cd6' }}>import</span>{' '}
            <span style={{ color: '#ce9178' }}>ReactDOM</span>{' '}
            <span style={{ color: '#569cd6' }}>from</span>
            <span style={{ color: '#ce9178' }}>'react-dom/client'</span>;
          </div>
          <div>
            <span style={{ color: '#569cd6' }}>import</span>{' '}
            <span style={{ color: '#ce9178' }}>App</span>{' '}
            <span style={{ color: '#569cd6' }}>from</span>{' '}
            <span style={{ color: '#ce9178' }}>'./App'</span>;
          </div>
          <br />
          <div>
            <span style={{ color: '#569cd6' }}>const</span>{' '}
            <span style={{ color: '#9cdcfe' }}>root</span> ={' '}
            <span style={{ color: '#dcdcaa' }}>ReactDOM</span>.
            <span style={{ color: '#dcdcaa' }}>createRoot</span>(
          </div>
          <div style={{ marginLeft: '16px' }}>
            <span style={{ color: '#9cdcfe' }}>document</span>.
            <span style={{ color: '#dcdcaa' }}>getElementById</span>(
            <span style={{ color: '#ce9178' }}>'root'</span>){' '}
            <span style={{ color: '#569cd6' }}>as</span>
            <span style={{ color: '#4ec9b0' }}>HTMLElement</span>
          </div>
          <div>);</div>
          <br />
          <div>
            <span style={{ color: '#9cdcfe' }}>root</span>.
            <span style={{ color: '#dcdcaa' }}>render</span>(
          </div>
          <div style={{ marginLeft: '16px' }}>
            &lt;<span style={{ color: '#4ec9b0' }}>React.StrictMode</span>
            &gt;
          </div>
          <div style={{ marginLeft: '32px' }}>
            &lt;<span style={{ color: '#4ec9b0' }}>App</span> /&gt;
          </div>
          <div style={{ marginLeft: '16px' }}>
            &lt;/<span style={{ color: '#4ec9b0' }}>React.StrictMode</span>
            &gt;
          </div>
          <div>);</div>
        </div>
      </div>
    </div>
  );
};

export default CodeApp;