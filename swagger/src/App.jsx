import { useState, useCallback } from "react";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { Tabs } from "./components/Tabs";
import { Content } from "./components/Content";
import { Response } from "./components/Response";
import endpointData from "./endpoint.json";
import "./style.css";

export default function App() {
  const [currentEndpoint, setCurrentEndpoint] = useState(endpointData[0]);
  const [apiResponse, setApiResponse] = useState("");

  const handleToggleEndpoint = useCallback((data) => {
    setCurrentEndpoint(data);
    setApiResponse("");
  }, []);

  const handleSetApiResponse = useCallback((data) => {
    setApiResponse(data);
  }, []);

  return (
    <section className="content app-container">
      <PanelGroup direction="horizontal">
        <Panel defaultSize={28} minSize={28} maxSize={32}>
          <Tabs
            endpoints={endpointData}
            onSelectEndpoint={handleToggleEndpoint}
          />
        </Panel>

        <PanelResizeHandle className="handle panel-handle" />

        <Panel defaultSize={42} minSize={30}>
          <Content
            endpoint={currentEndpoint}
            onApiResponse={handleSetApiResponse}
          />
        </Panel>

        <PanelResizeHandle className="handle panel-handle" />

        <Panel defaultSize={30} minSize={15}>
          <Response responseData={apiResponse} />
        </Panel>
      </PanelGroup>
    </section>
  );
}
