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

function App() {
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
