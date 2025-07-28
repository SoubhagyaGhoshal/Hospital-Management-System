import React, { useState, useEffect } from "react";
import {
  BreadcrumbNavbar,
  Navbar,
} from "../../../../../component/DoctorNavbar";
import useFetchData from "../../../../../hooks/useFetchData";
import useDeleteItem from "../../../../../hooks/useDeleteItem";
import { AllPharmacy, deletePharmacy } from "../../../../../Api/PharmacyApi";
import MedicineTable from "./MedicineTable"; // ✅ Fixed typo
import UpdateMedicineModal from "./UpdateMedicineModel";
import { useDispatch } from "react-redux";
import { setUpdateId } from "../../../../../Redux/slices/SidebarSlice";

function MedicineList() {
  const { data: Pharmacy, loading, error, refetch } = useFetchData(AllPharmacy);
  const [search, setSearch] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [filteredPharmacy, setFilteredPharmacy] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setFilteredPharmacy(Pharmacy || []); // ✅ Prevents errors if Pharmacy is undefined
  }, [Pharmacy]);

  const handleSearch = (e) => {
    const query = e.target.value.trim().toLowerCase();
    setSearch(query);

    if (!query) {
      setFilteredPharmacy(Pharmacy || []);
      return;
    }

    const filtered = (Pharmacy || []).filter((pharmacy) =>
      [
        pharmacy.name?.toLowerCase(),
        pharmacy.companyname?.toLowerCase(),
        pharmacy.category?.toLowerCase(),
        String(pharmacy.price),
        String(pharmacy.stock),
      ].some((field) => field?.includes(query))
    );

    setFilteredPharmacy(filtered);
  };
  const { deleteItem } = useDeleteItem(deletePharmacy, "Medicine Deleted!");

  const updateMedicine = (id) => {
    dispatch(setUpdateId(id));
    setShowUpdateModal(true);
  };

  const breadcrumbItems = [{ label: "Medicine List", page: "Medicine" }];

  return (
    <>
      <BreadcrumbNavbar items={breadcrumbItems} />

      <div className="bg-[#232b3e] text-[#96a2b4] min-h-screen p-4">
        <Navbar
          search={search}
          handleSearch={handleSearch}
          name="Medicine"
          Doctors={filteredPharmacy}
          AddButton={false}
        />

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading Pharmacy: {error.message}</p>
        ) : (
          <MedicineTable
            Medicine={filteredPharmacy}
            deleteMedicine={(id) => deleteItem(id, setFilteredPharmacy)}
            updateMedicine={updateMedicine}
          /> // ✅ Fixed typo
        )}

        {showUpdateModal && (
          <UpdateMedicineModal
            onClose={() => setShowUpdateModal(false)}
            reload={refetch}
          />
        )}
      </div>
    </>
  );
}

export default MedicineList;
