import { useState } from "react";
import { Calendar } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import PropTypes from "prop-types";

import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("es");

import { momentLocalizer } from "react-big-calendar";
const localizer = momentLocalizer(moment);

import { useTasks } from "../context/TaskContext";
import { Loader } from "../components/Loader";
import TaskDetailModal from "../components/TaskDetailModal.jsx";

import "./CalendarView.css";

const getSpanishMonthName = (date) => {
  const monthIndex = moment(date).month();
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  return months[monthIndex];
};

const messages_es = {
  allDay: "",
  previous: "Anterior",
  next: "Siguiente",
  today: "Hoy",
  month: "Mes",
  week: "Semana",
  day: "Día",
  agenda: "Agenda",

  date: "Fecha",
  time: "Hora",
  event: "Tarea",

  noEventsInRange: "No hay tareas en este rango.",
  showMore: (total) => `+ ${total} más`,

  "toolbar.label": (date, culture, local) => {
    const monthName = getSpanishMonthName(date);
    const year = local.format(date, "YYYY", culture);
    return `${monthName} ${year}`;
  },
};

const getSpanishDayName = (date) => {
  const dayOfWeek = moment(date).day();
  const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  return days[dayOfWeek];
};

const CustomAgendaEvent = ({ event }) => {
  let cleanedTitle = event.title;

  const allDayAndNoiseRegex = new RegExp(
    `[\\s\\S]*?(?:Todo el día|allDay|All Day|Todo el dia)[\\s\\S]*?`,
    "gi"
  );
  cleanedTitle = cleanedTitle.replace(allDayAndNoiseRegex, "").trim();

  const aggressiveCleanerRegex = /[^a-zA-Z0-9\s.,;!?()[\]{}'/\\-]+/g;
  cleanedTitle = cleanedTitle.replace(aggressiveCleanerRegex, "").trim();

  cleanedTitle = cleanedTitle.replace(/\s+/g, " ").trim();

  if (cleanedTitle === "") {
    cleanedTitle = "[Título de Tarea Vacío]";
  }

  return <span>{cleanedTitle}</span>;
};

CustomAgendaEvent.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
};

const CustomDateCellWrapper = ({ children, value, events, onSelectTask }) => {
  const eventsForThisDay = events.filter((event) =>
    moment(event.start).isSame(value, "day")
  );

  const count = eventsForThisDay.length;

  const handleCircleClick = () => {
    if (count > 0 && onSelectTask) {
      onSelectTask(eventsForThisDay.map((event) => event.resource));
    }
  };

  return (
    <div className="rbc-day-bg-wrapper">
      {children}
      {count > 0 && (
        <div className="task-count-circle-container">
          <div
            className="task-count-circle"
            title={`${count} tareas`}
            onClick={handleCircleClick}
          >
            {count}
          </div>
        </div>
      )}
    </div>
  );
};

CustomDateCellWrapper.propTypes = {
  children: PropTypes.node,
  value: PropTypes.instanceOf(Date).isRequired,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.instanceOf(Date),
      resource: PropTypes.object,
    })
  ).isRequired,
  onSelectTask: PropTypes.func,
};

const CalendarView = () => {
  const { tasks, loading, error } = useTasks();

  const [isDetailModalOpen, setIsDetailModal] = useState(false);

  const [selectedTask, setSelectedTask] = useState(null);

  const events = tasks
    .filter((task) => task.dueDate)
    .map((task) => {
      const datePart = task.dueDate.split("T")[0];
      const eventDate = moment(datePart).toDate();

      return {
        id: task._id || task.id,
        title: task.title,
        start: eventDate,
        end: eventDate,
        allDay: true,
        resource: task,
      };
    });

  const handleSelectEvent = (event) => {
    if (event.resource) {
      setSelectedTask(event.resource);
      setIsDetailModal(true);
    }
  };

  const handleCloseDetailModal = () => {
    setIsDetailModal(false);
    setSelectedTask(null);
  };

  if (loading) {
    return (
      <div className="calendar-loading">
        <Loader />
        <p>Cargando calendario...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        Error al cargar tareas para el calendario: {error}
      </div>
    );
  }

  return (
    <div className="calendar-view-container">
      <h1>Tareas en el Calendario</h1>
      {events.length === 0 ? (
        <p className="no-tasks-calendar">
          No hay tareas con fecha de vencimiento para mostrar en el calendario.
        </p>
      ) : (
        <div className="calendar-wrapper">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            titleAccessor="title"
            onSelectEvent={handleSelectEvent}
            style={{ height: "70vh" }}
            views={["month", "agenda"]}
            defaultView="month"
            showMultiDayTimes={false}
            messages={messages_es}
            formats={{
              monthHeaderFormat: (date, culture, local) => {
                const monthName = getSpanishMonthName(date);
                const year = local.format(date, "YYYY", culture);
                return `${monthName} ${year}`;
              },

              weekdayFormat: (date) => getSpanishDayName(date),

              dayFormat: "D",

              agendaDateFormat: (date, culture, local) => {
                const dayName = getSpanishDayName(date);
                const dayOfMonth = local.format(date, "D", culture);
                const monthName = getSpanishMonthName(date);
                const year = local.format(date, "YYYY", culture);
                return `${dayName}, ${dayOfMonth} de ${monthName} de ${year}`;
              },

              dayRangeHeaderFormat: "L",

              agendaHeaderFormat: ({ start, end }, culture, local) =>
                local.format(start, "DD/MM/YYYY", culture) +
                " - " +
                local.format(end, "DD/MM/YYYY", culture),

              dayHeaderFormat: (date, culture, local) => {
                const dayName = getSpanishDayName(date);
                const formattedDate = local.format(date, "L", culture);
                return `${dayName}, ${formattedDate}`;
              },
            }}
            components={{
              month: {
                dateCellWrapper: (props) => (
                  <CustomDateCellWrapper
                    {...props}
                    events={events}
                    onSelectTask={(tasksOrTask) => {
                      setSelectedTask(tasksOrTask);
                      setIsDetailModal(true);
                    }}
                  />
                ),
              },
              agenda: {
                event: CustomAgendaEvent,
              },
            }}
          />
        </div>
      )}

      <TaskDetailModal
        task={selectedTask}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
      />
    </div>
  );
};

export default CalendarView;
