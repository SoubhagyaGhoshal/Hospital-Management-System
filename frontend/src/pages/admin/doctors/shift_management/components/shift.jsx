import React, { useEffect, useState } from "react";
import {
  BreadcrumbNavbar,
  Navbar,
} from "../../../../../component/DoctorNavbar";
import { AllShiftData, deleteShiftData } from "../../../../../Api/ShiftApi";
import ShiftTable from "./ShiftTable";
import AddShiftModal from "./AddShift";
import { useDispatch } from "react-redux";
import { setUpdateId } from "../../../../../Redux/slices/SidebarSlice";
import UpdateShiftModal from "./UpdateShift";
import useFetchData from "../../../../../hooks/useFetchData";
import useDeleteItem from "../../../../../hooks/useDeleteItem";

const Shift = () => {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredShift, setFilteredShift] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const dispatch = useDispatch();
  const breadcrumbItems = [{ label: "Shift Management", page: "Doctors" }];

  const {
    data: shiftData,
    loading: shiftLoading,
    error,
    refetch, // ✅ Use refetch to update data after changes
  } = useFetchData(AllShiftData);

  // ✅ Update filteredDepartments when Department data changes
  useEffect(() => {
    setFilteredShift(shiftData);
  }, [shiftData]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    const filtered = shiftData.filter((doctor) => {
      if (!doctor?.shift_management) return false;
      return (
        doctor.shift_management.name.toLowerCase().includes(query) ||
        doctor.shift_management.department.toLowerCase().includes(query)
      );
    });

    setFilteredShift(filtered);
  };

  const { deleteItem } = useDeleteItem(deleteShiftData, "Shift Deleted!");

  const deleteShift = async (id) => {
    await deleteItem(id, setFilteredShift);
    await refetch();
  };

  const UpdateModel = (id) => {
    dispatch(setUpdateId(id));
    setShowUpdateModal(true);
  };

  return (
    <>
      {/* Breadcrumb Navigation Start*/}

      <BreadcrumbNavbar items={breadcrumbItems} />

      {/* Breadcrumb Navigation End*/}

      <div className="bg-[#232b3e] text-[#96a2b4] min-h-screen p-4">
        {/* Header Start */}
        <Navbar
          search={search}
          handleSearch={handleSearch}
          setShowModal={setShowModal}
          fetchDoctors={refetch}
          name={"Shift Management"}
          Doctors={filteredShift}
          AddButton={true}
        />
        {/* Header End */}
        <ShiftTable
          doctors={filteredShift}
          deleteShift={(id) => deleteShift(id)}
          updateShift={UpdateModel}
        />

        {/* Modal Popup For Add Data Start */}

        {showModal && (
          <AddShiftModal
            onClose={() => setShowModal(false)}
            reload={refetch}
          />
        )}

        {/* Modal Popup For Add Data End */}

        {/* Modal Popup For Update Data Start */}

        {showUpdateModal && (
          <UpdateShiftModal
            onClose={() => setShowUpdateModal(false)}
            reload={refetch}
          />
        )}

        {/* Modal Popup For Update Data End */}
      </div>
    </>
  );
};

export default Shift;
