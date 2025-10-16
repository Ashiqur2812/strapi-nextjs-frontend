'use client';

import { useState, useRef, useEffect } from 'react';

interface VideoPlayerProps {
    videoUrl: string;
    title: string;
}

export function VideoPlayer({ videoUrl, title }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);

        // Reset video when URL changes
        if (videoRef.current) {
            videoRef.current.load();
        }
    }, [videoUrl]);

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play().catch(err => {
                    setError('Failed to play video: ' + err.message);
                });
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleLoadedData = () => {
        setIsLoading(false);
        setError(null);
    };

    const handleError = () => {
        setIsLoading(false);
        setError('Failed to load video. Please check the URL.');
    };

    const handleVideoClick = () => {
        handlePlayPause();
    };

    // Check if the URL is from a supported platform or direct video file
    const isDirectVideo = videoUrl.match(/\.(mp4|webm|ogg|mov|avi|wmv)$/i);
    const isYouTube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');
    const isVimeo = videoUrl.includes('vimeo.com');

    if (isYouTube || isVimeo) {
        // For YouTube and Vimeo, we can use iframe embedding
        const getEmbedUrl = () => {
            if (isYouTube) {
                // Extract YouTube video ID
                const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
                const match = videoUrl.match(regExp);
                const videoId = (match && match[7].length === 11) ? match[7] : null;
                return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : videoUrl;
            } else if (isVimeo) {
                // Extract Vimeo video ID
                const regExp = /vimeo\.com\/(\d+)/;
                const match = videoUrl.match(regExp);
                const videoId = match ? match[1] : null;
                return videoId ? `https://player.vimeo.com/video/${videoId}?autoplay=1` : videoUrl;
            }
            return videoUrl;
        };

        return (
            <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
                <div className="aspect-video bg-stone-900">
                    <iframe
                        src={getEmbedUrl()}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={title}
                    />
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-stone-900">{title}</h3>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
            <div className="aspect-video bg-stone-900 relative group">
                {/* Video Element */}
                <video
                    ref={videoRef}
                    className="w-full h-full object-contain cursor-pointer"
                    onClick={handleVideoClick}
                    onLoadedData={handleLoadedData}
                    onError={handleError}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    controls={false} // We'll use custom controls
                >
                    <source src={videoUrl} type="video/mp4" />
                    <source src={videoUrl} type="video/webm" />
                    <source src={videoUrl} type="video/ogg" />
                    Your browser does not support the video tag.
                </video>

                {/* Loading State */}
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-stone-900/80">
                        <div className="text-center text-white">
                            <div className="w-12 h-12 mx-auto mb-4 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                            <p className="text-sm">Loading video...</p>
                        </div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="absolute inset-0 flex items-center justify-center bg-stone-900/80">
                        <div className="text-center text-white p-8">
                            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                                <svg
                                    className="w-10 h-10 text-red-400"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                                </svg>
                            </div>
                            <p className="text-lg font-medium">Error Loading Video</p>
                            <p className="text-sm text-white/70 mt-2">{error}</p>
                        </div>
                    </div>
                )}

                {/* Custom Play/Pause Overlay */}
                {!isLoading && !error && (
                    <div
                        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
                            }`}
                    >
                        <button
                            onClick={handlePlayPause}
                            className="w-20 h-20 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-sm transition-transform hover:scale-110"
                        >
                            {isPlaying ? (
                                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                                </svg>
                            ) : (
                                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            )}
                        </button>
                    </div>
                )}

                {/* Video Info Overlay */}
                {!isLoading && !error && isPlaying && (
                    <div className="absolute top-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white">
                            <h3 className="font-semibold">{title}</h3>
                        </div>
                    </div>
                )}
            </div>

            {/* Video Controls */}
            {!isLoading && !error && (
                <div className="p-4 border-t border-stone-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={handlePlayPause}
                                className="w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors"
                            >
                                {isPlaying ? (
                                    <svg className="w-5 h-5 text-stone-700" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5 text-stone-700" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                )}
                            </button>
                            <div>
                                <h3 className="font-semibold text-stone-900">{title}</h3>
                                <p className="text-sm text-stone-500">
                                    {isDirectVideo ? 'Direct Video' : 'Video URL'}
                                </p>
                            </div>
                        </div>
                        <a
                            href={videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-sky-600 hover:text-sky-700 underline"
                        >
                            Open Original
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}