// import React, { useState, useRef, useEffect, useMemo } from "react";
// import io from "socket.io-client";
// import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
// import "./VideoCall.css";

// // Connect to the signaling server on port 5002
// const socket = io("http://localhost:5002");

// const VideoCall = ({ setVideoCallModal }) => {
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const [peerConnection, setPeerConnection] = useState(null);
//   const [targetSocketId, setTargetSocketId] = useState(""); // Manually set target socket id
//   const [mediaRecorder, setMediaRecorder] = useState(null);
//   const [recordedChunks, setRecordedChunks] = useState([]);
//   const [ffmpegReady, setFfmpegReady] = useState(false);
//   const ffmpeg = useMemo(() => createFFmpeg({ log: true }), []);

//   // Load ffmpeg on mount
//   useEffect(() => {
//     const loadFfmpeg = async () => {
//       if (!ffmpegReady) {
//         await ffmpeg.load();
//         setFfmpegReady(true);
//       }
//     };
//     loadFfmpeg();
//   }, [ffmpeg, ffmpegReady]);

//   // Use useMemo to store configuration
//   const configuration = useMemo(() => ({
//     iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//   }), []);

//   // Initialize RTCPeerConnection on mount.
//   useEffect(() => {
//     const pc = new RTCPeerConnection(configuration);
//     setPeerConnection(pc);

//     pc.onicecandidate = (event) => {
//       if (event.candidate && targetSocketId) {
//         socket.emit("ice-candidate", { to: targetSocketId, candidate: event.candidate });
//       }
//     };

//     pc.ontrack = (event) => {
//       if (remoteVideoRef.current) {
//         remoteVideoRef.current.srcObject = event.streams[0];
//       }
//     };

//     return () => {
//       pc.close();
//     };
//   }, [configuration, targetSocketId]);

//   // Listen for signaling messages
//   useEffect(() => {
//     socket.on("offer", async (data) => {
//       console.log("Received offer from:", data.from);
//       setTargetSocketId(data.from);
//       if (peerConnection) {
//         await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
//         const answer = await peerConnection.createAnswer();
//         await peerConnection.setLocalDescription(answer);
//         socket.emit("answer", { to: data.from, answer });
//       }
//     });

//     socket.on("answer", async (data) => {
//       console.log("Received answer from:", data.from);
//       if (peerConnection) {
//         await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
//       }
//     });

//     socket.on("ice-candidate", async (data) => {
//       if (peerConnection && peerConnection.remoteDescription) {
//         try {
//           await peerConnection.addIceCandidate(data.candidate);
//         } catch (error) {
//           console.error("Error adding ICE candidate:", error);
//         }
//       } else {
//         console.warn("Remote description not set; skipping ICE candidate addition");
//       }
//     });
//   }, [peerConnection]);

//   // Start call: get local stream, add tracks, create offer.
//   const startCall = async () => {
//     if (!targetSocketId) {
//       alert("Please enter a target socket ID before starting a call.");
//       console.warn("No target socket id set for call initiation");
//       return;
//     }
//     try {
//       const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       if (localVideoRef.current) {
//         localVideoRef.current.srcObject = localStream;
//       }
//       localStream.getTracks().forEach((track) => {
//         peerConnection.addTrack(track, localStream);
//       });
//       const offer = await peerConnection.createOffer();
//       await peerConnection.setLocalDescription(offer);
//       socket.emit("offer", { to: targetSocketId, offer });
//     } catch (error) {
//       console.error("Error starting call:", error);
//     }
//   };

//   // Share screen using getDisplayMedia.
//   const shareScreen = async () => {
//     try {
//       const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
//       screenStream.getTracks().forEach((track) => {
//         peerConnection.addTrack(track, screenStream);
//       });
//       if (localVideoRef.current) {
//         localVideoRef.current.srcObject = screenStream;
//       }
//     } catch (error) {
//       console.error("Error sharing screen:", error);
//     }
//   };

