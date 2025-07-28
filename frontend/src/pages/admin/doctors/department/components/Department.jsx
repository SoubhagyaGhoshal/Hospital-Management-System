import React, { useState, useEffect } from "react";
import {
  AllDepartmentData,
  dltDepartment,
} from "../../../../../Api/DepartmentApi";
import { useDispatch } from "react-redux";
import { setUpdateId } from "../../../../../Redux/slices/sidebarSlice";
import AddDepartmentModal from "./AddDepartment";
import UpdateDepartmentModal from "./UpadateDepartment";
import DepartmentTable from "./DepartmentTable";
import {
  BreadcrumbNavbar,
  Navbar,
} from "../../../../../component/DoctorNavbar";
import useFetchData from "../../../../../hooks/useFetchData";
import useDeleteItem from "../../../../../hooks/useDeleteItem";

function Department() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const dispatch = useDispatch();

  const {
    data: Department,
    loading: departmentLoading,
    error,
    refetch, // ✅ Use refetch to update data after changes
  } = useFetchData(AllDepartmentData);

  // ✅ Update filteredDepartments when Department data changes
  useEffect(() => {
    setFilteredDepartments(Department);
  }, [Department]);

  const { deleteItem } = useDeleteItem(dltDepartment, "Department Deleted!");

  const deleteDepartment = async (id) => {
    await deleteItem(id, setFilteredDepartments);
    await refetch();
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    const filtered = Department?.filter((dept) => {
      if (!dept) return false;
      return (
        dept.doctorName.toLowerCase().includes(query) ||
        dept.department.toLowerCase().includes(query) ||
        dept.specialty.toLowerCase().includes(query) ||
        dept.experience.toLowerCase().includes(query) ||
        dept.schedule.toLowerCase().includes(query) ||
        dept.status.toLowerCase().includes(query) ||
        dept.assignedDate.toLowerCase().includes(query)
      );
    });

    setFilteredDepartments(filtered);
  };

  const updateDepartment = (id) => {
    dispatch(setUpdateId(id));
    setShowUpdateModal(true);
  };

  const breadcrumbItems = [{ label: "Assign Department", page: "Doctors" }];

  return (
    <>
      <BreadcrumbNavbar items={breadcrumbItems} />

      <div className="bg-[#232b3e] text-[#96a2b4] min-h-screen p-4">
        {/* Department Data Table */}

        {/* Header Start */}
        <Navbar
          search={search}
          handleSearch={handleSearch}
          setShowModal={setShowModal}
          fetchDoctors={refetch}
          name={"Assign Department"}
          Doctors={filteredDepartments}
          AddButton={true}
        />
        {/* Header End */}
        <DepartmentTable
          doctors={filteredDepartments}
          deleteDepartment={(id) => deleteDepartment(id)}
          updateDepartment={updateDepartment}
        />

        {/* Add Department Modal */}
        {showModal && (
          <AddDepartmentModal
            onClose={() => setShowModal(false)}
            reload={refetch}
          />
        )}

        {/* Update Department Modal */}
        {showUpdateModal && (
          <UpdateDepartmentModal
            onClose={() => setShowUpdateModal(false)}
            reload={refetch}
          />
        )}
      </div>
    </>
  );
}

export default Department;
