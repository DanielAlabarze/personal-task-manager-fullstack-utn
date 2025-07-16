import { useState } from "react";

function TaskForm({
  onSubmit,
  initialData = { title: "", description: "", completed: false, dueDate: "" },
  isEditing = false,
}) {
  const [title, setTitle] = useState(initialData.title);
  const [description, setDescription] = useState(initialData.description);
  const [completed, setCompleted] = useState(initialData.completed);
  const [dueDate, setDueDate] = useState(
    initialData.dueDate ? initialData.dueDate.substring(0, 10) : ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      completed,
      dueDate: dueDate || null,
    };

    onSubmit(taskData);

    if (!isEditing) {
      setTitle("");
      setDescription("");
      setCompleted(false);
      setDueDate("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Título:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título de la tarea"
          required
        />
      </div>
      <div>
        <label htmlFor="description">Descripción:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción (opcional)"
        ></textarea>
      </div>
      {(isEditing || !isEditing) && (
        <div>
          <label htmlFor="dueDate">Fecha de Vencimiento - Opcional:</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      )}
      {isEditing && (
        <div>
          <label htmlFor="completed">Completada:</label>
          <input
            type="checkbox"
            id="completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
        </div>
      )}
      <button type="submit">
        {isEditing ? "Actualizar Tarea" : "Agregar Tarea"}
      </button>
    </form>
  );
}

export default TaskForm;
