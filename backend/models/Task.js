const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    userId: {
        type: String,
        required: [true, "User ID is required"]
    },
    status: {
        type: String,
        default: "incomplete"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Task = mongoose.model("tasks", TaskSchema);