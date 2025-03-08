"use client";

import { SimulatorAlgorithm, SimulatorConfig } from "@/lib/types";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Slider } from "../ui/slider";

interface ProcessSchedulerConfigurationProps {
  config: SimulatorConfig;
  updateConfig: (config: SimulatorConfig) => void;
}

const SliderControl = ({
  label,
  value,
  onChange,
  max,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  max: number;
}) => (
  <div className="flex flex-col gap-2">
    <Label className="text-sm font-medium text-gray-700">{label}</Label>
    <Slider
      min={0}
      max={max}
      value={[value]}
      onValueChange={(val) => onChange(val[0])}
      className="w-full"
    />
    <p className="text-sm text-gray-500">{value}</p>
  </div>
);

export function ProcessSchedulerConfiguration({
  config,
  updateConfig,
}: ProcessSchedulerConfigurationProps) {
  const [maxBurstTime, setMaxBurstTime] = useState(
    config.processes.maxBurstTime
  );
  const [maxPriority, setMaxPriority] = useState(config.processes.maxPriority);
  const [maxArrivalTime, setMaxArrivalTime] = useState(
    config.processes.maxArrivalTime
  );
  const [quantum, setQuantum] = useState(config.algorithm.quantum);
  const [algorithm, setAlgorithm] = useState(config.algorithm);
  const [tickSpeed, setTickSpeed] = useState(config.processor.tickSpeed);

  const handleAlgorithmChange = (value: SimulatorAlgorithm) => {
    setAlgorithm({ type: value, quantum: algorithm.quantum });
    updateConfig({
      ...config,
      algorithm: { type: value, quantum: algorithm.quantum },
    });
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="text-lg font-bold">Configuration</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid grid-row-2 gap-4">
          <Card className="p-4 bg-white shadow-md rounded-lg w-full">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">
                Algorithm
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={algorithm.type}
                onValueChange={(value) =>
                  handleAlgorithmChange(value as SimulatorAlgorithm)
                }
              >
                <SelectTrigger className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                  <SelectValue placeholder="Select an algorithm" />
                </SelectTrigger>
                <SelectContent className="mt-1 w-full rounded-md bg-white shadow-lg">
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
              {algorithm.type === SimulatorAlgorithm.ROUND_ROBIN && (
                <SliderControl
                  label="Quantum"
                  value={quantum}
                  max={50}
                  onChange={(value) => {
                    setQuantum(value);
                    updateConfig({
                      ...config,
                      algorithm: { ...algorithm, quantum: value },
                    });
                  }}
                />
              )}
            </CardContent>
          </Card>
          <Card className="p-4 bg-white shadow-md rounded-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">
                Processor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SliderControl
                label="Tick Speed (ms)"
                value={tickSpeed}
                max={5000}
                onChange={(value) => {
                  setTickSpeed(value);
                  updateConfig({
                    ...config,
                    processor: { ...config.processor, tickSpeed: value },
                  });
                }}
              />
            </CardContent>
          </Card>
        </div>
        <Card className="p-4 bg-white shadow-md rounded-lg">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">
              Processes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <SliderControl
              label="Max Burst Time"
              value={maxBurstTime}
              max={500}
              onChange={(value) => {
                setMaxBurstTime(value);
                updateConfig({
                  ...config,
                  processes: { ...config.processes, maxBurstTime: value },
                });
              }}
            />
            <SliderControl
              label="Max Priority"
              value={maxPriority}
              max={10}
              onChange={(value) => {
                setMaxPriority(value);
                updateConfig({
                  ...config,
                  processes: { ...config.processes, maxPriority: value },
                });
              }}
            />
            <SliderControl
              label="Max Arrival Time"
              value={maxArrivalTime}
              max={100}
              onChange={(value) => {
                setMaxArrivalTime(value);
                updateConfig({
                  ...config,
                  processes: { ...config.processes, maxArrivalTime: value },
                });
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
