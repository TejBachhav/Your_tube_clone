// // // import React, { useEffect } from 'react'
// // // import "./Videopage.css"
// // // import moment from 'moment'
// // // import Likewatchlatersavebtns from './Likewatchlatersavebtns'
// // // import { useParams, Link } from 'react-router-dom'
// // // import Comment from '../../Component/Comment/Comment'
// // // // import vidd from "../../Component/Video/vid.mp4"
// // // import { viewvideo } from '../../action/video'
// // // import { addtohistory } from '../../action/history'
// // // import { useSelector,useDispatch } from 'react-redux'
// // // const Videopage = () => {
// // //     const { vid } = useParams();
// // //     const dispatch=useDispatch()
// // //     const vids=useSelector((state)=>state.videoreducer)
// // //     // const vids = [
// // //     //     {
// // //     //         _id: 1,
// // //     //         video_src: vidd,
// // //     //         chanel: "wvjwenfj3njfwef",
// // //     //         title: "video 1",
// // //     //         uploader: "abc",
// // //     //         description: "description of video 1"
// // //     //     },
// // //     //     {
// // //     //         _id: 1,
// // //     //         video_src: vidd,
// // //     //         chanel: "wvjwenfj3njfwef",
// // //     //         title: "video 1",
// // //     //         uploader: "abc",
// // //     //         description: "description of video 1"
// // //     //     },
// // //     //     {
// // //     //         _id: 2,
// // //     //         video_src: vidd,
// // //     //         chanel: "wvjwenfj3njfwef",
// // //     //         title: "video 2",
// // //     //         uploader: "abc",
// // //     //         description: "description of video 2"
// // //     //     },
// // //     //     {
// // //     //         _id: 3,
// // //     //         video_src: vidd,
// // //     //         chanel: "wvjwenfj3njfwef",
// // //     //         title: "video 3",
// // //     //         uploader: "abc",
// // //     //         description: "description of video 3"
// // //     //     },
// // //     //     {
// // //     //         _id: 4,
// // //     //         video_src: vidd,
// // //     //         chanel: "wvjwenfj3njfwef",
// // //     //         title: "video 4",
// // //     //         uploader: "abc",
// // //     //         description: "description of video 4"
// // //     //     },
// // //     // ]
// // //     // console.log( vids)
// // //     const vv = vids?.data.filter((q) => q._id === vid)[0]
   
// // //     const currentuser = useSelector(state => state.currentuserreducer);
// // //     const handleviews=()=>{
// // //         dispatch(viewvideo({id:vid}))
// // //     }
// // //     const handlehistory=()=>{
// // //         dispatch(addtohistory({
// // //             videoid:vid,
// // //             viewer:currentuser?.result._id,
// // //         }))
// // //     }
// // //     useEffect(()=>{
// // //         if(currentuser){
// // //             handlehistory();
// // //         }
// // //         handleviews()
// // //     },[])
// // //     return (
// // //         <>
// // //             <div className="container_videoPage">
// // //                 <div className="container2_videoPage">
// // //                     <div className="video_display_screen_videoPage">
// // //                         <video src={`http://localhost:5000/${vv?.filepath}`} className="video_ShowVideo_videoPage" controls></video>
// // //                         <div className="video_details_videoPage">
// // //                             <div className="video_btns_title_VideoPage_cont">
// // //                                 <p className="video_title_VideoPage">{vv?.title}</p>
// // //                                 <div className="views_date_btns_VideoPage">
// // //                                     <div className="views_videoPage">
// // //                                         {vv?.views} views <div className="dot"></div>{" "}
// // //                                         {moment(vv?.createdat).fromNow()}
// // //                                     </div>
// // //                                     <Likewatchlatersavebtns vv={vv} vid={vid} />
// // //                                 </div>
// // //                             </div>
// // //                             <Link to={'/'} className='chanel_details_videoPage'>
// // //                                 <b className="chanel_logo_videoPage">
// // //                                     <p>{vv?.uploader.charAt(0).toUpperCase()}</p>
// // //                                 </b>
// // //                                 <p className="chanel_name_videoPage">{vv.uploader}</p>
// // //                             </Link>
// // //                             <div className="comments_VideoPage">
// // //                                 <h2>
// // //                                     <u>Comments</u>
// // //                                 </h2>
// // //                                 <Comment videoid={vv._id}/>
// // //                             </div>
// // //                         </div>
// // //                     </div>
// // //                     <div className="moreVideoBar">More videos</div>
// // //                 </div>
// // //             </div>
// // //         </>
// // //     )
// // // }

