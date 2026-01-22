import { useState, useCallback } from "react";
import { calculateDefaultDates } from "../utils/mockValidation";

const createEmptyPerson = (id) => ({
  id,
  anrede: null,
  titlePrefix: "",
  lastName: "",
  firstName: "",
  titleSuffix: "",
  birthDate: "",
  companyName: "",
});

const { startDate, endDate } = calculateDefaultDates();

const initialFormState = {
  // Step 2
  forwardingType: null,

  // Step 3
  validFrom: startDate,
  validUntil: endDate,

  // Step 4
  persons: [createEmptyPerson(1)],

  // Step 5
  oldAddress: {
    street: "",
    houseNumber: "",
    doorNumber: "",
    plz: "",
    city: "",
  },

  // Step 6
  newAddress: {
    type: "address",
    careOf: "",
    street: "",
    houseNumber: "",
    doorNumber: "",
    plz: "",
    city: "",
  },

  // Step 7
  mailTypes: {
    pakete: false,
    express: false,
  },
};

export const useFormState = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [currentStep, setCurrentStep] = useState(1);

  const updateFormData = useCallback((field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const updateNestedFormData = useCallback((parent, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  }, []);

  const updatePerson = useCallback((personId, field, value) => {
    setFormData((prev) => ({
      ...prev,
      persons: prev.persons.map((p) =>
        p.id === personId ? { ...p, [field]: value } : p
      ),
    }));
  }, []);

  const addPerson = useCallback(() => {
    setFormData((prev) => {
      if (prev.persons.length >= 5) return prev;
      const newId = Math.max(...prev.persons.map((p) => p.id)) + 1;
      return {
        ...prev,
        persons: [...prev.persons, createEmptyPerson(newId)],
      };
    });
  }, []);

  const removePerson = useCallback((personId) => {
    setFormData((prev) => ({
      ...prev,
      persons: prev.persons.filter((p) => p.id !== personId),
    }));
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, 8));
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const goToStep = useCallback((step) => {
    setCurrentStep(step);
  }, []);

  const resetForm = useCallback(() => {
    const { startDate, endDate } = calculateDefaultDates();
    setFormData({
      ...initialFormState,
      validFrom: startDate,
      validUntil: endDate,
      persons: [createEmptyPerson(1)],
    });
    setCurrentStep(1);
  }, []);

  return {
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
  };
};
