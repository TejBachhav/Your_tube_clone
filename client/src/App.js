// import React, { useEffect, useState } from "react";
// import './App.css';
// import Navbar from './Component/Navbar/Navbar';
// import { useDispatch } from 'react-redux';
// import Allroutes from "./Allroutes";
// import { BrowserRouter as Router } from 'react-router-dom';
// import Drawersliderbar from './Component/Leftsidebar/Drawersliderbar';
// import Createeditchannel from './Pages/Channel/Createeditchannel';
// import Videoupload from './Pages/Videoupload/Videoupload';
// import UpgradePlan from './Pages/UpgradePlan/UpgradePlan'; // Import the upgrade plan component
// import { fetchallchannel } from './action/channeluser';
// import { getallvideo } from './action/video';
// import { getallcomment } from './action/comment';
// import { getallhistory } from './action/history';
// import { getalllikedvideo } from './action/likedvideo';
// import { getallwatchlater } from './action/watchlater';

// function App() {
//   const [toggledrawersidebar, settogledrawersidebar] = useState({ display: "none" });
//   const [editcreatechanelbtn, seteditcreatechanelbtn] = useState(false);
//   const [videouploadpage, setvideouploadpage] = useState(false);
//   const [upgradePlanModal, setUpgradePlanModal] = useState(false); // State for plan upgrade modal

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchallchannel());
//     dispatch(getallvideo());
//     dispatch(getallcomment());
//     dispatch(getallhistory());
//     dispatch(getalllikedvideo());
//     dispatch(getallwatchlater());
//   }, [dispatch]);

//   const toggledrawer = () => {
//     settogledrawersidebar(prevState => ({
//       display: prevState.display === "none" ? "flex" : "none"
//     }));
//   };

//   return (
//     <Router>
//       {/* Conditionally render modals or pages */}
//       {videouploadpage && <Videoupload setvideouploadpage={setvideouploadpage} />}
//       {editcreatechanelbtn && <Createeditchannel seteditcreatechanelbtn={seteditcreatechanelbtn} />}
//       {upgradePlanModal && <UpgradePlan setUpgradePlanModal={setUpgradePlanModal} />}
      
//       <Navbar 
//         seteditcreatechanelbtn={seteditcreatechanelbtn} 
//         toggledrawer={toggledrawer} 
//         setUpgradePlanModal={setUpgradePlanModal} // pass handler if needed
//       />
//       <Drawersliderbar toggledraw={toggledrawer} toggledrawersidebar={toggledrawersidebar} />
//       <Allroutes 
//         seteditcreatechanelbtn={seteditcreatechanelbtn} 
//         setvideouploadpage={setvideouploadpage} 
//         setUpgradePlanModal={setUpgradePlanModal} // if your routes need to trigger upgrade modal
//       />
//     </Router>
//   );
// }

// export default App;


import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Component/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import Allroutes from "./Allroutes";
import { BrowserRouter as Router } from "react-router-dom";
import Drawersliderbar from "./Component/Leftsidebar/Drawersliderbar";
import Createeditchannel from "./Pages/Channel/Createeditchannel"; // Updated import
import Videoupload from "./Pages/Videoupload/Videoupload";
import UpgradePlan from "./Pages/UpgradePlan/UpgradePlan"; // Import UpgradePlan component
import VideoCall from "./Pages/VideoCall/VideoCall"; // Import VideoCall component
import { fetchallchannel } from "./action/channeluser";
import { getallvideo } from "./action/video";
import { getallcomment } from "./action/comment";
import { getallhistory } from "./action/history";
import { getalllikedvideo } from "./action/likedvideo";
import { getallwatchlater } from "./action/watchlater";

function App() {
  const [toggledrawersidebar, settogledrawersidebar] = useState({ display: "none" });
  const [editcreatechannelbtn, seteditcreatechannelbtn] = useState(false);
  const [videouploadpage, setvideouploadpage] = useState(false);
  const [upgradePlanModal, setUpgradePlanModal] = useState(false); // For plan upgrade modal
  const [videoCallModal, setVideoCallModal] = useState(false); // For video call modal

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentuserreducer?.result);

  useEffect(() => {
    dispatch(fetchallchannel());
    dispatch(getallvideo());
    dispatch(getallcomment());
    dispatch(getallhistory());
    dispatch(getalllikedvideo());
    dispatch(getallwatchlater());
  }, [dispatch]);

  const toggledrawer = () => {
    settogledrawersidebar((prevState) => ({
      display: prevState.display === "none" ? "flex" : "none",
    }));
  };

  return (
    <Router>
      {/* Conditionally render modals */}
      {videouploadpage && (
        <Videoupload setvideouploadpage={setvideouploadpage} />
      )}
      {editcreatechannelbtn && (
        <Createeditchannel seteditcreatechanelbtn={seteditcreatechannelbtn} />
      )}
      {upgradePlanModal && (
        <UpgradePlan
          setUpgradePlanModal={setUpgradePlanModal}
          currentUserId={currentUser?._id}
        />
      )}
      {videoCallModal && (
        <VideoCall setVideoCallModal={setVideoCallModal} />
      )}
      <Navbar
        seteditcreatechannelbtn={seteditcreatechannelbtn}
        toggledrawer={toggledrawer}
        setUpgradePlanModal={setUpgradePlanModal}
        setVideoCallModal={setVideoCallModal}
      />
      <Drawersliderbar
        toggledraw={toggledrawer}
        toggledrawersidebar={toggledrawersidebar}
      />
      <Allroutes
        seteditcreatechanelbtn={seteditcreatechannelbtn}
        setvideouploadpage={setvideouploadpage}
        setUpgradePlanModal={setUpgradePlanModal}
        setVideoCallModal={setVideoCallModal}
      />
    </Router>
  );
}

export default App;

