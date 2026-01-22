import { Check } from "lucide-react";
import { steps } from "../../data/mockData";

export const StepIndicator = ({ currentStep, onStepClick }) => {
  return (
    <div className="bg-white border-b border-post-gray-200">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;

            return (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => isCompleted && onStepClick(step.id)}
                  disabled={!isCompleted}
                  className={`
                    flex items-center gap-2 transition-all duration-200
                    ${isCompleted ? "cursor-pointer" : "cursor-default"}
                  `}
                >
                  <div
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                      transition-all duration-200
                      ${
                        isCompleted
                          ? "bg-post-green text-white"
                          : isCurrent
                            ? "bg-post-yellow text-post-black"
                            : "bg-post-gray-200 text-post-gray-400"
                      }
                    `}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <span>{step.id}</span>
                    )}
                  </div>
                  <span
                    className={`
                      hidden sm:block text-sm font-medium
                      ${
                        isCurrent
                          ? "text-post-black"
                          : isCompleted
                            ? "text-post-green"
                            : "text-post-gray-400"
                      }
                    `}
                  >
                    {step.shortName}
                  </span>
                </button>

                {index < steps.length - 1 && (
                  <div
                    className={`
                      hidden sm:block w-8 h-0.5 mx-2
                      ${isCompleted ? "bg-post-green" : "bg-post-gray-200"}
                    `}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
