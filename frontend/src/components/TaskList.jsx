import PropTypes from "prop-types";
import TaskItem from "./TaskItem.jsx";
import "./TaskList.css";

function TaskList({ tasks, onEditTask, onDeleteTask, onToggleComplete }) {
  if (!tasks || tasks.length === 0) {
    return null;
  }

  //console.log("Tasks in TaskList:", tasks);

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id || task.id}
          task={task}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </ul>
  );
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEditTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
};

export default TaskList;
