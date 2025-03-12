// import React, { useRef, useEffect } from 'react';
// import videojs from 'video.js';
// import 'video.js/dist/video-js.css';
// // Import the resolution switcher plugin CSS if available (check plugin docs)
// // import 'videojs-resolution-switcher/dist/videojs-resolution-switcher.css';
// import 'videojs-resolution-switcher';

// const VideoPlayer = ({ videoSources }) => {
//   const videoRef = useRef(null);
//   const playerRef = useRef(null);
//   console.log('Video Sources:', videoSources);

//   useEffect(() => {
//     const videoElement = videoRef.current;
//     if (!videoElement) return;

//     // Initialize Video.js with resolution switcher plugin
//     playerRef.current = videojs(videoElement, {
//       controls: true,
//       autoplay: false,
//       preload: 'auto',
//       fluid: true,
//       plugins: {
//         videoJsResolutionSwitcher: {
//           default: 'high', // Set a default resolution (e.g., 'high' or specific label)
//           dynamicLabel: true
//         }
//       },
//       sources: videoSources // Pass in the video sources array as prop
//     }, function() {
//       console.log('Video.js player is ready!');
//     });

//     // Cleanup function: dispose of player on unmount
//     return () => {
//       if (playerRef.current) {
//         playerRef.current.dispose();
//         playerRef.current = null;
//       }
//     };
//   }, [videoSources]);

//   return (
//     <div data-vjs-player>
//       <video ref={videoRef} className="video-js vjs-default-skin" />
//     </div>
//   );
// };

// export default VideoPlayer;

// // src/components/VideoPlayer/VideoPlayer.jsx

// import React, { useState, useEffect } from 'react';
// import ReactPlayer from 'react-player';

// const VideoPlayer = ({ videoSources, defaultQuality = '320p' }) => {
//   const [selectedSource, setSelectedSource] = useState(null);

//   // When videoSources change, set the default source based on defaultQuality.
//   useEffect(() => {
//     if (videoSources && videoSources.length) {
//       const defaultSource = videoSources.find(source => source.label === defaultQuality) || videoSources[0];
//       setSelectedSource(defaultSource);
//     }
//   }, [videoSources, defaultQuality]);

//   const handleQualityChange = (e) => {
//     const newQuality = e.target.value;
//     const newSource = videoSources.find(source => source.label === newQuality);
//     setSelectedSource(newSource);
//   };

//   if (!selectedSource) return <div>Loading...</div>;

//   return (
//     <div>
//       <ReactPlayer 
//         url={selectedSource.src}
//         controls
//         width="100%"
//         height="100%"
//       />
//       <div style={{ marginTop: '10px' }}>
//         <label htmlFor="quality-select">Quality: </label>
//         <select 
//           id="quality-select" 
//           value={selectedSource.label} 
//           onChange={handleQualityChange}
//         >
//           {videoSources.map(source => (
//             <option key={source.label} value={source.label}>
//               {source.label}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// };

// export default VideoPlayer;


// import React, { useState, useEffect } from 'react';
// import ReactPlayer from 'react-player';
// import './VideoPlayer.css';

// const VideoPlayer = ({ videoSources, defaultQuality = '320p', watchLimitMinutes }) => {
//   const [selectedSource, setSelectedSource] = useState(null);
//   const [playedSeconds, setPlayedSeconds] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);

//   // Set default source when videoSources change
//   useEffect(() => {
//     if (videoSources && videoSources.length) {
//       const defaultSource = videoSources.find(source => source.label === defaultQuality) || videoSources[0];
//       setSelectedSource(defaultSource);
//     }
//   }, [videoSources, defaultQuality]);

//   // Handle quality change
//   const handleQualityChange = (e) => {
//     const newQuality = e.target.value;
//     const newSource = videoSources.find(source => source.label === newQuality);
//     setSelectedSource(newSource);
//   };

//   // Track playback progress
//   const handleProgress = (progress) => {
//     if (!isPaused) {
//       setPlayedSeconds(progress.playedSeconds);
//     }
//   };

//   // Log remaining time and check watch limit
//   useEffect(() => {
//     if (watchLimitMinutes) {
//       const totalAllowed = watchLimitMinutes * 60;
//       const remainingSeconds = Math.max(totalAllowed - playedSeconds, 0);
//       console.log(`Time remaining: ${remainingSeconds} seconds`);

