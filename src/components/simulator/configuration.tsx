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
import { Separator } from "../ui/separator";
import { Slider } from "../ui/slider";

type SliderControlProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max: number;
  step?: number;
};

const SliderControl = ({
  label,
  value,
  onChange,
  min = 1,
  max,
  step = 1,
}: SliderControlProps) => (
  <div className="flex flex-col gap-2">
    <Label className="text-sm font-medium">{label}</Label>
    <Slider
      min={min}
      max={max}
      value={[value]}
      onValueChange={(val) => onChange(val[0])}
      step={step}
      className="w-full"
    />
    <p className="text-sm">{value}</p>
  </div>
);

interface SimulatorConfigurationProps {
  config: SimulatorConfig;
  updateConfig: (config: SimulatorConfig) => void;
}

export function SimulatorConfiguration({
  config,
  updateConfig,
}: SimulatorConfigurationProps) {
  // Algorithm
  const [quantum, setQuantum] = useState(config.algorithm.quantum);
  const [algorithm, setAlgorithm] = useState(config.algorithm);

  // Processes
  const [maxBurstTick, setMaxBurstTick] = useState(
    config.processes.maxBurstTick
  );
  const [maxPriority, setMaxPriority] = useState(config.processes.maxPriority);

  // Processor
  const [tickSpeed, setTickSpeed] = useState(config.processor.tickSpeed);

  return (
    <Card className="p-4 rounded-lg">
      <CardHeader className="p-0">
        <CardTitle className="text-xl font-bold">Configuration</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-0">
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Algorithm</h2>
          <Select
            value={algorithm.type}
            onValueChange={(value) => {
              setAlgorithm({ type: value as SimulatorAlgorithm, quantum });
              updateConfig({
                ...config,
                algorithm: { type: value as SimulatorAlgorithm, quantum },
              });
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
        </div>
        <Separator />
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Processor</h2>
          <SliderControl
            label="Tick Speed (ms)"
            value={tickSpeed}
            min={100}
            max={5000}
            step={100}
            onChange={(value) => {
              setTickSpeed(value);
              updateConfig({
                ...config,
                processor: { ...config.processor, tickSpeed: value },
              });
            }}
          />
        </div>
        <Separator />
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Processes</h2>
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
            label="Max Burst Tick"
            value={maxBurstTick}
            max={20}
            onChange={(value) => {
              setMaxBurstTick(value);
              updateConfig({
                ...config,
                processes: { ...config.processes, maxBurstTick: value },
              });
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
