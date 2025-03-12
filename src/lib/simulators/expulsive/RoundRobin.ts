import { ProcessState, SimulatorConfig } from "../../types";
import { SimulatorBase } from "../Base";

/**
 * Class representing a process scheduler simulator.
 * It manages the lifecycle of processes and simulates scheduling algorithms.
 */
export class SimulatorExpulsiveRoundRobin extends SimulatorBase {
  /**
   * Creates an instance of ProcessSchedulerSimulator.
   * @param {SimulatorConfig | null} [config] - Optional configuration for the simulator.
   */
  constructor(config?: SimulatorConfig | null) {
    super(config);
  }

  /**
   * Sorts the processes by arrival time and execution count.
   */
  protected sortByRemainingTime() {
    this.queueReadyProcesses = this.queueReadyProcesses.sort((a, b) => {
      return (
        a.executionCount - b.executionCount || a.arrivalTick - b.arrivalTick
      );
    });
  }

  /**
   * Schedules the next process to run.
   */
  protected scheduleProcess() {
    // If there is no current process, set the next process as the current process

    if (!this.currentProcess) {
      this.setInitialProcess();
      return;
    }

    // If the current process is running and has exceeded its burst time, set it to blockedé
    if (
      this.currentProcess.state === ProcessState.RUNNING &&
      this.currentProcess.remainingTick <= this.currentProcess.burstTick / 2 &&
      this.currentProcess.remainingIoTick > 0
    ) {
      this.blockProcess();
      return;
    }

    // If the current process is running and has not exceeded its quantum, return
    if (
      this.currentProcess.state === ProcessState.RUNNING &&
      this.currentProcess.remainingTick > 0 &&
      this.currentProcess.burstTick - this.currentProcess.remainingTick <
        this.config.cpu.quantum * this.currentProcess.executionCount
    ) {
      return;
    }

    // Order the processes by arrival time and execution count
    this.sortByRemainingTime();

    // Get the next process to run
    const nextProcess = this.queueReadyProcesses.shift() || null;

    if (nextProcess) {
      if (this.currentProcess.remainingTick > 0) {
        this.currentProcess = {
          ...this.currentProcess,
          state: ProcessState.READY,
          responseTick: this.totalTicks,
        };
        // Sync the current process to the list of processes
        this.syncProcess(this.currentProcess);
      } else {
        this.currentProcess = {
          ...this.currentProcess,
          state: ProcessState.COMPLETED,
          completionTick: this.totalTicks,
        };
        // Sync the current process to the list of processes
        this.syncProcess(this.currentProcess);
        // Add the completed process to the list of completed processes
        this.listCompletedProcesses.push(this.currentProcess);
      }

      // Set the next process as the current process
      this.currentProcess = {
        ...nextProcess,
        state: ProcessState.RUNNING,
        responseTick: this.totalTicks,
        executionCount: nextProcess.executionCount + 1,
      };

      // Sync the new current process to the list of processes
      this.syncProcess(this.currentProcess);
    } else {
      this.currentProcess = {
        ...this.currentProcess,
        state: ProcessState.COMPLETED,
        completionTick: this.totalTicks,
      };

      // Sync the current process to the list of processes
      this.syncProcess(this.currentProcess);

      // Add the completed process to the list of completed processes
      this.listCompletedProcesses.push(this.currentProcess);

      // Set the current process to null
      this.currentProcess = null;
    }

    this.notify();
  }
}
