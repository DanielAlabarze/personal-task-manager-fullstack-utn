export function Response({ responseData }) {
  return (
    <div className="response-container">
      <h4 className="response-H4">Respuesta de la API:</h4>
      {responseData ? (
        <pre className="api-response-code">{responseData}</pre>
      ) : (
        <p className="response no-response-message">
          Ejecuta un endpoint para ver la respuesta aquí.
        </p>
      )}
    </div>
  );
}
