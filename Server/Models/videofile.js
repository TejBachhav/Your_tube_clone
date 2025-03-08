// import mongoose from "mongoose"
// const videofileschema=new mongoose.Schema(
//     {
//         videotitle:{
//             type:String,
//             required:true,
//         },
//         filename:{
//             type:String,
//             required:true,
//         },
//         filetype:{
//             type:String,
//             required:true,
//         },
//         filepath:{
//             type:String,
//             required:true,
//         },
//         filesize:{
//             type:String,
//             required:true,
//         },
//         videochanel:{
//             type:String,
//             required:true,
//         },
//         Like:{
//             type:Number,
//             default:0,
//         },
//         views:{
//             type:Number,
//             default:0,
//         },
//         uploader:{
//             type:String
//         }
//     },
//     {
//         timestamps:true,
//     }
// )
// export default mongoose.model("Videofiles",videofileschema)

// IMP

import mongoose from "mongoose";

const videofileschema = new mongoose.Schema(
  {
    videotitle: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    filetype: {
      type: String,
      required: true,
    },
    filepath: {
      type: String,
      required: true,
    },
    filesize: {
      type: String,
      required: true,
    },
    videochanel: {
      type: String,
      required: true,
    },
    uploader: {
      type: String,
    },
    Like: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    // New fields for transcoded quality files
    folder: {
      type: String,
    },
    filepath1080p: {
      type: String,
    },
    filepath720p: {
      type: String,
    },
    filepath480p: {
      type: String,
    },
    filepath320p: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Videofiles", videofileschema);
