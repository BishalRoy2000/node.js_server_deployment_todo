import express from "express";
import userroutes from "./routes/user.js";
import taskroutes from "./routes/task.js";
import { config } from "dotenv"; 
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors"; // jodi ai server ta deploy kori.....tokhon frontend er alada url......backend er api er alada url hobe...... browser ata support kore na ....je akta domain theke onno akta domain a request patano.....kichu protocol thake jegulo follow korte hoi....ai jonno cors use kora hoi....cors - cross origin resourse sharing.....

export const app=express(); 

config({
    path:"./data/config.env"
})

// midle ware
app.use(express.json()); // ai midle ware ta tolay midle ware router use korar age korte hobe....na hole error diye debe..... 
app.use(cookieParser());
app.use(cors({ // arokom cors ke call kore tar modhe object pass korte hobe.....
    origin:[process.env.FRONTEND_URL], // origin dilam mane kon kon domain theke ai domain ke access kora jabe.....multiple domain dite gele origin use kore sekhane ar akta domain dite hobe.....jemon.."origin:[process.env.FRONTEND_URL2]".......agulo chara onno kono domain thke ai domain ke access kora jabe na.....
    methods:["GET","POST","PUT","DELETE"], // ki ki method access kora jabe ai domain er......
    credentials:true // ata true dile.....and frontend a "withCredentials:true"......dile tobe...login er somoy je cookie send korchi....seta frontend a jabe.....na hole jabe na.....
}));
app.use("/api/v1/users", userroutes); 
app.use("/api/v1/tasks",taskroutes);


// express by default akta error handler er middle ware prodan kore......
// kono handler er modhe jokhon next() call hoi tokhon seta porer handler chalai....
// kintu ami jokhon e kono handler er modhe next() call kore tar modhe error argument pass korbo... tokhon e sob bondho kore ai error middle ware ta chalabe...

app.use(errorMiddleware); // akhane middle ware ta use korlam.....jeta middleware folder a baniyechi.....

app.get("/",(req,res)=>{
    res.send("nice work");
})