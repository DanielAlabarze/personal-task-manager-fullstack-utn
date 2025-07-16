import { Link } from "react-router-dom";
function Error() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "75vh",
        padding: "1rem",
      }}
    >
      <h1
        style={{
          color: "yellow",
          backgroundColor: "red",
          fontSize: "3rem",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        Error 404 - Página No Encontrada
      </h1>
      <Link
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "8rem",
          borderRadius: "15px",
          padding: "0.5rem",
          textAlign: "center",
          color: "yellow",
          backgroundColor: "red",
          fontSize: "1rem",
        }}
        to="/"
      >
        Volver al Inicio
      </Link>
    </div>
  );
}
export default Error;
