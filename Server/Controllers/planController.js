// server/controllers/planController.js
import Stripe from 'stripe';
import nodemailer from 'nodemailer';
import User from '../Models/User.js'; // Your user model
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Define plans (amount in paise for INR)
const plans = {
  bronze: { price: 1000, watchLimit: 7 },   // 10rs, 7 minutes
  silver: { price: 5000, watchLimit: 10 },    // 50rs, 10 minutes
  gold: { price: 10000, watchLimit: Infinity } // 100rs, unlimited
};

export const upgradePlan = async (req, res) => {
  try {
    const { userId, plan } = req.body;
    const selectedPlan = plans[plan];
    if (!selectedPlan) {
      return res.status(400).json({ message: 'Invalid plan selection' });
    }

    // Create a payment intent using Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: selectedPlan.price, // in paise (e.g. 1000 paise = ₹10)
      currency: 'inr',
      payment_method_types: ['card'],
      metadata: { userId, plan }
    });

    // Return clientSecret to complete the payment on the frontend
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error upgrading plan:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const confirmPlanUpgrade = async (req, res) => {
  try {
    const { userId, plan } = req.body;
    const selectedPlan = plans[plan];
    if (!selectedPlan) {
      return res.status(400).json({ message: 'Invalid plan selection' });
    }

    // Update the user's subscription plan and watch limit in your database.
    // This assumes your User model has subscriptionPlan and watchLimit fields.
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { subscriptionPlan: plan, watchLimit: selectedPlan.watchLimit },
      { new: true }
    );

    // Create invoice details
    const invoiceDetails = {
      user: updatedUser.email,
      plan,
      amount: selectedPlan.price / 100, // convert paise to rupees
      watchLimit: selectedPlan.watchLimit === Infinity ? "Unlimited" : `${selectedPlan.watchLimit} minutes`,
      date: new Date()
    };

    // Send invoice email using Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // use your preferred email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: updatedUser.email,
      subject: `Your ${plan} Plan Subscription Invoice`,
      text: `Dear ${updatedUser.name},
      
Thank you for upgrading your plan to ${plan.toUpperCase()}.
Invoice Details:
- Amount: ₹${invoiceDetails.amount}
- Watch Time Limit: ${invoiceDetails.watchLimit}
- Date: ${invoiceDetails.date.toLocaleString()}

Regards,
Your Tube Team`
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