//   // Start recording the local stream.
//   const startRecording = () => {
//     if (!localVideoRef.current?.srcObject) return;
//     const stream = localVideoRef.current.srcObject;
//     // Specify recorder options for WebM format
//     const options = { mimeType: "video/webm; codecs=vp8" };
//     let recorder;
//     try {
//       recorder = new MediaRecorder(stream, options);
//     } catch (e) {
//       console.error("MediaRecorder initialization failed with options", options, e);
//       recorder = new MediaRecorder(stream);
//     }
//     setRecordedChunks([]);
//     recorder.ondataavailable = (event) => {
//       if (event.data.size > 0) {
//         setRecordedChunks((prev) => [...prev, event.data]);
//       }
//     };
//     recorder.onstop = async () => {
//       const webmBlob = new Blob(recordedChunks, { type: options.mimeType });
//       // Convert the WebM Blob to MP4 using ffmpeg.wasm
//       if (ffmpegReady) {
//         ffmpeg.FS("writeFile", "input.webm", await fetchFile(webmBlob));
//         // Run FFmpeg command to convert WebM to MP4
//         await ffmpeg.run("-i", "input.webm", "-c:v", "libx264", "-preset", "veryfast", "-crf", "22", "output.mp4");
//         const data = ffmpeg.FS("readFile", "output.mp4");
//         const mp4Blob = new Blob([data.buffer], { type: "video/mp4" });
//         const url = URL.createObjectURL(mp4Blob);
//         console.log("Converted MP4 URL:", url);
//         // Create a download link for the MP4 file
//         const a = document.createElement("a");
//         a.style.display = "none";
//         a.href = url;
//         a.download = "recorded_session.mp4";
//         document.body.appendChild(a);
//         a.click();
//         window.URL.revokeObjectURL(url);
//       } else {
//         console.error("FFmpeg is not ready");
//       }
//     };
//     recorder.start();
//     setMediaRecorder(recorder);
//     console.log("Recording started");
//   };

//   const stopRecording = () => {
//     if (mediaRecorder) {
//       mediaRecorder.stop();
//       console.log("Recording stopped");
//     }
//   };

//   return (
//     <div className="video-call-container">
//       <div className="local-video">
//         <video ref={localVideoRef} autoPlay playsInline muted />
//         <div className="video-controls">
//           <button onClick={startCall}>Start Call</button>
//           <button onClick={shareScreen}>Share Screen</button>
//           <button onClick={startRecording}>Start Recording</button>
//           <button onClick={stopRecording}>Stop Recording</button>
//         </div>
//       </div>
//       <div className="remote-video">
//         <video ref={remoteVideoRef} autoPlay playsInline />
//       </div>
//       <div className="target-socket-input">
//         <label htmlFor="targetSocket">Target Socket ID:</label>
//         <input
//           id="targetSocket"
//           type="text"
//           value={targetSocketId}
//           onChange={(e) => setTargetSocketId(e.target.value)}
//           placeholder="Enter target socket ID"
//         />
//       </div>
//     </div>
//   );
// };

// export default VideoCall;


// import React, { useState, useRef, useEffect, useMemo } from "react";
// import io from "socket.io-client";
// import { FFmpeg } from "@ffmpeg/ffmpeg";
// import "./VideoCall.css";

// // Connect to the signaling server on port 5002
// const socket = io("http://localhost:5002");

// // Helper function to convert a Blob to a Uint8Array
// const fetchFileHelper = async (file) => {
//   const buffer = await file.arrayBuffer();
//   return new Uint8Array(buffer);
// };

// // Since createFFmpeg isn't exported, we simulate it:
// const createFFmpeg = (opts) => new FFmpeg(opts);

// const VideoCall = ({ setVideoCallModal }) => {
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const [peerConnection, setPeerConnection] = useState(null);
//   const [targetSocketId, setTargetSocketId] = useState(""); // Manually set target socket id
//   const [mediaRecorder, setMediaRecorder] = useState(null);
//   const [recordedChunks, setRecordedChunks] = useState([]);
//   const [ffmpegReady, setFfmpegReady] = useState(false);

//   // Initialize FFmpeg instance using our simulated createFFmpeg
//   const ffmpeg = useMemo(() => createFFmpeg({ log: true }), []);

//   // Bind ffmpeg.FS to a helper function
//   const FS = useMemo(() => (ffmpeg.FS ? ffmpeg.FS.bind(ffmpeg) : () => {
//     console.error("ffmpeg.FS is not available");
//   }), [ffmpeg]);

//   // Load FFmpeg on mount
//   useEffect(() => {
//     const loadFfmpeg = async () => {
//       if (!ffmpegReady) {
//         await ffmpeg.load();
//         setFfmpegReady(true);
//         console.log("FFmpeg loaded successfully!");
//       }
//     };
//     loadFfmpeg();
//   }, [ffmpeg, ffmpegReady]);

//   // ICE configuration for RTCPeerConnection
//   const configuration = useMemo(() => ({
//     iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//   }), []);

//   // Initialize RTCPeerConnection on mount.
//   useEffect(() => {
//     const pc = new RTCPeerConnection(configuration);
//     setPeerConnection(pc);

//     pc.onicecandidate = (event) => {
//       if (event.candidate && targetSocketId) {
//         socket.emit("ice-candidate", { to: targetSocketId, candidate: event.candidate });
//       }
//     };

