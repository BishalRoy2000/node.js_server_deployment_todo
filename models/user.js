
import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
    },
    email: {
        type: String,
        required:true,
        unique: true
    },
    password: {
        type: String,
        select: false, // select false mane jokhon "const user=User.find({})" likhe user er variable er modhe sob user details store korbo tokhon bydefault password ke store korbe na user variable er modhe .....jehetu select false ache....
        required:true
    },
    createdAt: {  // ata deoya mandetory noi......kintu bydefault ata dile data jokhon store hobe....sei time tao store hobe....
        type: Date,
        default: Date.now, 
    }
})


export const User = mongoose.model("user", userschema); 