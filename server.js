require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { connectDB } = require("./app/config/db");
const Task = require("./app/models/tasks");

const server = express();

server.use(express.json());
server.use(express.static("public"));
server.use(cors());

connectDB();

server.get("/" , (req, res) => {
    console.log("Name, MongoDb");
    res.send("Hello, World!");
    
});

server.get("/tasks", async (req, res) => {
    const tasks = await Task.find();
    res.status(200).json({
        success: true,
        tasks
    });
});

server.post("/tasks", async (req, res) => {
    const tasks = await Task.create(req.body);
    res.status(201).json({
        success: true,
        tasks
    });
});

server.put("/tasks/:id", async (req, res) =>{
    try {
        const tasks = await Task.findByIdAndUpdate(req.params.id, req.body,
            {
                returnDocument: "after",
            }
    );

    if (!tasks) {
    return res.status(404).json({
        message: "Task not found",
    });
    }

    res.json({
        message: "Task updated successfully",
        tasks,
    });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

server.delete("/tasks/:id", async (req, res) => {
    try {
        const tasks = await Task.findByIdAndDelete(req.params.id);

        if(!tasks){
            return res.status(404).json({
                success: false,
                message: "Task not founded"
            })
        }

        res.status(200).json({
            success: true,
            message: "Deleted Successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});