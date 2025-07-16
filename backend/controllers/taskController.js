const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const createTaskControllers = (TaskModel) => {
  const getTasks = asyncHandler(async (req, res) => {
    const tasks = await TaskModel.getTasks();
    res.status(200).json(tasks);
  });

  const getTaskById = asyncHandler(async (req, res) => {
    const task = await TaskModel.getTaskById(req.params.id);
    if (!task) {
      res.status(404);
      throw new Error("Tarea no encontrada");
    }
    res.status(200).json(task);
  });

  const createTask = asyncHandler(async (req, res) => {
    const { title, description, completed, dueDate } = req.body;
    const task = await TaskModel.createTask({
      title,
      description: description || "",
      completed: completed !== undefined ? completed : false,
      dueDate: dueDate ? new Date(dueDate) : undefined,
    });
    res.status(201).json(task);
  });

  const updateTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updatedTask = await TaskModel.updateTask(id, req.body);
    if (!updatedTask) {
      res.status(404);
      throw new Error("Tarea no encontrada");
    }
    res.status(200).json(updatedTask);
  });

  const deleteTask = asyncHandler(async (req, res) => {
    const taskToDelete = await TaskModel.deleteTask(req.params.id);
    if (!taskToDelete) {
      res.status(404);
      throw new Error("Tarea no encontrada");
    }
    res
      .status(200)
      .json({ message: "Tarea eliminada con éxito", id: req.params.id });
  });

  return {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
  };
};

export default createTaskControllers;