// // // export default Videopage



// // // src/pages/VideoPage/Videopage.jsx

// // import React, { useEffect } from 'react';
// // import "./Videopage.css";
// // import moment from 'moment';
// // import Likewatchlatersavebtns from './Likewatchlatersavebtns';
// // import { useParams, Link } from 'react-router-dom';
// // import Comment from '../../Component/Comment/Comment';
// // import { viewvideo } from '../../action/video';
// // import { addtohistory } from '../../action/history';
// // import { useSelector, useDispatch } from 'react-redux';
// // import VideoPlayer from '../../Component/VideoPlayer/VideoPlayer';

// // const Videopage = () => {
// //   const { vid } = useParams();
// //   const dispatch = useDispatch();
// //   const vids = useSelector((state) => state.videoreducer);
// //   const vv = vids?.data.filter((q) => q._id === vid)[0];
// //   const currentuser = useSelector(state => state.currentuserreducer);

// //   const handleViews = () => {
// //     dispatch(viewvideo({ id: vid }));
// //   };

// //   const handleHistory = () => {
// //     if (currentuser && currentuser.result) {
// //       dispatch(addtohistory({
// //         videoid: vid,
// //         viewer: currentuser.result._id,
// //       }));
// //     }
// //   };

// //   useEffect(() => {
// //     if (currentuser && currentuser.result) {
// //       handleHistory();
// //     }
// //     handleViews();
// //     // eslint-disable-next-line
// //   }, [currentuser]);

// //   // Build videoSources using relative paths from public/Videos folder
// //   const videoSources = vv ? [
// //     {
// //       src: "/Videos/sample_1080p.mp4",
// //       type: "video/mp4",
// //       label: "1080p",
// //       res: 1080,
// //     },
// //     {
// //       src: "/Videos/sample_720p.mp4",
// //       type: "video/mp4",
// //       label: "720p",
// //       res: 720,
// //     },
// //     {
// //       src: "/Videos/sample_480p.mp4",
// //       type: "video/mp4",
// //       label: "480p",
// //       res: 480,
// //     },
// //     {
// //       src: "/Videos/sample_320p.mp4",
// //       type: "video/mp4",
// //       label: "320p",
// //       res: 320,
// //     },
// //   ] : [];

// //   return (
// //     <div className="container_videoPage">
// //       <div className="container2_videoPage">
// //         <div className="video_display_screen_videoPage">
// //           {vv && <VideoPlayer videoSources={videoSources} />}
// //           <div className="video_details_videoPage">
// //             <div className="video_btns_title_VideoPage_cont">
// //               <p className="video_title_VideoPage">{vv?.title}</p>
// //               <div className="views_date_btns_VideoPage">
// //                 <div className="views_videoPage">
// //                   {vv?.views} views <div className="dot"></div>{" "}
// //                   {moment(vv?.createdat).fromNow()}
// //                 </div>
// //                 <Likewatchlatersavebtns vv={vv} vid={vid} />
// //               </div>
// //             </div>
// //             <Link to={'/'} className="chanel_details_videoPage">
// //               <b className="chanel_logo_videoPage">
// //                 <p>{vv?.uploader ? vv.uploader.charAt(0).toUpperCase() : ''}</p>
// //               </b>
// //               <p className="chanel_name_videoPage">{vv?.uploader}</p>
// //             </Link>
// //             <div className="comments_VideoPage">
// //               <h2>
// //                 <u>Comments</u>
// //               </h2>
// //               <Comment videoid={vv?._id} />
// //             </div>
// //           </div>
// //         </div>
// //         <div className="moreVideoBar">More videos</div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Videopage;










