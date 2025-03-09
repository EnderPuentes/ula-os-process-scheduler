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
  private state: SimulatorState = SimulatorState.STOPPED;

  private processes: Process[] = [];
  private currentProcess: Process | null = null;

  private queueReadyProcesses: Process[] = [];
  private queueBlockedProcesses: Process[] = [];

  private listCompletedProcesses: Process[] = [];

  private timer: NodeJS.Timeout | null = null;
  private currentTick: number = 0;

  private config: SimulatorConfig = {
    algorithm: SimulatorAlgorithm.NON_EXPULSIVE_FCFS,
    processes: {
      maxPriority: 5,
      maxBurstTick: 10,
      maxProcesses: 50,
    },
    processor: {
      quantum: 10,
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
  }

  /**
   * Generates a random process with random burst time and priority.
   * @returns {Process} The generated process.
   */
  private generateRandomProcesses(
    maxProcesses = this.config.processes.maxProcesses
  ) {
    for (let i = 0; i < maxProcesses; i++) {
      // Generate a random priority between 1 and maxPriority
      const priority =
        Math.floor(Math.random() * this.config.processes.maxPriority) + 1;

      // Generate a random burst time between 1 and maxBurstTick
      const executionTick =
        Math.floor(Math.random() * this.config.processes.maxBurstTick) + 1;

      this.processes.push({
        id: this.processes.length + 1,
        arrivalTick: this.currentTick,
        burstTick: executionTick,
        remainingTick: executionTick,
        priority: priority,
        state: ProcessState.READY,
        waitingTick: 0,
        turnaroundTick: 0,
        responseTick: null,
        blockingTick: 0,
        completionTick: null,
        executionCount: 0,
      });

      this.notify();
    }
  }

  /**
   * Notifies all subscribed listeners of an update.
   */
  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  /**
   * Updates a specific process in the process list.
   * @param {Process} process - The process to update.
   */
  private syncProcess(process: Process) {
    const index = this.processes.findIndex((p) => p.id === process.id);
    this.processes[index] = process;
  }

  /**
   * Updates the state of all processes based on their current state.
   */
  private syncProcesses() {
    this.processes
      .filter((process) => process.state !== ProcessState.COMPLETED)
      .forEach((process) => {
        switch (process.state) {
          case ProcessState.RUNNING:
            process.remainingTick--;
            process.turnaroundTick++;
            break;
          case ProcessState.READY:
            process.waitingTick++;
            process.turnaroundTick++;
            break;
        }
      });

    this.syncQueueReadyProcesses();
  }

  /**
   * Syncs the queue of ready processes.
   */

  private syncQueueReadyProcesses() {
    this.queueReadyProcesses = this.processes.filter(
      (process) => process.state === ProcessState.READY
    );
  }

  /**
   * Completes the current process and sets the next process to run.
   * @param {Process | null} nextProcess - The next process to run.
   */
  private completeNonExpulsiveCurrentProcess(nextProcess: Process | null) {
    if (this.currentProcess) {
      this.currentProcess = {
        ...this.currentProcess,
        state: ProcessState.COMPLETED,
        completionTick: this.currentTick,
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
        responseTick: this.currentTick,
        executionCount: nextProcess.executionCount + 1,
      };

      // Sync the new current process to the list of processes
      this.syncProcess(this.currentProcess);
    } else {
      this.currentProcess = null;
      this.stop();
    }

    this.notify();
  }

  /**
   * Schedules the next process to run based on the first come first served algorithm.
   */
  private scheduleProcessNonExpulsiveFirstComeFirstServed() {
    // If the current process is running, return

    if (!this.currentProcess) {
      const initialProcess = this.queueReadyProcesses.shift() || null;

      if (initialProcess) {
        // Set the initial process as the current process
        this.currentProcess = {
          ...initialProcess,
          state: ProcessState.RUNNING,
          responseTick: this.currentTick,
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

    this.completeNonExpulsiveCurrentProcess(nextProcess);
  }

  /**
   * Schedules the next process to run based on the shortest job first algorithm.
   */
  private scheduleProcessNonExpulsiveShortestJobFirst() {
    // If there is no current process, set the next process as the current process

    if (!this.currentProcess) {
      const initialProcess = this.queueReadyProcesses.shift() || null;

      if (initialProcess) {
        this.currentProcess = {
          ...initialProcess,
          state: ProcessState.RUNNING,
          responseTick: this.currentTick,
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

    // Order the processes by burst time
    this.queueReadyProcesses = this.queueReadyProcesses.sort(
      (a, b) => a.burstTick - b.burstTick
    );

    // Get the next process to run
    const nextProcess = this.queueReadyProcesses.shift() || null;

    this.completeNonExpulsiveCurrentProcess(nextProcess);
  }

  /**
   * Schedules the next process to run based on the priority algorithm.
   */
  private scheduleProcessNonExpulsivePriority() {
    // If there is no current process, set the next process as the current process

    if (!this.currentProcess) {
      const initialProcess = this.queueReadyProcesses.shift() || null;

      if (initialProcess) {
        this.currentProcess = {
          ...initialProcess,
          state: ProcessState.RUNNING,
          responseTick: this.currentTick,
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

    // Order the processes by priority
    this.queueReadyProcesses = this.queueReadyProcesses.sort(
      (a, b) => a.priority - b.priority
    );

    // Get the next process to run
    const nextProcess = this.queueReadyProcesses.shift() || null;

    this.completeNonExpulsiveCurrentProcess(nextProcess);
  }

  /**
   * Schedules the next process to run based on the random algorithm.
   */
  private scheduleProcessNonExpulsiveRandom() {
    // If there is no current process, set the next process as the current process

    if (!this.currentProcess) {
      const initialProcess = this.queueReadyProcesses.shift() || null;

      if (initialProcess) {
        this.currentProcess = {
          ...initialProcess,
          state: ProcessState.RUNNING,
          responseTick: this.currentTick,
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

    // Get a random process from the queue of ready processes
    // Order the processes by burst time
    this.queueReadyProcesses = this.queueReadyProcesses.sort(
      () => Math.random() - 0.5
    );

    // Get the next process to run
    const nextProcess = this.queueReadyProcesses.shift() || null;

    this.completeNonExpulsiveCurrentProcess(nextProcess);
  }

  /**
   * Schedules the next process to run based on the round robin algorithm.
   */
  private scheduleProcessExpulsiveRoundRobin() {
    // If there is no current process, set the next process as the current process

    if (!this.currentProcess) {
      const initialProcess = this.queueReadyProcesses.shift() || null;

      if (initialProcess) {
        // Set the initial process as the current process
        this.currentProcess = {
          ...initialProcess,
          state: ProcessState.RUNNING,
          responseTick: this.currentTick,
          executionCount: initialProcess.executionCount + 1,
        };

        // Sync the current process to the list of processes
        this.syncProcess(this.currentProcess);
      }
      return;
    }

    // If the current process is running and has not exceeded its quantum, return
    if (
      this.currentProcess.state === ProcessState.RUNNING &&
      this.currentProcess.remainingTick > 0 &&
      this.currentProcess.burstTick - this.currentProcess.remainingTick <
        this.config.processor.quantum * this.currentProcess.executionCount
    ) {
      return;
    }

    // Order the processes by arrival time and execution count
    this.queueReadyProcesses = this.queueReadyProcesses.sort((a, b) => {
      return (
        a.executionCount - b.executionCount || a.arrivalTick - b.arrivalTick
      );
    });

    // Get the next process to run
    const nextProcess = this.queueReadyProcesses.shift() || null;

    if (nextProcess) {
      if (this.currentProcess.remainingTick > 0) {
        this.currentProcess = {
          ...this.currentProcess,
          state: ProcessState.READY,
          responseTick: this.currentTick,
        };
        // Sync the current process to the list of processes
        this.syncProcess(this.currentProcess);
      } else {
        this.currentProcess = {
          ...this.currentProcess,
          state: ProcessState.COMPLETED,
          completionTick: this.currentTick,
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
        responseTick: this.currentTick,
        executionCount: nextProcess.executionCount + 1,
      };

      // Sync the new current process to the list of processes
      this.syncProcess(this.currentProcess);
    } else {
      this.currentProcess = {
        ...this.currentProcess,
        state: ProcessState.COMPLETED,
        completionTick: this.currentTick,
      };

      // Sync the current process to the list of processes
      this.syncProcess(this.currentProcess);

      // Add the completed process to the list of completed processes
      this.listCompletedProcesses.push(this.currentProcess);

      // Set the current process to null
      this.currentProcess = null;

      // Stop the simulation
      this.stop();
    }

    this.notify();
  }

  /**
   * Schedules the next process to run based on the shortest remaining time first algorithm.
   */
  private scheduleProcessExpulsiveShortestRemainingTimeFirst() {
    // If there is no current process, set the next process as the current process

    if (!this.currentProcess) {
      const initialProcess = this.queueReadyProcesses.shift() || null;

      if (initialProcess) {
        // Set the initial process as the current process
        this.currentProcess = {
          ...initialProcess,
          state: ProcessState.RUNNING,
          responseTick: this.currentTick,
          executionCount: initialProcess.executionCount + 1,
        };

        // Sync the current process to the list of processes
        this.syncProcess(this.currentProcess);
      }
      return;
    }

    // Order the processes by remaining execution time
    this.queueReadyProcesses = this.queueReadyProcesses.sort((a, b) => {
      return a.remainingTick - b.remainingTick;
    });

    // Get the next process to run
    const nextProcess = this.queueReadyProcesses.shift() || null;

    if (nextProcess) {
      if (this.currentProcess.remainingTick > nextProcess.remainingTick) {
        this.currentProcess = {
          ...this.currentProcess,
          state: ProcessState.READY,
          responseTick: this.currentTick,
        };
        // Sync the current process to the list of processes
        this.syncProcess(this.currentProcess);

        this.currentProcess = {
          ...nextProcess,
          state: ProcessState.RUNNING,
          responseTick: this.currentTick,
          executionCount: nextProcess.executionCount + 1,
        };

        // Sync the new current process to the list of processes
        this.syncProcess(this.currentProcess);
      } else if (this.currentProcess.remainingTick === 0) {
        this.currentProcess = {
          ...this.currentProcess,
          state: ProcessState.COMPLETED,
          completionTick: this.currentTick,
        };
        // Sync the current process to the list of processes
        this.syncProcess(this.currentProcess);
        // Add the completed process to the list of completed processes
        this.listCompletedProcesses.push(this.currentProcess);

        // Set the next process as the current process
        this.currentProcess = {
          ...nextProcess,
          state: ProcessState.RUNNING,
          responseTick: this.currentTick,
          executionCount: nextProcess.executionCount + 1,
        };

        // Sync the new current process to the list of processes
        this.syncProcess(this.currentProcess);
      }
    } else if (this.currentProcess.remainingTick === 0) {
      this.currentProcess = {
        ...this.currentProcess,
        state: ProcessState.COMPLETED,
        completionTick: this.currentTick,
      };
      // Sync the current process to the list of processes
      this.syncProcess(this.currentProcess);

      // Add the completed process to the list of completed processes
      this.listCompletedProcesses.push(this.currentProcess);

      // Set the current process to null
      this.currentProcess = null;

      // Stop the simulation
      this.stop();
    }

    this.notify();
  }

  /**
   * Schedules the next process to run based on the current algorithm.
   */
  private scheduleProcess() {
    // Schedule the next process (if applicable)
    switch (this.config.algorithm) {
      case SimulatorAlgorithm.NON_EXPULSIVE_FCFS:
        this.scheduleProcessNonExpulsiveFirstComeFirstServed();
        break;
      case SimulatorAlgorithm.NON_EXPULSIVE_SJF:
        this.scheduleProcessNonExpulsiveShortestJobFirst();
        break;
      case SimulatorAlgorithm.NON_EXPULSIVE_PRIORITY:
        this.scheduleProcessNonExpulsivePriority();
        break;
      case SimulatorAlgorithm.NON_EXPULSIVE_RANDOM:
        this.scheduleProcessNonExpulsiveRandom();
        break;
      case SimulatorAlgorithm.EXPULSIVE_ROUND_ROBIN:
        this.scheduleProcessExpulsiveRoundRobin();
        break;
      case SimulatorAlgorithm.EXPULSIVE_SRTF:
        // Simulate new process arrival
        if (Math.random() < 0.5) {
          this.generateRandomProcesses(1);
        }
        this.scheduleProcessExpulsiveShortestRemainingTimeFirst();
        break;
      default:
        throw new Error("Invalid algorithm type");
    }

    // Sync the processes
    this.syncProcesses();

    this.notify();
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
    this.notify();
  }

  /**
   * Gets the list of processes that are ready to be executed.
   * @returns {Process[]} The list of ready processes.
   */
  public getQueueReadyProcesses(): Process[] {
    return this.queueReadyProcesses;
  }

  /**
   * Gets the list of processes that are currently blocked.
   * @returns {Process[]} The list of blocked processes.
   */
  public getQueueBlockedProcesses(): Process[] {
    return this.queueBlockedProcesses;
  }

  /**
   * Gets the list of processes that have been completed.
   * @returns {Process[]} The list of completed processes.
   */
  public getListCompletedProcesses(): Process[] {
    return this.listCompletedProcesses;
  }

  /**
   * Starts the simulation, generating processes and scheduling them.
   */
  public start() {
    if (this.state === SimulatorState.STOPPED) {
      this.state = SimulatorState.RUNNING;

      this.generateRandomProcesses();

      this.timer = setInterval(() => {
        this.scheduleProcess();
        this.currentTick++;
        this.notify();
      }, this.config.processor.tickSpeed);

      this.notify();
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
      this.queueReadyProcesses = [];
      this.queueBlockedProcesses = [];
      this.listCompletedProcesses = [];

      this.notify();
    }
  }

  public stop() {
    if (this.state === SimulatorState.RUNNING) {
      this.state = SimulatorState.STOPPED;

      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }

      this.notify();
    }
  }

  /**
   * Subscribes a listener to be notified of simulator updates.
   * @param {() => void} listener - The listener function to be called on updates.
   */
  public subscribe(listener: () => void) {
    this.listeners.push(listener);
  }
}
