import { Button } from "@/components/ui/button";

type NavigationBtnProps = {
  currentStep: number;
  prev: () => void;
  next: () => Promise<void>;
};
const NavigationBtn = ({ currentStep, next, prev }: NavigationBtnProps) => {
  return (
    <div className="mt-8 pt-5">
      <div className="flex justify-between">
        <Button
          type="button"
          size="icon"
          onClick={prev}
          disabled={currentStep === 0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </Button>

        <Button type="button" size="icon" onClick={next}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default NavigationBtn;
