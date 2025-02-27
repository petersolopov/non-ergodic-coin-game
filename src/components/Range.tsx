import React from "react";
import { Config } from "./GamePage";

interface RangeProps {
  label: string;
  paramKey: keyof Config;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (key: keyof Config, value: number) => void;
}

export const Range: React.FC<RangeProps> = ({
  label,
  paramKey,
  min,
  max,
  step,
  value,
  onChange,
}) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">
          {label}: {value}
        </span>
      </div>
      <div className="flex items-center">
        <span className="text-xs text-gray-500">{min}</span>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(paramKey, parseFloat(e.target.value))}
          className="mx-2 flex-1"
        />
        <span className="text-xs text-gray-500">{max}</span>
      </div>
    </div>
  );
};
