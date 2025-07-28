import React from "react";
import { MdOutlineDateRange } from "react-icons/md";
import { format } from "date-fns";
import {
  TableHeader,
  TableCell,
  BadgeCell,
  EditButton,
  TableCellWithIcon,
  DeleteButton,
} from "../../../../../component/Table";

function DepartmentTable({ doctors, deleteDepartment, updateDepartment }) {
  const columns = [
    "Name",
    "Department",
    "Specialty",
    "Shift Schedule",
    "Experience Level",
    "Assignment Status",
    "Assignment Date",
    "Actions",
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1000px] bg-[#1a202e] text-[#96a2b4] text-sm">
        <TableHeader columns={columns} />

        <tbody className="border-b-[0.5px] border-[#96a2b4] text-[#96a2b4]">
          {doctors.length > 0 ? (
            doctors.map((doctor) =>
              doctor?.Department ? (
                <tr
                  key={doctor.id}
                  className="hover:bg-gray-600 transition">
                  <TableCell className="p-4 flex gap-2 items-center">
                    <img
                      src={doctor.doctorimg}
                      className="w-[30px] h-[30px] rounded-full"
                      alt="Doctor"
                    />
                    {doctor.Department.doctorName || "Doctor"}
                  </TableCell>

                  <TableCell>{doctor.Department.department}</TableCell>
                  <TableCell>{doctor.Department.specialty}</TableCell>
                  <TableCell>{doctor.Department.schedule}</TableCell>
                  <TableCell>{doctor.Department.experience}</TableCell>

                  <TableCell>
                    <BadgeCell
                      text={doctor.Department.status}
                      conditions={{
                        Active: "bg-[#1A2F34] text-[#198754] font-medium",
                        Pending: "text-[#6B41BA] bg-[#272544]",
                        Inactive: "text-[#fd7e14] bg-[#3C2E2A]",
                      }}
                    />
                  </TableCell>

                  <TableCellWithIcon
                    Icon={MdOutlineDateRange}
                    text={
                      doctor?.Department.assignedDate
                        ? format(
                            new Date(doctor?.Department?.assignedDate),
                            "dd-MM-yyyy"
                          )
                        : "N/A"
                    }
                    iconClass="text-[#795548]"
                  />

                  <TableCell className="">
                    <div className="flex gap-3">
                      <EditButton
                        onClick={() => updateDepartment(doctor.Department.id)}
                      />
                      <DeleteButton
                        onClick={() => deleteDepartment(doctor.Department.id)}
                      />
                    </div>
                  </TableCell>
                </tr>
              ) : null
            )
          ) : (
            <tr>
              <TableCell
                colSpan="8"
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

export default DepartmentTable;
