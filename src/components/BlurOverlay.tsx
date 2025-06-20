import React, { useState, useEffect, useCallback } from 'react';
import { BlurState, MousePosition, STORAGE_KEYS, RADIUS_SIZES, BLUR_INTENSITIES, RadiusSize, BlurIntensity } from '../types';

const BlurOverlay: React.FC = () => {
    const [blurState, setBlurState] = useState<BlurState>({
        isActive: true,
        isCtrlPressed: false,
        mousePosition: { x: 0, y: 0 },
        clearRadius: 100,
        blurIntensity: 8
    });

    const [showRadiusChange, setShowRadiusChange] = useState(false);
    const [showBlurChange, setShowBlurChange] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Load settings from Chrome storage on mount
    useEffect(() => {
        const loadSettings = async () => {
            try {
                if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
                    const result = await chrome.storage.sync.get([
                        STORAGE_KEYS.BLUR_ENABLED,
                        STORAGE_KEYS.CLEAR_RADIUS,
                        STORAGE_KEYS.BLUR_INTENSITY
                    ]);

                    setBlurState(prev => ({
                        ...prev,
                        isActive: result[STORAGE_KEYS.BLUR_ENABLED] !== undefined ? result[STORAGE_KEYS.BLUR_ENABLED] : true,
                        clearRadius: result[STORAGE_KEYS.CLEAR_RADIUS] || 100,
                        blurIntensity: result[STORAGE_KEYS.BLUR_INTENSITY] || 8
                    }));
                }
            } catch (error) {
                console.error('Failed to load blur settings:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadSettings();
    }, []);

    // Save settings to Chrome storage
    const saveSettings = useCallback(async (isActive: boolean, radius: number, intensity: number) => {
        try {
            if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
                await chrome.storage.sync.set({
                    [STORAGE_KEYS.BLUR_ENABLED]: isActive,
                    [STORAGE_KEYS.CLEAR_RADIUS]: radius,
                    [STORAGE_KEYS.BLUR_INTENSITY]: intensity
                });
            }
        } catch (error) {
            console.error('Failed to save blur settings:', error);
        }
    }, []);

    // Listen for storage changes from other tabs
    useEffect(() => {
        const handleStorageChange = (changes: { [key: string]: chrome.storage.StorageChange }) => {
            let shouldUpdate = false;
            const updates: Partial<BlurState> = {};

            if (changes[STORAGE_KEYS.BLUR_ENABLED]) {
                updates.isActive = changes[STORAGE_KEYS.BLUR_ENABLED].newValue;
                shouldUpdate = true;
            }
            if (changes[STORAGE_KEYS.CLEAR_RADIUS]) {
                updates.clearRadius = changes[STORAGE_KEYS.CLEAR_RADIUS].newValue;
                shouldUpdate = true;
            }
            if (changes[STORAGE_KEYS.BLUR_INTENSITY]) {
                updates.blurIntensity = changes[STORAGE_KEYS.BLUR_INTENSITY].newValue;
                shouldUpdate = true;
            }

            if (shouldUpdate) {
                setBlurState(prev => ({ ...prev, ...updates }));
            }
        };

        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.onChanged) {
            chrome.storage.onChanged.addListener(handleStorageChange);
            return () => {
                chrome.storage.onChanged.removeListener(handleStorageChange);
            };
        }
    }, []);

    const updateMousePosition = useCallback((e: MouseEvent) => {
        setBlurState(prev => ({
            ...prev,
            mousePosition: { x: e.clientX, y: e.clientY }
        }));
    }, []);

    const cycleRadiusSize = useCallback(async () => {
        setBlurState(prev => {
            const currentIndex = RADIUS_SIZES.findIndex(size => size === prev.clearRadius);
            const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % RADIUS_SIZES.length : 0;
            const newRadius = RADIUS_SIZES[nextIndex];

            // Save the new radius
            saveSettings(prev.isActive, newRadius, prev.blurIntensity);

            // Show visual feedback
            setShowRadiusChange(true);
            setTimeout(() => setShowRadiusChange(false), 1500);

            return { ...prev, clearRadius: newRadius };
        });
    }, [saveSettings]);

    const cycleBlurIntensity = useCallback(async () => {
        setBlurState(prev => {
            const currentIndex = BLUR_INTENSITIES.findIndex(intensity => intensity === prev.blurIntensity);
            const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % BLUR_INTENSITIES.length : 0;
            const newIntensity = BLUR_INTENSITIES[nextIndex];

            // Save the new intensity
            saveSettings(prev.isActive, prev.clearRadius, newIntensity);

            // Show visual feedback
            setShowBlurChange(true);
            setTimeout(() => setShowBlurChange(false), 1500);

            return { ...prev, blurIntensity: newIntensity };
        });
    }, [saveSettings]);

    const toggleBlur = useCallback(async () => {
        setBlurState(prev => {
            const newActiveState = !prev.isActive;
            saveSettings(newActiveState, prev.clearRadius, prev.blurIntensity);
            return { ...prev, isActive: newActiveState };
        });
    }, [saveSettings]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        // Prevent if user is typing in an input
        if (e.target && (e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'TEXTAREA') {
            return;
        }

        if (e.key === 'Control' && !blurState.isCtrlPressed) {
            setBlurState(prev => ({ ...prev, isCtrlPressed: true }));
        }

        // Toggle blur with Ctrl+Shift+Q
        if (e.ctrlKey && e.shiftKey && e.code === 'KeyQ') {
            e.preventDefault();
            toggleBlur();
        }

        // Change radius size with Ctrl+Alt+P
        if (e.ctrlKey && e.altKey && e.code === 'KeyP') {
            e.preventDefault();
            cycleRadiusSize();
        }

        // Change blur intensity with Ctrl+Alt+B
        if (e.ctrlKey && e.altKey && e.code === 'KeyB') {
            e.preventDefault();
            cycleBlurIntensity();
        }
    }, [blurState.isCtrlPressed, toggleBlur, cycleRadiusSize, cycleBlurIntensity]);

    const handleKeyUp = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Control') {
            setBlurState(prev => ({ ...prev, isCtrlPressed: false }));
        }
    }, []);

    useEffect(() => {
        document.addEventListener('mousemove', updateMousePosition);
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('mousemove', updateMousePosition);
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, [updateMousePosition, handleKeyDown, handleKeyUp]);

    // Show loading or return null while loading
    if (isLoading) {
        return null;
    }

    if (!blurState.isActive) {
        return (
            <div
                style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    background: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontFamily: 'Arial, sans-serif',
                    zIndex: 1000000,
                    backdropFilter: 'blur(10px)',
                    opacity: 0.6
                }}
            >
                <div>Blur: <strong>OFF</strong></div>
                <div><strong>Ctrl+Shift+Q</strong> to enable</div>
            </div>
        );
    }

    const maskStyle = blurState.isCtrlPressed ? {
        maskImage: `radial-gradient(circle ${blurState.clearRadius}px at ${blurState.mousePosition.x}px ${blurState.mousePosition.y}px, transparent 0%, transparent 50%, black 100%)`,
        WebkitMaskImage: `radial-gradient(circle ${blurState.clearRadius}px at ${blurState.mousePosition.x}px ${blurState.mousePosition.y}px, transparent 0%, transparent 50%, black 100%)`
    } : {};

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: `blur(${blurState.blurIntensity}px)`,
                WebkitBackdropFilter: `blur(${blurState.blurIntensity}px)`,
                zIndex: 999999,
                pointerEvents: 'none',
                transition: blurState.isCtrlPressed ? 'none' : 'mask-image 0.2s ease-out, backdrop-filter 0.3s ease-out',
                ...maskStyle
            }}
        >
            {blurState.isCtrlPressed && (
                <div
                    style={{
                        position: 'absolute',
                        left: blurState.mousePosition.x - blurState.clearRadius,
                        top: blurState.mousePosition.y - blurState.clearRadius,
                        width: blurState.clearRadius * 2,
                        height: blurState.clearRadius * 2,
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '50%',
                        pointerEvents: 'none',
                        boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)'
                    }}
                />
            )}

            {/* Instructions overlay */}
            <div
                style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    background: 'rgba(0, 0, 0, 0.8)',
                    color: 'white',
                    padding: '10px 15px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'Arial, sans-serif',
                    zIndex: 1000000,
                    backdropFilter: 'blur(10px)'
                }}
            >
                <div>Hold <strong>Ctrl</strong> to see through blur</div>
                <div><strong>Ctrl+Shift+Q</strong> to toggle blur</div>
                <div><strong>Ctrl+Alt+P</strong> to change clear size</div>
                <div><strong>Ctrl+Alt+B</strong> to change blur intensity</div>
                <div style={{ marginTop: '5px', fontSize: '12px', opacity: 0.8 }}>
                    Size: <strong>{blurState.clearRadius}px</strong> | Blur: <strong>{blurState.blurIntensity}px</strong>
                </div>
            </div>

            {/* Radius change notification */}
            {showRadiusChange && (
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
                        zIndex: 1000001,
                        backdropFilter: 'blur(15px)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                        textAlign: 'center',
                        animation: 'fadeInOut 1.5s ease-in-out'
                    }}
                >
                    <div>Clear Area Size</div>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#4CAF50' }}>
                        {blurState.clearRadius}px
                    </div>
                </div>
            )}

            {/* Blur intensity change notification */}
            {showBlurChange && (
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
                        zIndex: 1000001,
                        backdropFilter: 'blur(15px)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                        textAlign: 'center',
                        animation: 'fadeInOut 1.5s ease-in-out'
                    }}
                >
                    <div>Blur Intensity</div>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#2196F3' }}>
                        {blurState.blurIntensity}px
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
        `}
            </style>
        </div>
    );
};

export default BlurOverlay;