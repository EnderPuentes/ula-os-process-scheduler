# 👾 Process Scheduling Simulator

This simulator emulates the execution of processes in a CPU, applying a scheduling algorithm and managing process states. Its purpose is to analyze the behavior of different scheduling strategies in a controlled environment.

To see the production version, click [here](https://process-scheduler-endev.vercel.app/).

## Definition

This simulator manages processes with different states:

- **READY**: The process is ready to be executed.
- **RUNNING**: The process is currently executing on the CPU.
- **BLOCKED**: The process is waiting for an event to be resolved (e.g., an I/O operation).
- **COMPLETED**: The process has finished executing.

Additionally, the simulator has its own state:

- **STOPPED**: The simulator is stopped and no processes are running.
- **RUNNING**: The simulator is running and processes are being managed.
- **PAUSED**: The simulator is paused and process execution is temporarily halted.

### Process Queues

- **Ready Queue**: Contains processes in READY state, waiting to be executed.
- **Blocked Queue**: Contains processes in BLOCKED state, waiting for an event to be resolved.

Additionally, the simulator has a list of completed processes:

- **Completed Processes List**: Contains processes that have finished execution and are in COMPLETED state.

### Preemptive Algorithms

- **Priority Scheduling:** Assigns a priority to each process, and the CPU always attends to the process with the highest priority. If a higher priority process arrives, the current process is interrupted.
- **Round Robin:** Each process receives a fixed amount of time (quantum) to execute. If the process doesn't finish within this time, it moves to the end of the queue and another process takes control.
- **Shortest Remaining Time First (SRTF):** A variation of SJF where the process with the shortest remaining execution time is always selected, even if it interrupts the currently executing process.

### Non-Preemptive Algorithms

- **First Come, First Served (FCFS):** Processes are executed in the order they arrive, without interruptions.
- **Priority Scheduling:** Similar to the preemptive version, but once a process begins execution, it cannot be interrupted.
- **Random Scheduling:** Randomly selects a process from the ready queue for execution.
- **Shortest Job First (SJF):** Executes the process with the shortest estimated execution time first, without interrupting ongoing processes.

### Blocked Process Handling

To simulate I/O operations, when generating random processes, if the **burst time** is greater than 5, an **I/O burst** time is assigned. When the process reaches half of its execution, it blocks to "simulate disk writing". Once unblocked, it is reinserted into the ready queue and resumes execution according to the active scheduling algorithm at the next context switch.

Blocked processes are stored in a **Blocked Queue**, which manages their transitions back to the ready queue after completing I/O.

## Configuration

The simulator allows adjusting the following parameters:

### General Parameters

- **Clock speed**: Defines the time for each simulator clock tick.
- **Initial number of processes**: Determines how many processes are generated at simulation start.
- **Maximum CPU burst duration**: Sets the upper limit for process execution time on the CPU.
- **Maximum blocked wait time**: Controls how long a process can remain in the blocked queue before retrying execution.
- **Maximum number of concurrent processes**: Defines how many processes can exist in the system simultaneously.

### Scheduling Algorithm Configuration

- **Quantum**: (For Round Robin) Defines the number of ticks before a process must yield the CPU.
- **Priority type**: (For priority scheduling) Can be static or dynamic.
- **SJF mode**: Allows selecting whether the algorithm is preemptive or non-preemptive.

### Process Configuration

- **Random process generation**: Enables or disables automatic creation of new processes during simulation.
- **Burst time range**: Defines minimum and maximum values for process duration.
- **Blocking probability**: Determines how frequently a process enters the BLOCKED state.
- **Maximum wait time in the ready queue**: Adjusts how long a process can wait before being prioritized for execution.

## Statistics

During simulation, the following metrics are collected:

- **Average waiting time**
- **CPU utilization**
- **Total execution time**
- **Total number of executed processes**
- **Average blocked time**
- **Number of context switches**

## Project Structure

The project is divided into two parts:

1. **Graphical Interface (Frontend):** Built with Next.js to visualize scheduling algorithms. The user interface runs on the client and is composed of [Tailwind CSS](https://tailwindcss.com/) and [shadcn/ui](https://ui.shadcn.com/) components.
2. **Simulation Logic (Backend):** Manages processes and executes scheduling algorithms.

## User Interface

The simulator features an interactive interface that displays process execution details in real-time. The main interface elements include:

- **Control Panel:** Allows pausing and resuming execution, selecting scheduling algorithms, and adjusting configurations.
- **Processing Status:** Shows current CPU status and number of blocked and ready processes.
- **Performance Metrics:** Displays CPU usage, total ticks, total processes, and average execution statistics.
- **Process Control Table:** Lists all active processes with details such as priority, state, burst time, remaining time, wait time, and response time.

![Simulator Screenshot](docs/simulator.png)

## Simulator Library

All simulator-related logic is located in `./src/libs`. The project uses TypeScript, with type definitions stored in `./src/lib/types.ts`.

The simulator is based on a **Base Simulator** class, with each algorithm having a child class that inherits the base functionality. Each child class only implements the process scheduler and a method to sort the ready queue. Additionally, the **Simulator** class uses a `notify` function to inform the user interface about changes, ensuring real-time synchronization.

## Getting Started

To run the project locally:
