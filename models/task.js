
import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    isCompleted: {
        type: Boolean,
        default:false // mane by default isCompleted ta data base a false thakbe.......
    },
    user:{
        type:mongoose.Schema.Types.ObjectId, // mane database a user key er modhe user er object id hobe type......
        ref:"user", // ref user dilam karon user table er user er object id store korbo ate tai.....ref a user jekhane store hoche sei table name dite hobe...
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now, // ata deoya mandetory noi......kintu bydefault ata dile data jokhon store hobe....sei time tao store hobe....
    }
})


export const Task = mongoose.model("task", userschema); 