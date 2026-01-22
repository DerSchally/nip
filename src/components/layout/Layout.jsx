import { Header } from "./Header";
import { StepIndicator } from "./StepIndicator";

export const Layout = ({ children, currentStep, onStepClick, showSteps = true }) => {
  return (
    <div className="min-h-screen bg-post-gray-100">
      <Header />
      {showSteps && currentStep > 1 && (
        <StepIndicator currentStep={currentStep} onStepClick={onStepClick} />
      )}
      <main className="max-w-4xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
};
