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

// import mongoose from "mongoose";

// const videofileschema = new mongoose.Schema(
//   {
//     videotitle: {
//       type: String,
//       required: true,
//     },
//     filename: {
//       type: String,
//       required: true,
//     },
//     filetype: {
//       type: String,
//       required: true,
//     },
//     filepath: {
//       type: String,
//       required: true,
//     },
//     filesize: {
//       type: String,
//       required: true,
//     },
//     videochanel: {
//       type: String,
//       required: true,
//     },
//     uploader: {
//       type: String,
//     },
//     Like: {
//       type: Number,
//       default: 0,
//     },
//     views: {
//       type: Number,
//       default: 0,
//     },
//     // New fields for transcoded quality files
//     folder: {
//       type: String,
//     },
//     filepath1080p: {
//       type: String,
//     },
//     filepath720p: {
//       type: String,
//     },
//     filepath480p: {
//       type: String,
//     },
//     filepath320p: {
//       type: String,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export default mongoose.model("Videofiles", videofileschema);


import mongoose from "mongoose";

const videofileSchema = new mongoose.Schema(
  {
    videotitle: { type: String, required: true },
    filename: { type: String, required: true },
    filetype: { type: String, required: true },
    // This field can store a fallback file path (if needed) but is not used for streaming
    filepath: { type: String, required: true },
    filesize: { type: String, required: true },
    videochannel: { type: String, required: true },
    uploader: { type: String },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    folder: { type: String },
    // Fields for transcoded quality files now hold Cloudinary URLs
    filepath1080p: { type: String },
    filepath720p: { type: String },
    filepath480p: { type: String },
    filepath320p: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Videofiles", videofileSchema);
