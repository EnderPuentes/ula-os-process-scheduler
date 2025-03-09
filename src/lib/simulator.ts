import { SchedulerProcessAlgorithms } from "./algorithms";
import {
  Process,
  ProcessState,
  SimulatorAlgorithm,
  SimulatorConfig,
  SimulatorState,
} from "./types";

/**
 * Class representing a process scheduler simulator.
 * It manages the lifecycle of processes and simulates scheduling algorithms.
 */
export class ProcessSchedulerSimulator {
  private algorithms: SchedulerProcessAlgorithms;

  private state: SimulatorState = SimulatorState.STOPPED;

  private processes: Process[] = [];
  private currentProcess: Process | null = null;

  private timer: NodeJS.Timeout | null = null;
  private currentTick: number = 0;

  private config: SimulatorConfig = {
    algorithm: {
      type: SimulatorAlgorithm.NON_EXPULSIVE_FCFS,
      quantum: 10,
    },
    processes: {
      maxPriority: 5,
      maxBurstTick: 10,
    },
    processor: {
      tickSpeed: 1000,
    },
  };

  private listeners: (() => void)[] = [];

  /**
   * Creates an instance of ProcessSchedulerSimulator.
   * @param {SimulatorConfig | null} [config] - Optional configuration for the simulator.
   */
  constructor(config?: SimulatorConfig | null) {
    this.config = config || this.config;
    this.algorithms = new SchedulerProcessAlgorithms();
  }

  /**
   * Generates a random process with random burst time and priority.
   * @returns {Process} The generated process.
   */
  private generateRandomProcess(): Process {
    const executionTick =
      Math.floor(Math.random() * this.config.processes.maxBurstTick) + 1;

    const newProcess: Process = {
      id: this.processes.length + 1,
      arrivalTick: this.currentTick,
      burstTick: executionTick,
      remainingTick: executionTick,
      priority:
        Math.floor(Math.random() * this.config.processes.maxPriority) + 1,
      state: ProcessState.READY,
      waitingTick: 0,
      turnaroundTick: 0,
      responseTick: null,
      blockingTick: 0,
      completionTick: null,
    };
    return newProcess;
  }

  /**
   * Subscribes a listener to be notified of simulator updates.
   * @param {() => void} listener - The listener function to be called on updates.
   */
  public subscribe(listener: () => void) {
    this.listeners.push(listener);
  }

  /**
   * Notifies all subscribed listeners of an update.
   */
  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  /**
   * Starts the simulation, generating processes and scheduling them.
   */
  public start() {
    if (this.state === SimulatorState.STOPPED) {
      this.state = SimulatorState.RUNNING;

      this.processes.push(this.generateRandomProcess());
      this.notify();

      this.timer = setInterval(() => {
        this.scheduleProcess();
        this.currentTick++;
        this.updateProcesses();

        // Generate random processes with a 25% chance 1-5 processes
        for (let i = 0; i < Math.random() * 5; i++) {
          if (Math.random() < 0.25) {
            this.processes.push(this.generateRandomProcess());
          }
        }

        this.notify();
      }, this.config.processor.tickSpeed);
    }
  }

  /**
   * Restarts the simulation from a paused state.
   */
  public restart() {
    if (this.state === SimulatorState.PAUSED) {
      this.state = SimulatorState.RUNNING;

      this.timer = setInterval(() => {
        this.scheduleProcess();
        this.currentTick++;
        this.updateProcesses();
        this.notify();
      }, this.config.processor.tickSpeed);
    }
  }

  /**
   * Pauses the simulation.
   */
  public pause() {
    if (this.state === SimulatorState.RUNNING) {
      this.state = SimulatorState.PAUSED;

      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }

      this.notify();
    }
  }

  /**
   * Resets the simulation to its initial state.
   */
  public reset() {
    if (this.state === SimulatorState.PAUSED) {
      this.state = SimulatorState.STOPPED;

      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }

      this.processes = [];
      this.currentTick = 0;
      this.currentProcess = null;
      this.notify();
    }
  }

  /**
   * Updates the state of all processes based on their current state.
   */
  private updateProcesses() {
    this.processes
      .filter((process) => process.state !== ProcessState.COMPLETED)
      .forEach((process) => {
        switch (process.state) {
          case ProcessState.RUNNING:
            process.remainingTick--;
            if (process.remainingTick <= 0) {
              process.state = ProcessState.COMPLETED;
              process.completionTick = this.currentTick;
            }
            process.turnaroundTick++;
            break;
          case ProcessState.READY:
            process.waitingTick++;
            process.turnaroundTick++;
            break;
        }
      });
  }

  /**
   * Updates a specific process in the process list.
   * @param {Process} process - The process to update.
   */
  private updateProcess(process: Process) {
    this.processes.forEach((p) => {
      if (p.id === process.id) {
        p = process;
      }
    });
  }

  /**
   * Schedules the next process to run based on the current algorithm.
   */
  private scheduleProcess(): void {
    // Get the next process to run
    const nextProcess = this.algorithms.getAlgorithm(this.config.algorithm)(
      this.processes,
      this.currentProcess
    );

    if (nextProcess) {
      // If the current process is running, set it to blocked
      if (this.currentProcess?.state === ProcessState.RUNNING) {
        this.updateProcess({
          ...this.currentProcess,
          state: ProcessState.BLOCKED,
        });
      }

      // Set the current process to the next process
      this.currentProcess = nextProcess;

      // Update the state of the current process
      if (this.currentProcess) {
        this.currentProcess.state = ProcessState.RUNNING;
        this.currentProcess.responseTick = this.currentTick;
        this.updateProcess(this.currentProcess);
      }

      // Notify the listeners
      this.notify();
    }
  }

  /**
   * Gets the current state of the simulator.
   * @returns {SimulatorState} The current state.
   */
  public getCurrentState(): SimulatorState {
    return this.state;
  }

  /**
   * Gets the current tick of the simulator.
   * @returns {number} The current tick.
   */
  public getCurrentTick(): number {
    return this.currentTick;
  }

  /**
   * Gets the current process being executed.
   * @returns {Process | null} The current process or null if none.
   */
  public getCurrentProcess(): Process | null {
    return this.currentProcess;
  }

  /**
   * Gets the list of all processes.
   * @returns {Process[]} The list of processes.
   */
  public getProcesses(): Process[] {
    return this.processes;
  }

  /**
   * Gets the current configuration of the simulator.
   * @returns {SimulatorConfig} The simulator configuration.
   */
  public getConfig(): SimulatorConfig {
    return this.config;
  }

  /**
   * Updates the simulator configuration.
   * @param {SimulatorConfig} config - The new configuration.
   */
  public updateConfig(config: SimulatorConfig) {
    this.config = config;
  }
}