//     pc.ontrack = (event) => {
//       if (remoteVideoRef.current) {
//         remoteVideoRef.current.srcObject = event.streams[0];
//       }
//     };

//     return () => {
//       pc.close();
//     };
//   }, [configuration, targetSocketId]);

//   // Listen for signaling messages
//   useEffect(() => {
//     socket.on("offer", async (data) => {
//       console.log("Received offer from:", data.from);
//       setTargetSocketId(data.from);
//       if (peerConnection) {
//         await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
//         const answer = await peerConnection.createAnswer();
//         await peerConnection.setLocalDescription(answer);
//         socket.emit("answer", { to: data.from, answer });
//       }
//     });

//     socket.on("answer", async (data) => {
//       console.log("Received answer from:", data.from);
//       if (peerConnection) {
//         await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
//       }
//     });

//     socket.on("ice-candidate", async (data) => {
//       if (peerConnection && peerConnection.remoteDescription) {
//         try {
//           await peerConnection.addIceCandidate(data.candidate);
//         } catch (error) {
//           console.error("Error adding ICE candidate:", error);
//         }
//       } else {
//         console.warn("Remote description not set; skipping ICE candidate addition");
//       }
//     });
//   }, [peerConnection]);

//   // Start call: get local stream, add tracks, create offer.
//   const startCall = async () => {
//     if (!targetSocketId) {
//       alert("Please enter a target socket ID before starting a call.");
//       console.warn("No target socket id set for call initiation");
//       return;
//     }
//     try {
//       const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       if (localVideoRef.current) {
//         localVideoRef.current.srcObject = localStream;
//       }
//       localStream.getTracks().forEach((track) => {
//         peerConnection.addTrack(track, localStream);
//       });
//       const offer = await peerConnection.createOffer();
//       await peerConnection.setLocalDescription(offer);
//       socket.emit("offer", { to: targetSocketId, offer });
//     } catch (error) {
//       console.error("Error starting call:", error);
//     }
//   };

//   // Share screen using getDisplayMedia.
//   const shareScreen = async () => {
//     try {
//       const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
//       screenStream.getTracks().forEach((track) => {
//         peerConnection.addTrack(track, screenStream);
//       });
//       if (localVideoRef.current) {
//         localVideoRef.current.srcObject = screenStream;
//       }
//     } catch (error) {
//       console.error("Error sharing screen:", error);
//     }
//   };

//   // Start recording the local stream and convert to MP4.
//   const startRecording = () => {
//     if (!localVideoRef.current?.srcObject) return;
//     const stream = localVideoRef.current.srcObject;
//     const options = { mimeType: "video/webm; codecs=vp8" };
//     let recorder;
//     try {
//       recorder = new MediaRecorder(stream, options);
//     } catch (e) {
//       console.error("MediaRecorder initialization failed with options", options, e);
//       recorder = new MediaRecorder(stream);
//     }
//     setRecordedChunks([]);
//     recorder.ondataavailable = (event) => {
//       if (event.data.size > 0) {
//         setRecordedChunks((prev) => [...prev, event.data]);
//       }
//     };
//     recorder.onstop = async () => {
//       const webmBlob = new Blob(recordedChunks, { type: options.mimeType });
//       if (ffmpegReady) {
//         const webmData = await fetchFileHelper(webmBlob);
//         FS("writeFile", "input.webm", webmData);
//         await ffmpeg.run("-i", "input.webm", "-c:v", "libx264", "-preset", "veryfast", "-crf", "22", "output.mp4");
//         const data = FS("readFile", "output.mp4");
//         const mp4Blob = new Blob([data.buffer], { type: "video/mp4" });
//         const url = URL.createObjectURL(mp4Blob);
//         console.log("Converted MP4 URL:", url);
//         const a = document.createElement("a");
//         a.style.display = "none";
//         a.href = url;
//         a.download = "recorded_session.mp4";
//         document.body.appendChild(a);
//         a.click();
//         window.URL.revokeObjectURL(url);
//       } else {
//         console.error("FFmpeg is not ready");
//       }
//     };
//     recorder.start();
//     setMediaRecorder(recorder);
//     console.log("Recording started");
//   };

//   const stopRecording = () => {
//     if (mediaRecorder) {
//       mediaRecorder.stop();
//       console.log("Recording stopped");
//     }
//   };

