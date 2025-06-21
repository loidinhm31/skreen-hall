import React, { useCallback, useEffect, useRef, useState } from 'react';

interface TitleState {
  originalTitle: string;
  customTitle: string;
  titleEditMode: boolean;
  isEnabled: boolean;
}

const TITLE_STORAGE_KEYS = {
  TITLE_ENABLED: 'titleChanger_enabled',
  ORIGINAL_TITLE: 'titleChanger_originalTitle',
  CUSTOM_TITLE: 'titleChanger_customTitle',
};

const TitleChanger: React.FC = () => {
  const [titleState, setTitleState] = useState<TitleState>({
    originalTitle: document.title,
    customTitle: '',
    titleEditMode: false,
    isEnabled: true,
  });

  const [showTitleChange, setShowTitleChange] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const titleInputRef = useRef<HTMLInputElement>(null);

  // Load settings from Chrome storage on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        if (
          typeof chrome !== 'undefined' &&
          chrome.storage &&
          chrome.storage.sync
        ) {
          const result = await chrome.storage.sync.get([
            TITLE_STORAGE_KEYS.TITLE_ENABLED,
            TITLE_STORAGE_KEYS.ORIGINAL_TITLE,
            TITLE_STORAGE_KEYS.CUSTOM_TITLE,
          ]);

          const originalTitle =
            result[TITLE_STORAGE_KEYS.ORIGINAL_TITLE] || document.title;
          const customTitle = result[TITLE_STORAGE_KEYS.CUSTOM_TITLE] || '';
          const isEnabled =
            result[TITLE_STORAGE_KEYS.TITLE_ENABLED] !== undefined
              ? result[TITLE_STORAGE_KEYS.TITLE_ENABLED]
              : true;

          setTitleState((prev) => ({
            ...prev,
            isEnabled,
            originalTitle,
            customTitle,
          }));

          // Apply custom title if it exists and is enabled
          if (customTitle && isEnabled) {
            document.title = customTitle;
          }
        }
      } catch (error) {
        console.error('Failed to load title settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  // Save settings to Chrome storage
  const saveSettings = useCallback(
    async (
      isEnabled: boolean,
      originalTitle?: string,
      customTitle?: string
    ) => {
      try {
        if (
          typeof chrome !== 'undefined' &&
          chrome.storage &&
          chrome.storage.sync
        ) {
          const dataToSave: { [key: string]: any } = {
            [TITLE_STORAGE_KEYS.TITLE_ENABLED]: isEnabled,
          };

          if (originalTitle !== undefined) {
            dataToSave[TITLE_STORAGE_KEYS.ORIGINAL_TITLE] = originalTitle;
          }

          if (customTitle !== undefined) {
            dataToSave[TITLE_STORAGE_KEYS.CUSTOM_TITLE] = customTitle;
          }

          await chrome.storage.sync.set(dataToSave);
        }
      } catch (error) {
        console.error('Failed to save title settings:', error);
      }
    },
    []
  );

  // Listen for storage changes from other tabs
  useEffect(() => {
    const handleStorageChange = (changes: {
      [key: string]: chrome.storage.StorageChange;
    }) => {
      let shouldUpdate = false;
      const updates: Partial<TitleState> = {};

      if (changes[TITLE_STORAGE_KEYS.TITLE_ENABLED]) {
        updates.isEnabled = changes[TITLE_STORAGE_KEYS.TITLE_ENABLED].newValue;
        shouldUpdate = true;
      }
      if (changes[TITLE_STORAGE_KEYS.CUSTOM_TITLE]) {
        updates.customTitle = changes[TITLE_STORAGE_KEYS.CUSTOM_TITLE].newValue;
        const newTitle = changes[TITLE_STORAGE_KEYS.CUSTOM_TITLE].newValue;
        if (newTitle && updates.isEnabled !== false) {
          document.title = newTitle;
        } else if (!newTitle) {
          // Restore original title if custom title is cleared
          const originalTitle =
            changes[TITLE_STORAGE_KEYS.ORIGINAL_TITLE]?.newValue ||
            titleState.originalTitle;
          document.title = originalTitle;
        }
        shouldUpdate = true;
      }

      if (shouldUpdate) {
        setTitleState((prev) => ({ ...prev, ...updates }));
      }
    };

    if (
      typeof chrome !== 'undefined' &&
      chrome.storage &&
      chrome.storage.onChanged
    ) {
      chrome.storage.onChanged.addListener(handleStorageChange);
      return () => {
        chrome.storage.onChanged.removeListener(handleStorageChange);
      };
    }
  }, [titleState.originalTitle]);

  const toggleTitleChanger = useCallback(async () => {
    setTitleState((prev) => {
      const newEnabledState = !prev.isEnabled;
      saveSettings(newEnabledState);

      // Apply or remove custom title based on new state
      if (newEnabledState && prev.customTitle) {
        document.title = prev.customTitle;
      } else if (!newEnabledState) {
        document.title = prev.originalTitle;
      }

      return { ...prev, isEnabled: newEnabledState };
    });
  }, [saveSettings]);

  const enterTitleEditMode = useCallback(() => {
    if (!titleState.isEnabled) return;

    setTitleState((prev) => ({
      ...prev,
      titleEditMode: true,
      customTitle: prev.customTitle || document.title,
    }));

    // Focus the input after a short delay to ensure it's rendered
    setTimeout(() => {
      titleInputRef.current?.focus();
      titleInputRef.current?.select();
    }, 100);
  }, [titleState.isEnabled]);

  const exitTitleEditMode = useCallback(
    (save: boolean = false) => {
      setTitleState((prev) => {
        if (save && prev.customTitle.trim()) {
          // Save the original title if this is the first time setting a custom title
          const originalTitle = prev.originalTitle || document.title;
          document.title = prev.customTitle.trim();
          saveSettings(prev.isEnabled, originalTitle, prev.customTitle.trim());

          // Show visual feedback
          setShowTitleChange(true);
          setTimeout(() => setShowTitleChange(false), 1500);

          return {
            ...prev,
            titleEditMode: false,
            originalTitle,
            customTitle: prev.customTitle.trim(),
          };
        } else {
          return { ...prev, titleEditMode: false };
        }
      });
    },
    [saveSettings]
  );

  const restoreOriginalTitle = useCallback(() => {
    if (!titleState.isEnabled) return;

    setTitleState((prev) => {
      if (prev.originalTitle) {
        document.title = prev.originalTitle;
        saveSettings(prev.isEnabled, prev.originalTitle, '');

        // Show visual feedback
        setShowTitleChange(true);
        setTimeout(() => setShowTitleChange(false), 1500);

        return { ...prev, customTitle: '' };
      }
      return prev;
    });
  }, [saveSettings, titleState.isEnabled]);

  const handleTitleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitleState((prev) => ({ ...prev, customTitle: e.target.value }));
    },
    []
  );

  const handleTitleInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        exitTitleEditMode(true);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        exitTitleEditMode(false);
      }
    },
    [exitTitleEditMode]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Prevent if user is typing in an input (except our title input)
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') &&
        target !== titleInputRef.current
      ) {
        return;
      }

      // Don't process shortcuts if in title edit mode
      if (titleState.titleEditMode) {
        return;
      }

      // Toggle title changer with Ctrl+Shift+F
      if (e.ctrlKey && e.shiftKey && e.code === 'KeyF') {
        e.preventDefault();
        toggleTitleChanger();
      }

      // Edit title with Ctrl+Alt+T (only if enabled)
      if (e.ctrlKey && e.altKey && e.code === 'KeyT') {
        e.preventDefault();
        enterTitleEditMode();
      }

      // Restore original title with Ctrl+Alt+R (only if enabled)
      if (e.ctrlKey && e.altKey && e.code === 'KeyR') {
        e.preventDefault();
        restoreOriginalTitle();
      }
    },
    [
      titleState.titleEditMode,
      toggleTitleChanger,
      enterTitleEditMode,
      restoreOriginalTitle,
    ]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Show loading or return null while loading
  if (isLoading) {
    return null;
  }

  return (
    <>
      {/* Title edit input */}
      {titleState.titleEditMode && titleState.isEnabled && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(0, 0, 0, 0.95)',
            color: 'white',
            padding: '25px 30px',
            borderRadius: '12px',
            fontSize: '16px',
            fontFamily: 'Arial, sans-serif',
            zIndex: 1000002,
            backdropFilter: 'blur(15px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            minWidth: '400px',
            pointerEvents: 'auto',
          }}
        >
          <div
            style={{
              marginBottom: '15px',
              fontSize: '18px',
              fontWeight: 'bold',
            }}
          >
            Edit Tab Title
          </div>
          <input
            ref={titleInputRef}
            type='text'
            value={titleState.customTitle}
            onChange={handleTitleInputChange}
            onKeyDown={handleTitleInputKeyDown}
            placeholder='Enter new tab title...'
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              border: '2px solid #333',
              borderRadius: '6px',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              outline: 'none',
            }}
          />
          <div style={{ marginTop: '15px', fontSize: '14px', opacity: 0.8 }}>
            Press <strong>Enter</strong> to save, <strong>Esc</strong> to cancel
          </div>
          <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
            <button
              onClick={() => exitTitleEditMode(true)}
              style={{
                padding: '8px 16px',
                background: '#4CAF50',
                border: 'none',
                borderRadius: '4px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Save
            </button>
            <button
              onClick={() => exitTitleEditMode(false)}
              style={{
                padding: '8px 16px',
                background: '#666',
                border: 'none',
                borderRadius: '4px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Title change notification */}
      {showTitleChange && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(0, 0, 0, 0.9)',
            color: 'white',
            padding: '20px 30px',
            borderRadius: '12px',
            fontSize: '24px',
            fontFamily: 'Arial, sans-serif',
            zIndex: 1000002,
            backdropFilter: 'blur(15px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            textAlign: 'center',
            animation: 'titleFadeInOut 1.5s ease-in-out',
          }}
        >
          <div>Tab Title {titleState.customTitle ? 'Changed' : 'Restored'}</div>
          <div
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#FF9800',
              maxWidth: '300px',
              wordBreak: 'break-word',
            }}
          >
            {document.title}
          </div>
        </div>
      )}

      <style>
        {`
                    @keyframes titleFadeInOut {
                        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                        20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                        80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                    }
                `}
      </style>
    </>
  );
};

export default TitleChanger;
