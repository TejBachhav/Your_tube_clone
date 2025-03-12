// import React, { useState, useEffect } from 'react'
// import logo from "./logo.ico"
// import "./Navbar.css"
// import { useDispatch, useSelector } from 'react-redux'
// import { Link, generatePath } from "react-router-dom"
// import { RiVideoAddLine } from "react-icons/ri"
// import { IoMdNotificationsOutline } from "react-icons/io"
// import { BiUserCircle } from "react-icons/bi"
// import Searchbar from './Searchbar/Searchbar'
// import Auth from '../../Pages/Auth/Auth'
// import axios from "axios"
// import { login } from "../../action/auth"
// import { useGoogleLogin,googleLogout } from '@react-oauth/google';
// import { setcurrentuser } from '../../action/currentuser';

// import {jwtDecode} from "jwt-decode"
// const Navbar = ({ toggledrawer, seteditcreatechanelbtn }) => {
//     const [authbtn, setauthbtn] = useState(false)
//     const [user, setuser] = useState(null)
//     const [profile, setprofile] = useState([])
//     const dispatch = useDispatch()
   

//     const currentuser = useSelector(state => state.currentuserreducer);
//     // console.log(currentuser)
//     const successlogin = () => {
//         if (profile.email) {
//             dispatch(login({ email: profile.email }))
//             console.log(profile.email)
//         }
//     }
//     // console.log(currentuser)
//     // const currentuser={
//     //     result:{
//     //         _id:1,
//     //         name:"abcjabsc",
//     //         email:"abcd@gmail.com",
//     //         joinedon:"222-07-134"
//     //     }
//     // }

//     const google_login = useGoogleLogin({
//         onSuccess: tokenResponse => setuser(tokenResponse),
        
//         onError: (error) => console.log("Login Failed", error)
//     });

//     useEffect(
//         () => {
//             if (user) {
//                 axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
//                     headers: {
//                         Authorization: `Bearer ${user.access_token}`,
//                         Accept: 'application/json'
//                     }
//                 })
//                     .then((res) => {
//                         setprofile(res.data)
//                         successlogin()
//                         // console.log(res.data)
//                     })

//             }
//         },
//         [user]
//     );
//     const logout=()=>{
//         dispatch(setcurrentuser(null))
//         googleLogout()
//         localStorage.clear()
//     }
//     useEffect(()=>{
//         const token=currentuser?.token;
//         if(token){
//             const decodetoken=jwtDecode(token)
//             if(decodetoken.exp *1000 <new Date().getTime()){
//                 logout()
//             }
//         }
//         dispatch(setcurrentuser(JSON.parse(localStorage.getItem("Profile"))))
//   },[currentuser?.token,dispatch]
// )
//     return (
//         <>
//             <div className="Container_Navbar">
//                 <div className="Burger_Logo_Navbar">
//                     <div className="burger" onClick={() => toggledrawer()}>
//                         <p></p>
//                         <p></p>
//                         <p></p>
//                     </div>
//                     <Link to={"/"} className='logo_div_Navbar'>
//                         <img src={logo} alt="" />
//                         <p className="logo_title_navbar">Your-Tube</p>
//                     </Link>
//                 </div>
//                 <Searchbar />
//                 <RiVideoAddLine size={22} className={"vid_bell_Navbar"} />
//                 <div className="apps_Box">
//                     <p className="appBox"></p>
//                     <p className="appBox"></p>
//                     <p className="appBox"></p>
//                     <p className="appBox"></p>
//                     <p className="appBox"></p>
//                     <p className="appBox"></p>
//                     <p className="appBox"></p>
//                     <p className="appBox"></p>
//                     <p className="appBox"></p>
//                 </div>

//                 <IoMdNotificationsOutline size={22} className={"vid_bell_Navbar"} />
//                 <div className="Auth_cont_Navbar">
//                     {currentuser ? (
//                         <>
//                             <div className="Chanel_logo_App" onClick={() => setauthbtn(true)}>
//                                 <p className="fstChar_logo_App">
//                                     {currentuser?.result.name ? (
//                                         <>{currentuser?.result.name.charAt(0).toUpperCase()}</>

//                                     ) : (
//                                         <>{currentuser?.result.email.charAt(0).toUpperCase()}</>
//                                     )}
//                                 </p>
//                             </div>
//                         </>
//                     ) : (
//                         <>
//                             <p className='Auth_Btn' onClick={() => google_login()}>
//                                 <BiUserCircle size={22} />
//                                 <b>Sign in</b>
//                             </p>
//                         </>
//                     )}
//                 </div>
//             </div>
//             {
//                 authbtn &&
//                 <Auth seteditcreatechanelbtn={seteditcreatechanelbtn} setauthbtn={setauthbtn} user={currentuser} />
//             }
//         </>
//     )
// }

// export default Navbar


