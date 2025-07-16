import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import createTaskRoutes from "./routes/taskRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

const initializeApp = (TaskModel) => {
  const app = express();
  app.disable("x-powered-by");

  // app.use(
  //   cors({
  //     origin: "http://localhost:5173",
  //   })
  // );

  app.use(cors());

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.get("/", (req, res) => {
    res.send("Hello, World!");
  });

  app.use("/api/tasks", createTaskRoutes(TaskModel));

  // Middlewares de errores
  app.use(notFound);
  app.use(errorHandler);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Servidor Express ejecutándose en http://localhost:${PORT}`);

    console.log(
      `Aplicación iniciada con acceso al modelo: ${
        TaskModel.name || "TaskModel"
      }`
    );
  });

  return app;
};

export default initializeApp;
