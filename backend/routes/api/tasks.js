const express = require("express");
const router = express.Router();
const Task = require("../../models/Task");

// Load input validation
const validateTaskInput = require("../../validation/task");

// add task
router.post("/add", (req, res) => {
    const { errors, isValid } = validateTaskInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newTask = new Task({
        title: req.body.title,
        description: req.body.description,
        userId: req.body.userId,
        status: req.body.status || "incomplete",
    });

    newTask
        .save()
        .then((task) => res.json(task))
        .catch((err) => console.log(err));
});

// retrieve tasks
router.get("/all", (req, res) => {
    Task.find()
        .then((tasks) => {
            return res.json(tasks);
        })
        .catch((err) => {
            console.error("Error fetching tasks:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        });
});


// update task
router.put("/update/:id", (req, res) => {
    Task.findOneAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status || "incomplete",
            },
        },
        { new: true }
    )
        .then((task) => res.json(task))
        .catch((err) => console.log(err));
});

module.exports = router;
