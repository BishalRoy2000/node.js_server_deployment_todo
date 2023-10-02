

import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendcookie } from "../utils/features.js";
import errorHandler from "../middlewares/error.js";

// jekhane async await use hoi sekhane try catch use korte hoi......tahole error dileo app crash hobe na

//-------------------------------------------------------------------------------------------------------------------------------------------
// login
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password"); // jehetu database schema te password field select:false diyechi.......tai bydefault ai findone query password ke store korbe na user variable a......password ke store korte hole .select() method use korte hobe.......select er modhe ja likbo sudhu sei takei store korbe....jemon jodi arokom likhi ".select(email)".....tahole sudhu email kei store korbe.....akhane ".select("+password")"......"+" er mane hoche findone ja kichu database thke tulche tar sathe password keo tulbe.....
        if (!user) return next(new errorHandler("User not exist, Register first....", 404));
        const ismatch = await bcrypt.compare(password, user.password);

        if (!ismatch) return next(new errorHandler("Invalid Password", 401));

        sendcookie(user, res, `welcome back, ${user.name}`, 200);
    } catch (error) {
        next(error);
    }

}

//----------------------------------------------------------------------------------------------------------------------------------------------
// register
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) return next(new errorHandler("User Already exist", 409));

        const haspassword = await bcrypt.hash(password, 10);

        user = await User.create({ name, email, password: haspassword });

        sendcookie(user, res, "Register Successfully", 201);
    } catch (error) {
        next(error);
    }
}

//-----------------------------------------------------------------------------------------------------------------------------------------------
// myprofile
export const getmyprofile = (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user  // akhane middle ware function er req.user use korchi.....karon routes er modhe ai function er age oi isAuthenticate function take handler hisabe use korechi......tai req.user access korte parbo akhane......
    })
}

//------------------------------------------------------------------------------------------------------------------------------------------------
// logout
export const logout = (req, res) => {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite:process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure:process.env.NODE_ENV === "Development" ? false : true
    }).json({
        success: true,
        message: "Logout Successfully"
    })
}