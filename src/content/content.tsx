import React from 'react';
import { createRoot } from 'react-dom/client';
import BlurOverlay from '../components/BlurOverlay';
import TitleChanger from '../components/TitleChanger';
import './content.css';

// Prevent multiple injections
if (!document.getElementById('blur-overlay-root')) {
    // Create container for Blur overlay
    const blurContainer = document.createElement('div');
    blurContainer.id = 'blur-overlay-root';
    blurContainer.className = 'blur-overlay-root';

    // Create container for Title changer
    const titleContainer = document.createElement('div');
    titleContainer.id = 'title-changer-root';
    titleContainer.className = 'title-changer-root';

    // Append both containers to body
    document.body.appendChild(blurContainer);
    document.body.appendChild(titleContainer);

    // Create React roots and render components
    const blurRoot = createRoot(blurContainer);
    blurRoot.render(<BlurOverlay />);

    const titleRoot = createRoot(titleContainer);
    titleRoot.render(<TitleChanger />);

    // Add body class for potential styling
    document.body.classList.add('blur-overlay-active');

    console.log('Screen Extensions: Blur Overlay and Title Changer injected successfully');
}