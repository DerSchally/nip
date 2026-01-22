// FAKE VALIDATION - Always succeeds after a delay
// This is just to show loading states and UX flow

export const validateForm = async (formData) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Always return success for demo
  return {
    valid: true,
    formNumber: `NID-${Date.now().toString().slice(-8)}`,
  };
};

export const validatePLZ = async (plz) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  // Just check if it's 4 digits
  return /^\d{4}$/.test(plz);
};

// Mock "working days" calculation - just adds days, ignores real logic
export const calculateDefaultDates = () => {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() + 7); // +7 days

  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + 3); // +3 months

  return { startDate, endDate };
};
