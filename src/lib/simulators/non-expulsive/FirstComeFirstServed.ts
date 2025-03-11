import { ProcessState, SimulatorConfig } from "../../types";
import { SimulatorBase } from "../Base";

/**
 * Class representing a process scheduler simulator.
 * It manages the lifecycle of processes and simulates scheduling algorithms.
 */
export class SimulatorNonExpulsiveFirstComeFirstServed extends SimulatorBase {
  /**
   * Creates an instance of ProcessSchedulerSimulator.
   * @param {SimulatorConfig | null} [config] - Optional configuration for the simulator.
   */
  constructor(config?: SimulatorConfig | null) {
    super(config);
  }

  protected scheduleProcess() {
    if (!this.currentProcess) {
      const initialProcess = this.queueReadyProcesses.shift() || null;

      if (initialProcess) {
        // Set the initial process as the current process
        this.currentProcess = {
          ...initialProcess,
          state: ProcessState.RUNNING,
          responseTick: this.totalTicks,
          executionCount: initialProcess.executionCount + 1,
        };

        // Sync the current process to the list of processes
        this.syncProcess(this.currentProcess);
      }
      return;
    }

    // If the current process is running and has not exceeded its burst time, return
    if (
      this.currentProcess.state === ProcessState.RUNNING &&
      this.currentProcess.remainingTick > 0
    ) {
      return;
    }

    // Get the next process to run
    const nextProcess = this.queueReadyProcesses.shift() || null;

    if (this.currentProcess) {
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

    if (nextProcess) {
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
      this.currentProcess = null;
    }

    this.notify();
  }
}
