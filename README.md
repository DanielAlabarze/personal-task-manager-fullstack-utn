# Gestor de Tareas Personal Full Stack UTN
Este proyecto es un Gestor de Tareas Personal Full Stack diseñado para ayudarte a organizar y mantener un seguimiento eficiente de tus actividades. Permite la creación, búsqueda y visualización de tareas con una interfaz intuitiva y funcionalidades robustas.

## Características Principales
Creación de Tareas: Un formulario dedicado para añadir nuevas tareas con los siguientes campos:

Nombre de la Tarea: Título descriptivo de la actividad.

Descripción (Opcional): Detalles adicionales sobre la tarea. 

Fecha de Vencimiento (Opcional): Fecha límite para completar la tarea.

Lista de Tareas Creadas: Con boton para editar total o parcialmente una tarea, y boton para eliminar una tarea.

Buscador de Tareas: Funcionalidad para encontrar tareas específicas de manera rápida y sencilla, Por nombre de tarea o decripcion.

Calendario y Agenda: Visualiza tus tareas por fecha asignada, permitiéndote tener una vista clara de tu programación y compromisos.
Puedes Clickear en circulo del calendario o en la agenda para consultar las tareas 

## Tecnologías Utilizadas
Este proyecto utiliza una pila de tecnologías modernas para su desarrollo:

### Backend:

Node.js: Entorno de ejecución de JavaScript del lado del servidor. 

Express.js: Framework web minimalista y flexible para Node.js, utilizado para construir la API REST. type module

MongoDB: Base de datos NoSQL orientada a documentos para el almacenamiento de la información de las tareas.

   cors

   dotenv

   mongoose

### Frontend:

React: Biblioteca de JavaScript para construir interfaces de usuario interactivas.

Moment.js: Biblioteca para analizar, validar, manipular y formatear fechas en JavaScript (utilizada para la gestión de fechas).

axios

prop-types

react-big-calendar

react-dom

react-icons

react-router-dom


### Swagger:
Herramienta para la documentación y prueba de la API.

React: Biblioteca de JavaScript para construir interfaces de usuario interactivas.

react-dom

react-resizable-panels


## Estructura del Proyecto
#### El proyecto está dividido en tres componentes principales:

backend : Contiene el código fuente de la API REST construida con Node.js y Express. Aquí se manejan la lógica de negocio, la interacción con la base de datos y la definición de los endpoints.

frontend : Contiene el código fuente de la interfaz de usuario desarrollada con React. Se encarga de la presentación de los datos y la interacción con el usuario.

swagger : Para la documentación de la API.