// import React, { useState, useEffect, useCallback } from 'react';
// import './Navbar.css';
// import logo from './logo.ico';  // Ensure this path is correct
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from "react-router-dom";
// import { RiVideoAddLine } from "react-icons/ri";
// import { IoMdNotificationsOutline } from "react-icons/io";
// import { BiUserCircle } from "react-icons/bi";
// import Searchbar from './Searchbar/Searchbar';
// import Auth from '../../Pages/Auth/Auth';
// import axios from "axios";
// import { login } from "../../action/auth";
// import { useGoogleLogin, googleLogout } from '@react-oauth/google';
// import { setcurrentuser } from '../../action/currentuser';
// import { jwtDecode } from "jwt-decode";

// const Navbar = ({ toggledrawer, seteditcreatechanelbtn, setUpgradePlanModal }) => {
//   const [authbtn, setauthbtn] = useState(false);
//   const [user, setuser] = useState(null);
//   const [profile, setprofile] = useState({});
//   const dispatch = useDispatch();
//   const currentuser = useSelector(state => state.currentuserreducer);

//   // Wrap successlogin so it can be added to useEffect dependencies
//   const successlogin = useCallback(() => {
//     if (profile.email) {
//       dispatch(login({ email: profile.email }));
//       console.log("Logged in with:", profile.email);
//     }
//   }, [profile.email, dispatch]);

//   const google_login = useGoogleLogin({
//     onSuccess: tokenResponse => setuser(tokenResponse),
//     onError: (error) => console.log("Login Failed", error)
//   });

//   useEffect(() => {
//     if (user) {
//       axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
//         headers: {
//           Authorization: `Bearer ${user.access_token}`,
//           Accept: 'application/json'
//         }
//       })
//         .then((res) => {
//           setprofile(res.data);
//           successlogin();
//         })
//         .catch((err) => console.error(err));
//     }
//   }, [user, successlogin]);

//   // Wrap logout in useCallback
//   const logout = useCallback(() => {
//     dispatch(setcurrentuser(null));
//     googleLogout();
//     localStorage.clear();
//   }, [dispatch]);

//   useEffect(() => {
//     const token = currentuser?.token;
//     if (token) {
//       const decodetoken = jwtDecode(token);
//       if (decodetoken.exp * 1000 < new Date().getTime()) {
//         logout();
//       }
//     }
//     dispatch(setcurrentuser(JSON.parse(localStorage.getItem("Profile"))));
//   }, [currentuser?.token, dispatch, logout]);

//   return (
//     <>
//       <div className="Container_Navbar">
//         <div className="Burger_Logo_Navbar">
//           <div className="burger" onClick={() => toggledrawer()}>
//             <p></p>
//             <p></p>
//             <p></p>
//           </div>
//           <Link to={"/"} className='logo_div_Navbar'>
//             <img src={logo} alt="Logo" />
//             <p className="logo_title_navbar">Your-Tube</p>
//           </Link>
//         </div>
//         <Searchbar />
//         <RiVideoAddLine size={22} className={"vid_bell_Navbar"} />
//         <div className="apps_Box">
//           <p className="appBox"></p>
//           <p className="appBox"></p>
//           <p className="appBox"></p>
//           <p className="appBox"></p>
//           <p className="appBox"></p>
//           <p className="appBox"></p>
//           <p className="appBox"></p>
//           <p className="appBox"></p>
//           <p className="appBox"></p>
//         </div>
//         <IoMdNotificationsOutline size={22} className={"vid_bell_Navbar"} />
//         <div className="Auth_cont_Navbar">
//           {currentuser ? (
//             <>
//               <div className="Chanel_logo_App" onClick={() => setauthbtn(true)}>
//                 <p className="fstChar_logo_App">
//                   {currentuser?.result.name 
//                     ? currentuser?.result.name.charAt(0).toUpperCase() 
//                     : currentuser?.result.email.charAt(0).toUpperCase()
//                   }
//                 </p>
//               </div>
//               <div className="subscription-info" onClick={() => setUpgradePlanModal(true)}>
//                 <p style={{ cursor: "pointer", fontSize: "0.9rem", margin: 0 }}>
//                   {currentuser?.result.subscriptionPlan 
//                     ? currentuser.result.subscriptionPlan.toUpperCase() 
//                     : "FREE"}
//                 </p>
//                 <small style={{ cursor: "pointer" }}>Upgrade</small>
//               </div>
//             </>
//           ) : (
//             <>
//               <p className='Auth_Btn' onClick={() => google_login()}>
//                 <BiUserCircle size={22} />
//                 <b>Sign in</b>
//               </p>
//             </>
//           )}
//         </div>
//       </div>
//       {authbtn && (
//         <Auth seteditcreatechanelbtn={seteditcreatechanelbtn} setauthbtn={setauthbtn} user={currentuser} />
//       )}
//     </>
//   );
// };

