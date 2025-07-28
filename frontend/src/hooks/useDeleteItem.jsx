import { useState } from "react";

const useDeleteItem = (deleteFunction, successMessage) => {
  const [loading, setLoading] = useState(false);

  const deleteItem = async (id, setItems) => {
    if (!id) return;

    try {
      setLoading(true);
      await deleteFunction(id);
      alert(successMessage);

      // ✅ Remove deleted item from state
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setLoading(false);
    }
  };

  return { deleteItem, loading };
};

export default useDeleteItem;
