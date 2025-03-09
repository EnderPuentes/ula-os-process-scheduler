/**
 * Algorithms for the process scheduler
 */

import {
  AlgorithmConfig,
  Process,
  ProcessState,
  SimulatorAlgorithm,
} from "./types";

export class SchedulerProcessAlgorithms {
  /**
   * First-Come, First-Served (FCFS) scheduling algorithm
   * @param processes - Array of processes to be scheduled
   * @returns The next process to run
   */
  private FCFS(
    processes: Process[],
    currentProcess: Process | null
  ): Process | null {
    // If there are no processes, return null
    if (processes.length === 0) return null;

    // If the current process is running, return null
    if (currentProcess && currentProcess.state !== ProcessState.COMPLETED) {
      return null;
    }

    // Get the next process to run
    const readyProcesses = processes
      .filter((process) => process.state === ProcessState.READY)
      .sort((a, b) => a.arrivalTick - b.arrivalTick);

    // Return the first process in the sorted list
    return readyProcesses[0];
  }

  /**
   * Shortest Job First (SJF) scheduling algorithm
   * @param processes - Array of processes to be scheduled
   * @returns The next process to run
   */
  private SJF(
    processes: Process[],
    currentProcess: Process | null
  ): Process | null {
    // If there are no processes, return null
    if (processes.length === 0) return null;

    // If the current process is running, return null
    if (currentProcess && currentProcess.state !== ProcessState.COMPLETED) {
      return null;
    }

    // Get the next process to run
    const readyProcesses = processes
      .filter((process) => process.state === ProcessState.READY)
      .sort((a, b) => a.burstTick - b.burstTick);

    // Return the first process in the sorted list
    return readyProcesses[0];
  }

  /**
   * Random scheduling algorithm
   * @param processes - Array of processes to be scheduled
   * @returns The next process to run
   */
  private RANDOM(
    processes: Process[],
    currentProcess: Process | null
  ): Process | null {
    // If there are no processes, return null
    if (processes.length === 0) return null;

    // If the current process is running, return null
    if (currentProcess && currentProcess.state !== ProcessState.COMPLETED) {
      return null;
    }

    // Get all the ready processes
    const readyProcesses = processes.filter(
      (process) => process.state === ProcessState.READY
    );

    // Get a random process from the list
    const randomProcess =
      readyProcesses[Math.floor(Math.random() * readyProcesses.length)];

    return randomProcess;
  }

  private PRIORITY_NON_EXPULSIVE(
    processes: Process[],
    currentProcess: Process | null
  ): Process | null {
    // If there are no processes, return null
    if (processes.length === 0) return null;

    // If the current process is running, return null
    if (currentProcess && currentProcess.state !== ProcessState.COMPLETED) {
      return null;
    }

    // Get the next process to run
    const readyProcesses = processes
      .filter((process) => process.state === ProcessState.READY)
      .sort((a, b) => a.priority - b.priority);

    // Return the first process in the sorted list
    return readyProcesses[0];
  }

  /**
   * Get the algorithm
   * @param algorithm - The algorithm to get
   * @returns The algorithm
   */
  public getAlgorithm(algorithm: AlgorithmConfig) {
    console.log("algorithm", algorithm);
    switch (algorithm.type) {
      case SimulatorAlgorithm.FCFS:
        return this.FCFS;
      case SimulatorAlgorithm.SJF:
        return this.SJF;
      case SimulatorAlgorithm.RANDOM:
        return this.RANDOM;
      case SimulatorAlgorithm.PRIORITY_NON_EXPULSIVE:
        return this.PRIORITY_NON_EXPULSIVE;
      default:
        throw new Error(`Algorithm ${algorithm.type} not found`);
    }
  }
}