// export default Navbar;


// import React, { useState, useEffect, useCallback } from 'react';
// import './Navbar.css';
// import logo from './logo.ico';  // Ensure this path is correct
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from "react-router-dom";
// import { RiVideoAddLine } from "react-icons/ri";
// import { IoMdNotificationsOutline } from "react-icons/io";
// import { BiUserCircle } from "react-icons/bi";
// import Searchbar from './Searchbar/Searchbar';
// import Auth from '../../Pages/Auth/Auth';
// import axios from "axios";
// import { login } from "../../action/auth";
// import { useGoogleLogin, googleLogout } from '@react-oauth/google';
// import { setcurrentuser } from '../../action/currentuser';
// import { jwtDecode } from "jwt-decode";

// const Navbar = ({ toggledrawer, seteditcreatechanelbtn, setUpgradePlanModal }) => {
//   const [authbtn, setauthbtn] = useState(false);
//   const [user, setuser] = useState(null);
//   const [profile, setprofile] = useState({});
//   const dispatch = useDispatch();
//   const currentuser = useSelector(state => state.currentuserreducer);

//   // Wrap successlogin so it can be added to useEffect dependencies
//   const successlogin = useCallback(() => {
//     if (profile.email) {
//       dispatch(login({ email: profile.email }));
//       console.log("Logged in with:", profile.email);
//     }
//   }, [profile.email, dispatch]);

//   const google_login = useGoogleLogin({
//     onSuccess: tokenResponse => setuser(tokenResponse),
//     onError: (error) => console.log("Login Failed", error)
//   });

//   useEffect(() => {
//     if (user) {
//       axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
//         headers: {
//           Authorization: `Bearer ${user.access_token}`,
//           Accept: 'application/json'
//         }
//       })
//         .then((res) => {
//           setprofile(res.data);
//           successlogin();
//         })
//         .catch((err) => console.error(err));
//     }
//   }, [user, successlogin]);

//   // Wrap logout in useCallback
//   const logout = useCallback(() => {
//     dispatch(setcurrentuser(null));
//     googleLogout();
//     localStorage.clear();
//   }, [dispatch]);

//   useEffect(() => {
//     const token = currentuser?.token;
//     if (token) {
//       const decodetoken = jwtDecode(token);
//       if (decodetoken.exp * 1000 < new Date().getTime()) {
//         logout();
//       }
//     }
//     dispatch(setcurrentuser(JSON.parse(localStorage.getItem("Profile"))));
//   }, [currentuser?.token, dispatch, logout]);

//   return (
//     <>
//       <div className="Container_Navbar">
//         <div className="Burger_Logo_Navbar">
//           <div className="burger" onClick={() => toggledrawer()}>
//             <p></p>
//             <p></p>
//             <p></p>
//           </div>
//           <Link to={"/"} className='logo_div_Navbar'>
//             <img src={logo} alt="Logo" />
//             <p className="logo_title_navbar">Your-Tube</p>
//           </Link>
//           {/* Plan Button placed at the beginning */}
//           {currentuser && (
//             <div className="plan-button" onClick={() => setUpgradePlanModal(true)}>
//               <span className="plan-label">
//                 {currentuser?.result.subscriptionPlan 
//                   ? currentuser.result.subscriptionPlan.toUpperCase() 
//                   : "FREE"}
//               </span>
//               <span className="plan-upgrade-text">Upgrade</span>
//             </div>
//           )}
//         </div>
//         <Searchbar />
//         <RiVideoAddLine size={22} className={"vid_bell_Navbar"} />
//         <div className="apps_Box">
//           <p className="appBox"></p>
//           <p className="appBox"></p>
//           <p className="appBox"></p>
//           <p className="appBox"></p>
//           <p className="appBox"></p>
//           <p className="appBox"></p>
//           <p className="appBox"></p>
//           <p className="appBox"></p>
//           <p className="appBox"></p>
//         </div>
//         <IoMdNotificationsOutline size={22} className={"vid_bell_Navbar"} />
//         <div className="Auth_cont_Navbar">
//           {currentuser ? (
//             <>
//               <div className="Chanel_logo_App" onClick={() => setauthbtn(true)}>
//                 <p className="fstChar_logo_App">
//                   {currentuser?.result.name 
//                     ? currentuser?.result.name.charAt(0).toUpperCase() 
//                     : currentuser?.result.email.charAt(0).toUpperCase()
//                   }
//                 </p>
//               </div>
//             </>
//           ) : (
//             <>
//               <p className='Auth_Btn' onClick={() => google_login()}>
//                 <BiUserCircle size={22} />
//                 <b>Sign in</b>
//               </p>
//             </>
//           )}
//         </div>
//       </div>
//       {authbtn && (
//         <Auth seteditcreatechanelbtn={seteditcreatechanelbtn} setauthbtn={setauthbtn} user={currentuser} />
//       )}
//     </>
//   );
// };

