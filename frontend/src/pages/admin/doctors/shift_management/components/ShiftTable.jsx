import React from "react";
import { MdOutlineDateRange } from "react-icons/md";
import {
  BadgeCell,
  DeleteButton,
  EditButton,
  TableCell,
  TableCellWithIcon,
  TableHeader,
} from "../../../../../component/Table";

function ShiftTable({ doctors, deleteShift, updateShift }) {
  const columns = [
    "Name",
    "Department",
    "Specialty",
    "Shift Start Date",
    "Shift End Date",
    "Work Days",
    "Shift Hours",
    "Shift Type",
    "Availability Status",
    "Actions",
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1000px] bg-[#1a202e] text-[#96a2b4] text-sm">
        <TableHeader columns={columns} />

        <tbody className="border-b-[0.5px] border-[#96a2b4] text-[#96a2b4]">
          {doctors.length > 0 ? (
            doctors.map((doctor) =>
              doctor?.shift_management ? (
                <tr
                  key={doctor.id}
                  className="hover:bg-gray-600 transition">
                  <TableCell className="p-4 flex gap-2 items-center">
                    <img
                      src={doctor.doctorimg}
                      className="w-[30px] h-[30px] rounded-full"
                      alt="Doctor"
                    />
                    {doctor.shift_management.name || "Doctor"}
                  </TableCell>

                  <TableCell>{doctor.shift_management.department}</TableCell>
                  <TableCell>{doctor.shift_management.specialty}</TableCell>

                  <TableCellWithIcon
                    Icon={MdOutlineDateRange}
                    text={doctor?.shift_management.shiftstart}
                    iconClass="text-[#795548]"
                  />

                  <TableCellWithIcon
                    Icon={MdOutlineDateRange}
                    text={doctor?.shift_management.shiftend}
                    iconClass="text-[#795548]"
                  />

                  <TableCell>{doctor.shift_management.workday}</TableCell>
                  <TableCell>{doctor.shift_management.shifthours}</TableCell>
                  <TableCell>{doctor.shift_management.shifttype}</TableCell>

                  <TableCell>
                    <BadgeCell
                      text={doctor.shift_management.status}
                      conditions={{
                        Available: "bg-[#1A2F34] text-[#198754] font-medium",
                        "On Leave": "text-[#6B41BA] bg-[#272544]",
                        Unavailable: "text-[#fd7e14] bg-[#3C2E2A]",
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <div className="flex gap-3">
                      <EditButton
                        onClick={() => updateShift(doctor.shift_management.id)}
                      />
                      <DeleteButton
                        onClick={() => deleteShift(doctor.shift_management.id)}
                      />
                    </div>
                  </TableCell>
                </tr>
              ) : null
            )
          ) : (
            <tr>
              <TableCell
                colSpan="10"
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

export default ShiftTable;
