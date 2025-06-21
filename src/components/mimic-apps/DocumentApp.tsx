import React from 'react';

const DocumentApp: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%', background: '#ffffff' }}>
      <div
        style={{
          background: '#2b579a',
          color: 'white',
          padding: '8px 16px',
          fontWeight: 'bold',
        }}
      >
        Microsoft Word - Project Proposal.docx
      </div>
      <div
        style={{
          background: '#f1f3f4',
          padding: '8px',
          borderBottom: '1px solid #ddd',
          fontSize: '12px',
        }}
      >
        File | Home | Insert | Design | Layout | References | Mailings |
        Review | View
      </div>
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '40px',
          background: '#fff',
          minHeight: 'calc(100% - 80px)',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '8px',
            }}
          >
            Digital Transformation Initiative
          </h1>
          <h2
            style={{
              fontSize: '18px',
              color: '#666',
              marginBottom: '16px',
            }}
          >
            Project Proposal
          </h2>
          <div style={{ fontSize: '14px', color: '#888' }}>
            Prepared by: Technology Team | Date: December 2024
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              marginBottom: '12px',
              color: '#2b579a',
            }}
          >
            Executive Summary
          </h3>
          <p
            style={{
              fontSize: '14px',
              lineHeight: '1.6',
              marginBottom: '12px',
            }}
          >
            This document outlines our proposed digital transformation
            initiative aimed at modernizing our core business processes and
            improving operational efficiency. The project will focus on
            implementing new technologies that will enhance productivity,
            reduce costs, and improve customer satisfaction.
          </p>
          <p
            style={{
              fontSize: '14px',
              lineHeight: '1.6',
              marginBottom: '12px',
            }}
          >
            Our analysis indicates that this initiative could result in a
            25% improvement in operational efficiency and a projected ROI of
            180% over the next three years.
          </p>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              marginBottom: '12px',
              color: '#2b579a',
            }}
          >
            Project Objectives
          </h3>
          <ul
            style={{
              paddingLeft: '20px',
              fontSize: '14px',
              lineHeight: '1.6',
            }}
          >
            <li style={{ marginBottom: '8px' }}>
              Streamline workflow processes through automation
            </li>
            <li style={{ marginBottom: '8px' }}>
              Implement cloud-based infrastructure for better scalability
            </li>
            <li style={{ marginBottom: '8px' }}>
              Enhance data analytics capabilities
            </li>
            <li style={{ marginBottom: '8px' }}>
              Improve customer experience through digital channels
            </li>
          </ul>
        </div>

        <div>
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              marginBottom: '12px',
              color: '#2b579a',
            }}
          >
            Timeline and Budget
          </h3>
          <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
            The project is scheduled to begin in Q1 2025 with an estimated
            completion date of Q3 2025. Total budget requirement is $2.4M,
            allocated across infrastructure, software licensing, and
            professional services.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DocumentApp;