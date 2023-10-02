import jwt from "jsonwebtoken";

// register and login api er modhe ai cookie send kora bar bar na likhe ........utils namer akta folder baniye tar modhe features namer file baniye tar modhe ai sendcookie namer function ta banalam.....jokhon icha jekhane icha cookie send korar hobe ai function ta call kore debo....

export const sendcookie=(user,res,message,statusCode=200)=>{
    const token=jwt.sign({_id:user._id},process.env.JWT_SECRET);

    res.status(statusCode).cookie("token",token,{
        httpOnly:true,
        maxAge:15*60*1000,
        // sameSite:"strict" // atar mane ami jotoy cors er modhe oi domain er name di...ar credential true kori.....kono cookie pathabe na frontend a.......samesite 3 rokomer hoi....lax..jeta bydefault thake....strict ....ar none....mane same site na hole cookie send korbe..kintu secure:true dite hobe.....
        sameSite:process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure:process.env.NODE_ENV === "Development" ? false : true
    }).json({
        success:true,
        message
    })
}