import errorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

// jekhane async await use hoi sekhane try catch use korte hoi......tahole error dileo app crash hobe na

//-------------------------------------------------------------------------------------------------------------------------------------------------
// add task
export const newtask = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        await Task.create({
            title,
            description,
            user: req.user // jehetu ai routes er handler a isAuthenticate use korechi tai req.user a akhane user details pabo.....
        });
        res.status(201).json({
            success: true,
            message: "Task Added Successfully"
        })
    } catch (error) {
        next(error);
    }
}

//-------------------------------------------------------------------------------------------------------------------------------------------------
// show my all task
export const mytask = async (req, res, next) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        if (!tasks) return next(new errorHandler("No task found", 404));
        res.status(200).json({
            success: true,
            tasks
        })
    } catch (error) {
        next(error);
    }
}

//-------------------------------------------------------------------------------------------------------------------------------------------------
// update task
export const updatetask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id); // task variable er modhe database theke task a ane store korlam.....
        if (!task) return next(new errorHandler("Task not found", 404));
        task.isCompleted = !task.isCompleted; // abar task. use kore database er task er sob field access o modify korte parbo....akhne isCompleted false chilo seta update kore true korlam......ami task.title and task.description o change korte parbo avabe......
        await task.save(); // task.save use kore je je change korlam segulo save korlam.....mane update hoye galo....db method tai await lagalum...
        res.status(200).json({
            success: true,
            message: "Task Updated...."
        })
    } catch (error) {
        next(error);
    }
}

//------------------------------------------------------------------------------------------------------------------------------------------------
// delete task
export const deletetask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id); // task variable er modhe database theke task a ane store korlam.....
        if (!task) return next(new errorHandler("Task not found", 404)); // next() call kore error pass kore error middle ware use korlam....
        task.deleteOne() // db er delete method use kore delete korlam.....db method tai await lagalum..
        res.status(200).json({
            success: true,
            message: "Task Deleted....."
        })
    } catch (error) {
        next(error);
    }
}
