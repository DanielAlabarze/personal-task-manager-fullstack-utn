import axios from "axios";

// Uso variable de entorno
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const taskService = {
  getTasks: async () => {
    const response = await axios.get(`${API_BASE_URL}/tasks`);
    return response.data;
  },

  createTask: async (taskData) => {
    const response = await axios.post(`${API_BASE_URL}/tasks`, taskData);
    return response.data;
  },

  updateTask: async (id, taskData) => {
    const response = await axios.put(`${API_BASE_URL}/tasks/${id}`, taskData);
    return response.data;
  },

  patchTask: async (id, taskData) => {
    const response = await axios.patch(`${API_BASE_URL}/tasks/${id}`, taskData);
    return response.data;
  },

  deleteTask: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/tasks/${id}`);
    return response.data;
  },
};

export default taskService;
