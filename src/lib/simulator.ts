import {
  Process,
  ProcessState,
  SimulatorAlgorithm,
  SimulatorConfig,
  SimulatorState,
} from "./types";

export class ProcessSchedulerSimulator {
  private processes: Process[] = [];
  private currentProcess: Process | null = null;

  private timer: NodeJS.Timeout | null = null;
  private currentTime: number = 0;

  private state: SimulatorState = SimulatorState.STOPPED;

  private config: SimulatorConfig = {
    algorithm: {
      type: SimulatorAlgorithm.FCFS,
      quantum: 10,
    },
    processes: {
      maxBurstTime: 250,
      maxPriority: 5,
      maxArrivalTime: 50,
    },
    processor: {
      tickSpeed: 1000,
    },
  };

  private listeners: (() => void)[] = [];

  constructor(config?: SimulatorConfig | null) {
    this.config = config || this.config;
  }

  private generateRandomProcess(): Process {
    const newProcess: Process = {
      id: this.processes.length + 1,
      arrivalTime: Math.floor(
        Math.random() * this.config.processes.maxArrivalTime
      ) + 1,
      burstTime: Math.floor(Math.random() * this.config.processes.maxBurstTime) + 1,
      priority: Math.floor(Math.random() * this.config.processes.maxPriority) + 1,
      state: ProcessState.READY,
      remainingIoTime: 0,
      waitingTime: 0,
      turnaroundTime: 0,
      responseTime: 0,
      blockingTime: 0,
      completionTime: 0,
      remainingTime: 0,
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

      // Add 10 random processes to the queue
      for (let i = 0; i < 10; i++) {
        this.processes.push(this.generateRandomProcess());
      }

      this.timer = setInterval(() => {
        this.currentTime++;

        if (Math.random() < 0.5) {
          // Add random processes to the queue every 5 ticks
          for (let i = 0; i < Math.floor(Math.random() * 5); i++) {
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
        this.currentTime++;
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
      this.currentTime = 0;
      this.currentProcess = null;
      this.notify();
    }
  }

  public getCurrentState(): SimulatorState {
    return this.state;
  }

  public getCurrentTime(): number {
    return this.currentTime;
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
