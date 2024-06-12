import mongoose ,{Schema,Model} from "mongoose";

export const userSchema = new Schema({
    username:{type:String,require:true}
},{timestamps:{createdAt:true,updatedAt:true}})


export default mongoose.model('User',userSchema);