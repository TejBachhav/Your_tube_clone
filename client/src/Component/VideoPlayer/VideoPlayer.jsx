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

import React, { useState } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ videoSources }) => {
  // Set default to 320p
  const defaultSource = videoSources.find(source => source.label === '320p') || videoSources[0];
  const [selectedSource, setSelectedSource] = useState(defaultSource);

  const handleQualityChange = (e) => {
    const newQuality = e.target.value;
    const newSource = videoSources.find(source => source.label === newQuality);
    setSelectedSource(newSource);
  };

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


// # 1080p
// ffmpeg -i "2022-08-13T17-40-41.356Z-production ID_5057337.mp4" -vf scale=-2:1080 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k output_1080p.mp4

// # 720p
// ffmpeg -i "2022-08-13T17-40-41.356Z-production ID_5057337.mp4" -vf scale=-2:720 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k output_720p.mp4

// # 480p
// ffmpeg -i "2022-08-13T17-40-41.356Z-production ID_5057337.mp4" -vf scale=-2:480 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k output_480p.mp4

// # 320p
// ffmpeg -i "2022-08-13T17-40-41.356Z-production ID_5057337.mp4" -vf scale=-2:320 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k output_320p.mp4
