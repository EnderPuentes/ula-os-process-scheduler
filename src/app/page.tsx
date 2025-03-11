"use client";

import { SimulatorConfiguration } from "@/components/simulator/configuration";
import { SimulatorCpu } from "@/components/simulator/cpu";
import { SimulatorMonitor } from "@/components/simulator/monitor";
import { SimulatorProcesses } from "@/components/simulator/processes";
import { ProcessSchedulerSimulator } from "@/lib/simulator";
import { Process, SimulatorConfig, SimulatorState } from "@/lib/types";
import { useEffect, useState } from "react";

export default function SimulatorHome() {
  const [simulator, setSimulator] = useState<ProcessSchedulerSimulator | null>(
    null
  );
  const [tick, setTick] = useState(0);
  const [cpuUsage, setCpuUsage] = useState(0);
  const [state, setState] = useState<SimulatorState>(SimulatorState.STOPPED);

  const [currentProcess, setCurrentProcess] = useState<Process | null>(null);
  const [processes, setProcesses] = useState<Process[]>([]);

  const [queueReadyProcesses, setQueueReadyProcesses] = useState<Process[]>([]);
  const [queueBlockedProcesses, setQueueBlockedProcesses] = useState<Process[]>(
    []
  );
  const [listCompletedProcesses, setListCompletedProcesses] = useState<
    Process[]
  >([]);

  const [config, setConfig] = useState<SimulatorConfig | null>(null);

  useEffect(() => {
    const simulatorInstance = new ProcessSchedulerSimulator();
    setSimulator(simulatorInstance);
    setConfig(simulatorInstance.getConfig());

    simulatorInstance.subscribe(() => {
      setState(simulatorInstance.getCurrentState());
      setTick(simulatorInstance.getCurrentTick());
      setCpuUsage(simulatorInstance.getCpuUsage());
      setCurrentProcess(simulatorInstance.getCurrentProcess());
      setProcesses(simulatorInstance.getProcesses());
      setQueueReadyProcesses(simulatorInstance.getQueueReadyProcesses());
      setQueueBlockedProcesses(simulatorInstance.getQueueBlockedProcesses());
      setListCompletedProcesses(simulatorInstance.getListCompletedProcesses());
      setConfig(simulatorInstance.getConfig());
    });
  }, []);

  return (
    <section className="flex flex-col gap-4 w-full min-h-screen py-10">
      <div className="container">
        <div className="grid grid-cols-[280px_1fr] gap-4">
          <div className="flex flex-col gap-4">
            <SimulatorCpu
              state={state}
              tick={tick}
              cpuUsage={cpuUsage}
              tickSpeed={config?.cpu.tickSpeed ?? 0}
              start={() => simulator?.start()}
              pause={() => simulator?.pause()}
              reset={() => simulator?.reset()}
              restart={() => simulator?.restart()}
              currentProcess={currentProcess}
            />
            {config && (
              <SimulatorConfiguration
                simulatorState={state}
                config={config}
                updateConfig={(newConfig: SimulatorConfig) =>
                  simulator?.updateConfig(newConfig)
                }
              />
            )}
          </div>
          <div className="flex flex-col gap-4">
            <SimulatorMonitor
              queueReadyProcesses={queueReadyProcesses}
              queueBlockedProcesses={queueBlockedProcesses}
              listCompletedProcesses={listCompletedProcesses}
            />
            <SimulatorProcesses title="Process Control" processes={processes} />
          </div>
        </div>
      </div>
    </section>
  );
}
