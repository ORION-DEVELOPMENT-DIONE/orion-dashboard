import { useState, useEffect } from 'react';
import { GradientButton } from '../GradientButton';

interface StakingDurationStepProps {
  startDate: Date;
  endDate: Date;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StakingDurationStep({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onNext,
  onBack,
}: StakingDurationStepProps) {
  const [duration, setDuration] = useState(1); // Default duration: 1 year

  // Initialize start date as current date + 1 minute
  useEffect(() => {
    const initialStartDate = new Date();
    initialStartDate.setMinutes(initialStartDate.getMinutes() + 3);
    onStartDateChange(initialStartDate);

    // Set initial end date based on default duration (1 year)
    const initialEndDate = new Date(initialStartDate);
    initialEndDate.setFullYear(initialEndDate.getFullYear() + duration);
    onEndDateChange(initialEndDate);
  }, [onStartDateChange, onEndDateChange]);

  // Update end date when duration changes
  useEffect(() => {
    const newEndDate = new Date(startDate);
    newEndDate.setFullYear(newEndDate.getFullYear() + duration);
    onEndDateChange(newEndDate);
  }, [duration, startDate, onEndDateChange]);

  return (
    <div className="space-y-6 p-6 bg-gradient-to-r from-purple-900 to-purple-700 rounded-xl shadow-md">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">Staking Duration</h2>
        <p className="text-gray-300 mt-2">
          Choose how long you want to stake your tokens. Longer staking periods may offer better rewards.
        </p>
      </div>

      {/* Slider Control */}
      <div className="mt-6">
        <label htmlFor="duration-slider" className="block text-gray-300 font-medium mb-2">
          Select Duration: {duration} {duration === 1 ? 'year' : 'years'}
        </label>
        <input
          id="duration-slider"
          type="range"
          min={1}
          max={6}
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value, 10))}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
        <div className="flex justify-between text-gray-400 text-sm mt-2">
          <span>1 Year</span>
          <span>6 Years</span>
        </div>
      </div>

      {/* Start and End Dates */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label htmlFor="start-date" className="block text-gray-300 mb-1">Start Date</label>
          <input
            id="start-date"
            type="datetime-local"
            value={startDate.toISOString().slice(0, 16)}
            readOnly
            className="w-full p-2 rounded-lg bg-gray-700 text-gray-200"
          />
        </div>
        <div>
          <label htmlFor="end-date" className="block text-gray-300 mb-1">End Date</label>
          <input
            id="end-date"
            type="datetime-local"
            value={endDate.toISOString().slice(0, 16)}
            readOnly
            className="w-full p-2 rounded-lg bg-gray-700 text-gray-200"
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        <GradientButton variant="secondary" onClick={onBack}>
          Back
        </GradientButton>
        <GradientButton onClick={onNext}>
          Next
        </GradientButton>
      </div>
    </div>
  );
}
