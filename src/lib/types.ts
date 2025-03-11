export enum SimulatorAlgorithm {
  NON_EXPULSIVE_FCFS = "NON_EXPULSIVE_FCFS", // First Come First Served
  NON_EXPULSIVE_SJF = "NON_EXPULSIVE_SJF", // Shortest Job First
  NON_EXPULSIVE_RANDOM = "NON_EXPULSIVE_RANDOM", // Random
  NON_EXPULSIVE_PRIORITY = "NON_EXPULSIVE_PRIORITY", // Priority Non Expulsive
  EXPULSIVE_ROUND_ROBIN = "EXPULSIVE_ROUND_ROBIN", // Round Robin
  EXPULSIVE_SRTF = "EXPULSIVE_SRTF", // Shortest Remaining Time First
  EXPULSIVE_PRIORITY = "EXPULSIVE_PRIORITY", // Priority Expulsive
}

export enum SimulatorState {
  RUNNING = "RUNNING",
  PAUSED = "PAUSED",
  STOPPED = "STOPPED",
}

type ProcessConfig = {
  maxPriority: number;
  maxBurstTick: number;
  maxBurstIoTick: number;
  maxInitialProcesses: number;
  percentArrivalNewProcess: number;
};

type CpuConfig = {
  quantum: number;
  tickSpeed: number;
};

export type SimulatorConfig = {
  processes: ProcessConfig;
  cpu: CpuConfig;
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
  burstIoTick: number;
  remainingIoTick: number;
  completionTick: number | null;
  waitingTick: number;
  turnaroundTick: number;
  blockingTick: number;
  responseTick: number | null;
  executionCount: number;
};

export type Statistics = {
  totalTime: number;
  totalTicks: number;
  averageWaitingTime: number;
  averageBlockingTime: number;
  averageExecutionTime: number;
  totalProcesses: number;
};
