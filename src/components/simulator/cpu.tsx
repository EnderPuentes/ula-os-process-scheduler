import { Process, SimulatorState } from "@/lib/types";
import { PauseIcon, PlayIcon, RefreshCwIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

type SimulatorCpuProps = {
  state: SimulatorState;
  cpuUsage: number;
  currentProcess: Process | null;
  start: () => void;
  pause: () => void;
  reset: () => void;
  resume: () => void;
};

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

export function SimulatorCpu({
  state,
  cpuUsage,
  currentProcess,
  start,
  pause,
  reset,
  resume,
}: SimulatorCpuProps) {
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
        <div className="flex flex-row gap-2">
          <Button
            className="cursor-pointer flex flex-row gap-2"
            onClick={() => {
              if (state === SimulatorState.STOPPED) {
                start();
              } else if (state === SimulatorState.RUNNING) {
                pause();
              } else if (state === SimulatorState.PAUSED) {
                resume();
              }
            }}
          >
            {state === SimulatorState.RUNNING ? (
              <>
                <PauseIcon className="w-4 h-4" />
                <span>Pause</span>
              </>
            ) : state === SimulatorState.PAUSED ? (
              <>
                <PlayIcon className="w-4 h-4" />
                <span>Resume</span>
              </>
            ) : (
              <>
                <PlayIcon className="w-4 h-4" />
                <span>Start</span>
              </>
            )}
          </Button>

          <Button
            variant="outline"
            className="cursor-pointer"
            disabled={state !== SimulatorState.PAUSED}
            onClick={reset}
          >
            <RefreshCwIcon className="w-4 h-4" />
          </Button>
        </div>
        <Separator />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-2xl font-bold">
              <Badge className="text-3xl py-2 px-4" variant="outline">
                {cpuUsage.toFixed(2)}%
              </Badge>
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
          </>
        )}
      </CardContent>
    </Card>
  );
}
