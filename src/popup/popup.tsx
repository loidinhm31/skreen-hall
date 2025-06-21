import { BLUR_STORAGE_KEYS, FakeAppType, TITLE_STORAGE_KEYS } from '../types';

interface PopupState {
  blurEnabled: boolean;
  clearRadius: number;
  blurIntensity: number;
  fakeAppType: FakeAppType;
  titleEnabled: boolean;
  customTitle: string;
}

class PopupController {
  private state: PopupState = {
    blurEnabled: true,
    clearRadius: 100,
    blurIntensity: 8,
    fakeAppType: 'none',
    titleEnabled: true,
    customTitle: '',
  };

  private elements: {
    blurStatus: HTMLElement | null;
    clearSize: HTMLElement | null;
    blurIntensity: HTMLElement | null;
    fakeApp: HTMLElement | null;
    titleStatus: HTMLElement | null;
    customTitleStatus: HTMLElement | null;
    toggleButton: HTMLElement | null;
    videoPlayerButton: HTMLElement | null;
  } = {
    blurStatus: null,
    clearSize: null,
    blurIntensity: null,
    fakeApp: null,
    titleStatus: null,
    customTitleStatus: null,
    toggleButton: null,
    videoPlayerButton: null,
  };

  constructor() {
    this.initializeElements();
    this.loadSettings();
    this.setupEventListeners();
  }

  private initializeElements(): void {
    this.elements.blurStatus = document.getElementById('blur-status');
    this.elements.clearSize = document.getElementById('clear-size');
    this.elements.blurIntensity = document.getElementById('blur-intensity');
    this.elements.fakeApp = document.getElementById('fake-app');
    this.elements.titleStatus = document.getElementById('title-status');
    this.elements.customTitleStatus = document.getElementById(
      'custom-title-status'
    );
    this.elements.toggleButton = document.getElementById('toggle-blur');
    this.elements.videoPlayerButton = document.getElementById(
      'video-player-button'
    );
  }

  private async loadSettings(): Promise<void> {
    try {
      const result = await chrome.storage.sync.get([
        BLUR_STORAGE_KEYS.BLUR_ENABLED,
        BLUR_STORAGE_KEYS.CLEAR_RADIUS,
        BLUR_STORAGE_KEYS.BLUR_INTENSITY,
        BLUR_STORAGE_KEYS.FAKE_APP_TYPE,
        TITLE_STORAGE_KEYS.TITLE_ENABLED,
        TITLE_STORAGE_KEYS.CUSTOM_TITLE,
      ]);

      this.state = {
        blurEnabled:
          result[BLUR_STORAGE_KEYS.BLUR_ENABLED] !== undefined
            ? result[BLUR_STORAGE_KEYS.BLUR_ENABLED]
            : true,
        clearRadius: result[BLUR_STORAGE_KEYS.CLEAR_RADIUS] || 100,
        blurIntensity: result[BLUR_STORAGE_KEYS.BLUR_INTENSITY] || 8,
        fakeAppType: result[BLUR_STORAGE_KEYS.FAKE_APP_TYPE] || 'none',
        titleEnabled:
          result[TITLE_STORAGE_KEYS.TITLE_ENABLED] !== undefined
            ? result[TITLE_STORAGE_KEYS.TITLE_ENABLED]
            : true,
        customTitle: result[TITLE_STORAGE_KEYS.CUSTOM_TITLE] || '',
      };

      this.updateUI();
    } catch (error) {
      console.error('Failed to load settings:', error);
      this.updateUI();
    }
  }

  private setupEventListeners(): void {
    // Toggle blur button
    this.elements.toggleButton?.addEventListener('click', () => {
      this.toggleBlur();
    });

    // Video player button
    this.elements.videoPlayerButton?.addEventListener('click', () => {
      this.openVideoPlayer();
    });

    // Listen for storage changes
    chrome.storage.onChanged.addListener((changes) => {
      let shouldUpdate = false;

      if (changes[BLUR_STORAGE_KEYS.BLUR_ENABLED]) {
        this.state.blurEnabled =
          changes[BLUR_STORAGE_KEYS.BLUR_ENABLED].newValue;
        shouldUpdate = true;
      }
      if (changes[BLUR_STORAGE_KEYS.CLEAR_RADIUS]) {
        this.state.clearRadius =
          changes[BLUR_STORAGE_KEYS.CLEAR_RADIUS].newValue;
        shouldUpdate = true;
      }
      if (changes[BLUR_STORAGE_KEYS.BLUR_INTENSITY]) {
        this.state.blurIntensity =
          changes[BLUR_STORAGE_KEYS.BLUR_INTENSITY].newValue;
        shouldUpdate = true;
      }
      if (changes[BLUR_STORAGE_KEYS.FAKE_APP_TYPE]) {
        this.state.fakeAppType =
          changes[BLUR_STORAGE_KEYS.FAKE_APP_TYPE].newValue;
        shouldUpdate = true;
      }
      if (changes[TITLE_STORAGE_KEYS.TITLE_ENABLED]) {
        this.state.titleEnabled =
          changes[TITLE_STORAGE_KEYS.TITLE_ENABLED].newValue;
        shouldUpdate = true;
      }
      if (changes[TITLE_STORAGE_KEYS.CUSTOM_TITLE]) {
        this.state.customTitle =
          changes[TITLE_STORAGE_KEYS.CUSTOM_TITLE].newValue;
        shouldUpdate = true;
      }

      if (shouldUpdate) {
        this.updateUI();
      }
    });
  }

