import React from 'react';
import { Calendar } from 'lucide-react';

interface DateRangeSelectorProps {
  startTime: string;
  endTime: string;
  duration: number; // in months
  onStartTimeChange: (value: string) => void;
  onEndTimeChange: (value: string) => void;
  onDurationChange: (months: number) => void;
}

export function DateRangeSelector({
  startTime,
  endTime,
  duration,
  onStartTimeChange,
  onEndTimeChange,
  onDurationChange,
}: DateRangeSelectorProps) {
  const handleDurationSelect = (years: number) => {
    const months = years * 12;
    onDurationChange(months);
    if (startTime) {
      const start = new Date(startTime);
      const end = new Date(start);
      end.setMonth(end.getMonth() + months);
      onEndTimeChange(end.toISOString().slice(0, 16));
    }
  };

  const handleStartTimeChange = (value: string) => {
    onStartTimeChange(value);
    if (value && duration) {
      const start = new Date(value);
      const end = new Date(start);
      end.setMonth(end.getMonth() + duration);
      onEndTimeChange(end.toISOString().slice(0, 16));
    }
  };

  return (
    <div className="space-y-4">
      {/* Duration Selector */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-purple-200">Staking Duration</label>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5, 6].map((years) => (
            <button
              key={years}
              onClick={() => handleDurationSelect(years)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${duration === years * 12
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-900/50 text-purple-300 hover:bg-purple-800'}`}
            >
              {years} year{years > 1 ? 's' : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Date Pickers */}
      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400" />
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => handleStartTimeChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-purple-900/30 border border-purple-700 rounded-lg
                     text-purple-100 placeholder-purple-500 focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400" />
          <input
            type="datetime-local"
            value={endTime}
            disabled
            className="w-full pl-10 pr-4 py-2 bg-purple-900/50 border border-purple-700 rounded-lg
                     text-purple-400 cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
}
