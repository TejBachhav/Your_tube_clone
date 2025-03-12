import React, { useState } from 'react';
import axios from 'axios';
import './UpgradePlan.css';

const UpgradePlan = ({ setUpgradePlanModal, currentUserId }) => {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [orderData, setOrderData] = useState(null);

  const handlePlanChange = (e) => {
    setSelectedPlan(e.target.value);
  };

  const handleUpgrade = async () => {
    if (!selectedPlan) {
      alert("Please select a plan");
      return;
    }

    try {
      const { data } = await axios.post("https://your-tube-clone-2c2e.onrender.com/plan/upgrade", {
        userId: currentUserId,
        plan: selectedPlan,
      });
      setOrderData(data.order);
      alert("Payment simulated successfully. Click 'Confirm Upgrade' to complete the process.");
    } catch (error) {
      console.error("Error creating order:", error.response?.data || error.message);
    }
  };

  const confirmUpgrade = async () => {
    try {
      await axios.post("https://your-tube-clone-2c2e.onrender.com/plan/confirm-upgrade", {
        userId: currentUserId,
        plan: selectedPlan,
      });
      alert("Plan upgraded successfully");
      setUpgradePlanModal(false);
    } catch (error) {
      console.error("Error confirming upgrade:", error.response?.data || error.message);
    }
  };

  return (
    <div className="upgrade-plan-container">
      <h2>Upgrade Subscription</h2>
      <select value={selectedPlan} onChange={handlePlanChange} className="plan-select">
        <option value="">Select Plan</option>
        <option value="bronze">Bronze - ₹10 (7 minutes)</option>
        <option value="silver">Silver - ₹50 (10 minutes)</option>
        <option value="gold">Gold - ₹100 (Unlimited)</option>
      </select>
      <button onClick={handleUpgrade} className="upgrade-button">
        Upgrade
      </button>
      {orderData && (
        <button onClick={confirmUpgrade} className="confirm-button">
          Confirm Upgrade
        </button>
      )}
    </div>
  );
};

export default UpgradePlan;
