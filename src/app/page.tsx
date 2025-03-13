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
  // State to hold the current simulator instance
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

  // State to hold the selected simulator algorithm
  const [simulatorAlgorithm, setSimulatorAlgorithm] =
    useState<SimulatorAlgorithm>(SimulatorAlgorithm.NON_EXPULSIVE_FCFS);

  // State to hold the current state of the simulator
  const [state, setState] = useState<SimulatorState>(SimulatorState.STOPPED);
  // State to hold the current process being executed
  const [currentProcess, setCurrentProcess] = useState<Process | null>(null);
  // State to hold all processes
  const [processes, setProcesses] = useState<Process[]>([]);
  // State to hold the queue of ready processes
  const [queueReadyProcesses, setQueueReadyProcesses] = useState<Process[]>([]);
  // State to hold the queue of blocked processes
  const [queueBlockedProcesses, setQueueBlockedProcesses] = useState<Process[]>(
    []
  );
  // State to hold the list of completed processes
  const [listCompletedProcesses, setListCompletedProcesses] = useState<
    Process[]
  >([]);

  // State to hold the statistics of the simulator
  const [statistics, setStatistics] = useState<Statistics>({
    totalTime: 0,
    totalTicks: 0,
    averageWaitingTicks: 0,
    averageBlockingTicks: 0,
    averageExecutionTicks: 0,
    totalProcesses: 0,
    cpuUsage: 0,
  });

  // State to hold the configuration of the simulator
  const [config, setConfig] = useState<SimulatorConfig | null>(null);

  // Handler to subscribe to simulator updates
  const handlerSubscribe =
    (
      simulatorInstance:
        | SimulatorNonExpulsiveFirstComeFirstServed
        | SimulatorNonExpulsiveShortestJobFirst
        | SimulatorNonExpulsivePriority
        | SimulatorNonExpulsiveRandom
        | SimulatorExpulsiveRoundRobin
        | SimulatorExpulsiveShortestRemainingTimeFirst
        | SimulatorExpulsivePriority
    ) =>
    () => {
      setState(simulatorInstance.getCurrentState());
      setCurrentProcess(simulatorInstance.getCurrentProcess());
      setProcesses(simulatorInstance.getProcesses());
      setQueueReadyProcesses(simulatorInstance.getQueueReadyProcesses());
      setQueueBlockedProcesses(simulatorInstance.getQueueBlockedProcesses());
      setListCompletedProcesses(simulatorInstance.getListCompletedProcesses());
      setStatistics(simulatorInstance.getStatistics());
      setConfig(simulatorInstance.getConfig());
    };

  // Effect to initialize the simulator instance based on the selected algorithm
  useEffect(() => {
    const simulatorInstance = getSimulatorAlgorithm(simulatorAlgorithm);

    setSimulator(simulatorInstance);
    setConfig(simulatorInstance?.getConfig() || null);

    simulatorInstance.subscribe(handlerSubscribe(simulatorInstance));
  }, [simulatorAlgorithm]);

  // Function to get the simulator instance based on the selected algorithm
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
            <SimulatorStatistics statistics={statistics} />
            <SimulatorProcesses title="Process Control" processes={processes} />
          </div>
        </div>
      </div>
    </section>
  );
}
