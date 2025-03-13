// Enum representing the different scheduling algorithms available in the simulator
export enum SimulatorAlgorithm {
  NON_EXPULSIVE_FCFS = "NON_EXPULSIVE_FCFS", // First Come First Served
  NON_EXPULSIVE_SJF = "NON_EXPULSIVE_SJF", // Shortest Job First
  NON_EXPULSIVE_RANDOM = "NON_EXPULSIVE_RANDOM", // Random
  NON_EXPULSIVE_PRIORITY = "NON_EXPULSIVE_PRIORITY", // Priority Non Expulsive
  EXPULSIVE_ROUND_ROBIN = "EXPULSIVE_ROUND_ROBIN", // Round Robin
  EXPULSIVE_SRTF = "EXPULSIVE_SRTF", // Shortest Remaining Time First
  EXPULSIVE_PRIORITY = "EXPULSIVE_PRIORITY", // Priority Expulsive
}

// Enum representing the possible states of the simulator
export enum SimulatorState {
  RUNNING = "RUNNING", // Simulator is actively executing processes
  PAUSED = "PAUSED", // Simulator execution is temporarily halted
  STOPPED = "STOPPED", // Simulator is not executing any processes
}

// Configuration type for process-related settings
type ProcessConfig = {
  maxPriority: number; // Maximum priority value a process can have
  maxBurstTick: number; // Maximum burst time for a process
  maxBurstIoTick: number; // Maximum I/O burst time for a process
  maxInitialProcesses: number; // Maximum number of processes at the start
  percentArrivalNewProcess: number; // Percentage chance of a new process arriving per tick
};

// Configuration type for CPU-related settings
type CpuConfig = {
  quantum: number; // Time slice for Round Robin scheduling
  tickSpeed: number; // Speed of each tick in the simulator
};

// Overall configuration type for the simulator
export type SimulatorConfig = {
  processes: ProcessConfig; // Process-related configuration
  cpu: CpuConfig; // CPU-related configuration
};

// Enum representing the possible states of a process
export enum ProcessState {
  READY = "ready", // Process is ready to be executed
  RUNNING = "running", // Process is currently being executed
  BLOCKED = "blocked", // Process is blocked, typically waiting for I/O
  COMPLETED = "completed", // Process has finished execution
}

// Type representing a process in the simulator
export type Process = {
  id: number; // Unique identifier for the process
  priority: number; // Priority level of the process
  state: ProcessState; // Current state of the process
  arrivalTick: number; // Tick at which the process arrived
  burstTick: number; // Total burst time required by the process
  remainingTick: number; // Remaining burst time for the process
  burstIoTick: number; // Total I/O burst time required by the process
  remainingIoTick: number; // Remaining I/O burst time for the process
  completionTick: number | null; // Tick at which the process completed, null if not completed
  waitingTick: number; // Total time the process has spent waiting
  turnaroundTick: number; // Total time from arrival to completion
  blockingTick: number; // Total time the process has spent blocked
  responseTick: number | null; // Time from arrival to first execution, null if not started
  executionCount: number; // Number of times the process has been executed
};

// Type representing various statistics collected by the simulator
export type Statistics = {
  totalTime: number; // Total time the simulator has been running
  totalTicks: number; // Total number of ticks that have occurred
  averageWaitingTicks: number; // Average waiting time for all processes
  averageBlockingTicks: number; // Average blocking time for all processes
  averageExecutionTicks: number; // Average execution time for all processes
  totalProcesses: number; // Total number of processes handled by the simulator
  cpuUsage: number; // Percentage of time the CPU was actively executing processes
};
