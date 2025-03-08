// import React, { useState } from 'react'
// import './Videoupload.css'
// import { buildStyles, CircularProgressbar } from "react-circular-progressbar"
// import { useSelector, useDispatch } from 'react-redux'
// import { uploadvideo } from '../../action/video'
// const Videoupload = ({ setvideouploadpage }) => {
//     const [title, settitle] = useState("")
//     const [videofile, setvideofile] = useState("")
//     const [progress, setprogress] = useState(0)
//     const dispatch = useDispatch()
//     const handlesetvideofile = (e) => {
//         setvideofile(e.target.files[0])
//     }
//     const currentuser = useSelector(state => state.currentuserreducer);
//     const fileoption = {
//         onUploadProgress: (progressEvent) => {
//             const { loaded, total } = progressEvent;
//             const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
//             setprogress(percentage)
//             if (percentage === 100) {
//                 setTimeout(function () { }, 3000);
//                 setvideouploadpage(false)
//             }
//         },
//     };
//     const uploadvideofile = () => {
//         if (!title) {
//             alert("plz enter a title of the video")
//         } else if (!videofile) {
//             alert("plz attach a video file");
//         } else if (videofile.size > 1000000) {
//             alert("Plz attach video file less than 1 kb")
//         } else {
//             const filedata = new FormData()
//             filedata.append("file", videofile)
//             filedata.append("title", title)
//             filedata.append("chanel", currentuser?.result?._id)
//             filedata.append("uploader", currentuser?.result.name)
//             // console.log(videofile)
//             dispatch(uploadvideo({ filedata: filedata, fileoption: fileoption }))
//         }
//     }
//     return (
//         <div className="container_VidUpload">
//             <input type="submit" name='text' value={"X"} onClick={() => setvideouploadpage(false)} className="ibtn_x" />
//             <div className="container2_VidUpload">
//                 <div className="ibox_div_vidupload">
//                     <input type="text" maxLength={30} placeholder='Enter title of your video' className="ibox_vidupload" onChange={(e) => {
//                         settitle(e.target.value);
//                     }} />
//                     <label htmlFor="file" className='ibox_cidupload btn_vidUpload'>
//                         <input type="file" name='file' style={{ fontSize: "1rem" }} onChange={(e) => { handlesetvideofile(e) }} className="ibox_vidupload" />
//                     </label>
//                 </div>
//                 <div className="ibox_div_vidupload">
//                     <input type="submit" onClick={() => uploadvideofile()} value={"Upload"} className='ibox_vidupload btn_vidUpload' />
//                     <div className="loader ibox_div_vidupload">
//                         <CircularProgressbar
//                             value={progress}
//                             text={`${progress}`}
//                             styles={buildStyles({
//                                 rotation: 0.25,
//                                 strokeLinecap: "butt",
//                                 textSize: "20px",
//                                 pathTransitionDuration: 0.5,
//                                 pathColor: `rgba(255,255,255,${progress / 100})`,
//                                 textColor: "#f88",
//                                 trailColor: "#adff2f",
//                                 backgroundColor: "#3e98c7",
//                             })}

//                         />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Videoupload

// IMP

import React, { useState } from 'react';
import './Videoupload.css';
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { useSelector, useDispatch } from 'react-redux';
import { uploadvideo } from '../../action/video';

const Videoupload = ({ setvideouploadpage }) => {
  const [title, setTitle] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  const currentuser = useSelector(state => state.currentuserreducer);

  // Handle file selection
  const handleSetVideoFile = (e) => {
    setVideoFile(e.target.files[0]);
  };

  // Configuration for axios upload progress tracking
  const fileoption = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percentage = Math.floor((loaded * 100) / total);
      setProgress(percentage);
      if (percentage === 100) {
        // Optionally add a delay before closing the upload modal/page.
        setTimeout(() => {
          setvideouploadpage(false);
        }, 3000);
      }
    },
  };

  const uploadVideoFile = () => {
    if (!title) {
      alert("Please enter a title for your video.");
    } else if (!videoFile) {
      alert("Please attach a video file.");
    } else if (videoFile.size > 1000000) {
      // 1,000,000 bytes = approx. 1MB. Adjust as needed.
      alert("Please attach a video file smaller than 1 MB.");
    } else {
      const formData = new FormData();
      formData.append("file", videoFile);
      formData.append("title", title);
      formData.append("chanel", currentuser?.result?._id);
      formData.append("uploader", currentuser?.result?.name);
      dispatch(uploadvideo({ filedata: formData, fileoption }));
    }
  };

  return (
    <div className="container_VidUpload">
      <input 
        type="button" 
        value="X" 
        onClick={() => setvideouploadpage(false)} 
        className="ibtn_x" 
      />
      <div className="container2_VidUpload">
        <div className="ibox_div_vidupload">
          <input 
            type="text" 
            maxLength={30} 
            placeholder="Enter title of your video" 
            className="ibox_vidupload" 
            onChange={(e) => setTitle(e.target.value)} 
            value={title}
          />
          <label htmlFor="file" className="ibox_cidupload btn_vidUpload">
            <input 
              type="file" 
              name="file" 
              accept="video/mp4" 
              style={{ fontSize: "1rem" }} 
              onChange={handleSetVideoFile} 
              className="ibox_vidupload" 
            />
          </label>
        </div>
        <div className="ibox_div_vidupload">
          <input 
            type="button" 
            onClick={uploadVideoFile} 
            value="Upload" 
            className="ibox_vidupload btn_vidUpload" 
          />
          <div className="loader ibox_div_vidupload">
            <CircularProgressbar
              value={progress}
              text={`${progress}%`}
              styles={buildStyles({
                rotation: 0.25,
                strokeLinecap: "butt",
                textSize: "20px",
                pathTransitionDuration: 0.5,
                pathColor: `rgba(255,255,255,${progress / 100})`,
                textColor: "#f88",
                trailColor: "#adff2f",
                backgroundColor: "#3e98c7",
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Videoupload;
