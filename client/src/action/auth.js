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

// Connect to signaling server
const SIGNALING_URL = process.env.REACT_APP_SIGNALING_URL || "https://your-tube-clone-2c2e.onrender.com";
const socket = io(SIGNALING_URL);

export const login = (authdata) => async (dispatch) => {
  try {
    const { data } = await api.login(authdata);
    console.log("Login Response Data:", data); // Debugging line

    // Dispatch authentication action
    dispatch({ type: "AUTH", data });

    // Save profile in localStorage
    localStorage.setItem("Profile", JSON.stringify(data));

    // Update current user in Redux
    dispatch(setcurrentuser(data));

    // Extract email
    let currentEmail = data?.result?.email || data?.user?.email || null; // Handle different structures

    // If email is missing, check localStorage
    if (!currentEmail) {
      const storedProfile = JSON.parse(localStorage.getItem("Profile"));
      currentEmail = storedProfile?.result?.email || storedProfile?.user?.email || null;
    }

    if (currentEmail) {
      socket.emit("register", currentEmail);
      console.log(`Registered with signaling server: ${currentEmail}`);
    } else {
      console.warn("⚠️ Current user email is still not available.");
    }
  } catch (error) {
    console.error("Login Error:", error);
    alert("Login failed. Please try again.");
  }
};

