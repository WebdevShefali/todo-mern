const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
//Route 1: Fetch all tasks using GET, "/api/todos/fetchalltasks". Login required
router.get("/fetchalltasks", fetchuser, async (req, res) => {
  try {
    const tasks = await Todo.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error.");
  }
});
//Route 2: Add new task using POST, "/api/todos/addnewtask". Login required
router.post(
  "/addnewtask",
  fetchuser,
  [
    body("task", "Task cannot be blank.").exists(),
    body("tag", "Tag cannot be blank.").exists(),
  ],
  async (req, res) => {
    try {
      //Get entered task and tag
      const { task, tag } = req.body;
      //Create a new task
      const newTask = new Todo({
        task,
        tag,
        user: req.user.id,
      });
      const saveTask = await newTask.save();
      res.json(saveTask);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error.");
    }
  }
);
//Route:3 Update task using PUT "/api/todos/updatetask". login required.
router.put("/updatetask/:id", fetchuser, async (req, res) => {
  try {
    const { task, tag } = req.body;
    //create a new task
    const newTask = {};
    if (task) {
      newTask.task = task;
    }
    if (tag) {
      newTask.tag = tag;
    }
    //find the task to be updated and update it
    let todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).send("Not Found");
    }
    //Allow updation only if user owns this task
    if (todo.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: newTask },
      { new: true }
    );
    res.json({ todo });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error.");
  }
});
//Route:4 Delete task using DELETE "/api/todos/deletetask". login required.
router.delete("/deletetask/:id", fetchuser, async (req, res) => {
  try {
    //find the task to be deleted and delete it
    let task = await Todo.findById(req.params.id);
    if (!task) {
      return res.status(404).send("Not Found");
    }
    //Allow deletion only if user owns this task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    task = await Todo.findByIdAndDelete(req.params.id);
    res.json({ success: "Note has been deleted." });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error.");
  }
});
module.exports = router;
