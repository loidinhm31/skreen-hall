import React from 'react';

import { FakeAppType } from '../types';
import CodeApp from './mimic-apps/CodeApp';
import DocumentApp from './mimic-apps/DocumentApp';
import EmailApp from './mimic-apps/EmailApp';
import MeetingApp from './mimic-apps/MeetingApp';
import MonitoringApp from './mimic-apps/MonitoringApp';
import SpreadsheetApp from './mimic-apps/SpreadsheetApp';
import TerminalApp from './mimic-apps/TerminalApp';

export interface ExtendedBlurState {
  isActive: boolean;
  isUnblurRegionActive: boolean;
  mousePosition: { x: number; y: number };
  clearRadius: number;
  blurIntensity: number;
  fakeAppType: FakeAppType;
}

export const renderMimicApp = (blurState: ExtendedBlurState) => {
  const LoadingSpinner = () => (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1a1a1a',
        color: 'white',
      }}
    >
      Loading...
    </div>
  );

  switch (blurState.fakeAppType) {
    case 'code':
      return <CodeApp />;
    case 'terminal':
      return <TerminalApp />;
    case 'spreadsheet':
      return <SpreadsheetApp />;
    case 'email':
      return <EmailApp />;
    case 'document':
      return <DocumentApp />;
    case 'meeting':
      return <MeetingApp />;
    case 'monitoring':
      return <MonitoringApp />;
    default:
      return null;
  }
};
