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
  processes: Process[];
};

export function SimulatorProcessControl({ processes }: ProcessControlProps) {
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
    <div className="flex flex-col gap-4 w-full py-4">
      <h1 className="text-2xl font-bold">Process Control</h1>
      <Card>
        <CardHeader>
          <CardTitle>History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Process</TableHead>
                <TableHead>Arrival Time</TableHead>
                <TableHead>Burst Time</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>State</TableHead>
                <TableHead>Remaining Time</TableHead>
                <TableHead>Waiting Time</TableHead>
                <TableHead>Turnaround Time</TableHead>
                <TableHead>Response Time</TableHead>
                <TableHead>Blocking Time</TableHead>
                <TableHead>Completion Time</TableHead>
                <TableHead>Remaining I/O Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processes.map((process: Process) => (
                <TableRow key={process.id}>
                  <TableCell>{process.id}</TableCell>
                  <TableCell>{process.arrivalTime}</TableCell>
                  <TableCell>{process.burstTime}</TableCell>
                  <TableCell>{process.priority}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(getStateStyles(process.state), "text-xs")}
                    >
                      {process.state}
                    </Badge>
                  </TableCell>
                  <TableCell>{process.remainingTime}</TableCell>
                  <TableCell>{process.waitingTime}</TableCell>
                  <TableCell>{process.turnaroundTime}</TableCell>
                  <TableCell>{process.responseTime}</TableCell>
                  <TableCell>{process.blockingTime}</TableCell>
                  <TableCell>{process.completionTime}</TableCell>
                  <TableCell>{process.remainingIoTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
