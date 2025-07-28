export const validateFields = (fields, setError) => {
  for (const [key, value] of Object.entries(fields)) {
    if (!value) {
      setError(`Please enter ${key.replace(/([A-Z])/g, " $1").toLowerCase()}.`);
      return false;
    }
  }
  return true;
};
