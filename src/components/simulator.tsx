"use client";

import { ProcessSchedulerSimulator } from "@/lib/simulator";
import { Process, SimulatorState } from "@/lib/types";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export function ProcessSchedulerSimulatorVisualizer() {
  const [simulator, setSimulator] = useState<ProcessSchedulerSimulator | null>(
    null
  );
  const [currentTime, setCurrentTime] = useState(0);
  const [currentState, setCurrentState] = useState<SimulatorState>(
    SimulatorState.STOPPED
  );
  const [currentProcess, setCurrentProcess] = useState<Process | null>(null);
  const [processes, setProcesses] = useState<Process[]>([]);

  useEffect(() => {
    const simulatorInstance = new ProcessSchedulerSimulator();
    setSimulator(simulatorInstance);

    simulatorInstance.subscribe(() => {
      setCurrentState(simulatorInstance.getCurrentState());
      setCurrentTime(simulatorInstance.getCurrentTime());
    });
  }, []);

  const handleStart = () => {
    simulator?.start();
  };
  return (
    <section className="flex flex-col gap-4">
      {/* <ProcessSchedulerConfiguration
        simulatorConfig={simulatorConfig}
        setSimulatorConfig={setSimulatorConfig}
      /> */}
      Agregamos el control de inicio, pausa y reset del simulador
      <div className="flex flex-row gap-4">
        <Button
          disabled={currentState === SimulatorState.RUNNING}
          onClick={() =>
            currentState === SimulatorState.STOPPED
              ? simulator?.start()
              : simulator?.restart()
          }
        >
          {currentState === SimulatorState.STOPPED ? "Iniciar" : "Reanudar"}
        </Button>
        <Button
          disabled={currentState !== SimulatorState.RUNNING}
          onClick={() => simulator?.pause()}
        >
          Pausar
        </Button>
        <Button
          disabled={currentState !== SimulatorState.PAUSED}
          onClick={() => simulator?.reset()}
        >
          Reiniciar
        </Button>
      </div>
      <div className="flex flex-row gap-4">
        <h1>Current State: {currentState}</h1>
        <h1>Current Time: {currentTime}</h1>
        <h1>Current Process: {currentProcess?.id || "N/A"}</h1>
        <h1>Processes: {processes.map((process) => process.id).join(", ")}</h1>
      </div>
      <div className="flex flex-row gap-4">
        <h1>Processes: </h1>
        {processes.length > 0 ? (
          processes.map((process) => (
            <div key={process.id}>
              <p>{process.id}</p>
              <p>{process.state}</p>
            </div>
          ))
        ) : (
          <p>Process not found</p>
        )}
      </div>
    </section>
  );
}
