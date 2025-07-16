import initializeApp from "../server.js";
import { TaskModelMongoDB } from "../models/Task.js";

initializeApp(TaskModelMongoDB);

console.log("Aplicación iniciada a través de startpoints/mongodb.js");