//   return (
//     <div className="video-call-container">
//       <div className="local-video">
//         <video ref={localVideoRef} autoPlay playsInline muted />
//         <div className="video-controls">
//           <button onClick={startCall}>Start Call</button>
//           <button onClick={shareScreen}>Share Screen</button>
//           <button onClick={startRecording}>Start Recording</button>
//           <button onClick={stopRecording}>Stop Recording</button>
//         </div>
//       </div>
//       <div className="remote-video">
//         <video ref={remoteVideoRef} autoPlay playsInline />
//       </div>
//       <div className="target-socket-input">
//         <label htmlFor="targetSocket">Target Socket ID:</label>
//         <input
//           id="targetSocket"
//           type="text"
//           value={targetSocketId}
//           onChange={(e) => setTargetSocketId(e.target.value)}
//           placeholder="Enter target socket ID"
//         />
//       </div>
//     </div>
//   );
// };

// export default VideoCall;

// import React, { useState, useRef, useEffect, useMemo } from "react";
// import io from "socket.io-client";
// import { FFmpeg } from "@ffmpeg/ffmpeg";
// import "./VideoCall.css";

// // Connect to the signaling server on port 5002
// const socket = io("http://localhost:5002");

// // Helper function to convert a Blob to a Uint8Array
// const fetchFileHelper = async (file) => {
//   const buffer = await file.arrayBuffer();
//   return new Uint8Array(buffer);
// };

// const VideoCall = ({ setVideoCallModal }) => {
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const [peerConnection, setPeerConnection] = useState(null);
//   const [targetSocketId, setTargetSocketId] = useState(""); // Manually set target socket id
//   const [mediaRecorder, setMediaRecorder] = useState(null);
//   const [recordedChunks, setRecordedChunks] = useState([]);
//   const [ffmpegReady, setFfmpegReady] = useState(false);

//   // Initialize ffmpeg instance using the FFmpeg class
//   const ffmpeg = useMemo(() => new FFmpeg({ log: true }), []);

//   // Bind ffmpeg.FS to a helper function
//   const FS = useMemo(() => {
//     return ffmpeg.FS ? ffmpeg.FS.bind(ffmpeg) : () => {
//       console.error("ffmpeg.FS is not available");
//     };
//   }, [ffmpeg]);

//   // Load FFmpeg on mount
//   useEffect(() => {
//     const loadFfmpeg = async () => {
//       if (!ffmpegReady) {
//         await ffmpeg.load();
//         setFfmpegReady(true);
//         console.log("FFmpeg loaded successfully!");
//       }
//     };
//     loadFfmpeg();
//   }, [ffmpeg, ffmpegReady]);

//   // ICE configuration for RTCPeerConnection
//   const configuration = useMemo(() => ({
//     iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//   }), []);

//   // Initialize RTCPeerConnection on mount.
//   useEffect(() => {
//     const pc = new RTCPeerConnection(configuration);
//     setPeerConnection(pc);

//     pc.onicecandidate = (event) => {
//       if (event.candidate && targetSocketId) {
//         socket.emit("ice-candidate", { to: targetSocketId, candidate: event.candidate });
//       }
//     };

//     pc.ontrack = (event) => {
//       if (remoteVideoRef.current) {
//         remoteVideoRef.current.srcObject = event.streams[0];
//       }
//     };

//     return () => {
//       pc.close();
//     };
//   }, [configuration, targetSocketId]);

//   // Listen for signaling messages
//   useEffect(() => {
//     socket.on("offer", async (data) => {
//       console.log("Received offer from:", data.from);
//       setTargetSocketId(data.from);
//       if (peerConnection) {
//         await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
//         const answer = await peerConnection.createAnswer();
//         await peerConnection.setLocalDescription(answer);
//         socket.emit("answer", { to: data.from, answer });
//       }
//     });

//     socket.on("answer", async (data) => {
//       console.log("Received answer from:", data.from);
//       if (peerConnection) {
//         await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
//       }
//     });

//     socket.on("ice-candidate", async (data) => {
//       if (peerConnection && peerConnection.remoteDescription) {
//         try {
//           await peerConnection.addIceCandidate(data.candidate);
//         } catch (error) {
//           console.error("Error adding ICE candidate:", error);
//         }
//       } else {
//         console.warn("Remote description not set; skipping ICE candidate addition");
//       }
//     });
//   }, [peerConnection]);

//   // Start call: get local stream, add tracks, create offer.
//   const startCall = async () => {
//     if (!targetSocketId) {
//       alert("Please enter a target socket ID before starting a call.");
//       console.warn("No target socket id set for call initiation");
//       return;
//     }
//     try {
//       const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       if (localVideoRef.current) {
//         localVideoRef.current.srcObject = localStream;
//       }
//       localStream.getTracks().forEach((track) => {
//         peerConnection.addTrack(track, localStream);
//       });
//       const offer = await peerConnection.createOffer();
//       await peerConnection.setLocalDescription(offer);
//       socket.emit("offer", { to: targetSocketId, offer });
//     } catch (error) {
//       console.error("Error starting call:", error);
//     }
//   };

