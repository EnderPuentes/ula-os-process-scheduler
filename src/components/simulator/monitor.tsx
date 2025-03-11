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
  currentProcess: Process | null;
};

export function SimulatorMonitor({
  simulatorState,
  queueReadyProcesses,
  queueBlockedProcesses,
  listCompletedProcesses,
  currentProcess,
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
            <DialogContent className="sm:max-w-screen-2xl max-h-[calc(100vh-550px) overflow-auto">
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
            <DialogContent className="sm:max-w-screen-2xl max-h-[calc(100vh-550px) overflow-auto">
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
          <CardTitle className="text-2xl font-bold text-center">
            {currentProcess ? "ACTIVE" : "INACTIVE"}
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
                <DialogTitle className="text-center text-2xl font-bold">
                  CPU - Current Process
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-4 p-10">
                {currentProcess ? (
                  <>
                    <p>
                      <span className="font-bold">Id:</span> {currentProcess.id}
                    </p>
                    <p>
                      <span className="font-bold">Priority:</span>{" "}
                      {currentProcess.priority}
                    </p>
                    <p>
                      <span className="font-bold">State:</span>{" "}
                      {currentProcess.state}
                    </p>
                    <p>
                      <span className="font-bold">Arrival:</span>{" "}
                      {currentProcess.arrivalTick}
                    </p>
                    <p>
                      <span className="font-bold">Burst:</span>{" "}
                      {currentProcess.burstTick}
                    </p>
                    <p>
                      <span className="font-bold">Remaining:</span>{" "}
                      {currentProcess.remainingTick}
                    </p>
                    <p>
                      <span className="font-bold">Burst Io:</span>{" "}
                      {currentProcess.burstIoTick}
                    </p>
                    <p>
                      <span className="font-bold">Remaining Io:</span>{" "}
                      {currentProcess.remainingIoTick}
                    </p>
                    <p>
                      <span className="font-bold">Waiting:</span>{" "}
                      {currentProcess.waitingTick}
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
            <DialogContent className="sm:max-w-screen-2xl max-h-[calc(100vh-550px) overflow-auto">
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