// import React, { useEffect, useCallback } from 'react';
// import "./Videopage.css";
// import moment from 'moment';
// import Likewatchlatersavebtns from './Likewatchlatersavebtns';
// import { useParams, Link } from 'react-router-dom';
// import Comment from '../../Component/Comment/Comment';
// import { viewvideo } from '../../action/video';
// import { addtohistory } from '../../action/history';
// import { useSelector, useDispatch } from 'react-redux';
// import VideoPlayer from '../../Component/VideoPlayer/VideoPlayer';

// // Helper function to build videoSources array using the streaming endpoint.
// const getVideoSources = (video) => {
//   return [
//     {
//       src: `http://localhost:5000/video/stream/${video._id}/1080p`,
//       type: 'video/mp4',
//       label: '1080p',
//       res: 1080,
//     },
//     {
//       src: `http://localhost:5000/video/stream/${video._id}/720p`,
//       type: 'video/mp4',
//       label: '720p',
//       res: 720,
//     },
//     {
//       src: `http://localhost:5000/video/stream/${video._id}/480p`,
//       type: 'video/mp4',
//       label: '480p',
//       res: 480,
//     },
//     {
//       src: `http://localhost:5000/video/stream/${video._id}/320p`,
//       type: 'video/mp4',
//       label: '320p',
//       res: 320,
//     },
//   ];
// };


// const Videopage = () => {
//   const { vid } = useParams();
//   const dispatch = useDispatch();
//   const vids = useSelector((state) => state.videoreducer);
//   const vv = vids?.data.find((q) => q._id === vid);
//   const currentuser = useSelector((state) => state.currentuserreducer);

//   // Wrap these functions in useCallback for stable dependencies.
//   const handleViews = useCallback(() => {
//     dispatch(viewvideo({ id: vid }));
//   }, [dispatch, vid]);

//   const handleHistory = useCallback(() => {
//     if (currentuser && currentuser.result) {
//       dispatch(addtohistory({
//         videoid: vid,
//         viewer: currentuser.result._id,
//       }));
//     }
//   }, [dispatch, currentuser, vid]);

//   useEffect(() => {
//     if (currentuser && currentuser.result) {
//       handleHistory();
//     }
//     handleViews();
//   }, [currentuser, handleHistory, handleViews]);

//   // Build videoSources using the helper function for streaming URLs.
//   const videoSources = vv ? getVideoSources(vv) : [];
//   console.log("Video Sources:", videoSources);

//   return (
//     <div className="container_videoPage">
//       <div className="container2_videoPage">
//         <div className="video_display_screen_videoPage">
//           {vv && <VideoPlayer videoSources={videoSources} />}
//           <div className="video_details_videoPage">
//             <div className="video_btns_title_VideoPage_cont">
//               <p className="video_title_VideoPage">{vv?.videotitle}</p>
//               <div className="views_date_btns_VideoPage">
//                 <div className="views_videoPage">
//                   {vv?.views} views <div className="dot"></div>{" "}
//                   {moment(vv?.createdAt || vv?.createdat).fromNow()}
//                 </div>
//                 <Likewatchlatersavebtns vv={vv} vid={vid} />
//               </div>
//             </div>
//             <Link to={'/'} className="chanel_details_videoPage">
//               <b className="chanel_logo_videoPage">
//                 <p>{vv?.uploader ? vv.uploader.charAt(0).toUpperCase() : ''}</p>
//               </b>
//               <p className="chanel_name_videoPage">{vv?.uploader}</p>
//             </Link>
//             <div className="comments_VideoPage">
//               <h2>
//                 <u>Comments</u>
//               </h2>
//               <Comment videoid={vv?._id} />
//             </div>
//           </div>
//         </div>
//         <div className="moreVideoBar">More videos</div>
//       </div>
//     </div>
//   );
// };