//   // Share screen using getDisplayMedia.
//   const shareScreen = async () => {
//     try {
//       const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
//       screenStream.getTracks().forEach((track) => {
//         peerConnection.addTrack(track, screenStream);
//       });
//       if (localVideoRef.current) {
//         localVideoRef.current.srcObject = screenStream;
//       }
//     } catch (error) {
//       console.error("Error sharing screen:", error);
//     }
//   };

//   // Start recording the local stream and convert to MP4.
//   const startRecording = () => {
//     if (!localVideoRef.current?.srcObject) return;
//     const stream = localVideoRef.current.srcObject;
//     const options = { mimeType: "video/webm; codecs=vp8" };
//     let recorder;
//     try {
//       recorder = new MediaRecorder(stream, options);
//     } catch (e) {
//       console.error("MediaRecorder initialization failed with options", options, e);
//       recorder = new MediaRecorder(stream);
//     }
//     setRecordedChunks([]);
//     recorder.ondataavailable = (event) => {
//       if (event.data.size > 0) {
//         setRecordedChunks((prev) => [...prev, event.data]);
//       }
//     };
//     recorder.onstop = async () => {
//       const webmBlob = new Blob(recordedChunks, { type: options.mimeType });
//       if (ffmpegReady && FS) {
//         try {
//           const webmData = await fetchFileHelper(webmBlob);
//           FS("writeFile", "input.webm", webmData);
//           await ffmpeg.exec(["-i", "input.webm", "-c:v", "libx264", "-preset", "veryfast", "-crf", "22", "output.mp4"]);
//           let data;
//           try {
//             data = FS("readFile", "output.mp4");
//           } catch (readError) {
//             console.error("Conversion failed: No output file found.", readError);
//             return;
//           }
//           if (!data || !data.buffer) {
//             console.error("No data or buffer found in output.mp4");
//             return;
//           }
//           const mp4Blob = new Blob([data.buffer], { type: "video/mp4" });
//           const url = URL.createObjectURL(mp4Blob);
//           console.log("Converted MP4 URL:", url);
//           const a = document.createElement("a");
//           a.style.display = "none";
//           a.href = url;
//           a.download = "recorded_session.mp4";
//           document.body.appendChild(a);
//           a.click();
//           window.URL.revokeObjectURL(url);
//         } catch (convError) {
//           console.error("Error during conversion:", convError);
//         }
//       } else {
//         console.error("FFmpeg is not ready or FS is not available");
//       }
//     };
//     recorder.start();
//     setMediaRecorder(recorder);
//     console.log("Recording started");
//   };

//   const stopRecording = () => {
//     if (mediaRecorder) {
//       mediaRecorder.stop();
//       console.log("Recording stopped");
//     }
//   };

//   return (
//     <div className="video-call-container">
//       <div className="local-video">
//         <video ref={localVideoRef} autoPlay playsInline muted />
//         <div className="video-controls">
//           <button onClick={startCall}>Start Call</button>
//           <button onClick={shareScreen}>Share Screen</button>
//           <button onClick={startRecording}>Start Recording</button>
//           <button onClick={stopRecording}>Stop Recording</button>
//         </div>
//       </div>
//       <div className="remote-video">
//         <video ref={remoteVideoRef} autoPlay playsInline />
//       </div>
//       <div className="target-socket-input">
//         <label htmlFor="targetSocket">Target Socket ID:</label>
//         <input
//           id="targetSocket"
//           type="text"
//           value={targetSocketId}
//           onChange={(e) => setTargetSocketId(e.target.value)}
//           placeholder="Enter target socket ID"
//         />
//       </div>
//     </div>
//   );
// };

// export default VideoCall;


// import React, { useState, useRef, useEffect, useMemo } from "react";
// import io from "socket.io-client";
// import { FFmpeg } from "@ffmpeg/ffmpeg";
// import "./VideoCall.css";
// import axios from "axios";

// // Connect to the signaling server on port 5002
// const socket = io("http://localhost:5002");

// const VideoCall = ({ setVideoCallModal }) => {
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const [peerConnection, setPeerConnection] = useState(null);
//   const [targetSocketId, setTargetSocketId] = useState(""); // Manually set target socket id
//   const [mediaRecorder, setMediaRecorder] = useState(null);
//   const [recordedChunks, setRecordedChunks] = useState([]);
  
//   // New state for screen recording (separate from camera recording)
//   const [screenRecorder, setScreenRecorder] = useState(null);
//   const [screenRecordedChunks, setScreenRecordedChunks] = useState([]);
  
