export enum SimulatorAlgorithm {
  NON_EXPULSIVE_FCFS = "NON_EXPULSIVE_FCFS", // First Come First Served
  NON_EXPULSIVE_SJF = "NON_EXPULSIVE_SJF", // Shortest Job First
  NON_EXPULSIVE_RANDOM = "NON_EXPULSIVE_RANDOM", // Random
  NON_EXPULSIVE_PRIORITY = "NON_EXPULSIVE_PRIORITY", // Priority Non Expulsive
  ROUND_ROBIN = "ROUND_ROBIN", // Round Robin
  SRTF = "SRTF", // Shortest Remaining Time First
  PRIORITY_EXPULSIVE = "PRIORITY_EXPULSIVE", // Priority Expulsive
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
