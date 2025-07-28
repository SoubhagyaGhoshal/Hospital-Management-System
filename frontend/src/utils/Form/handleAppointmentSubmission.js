export const handleSubmission = async ({
  e,
  formState,
  setLoading,
  validateFields,
  handleSubmit,
  setError,
}) => {
  e.preventDefault();
  setLoading(true);

  // Validate form fields
  const isValid = validateFields(formState, setError);
  if (!isValid) {
    setLoading(false);
    return;
  }

  // Submit form data
  await handleSubmit(formState);
};