//   // FFmpeg setup (for future client conversion, if needed)
//   const [ffmpegReady, setFfmpegReady] = useState(false);
//   const ffmpeg = useMemo(() => new FFmpeg({ log: true }), []);

//   useEffect(() => {
//     const loadFfmpeg = async () => {
//       try {
//         await ffmpeg.load();
//         setFfmpegReady(true);
//         console.log("FFmpeg loaded successfully!");
//       } catch (error) {
//         console.error("Error loading FFmpeg:", error);
//       }
//     };
//     loadFfmpeg();
//   }, [ffmpeg]);

//   // ICE configuration for RTCPeerConnection
//   const configuration = useMemo(() => ({
//     iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//   }), []);

//   // Initialize RTCPeerConnection on mount.
//   useEffect(() => {
//     const pc = new RTCPeerConnection(configuration);
//     setPeerConnection(pc);

//     pc.onicecandidate = (event) => {
//       if (event.candidate && targetSocketId) {
//         socket.emit("ice-candidate", { to: targetSocketId, candidate: event.candidate });
//       }
//     };

//     pc.ontrack = (event) => {
//       if (remoteVideoRef.current) {
//         remoteVideoRef.current.srcObject = event.streams[0];
//       }
//     };

//     return () => {
//       pc.close();
//     };
//   }, [configuration, targetSocketId]);

//   // Listen for signaling messages
//   useEffect(() => {
//     socket.on("offer", async (data) => {
//       console.log("Received offer from:", data.from);
//       setTargetSocketId(data.from);
//       if (peerConnection) {
//         await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
//         const answer = await peerConnection.createAnswer();
//         await peerConnection.setLocalDescription(answer);
//         socket.emit("answer", { to: data.from, answer });
//       }
//     });

//     socket.on("answer", async (data) => {
//       console.log("Received answer from:", data.from);
//       if (peerConnection) {
//         await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
//       }
//     });

//     socket.on("ice-candidate", async (data) => {
//       if (peerConnection && peerConnection.remoteDescription) {
//         try {
//           await peerConnection.addIceCandidate(data.candidate);
//         } catch (error) {
//           console.error("Error adding ICE candidate:", error);
//         }
//       } else {
//         console.warn("Remote description not set; skipping ICE candidate addition");
//       }
//     });
//   }, [peerConnection]);

//   // Start call using camera stream
//   const startCall = async () => {
//     if (!targetSocketId) {
//       alert("Please enter a target socket ID before starting a call.");
//       return;
//     }
//     try {
//       const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       if (localVideoRef.current) {
//         localVideoRef.current.srcObject = localStream;
//       }
//       localStream.getTracks().forEach((track) => {
//         peerConnection.addTrack(track, localStream);
//       });
//       const offer = await peerConnection.createOffer();
//       await peerConnection.setLocalDescription(offer);
//       socket.emit("offer", { to: targetSocketId, offer });
//     } catch (error) {
//       console.error("Error starting call:", error);
//     }
//   };

//   // Share screen using getDisplayMedia (but do not record)
//   const shareScreen = async () => {
//     try {
//       const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
//       screenStream.getTracks().forEach((track) => {
//         peerConnection.addTrack(track, screenStream);
//       });
//       if (localVideoRef.current) {
//         localVideoRef.current.srcObject = screenStream;
//       }
//     } catch (error) {
//       console.error("Error sharing screen:", error);
//     }
//   };

//   // ------------------------
//   // Recording using camera stream (existing method)
//   // ------------------------
//   const startRecording = () => {
//     if (!localVideoRef.current?.srcObject) {
//       console.error("No local stream available for recording.");
//       return;
//     }
//     const stream = localVideoRef.current.srcObject;
//     const options = { mimeType: "video/webm; codecs=vp8" };
//     let recorder;
//     try {
//       recorder = new MediaRecorder(stream, options);
//     } catch (e) {
//       console.error("MediaRecorder initialization failed with options", options, e);
//       recorder = new MediaRecorder(stream);
//     }
//     setRecordedChunks([]);
//     recorder.ondataavailable = (event) => {
//       if (event.data.size > 0) {
//         setRecordedChunks((prev) => [...prev, event.data]);
//       }
//     };
//     recorder.onstop = () => {
//       console.log("Camera recording stopped");
//       const webmBlob = new Blob(recordedChunks, { type: options.mimeType });
//       console.log("Camera-recorded WebM blob size:", webmBlob.size);
//       if (webmBlob.size === 0) {
//         console.error("Recorded blob is empty. No data to convert.");
//         return;
//       }
//       // Upload for conversion
//       uploadConversion(webmBlob);
//       setMediaRecorder(null);
//     };
//     recorder.start();
//     setMediaRecorder(recorder);
//     console.log("Camera recording started");
//   };

