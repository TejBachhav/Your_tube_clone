// import mongoose from "mongoose";

// const userschema=mongoose.Schema({
//     email:{type:String,require:true},
//     name:{type:String},
//     desc:{type:String},
//     joinedon:{type:Date,default:Date.now}
// })

// export default mongoose.model("User",userschema)

// import mongoose from "mongoose";

// const userschema = mongoose.Schema({
//   email: { type: String, required: true },
//   name: { type: String },
//   desc: { type: String },
//   joinedon: { type: Date, default: Date.now },
//   // New subscription fields:
//   subscriptionPlan: {
//     type: String,
//     enum: ['free', 'bronze', 'silver', 'gold'],
//     default: 'free'
//   },
//   watchLimit: {
//     // For example: free: 5 mins, bronze: 7, silver: 10, gold: Infinity (or a high number)
//     type: Number,
//     default: 5
//   }
// });

// export default mongoose.model("User", userschema);

import mongoose from "mongoose";

const userschema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String },
  desc: { type: String },
  joinedon: { type: Date, default: Date.now },
  // New subscription fields:
  subscriptionPlan: {
    type: String,
    enum: ['free', 'bronze', 'silver', 'gold'],
    default: 'free'
  },
  watchLimit: {
    type: Number,
    default: 5  // 5 minutes for free plan
  }
});

export default mongoose.models.User || mongoose.model("User", userschema);
