"use client";

import { SimulatorConfiguration } from "@/components/simulator/configuration";
import { SimulatorControl } from "@/components/simulator/control";
import { SimulatorMonitor } from "@/components/simulator/monitor";
import { SimulatorProcesses } from "@/components/simulator/processes";
import { SimulatorStatistics } from "@/components/simulator/statistics";
import { SimulatorExpulsivePriority } from "@/lib/simulators/expulsive/Priority";
import { SimulatorExpulsiveRoundRobin } from "@/lib/simulators/expulsive/RoundRobin";
import { SimulatorExpulsiveShortestRemainingTimeFirst } from "@/lib/simulators/expulsive/ShortestRemainingTimeFirst";
import { SimulatorNonExpulsiveFirstComeFirstServed } from "@/lib/simulators/non-expulsive/FirstComeFirstServed";
import { SimulatorNonExpulsivePriority } from "@/lib/simulators/non-expulsive/Priority";
import { SimulatorNonExpulsiveRandom } from "@/lib/simulators/non-expulsive/Random";
import { SimulatorNonExpulsiveShortestJobFirst } from "@/lib/simulators/non-expulsive/ShortestJobFirst";
import {
  Process,
  SimulatorAlgorithm,
  SimulatorConfig,
  SimulatorState,
  Statistics,
} from "@/lib/types";
import { useEffect, useState } from "react";

export default function SimulatorHome() {
  const [simulator, setSimulator] = useState<
    | SimulatorNonExpulsiveFirstComeFirstServed
    | SimulatorNonExpulsiveShortestJobFirst
    | SimulatorNonExpulsivePriority
    | SimulatorNonExpulsiveRandom
    | SimulatorExpulsiveRoundRobin
    | SimulatorExpulsiveShortestRemainingTimeFirst
    | SimulatorExpulsivePriority
    | null
  >(null);

  const [simulatorAlgorithm, setSimulatorAlgorithm] =
    useState<SimulatorAlgorithm>(SimulatorAlgorithm.NON_EXPULSIVE_FCFS);

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
    const simulatorInstance = getSimulatorAlgorithm(simulatorAlgorithm);

    setSimulator(simulatorInstance);
    setConfig(simulatorInstance?.getConfig() || null);

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

  useEffect(() => {
    const simulatorInstance = getSimulatorAlgorithm(simulatorAlgorithm);

    setSimulator(simulatorInstance);
    setConfig(simulatorInstance?.getConfig() || null);

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
  }, [simulatorAlgorithm]);

  function getSimulatorAlgorithm(
    simulatorAlgorithm: SimulatorAlgorithm = SimulatorAlgorithm.NON_EXPULSIVE_FCFS
  ):
    | SimulatorNonExpulsiveFirstComeFirstServed
    | SimulatorNonExpulsiveShortestJobFirst
    | SimulatorNonExpulsivePriority
    | SimulatorNonExpulsiveRandom
    | SimulatorExpulsiveRoundRobin
    | SimulatorExpulsiveShortestRemainingTimeFirst
    | SimulatorExpulsivePriority {
    switch (simulatorAlgorithm) {
      case SimulatorAlgorithm.NON_EXPULSIVE_FCFS:
        return new SimulatorNonExpulsiveFirstComeFirstServed();
      case SimulatorAlgorithm.NON_EXPULSIVE_SJF:
        return new SimulatorNonExpulsiveShortestJobFirst();
      case SimulatorAlgorithm.NON_EXPULSIVE_PRIORITY:
        return new SimulatorNonExpulsivePriority();
      case SimulatorAlgorithm.NON_EXPULSIVE_RANDOM:
        return new SimulatorNonExpulsiveRandom();
      case SimulatorAlgorithm.EXPULSIVE_ROUND_ROBIN:
        return new SimulatorExpulsiveRoundRobin();
      case SimulatorAlgorithm.EXPULSIVE_SRTF:
        return new SimulatorExpulsiveShortestRemainingTimeFirst();
      case SimulatorAlgorithm.EXPULSIVE_PRIORITY:
        return new SimulatorExpulsivePriority();
      default:
        return new SimulatorNonExpulsiveFirstComeFirstServed();
    }
  }

  return (
    <section className="flex flex-col gap-4 w-full min-h-screen py-10">
      <div className="container">
        <div className="grid grid-cols-[280px_1fr] gap-4">
          <div className="flex flex-col gap-4">
            <SimulatorControl
              state={state}
              start={() => simulator?.start()}
              pause={() => simulator?.pause()}
              reset={() => simulator?.reset()}
              resume={() => simulator?.resume()}
              simulatorAlgorithm={simulatorAlgorithm}
              onChangeSimulatorAlgorithm={(algorithm: SimulatorAlgorithm) => {
                setSimulatorAlgorithm(algorithm);
              }}
            />
            {config && (
              <SimulatorConfiguration
                simulatorState={state}
                simulatorAlgorithm={simulatorAlgorithm}
                config={config}
                updateConfig={(newConfig: SimulatorConfig) => {
                  simulator?.updateConfig(newConfig);
                }}
              />
            )}
          </div>
          <div className="flex flex-col gap-4">
            <SimulatorMonitor
              simulatorState={state}
              currentProcess={currentProcess}
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