//   const stopRecording = () => {
//     if (mediaRecorder) {
//       mediaRecorder.stop();
//     }
//   };

//   // ------------------------
//   // New: Recording the screen separately using getDisplayMedia
//   // ------------------------
//   const startScreenRecording = async () => {
//     try {
//       const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
//       if (localVideoRef.current) {
//         localVideoRef.current.srcObject = screenStream;
//       }
//       const options = { mimeType: "video/webm; codecs=vp8" };
//       let recorder;
//       try {
//         recorder = new MediaRecorder(screenStream, options);
//       } catch (e) {
//         console.error("Screen MediaRecorder initialization failed with options", options, e);
//         recorder = new MediaRecorder(screenStream);
//       }
//       setScreenRecordedChunks([]);
//       recorder.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           setScreenRecordedChunks((prev) => [...prev, event.data]);
//         }
//       };
//       recorder.onstop = () => {
//         console.log("Screen recording stopped");
//         const webmBlob = new Blob(screenRecordedChunks, { type: options.mimeType });
//         console.log("Screen-recorded WebM blob size:", webmBlob.size);
//         if (webmBlob.size === 0) {
//           console.error("Screen-recorded blob is empty. No data to convert.");
//           return;
//         }
//         uploadConversion(webmBlob);
//         setScreenRecorder(null);
//       };
//       recorder.start();
//       setScreenRecorder(recorder);
//       console.log("Screen recording started");
//     } catch (error) {
//       console.error("Error starting screen recording:", error);
//     }
//   };

//   const stopScreenRecording = () => {
//     if (screenRecorder) {
//       screenRecorder.stop();
//     }
//   };

//   // Upload the recorded WebM file to the backend for conversion.
//   const uploadConversion = async (webmBlob) => {
//     const formData = new FormData();
//     formData.append("video", webmBlob, "recording.webm");

//     console.log("Uploading WebM for conversion...");
//     try {
//       const response = await axios.post("http://localhost:5000/convert", formData, {
//         responseType: "blob",
//       });
//       const url = URL.createObjectURL(response.data);
//       console.log("Converted MP4 URL:", url);
//       const a = document.createElement("a");
//       a.style.display = "none";
//       a.href = url;
//       a.download = "recorded_session.mp4";
//       document.body.appendChild(a);
//       a.click();
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Error converting video on server:", error);
//     }
//   };

//   return (
//     <div className="video-call-container">
//       <div className="local-video">
//         <video ref={localVideoRef} autoPlay playsInline muted />
//         <div className="video-controls">
//           <button onClick={startCall}>Start Call</button>
//           <button onClick={shareScreen}>Share Screen</button>
//           <button onClick={startRecording}>Record Camera</button>
//           <button onClick={stopRecording}>Stop Camera Recording</button>
//           <button onClick={startScreenRecording}>Record Screen</button>
//           <button onClick={stopScreenRecording}>Stop Screen Recording</button>
//         </div>
//       </div>
//       <div className="remote-video">
//         <video ref={remoteVideoRef} autoPlay playsInline />
//       </div>
//       <div className="target-socket-input">
//         <label htmlFor="targetSocket">Target Socket ID:</label>
//         <input
//           id="targetSocket"
//           type="text"
//           value={targetSocketId}
//           onChange={(e) => setTargetSocketId(e.target.value)}
//           placeholder="Enter target socket ID"
//         />
//       </div>
//     </div>
//   );
// };

// export default VideoCall;


/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect, useMemo } from "react";
import io from "socket.io-client";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import "./VideoCall.css";
import axios from "axios";

// Connect to the signaling server on port 5002
const socket = io("http://localhost:5002");

