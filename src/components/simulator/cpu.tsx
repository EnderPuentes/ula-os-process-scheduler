import { Process, SimulatorState } from "@/lib/types";
import { PauseIcon, PlayIcon, RefreshCwIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

type SimulatorCpuProps = {
  state: SimulatorState;
  tick: number;
  cpuUsage: number;
  tickSpeed: number;
  currentProcess: Process | null;
  start: () => void;
  pause: () => void;
  reset: () => void;
  restart: () => void;
};

export function SimulatorCpu({
  state,
  tick,
  cpuUsage,
  tickSpeed,
  currentProcess,
  start,
  pause,
  reset,
  restart,
}: SimulatorCpuProps) {
  const getStateBadgeColor = (state: SimulatorState) => {
    switch (state) {
      case SimulatorState.RUNNING:
        return "bg-green-500 text-white";
      case SimulatorState.PAUSED:
        return "bg-yellow-500 text-black";
      case SimulatorState.STOPPED:
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getCpuUsageColor = (processorUsage: number) => {
    if (processorUsage > 90) return "bg-red-900 text-white";
    if (processorUsage > 80) return "bg-red-500 text-white";
    if (processorUsage > 70) return "bg-orange-500 text-white";
    if (processorUsage > 60) return "bg-yellow-500 text-black";
    if (processorUsage > 50) return "bg-yellow-300 text-black";
    if (processorUsage > 40) return "bg-green-500 text-white";
    if (processorUsage > 30) return "bg-green-300 text-white";
    if (processorUsage > 20) return "bg-blue-500 text-white";
    if (processorUsage > 10) return "bg-blue-300 text-white";
    return "dark:bg-white dark:text-black bg-black text-white";
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">CPU</CardTitle>
          <Badge className={`text-sm ${getStateBadgeColor(state)}`}>
            {state}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-bold">
              <Badge className={`text-3xl ${getCpuUsageColor(cpuUsage)}`}>
                {cpuUsage.toFixed(2)}%
              </Badge>
            </span>
          </div>
          <Separator />
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium opacity-50">
              Execution Time: {tick * tickSpeed} ms
            </span>
            <span className="text-xs font-medium opacity-50">
              Ticks: {tick}
            </span>
            <span className="text-xs font-medium opacity-50">
              Tick Speed: {tickSpeed} ms
            </span>
          </div>
        </div>
        {currentProcess && (
          <>
            <Separator />
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-sm">
                  <span className="font-bold">Current Process:</span>{" "}
                  {currentProcess.id}
                </span>
                <span className="text-sm">
                  <span className="font-bold">Priority:</span>{" "}
                  {currentProcess.priority}
                </span>
                <span className="text-sm">
                  <span className="font-bold">Arrival Tick:</span>{" "}
                  {currentProcess.arrivalTick}
                </span>
                <span className="text-sm">
                  <span className="font-bold">Burst Tick:</span>{" "}
                  {currentProcess.burstTick}
                </span>
                <span className="text-sm">
                  <span className="font-bold">Remaining Tick:</span>{" "}
                  {currentProcess.remainingTick}
                </span>
              </div>
            </div>
            <Separator />
          </>
        )}
        <div className="flex flex-row gap-2">
          <Button
            className="cursor-pointer"
            disabled={state === SimulatorState.RUNNING}
            onClick={() =>
              state === SimulatorState.STOPPED ? start() : restart()
            }
          >
            <PlayIcon className="w-4 h-4" />
          </Button>
          <Button
            className="cursor-pointer"
            disabled={state !== SimulatorState.RUNNING}
            onClick={pause}
          >
            <PauseIcon className="w-4 h-4" />
          </Button>
          <Button
            className="cursor-pointer"
            disabled={state !== SimulatorState.PAUSED}
            onClick={reset}
          >
            <RefreshCwIcon className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
