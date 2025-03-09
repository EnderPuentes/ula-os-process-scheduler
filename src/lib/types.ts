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

type AlgorithmConfig = {
  type: SimulatorAlgorithm;
  quantum: number;
};

type ProcessConfig = {
  maxPriority: number;
  maxBurstTick: number;
};

type ProcessorConfig = {
  tickSpeed: number;
};

export type SimulatorConfig = {
  algorithm: AlgorithmConfig;
  processes: ProcessConfig;
  processor: ProcessorConfig;
};

export enum ProcessState {
  READY = "ready",
  RUNNING = "running",
  BLOCKED = "blocked",
  COMPLETED = "completed",
}

export type Process = {
  id: number;
  priority: number;
  state: ProcessState;
  arrivalTick: number;
  burstTick: number;
  remainingTick: number;
  completionTick: number | null;
  waitingTick: number;
  turnaroundTick: number;
  blockingTick: number;
  responseTick: number | null;
};
