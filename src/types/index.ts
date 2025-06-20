export interface MousePosition {
    x: number;
    y: number;
}

export interface BlurState {
    isActive: boolean;
    isCtrlPressed: boolean; // Keeping for backward compatibility
    mousePosition: MousePosition;
    clearRadius: number;
    blurIntensity: number;
}

export type FakeAppType = 'none' | 'code' | 'terminal' | 'spreadsheet' | 'email' | 'document' | 'meeting' | 'monitoring';

export const BLUR_STORAGE_KEYS = {
    BLUR_ENABLED: 'screenBlur_enabled',
    CLEAR_RADIUS: 'screenBlur_clearRadius',
    BLUR_INTENSITY: 'screenBlur_blurIntensity',
    FAKE_APP_TYPE: 'screenBlur_fakeAppType'
};

export  const TITLE_STORAGE_KEYS = {
    TITLE_ENABLED: 'titleChanger_enabled',
    ORIGINAL_TITLE: 'titleChanger_originalTitle',
    CUSTOM_TITLE: 'titleChanger_customTitle'
};


export const RADIUS_SIZES = [50, 75, 100, 125, 150, 200, 250, 300] as const;
export const BLUR_INTENSITIES = [2, 4, 6, 8, 10, 15, 20, 25, 50] as const;
export const FAKE_APP_TYPES: FakeAppType[] = ['none', 'code', 'terminal', 'spreadsheet', 'email', 'document', 'meeting', 'monitoring'];

export type RadiusSize = typeof RADIUS_SIZES[number];
export type BlurIntensity = typeof BLUR_INTENSITIES[number];