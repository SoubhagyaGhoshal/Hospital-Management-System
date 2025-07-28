import { useState } from "react";

const useFloatingLabel = () => {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(value.length > 0);
  const handleChange = (e) => setValue(e.target.value);

  return { value, isFocused, handleFocus, handleBlur, handleChange };
};

export default useFloatingLabel;
