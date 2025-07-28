import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import usePharmacyFields from "../../../../../hooks/formhooks/InputFields/usePharmacyFormFields.jsx";
import {
  getPharmacyById,
  updatePharmacy,
} from "../../../../../Api/PharmacyApi.jsx";
import { FloatingInput } from "../../../../../utils/Form/FormUtils.jsx";

function UpdateMedicineModal({ onClose, reload }) {
  const [PharmacyFormData, setPharmacyFormData] = useState([]);
  const updateId = useSelector((state) => state.sidebar.updateId);

  const floatingLabels = usePharmacyFields();
  const {
    name,
    category,
    companyname,
    purchasedate,
    price,
    expiredate,
    stock,
  } = floatingLabels;

  useEffect(() => {
    fetchDoctorsById();
  }, []);

  const fetchDoctorsById = async () => {
    try {
      const response = await getPharmacyById(updateId);
      console.log(response);
      setPharmacyFormData(response);
    } catch (error) {
      console.error("Error fetching pharmacy by id:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: name.value || PharmacyFormData.name,
      category: category.value || PharmacyFormData.category,
      companyname: companyname.value || PharmacyFormData.companyname,
      purchasedate: purchasedate.value || PharmacyFormData.purchasedate,
      price: price.value || PharmacyFormData.value,
      expiredate: expiredate.value || PharmacyFormData.expiredate,
      stock: stock.value || PharmacyFormData.stock,
    };

    try {
      await updatePharmacy(updateId, formData);
      reload();
      onClose();
    } catch (error) {
      console.error("Error updating department:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex md:items-center justify-center p-4 overflow-x-auto h-full">
      <div className="bg-[#0c0f18] p-6 rounded-lg w-full overflow-x-auto md:max-w-[60%]">
        <h2 className="text-white text-xl font-semibold mb-2">
          Upadate Medicine
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-[#0c0f18] flex flex-col md:gap-5">
          <div>
            <div className="flex max-md:flex-col md:gap-6 w-full">
              <FloatingInput
                label="Name*"
                labelBgColor="#0c0f18"
                {...name}
              />
              <FloatingInput
                label="Category*"
                labelBgColor="#0c0f18"
                {...category}
              />
            </div>
            <div className="flex max-md:flex-col md:gap-6 w-full">
              <FloatingInput
                label="Company Name*"
                labelBgColor="#0c0f18"
                {...companyname}
              />
              <FloatingInput
                label="Purchase Date*"
                labelBgColor="#0c0f18"
                type="date"
                {...purchasedate}
              />
            </div>
            <div className="flex max-md:flex-col gap-6 w-full">
              <FloatingInput
                label="Price*"
                labelBgColor="#0c0f18"
                {...price}
              />
              <FloatingInput
                label="Expire Date*"
                labelBgColor="#0c0f18"
                type="date"
                {...expiredate}
              />
            </div>
            <div className="flex max-md:flex-col gap-6 w-full">
              <FloatingInput
                label="Stock*"
                labelBgColor="#0c0f18"
                {...stock}
              />
            </div>
          </div>
          <div className="max-md:mt-5">
            <button
              type="b"
              className="px-5 py-2 text-white bg-gray-500 rounded-4xl cursor-pointer">
              Save
            </button>
            <button
              type="button"
              className="ml-2 px-4 py-2 text-white bg-red-500 rounded-4xl cursor-pointer"
              onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateMedicineModal;
