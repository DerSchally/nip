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

// Date calculations per Pflichtenheft:
// - Gültig ab: Heute + 7 Kalendertage (default)
// - Gültig bis: Gültig ab + 3 Monate - 1 Kalendertag (default)
export const calculateDefaultDates = () => {
  const today = new Date();
  
  // Gültig ab: today + 7 calendar days
  const startDate = new Date(today);
  startDate.setDate(today.getDate() + 7);

  // Gültig bis: startDate + 3 months - 1 day
  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + 3);
  endDate.setDate(endDate.getDate() - 1); // -1 KT per Pflichtenheft

  return { startDate, endDate };
};
