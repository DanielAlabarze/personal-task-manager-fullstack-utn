import Router from "express";
import createTaskControllers from "../controllers/taskController.js";

const createTaskRoutes = (TaskModel) => {
  const router = Router();
  const { getTasks, getTaskById, createTask, updateTask, deleteTask } =
    createTaskControllers(TaskModel);

  router.route("/").get(getTasks);
  router.route("/").post(createTask);

  router.route("/:id").get(getTaskById);
  router.route("/:id").put(updateTask);
  router.route("/:id").patch(updateTask);
  router.route("/:id").delete(deleteTask);

  return router;
};

export default createTaskRoutes;
