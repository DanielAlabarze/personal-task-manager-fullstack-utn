import Modal from "./Modal.jsx";
import "./TaskDetailModal.css";
import PropTypes from "prop-types";

const TaskDetailModal = ({ task, isOpen, onClose }) => {
  const tasksToDisplay = Array.isArray(task) ? task : task ? [task] : [];

  if (tasksToDisplay.length === 0) {
    return null;
  }

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
      console.error("Error al formatear fecha en modal:", dateStr, e);
      return dateStr;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} showCloseButton={false}>
      <div className="task-detail-modal-content">
        <h2>
          {tasksToDisplay.length > 1
            ? "Tareas del Día"
            : "Detalles de la Tarea"}
        </h2>

        {tasksToDisplay.map((currentTask, index) => (
          <div
            key={currentTask._id || currentTask.id || index}
            className={tasksToDisplay.length > 1 ? "task-summary-item" : ""}
          >
            <div className="detail-item">
              <strong>Título:</strong> <span>{currentTask.title}</span>
            </div>
            <div className="detail-item">
              <strong>Descripción:</strong>
              <span>
                {currentTask.description
                  ? currentTask.description
                  : "Sin descripción"}
              </span>
            </div>
            <div className="detail-item">
              <strong>Fecha de Vencimiento:</strong>
              <span>{formatDisplayDate(currentTask.dueDate)}</span>
            </div>
            <div className="detail-item">
              <strong>Estado:</strong>
              <span className={currentTask.completed ? "completed" : "pending"}>
                {currentTask.completed ? "Completada" : "Pendiente"}
              </span>
            </div>

            {index < tasksToDisplay.length - 1 && (
              <hr className="task-separator" />
            )}
          </div>
        ))}

        <button onClick={onClose} className="close-detail-button">
          Cerrar
        </button>
      </div>
    </Modal>
  );
};

TaskDetailModal.propTypes = {
  task: PropTypes.oneOfType([
    PropTypes.shape({
      _id: PropTypes.string,
      id: PropTypes.string,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      dueDate: PropTypes.string,
      completed: PropTypes.bool,
    }),
    PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        id: PropTypes.string,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        dueDate: PropTypes.string,
        completed: PropTypes.bool,
      })
    ),
  ]),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TaskDetailModal;
