// akhono obdi aktai emon route ache jeta access korte gele login korte hobe and cokkie set korte hobe age........
// kintu jodi arokom multiple route thake tahole ki bar bar check korbe cookie ache kina ....login koreche kina....
// tai isAuthenticate namer akta function banabo.....je je route access korte gele login thakte hobe cookie set thakte hobe......sei sei route er handler hisabe age ai function ta diye debo.......
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import errorHandler from "./error.js";

export const isAuthenticate = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) return next(new errorHandler("Login First...", 404));
        const decodeddata = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decodeddata._id); // akhne user er sob data req.user a save korchi.....tai aai function ta jekhane handler hisabe use korbo tar porer sob handler er modhe ai req.user ke access korte parbo...
        next();
    } catch (error) {
        next(error);
    }
}