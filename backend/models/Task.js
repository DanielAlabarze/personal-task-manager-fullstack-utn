import mongoose from "mongoose";
import dotenv from "dotenv";
import taskSchema from "../schemas/taskSchema.js";

dotenv.config();
const connectionMongoDB = process.env.MONGO_URI;

mongoose
  .connect(connectionMongoDB)
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((err) => {
    console.error("Error al conectar a MongoDB:", err);
    process.exit(1);
  });

/*****************/

process.on("SIGINT", async () => {
  await mongoose.disconnect();

  console.log("Conexión a MongoDB cerrada");
  process.exit(0);
});

/****************/

const Task = mongoose.model("Task", taskSchema);

class TaskModelMongoDB {
  static async getTasks() {
    return await Task.find({});
  }

  static async getTaskById(id) {
    return await Task.findById(id);
  }

  static async createTask(data) {
    const newTask = new Task(data);
    return await newTask.save();
  }

  static async updateTask(id, data) {
    return await Task.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  static async deleteTask(id) {
    const response = await Task.findById(id);
    if (response) {
      await Task.deleteOne({ _id: id });
    }
    return response;
  }
}

export { TaskModelMongoDB };
