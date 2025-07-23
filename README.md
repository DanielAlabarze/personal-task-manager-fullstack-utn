# Gestor de Tareas Personal Full Stack UTN

Este proyecto es un Gestor de Tareas Personal Full Stack diseñado para ayudarte a organizar y mantener un seguimiento eficiente de tus actividades. Permite la creación, búsqueda y visualización de tareas con una interfaz intuitiva y funcionalidades robustas.

## Características Principales
Creación de Tareas: Un formulario dedicado para añadir nuevas tareas con los siguientes campos:

Nombre de la Tarea: Título descriptivo de la actividad.

Descripción (Opcional): Detalles adicionales sobre la tarea.

Fecha de Vencimiento (Opcional): Fecha límite para completar la tarea.

Lista de Tareas Creadas: Con botón para editar total o parcialmente una tarea, y botón para eliminar una tarea.

Buscador de Tareas: Funcionalidad para encontrar tareas específicas de manera rápida y sencilla, por nombre de tarea o descripción.

Calendario y Agenda: Visualiza tus tareas por fecha asignada, permitiéndote tener una vista clara de tus tareas y compromisos. Puedes clickear en el círculo del calendario o en la agenda para consultar las tareas.

## Tecnologías Utilizadas
#### Este proyecto utiliza una pila de tecnologías modernas para su desarrollo:

### Backend:
Node.js: Entorno de ejecución de JavaScript del lado del servidor, ideal para construir aplicaciones de red escalables.

Express.js: Framework web minimalista y flexible para Node.js, utilizado para construir la API REST. Configurado con type: module para soporte de módulos ES.

MongoDB: Base de datos NoSQL orientada a documentos para el almacenamiento flexible de la información de las tareas.

CORS (Cross-Origin Resource Sharing): Un mecanismo para permitir o restringir los recursos de un servidor web para que sean solicitados por otro dominio fuera del dominio desde el cual se sirvió el primer recurso. Es esencial para que el frontend (que corre en un dominio diferente) pueda comunicarse con el backend.

Dotenv: Una biblioteca que carga variables de entorno desde un archivo .env en process.env, manteniendo la configuración sensible fuera del control de versiones.

Mongoose: Una biblioteca de modelado de objetos de MongoDB para Node.js, que proporciona una solución basada en esquemas para modelar los datos de tu aplicación.

### Frontend:
React: Biblioteca de JavaScript declarativa, eficiente y flexible para construir interfaces de usuario interactivas.

Moment.js: Biblioteca para analizar, validar, manipular y formatear fechas en JavaScript (utilizada para la gestión de fechas).

Axios: Cliente HTTP basado en promesas para el navegador y Node.js, utilizado para realizar solicitudes a la API del backend.

Prop-types: Biblioteca para la verificación de tipos en las props de React, ayudando a asegurar que los componentes reciban datos del tipo correcto.

React-big-calendar: Un componente de calendario altamente personalizable para React, utilizado para visualizar las tareas en el calendario.

React-dom: Proporciona los métodos específicos del DOM que se usan para renderizar React en el navegador.

React-icons: Un conjunto de iconos populares de bibliotecas como Font Awesome, Material Design, etc., como componentes de React.

React-router-dom: Colección de componentes de navegación para React que permiten el enrutamiento declarativo en aplicaciones web.

#### Documentación y Pruebas (Swagger):
### Swagger:
Herramienta para la documentación automática de la API REST. Genera una interfaz de usuario interactiva que permite a los desarrolladores y consumidores de la API entender y probar los endpoints fácilmente.

## Estructura del Proyecto
### El proyecto está dividido en tres componentes principales:

backend: Contiene el código fuente de la API REST construida con Node.js y Express. Aquí se manejan la lógica de negocio, la interacción con la base de datos y la definición de los endpoints.

frontend: Contiene el código fuente de la interfaz de usuario desarrollada con React. Se encarga de la presentación de los datos y la interacción con el usuario.

swagger: Contiene la configuración y los archivos necesarios para la documentación de la API utilizando Swagger UI.