  private async toggleBlur(): Promise<void> {
    try {
      const newState = !this.state.blurEnabled;
      await chrome.storage.sync.set({
        [BLUR_STORAGE_KEYS.BLUR_ENABLED]: newState,
      });
      this.state.blurEnabled = newState;
      this.updateUI();
    } catch (error) {
      console.error('Failed to toggle blur:', error);
    }
  }

  private async openVideoPlayer(): Promise<void> {
    try {
      // Create the video player page URL
      const videoPlayerUrl = chrome.runtime.getURL('video-player.html');

      // Open in a new tab
      await chrome.tabs.create({
        url: videoPlayerUrl,
        active: true,
      });

      // Close the popup
      window.close();
    } catch (error) {
      console.error('Failed to open video player:', error);

      // Fallback: try to open as popup window
      try {
        const videoPlayerUrl = chrome.runtime.getURL('video-player.html');
        window.open(
          videoPlayerUrl,
          'videoPlayer',
          'width=1200,height=800,scrollbars=yes,resizable=yes'
        );
        window.close();
      } catch (fallbackError) {
        console.error('Fallback failed:', fallbackError);
        alert('Unable to open video player. Please check permissions.');
      }
    }
  }

  private getFakeAppName(type: FakeAppType): string {
    switch (type) {
      case 'none':
        return 'None';
      case 'code':
        return 'VS Code';
      case 'terminal':
        return 'Terminal';
      case 'spreadsheet':
        return 'Excel';
      case 'email':
        return 'Outlook';
      case 'document':
        return 'Word';
      case 'meeting':
        return 'Teams';
      case 'monitoring':
        return 'Monitor';
      default:
        return 'None';
    }
  }

  private updateUI(): void {
    // Update status indicators
    if (this.elements.blurStatus) {
      this.elements.blurStatus.textContent = this.state.blurEnabled
        ? 'ON'
        : 'OFF';
      this.elements.blurStatus.style.color = this.state.blurEnabled
        ? '#4CAF50'
        : '#FF5722';
    }

    if (this.elements.clearSize) {
      this.elements.clearSize.textContent = `${this.state.clearRadius}px`;
    }

    if (this.elements.blurIntensity) {
      this.elements.blurIntensity.textContent = `${this.state.blurIntensity}px`;
    }

    if (this.elements.fakeApp) {
      this.elements.fakeApp.textContent = this.getFakeAppName(
        this.state.fakeAppType
      );
    }

    if (this.elements.titleStatus) {
      this.elements.titleStatus.textContent = this.state.titleEnabled
        ? 'ON'
        : 'OFF';
      this.elements.titleStatus.style.color = this.state.titleEnabled
        ? '#4CAF50'
        : '#FF5722';
    }

    if (this.elements.customTitleStatus) {
      const hasCustomTitle =
        this.state.customTitle && this.state.customTitle.trim() !== '';
      if (hasCustomTitle && this.state.titleEnabled) {
        this.elements.customTitleStatus.textContent = 'Active';
        this.elements.customTitleStatus.style.color = '#FF9800';
      } else {
        this.elements.customTitleStatus.textContent = 'None';
        this.elements.customTitleStatus.style.color = '#888';
      }
    }

    // Update toggle button
    if (this.elements.toggleButton) {
      this.elements.toggleButton.textContent = this.state.blurEnabled
        ? 'Disable Blur'
        : 'Enable Blur';
      if (this.state.blurEnabled) {
        this.elements.toggleButton.classList.add('active');
      } else {
        this.elements.toggleButton.classList.remove('active');
      }
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PopupController();
});
