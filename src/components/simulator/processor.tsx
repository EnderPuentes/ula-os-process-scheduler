import { Process, SimulatorState } from "@/lib/types";
import { PauseIcon, PlayIcon, RefreshCwIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

type SimulatorProcessorProps = {
  state: SimulatorState;
  tick: number;
  tickSpeed: number;
  currentProcess: Process | null;
  start: () => void;
  pause: () => void;
  reset: () => void;
  restart: () => void;
};

export function SimulatorProcessor({
  state,
  tick,
  tickSpeed,
  currentProcess,
  start,
  pause,
  reset,
  restart,
}: SimulatorProcessorProps) {
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

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">Processor</CardTitle>
          <Badge className={`text-sm ${getStateBadgeColor(state)}`}>
            {state}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <span className="text-2xl font-bold">{tick} ticks</span>
            {tickSpeed > 0 && (
              <span className="text-xs font-medium">
                ({tick * tickSpeed} ms)
              </span>
            )}
            <span className="text-xs font-medium opacity-50">
              Execution Time: {tick * tickSpeed} ms
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
