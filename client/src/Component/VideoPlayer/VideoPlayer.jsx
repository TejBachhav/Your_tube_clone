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

// src/components/VideoPlayer/VideoPlayer.jsx

import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ videoSources, defaultQuality = '320p' }) => {
  const [selectedSource, setSelectedSource] = useState(null);

  // When videoSources change, set the default source based on defaultQuality.
  useEffect(() => {
    if (videoSources && videoSources.length) {
      const defaultSource = videoSources.find(source => source.label === defaultQuality) || videoSources[0];
      setSelectedSource(defaultSource);
    }
  }, [videoSources, defaultQuality]);

  const handleQualityChange = (e) => {
    const newQuality = e.target.value;
    const newSource = videoSources.find(source => source.label === newQuality);
    setSelectedSource(newSource);
  };

  if (!selectedSource) return <div>Loading...</div>;

  return (
    <div>
      <ReactPlayer 
        url={selectedSource.src}
        controls
        width="100%"
        height="100%"
      />
      <div style={{ marginTop: '10px' }}>
        <label htmlFor="quality-select">Quality: </label>
        <select 
          id="quality-select" 
          value={selectedSource.label} 
          onChange={handleQualityChange}
        >
          {videoSources.map(source => (
            <option key={source.label} value={source.label}>
              {source.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default VideoPlayer;