import useFloatingLabels from "../useFlotingLabel.jsx"; // Adjust the import path as needed

const usePharmacyFields = () => {
  const fields = [
    "name",
    "category",
    "companyname",
    "purchasedate",
    "price",
    "expiredate",
    "stock",
  ];

  return useFloatingLabels(fields);
};

export default usePharmacyFields;
