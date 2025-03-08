"use client";

import { ProcessSchedulerSimulator } from "@/lib/simulator";
import { Process, SimulatorConfig, SimulatorState } from "@/lib/types";
import { useEffect, useState } from "react";
import { SimulatorConfiguration } from "./simulator/configuration";
import { SimulatorProcessControl } from "./simulator/process-control";
import { Button } from "./ui/button";

export function SimulatorVisualizer() {
  const [simulator, setSimulator] = useState<ProcessSchedulerSimulator | null>(
    null
  );
  const [time, setTime] = useState(0);
  const [state, setState] = useState<SimulatorState>(SimulatorState.STOPPED);
  const [process, setProcess] = useState<Process | null>(null);
  const [processes, setProcesses] = useState<Process[]>([]);
  const [config, setConfig] = useState<SimulatorConfig | null>(null);

  useEffect(() => {
    const simulatorInstance = new ProcessSchedulerSimulator();
    setSimulator(simulatorInstance);
    setConfig(simulatorInstance.getConfig());

    simulatorInstance.subscribe(() => {
      setState(simulatorInstance.getCurrentState());
      setTime(simulatorInstance.getCurrentTime());
      setProcess(simulatorInstance.getCurrentProcess());
      setProcesses(simulatorInstance.getProcesses());
      setConfig(simulatorInstance.getConfig());
    });
  }, []);

  return (
    <section className="flex flex-col gap-4 w-full">
      <div className="container">
        {config && (
          <SimulatorConfiguration
            config={config}
            updateConfig={(newConfig: SimulatorConfig) =>
              simulator?.updateConfig(newConfig)
            }
          />
        )}
        <div className="flex flex-row gap-4">
          <Button
            disabled={state === SimulatorState.RUNNING}
            onClick={() =>
              state === SimulatorState.STOPPED
                ? simulator?.start()
                : simulator?.restart()
            }
          >
            {state === SimulatorState.STOPPED ? "Iniciar" : "Reanudar"}
          </Button>
          <Button
            disabled={state !== SimulatorState.RUNNING}
            onClick={() => simulator?.pause()}
          >
            Pausar
          </Button>
          <Button
            disabled={state !== SimulatorState.PAUSED}
            onClick={() => simulator?.reset()}
          >
            Reiniciar
          </Button>
        </div>
        <div className="flex flex-row gap-4">
          <h1>State: {state}</h1>
          <h1>Time: {time}</h1>
          <h1>Process: {process?.id || "N/A"}</h1>
        </div>

        <SimulatorProcessControl processes={processes} />
      </div>
    </section>
  );
}
