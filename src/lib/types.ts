export enum SimulatorAlgorithm {
  FCFS = "FCFS", // First Come First Served
  SJF = "SJF", // Shortest Job First
  RANDOM = "RANDOM", // Random
  PRIORITY_EXPULSIVE = "PRIORITY_EXPULSIVE", // Priority Expulsive
  ROUND_ROBIN = "ROUND_ROBIN", // Round Robin
  SRTF = "SRTF", // Shortest Remaining Time First
  PRIORITY_NON_EXPULSIVE = "PRIORITY_NON_EXPULSIVE", // Priority Non Expulsive
}

export enum SimulatorState {
  RUNNING = "RUNNING",
  PAUSED = "PAUSED",
  STOPPED = "STOPPED",
}

export type SimulatorConfig = {
  algorithm: SimulatorAlgorithm;
  timeExecution: number;
  processes: {
    maxBurstTime: number;
    maxPriority: number;
    maxArrivalTime: number;
  };
  processor: {
    timeQuantum: number;
    tickSpeed: number;
  };
};

export type Simulator = {
  config: SimulatorConfig;
  currentTime: number;
  processes: Process[];
  currentProcess: Process | null;
};

export enum ProcessState {
  READY = "ready",
  RUNNING = "running",
  BLOCKED = "blocked",
  COMPLETED = "completed",
}

export type Process = {
  id: number;
  arrivalTime: number;
  burstTime: number;
  priority: number;
  remainingTime: number;
  remainingIoTime: number;
  state: ProcessState;
  waitingTime: number;
  turnaroundTime: number;
  responseTime: number | null;
  blockingTime: number;
  completionTime: number | null;
};
