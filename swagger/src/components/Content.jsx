import { useEffect, useState, useCallback } from "react";
import taskPrefab from "../prefabs/Tareas.json";

export function Content({ endpoint, onApiResponse }) {
  const [pathParam, setPathParam] = useState("");

  const [requestBody, setRequestBody] = useState(
    JSON.stringify(taskPrefab, null, 2)
  );

  useEffect(() => {
    onApiResponse("");
    setPathParam("");

    if (endpoint.method === "POST") {
      setRequestBody(JSON.stringify(taskPrefab, null, 2));
    } else if (endpoint.method === "PUT") {
      const updateExample = {
        title: "Tarea actualizada (ejemplo)",
        completed: true,
      };
      setRequestBody(JSON.stringify(updateExample, null, 2));
    } else {
      setRequestBody("");
    }

    if (endpoint.method === "PUT" || endpoint.method === "DELETE") {
      setPathParam("60c72b2f9b1d8e001c8e4d3c");
    }
  }, [endpoint, onApiResponse]);

  const executeEndpoint = useCallback(async () => {
    let url = endpoint.endpoint;
    let options = {
      method: endpoint.method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (endpoint.method === "PUT" || endpoint.method === "DELETE") {
      if (!pathParam) {
        onApiResponse(
          JSON.stringify(
            { error: "ID de tarea es obligatorio para PUT/DELETE" },
            null,
            4
          )
        );
        return;
      }
      url = `${url}/${pathParam}`;
    }

    if (endpoint.method === "POST" || endpoint.method === "PUT") {
      try {
        options.body = requestBody;
      } catch (e) {
        console.error(
          "Error al convertir el cuerpo de la solicitud a JSON:",
          e
        );
        onApiResponse(
          JSON.stringify(
            { error: "El cuerpo de la solicitud no es un JSON válido." },
            null,
            4
          )
        );
        return;
      }
    }

    try {
      const data = await fetch(url, options);
      const result = await data.json();
      onApiResponse(JSON.stringify(result, null, 4));
    } catch (error) {
      console.error("Error al probar el endpoint:", error);
      onApiResponse(
        JSON.stringify(
          { error: `Error en la solicitud: ${error.message}` },
          null,
          4
        )
      );
    }
  }, [endpoint, pathParam, requestBody, onApiResponse]);

  const showPathParamInput =
    endpoint.method === "PUT" || endpoint.method === "DELETE";

  const showRequestBodyTextarea =
    endpoint.method === "POST" || endpoint.method === "PUT";

  return (
    <div className="endpoint-list endpoint-details">
      <h3>{endpoint.title}</h3>
      <span className="endpoint-url">
        {endpoint.endpoint}
        {showPathParamInput && `/{id}`}
        <small className={`chip ${endpoint.method.toLowerCase()}`}>
          {endpoint.method}
        </small>
      </span>
      <p className="endpoint-description">{endpoint.desc}</p>

      {showPathParamInput && (
        <input
          type="text"
          className="input input-field"
          placeholder="ID de la Tarea (para PUT/DELETE)"
          value={pathParam}
          onChange={(e) => setPathParam(e.target.value)}
        />
      )}

      {showRequestBodyTextarea && (
        <textarea
          rows="10"
          className="payload textarea-field"
          placeholder="Cuerpo de la Solicitud (JSON)"
          value={requestBody}
          onChange={(e) => setRequestBody(e.target.value)}
        ></textarea>
      )}

      <button onClick={executeEndpoint} className="button action-button">
        Probar Endpoint
      </button>
    </div>
  );
}
