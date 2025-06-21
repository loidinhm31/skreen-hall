// import {useContext} from "react";
// // Context
// const VideoPlayerContext = createContext<VideoPlayerContextType | null>(null);
//
// export interface VideoPlayerContextType {
//     videos: VideoFile[];
//     currentVideoIndex: number;
//     isPlaying: boolean;
//     volume: number;
//     playbackRate: number;
//     isFullscreen: boolean;
//     isLoading: boolean;
//     error: string | null;
//     setVideos: (videos: VideoFile[]) => void;
//     setCurrentVideoIndex: (index: number) => void;
//     setIsPlaying: (playing: boolean) => void;
//     setVolume: (volume: number) => void;
//     setPlaybackRate: (rate: number) => void;
//     setIsFullscreen: (fullscreen: boolean) => void;
//     setIsLoading: (loading: boolean) => void;
//     setError: (error: string | null) => void;
//     playNext: () => void;
//     playPrevious: () => void;
// }
//
// export const useVideoPlayer = () => {
//     const context = useContext(VideoPlayerContext);
//     if (!context) {
//         throw new Error('useVideoPlayer must be used within a VideoPlayerProvider');
//     }
//     return context;
// };
