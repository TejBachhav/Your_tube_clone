// import * as api from "../Api";
// import { setcurrentuser } from "./currentuser";
// export const login=(authdata)=>async(dispatch)=>{
//     try {
//         const {data}=await api.login(authdata);
//         dispatch({type:"AUTH",data})
//         dispatch(setcurrentuser(JSON.parse(localStorage.getItem('Profile'))))
//     } catch (error) {
//         alert(error)
//     }
// }

import * as api from "../Api";
import { setcurrentuser } from "./currentuser";
import io from "socket.io-client";

// Connect to your signaling server using an environment variable, falling back to localhost for development.
const SIGNALING_URL = process.env.REACT_APP_SIGNALING_URL || "https://your-tube-clone-2c2e.onrender.com";
const socket = io(SIGNALING_URL);

export const login = (authdata) => async (dispatch) => {
  try {
    const { data } = await api.login(authdata);
    // Dispatch the authentication action
    dispatch({ type: "AUTH", data });
    // Save profile data to localStorage (if not already done in your API call)
    localStorage.setItem("Profile", JSON.stringify(data));
    // Update the current user in Redux
    dispatch(setcurrentuser(data));
    
    // Emit a registration event with the user's email to the signaling server.
    if (data?.result?.email) {
      socket.emit("register", data.result.email);
      console.log(`Registered on signaling server with email: ${data.result.email}`);
    } else {
      console.warn("User email not available for registration.");
    }
  } catch (error) {
    alert(error);
  }
};
