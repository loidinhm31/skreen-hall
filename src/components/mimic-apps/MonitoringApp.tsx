import React from 'react';

const MonitoringApp: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#1a1a1a',
        color: '#fff',
        fontFamily: 'Consolas, monospace',
      }}
    >
      <div
        style={{
          background: '#333',
          padding: '8px 16px',
          borderBottom: '1px solid #555',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ fontWeight: 'bold' }}>
          System Monitor - Production Server
        </div>
        <div style={{ fontSize: '12px', color: '#0f0' }}>
          ● Online | Last Update: 12:34:56
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          padding: '16px',
          height: 'calc(100% - 60px)',
        }}
      >
        <div
          style={{
            background: '#2a2a2a',
            padding: '16px',
            borderRadius: '8px',
          }}
        >
          <div
            style={{
              fontSize: '14px',
              fontWeight: 'bold',
              marginBottom: '12px',
              color: '#4CAF50',
            }}
          >
            CPU Usage
          </div>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>68.3%</div>
          <div
            style={{
              background: '#333',
              height: '8px',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                background: '#4CAF50',
                height: '100%',
                width: '68.3%',
              }}
            ></div>
          </div>
          <div style={{ fontSize: '11px', color: '#888', marginTop: '8px' }}>
            Load avg: 2.14, 1.89, 1.76
          </div>
        </div>

        <div
          style={{
            background: '#2a2a2a',
            padding: '16px',
            borderRadius: '8px',
          }}
        >
          <div
            style={{
              fontSize: '14px',
              fontWeight: 'bold',
              marginBottom: '12px',
              color: '#2196F3',
            }}
          >
            Memory Usage
          </div>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>
            12.4 GB / 16 GB
          </div>
          <div
            style={{
              background: '#333',
              height: '8px',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                background: '#2196F3',
                height: '100%',
                width: '77.5%',
              }}
            ></div>
          </div>
          <div style={{ fontSize: '11px', color: '#888', marginTop: '8px' }}>
            Available: 3.6 GB
          </div>
        </div>

        <div
          style={{
            background: '#2a2a2a',
            padding: '16px',
            borderRadius: '8px',
          }}
        >
          <div
            style={{
              fontSize: '14px',
              fontWeight: 'bold',
              marginBottom: '12px',
              color: '#FF9800',
            }}
          >
            Network Activity
          </div>
          <div style={{ marginBottom: '8px' }}>
            <div style={{ fontSize: '12px', color: '#0f0' }}>
              ▲ Upload: 245.8 MB/s
            </div>
            <div style={{ fontSize: '12px', color: '#f50' }}>
              ▼ Download: 832.1 MB/s
            </div>
          </div>
          <div style={{ fontSize: '11px', color: '#888' }}>
            Total: 2.4 TB today
          </div>
        </div>

        <div
          style={{
            background: '#2a2a2a',
            padding: '16px',
            borderRadius: '8px',
          }}
        >
          <div
            style={{
              fontSize: '14px',
              fontWeight: 'bold',
              marginBottom: '12px',
              color: '#9C27B0',
            }}
          >
            Active Processes
          </div>
          <div style={{ fontSize: '11px', marginBottom: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>nginx</span>
              <span style={{ color: '#4CAF50' }}>Running</span>
            </div>
          </div>
          <div style={{ fontSize: '11px', marginBottom: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>mysql</span>
              <span style={{ color: '#4CAF50' }}>Running</span>
            </div>
          </div>
          <div style={{ fontSize: '11px', marginBottom: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>redis</span>
              <span style={{ color: '#4CAF50' }}>Running</span>
            </div>
          </div>
          <div style={{ fontSize: '11px', marginBottom: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>node.js</span>
              <span style={{ color: '#FF5722' }}>High CPU</span>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '16px',
          left: '16px',
          right: '16px',
          background: '#333',
          padding: '8px',
          borderRadius: '4px',
          fontSize: '11px',
        }}
      >
        <div style={{ color: '#4CAF50' }}>
          [12:34:56] System health check completed - All services operational
        </div>
        <div style={{ color: '#FF9800' }}>
          [12:34:45] Warning: High CPU usage detected on worker-node-3
        </div>
        <div style={{ color: '#4CAF50' }}>
          [12:34:32] Database backup completed successfully
        </div>
      </div>

      <style>
        {`
                                .blink {
                                    animation: blink 1s linear infinite;
                                }
                                @keyframes blink {
                                    0%, 50% { opacity: 1; }
                                    51%, 100% { opacity: 0; }
                                }
                            `}
      </style>
    </div>
  );
};

export default MonitoringApp;
