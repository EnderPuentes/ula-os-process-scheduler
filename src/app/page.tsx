"use client";

import { SimulatorConfiguration } from "@/components/simulator/configuration";
import { SimulatorCpu } from "@/components/simulator/cpu";
import { SimulatorMonitor } from "@/components/simulator/monitor";
import { SimulatorProcesses } from "@/components/simulator/processes";
import { SimulatorStatistics } from "@/components/simulator/statistics";
import { ProcessSchedulerSimulator } from "@/lib/simulator";
import {
  Process,
  SimulatorConfig,
  SimulatorState,
  Statistics,
} from "@/lib/types";
import { useEffect, useState } from "react";

export default function SimulatorHome() {
  const [simulator, setSimulator] = useState<ProcessSchedulerSimulator | null>(
    null
  );
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

  const [cpuUsage, setCpuUsage] = useState<number>(0);
  const [statistics, setStatistics] = useState<Statistics>({
    totalTime: 0,
    totalTicks: 0,
    averageWaitingTime: 0,
    averageBlockingTime: 0,
    averageExecutionTime: 0,
    totalProcesses: 0,
  });

  const [config, setConfig] = useState<SimulatorConfig | null>(null);

  useEffect(() => {
    const simulatorInstance = new ProcessSchedulerSimulator();
    setSimulator(simulatorInstance);
    setConfig(simulatorInstance.getConfig());

    simulatorInstance.subscribe(() => {
      setState(simulatorInstance.getCurrentState());
      setCurrentProcess(simulatorInstance.getCurrentProcess());
      setProcesses(simulatorInstance.getProcesses());
      setQueueReadyProcesses(simulatorInstance.getQueueReadyProcesses());
      setQueueBlockedProcesses(simulatorInstance.getQueueBlockedProcesses());
      setListCompletedProcesses(simulatorInstance.getListCompletedProcesses());
      setCpuUsage(simulatorInstance.getCpuUsage());
      setStatistics(simulatorInstance.getStatistics());
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
              cpuUsage={cpuUsage}
              start={() => simulator?.start()}
              pause={() => simulator?.pause()}
              reset={() => simulator?.reset()}
              resume={() => simulator?.resume()}
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
            <SimulatorStatistics
              totalTicks={statistics.totalTicks}
              averageWaitingTime={statistics.averageWaitingTime}
              averageBlockingTime={statistics.averageBlockingTime}
              averageExecutionTime={statistics.averageExecutionTime}
              totalProcesses={statistics.totalProcesses}
              totalTime={statistics.totalTime}
            />
            <SimulatorProcesses title="Process Control" processes={processes} />
          </div>
        </div>
      </div>
    </section>
  );
}
