import { Statistics } from "@/lib/types";
import { Card, CardContent } from "../ui/card";

type SimulatorStatisticsProps = Statistics;

export function SimulatorStatistics({
  totalTicks,
  averageWaitingTime,
  averageBlockingTime,
  averageExecutionTime,
  totalProcesses,
  totalTime,
}: SimulatorStatisticsProps) {
  return (
    <Card>
      <CardContent className="grid grid-cols-6 gap-4 text-center">
        <div className="flex flex-col gap-2">
          <span className="text-2xl font-bold">{totalTicks}</span>
          <span className="text-sm font-semibold opacity-50">Total Ticks</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-2xl font-bold">{totalTime} ms</span>
          <span className="text-sm font-semibold opacity-50">Total Time</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-2xl font-bold">{totalProcesses}</span>
          <span className="text-sm font-semibold opacity-50">
            Total Processes
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-2xl font-bold">
            {averageWaitingTime.toFixed(2)} ticks
          </span>
          <span className="text-sm font-semibold opacity-50">
            Average Waiting Time
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-2xl font-bold">
            {averageBlockingTime.toFixed(2)} ticks
          </span>
          <span className="text-sm font-semibold opacity-50">
            Average Blocking Time
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-2xl font-bold">
            {averageExecutionTime.toFixed(2)} ticks
          </span>
          <span className="text-sm font-semibold opacity-50">
            Average Execution Time
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
