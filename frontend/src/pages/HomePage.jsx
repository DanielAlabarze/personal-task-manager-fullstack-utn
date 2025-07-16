import { useState, useCallback } from "react";
import TaskForm from "../components/TaskForm.jsx";
import TaskList from "../components/TaskList.jsx";
import Modal from "../components/Modal.jsx";
import { useTasks } from "../context/TaskContext";
import { Loader } from "../components/Loader.jsx";
import { Fecha } from "../components/Date.jsx";

import imgGestor from "../assets/imgGestor.png";
import "./HomePage.css";

function HomePage() {
  const {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    formatErrorMessage,
  } = useTasks();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formError, setFormError] = useState(null);
  const handleCreateTask = useCallback(
    async (taskData) => {
      setFormError(null);
      try {
        await createTask(taskData);
      } catch (err) {
        setFormError(formatErrorMessage(err));
      }
    },
    [createTask, formatErrorMessage]
  );

  const handleUpdateTask = useCallback(
    async (taskToUpdateId, taskData) => {
      setFormError(null);
      try {
        await updateTask(taskToUpdateId, taskData);
        setIsModalOpen(false);
        setEditingTask(null);
      } catch (err) {
        setFormError(formatErrorMessage(err));
      }
    },
    [updateTask, setIsModalOpen, setEditingTask, formatErrorMessage]
  );

  const handleDeleteTask = useCallback(
    async (id) => {
      try {
        await deleteTask(id);
      } catch (err) {
        console.error("Error al eliminar tarea:", err);
      }
    },
    [deleteTask]
  );

  const handleToggleComplete = useCallback(
    async (id, completed) => {
      try {
        await toggleTaskComplete(id, completed);
      } catch (err) {
        console.error("Error al cambiar estado de tarea:", err);
      }
    },
    [toggleTaskComplete]
  );

  const openEditModal = useCallback(
    (task) => {
      setEditingTask(task);
      setIsModalOpen(true);
      setFormError(null);
    },
    [setEditingTask, setIsModalOpen]
  );

  const closeEditModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingTask(null);
    setFormError(null);
  }, [setIsModalOpen, setEditingTask]);

  return (
    <div className="home-page-container">
      <Fecha />

      <img
        src={imgGestor}
        alt="logo Gestor de tareas"
        className="img-GestorTareas"
      />

      <h1>Gestor de Tareas</h1>

      <div className="task-form-section">
        <h2>Crear Nueva Tarea</h2>
        <TaskForm onSubmit={handleCreateTask} />
        {formError && <div className="error-message">{formError}</div>}
      </div>

      <div className="task-list-section">
        <h2>Mis Tareas</h2>
        {loading ? (
          <>
            <p>Cargando tareas...</p>
            <Loader />
          </>
        ) : (
          <TaskList
            tasks={tasks}
            onEditTask={openEditModal}
            onDeleteTask={handleDeleteTask}
            onToggleComplete={handleToggleComplete}
          />
        )}
        {tasks.length === 0 && !loading && !error && (
          <p className="no-tasks-message">
            ¡No tienes tareas aún! Agrega una para empezar.
          </p>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeEditModal}>
        <h2>Editar Tarea</h2>
        {editingTask && (
          <TaskForm
            key={editingTask._id || editingTask.id}
            initialData={editingTask}
            isEditing={true}
            onSubmit={(updatedData) =>
              handleUpdateTask(editingTask._id || editingTask.id, updatedData)
            }
          />
        )}

        {formError && <div className="error-message">{formError}</div>}
      </Modal>
    </div>
  );
}

export default HomePage;