// export default Videopage;



// import React, { useEffect, useCallback } from 'react';
// import "./Videopage.css";
// import moment from 'moment';
// import Likewatchlatersavebtns from './Likewatchlatersavebtns';
// import { useParams, Link } from 'react-router-dom';
// import Comment from '../../Component/Comment/Comment';
// import { viewvideo } from '../../action/video';
// import { addtohistory } from '../../action/history';
// import { useSelector, useDispatch } from 'react-redux';
// import VideoPlayer from '../../Component/VideoPlayer/VideoPlayer';

// // Helper function to build videoSources array using the streaming endpoint.
// const getVideoSources = (video) => {
//   return [
//     {
//       src: `http://localhost:5000/video/stream/${video._id}/1080p`,
//       type: 'video/mp4',
//       label: '1080p',
//       res: 1080,
//     },
//     {
//       src: `http://localhost:5000/video/stream/${video._id}/720p`,
//       type: 'video/mp4',
//       label: '720p',
//       res: 720,
//     },
//     {
//       src: `http://localhost:5000/video/stream/${video._id}/480p`,
//       type: 'video/mp4',
//       label: '480p',
//       res: 480,
//     },
//     {
//       src: `http://localhost:5000/video/stream/${video._id}/320p`,
//       type: 'video/mp4',
//       label: '320p',
//       res: 320,
//     },
//   ];
// };

// const Videopage = () => {
//   const { vid } = useParams();
//   const dispatch = useDispatch();
//   const vids = useSelector((state) => state.videoreducer);
//   const vv = vids?.data.find((q) => q._id === vid);
//   const currentuser = useSelector((state) => state.currentuserreducer);

//   // If user is logged in, use their watchLimit, else default to 5 minutes.
//   const watchLimitMinutes = currentuser?.result?.watchLimit || 5;

//   const handleViews = useCallback(() => {
//     dispatch(viewvideo({ id: vid }));
//   }, [dispatch, vid]);

//   const handleHistory = useCallback(() => {
//     if (currentuser && currentuser.result) {
//       dispatch(addtohistory({
//         videoid: vid,
//         viewer: currentuser.result._id,
//       }));
//     }
//   }, [dispatch, currentuser, vid]);

//   useEffect(() => {
//     if (currentuser && currentuser.result) {
//       handleHistory();
//     }
//     handleViews();
//   }, [currentuser, handleHistory, handleViews]);

//   // Build videoSources using the helper function for streaming URLs.
//   const videoSources = vv ? getVideoSources(vv) : [];
//   console.log("Video Sources:", videoSources);

//   return (
//     <div className="container_videoPage">
//       <div className="container2_videoPage">
//         <div className="video_display_screen_videoPage">
//           {vv && (
//             <VideoPlayer 
//               videoSources={videoSources} 
//               watchLimitMinutes={watchLimitMinutes} 
//             />
//           )}
//           <div className="video_details_videoPage">
//             <div className="video_btns_title_VideoPage_cont">
//               <p className="video_title_VideoPage">{vv?.videotitle}</p>
//               <div className="views_date_btns_VideoPage">
//                 <div className="views_videoPage">
//                   {vv?.views} views <div className="dot"></div>{" "}
//                   {moment(vv?.createdAt || vv?.createdat).fromNow()}
//                 </div>
//                 <Likewatchlatersavebtns vv={vv} vid={vid} />
//               </div>
//             </div>
//             <Link to={'/'} className="chanel_details_videoPage">
//               <b className="chanel_logo_videoPage">
//                 <p>{vv?.uploader ? vv.uploader.charAt(0).toUpperCase() : ''}</p>
//               </b>
//               <p className="chanel_name_videoPage">{vv?.uploader}</p>
//             </Link>
//             <div className="comments_VideoPage">
//               <h2>
//                 <u>Comments</u>
//               </h2>
//               <Comment videoid={vv?._id} />
//             </div>
//           </div>
//         </div>
//         <div className="moreVideoBar">More videos</div>
//       </div>
//     </div>
//   );
// };

