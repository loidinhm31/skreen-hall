import React from 'react';

const EmailApp: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%', background: '#ffffff' }}>
      <div
        style={{
          background: '#0078d4',
          color: 'white',
          padding: '8px 16px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <span style={{ marginRight: '16px' }}>📧</span>
        Microsoft Outlook
      </div>
      <div style={{ display: 'flex', height: 'calc(100% - 40px)' }}>
        <div
          style={{
            width: '250px',
            background: '#f3f2f1',
            borderRight: '1px solid #ddd',
            padding: '16px',
          }}
        >
          <div
            style={{
              marginBottom: '16px',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            Folders
          </div>
          <div
            style={{
              marginBottom: '8px',
              padding: '4px',
              background: '#e3f2fd',
              borderRadius: '4px',
              fontSize: '13px',
            }}
          >
            📥 Inbox (12)
          </div>
          <div
            style={{
              marginBottom: '8px',
              padding: '4px',
              fontSize: '13px',
            }}
          >
            📤 Sent Items
          </div>
          <div
            style={{
              marginBottom: '8px',
              padding: '4px',
              fontSize: '13px',
            }}
          >
            📋 Drafts (3)
          </div>
          <div
            style={{
              marginBottom: '8px',
              padding: '4px',
              fontSize: '13px',
            }}
          >
            🗑️ Deleted Items
          </div>
        </div>
        <div
          style={{
            width: '300px',
            borderRight: '1px solid #ddd',
            background: '#fafafa',
          }}
        >
          <div
            style={{
              padding: '16px',
              borderBottom: '1px solid #ddd',
              background: '#fff',
            }}
          >
            <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
              Inbox
            </div>
            <div
              style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}
            >
              12 unread messages
            </div>
          </div>
          <div>
            <div
              style={{
                padding: '12px 16px',
                borderBottom: '1px solid #eee',
                background: '#e3f2fd',
              }}
            >
              <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
                Project Update Meeting
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                Sarah Johnson - 10:30 AM
              </div>
              <div style={{ fontSize: '12px', marginTop: '4px' }}>
                Let's schedule our weekly sync...
              </div>
            </div>
            <div
              style={{
                padding: '12px 16px',
                borderBottom: '1px solid #eee',
              }}
            >
              <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
                Q4 Budget Review
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                Finance Team - 9:15 AM
              </div>
              <div style={{ fontSize: '12px', marginTop: '4px' }}>
                Please review the attached...
              </div>
            </div>
            <div
              style={{
                padding: '12px 16px',
                borderBottom: '1px solid #eee',
              }}
            >
              <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
                Client Presentation
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                Mike Chen - Yesterday
              </div>
              <div style={{ fontSize: '12px', marginTop: '4px' }}>
                Draft presentation ready for...
              </div>
            </div>
          </div>
        </div>
        <div style={{ flex: 1, padding: '24px', background: '#fff' }}>
          <div style={{ marginBottom: '16px' }}>
            <div
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '8px',
              }}
            >
              Project Update Meeting
            </div>
            <div
              style={{
                fontSize: '14px',
                color: '#666',
                marginBottom: '4px',
              }}
            >
              From: Sarah Johnson &lt;sarah.johnson@company.com&gt;
            </div>
            <div
              style={{
                fontSize: '14px',
                color: '#666',
                marginBottom: '16px',
              }}
            >
              To: Development Team
            </div>
          </div>
          <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
            <p>Hi everyone,</p>
            <p>
              I hope this email finds you well. I wanted to reach out to
              schedule our weekly project sync meeting for this week.
            </p>
            <p>
              Based on our current sprint progress, I think we should focus
              on:
            </p>
            <ul>
              <li>Sprint review and retrospective</li>
              <li>Upcoming feature prioritization</li>
              <li>Technical debt discussion</li>
              <li>Resource allocation for Q4</li>
            </ul>
            <p>
              Please let me know your availability for Thursday afternoon.
            </p>
            <p>
              Best regards,
              <br />
              Sarah
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailApp;