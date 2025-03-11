"use client";

import {
  SimulatorAlgorithm,
  SimulatorConfig,
  SimulatorState,
} from "@/lib/types";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Slider } from "../ui/slider";

type SliderControlProps = {
  label: string;
  value: number;
  min?: number;
  max: number;
  step?: number;
  disabled?: boolean;
  onChange: (value: number) => void;
};

const SliderControl = ({
  label,
  onChange,
  value,
  ...props
}: SliderControlProps) => (
  <div className="flex flex-col gap-2">
    <Label className="text-sm font-medium">{label}</Label>
    <Slider
      {...props}
      value={[value]}
      onValueChange={(val) => onChange(val[0])}
      className="w-full"
    />
    <p className="text-sm">{value}</p>
  </div>
);

interface SimulatorConfigurationProps {
  config: SimulatorConfig;
  updateConfig: (config: SimulatorConfig) => void;
  simulatorState: SimulatorState;
  simulatorAlgorithm: SimulatorAlgorithm;
}

export function SimulatorConfiguration({
  config,
  updateConfig,
  simulatorState,
  simulatorAlgorithm,
}: SimulatorConfigurationProps) {
  // Processes
  const [maxInitialProcesses, setMaxInitialProcesses] = useState(
    config.processes.maxInitialProcesses
  );
  const [maxBurstTick, setMaxBurstTick] = useState(
    config.processes.maxBurstTick
  );
  const [maxPriority, setMaxPriority] = useState(config.processes.maxPriority);
  const [percentArrivalNewProcess, setPercentArrivalNewProcess] = useState(
    config.processes.percentArrivalNewProcess
  );

  // CPU
  const [tickSpeed, setTickSpeed] = useState(config.cpu.tickSpeed);
  const [quantum, setQuantum] = useState(config.cpu.quantum);

  return (
    <Card className="p-4 rounded-lg">
      <CardHeader className="p-0">
        <CardTitle className="text-xl font-bold">Configuration</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-0">
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">CPU</h2>
          <SliderControl
            label="Tick Speed (ms)"
            value={tickSpeed}
            min={100}
            max={5000}
            step={100}
            disabled={simulatorState !== SimulatorState.STOPPED}
            onChange={(value) => {
              setTickSpeed(value);
              updateConfig({
                ...config,
                cpu: { ...config.cpu, tickSpeed: value },
              });
            }}
          />
          {simulatorAlgorithm === SimulatorAlgorithm.EXPULSIVE_ROUND_ROBIN && (
            <SliderControl
              label="Quantum"
              value={quantum}
              min={1}
              max={20}
              disabled={simulatorState !== SimulatorState.STOPPED}
              onChange={(value) => {
                setQuantum(value);
                updateConfig({
                  ...config,
                  cpu: { ...config.cpu, quantum: value },
                });
              }}
            />
          )}
        </div>
        <Separator />
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Processes</h2>
          <SliderControl
            label="Max Priority"
            value={maxPriority}
            min={1}
            max={10}
            disabled={simulatorState !== SimulatorState.STOPPED}
            onChange={(value) => {
              setMaxPriority(value);
              updateConfig({
                ...config,
                processes: { ...config.processes, maxPriority: value },
              });
            }}
          />
          <SliderControl
            label="Max Burst Tick"
            value={maxBurstTick}
            min={1}
            max={20}
            disabled={simulatorState !== SimulatorState.STOPPED}
            onChange={(value) => {
              setMaxBurstTick(value);
              updateConfig({
                ...config,
                processes: { ...config.processes, maxBurstTick: value },
              });
            }}
          />
          <SliderControl
            label="Max Initial Processes"
            value={maxInitialProcesses}
            min={1}
            max={100}
            disabled={simulatorState !== SimulatorState.STOPPED}
            onChange={(value) => {
              setMaxInitialProcesses(value);
              updateConfig({
                ...config,
                processes: { ...config.processes, maxInitialProcesses: value },
              });
            }}
          />
          <SliderControl
            label="Percent Arrival New Process"
            value={percentArrivalNewProcess}
            min={0}
            max={100}
            disabled={simulatorState !== SimulatorState.STOPPED}
            onChange={(value) => {
              setPercentArrivalNewProcess(value);
              updateConfig({
                ...config,
                processes: {
                  ...config.processes,
                  percentArrivalNewProcess: value,
                },
              });
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