// export default Videopage;


import React, { useEffect, useCallback } from "react";
import "./Videopage.css";
import moment from "moment";
import Likewatchlatersavebtns from "./Likewatchlatersavebtns";
import { useParams, Link } from "react-router-dom";
import Comment from "../../Component/Comment/Comment";
import { viewvideo } from "../../action/video";
import { addtohistory } from "../../action/history";
import { useSelector, useDispatch } from "react-redux";
import VideoPlayer from "../../Component/VideoPlayer/VideoPlayer";

// Helper function to build videoSources array using the streaming endpoint.
const getVideoSources = (video) => {
  const baseUrl = "https://your-tube-clone-2c2e.onrender.com"; // Update with your deployed backend URL
  return [
    {
      src: `${baseUrl}/video/stream/${video._id}/1080p`,
      type: "video/mp4",
      label: "1080p",
      res: 1080,
    },
    {
      src: `${baseUrl}/video/stream/${video._id}/720p`,
      type: "video/mp4",
      label: "720p",
      res: 720,
    },
    {
      src: `${baseUrl}/video/stream/${video._id}/480p`,
      type: "video/mp4",
      label: "480p",
      res: 480,
    },
    {
      src: `${baseUrl}/video/stream/${video._id}/320p`,
      type: "video/mp4",
      label: "320p",
      res: 320,
    },
  ];
};

const Videopage = () => {
  const { vid } = useParams();
  const dispatch = useDispatch();
  const vids = useSelector((state) => state.videoreducer);
  const vv = vids?.data.find((q) => q._id === vid);
  const currentuser = useSelector((state) => state.currentuserreducer);

  // Use the user's watch limit if available; otherwise, default to 5 minutes.
  const watchLimitMinutes = currentuser?.result?.watchLimit || 5;

  const handleViews = useCallback(() => {
    dispatch(viewvideo({ id: vid }));
  }, [dispatch, vid]);

  const handleHistory = useCallback(() => {
    if (currentuser && currentuser.result) {
      dispatch(
        addtohistory({
          videoid: vid,
          viewer: currentuser.result._id,
        })
      );
    }
  }, [dispatch, currentuser, vid]);

  useEffect(() => {
    if (currentuser && currentuser.result) {
      handleHistory();
    }
    handleViews();
  }, [currentuser, handleHistory, handleViews]);

  // Build videoSources using the helper function for streaming URLs.
  const videoSources = vv ? getVideoSources(vv) : [];
  console.log("Video Sources:", videoSources);

  return (
    <div className="container_videoPage">
      <div className="container2_videoPage">
        <div className="video_display_screen_videoPage">
          {vv && (
            <VideoPlayer 
              videoSources={videoSources} 
              watchLimitMinutes={watchLimitMinutes} 
            />
          )}
          <div className="video_details_videoPage">
            <div className="video_btns_title_VideoPage_cont">
              <p className="video_title_VideoPage">{vv?.videotitle}</p>
              <div className="views_date_btns_VideoPage">
                <div className="views_videoPage">
                  {vv?.views} views <div className="dot"></div>{" "}
                  {moment(vv?.createdAt || vv?.createdat).fromNow()}
                </div>
                <Likewatchlatersavebtns vv={vv} vid={vid} />
              </div>
            </div>
            <Link to={"/"} className="chanel_details_videoPage">
              <b className="chanel_logo_videoPage">
                <p>{vv?.uploader ? vv.uploader.charAt(0).toUpperCase() : ""}</p>
              </b>
              <p className="chanel_name_videoPage">{vv?.uploader}</p>
            </Link>
            <div className="comments_VideoPage">
              <h2>
                <u>Comments</u>
              </h2>
              <Comment videoid={vv?._id} />
            </div>
          </div>
        </div>
        <div className="moreVideoBar">More videos</div>
      </div>
    </div>
  );
};

export default Videopage;
