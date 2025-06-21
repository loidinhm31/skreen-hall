import React, { useCallback, useEffect, useState } from "react";
import { BLUR_INTENSITIES, BLUR_STORAGE_KEYS, FAKE_APP_TYPES, FakeAppType, RADIUS_SIZES } from "../types";
import { ExtendedBlurState, renderMimicApp } from "./MimicApp";

const BlurOverlay: React.FC = () => {
  const [blurState, setBlurState] = useState<ExtendedBlurState>({
    isActive: true,
    isUnblurRegionActive: false,
    mousePosition: { x: 0, y: 0 },
    clearRadius: 100,
    blurIntensity: 8,
    fakeAppType: "none",
  });

  const [showRadiusChange, setShowRadiusChange] = useState(false);
  const [showBlurChange, setShowBlurChange] = useState(false);
  const [showFakeAppChange, setShowFakeAppChange] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load settings from Chrome storage on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.sync) {
          const result = await chrome.storage.sync.get([
            BLUR_STORAGE_KEYS.BLUR_ENABLED,
            BLUR_STORAGE_KEYS.CLEAR_RADIUS,
            BLUR_STORAGE_KEYS.BLUR_INTENSITY,
            BLUR_STORAGE_KEYS.FAKE_APP_TYPE,
          ]);

          setBlurState((prev) => ({
            ...prev,
            isActive:
              result[BLUR_STORAGE_KEYS.BLUR_ENABLED] !== undefined ? result[BLUR_STORAGE_KEYS.BLUR_ENABLED] : true,
            clearRadius: result[BLUR_STORAGE_KEYS.CLEAR_RADIUS] || 100,
            blurIntensity: result[BLUR_STORAGE_KEYS.BLUR_INTENSITY] || 8,
            fakeAppType: result[BLUR_STORAGE_KEYS.FAKE_APP_TYPE] || "none",
          }));
        }
      } catch (error) {
        console.error("Failed to load blur settings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  // Save settings to Chrome storage
  const saveSettings = useCallback(
    async (isActive: boolean, radius: number, intensity: number, fakeAppType?: FakeAppType) => {
      try {
        if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.sync) {
          const dataToSave: any = {
            [BLUR_STORAGE_KEYS.BLUR_ENABLED]: isActive,
            [BLUR_STORAGE_KEYS.CLEAR_RADIUS]: radius,
            [BLUR_STORAGE_KEYS.BLUR_INTENSITY]: intensity,
          };

          if (fakeAppType !== undefined) {
            dataToSave[BLUR_STORAGE_KEYS.FAKE_APP_TYPE] = fakeAppType;
          }

          await chrome.storage.sync.set(dataToSave);
        }
      } catch (error) {
        console.error("Failed to save blur settings:", error);
      }
    },
    [],
  );

  const updateMousePosition = useCallback((e: MouseEvent) => {
    setBlurState((prev) => ({
      ...prev,
      mousePosition: { x: e.clientX, y: e.clientY },
    }));
  }, []);

  // Listen for storage changes from other tabs
  useEffect(() => {
    const handleStorageChange = (changes: { [key: string]: chrome.storage.StorageChange }) => {
      let shouldUpdate = false;
      const updates: Partial<ExtendedBlurState> = {};

      if (changes[BLUR_STORAGE_KEYS.BLUR_ENABLED]) {
        updates.isActive = changes[BLUR_STORAGE_KEYS.BLUR_ENABLED].newValue;
        shouldUpdate = true;
      }
      if (changes[BLUR_STORAGE_KEYS.CLEAR_RADIUS]) {
        updates.clearRadius = changes[BLUR_STORAGE_KEYS.CLEAR_RADIUS].newValue;
        shouldUpdate = true;
      }
      if (changes[BLUR_STORAGE_KEYS.BLUR_INTENSITY]) {
        updates.blurIntensity = changes[BLUR_STORAGE_KEYS.BLUR_INTENSITY].newValue;
        shouldUpdate = true;
      }
      if (changes[BLUR_STORAGE_KEYS.FAKE_APP_TYPE]) {
        updates.fakeAppType = changes[BLUR_STORAGE_KEYS.FAKE_APP_TYPE].newValue;
        shouldUpdate = true;
      }

      if (shouldUpdate) {
        setBlurState((prev) => ({ ...prev, ...updates }));
      }
    };

    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.onChanged) {
      chrome.storage.onChanged.addListener(handleStorageChange);
      return () => {
        chrome.storage.onChanged.removeListener(handleStorageChange);
      };
    }
  }, []);

  const cycleRadiusSize = useCallback(async () => {
    setBlurState((prev) => {
      const currentIndex = RADIUS_SIZES.findIndex((size) => size === prev.clearRadius);
      const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % RADIUS_SIZES.length : 0;
      const newRadius = RADIUS_SIZES[nextIndex];

      saveSettings(prev.isActive, newRadius, prev.blurIntensity);

      setShowRadiusChange(true);
      setTimeout(() => setShowRadiusChange(false), 1500);

      return { ...prev, clearRadius: newRadius };
    });
  }, [saveSettings]);

  const cycleBlurIntensity = useCallback(async () => {
    setBlurState((prev) => {
      const currentIndex = BLUR_INTENSITIES.findIndex((intensity) => intensity === prev.blurIntensity);
      const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % BLUR_INTENSITIES.length : 0;
      const newIntensity = BLUR_INTENSITIES[nextIndex];

      saveSettings(prev.isActive, prev.clearRadius, newIntensity);

      setShowBlurChange(true);
      setTimeout(() => setShowBlurChange(false), 1500);

      return { ...prev, blurIntensity: newIntensity };
    });
  }, [saveSettings]);

  const cycleFakeApp = useCallback(async () => {
    setBlurState((prev) => {
      const currentIndex = FAKE_APP_TYPES.findIndex((app) => app === prev.fakeAppType);
      const nextIndex = (currentIndex + 1) % FAKE_APP_TYPES.length;
      const newFakeApp = FAKE_APP_TYPES[nextIndex];

      saveSettings(prev.isActive, prev.clearRadius, prev.blurIntensity, newFakeApp);

      setShowFakeAppChange(true);
      setTimeout(() => setShowFakeAppChange(false), 1500);

      return { ...prev, fakeAppType: newFakeApp };
    });
  }, [saveSettings]);

  const toggleBlur = useCallback(async () => {
    setBlurState((prev) => {
      const newActiveState = !prev.isActive;
      saveSettings(newActiveState, prev.clearRadius, prev.blurIntensity);
      return { ...prev, isActive: newActiveState };
    });
  }, [saveSettings]);

  const toggleUnblurRegion = useCallback(() => {
    setBlurState((prev) => ({
      ...prev,
      isUnblurRegionActive: !prev.isUnblurRegionActive,
    }));
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (
        (e.target && (e.target as HTMLElement).tagName === "INPUT") ||
        (e.target as HTMLElement).tagName === "TEXTAREA"
      ) {
        return;
      }

      // Toggle unblur region with just Ctrl key (single press)
      if (e.key === "Control" && !e.shiftKey && !e.altKey && !e.metaKey) {
        e.preventDefault();
        toggleUnblurRegion();
      }

      // Toggle blur with Ctrl+Shift+Q
      if (e.ctrlKey && e.shiftKey && e.code === "KeyQ") {
        e.preventDefault();
        toggleBlur();
      }

      // Change radius size with Ctrl+Alt+P
      if (e.ctrlKey && e.altKey && e.code === "KeyP") {
        e.preventDefault();
        cycleRadiusSize();
      }

      // Change blur intensity with Ctrl+Alt+B
      if (e.ctrlKey && e.altKey && e.code === "KeyB") {
        e.preventDefault();
        cycleBlurIntensity();
      }

      // Cycle fake app with Ctrl+Alt+F
      if (e.ctrlKey && e.altKey && e.code === "KeyF") {
        e.preventDefault();
        cycleFakeApp();
      }
    },
    [toggleUnblurRegion, toggleBlur, cycleRadiusSize, cycleBlurIntensity, cycleFakeApp],
  );

  useEffect(() => {
    document.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [updateMousePosition, handleKeyDown]);

  const getFakeAppName = (type: FakeAppType): string => {
    switch (type) {
      case "none":
        return "None";
      case "code":
        return "VS Code";
      case "terminal":
        return "Terminal";
      case "spreadsheet":
        return "Excel";
      case "email":
        return "Outlook";
      case "document":
        return "Word";
      case "meeting":
        return "Teams";
      case "monitoring":
        return "Monitor";
      default:
        return "None";
    }
  };

  // Show loading or return null while loading
  if (isLoading) {
    return null;
  }

  if (!blurState.isActive) {
    return null;
  }

  const maskStyle = blurState.isUnblurRegionActive
    ? {
        maskImage: `radial-gradient(circle ${blurState.clearRadius}px at ${blurState.mousePosition.x}px ${blurState.mousePosition.y}px, transparent 0%, transparent 50%, black 100%)`,
        WebkitMaskImage: `radial-gradient(circle ${blurState.clearRadius}px at ${blurState.mousePosition.x}px ${blurState.mousePosition.y}px, transparent 0%, transparent 50%, black 100%)`,
      }
    : {};

  return (
    <>
      {/* Blur layer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: blurState.fakeAppType === "none" ? `blur(${blurState.blurIntensity}px)` : "none",
          WebkitBackdropFilter: blurState.fakeAppType === "none" ? `blur(${blurState.blurIntensity}px)` : "none",
          zIndex: 999999,
          pointerEvents: "none",
          transition: "backdrop-filter 0.3s ease-out",
          ...maskStyle,
        }}
      />

      {/* Fake App Layer */}
      {blurState.fakeAppType !== "none" && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 1000000,
            pointerEvents: "none",
            ...maskStyle,
          }}
        >
          {renderMimicApp(blurState)}
        </div>
      )}

      {/* Clear area indicator */}
      {blurState.isUnblurRegionActive && (
        <div
          style={{
            position: "fixed",
            left: blurState.mousePosition.x - blurState.clearRadius,
            top: blurState.mousePosition.y - blurState.clearRadius,
            width: blurState.clearRadius * 2,
            height: blurState.clearRadius * 2,
            border: "2px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "50%",
            pointerEvents: "none",
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
            zIndex: 1000001,
          }}
        />
      )}

      {/* Radius change notification */}
      {showRadiusChange && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(0, 0, 0, 0.9)",
            color: "white",
            padding: "20px 30px",
            borderRadius: "12px",
            fontSize: "24px",
            fontFamily: "Arial, sans-serif",
            zIndex: 1000003,
            backdropFilter: "blur(15px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            textAlign: "center",
            animation: "fadeInOut 1.5s ease-in-out",
          }}
        >
          <div>Clear Area Size</div>
          <div style={{ fontSize: "32px", fontWeight: "bold", color: "#4CAF50" }}>{blurState.clearRadius}px</div>
        </div>
      )}

      {/* Blur intensity change notification */}
      {showBlurChange && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(0, 0, 0, 0.9)",
            color: "white",
            padding: "20px 30px",
            borderRadius: "12px",
            fontSize: "24px",
            fontFamily: "Arial, sans-serif",
            zIndex: 1000003,
            backdropFilter: "blur(15px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            textAlign: "center",
            animation: "fadeInOut 1.5s ease-in-out",
          }}
        >
          <div>Blur Intensity</div>
          <div style={{ fontSize: "32px", fontWeight: "bold", color: "#2196F3" }}>{blurState.blurIntensity}px</div>
        </div>
      )}

      {/* Fake app change notification */}
      {showFakeAppChange && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(0, 0, 0, 0.9)",
            color: "white",
            padding: "20px 30px",
            borderRadius: "12px",
            fontSize: "24px",
            fontFamily: "Arial, sans-serif",
            zIndex: 1000003,
            backdropFilter: "blur(15px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            textAlign: "center",
            animation: "fadeInOut 1.5s ease-in-out",
          }}
        >
          <div>Fake App</div>
          <div style={{ fontSize: "32px", fontWeight: "bold", color: "#FF9800" }}>
            {getFakeAppName(blurState.fakeAppType)}
          </div>
        </div>
      )}

      <style>
        {`
                    @keyframes fadeInOut {
                        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                        20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                        80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                    }
                    .blink {
                        animation: blink 1s linear infinite;
                    }
                    @keyframes blink {
                        0%, 50% { opacity: 1; }
                        51%, 100% { opacity: 0; }
                    }
                `}
      </style>
    </>
  );
};

export default BlurOverlay;
