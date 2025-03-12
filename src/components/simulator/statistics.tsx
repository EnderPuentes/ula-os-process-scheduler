import { Statistics } from "@/lib/types";
import { Card, CardContent } from "../ui/card";

type SimulatorStatisticsProps = {
  statistics: Statistics;
};

export function SimulatorStatistics({ statistics }: SimulatorStatisticsProps) {
  return (
    <Card>
      <CardContent className="grid grid-cols-7 gap-4 text-center">
        <div className="flex flex-col gap-2">
          <span className="text-2xl font-bold">
            {statistics.cpuUsage.toFixed(2)}%
          </span>
          <span className="text-xs font-semibold opacity-50">CPU Usage</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-2xl font-bold">{statistics.totalTicks}</span>
          <span className="text-xs font-semibold opacity-50">Total Ticks</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-2xl font-bold">{statistics.totalTime} ms</span>
          <span className="text-xs font-semibold opacity-50">Total Time</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-2xl font-bold">
            {statistics.totalProcesses}
          </span>
          <span className="text-xs font-semibold opacity-50">
            Total Processes
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-2xl font-bold">
            {statistics.averageWaitingTicks.toFixed(2)}
          </span>
          <span className="text-xs font-semibold opacity-50">
            Average Waiting Ticks
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-2xl font-bold">
            {statistics.averageBlockingTicks.toFixed(2)}
          </span>
          <span className="text-xs font-semibold opacity-50">
            Average Blocking Ticks
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-2xl font-bold">
            {statistics.averageExecutionTicks.toFixed(2)}
          </span>
          <span className="text-xs font-semibold opacity-50">
            Average Execution Ticks
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
