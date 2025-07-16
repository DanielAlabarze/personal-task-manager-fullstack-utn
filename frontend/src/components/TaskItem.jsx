import { FaPencil } from "react-icons/fa6";
import { MdOutlineDelete } from "react-icons/md";

import PropTypes from "prop-types";

const formatDisplayDate = (dateStr) => {
  if (!dateStr) return "No especificada";

  try {
    const datePart = dateStr.split("T")[0];
    const [year, month, day] = datePart.split("-").map(Number);

    const date = new Date(Date.UTC(year, month - 1, day));

    return date.toLocaleDateString("es-AR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  } catch (e) {
    console.error("Error al formatear fecha:", dateStr, e);
    return dateStr;
  }
};

function TaskItem({ task, onEdit, onDelete, onToggleComplete }) {
  const handleEditClick = () => {
    onEdit(task);
  };

  const handleDeleteClick = () => {
    onDelete(task._id || task.id);
  };

  const handleToggle = () => {
    onToggleComplete(task._id || task.id, !task.completed);
  };

  const displayedDueDate = formatDisplayDate(task.dueDate);

  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-details">
        <h3>{task.title}</h3>
        {task.description && <p>{task.description}</p>}
        {task.dueDate && (
          <span className="due-date">Vence: {displayedDueDate}</span>
        )}
      </div>
      <div className="task-actions">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          title={
            task.completed
              ? "Desmarcar como completada"
              : "Marcar como completada"
          }
        />
        <button onClick={handleEditClick} className="edit-button">
          <FaPencil />
          Editar
        </button>
        <button onClick={handleDeleteClick} className="delete-button">
          <MdOutlineDelete />
          Eliminar
        </button>
      </div>
    </li>
  );
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    completed: PropTypes.bool,
    dueDate: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
};

export default TaskItem;
