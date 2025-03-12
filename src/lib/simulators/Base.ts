import {
  Process,
  ProcessState,
  SimulatorConfig,
  SimulatorState,
  Statistics,
} from "../types";

/**
 * Class representing a process scheduler simulator.
 * It manages the lifecycle of processes and simulates scheduling algorithms.
 */
export abstract class SimulatorBase {
  protected state: SimulatorState = SimulatorState.STOPPED;

  protected processes: Process[] = [];
  protected currentProcess: Process | null = null;

  protected queueReadyProcesses: Process[] = [];
  protected queueBlockedProcesses: Process[] = [];

  protected listCompletedProcesses: Process[] = [];

  protected timer: NodeJS.Timeout | null = null;

  protected totalTicks: number = 0;
  protected usedCpuTicks: number = 0;
  protected cpuUse: number = 0;

  protected config: SimulatorConfig = {
    processes: {
      maxPriority: 5,
      maxBurstTick: 10,
      maxBurstIoTick: 100,
      maxInitialProcesses: 10,
      percentArrivalNewProcess: 20,
    },
    cpu: {
      quantum: 2,
      tickSpeed: 1000,
    },
  };

  protected listeners: (() => void)[] = [];

  /**
   * Creates an instance of ProcessSchedulerSimulator.
   * @param {SimulatorConfig | null} [config] - Optional configuration for the simulator.
   */
  constructor(config?: SimulatorConfig | null) {
    this.config = config || this.config;
  }

  /**
   * Schedules a process based on the specific algorithm.
   * This method should be implemented by derived classes.
   */
  protected abstract scheduleProcess(): void;

  /**
   * Sorts the processes by remaining execution time.
   */
  protected abstract sortByRemainingTime(): void;

  /**
   * Generates a random process with random burst time and priority.
   * @returns {Process} The generated process.
   */
  protected generateRandomProcesses(
    maxInitialProcesses = this.config.processes.maxInitialProcesses
  ) {
    for (let i = 0; i < maxInitialProcesses; i++) {
      // Generate a random priority between 1 and maxPriority
      const priority =
        Math.floor(Math.random() * this.config.processes.maxPriority) + 1;

      // Generate a random burst time between 1 and maxBurstTick
      const burstTick =
        Math.floor(Math.random() * this.config.processes.maxBurstTick) + 1;

      const burstIoTick =
        Math.floor(Math.random() * this.config.processes.maxBurstIoTick) + 1;

      this.processes.push({
        id: this.processes.length + 1,
        arrivalTick: this.totalTicks,
        burstTick: burstTick,
        remainingTick: burstTick,
        burstIoTick: burstTick > 5 ? burstIoTick : 0,
        remainingIoTick: burstTick > 5 ? burstIoTick : 0,
        priority: priority,
        state: ProcessState.READY,
        waitingTick: 0,
        turnaroundTick: 0,
        responseTick: null,
        blockingTick: 0,
        completionTick: null,
        executionCount: 0,
      });

      this.syncQueueReadyProcesses();
      this.notify();
    }
  }

  protected setInitialProcess() {
    // Order the processes by remaining execution time
    this.sortByRemainingTime();

    // Get the next process to run
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
  }

  /**
   * Blocks the current process and sets the next process as the current process.
   */
  protected blockProcess() {
    if (!this.currentProcess) {
      return;
    }

    this.currentProcess.state = ProcessState.BLOCKED;
    this.syncProcess(this.currentProcess);
    this.queueBlockedProcesses.push(this.currentProcess);

    const nextProcess = this.queueReadyProcesses.shift() || null;

    if (nextProcess) {
      this.currentProcess = {
        ...nextProcess,
        state: ProcessState.RUNNING,
        responseTick: this.totalTicks,
        executionCount: nextProcess.executionCount + 1,
      };

      this.syncProcess(this.currentProcess);
    }
  }

  /**
   * Updates a specific process in the process list.
   * @param {Process} process - The process to update.
   */
  protected syncProcess(process: Process) {
    const index = this.processes.findIndex((p) => p.id === process.id);
    this.processes[index] = process;
  }

