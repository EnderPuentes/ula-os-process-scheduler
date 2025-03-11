import { SimulatorAlgorithm, SimulatorState } from "@/lib/types";
import { PauseIcon, PlayIcon, RefreshCwIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type SimulatorControlProps = {
  state: SimulatorState;
  start: () => void;
  pause: () => void;
  reset: () => void;
  resume: () => void;
  simulatorAlgorithm: SimulatorAlgorithm;
  onChangeSimulatorAlgorithm: (algorithm: SimulatorAlgorithm) => void;
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

export function SimulatorControl({
  state,
  start,
  pause,
  reset,
  resume,
  simulatorAlgorithm,
  onChangeSimulatorAlgorithm,
}: SimulatorControlProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">Control</CardTitle>
          <Badge className={`text-sm ${getStateBadgeColor(state)}`}>
            {state}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Select
          disabled={state !== SimulatorState.STOPPED}
          value={simulatorAlgorithm}
          onValueChange={(value) => {
            onChangeSimulatorAlgorithm(value as SimulatorAlgorithm);
          }}
        >
          <SelectTrigger className="w-full border rounded-md shadow-sm">
            <SelectValue placeholder="Select an algorithm" />
          </SelectTrigger>
          <SelectContent className="mt-1 w-full rounded-md shadow-lg">
            {Object.values(SimulatorAlgorithm).map((alg) => (
              <SelectItem
                key={alg}
                value={alg}
                className="cursor-pointer hover:bg-gray-100"
              >
                {alg}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
      </CardContent>
    </Card>
  );
}