//       if (playedSeconds >= totalAllowed) {
//         setIsPaused(true);
//         alert(`Your current plan allows you to watch for ${watchLimitMinutes} minutes only. Please upgrade for unlimited access.`);
//       }
//     }
//   }, [playedSeconds, watchLimitMinutes]);

//   if (!selectedSource) return <div className="player-loading">Loading...</div>;

//   return (
//     <div className="video-player-container">
//       <ReactPlayer 
//         url={selectedSource.src}
//         controls
//         width="100%"
//         height="100%"
//         playing={!isPaused}
//         onProgress={handleProgress}
//       />
//       <div className="quality-select-container">
//         <label htmlFor="quality-select">Quality: </label>
//         <select 
//           id="quality-select" 
//           value={selectedSource.label} 
//           onChange={handleQualityChange}
//         >
//           {videoSources.map(source => (
//             <option key={source.label} value={source.label}>
//               {source.label}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// };

// export default VideoPlayer;


import React, { useState, useEffect, useCallback } from 'react';
import ReactPlayer from 'react-player';
import './VideoPlayer.css';

const VideoPlayer = ({ videoSources, defaultQuality = '320p', watchLimitMinutes }) => {
  const [selectedSource, setSelectedSource] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [remainingTime, setRemainingTime] = useState(watchLimitMinutes * 60);
  const [countdownInterval, setCountdownInterval] = useState(null);
  const [limitReached, setLimitReached] = useState(false); // NEW: Track if limit is reached

  // Set default source when videoSources change
  useEffect(() => {
    if (videoSources && videoSources.length) {
      const defaultSource = videoSources.find(source => source.label === defaultQuality) || videoSources[0];
      setSelectedSource(defaultSource);
    }
  }, [videoSources, defaultQuality]);

  // Handle quality change
  const handleQualityChange = (e) => {
    const newQuality = e.target.value;
    const newSource = videoSources.find(source => source.label === newQuality);
    setSelectedSource(newSource);
  };

  // Start countdown timer
  const startCountdown = () => {
    if (!countdownInterval && !limitReached) {
      const interval = setInterval(() => {
        setRemainingTime(prevTime => {
          if (prevTime > 0) {
            console.log(`Time remaining: ${prevTime - 1} seconds`);
            return prevTime - 1;
          } else {
            clearInterval(interval);
            setCountdownInterval(null);
            setLimitReached(true); // NEW: Prevent further play
            alert("Your watch time limit has been reached. Upgrade for unlimited access.");
            return 0;
          }
        });
      }, 1000);
      setCountdownInterval(interval);
    }
  };

  // Pause countdown timer
  const pauseCountdown = useCallback(() => {
    clearInterval(countdownInterval);
    setCountdownInterval(null);
  }, [countdownInterval]);

  // Handle play and pause events
  const handlePlay = () => {
    if (remainingTime > 0 && !limitReached) {
      setIsPaused(false);
      startCountdown();
    } else {
      alert("Your watch time limit has been reached. Upgrade for unlimited access.");
    }
  };

  const handlePause = () => {
    setIsPaused(true);
    pauseCountdown();
  };

  // Stop countdown if watch limit is exceeded
  useEffect(() => {
    if (remainingTime <= 0) {
      pauseCountdown();
      setIsPaused(true);
      setLimitReached(true); // NEW: Prevent further play
    }
  }, [remainingTime, pauseCountdown]);

  // Block video switching after limit is reached
  useEffect(() => {
    if (limitReached) {
      pauseCountdown();
    }
  }, [limitReached, pauseCountdown]);

  if (!selectedSource) return <div className="player-loading">Loading...</div>;

  return (
    <div className="video-player-container">
      <ReactPlayer 
        url={selectedSource.src}
        controls
        width="100%"
        height="100%"
        playing={!isPaused && !limitReached && remainingTime > 0}
        onPlay={handlePlay}
        onPause={handlePause}
      />
      <div className="quality-select-container">
        <label htmlFor="quality-select">Quality: </label>
        <select 
          id="quality-select" 
          value={selectedSource.label} 
          onChange={handleQualityChange}
          disabled={limitReached} // NEW: Disable quality change if limit reached
        >
          {videoSources.map(source => (
            <option key={source.label} value={source.label}>
              {source.label}
            </option>
          ))}
        </select>
      </div>
      <p>Time Remaining: {remainingTime} seconds</p>
      {limitReached && <p className="warning-text">Watch limit reached! Upgrade for unlimited access.</p>}
    </div>
  );
};

export default VideoPlayer;
