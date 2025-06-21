import React, { useCallback, useState } from 'react';

import { VideoFile } from '../../types/video-player-types';

interface SimpleFileRenameProps {
  video: VideoFile;
  isSelected: boolean;
  onSelect: () => void;
  onRename: (fileId: string, newName: string) => void;
  onSave: (fileId: string, newName: string) => void;
}

const SimpleFileRename: React.FC<SimpleFileRenameProps> = ({
  video,
  isSelected,
  onSelect,
  onRename,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(video.name);
  const [isSaving, setIsSaving] = useState(false);

  const handleStartEdit = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setEditName(video.name);
      setIsEditing(true);
    },
    [video.name]
  );

  const handleSaveEdit = useCallback(async () => {
    if (editName.trim() && editName !== video.name) {
      onRename(video.id, editName.trim());
    }
    setIsEditing(false);
  }, [editName, video.id, video.name, onRename]);

  const handleQuickSave = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!video.isRenamed) return;

      setIsSaving(true);
      try {
        await onSave(video.id, video.name);
      } catch (error) {
        console.error('Save failed:', error);
      } finally {
        setIsSaving(false);
      }
    },
    [video.id, video.name, video.isRenamed, onSave]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSaveEdit();
      } else if (e.key === 'Escape') {
        setEditName(video.name);
        setIsEditing(false);
      }
    },
    [handleSaveEdit, video.name]
  );

  const getFileNameWithoutExtension = (filename: string): string => {
    const lastDot = filename.lastIndexOf('.');
    return lastDot > 0 ? filename.slice(0, lastDot) : filename;
  };

  const getFileExtension = (filename: string): string => {
    const lastDot = filename.lastIndexOf('.');
    return lastDot > 0 ? filename.slice(lastDot) : '';
  };

  if (isEditing) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '6px',
          borderRadius: '4px',
          border: '2px solid #4CAF50',
        }}
      >
        <input
          type='text'
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSaveEdit}
          autoFocus
          style={{
            flex: 1,
            padding: '4px 8px',
            background: 'rgba(255, 255, 255, 0.9)',
            border: 'none',
            borderRadius: '3px',
            color: 'black',
            fontSize: '14px',
            outline: 'none',
          }}
        />
        <span style={{ color: '#888', fontSize: '12px' }}>
          {getFileExtension(video.originalName)}
        </span>
      </div>
    );
  }

  return (
    <div
      onClick={onSelect}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '4px',
        cursor: 'pointer',
        borderRadius: '4px',
        background: isSelected ? 'rgba(76, 175, 80, 0.2)' : 'transparent',
        border: isSelected
          ? '1px solid rgba(76, 175, 80, 0.5)'
          : '1px solid transparent',
      }}
    >
      {/* Selection indicator */}
      <div
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: isSelected ? '#4CAF50' : 'rgba(255, 255, 255, 0.3)',
          border: '2px solid',
          borderColor: isSelected ? '#4CAF50' : 'rgba(255, 255, 255, 0.5)',
          flexShrink: 0,
        }}
      />

      {/* File name */}
      <span
        style={{
          flex: 1,
          fontSize: '14px',
          color: video.isRenamed ? '#FFD700' : 'white',
          fontWeight: video.isRenamed ? 'bold' : 'normal',
          userSelect: 'none',
        }}
      >
        {video.name}
      </span>

      {/* Rename button */}
      <button
        onClick={handleStartEdit}
        style={{
          padding: '4px 8px',
          background: 'rgba(255, 255, 255, 0.2)',
          border: 'none',
          borderRadius: '3px',
          color: 'white',
          fontSize: '12px',
          cursor: 'pointer',
          opacity: isSelected ? 1 : 0.7,
        }}
        title='Rename file'
      >
        ✏️
      </button>

      {/* Quick save button (only show if renamed) */}
      {video.isRenamed && (
        <button
          onClick={handleQuickSave}
          disabled={isSaving}
          style={{
            padding: '4px 8px',
            background: isSaving
              ? 'rgba(128, 128, 128, 0.5)'
              : 'rgba(76, 175, 80, 0.8)',
            border: 'none',
            borderRadius: '3px',
            color: 'white',
            fontSize: '12px',
            cursor: isSaving ? 'not-allowed' : 'pointer',
            opacity: isSelected ? 1 : 0.7,
          }}
          title='Save with new name'
        >
          {isSaving ? '⏳' : '💾'}
        </button>
      )}
    </div>
  );
};

export default SimpleFileRename;
