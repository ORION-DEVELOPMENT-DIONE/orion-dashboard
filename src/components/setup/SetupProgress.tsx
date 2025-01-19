interface SetupProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function SetupProgress({ currentStep, totalSteps }: SetupProgressProps) {
  const progressPercentage = Math.floor((currentStep / totalSteps) * 100);

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center text-gray-300 text-sm">
        <span>Step {currentStep} of {totalSteps}</span>
        <span>{progressPercentage}%</span>
      </div>
      <div className="relative w-full h-2 bg-gray-700 rounded-full mt-2">
        <div
          style={{ width: `${progressPercentage}%` }}
          className="absolute h-full bg-[#9d4edd] rounded-full"
        ></div>
      </div>
    </div>
  );
}
