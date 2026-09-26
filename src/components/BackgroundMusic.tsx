import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

/**
 * BackgroundMusic Component
 * Plays YouTube video https://youtu.be/CnVVjLOGVoY in the background silently/automatically.
 * Video ID: CnVVjLOGVoY
 * No UI button is shown (per user requirement: "tidak usah menampilkan button musicnya").
 * Handles autoplay restrictions gracefully by starting immediately or on the very first user interaction.
 */
export function BackgroundMusic() {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    const videoId = 'CnVVjLOGVoY';

    // 1. Function to initialize the YT player once API is ready
    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;
      if (playerRef.current) return;

      try {
        playerRef.current = new window.YT.Player('yt-bg-audio-frame', {
          height: '1',
          width: '1',
          videoId: videoId,
          playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            enablejsapi: 1,
            fs: 0,
            loop: 1,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            playlist: videoId,
          },
          events: {
            onReady: (event: any) => {
              try {
                event.target.unMute();
                event.target.setVolume(85);
                event.target.playVideo();
                hasStartedRef.current = true;
              } catch {
                // Autoplay might be deferred until user gesture
              }
            },
            onStateChange: (event: any) => {
              // YT.PlayerState.PLAYING = 1
              if (event.data === 1) {
                hasStartedRef.current = true;
              }
            },
          },
        });
      } catch (err) {
        console.error('Failed to initialize YT Player', err);
      }
    };

    // 2. Load YouTube IFrame API script if not already loaded
    if (!window.YT) {
      const existingScript = document.getElementById('youtube-iframe-api');
      if (!existingScript) {
        const tag = document.createElement('script');
        tag.id = 'youtube-iframe-api';
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
      }

      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prevCallback === 'function') {
          prevCallback();
        }
        initPlayer();
      };
    } else if (window.YT && window.YT.Player) {
      initPlayer();
    }

    // 3. User gesture fallback: modern browsers require at least 1 tap/click to play sound
    const handleUserGesture = () => {
      if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
        try {
          playerRef.current.unMute();
          playerRef.current.setVolume(85);
          playerRef.current.playVideo();
          hasStartedRef.current = true;
        } catch {
          // ignore
        }
      }
    };

    const events = ['click', 'touchstart', 'pointerdown', 'keydown'];
    events.forEach((evt) => {
      window.addEventListener(evt, handleUserGesture, { once: false, passive: true });
    });

    return () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, handleUserGesture);
      });
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        try {
          playerRef.current.destroy();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: '-9999px',
        left: '-9999px',
        width: '1px',
        height: '1px',
        opacity: 0.001,
        pointerEvents: 'none',
        zIndex: -1,
      }}
    >
      <div id="yt-bg-audio-frame" />
    </div>
  );
}
