import { createContext } from 'react';

import { VideoPlayerContextType } from '../../types/video-player-types';

const VideoPlayerContext = createContext<VideoPlayerContextType | null>(null);

export { VideoPlayerContext };
