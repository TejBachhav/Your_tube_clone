import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import users from '../Models/Auth.js'; // Using "users" as per your request

dotenv.config();

// Dummy plans configuration (amount in paise and watchLimit in minutes)
const plans = {
  bronze: { price: 1000, watchLimit: 7 },    // ₹10 for 7 minutes
  silver: { price: 5000, watchLimit: 10 },     // ₹50 for 10 minutes
  gold: { price: 10000, watchLimit: Infinity } // ₹100 for unlimited minutes
};

export const upgradePlan = async (req, res) => {
  try {
    const { userId, plan } = req.body;
    const selectedPlan = plans[plan];
    if (!selectedPlan) {
      return res.status(400).json({ message: 'Invalid plan selection' });
    }

    // Simulate order creation by returning a dummy order object.
    const dummyOrder = {
      id: "dummy_order_id",
      amount: selectedPlan.price,
      currency: "INR",
    };

    res.status(200).json({ order: dummyOrder });
  } catch (error) {
    console.error("Error upgrading plan:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const confirmPlanUpgrade = async (req, res) => {
  try {
    const { userId, plan } = req.body;
    console.log("Confirming upgrade for user:", userId, "Plan:", plan);
    const selectedPlan = plans[plan];
    if (!selectedPlan) {
      return res.status(400).json({ message: 'Invalid plan selection' });
    }

    // Update the user's subscription plan and watch limit.
    const updatedUser = await users.findByIdAndUpdate(
      userId,
      { subscriptionPlan: plan, watchLimit: selectedPlan.watchLimit },
      { new: true }
    );
    console.log("Updated user:", updatedUser);

    if (!updatedUser || !updatedUser.email) {
      return res.status(404).json({ message: "User not found or missing email" });
    }

    // Prepare invoice details.
    const invoiceDetails = {
      user: updatedUser.email,
      plan,
      amount: selectedPlan.price / 100, // convert paise to rupees
      watchLimit: selectedPlan.watchLimit === Infinity ? "Unlimited" : `${selectedPlan.watchLimit} minutes`,
      date: new Date(),
    };

    // Setup Nodemailer transporter.
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Use your email service or provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: updatedUser.email,
      subject: `Your ${plan.toUpperCase()} Plan Subscription Invoice`,
      text: `Dear ${updatedUser.name || "User"},

Thank you for upgrading your plan to ${plan.toUpperCase()}.
Invoice Details:
- Amount: ₹${invoiceDetails.amount}
- Watch Time Limit: ${invoiceDetails.watchLimit}
- Date: ${invoiceDetails.date.toLocaleString()}

Regards,
Your Tube Team`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending invoice email:", err);
      } else {
        console.log("Invoice email sent:", info.response);
      }
    });

    res.status(200).json({ message: "Plan upgraded successfully", user: updatedUser });
  } catch (error) {
    console.error("Error confirming plan upgrade:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
