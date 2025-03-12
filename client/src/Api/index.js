// import axios from "axios"
// const API=axios.create({baseURL:`http://localhost:5000/`})

// API.interceptors.request.use((req)=>{
//     if(localStorage.getItem("Profile")){
//         req.headers.Authorization=`Bearer ${JSON.parse(localStorage.getItem("Profile")).token}`
//     }
//     return req;
// })


// export const login=(authdata)=>API.post("/user/login",authdata);
// export const updatechaneldata=(id,updatedata)=>API.patch(`/user/update/${id}`,updatedata)
// export const fetchallchannel=()=>API.get("/user/getallchannel");

// export const uploadvideo=(filedata,fileoption)=>API.post("/video/uploadvideo",filedata,fileoption)
// export const getvideos=()=>API.get("/video/getvideos");
// export const likevideo=(id,Like)=>API.patch(`/video/like/${id}`,{Like});
// export const viewsvideo=(id)=>API.patch(`/video/view/${id}`);

// export const postcomment=(commentdata)=>API.post('/comment/post',commentdata)
// export const deletecomment=(id)=>API.delete(`/comment/delete/${id}`)
// export const editcomment=(id,commentbody)=>API.patch(`/comment/edit/${id}`,{commentbody})
// export const getallcomment=()=>API.get('/comment/get')

// export const addtohistory=(historydata)=>API.post("/video/history",historydata)
// export const getallhistory=()=>API.get('/video/getallhistory')
// export const deletehistory=(userid)=>API.delete(`/video/deletehistory/${userid}`)

// export const addtolikevideo=(likedvideodata)=>API.post('/video/likevideo',likedvideodata)
// export const getalllikedvideo=()=>API.get('/video/getalllikevide')
// export const deletelikedvideo=(videoid,viewer)=>API.delete(`/video/deletelikevideo/${videoid}/${viewer}`)

// export const addtowatchlater=(watchlaterdata)=>API.post('/video/watchlater',watchlaterdata)
// export const getallwatchlater=()=>API.get('/video/getallwatchlater')
// export const deletewatchlater=(videoid,viewer)=>API.delete(`/video/deletewatchlater/${videoid}/${viewer}`)

// IMPV

import axios from "axios";

const API = axios.create({ baseURL: "https://your-tube-backend.onrender.com/" });

// Request interceptor to attach token if available
API.interceptors.request.use((req) => {
  const profile = localStorage.getItem("Profile");
  if (profile) {
    req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`;
  }
  return req;
});

// Response interceptor to process video file paths
API.interceptors.response.use(
  (response) => {
    // Check if the request URL is '/video/getvideos' and response.data is an array
    if (response.config.url === "/video/getvideos" && Array.isArray(response.data)) {
      response.data = response.data.map((video) => {
        // If the video document has a folder property,
        // update the quality file paths to include the folder.
        if (video.folder && video.folder.trim() !== "") {
          // Ensure the folder ends with a slash
          let folder = video.folder;
          if (!folder.endsWith("/")) {
            folder += "/";
          }
          video.filepath1080p = `/Videos/${folder}${video.filepath1080p}`;
          video.filepath720p = `/Videos/${folder}${video.filepath720p}`;
          video.filepath480p = `/Videos/${folder}${video.filepath480p}`;
          video.filepath320p = `/Videos/${folder}${video.filepath320p}`;
        }
        return video;
      });
    }
    return response;
  },
  (error) => Promise.reject(error)
);

// Authentication endpoints
export const login = (authdata) => API.post("/user/login", authdata);
export const updatechaneldata = (id, updatedata) => API.patch(`/user/update/${id}`, updatedata);
export const fetchallchannel = () => API.get("/user/getallchannel");

// Video endpoints
export const uploadvideo = (filedata, fileoption) => API.post("/video/uploadvideo", filedata, fileoption);
export const getvideos = () => API.get("/video/getvideos");
export const likevideo = (id, Like) => API.patch(`/video/like/${id}`, { Like });
export const viewsvideo = (id) => API.patch(`/video/view/${id}`);

// Comment endpoints
export const postcomment = (commentdata) => API.post('/comment/post', commentdata);
export const deletecomment = (id) => API.delete(`/comment/delete/${id}`);
export const editcomment = (id, commentbody) => API.patch(`/comment/edit/${id}`, { commentbody });
export const getallcomment = () => API.get('/comment/get');

// History endpoints
export const addtohistory = (historydata) => API.post("/video/history", historydata);
export const getallhistory = () => API.get('/video/getallhistory');
export const deletehistory = (userid) => API.delete(`/video/deletehistory/${userid}`);

// Liked video endpoints
export const addtolikevideo = (likedvideodata) => API.post('/video/likevideo', likedvideodata);
export const getalllikedvideo = () => API.get('/video/getalllikevide');
export const deletelikedvideo = (videoid, viewer) => API.delete(`/video/deletelikevideo/${videoid}/${viewer}`);

// Watch later endpoints
export const addtowatchlater = (watchlaterdata) => API.post('/video/watchlater', watchlaterdata);
export const getallwatchlater = () => API.get('/video/getallwatchlater');
export const deletewatchlater = (videoid, viewer) => API.delete(`/video/deletewatchlater/${videoid}/${viewer}`);

export default API;
