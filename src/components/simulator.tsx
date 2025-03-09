"use client";

import { ProcessSchedulerSimulator } from "@/lib/simulator";
import { Process, SimulatorConfig, SimulatorState } from "@/lib/types";
import { useEffect, useState } from "react";
import { SimulatorConfiguration } from "./simulator/configuration";
import { SimulatorProcessControl } from "./simulator/process-control";
import { SimulatorProcessor } from "./simulator/processor";

export function SimulatorVisualizer() {
  const [simulator, setSimulator] = useState<ProcessSchedulerSimulator | null>(
    null
  );
  const [tick, setTick] = useState(0);
  const [state, setState] = useState<SimulatorState>(SimulatorState.STOPPED);
  const [currentProcess, setCurrentProcess] = useState<Process | null>(null);
  const [processes, setProcesses] = useState<Process[]>([]);
  const [config, setConfig] = useState<SimulatorConfig | null>(null);

  useEffect(() => {
    const simulatorInstance = new ProcessSchedulerSimulator();
    setSimulator(simulatorInstance);
    setConfig(simulatorInstance.getConfig());

    simulatorInstance.subscribe(() => {
      setState(simulatorInstance.getCurrentState());
      setTick(simulatorInstance.getCurrentTick());
      setCurrentProcess(simulatorInstance.getCurrentProcess());
      setProcesses(simulatorInstance.getProcesses());
      setConfig(simulatorInstance.getConfig());
    });
  }, []);

  return (
    <section className="flex flex-col gap-4 w-full min-h-screen py-10">
      <div className="container">
        <div className="grid grid-cols-[280px_1fr] gap-4">
          <div className="flex flex-col gap-4">
            <SimulatorProcessor
              state={state}
              tick={tick}
              tickSpeed={config?.processor.tickSpeed ?? 0}
              start={() => simulator?.start()}
              pause={() => simulator?.pause()}
              reset={() => simulator?.reset()}
              restart={() => simulator?.restart()}
              currentProcess={currentProcess}
            />
            {config && (
              <SimulatorConfiguration
                config={config}
                updateConfig={(newConfig: SimulatorConfig) =>
                  simulator?.updateConfig(newConfig)
                }
              />
            )}
          </div>
          <div className="flex flex-col gap-4">
            <SimulatorProcessControl processes={processes} />
          </div>
        </div>
      </div>
    </section>
  );
}
