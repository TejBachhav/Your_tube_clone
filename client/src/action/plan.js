import axios from "axios";

export const upgradePlanAction = (upgradeData) => async (dispatch) => {
  try {
    const { data } = await axios.post("http://localhost:5000/plan/upgrade", upgradeData);
    // Optionally dispatch an action here
    return data;
  } catch (error) {
    console.error("Error upgrading plan:", error.response?.data || error.message);
  }
};

export const confirmUpgradeAction = (confirmData) => async (dispatch) => {
  try {
    const { data } = await axios.post("http://localhost:5000/plan/confirm-upgrade", confirmData);
    // Optionally dispatch an action to update the user state
    return data;
  } catch (error) {
    console.error("Error confirming upgrade:", error.response?.data || error.message);
  }
};