const VideoCall = ({ setVideoCallModal }) => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [targetSocketId, setTargetSocketId] = useState(""); // Manually set target socket id

  // State for screen recording
  const [screenRecorder, setScreenRecorder] = useState(null);
  const [screenRecordedChunks, setScreenRecordedChunks] = useState([]);

  // FFmpeg setup (if needed later on client side for conversion, but here we offload conversion)
  const [ffmpegReady, setFfmpegReady] = useState(false);
  const ffmpeg = useMemo(() => new FFmpeg({ log: true }), []);

  useEffect(() => {
    const loadFfmpeg = async () => {
      try {
        await ffmpeg.load();
        setFfmpegReady(true);
        console.log("FFmpeg loaded successfully!");
      } catch (error) {
        console.error("Error loading FFmpeg:", error);
      }
    };
    loadFfmpeg();
  }, [ffmpeg]);

  // ICE configuration for RTCPeerConnection
  const configuration = useMemo(() => ({
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  }), []);

  // Initialize RTCPeerConnection on mount.
  useEffect(() => {
    const pc = new RTCPeerConnection(configuration);
    setPeerConnection(pc);

    pc.onicecandidate = (event) => {
      if (event.candidate && targetSocketId) {
        socket.emit("ice-candidate", { to: targetSocketId, candidate: event.candidate });
      }
    };

    pc.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    return () => {
      pc.close();
    };
  }, [configuration, targetSocketId]);

  // Listen for signaling messages
  useEffect(() => {
    socket.on("offer", async (data) => {
      console.log("Received offer from:", data.from);
      setTargetSocketId(data.from);
      if (peerConnection) {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socket.emit("answer", { to: data.from, answer });
      }
    });

    socket.on("answer", async (data) => {
      console.log("Received answer from:", data.from);
      if (peerConnection) {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
      }
    });

    socket.on("ice-candidate", async (data) => {
      if (peerConnection && peerConnection.remoteDescription) {
        try {
          await peerConnection.addIceCandidate(data.candidate);
        } catch (error) {
          console.error("Error adding ICE candidate:", error);
        }
      } else {
        console.warn("Remote description not set; skipping ICE candidate addition");
      }
    });
  }, [peerConnection]);

  // Function to start a call (using camera stream for signaling purposes)
  const startCall = async () => {
    if (!targetSocketId) {
      alert("Please enter a target socket ID before starting a call.");
      return;
    }
    try {
      const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
      }
      localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
      });
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      socket.emit("offer", { to: targetSocketId, offer });
    } catch (error) {
      console.error("Error starting call:", error);
    }
  };

  // Share screen using getDisplayMedia for signaling and preview
  const shareScreen = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      screenStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, screenStream);
      });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = screenStream;
      }
    } catch (error) {
      console.error("Error sharing screen:", error);
    }
  };

  // Upload the recorded WebM file to the backend for conversion.
  const uploadConversion = async (webmBlob) => {
    const formData = new FormData();
    formData.append("video", webmBlob, "recording.webm");

    console.log("Uploading WebM for conversion...");
    try {
      const response = await axios.post("https://your-tube-clone-2c2e.onrender.com/convert", formData, {
        responseType: "blob",
      });
      const url = URL.createObjectURL(response.data);
      console.log("Converted MP4 URL:", url);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "recorded_session.mp4";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error converting video on server:", error);
    }
  };

  // Start recording the screen.
  const startScreenRecording = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = screenStream;
      }
      const options = { mimeType: "video/webm; codecs=vp8" };
      let recorder;
      try {
        recorder = new MediaRecorder(screenStream, options);
      } catch (e) {
        console.error("Screen MediaRecorder initialization failed with options", options, e);
        recorder = new MediaRecorder(screenStream);
      }
      setScreenRecordedChunks([]); // Clear previous recorded chunks
      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          setScreenRecordedChunks((prev) => [...prev, event.data]);
        }
      };
      recorder.onstop = async () => {
        console.log("Screen recording stopped");
        const webmBlob = new Blob(screenRecordedChunks, { type: options.mimeType });
        console.log("Screen-recorded WebM blob size:", webmBlob.size);
        if (webmBlob.size === 0) {
          console.error("Screen-recorded blob is empty. No data to convert.");
          return;
        }
        await uploadConversion(webmBlob);
        setScreenRecorder(null);
      };
      recorder.start();
      setScreenRecorder(recorder);
      console.log("Screen recording started");
    } catch (error) {
      console.error("Error starting screen recording:", error);
    }
  };

  const stopScreenRecording = () => {
    if (screenRecorder) {
      screenRecorder.stop();
    }
  };

  return (
    <div className="video-call-container">
      <div className="local-video">
        <video ref={localVideoRef} autoPlay playsInline muted />
        <div className="video-controls">
          <button onClick={startCall}>Start Call</button>
          <button onClick={shareScreen}>Share Screen</button>
          <button onClick={startScreenRecording}>Record Screen</button>
          <button onClick={stopScreenRecording}>Stop Screen Recording</button>
        </div>
      </div>
      <div className="remote-video">
        <video ref={remoteVideoRef} autoPlay playsInline />
      </div>
      <div className="target-socket-input">
        <label htmlFor="targetSocket">Target Socket ID:</label>
        <input
          id="targetSocket"
          type="text"
          value={targetSocketId}
          onChange={(e) => setTargetSocketId(e.target.value)}
          placeholder="Enter target socket ID"
        />
      </div>
    </div>
  );
};

export default VideoCall;
