import { Process, ProcessState } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type ProcessControlProps = {
  title: string;
  processes: Process[];
};

export function SimulatorProcesses({ title, processes }: ProcessControlProps) {
  const getStateStyles = (state: ProcessState) => {
    switch (state) {
      case ProcessState.RUNNING:
        return "bg-green-500 text-white";
      case ProcessState.READY:
        return "bg-blue-500 text-white";
      case ProcessState.BLOCKED:
        return "bg-red-500 text-white";
      case ProcessState.COMPLETED:
        return "bg-purple-500 text-white";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="overflow-auto w-full">
        <div className="overflow-auto max-h-[calc(100vh-250px)] max-w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Process</TableHead>
                <TableHead className="text-center">Arrival Tick</TableHead>
                <TableHead className="text-center">Burst Tick</TableHead>
                <TableHead className="text-center">Priority</TableHead>
                <TableHead className="text-center">State</TableHead>
                <TableHead className="text-center">Remaining Tick</TableHead>
                <TableHead className="text-center">Waiting Tick</TableHead>
                <TableHead className="text-center">Turnaround Tick</TableHead>
                <TableHead className="text-center">Response Tick</TableHead>
                <TableHead className="text-center">Blocking Tick</TableHead>
                <TableHead className="text-center">Completion Tick</TableHead>
                <TableHead className="text-center">Execution Count</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processes.length > 0 ? (
                processes.map((process: Process) => (
                  <TableRow key={process.id}>
                    <TableCell className="text-center">{process.id}</TableCell>
                    <TableCell className="text-center">
                      {process.arrivalTick}
                    </TableCell>
                    <TableCell className="text-center">
                      {process.burstTick}
                    </TableCell>
                    <TableCell className="text-center">
                      {process.priority}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        className={cn(getStateStyles(process.state), "text-xs")}
                      >
                        {process.state}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {process.remainingTick}
                    </TableCell>
                    <TableCell className="text-center">
                      {process.waitingTick}
                    </TableCell>
                    <TableCell className="text-center">
                      {process.turnaroundTick}
                    </TableCell>
                    <TableCell className="text-center">
                      {process.responseTick}
                    </TableCell>
                    <TableCell className="text-center">
                      {process.blockingTick}
                    </TableCell>
                    <TableCell className="text-center">
                      {process.completionTick}
                    </TableCell>
                    <TableCell className="text-center">
                      {process.executionCount}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={12} className="text-center">
                    No processes
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
