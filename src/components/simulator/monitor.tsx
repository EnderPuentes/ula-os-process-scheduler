import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Process, SimulatorState } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { SimulatorProcesses } from "./processes";

type SimulatorMonitorProps = {
  simulatorState: SimulatorState;
  queueReadyProcesses: Process[];
  queueBlockedProcesses: Process[];
  listCompletedProcesses: Process[];
  cpu: {
    usage: number;
    currentProcess: Process | null;
  };
};

export function SimulatorMonitor({
  simulatorState,
  queueReadyProcesses,
  queueBlockedProcesses,
  listCompletedProcesses,
  cpu,
}: SimulatorMonitorProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center">
            {queueBlockedProcesses.length}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 items-center">
          <p className="text-center">Queue Blocked Processes</p>
          <Dialog>
            <DialogTrigger
              disabled={simulatorState !== SimulatorState.RUNNING}
              className="text-sm cursor-pointer"
            >
              More Details
            </DialogTrigger>
            <DialogContent className="sm:max-w-screen-2xl">
              <SimulatorProcesses
                title="Queue Blocked Processes"
                processes={queueBlockedProcesses}
              />
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center">
            {queueReadyProcesses.length}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 items-center">
          <p className="text-center">Queue Ready Processes</p>
          <Dialog>
            <DialogTrigger
              disabled={simulatorState !== SimulatorState.RUNNING}
              className="text-sm cursor-pointer"
            >
              More Details
            </DialogTrigger>
            <DialogContent className="sm:max-w-screen-2xl">
              <SimulatorProcesses
                title="Queue Ready Processes"
                processes={queueReadyProcesses}
              />
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center">
            {cpu.usage > 0 ? `${cpu.usage.toFixed(2)}%` : "INACTIVE"}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 items-center">
          <p className="text-center">CPU Usage</p>
          <Dialog>
            <DialogTrigger
              disabled={simulatorState !== SimulatorState.RUNNING}
              className="text-sm cursor-pointer"
            >
              More Details
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>CPU - Current Process</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-4">
                {cpu.currentProcess ? (
                  <>
                    <p>
                      <span className="font-bold">Id:</span>{" "}
                      {cpu.currentProcess.id}
                    </p>
                    <p>
                      <span className="font-bold">Priority:</span>{" "}
                      {cpu.currentProcess.priority}
                    </p>
                    <p>
                      <span className="font-bold">State:</span>{" "}
                      {cpu.currentProcess.state}
                    </p>
                    <p>
                      <span className="font-bold">Arrival:</span>{" "}
                      {cpu.currentProcess.arrivalTick}
                    </p>
                    <p>
                      <span className="font-bold">Burst:</span>{" "}
                      {cpu.currentProcess.burstTick}
                    </p>
                    <p>
                      <span className="font-bold">Remaining:</span>{" "}
                      {cpu.currentProcess.remainingTick}
                    </p>
                    <p>
                      <span className="font-bold">Burst Io:</span>{" "}
                      {cpu.currentProcess.burstIoTick}
                    </p>
                    <p>
                      <span className="font-bold">Remaining Io:</span>{" "}
                      {cpu.currentProcess.remainingIoTick}
                    </p>
                    <p>
                      <span className="font-bold">Waiting:</span>{" "}
                      {cpu.currentProcess.waitingTick}
                    </p>
                  </>
                ) : (
                  <p className="text-center">No current process running</p>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center">
            {listCompletedProcesses.length}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 items-center">
          <p className="text-center">List Completed Processes</p>
          <Dialog>
            <DialogTrigger
              disabled={simulatorState !== SimulatorState.RUNNING}
              className="text-sm cursor-pointer"
            >
              More Details
            </DialogTrigger>
            <DialogContent className="sm:max-w-screen-2xl">
              <SimulatorProcesses
                title="List Completed Processes"
                processes={listCompletedProcesses}
              />
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
