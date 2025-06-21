import React from 'react';

const MeetingApp: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%', background: '#000' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div
          style={{ flex: 1, position: 'relative', background: '#1a1a1a' }}
        >
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              color: 'white',
              fontSize: '14px',
              background: 'rgba(0,0,0,0.5)',
              padding: '8px 12px',
              borderRadius: '4px',
            }}
          >
            Weekly Team Standup
          </div>
          <div
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              color: 'white',
              fontSize: '12px',
              background: 'rgba(0,0,0,0.5)',
              padding: '4px 8px',
              borderRadius: '4px',
            }}
          >
            🔴 Recording
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              height: '100%',
              gap: '4px',
            }}
          >
            <div
              style={{
                background: '#2a2a2a',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: '#4a90e2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '48px',
                  color: 'white',
                }}
              >
                👤
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  color: 'white',
                  fontSize: '14px',
                  background: 'rgba(0,0,0,0.7)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                }}
              >
                Sarah Johnson
              </div>
            </div>
            <div
              style={{
                background: '#2a2a2a',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: '#50c878',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '48px',
                  color: 'white',
                }}
              >
                👤
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  color: 'white',
                  fontSize: '14px',
                  background: 'rgba(0,0,0,0.7)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                }}
              >
                Mike Chen
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '12px',
                  color: 'white',
                  fontSize: '12px',
                }}
              >
                🎤
              </div>
            </div>
            <div
              style={{
                background: '#2a2a2a',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: '#ff6b6b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '48px',
                  color: 'white',
                }}
              >
                👤
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  color: 'white',
                  fontSize: '14px',
                  background: 'rgba(0,0,0,0.7)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                }}
              >
                You
              </div>
            </div>
            <div
              style={{
                background: '#2a2a2a',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ color: '#888', fontSize: '16px' }}>
                Alex Rivera
                <br />
                <span style={{ fontSize: '12px' }}>Camera Off</span>
              </div>
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '12px',
            }}
          >
            <button
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: '#ff4444',
                border: 'none',
                color: 'white',
                fontSize: '20px',
              }}
            >
              🎤
            </button>
            <button
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: '#4444ff',
                border: 'none',
                color: 'white',
                fontSize: '20px',
              }}
            >
              📹
            </button>
            <button
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: '#44ff44',
                border: 'none',
                color: 'white',
                fontSize: '20px',
              }}
            >
              💬
            </button>
            <button
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: '#ff4444',
                border: 'none',
                color: 'white',
                fontSize: '20px',
              }}
            >
              📞
            </button>
          </div>
        </div>
        <div
          style={{
            width: '300px',
            background: '#2a2a2a',
            borderLeft: '1px solid #444',
          }}
        >
          <div
            style={{
              padding: '16px',
              color: 'white',
              fontSize: '14px',
              borderBottom: '1px solid #444',
            }}
          >
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
              Chat
            </div>
          </div>
          <div style={{ padding: '16px', color: '#ccc', fontSize: '12px' }}>
            <div style={{ marginBottom: '12px' }}>
              <div style={{ color: '#4a90e2', marginBottom: '4px' }}>
                Sarah Johnson 10:32 AM
              </div>
              <div>Good morning everyone! Ready for standup?</div>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <div style={{ color: '#50c878', marginBottom: '4px' }}>
                Mike Chen 10:33 AM
              </div>
              <div>Yes, I'll start with my updates</div>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <div style={{ color: '#ff9500', marginBottom: '4px' }}>
                Alex Rivera 10:35 AM
              </div>
              <div>👍 Ready when you are</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingApp;