"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookingStepperProps {
  currentStep: number;
  steps: string[];
}

export function BookingStepper({ currentStep, steps }: BookingStepperProps) {
  return (
    <div className="flex items-center justify-between w-full px-2 sm:px-0">
      {steps.map((label, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  "flex size-8 sm:size-10 items-center justify-center rounded-full border-2 text-xs sm:text-sm font-semibold transition-colors",
                  isCompleted &&
                    "border-sky-600 bg-sky-600 text-white",
                  isActive &&
                    "border-sky-600 bg-white text-sky-600",
                  !isCompleted &&
                    !isActive &&
                    "border-gray-300 bg-white text-gray-400"
                )}
              >
                {isCompleted ? <Check className="size-4 sm:size-5" /> : index + 1}
              </div>
              <span
                className={cn(
                  "text-[10px] sm:text-xs font-medium whitespace-nowrap",
                  isActive ? "text-sky-600" : isCompleted ? "text-sky-600" : "text-gray-400"
                )}
              >
                {label}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-1 sm:mx-3 mt-[-1.25rem]",
                  isCompleted ? "bg-sky-600" : "bg-gray-300"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
