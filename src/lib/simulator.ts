import {
  Process,
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
    algorithm: SimulatorAlgorithm.FCFS,
    timeExecution: 100,
    processes: {
      maxBurstTime: 10,
      maxPriority: 10,
      maxArrivalTime: 10,
    },
    processor: {
      timeQuantum: 10,
      tickSpeed: 1000,
    },
  };

  private listeners: (() => void)[] = [];

  constructor(config?: SimulatorConfig | null) {
    this.config = config || this.config;
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

      this.timer = setInterval(() => {
        this.currentTime++;
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
}
