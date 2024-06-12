import { cn } from "@/lib/utils";

type StepsIndicatorProps = {
  steps: {
    id: string;
    name: string;
    fields: string[];
  }[];
  currentStep: number;
};
const StepsIndicator = ({ currentStep, steps }: StepsIndicatorProps) => {
  return (
    <div className="max-w-3xl">
      <ul className="flex gap-4">
        {steps.map((step, index) => (
          <li key={step.name} className="md:flex-1">
            <div
              className={cn(
                "group flex h-full w-full flex-col border-l-4  py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4",
                currentStep === index + 1 ? "border-sky-600" : "border-gray-200"
              )}
            >
              <span
                className={cn(
                  "text-sm font-medium  transition-colors",
                  currentStep === index + 1 ? "text-sky-600" : "text-gray-500"
                )}
              >
                {step.id}
              </span>
              <span className="text-sm font-medium">{step.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StepsIndicator;
