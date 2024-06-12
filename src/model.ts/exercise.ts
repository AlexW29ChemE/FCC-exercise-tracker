import mongoose from "mongoose";
import { userSchema } from "./user";


const exerciseSchema = new mongoose.Schema({
    username:String,description:{type:String},duration:Number,date:{type:Date,get:(val:Date)=>val.toDateString(),default:new Date()},userId:mongoose.Schema.Types.ObjectId
},{timestamps:{createdAt:true,updatedAt:true},toJSON: { getters: true }})

export default mongoose.model('Exercise',exerciseSchema);