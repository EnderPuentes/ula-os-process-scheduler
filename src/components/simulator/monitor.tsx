import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Process, SimulatorState } from "@/lib/types";
import { Activity, Clock, Hash, List, Server, Zap } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { SimulatorProcesses } from "./processes";

interface InfoCardProps {
  label: string;
  value: string;
  highlight?: boolean;
  icon?: React.ReactNode;
}

function InfoCard({ label, value, highlight = false, icon }: InfoCardProps) {
  return (
    <Card className={`p-4 ${highlight ? "border-primary" : ""}`}>
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center gap-2 mb-1">
          {icon}
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </Card>
  );
}

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
          <CardTitle className="text-2xl font-bold text-center">
            {simulatorState === SimulatorState.RUNNING
              ? currentProcess
                ? "PROCESSING"
                : "IDLE"
              : simulatorState === SimulatorState.PAUSED
                ? "PAUSED"
                : "STOPPED"}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 items-center">
          <p className="text-center">CPU State</p>
          <Dialog>
            <DialogTrigger
              disabled={simulatorState !== SimulatorState.RUNNING}
              className="text-sm"
            >
              <Button variant="outline" className="cursor-pointer">
                View Current Process
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-screen-2xl max-h-[calc(100vh-550px) overflow-auto">
              <DialogHeader>
                <DialogTitle className="text-center text-2xl font-bold">
                  Current Process
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-4 p-10">
                {currentProcess ? (
                  <div className="grid grid-cols-5 gap-4 p-2">
                    <InfoCard
                      icon={<Hash className="h-4 w-4" />}
                      label="ID"
                      value={currentProcess.id.toString()}
                    />
                    <InfoCard
                      icon={<Zap className="h-4 w-4" />}
                      label="Priority"
                      value={currentProcess.priority.toString()}
                    />
                    <InfoCard
                      icon={<Activity className="h-4 w-4" />}
                      label="State"
                      value={currentProcess.state.toString()}
                      highlight
                    />
                    <InfoCard
                      icon={<Clock className="h-4 w-4" />}
                      label="Arrival Tick"
                      value={currentProcess.arrivalTick.toString()}
                    />
                    <InfoCard
                      icon={<Clock className="h-4 w-4" />}
                      label="Burst Tick"
                      value={currentProcess.burstTick.toString()}
                    />
                    <InfoCard
                      icon={<Clock className="h-4 w-4" />}
                      label="Remaining Tick"
                      value={currentProcess.remainingTick.toString()}
                      highlight
                    />
                    <InfoCard
                      icon={<Server className="h-4 w-4" />}
                      label="Burst IO Tick"
                      value={currentProcess.burstIoTick.toString()}
                    />
                    <InfoCard
                      icon={<Server className="h-4 w-4" />}
                      label="Remaining IO Tick"
                      value={currentProcess.remainingIoTick.toString()}
                      highlight
                    />
                    <InfoCard
                      icon={<Clock className="h-4 w-4" />}
                      label="Waiting Tick"
                      value={currentProcess.waitingTick.toString()}
                    />
                    <InfoCard
                      icon={<List className="h-4 w-4" />}
                      label="Execution Count"
                      value={currentProcess.executionCount.toString()}
                    />
                    {currentProcess.completionTick !== null && (
                      <InfoCard
                        icon={<Clock className="h-4 w-4" />}
                        label="Completion Tick"
                        value={currentProcess.completionTick.toString()}
                      />
                    )}
                    {currentProcess.responseTick !== null && (
                      <InfoCard
                        icon={<Clock className="h-4 w-4" />}
                        label="Response Tick"
                        value={currentProcess.responseTick.toString()}
                      />
                    )}
                    <InfoCard
                      icon={<Clock className="h-4 w-4" />}
                      label="Turnaround Tick"
                      value={currentProcess.turnaroundTick.toString()}
                    />
                    <InfoCard
                      icon={<Clock className="h-4 w-4" />}
                      label="Blocking Tick"
                      value={currentProcess.blockingTick.toString()}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center p-8">
                    <Server className="h-16 w-16 text-muted-foreground mb-4" />
                    <p className="text-center text-muted-foreground">
                      No current process running
                    </p>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
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
              className="text-sm"
            >
              <Button variant="outline" className="cursor-pointer">
                View Queue
              </Button>
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
              className="text-sm"
            >
              <Button variant="outline" className="cursor-pointer">
                View Queue
              </Button>
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
          <CardTitle className="text-4xl font-bold text-center">
            {listCompletedProcesses.length}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 items-center">
          <p className="text-center">List Completed Processes</p>
          <Dialog>
            <DialogTrigger
              disabled={simulatorState !== SimulatorState.RUNNING}
              className="text-sm"
            >
              <Button variant="outline" className="cursor-pointer">
                View List
              </Button>
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
