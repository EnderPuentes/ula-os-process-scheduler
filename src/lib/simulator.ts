import { SchedulerProcessAlgorithms } from "./algorithms";
import {
  Process,
  ProcessState,
  SimulatorAlgorithm,
  SimulatorConfig,
  SimulatorState,
} from "./types";

export class ProcessSchedulerSimulator {
  private algorithms: SchedulerProcessAlgorithms;

  private processes: Process[] = [];
  private currentProcess: Process | null = null;

  private timer: NodeJS.Timeout | null = null;
  private currentTick: number = 0;

  private state: SimulatorState = SimulatorState.STOPPED;

  private config: SimulatorConfig = {
    algorithm: {
      type: SimulatorAlgorithm.FCFS,
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

  constructor(config?: SimulatorConfig | null) {
    this.config = config || this.config;
    this.algorithms = new SchedulerProcessAlgorithms();
  }

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

  public subscribe(listener: () => void) {
    this.listeners.push(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

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

  private updateProcess(process: Process) {
    this.processes.forEach((p) => {
      if (p.id === process.id) {
        p = process;
      }
    });
  }

  private scheduleProcess(): void {
    // Get the next process to run
    const nextProcess = this.algorithms.getAlgorithm(
      this.config.algorithm.type
    )(this.processes, this.currentProcess);

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

  public getCurrentState(): SimulatorState {
    return this.state;
  }

  public getCurrentTick(): number {
    return this.currentTick;
  }

  public getCurrentProcess(): Process | null {
    return this.currentProcess;
  }

  public getProcesses(): Process[] {
    return this.processes;
  }

  public getConfig(): SimulatorConfig {
    return this.config;
  }

  public updateConfig(config: SimulatorConfig) {
    this.config = config;
  }
}
