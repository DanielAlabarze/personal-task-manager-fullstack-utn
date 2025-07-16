import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import taskService from "../services/taskService";
import { Loader } from "../components/Loader";
const TaskContext = createContext();

export const useTasks = () => {
  return useContext(TaskContext);
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatErrorMessage = useCallback((err) => {
    if (err.response && err.response.data) {
      if (
        err.response.data.errors &&
        Array.isArray(err.response.data.errors) &&
        err.response.data.errors.length > 0
      ) {
        return `Errores de validación: ${err.response.data.errors.join(", ")}`;
      }

      return err.response.data.message || "Error desconocido del servidor.";
    }

    return err.message || "Ocurrió un error inesperado.";
  }, []);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (err) {
      console.error("Error al cargar tareas:", err);

      setError(formatErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [formatErrorMessage]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = useCallback(async (taskData) => {
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks((prevTasks) => [...prevTasks, newTask]);
      return newTask;
    } catch (err) {
      throw err;
    }
  }, []);

  const updateTask = useCallback(async (id, taskData) => {
    try {
      const updatedTask = await taskService.updateTask(id, taskData);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          (task._id || task.id) === id ? updatedTask : task
        )
      );
      return updatedTask;
    } catch (err) {
      throw err;
    }
  }, []);

  const deleteTask = useCallback(
    async (id) => {
      try {
        await taskService.deleteTask(id);
        setTasks((prevTasks) =>
          prevTasks.filter((task) => (task._id || task.id) !== id)
        );
      } catch (err) {
        setError(formatErrorMessage(err));
        throw err;
      }
    },
    [formatErrorMessage]
  );

  const toggleTaskComplete = useCallback(
    async (id, completed) => {
      try {
        const updatedTask = await taskService.patchTask(id, { completed });
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            (task._id || task.id) === id ? updatedTask : task
          )
        );
        return updatedTask;
      } catch (err) {
        setError(formatErrorMessage(err));
        throw err;
      }
    },
    [formatErrorMessage]
  );

  const contextValue = {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    formatErrorMessage,
  };

  return (
    <TaskContext.Provider value={contextValue}>
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <Loader />
        </div>
      )}

      {error && !loading && (
        <div
          className="error-message"
          style={{
            position: "fixed",
            top: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10000,
          }}
        >
          {error}
        </div>
      )}

      {!loading && children}
    </TaskContext.Provider>
  );
};
