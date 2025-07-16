import { useState, useEffect, useCallback } from "react";
import TaskList from "../components/TaskList.jsx";
import { Loader } from "../components/Loader.jsx";
import Modal from "../components/Modal.jsx";
import TaskForm from "../components/TaskForm.jsx";
import { useTasks } from "../context/TaskContext.jsx";
import "./SearchPage.css";

function SearchPage() {
  const {
    tasks: allTasks,
    loading: tasksLoading,
    error: tasksError,

    updateTask,
    deleteTask: deleteTaskFromContext,
    toggleTaskComplete: toggleTaskCompleteFromContext,
    formatErrorMessage,
  } = useTasks();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formError, setFormError] = useState(null);

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (
      tasksLoading ||
      tasksError ||
      !allTasks ||
      debouncedSearchTerm.trim() === ""
    ) {
      setFilteredTasks([]);
      return;
    }

    const lowercasedSearchTerm = debouncedSearchTerm.toLowerCase();

    const results = allTasks.filter((task) => {
      const titleMatches = task.title
        .toLowerCase()
        .includes(lowercasedSearchTerm);
      const descriptionMatches = task.description
        ?.toLowerCase()
        .includes(lowercasedSearchTerm);
      return titleMatches || descriptionMatches;
    });

    setFilteredTasks(results);
  }, [allTasks, debouncedSearchTerm, tasksLoading, tasksError]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const openEditModal = useCallback((task) => {
    setEditingTask(task);
    setIsModalOpen(true);
    setFormError(null);
  }, []);

  const closeEditModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingTask(null);
    setFormError(null);
  }, []);

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
    [updateTask, formatErrorMessage]
  );

  const handleDeleteTask = useCallback(
    async (id) => {
      try {
        await deleteTaskFromContext(id);
      } catch (err) {
        console.error("Error al eliminar tarea:", err);
      }
    },
    [deleteTaskFromContext]
  );

  const handleToggleComplete = useCallback(
    async (id, completed) => {
      try {
        await toggleTaskCompleteFromContext(id, completed);
      } catch (err) {
        console.error("Error al cambiar estado de tarea:", err);
      }
    },
    [toggleTaskCompleteFromContext]
  );

  return (
    <div className="search-page-container">
      <h1>Buscador de Tareas</h1>

      <div className="search-input-container">
        <input
          type="text"
          placeholder="Buscar tareas por título o descripción..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      {tasksLoading && <Loader />}
      {tasksError && <div className="error-message">{tasksError}</div>}

      {!tasksLoading && !tasksError && searchTerm.trim() === "" && (
        <p className="initial-search-message">
          Empieza a escribir para buscar tareas.
        </p>
      )}

      {!tasksLoading &&
        !tasksError &&
        searchTerm.trim() !== "" &&
        filteredTasks.length === 0 && (
          <p className="no-results-message">
            No se encontraron tareas con ese término.
          </p>
        )}

      {!tasksLoading && !tasksError && filteredTasks.length > 0 && (
        <div className="search-results-section">
          <h2>Resultados de Búsqueda ({filteredTasks.length})</h2>
          <TaskList
            tasks={filteredTasks}
            onEditTask={openEditModal}
            onDeleteTask={handleDeleteTask}
            onToggleComplete={handleToggleComplete}
          />
        </div>
      )}

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

export default SearchPage;
