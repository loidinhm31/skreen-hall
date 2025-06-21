import React, { useCallback, useEffect, useState } from 'react';

import {
  DrivePathSaveManager,
  SaveSettings,
} from '../../utils/DrivePathSaveManager';

interface SaveSettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSettingsChange?: (settings: SaveSettings) => void;
}

const SaveSettingsPanel: React.FC<SaveSettingsPanelProps> = ({
  isOpen,
  onClose,
  onSettingsChange,
}) => {
  const [saveManager] = useState(() => DrivePathSaveManager.getInstance());
  const [settings, setSettings] = useState<SaveSettings>(
    saveManager.getSettings()
  );
  const [customPath, setCustomPath] = useState(settings.customPath);
  const [pathValidation, setPathValidation] = useState<any>({
    valid: true,
    message: '',
    needsDirectorySelection: false,
  });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const currentSettings = saveManager.getSettings();
      setSettings(currentSettings);
      setCustomPath(currentSettings.customPath);
    }
  }, [isOpen, saveManager]);

  const validatePath = useCallback(
    (path: string) => {
      setCustomPath(path);

      if (path.trim()) {
        const validation = saveManager.validatePath(path);
        setPathValidation(validation);
      } else {
        setPathValidation({
          valid: true,
          message: '',
          needsDirectorySelection: false,
        });
      }
    },
    [saveManager]
  );

  const handleSaveSettings = useCallback(async () => {
    if (!customPath.trim()) {
      onClose();
      return;
    }

    setIsProcessing(true);

    try {
      const result = await saveManager.setCustomPath(customPath);

      if (result.success) {
        const updatedSettings = saveManager.getSettings();
        setSettings(updatedSettings);
        onSettingsChange?.(updatedSettings);
        onClose();
      } else {
        setPathValidation({
          valid: false,
          message: result.message,
          needsDirectorySelection: false,
        });
      }
    } catch (error: any) {
      setPathValidation({
        valid: false,
        message: `Error: ${error.message}`,
        needsDirectorySelection: false,
      });
    } finally {
      setIsProcessing(false);
    }
  }, [customPath, saveManager, onSettingsChange, onClose]);

  const handleSaveMethodChange = useCallback(
    async (method: 'downloads' | 'directory' | 'auto') => {
      await saveManager.setSaveMethod(method);
      const updatedSettings = saveManager.getSettings();
      setSettings(updatedSettings);
    },
    [saveManager]
  );

  const handleToggleCustomPath = useCallback(
    async (enabled: boolean) => {
      await saveManager.toggleCustomPath(enabled);
      const updatedSettings = saveManager.getSettings();
      setSettings(updatedSettings);
    },
    [saveManager]
  );

  const handleResetDirectory = useCallback(async () => {
    await saveManager.resetDirectorySelection();
    const updatedSettings = saveManager.getSettings();
    setSettings(updatedSettings);
    setPathValidation({
      valid: true,
      message: 'Directory selection reset',
      needsDirectorySelection: false,
    });
  }, [saveManager]);

  const pathExamples = saveManager.getPathExamples();

  if (!isOpen) return null;

  // @ts-ignore
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
      }}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, #2c3e50, #34495e)',
          borderRadius: '12px',
          padding: '24px',
          width: '90%',
          maxWidth: '600px',
          color: 'white',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
            paddingBottom: '12px',
          }}
        >
          <h3 style={{ margin: 0, fontSize: '18px' }}>
            💾 Advanced Save Settings
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '20px',
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            ✕
          </button>
        </div>

        {/* Save Method Selection */}
        <div style={{ marginBottom: '20px' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            Save Method:
          </label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {(['auto', 'downloads', 'directory'] as const).map((method) => (
              <button
                key={method}
                onClick={() => handleSaveMethodChange(method)}
                style={{
                  padding: '8px 12px',
                  background:
                    settings.saveMethod === method
                      ? 'rgba(76, 175, 80, 0.8)'
                      : 'rgba(255, 255, 255, 0.2)',
                  border: '1px solid',
                  borderColor:
                    settings.saveMethod === method
                      ? 'rgba(76, 175, 80, 1)'
                      : 'rgba(255, 255, 255, 0.3)',
                  borderRadius: '6px',
                  color: 'white',
                  fontSize: '12px',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                }}
              >
                {method === 'auto'
                  ? '🤖 Auto'
                  : method === 'downloads'
                    ? '📥 Downloads'
                    : '📁 Directory'}
              </button>
            ))}
          </div>
          <div style={{ fontSize: '11px', color: '#bbb', marginTop: '4px' }}>
            Auto: Tries custom path → directory selection → downloads fallback
          </div>
        </div>

        {/* Custom Path Section */}
        <div style={{ marginBottom: '20px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '12px',
            }}
          >
            <input
              type='checkbox'
              checked={settings.useCustomPath}
              onChange={(e) => handleToggleCustomPath(e.target.checked)}
              style={{ transform: 'scale(1.2)' }}
            />
            <label style={{ fontSize: '14px', fontWeight: 'bold' }}>
              Use Custom Save Path
            </label>
          </div>

          {settings.useCustomPath && (
            <>
              <input
                type='text'
                value={customPath}
                onChange={(e) => validatePath(e.target.value)}
                placeholder='e.g., Videos/MyVideos or G:\ws'
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '6px',
                  border: `2px solid ${
                    !pathValidation.valid
                      ? '#f44336'
                      : pathValidation.needsDirectorySelection
                        ? '#FF9800'
                        : 'rgba(255, 255, 255, 0.3)'
                  }`,
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontSize: '14px',
                  outline: 'none',
                  marginBottom: '8px',
                }}
              />

              {/* Path validation messages */}
              {pathValidation.message && (
                <div
                  style={{
                    color: !pathValidation.valid
                      ? '#f44336'
                      : pathValidation.needsDirectorySelection
                        ? '#FF9800'
                        : '#4CAF50',
                    fontSize: '12px',
                    marginBottom: '8px',
                    padding: '6px',
                    background: 'rgba(0, 0, 0, 0.2)',
                    borderRadius: '4px',
                  }}
                >
                  {!pathValidation.valid
                    ? '❌'
                    : pathValidation.needsDirectorySelection
                      ? '⚠️'
                      : '✅'}{' '}
                  {pathValidation.message}
                </div>
              )}

              {/* Path Examples */}
              <div style={{ marginBottom: '12px' }}>
                <div
                  style={{
                    fontSize: '12px',
                    color: '#bbb',
                    marginBottom: '6px',
                  }}
                >
                  💡 <strong>Relative paths</strong> (within user directory):
                </div>
                <div
                  style={{
                    display: 'flex',
                    gap: '4px',
                    flexWrap: 'wrap',
                    marginBottom: '8px',
                  }}
                >
                  {pathExamples.relative.map((path) => (
                    <button
                      key={path}
                      onClick={() => validatePath(path)}
                      style={{
                        padding: '4px 8px',
                        background: 'rgba(76, 175, 80, 0.2)',
                        border: '1px solid rgba(76, 175, 80, 0.4)',
                        borderRadius: '4px',
                        color: '#81C784',
                        fontSize: '11px',
                        cursor: 'pointer',
                      }}
                    >
                      {path}
                    </button>
                  ))}
                </div>

                <div
                  style={{
                    fontSize: '12px',
                    color: '#bbb',
                    marginBottom: '6px',
                  }}
                >
                  🔗 <strong>Absolute paths</strong> (any drive - requires
                  directory selection):
                </div>
                <div
                  style={{
                    display: 'flex',
                    gap: '4px',
                    flexWrap: 'wrap',
                  }}
                >
                  {pathExamples.absolute.map((path) => (
                    <button
                      key={path}
                      onClick={() => validatePath(path)}
                      style={{
                        padding: '4px 8px',
                        background: 'rgba(255, 152, 0, 0.2)',
                        border: '1px solid rgba(255, 152, 0, 0.4)',
                        borderRadius: '4px',
                        color: '#FFB74D',
                        fontSize: '11px',
                        cursor: 'pointer',
                      }}
                    >
                      {path}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reset Directory Button */}
              {settings.selectedDirectoryName && (
                <div
                  style={{
                    background: 'rgba(255, 152, 0, 0.1)',
                    padding: '8px',
                    borderRadius: '4px',
                    marginBottom: '12px',
                    border: '1px solid rgba(255, 152, 0, 0.3)',
                  }}
                >
                  <div style={{ fontSize: '12px', marginBottom: '4px' }}>
                    📁 Current directory:{' '}
                    <strong>{settings.selectedDirectoryName}</strong>
                  </div>
                  <button
                    onClick={handleResetDirectory}
                    style={{
                      padding: '4px 8px',
                      background: 'rgba(255, 152, 0, 0.8)',
                      border: 'none',
                      borderRadius: '3px',
                      color: 'white',
                      fontSize: '11px',
                      cursor: 'pointer',
                    }}
                  >
                    🔄 Select Different Directory
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Current Status */}
        <div
          style={{
            background: 'rgba(0, 0, 0, 0.2)',
            padding: '12px',
            borderRadius: '6px',
            marginBottom: '20px',
          }}
        >
          <div style={{ fontSize: '12px', color: '#bbb', marginBottom: '4px' }}>
            Files will be saved to:
          </div>
          <div style={{ fontSize: '14px', color: '#4CAF50' }}>
            {saveManager.getSaveStatusInfo()}
          </div>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'flex-end',
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '6px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSaveSettings}
            disabled={!pathValidation.valid || isProcessing}
            style={{
              padding: '10px 20px',
              background:
                pathValidation.valid && !isProcessing
                  ? pathValidation.needsDirectorySelection
                    ? 'linear-gradient(45deg, #FF9800, #F57C00)'
                    : 'linear-gradient(45deg, #4CAF50, #45a049)'
                  : 'rgba(128, 128, 128, 0.5)',
              border: 'none',
              borderRadius: '6px',
              color: 'white',
              cursor:
                pathValidation.valid && !isProcessing
                  ? 'pointer'
                  : 'not-allowed',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            {isProcessing
              ? '⏳ Processing...'
              : pathValidation.needsDirectorySelection
                ? '📁 Set Path & Select Directory'
                : '💾 Save Settings'}
          </button>
        </div>

        {/* Help Text */}
        <div
          style={{
            marginTop: '16px',
            padding: '12px',
            background: 'rgba(33, 150, 243, 0.1)',
            borderRadius: '6px',
            border: '1px solid rgba(33, 150, 243, 0.3)',
          }}
        >
          <div
            style={{ fontSize: '12px', color: '#81C784', marginBottom: '6px' }}
          >
            📋 <strong>Path Types:</strong>
          </div>
          <div style={{ fontSize: '11px', color: '#ccc' }}>
            • <strong>Relative:</strong> <code>Videos/MyFolder</code> → saves in
            user directory
            <br />• <strong>Absolute:</strong> <code>G:\ws</code> → saves to any
            drive (requires folder selection)
            <br />• <strong>Auto method:</strong> Tries your preferred path,
            falls back gracefully
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveSettingsPanel;
