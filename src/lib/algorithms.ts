/**
 * Algorithms for the process scheduler
 */

import { Process, ProcessState } from "./types";

export class SchedulerProcessAlgorithms {
  /**
   * First-Come, First-Served (FCFS) scheduling algorithm
   * @param processes - Array of all processes to be scheduled
   * @param currentProcess - The current process to be scheduled
   * @param queueReadyProcesses - Array of ready processes to be scheduled
   * @param listCompletedProcesses - Array of completed processes to be scheduled
   * @returns The next process to run
   */
  public firstComeFirstServed(
    currentTick: number,
    processes: Process[],
    currentProcess: Process | null,
    queueReadyProcesses: Process[],
    listCompletedProcesses: Process[]
  ) {
    // If the current process is running, return
    if (currentProcess && currentProcess.state === ProcessState.RUNNING) {
      return;
    }

    // If there are no processes, return
    if (queueReadyProcesses.length === 0) {
      currentProcess = null;
      return;
    }

    

    // Get the next process to run
    const nextProcess = queueReadyProcesses.shift() || null;

    if (nextProcess && currentProcess) {
      listCompletedProcesses.push({
        ...currentProcess,
        state: ProcessState.COMPLETED,
        completionTick: currentTick,
      });

      currentProcess = {
        ...nextProcess,
        state: ProcessState.RUNNING,
      };

      nextProcess.state = ProcessState.RUNNING;
    }

    // Set the current process to the next process
    currentProcess = nextProcess;
  }

  /**
   * Shortest Job First (SJF) scheduling algorithm
   * @param processes - Array of processes to be scheduled
   * @returns The next process to run
   */
  public NON_EXPULSIVE_SJF(
    processes: Process[],
    currentProcess: Process | null
  ): Process | null {
    // If there are no processes, return null
    if (processes.length === 0) return null;

    // If the current process is running, return null
    if (currentProcess && currentProcess.state === ProcessState.RUNNING) {
      return null;
    }

    // Get the next process to run
    const readyProcesses = processes
      .filter((process) => process.state === ProcessState.READY)
      .sort((a, b) => a.burstTick - b.burstTick);

    // Return the first process in the sorted list
    return readyProcesses.length > 0 ? readyProcesses[0] : null;
  }

  /**
   * Random scheduling algorithm
   * @param processes - Array of processes to be scheduled
   * @returns The next process to run
   */
  public NON_EXPULSIVE_RANDOM(
    processes: Process[],
    currentProcess: Process | null
  ): Process | null {
    // If there are no processes, return null
    if (processes.length === 0) return null;

    // If the current process is running, return null
    if (currentProcess && currentProcess.state === ProcessState.RUNNING) {
      return null;
    }

    // Get all the ready processes
    const readyProcesses = processes.filter(
      (process) => process.state === ProcessState.READY
    );

    // Return a random process from the list
    return readyProcesses.length > 0
      ? readyProcesses[Math.floor(Math.random() * readyProcesses.length)]
      : null;
  }

  /**
   * Priority Non Expulsive scheduling algorithm
   * @param processes - Array of processes to be scheduled
   * @returns The next process to run
   */
  public NON_EXPULSIVE_PRIORITY(
    processes: Process[],
    currentProcess: Process | null
  ): Process | null {
    // If there are no processes, return null
    if (processes.length === 0) return null;

    // If the current process is running, return null
    if (currentProcess && currentProcess.state === ProcessState.RUNNING) {
      return null;
    }

    // Get the next process to run
    const readyProcesses = processes
      .filter((process) => process.state === ProcessState.READY)
      .sort((a, b) => a.priority - b.priority);

    // Return the first process in the sorted list
    return readyProcesses[0];
  }

  // /**
  //  * Round Robin scheduling algorithm
  //  * @param processes - Array of processes to be scheduled
  //  * @returns The next process to run
  //  */
  // public EXPULSIVE_ROUND_ROBIN(
  //   processes: Process[],
  //   currentProcess: Process | null
  // ): Process | null {
  //   // If there are no processes, return null
  //   if (processes.length === 0) return null;

  //   // If the current process is running and the remaining time is less than the quantum, return null
  //   if (
  //     currentProcess &&
  //     currentProcess.state === ProcessState.RUNNING &&
  //     currentProcess.burstTick - currentProcess.remainingTick <
  //       algorithm.quantum
  //   ) {
  //     return null;
  //   }

  //   // Get the next process to run
  //   const readyProcesses = processes
  //     .filter((process) => process.state === ProcessState.READY)
  //     .sort((a, b) => a.arrivalTick - b.arrivalTick);

  //   // Return the first process in the sorted list
  //   return readyProcesses[0];
  // }
}
