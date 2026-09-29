import React from "react";
import { MdOutlineDateRange } from "react-icons/md";
import { format } from "date-fns";
import {
  DeleteButton,
  TableCell,
  TableCellWithIcon,
  TableHeader,
} from "../../../../../component/Table";
import DoctorAvatar from "../../../../../component/DoctorAvatar";

function DoctorTable({ doctors, deleteDoctor }) {
  const columns = [
    "Name",
    "Department",
    "Designation",
    "Gender",
    "Mobile No.",
    "Address",
    "Education",
    "DOB",
    "Actions",
  ];

  return (
    <div className="overflow-x-auto bg-[#1a202e] rounded-lg shadow-lg">
      <table className="w-full min-w-[1000px] text-[#96a2b4] text-sm border-collapse">
        <TableHeader columns={columns} />

        <tbody className="border-b-[0.5px] border-[#96a2b4] text-[#96a2b4]">
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <tr
                key={doctor.id}
                className="hover:bg-gray-600 transition border-b border-[#96a2b4]/20">
                <TableCell className="p-4 min-w-[200px]">
                  <DoctorAvatar doctor={doctor} size={35} showTitle={true} />
                </TableCell>
                <TableCell className="p-4 min-w-[120px]">
                  <span className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded text-xs">
                    {doctor.department}
                  </span>
                </TableCell>
                <TableCell className="p-4 min-w-[120px]">{doctor.designation || "N/A"}</TableCell>
                <TableCell className="p-4 min-w-[80px]">
                  <span className={`px-2 py-1 rounded text-xs ${
                    doctor.gender === "Male" 
                      ? "bg-blue-600/20 text-blue-400" 
                      : "bg-pink-600/20 text-pink-400"
                  }`}>
                    {doctor.gender}
                  </span>
                </TableCell>
                <TableCell className="p-4 min-w-[120px]">{doctor.mobile || "N/A"}</TableCell>
                <TableCell className="p-4 min-w-[150px] max-w-[200px] truncate" title={doctor.address}>
                  {doctor.address || "N/A"}
                </TableCell>
                <TableCell className="p-4 min-w-[100px]">{doctor.education || "N/A"}</TableCell>
                <TableCellWithIcon
                  Icon={MdOutlineDateRange}
                  text={
                    doctor.birth
                      ? format(new Date(doctor?.birth), "dd-MM-yyyy")
                      : "N/A"
                  }
                  iconClass="text-[#795548]"
                  className="p-4 min-w-[100px]"
                />
                <TableCell className="p-4 text-center min-w-[80px]">
                  <DeleteButton onClick={() => deleteDoctor(doctor.id)} />
                </TableCell>
              </tr>
            ))
          ) : (
            <tr>
              <TableCell
                colSpan="9"
                className="text-center p-4">
                No doctors found.
              </TableCell>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DoctorTable;