  /**
   * Updates the state of all processes based on their current state.
   */
  protected syncProcesses() {
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
          case ProcessState.BLOCKED:
            process.remainingIoTick--;
            process.blockingTick++;
            process.turnaroundTick++;
            if (process.remainingIoTick <= 0) {
              process.state = ProcessState.READY;
            }
            break;
        }
      });

    this.syncQueueReadyProcesses();
    this.syncQueueBlockedProcesses();
  }

  /**
   * Syncs the queue of ready processes.
   */

  protected syncQueueReadyProcesses() {
    this.queueReadyProcesses = this.processes.filter(
      (process) => process.state === ProcessState.READY
    );
  }

  /**
   * Syncs the queue of blocked processes.
   */
  protected syncQueueBlockedProcesses() {
    this.queueBlockedProcesses = this.processes.filter(
      (process) => process.state === ProcessState.BLOCKED
    );
  }

  /**
   * Gets the current state of the simulator.
   * @returns {SimulatorState} The current state.
   */
  public getCurrentState(): SimulatorState {
    return this.state;
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

  public getCpuUsage(): number {
    return this.cpuUse;
  }

  /**
   * Gets the statistics of the simulator.
   * @returns {Object} The statistics.
   */
  public getStatistics(): Statistics {
    const totalTicks = this.totalTicks;
    const totalTime = this.totalTicks * this.config.cpu.tickSpeed;
    const totalProcesses = this.processes.length;

    const averageWaitingTicks =
      this.listCompletedProcesses.length > 0
        ? this.listCompletedProcesses.reduce(
            (acc, process) =>
              acc +
              ((process.completionTick ?? 0) -
                (process.arrivalTick ?? 0) -
                (process.burstTick ?? 0)),
            0
          ) / this.listCompletedProcesses.length
        : 0;

    const averageBlockingTicks =
      this.listCompletedProcesses.length > 0
        ? this.listCompletedProcesses.reduce(
            (acc, process) => acc + (process.blockingTick ?? 0),
            0
          ) / this.listCompletedProcesses.length
        : 0;

    const averageExecutionTicks =
      this.listCompletedProcesses.length > 0
        ? this.listCompletedProcesses.reduce(
            (acc, process) => acc + (process.burstTick ?? 0),
            0
          ) / this.listCompletedProcesses.length
        : 0;

    return {
      totalTime,
      totalTicks,
      totalProcesses,
      averageWaitingTicks,
      averageBlockingTicks,
      averageExecutionTicks,
      cpuUsage: this.cpuUse,
    };
  }

  /**
   * Starts the simulation, generating processes and scheduling them.
   */
  public start() {
    if (this.state === SimulatorState.STOPPED) {
      this.state = SimulatorState.RUNNING;

      this.processes = [];
      this.totalTicks = 0;
      this.usedCpuTicks = 0;
      this.currentProcess = null;
      this.queueReadyProcesses = [];
      this.queueBlockedProcesses = [];
      this.listCompletedProcesses = [];

      this.generateRandomProcesses();

      this.timer = setInterval(() => {
        // Simulate new process arrival
        const generateNewProcess =
          Math.random() < this.config.processes.percentArrivalNewProcess / 100;

        if (generateNewProcess) {
          this.generateRandomProcesses(1);
        }

        // Schedule the next process
        this.scheduleProcess();

        // Sync the processes
        this.syncProcesses();

        // Increment the used CPU ticks
        if (this.currentProcess) {
          this.usedCpuTicks++;
        }

        // Increment the total ticks
        this.totalTicks++;

        // Calculate the CPU usage
        this.cpuUse = (this.usedCpuTicks / this.totalTicks) * 100;

        // Notify the listeners
        this.notify();
      }, this.config.cpu.tickSpeed);

      this.notify();
    }
  }

  /**
   * Resumes the simulation from a paused state.
   */
  public resume() {
    if (this.state === SimulatorState.PAUSED) {
      this.state = SimulatorState.RUNNING;

      this.timer = setInterval(() => {
        // Simulate new process arrival
        const generateNewProcess =
          Math.random() < this.config.processes.percentArrivalNewProcess / 100;

        if (generateNewProcess) {
          this.generateRandomProcesses(1);
        }

        // Schedule the next process
        this.scheduleProcess();

        // Sync the processes
        this.syncProcesses();

        // Increment the used CPU ticks
        if (this.currentProcess) {
          this.usedCpuTicks++;
        }

        // Increment the total ticks
        this.totalTicks++;

        // Calculate the CPU usage
        this.cpuUse = (this.usedCpuTicks / this.totalTicks) * 100;

        // Notify the listeners
        this.notify();
      }, this.config.cpu.tickSpeed);
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
      this.totalTicks = 0;
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

  /**
   * Notifies all subscribed listeners of an update.
   */
  protected notify() {
    this.listeners.forEach((listener) => listener());
  }
}
