import express from "express";
import { deletetask, mytask, newtask, updatetask } from "../controllers/task.js";
import { isAuthenticate } from "../middlewares/auth.js";

const router=express.Router();


router.post("/new",isAuthenticate, newtask);
router.get("/my",isAuthenticate, mytask);
router.route("/:id").put(isAuthenticate, updatetask).delete(isAuthenticate, deletetask);

export default router;