import { useState } from "react";
import { Layout } from "./components/layout";
import {
  ServiceSelection,
  ForwardingType,
  ValidityPeriod,
  PersonData,
  OldAddress,
  NewAddress,
  MailTypes,
  Summary,
} from "./components/steps";
import { useFormState } from "./hooks/useFormState";

const PASSWORD = "post2025";

function PasswordGate({ onSuccess }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === PASSWORD) {
      sessionStorage.setItem("nid-auth", "true");
      onSuccess();
    } else {
      setError(true);
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-post-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="bg-post-yellow w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-post-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-post-black">NID Prototype</h1>
          <p className="text-post-gray-600 mt-1">Bitte Passwort eingeben</p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            placeholder="Passwort"
            className={`
              w-full px-4 py-3 rounded-md border transition-colors duration-200
              ${error ? "border-post-red" : "border-post-gray-200"}
              focus:border-post-yellow focus:ring-1 focus:ring-post-yellow outline-none
            `}
            autoFocus
          />
          {error && (
            <p className="text-post-red text-sm mt-2">Falsches Passwort</p>
          )}
          <button
            type="submit"
            className="w-full mt-4 px-6 py-3 rounded-md font-medium bg-post-yellow text-post-black hover:bg-yellow-400 transition-all duration-200"
          >
            Einloggen
          </button>
        </form>
      </div>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem("nid-auth") === "true"
  );

  const {
    formData,
    currentStep,
    updateFormData,
    updateNestedFormData,
    updatePerson,
    addPerson,
    removePerson,
    nextStep,
    prevStep,
    goToStep,
    resetForm,
  } = useFormState();

  if (!isAuthenticated) {
    return <PasswordGate onSuccess={() => setIsAuthenticated(true)} />;
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <ServiceSelection onNext={nextStep} />;

      case 2:
        return (
          <ForwardingType
            value={formData.forwardingType}
            onChange={(val) => updateFormData("forwardingType", val)}
            onNext={nextStep}
            onBack={prevStep}
          />
        );

      case 3:
        return (
          <ValidityPeriod
            validFrom={formData.validFrom}
            validUntil={formData.validUntil}
            onChangeFrom={(val) => updateFormData("validFrom", val)}
            onChangeUntil={(val) => updateFormData("validUntil", val)}
            onNext={nextStep}
            onBack={prevStep}
          />
        );

      case 4:
        return (
          <PersonData
            persons={formData.persons}
            onUpdatePerson={updatePerson}
            onAddPerson={addPerson}
            onRemovePerson={removePerson}
            onNext={nextStep}
            onBack={prevStep}
          />
        );

      case 5:
        return (
          <OldAddress
            address={formData.oldAddress}
            onUpdate={(field, val) => updateNestedFormData("oldAddress", field, val)}
            onNext={nextStep}
            onBack={prevStep}
          />
        );

      case 6:
        return (
          <NewAddress
            address={formData.newAddress}
            onUpdate={(field, val) => updateNestedFormData("newAddress", field, val)}
            onNext={nextStep}
            onBack={prevStep}
          />
        );

      case 7:
        return (
          <MailTypes
            selectedTypes={formData.mailTypes}
            onUpdate={(field, val) => updateNestedFormData("mailTypes", field, val)}
            onNext={nextStep}
            onBack={prevStep}
          />
        );

      case 8:
        return (
          <Summary
            formData={formData}
            onEdit={goToStep}
            onReset={resetForm}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Layout currentStep={currentStep} onStepClick={goToStep}>
      {renderStep()}
    </Layout>
  );
}

export default App;