// export default Navbar;


import React, { useState, useEffect, useCallback } from 'react';
import './Navbar.css';
import logo from './logo.ico';  // Ensure this path is correct
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { RiVideoAddLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiUserCircle } from "react-icons/bi";
import { FaVideo } from "react-icons/fa"; // Icon for video call button
import Searchbar from './Searchbar/Searchbar';
import Auth from '../../Pages/Auth/Auth';
import axios from "axios";
import { login } from "../../action/auth";
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import { setcurrentuser } from '../../action/currentuser';
import { jwtDecode } from "jwt-decode";

const Navbar = ({ toggledrawer, seteditcreatechanelbtn, setUpgradePlanModal, setVideoCallModal }) => {
  const [authbtn, setauthbtn] = useState(false);
  const [user, setuser] = useState(null);
  const [profile, setprofile] = useState({});
  const dispatch = useDispatch();
  const currentuser = useSelector(state => state.currentuserreducer);

  // Debug: Log current video call modal function
  useEffect(() => {
    console.log("setVideoCallModal prop:", setVideoCallModal);
  }, [setVideoCallModal]);

  // Wrap successlogin so it can be added to useEffect dependencies
  const successlogin = useCallback(() => {
    if (profile.email) {
      dispatch(login({ email: profile.email }));
      console.log("Logged in with:", profile.email);
    }
  }, [profile.email, dispatch]);

  const google_login = useGoogleLogin({
    onSuccess: tokenResponse => setuser(tokenResponse),
    onError: (error) => console.log("Login Failed", error)
  });

  useEffect(() => {
    if (user) {
      axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
          Accept: 'application/json'
        }
      })
        .then((res) => {
          setprofile(res.data);
          successlogin();
        })
        .catch((err) => console.error(err));
    }
  }, [user, successlogin]);

  // Wrap logout in useCallback
  const logout = useCallback(() => {
    dispatch(setcurrentuser(null));
    googleLogout();
    localStorage.clear();
  }, [dispatch]);

  useEffect(() => {
    const token = currentuser?.token;
    if (token) {
      const decodetoken = jwtDecode(token);
      if (decodetoken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
    dispatch(setcurrentuser(JSON.parse(localStorage.getItem("Profile"))));
  }, [currentuser?.token, dispatch, logout]);

  // Debug function for video call button click
  const handleVideoCallClick = () => {
    console.log("Video call button clicked.");
    if (typeof setVideoCallModal === "function") {
      setVideoCallModal(true);
    } else {
      console.error("setVideoCallModal is not a function.");
    }
  };

  return (
    <>
      <div className="Container_Navbar">
        <div className="Burger_Logo_Navbar">
          <div className="burger" onClick={() => toggledrawer()}>
            <p></p>
            <p></p>
            <p></p>
          </div>
          <Link to={"/"} className='logo_div_Navbar'>
            <img src={logo} alt="Logo" />
            <p className="logo_title_navbar">Your-Tube</p>
          </Link>
          {/* Video Call Button placed right after logo */}
          {currentuser && (
            <div className="video-call-button" onClick={handleVideoCallClick}>
              <FaVideo size={22} />
              <span>Call</span>
            </div>
          )}
          {/* Plan Button placed next */}
          {currentuser && (
            <div className="plan-button" onClick={() => setUpgradePlanModal(true)}>
              <span className="plan-label">
                {currentuser?.result.subscriptionPlan 
                  ? currentuser.result.subscriptionPlan.toUpperCase() 
                  : "FREE"}
              </span>
              <span className="plan-upgrade-text">Upgrade</span>
            </div>
          )}
        </div>
        <Searchbar />
        <RiVideoAddLine size={22} className="vid_bell_Navbar" />
        <div className="apps_Box">
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
        </div>
        <IoMdNotificationsOutline size={22} className="vid_bell_Navbar" />
        <div className="Auth_cont_Navbar">
          {currentuser ? (
            <div className="Chanel_logo_App" onClick={() => setauthbtn(true)}>
              <p className="fstChar_logo_App">
                {currentuser?.result.name 
                  ? currentuser?.result.name.charAt(0).toUpperCase() 
                  : currentuser?.result.email.charAt(0).toUpperCase()
                }
              </p>
            </div>
          ) : (
            <p className="Auth_Btn" onClick={() => google_login()}>
              <BiUserCircle size={22} />
              <b>Sign in</b>
            </p>
          )}
        </div>
      </div>
      {authbtn && (
        <Auth seteditcreatechanelbtn={seteditcreatechanelbtn} setauthbtn={setauthbtn} user={currentuser} />
      )}
    </>
  );
};

Navbar.defaultProps = {
  setVideoCallModal: () => {},
};

export default Navbar;

