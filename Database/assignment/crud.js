const express = require("express");//Creates the new app instance
const mongoose = require("mongoose");

const app = express();//And the instance is stored inside the variable app
//Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/Shreshtidb")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Mongo Error", err));

// MVC Structure: Model
//Create Schema
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
    },
    status: {
      type: String,
      enum: ["Active", "Ongoing", "Completed"],
    },
    dueDate: {
      type: Date,
    },
  },
  { timestamps: true },
);
// Create Model
const Task = mongoose.model("task", taskSchema);

// MVC Structure: Middleware
// Middleware for form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MVC Structure: Controller
// View Data (HTML)
app.get("/task", async (req, res) => {
  const allDbTasks = await Task.find({});
  const html = `
    <ul>
    ${allDbTasks.map((task) => `<li>${task.title} - ${task.status}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});

// Get JSON
app.get("/task/api", async (req, res) => {
  const allDbTasks = await Task.find({});
  res.json(allDbTasks);
});

// Create Task
app.post("/task", async (req, res) => {
  console.log(req.body);
  const body = req.body;

  if (!body || !body.title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const result = await Task.create({
    title: body.title,
    description: body.description,
    priority: body.priority,
    status: body.status,
    dueDate: body.dueDate,
  });

  return res.status(201).json({
    message: "Task created successfully",
    task: result,
  });
});

// Update Task
app.patch("/task/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }   // returns updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });

  } catch (error) {
    return res.status(400).json({ message: "Invalid ID" });
  }
});

// Delete Task
app.delete("/task/:id", async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.json({ message: "Task deleted successfully" });
});

// MVC Structure: Server
app.listen(3000, () => {
  console.log("Server Started");
});