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

export type AlgorithmConfig = {
  type: SimulatorAlgorithm;
  quantum: number;
};

export type ProcessConfig = {
  maxBurstTime: number;
  maxPriority: number;
  maxArrivalTime: number;
};

export type ProcessorConfig = {
  tickSpeed: number;
};

export type SimulatorConfig = {
  algorithm: AlgorithmConfig;
  processes: ProcessConfig;
  processor: ProcessorConfig;
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
