import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Process } from "@/lib/types";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { SimulatorProcesses } from "./processes";

type SimulatorMonitorProps = {
  queueReadyProcesses: Process[];
  queueBlockedProcesses: Process[];
  listCompletedProcesses: Process[];
};

export function SimulatorMonitor({
  queueReadyProcesses,
  queueBlockedProcesses,
  listCompletedProcesses,
}: SimulatorMonitorProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center">
            {queueReadyProcesses.length}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 items-center">
          <p className="text-center">Queue Ready Processes</p>
          <Dialog>
            <DialogTrigger className="text-sm cursor-pointer">
              More Details
            </DialogTrigger>
            <DialogContent className="sm:max-w-screen-2xl">
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
            {queueBlockedProcesses.length}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 items-center">
          <p className="text-center">Queue Blocked Processes</p>
          <Dialog>
            <DialogTrigger className="text-sm cursor-pointer">
              More Details
            </DialogTrigger>
            <DialogContent className="sm:max-w-screen-2xl">
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
            {listCompletedProcesses.length}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 items-center">
          <p className="text-center">List Completed Processes</p>
          <Dialog>
            <DialogTrigger className="text-sm cursor-pointer">
              More Details
            </DialogTrigger>
            <DialogContent className="sm:max-w-screen-2xl">
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
