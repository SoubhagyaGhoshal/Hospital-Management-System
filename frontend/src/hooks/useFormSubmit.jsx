import { useState } from "react";

const useFormSubmit = (apiFunction, setError, successMessage) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData, callback) => {
    setLoading(true);
    try {
      const response = await apiFunction(formData);
      if (response) {
        alert(successMessage || "Form Submit successful!");
        if (callback) callback(); // Optional callback (e.g., refresh data)
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { handleSubmit, loading };
};

export default useFormSubmit;
