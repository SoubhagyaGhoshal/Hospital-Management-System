import React from "react";
import { format } from "date-fns";
import { MdOutlineDateRange, MdOutlineEmail } from "react-icons/md";
import { HiPhone } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import DeleteButton from "../../../../../component/Table/components/DeleteButton";
import TableCellWithIcon from "../../../../../component/Table/components/TableCellWithIcon";
import TableCell from "../../../../../component/Table/components/TableCell";
import BadgeCell from "../../../../../component/Table/components/BadgeCell";
import TableHeader from "../../../../../component/Table/components/TableHeader";

function PatientTable({ patients, deletePatient }) {
  const columns = [
    "Name",
    "Gender",
    "Mobile",
    "Age",
    "Email",
    "Marital Status",
    "Address",
    "Birth",
    "Actions",
  ];

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[1000px] bg-[#1a202e] text-[#96a2b4] text-sm">
        <TableHeader columns={columns} />

        <tbody className="border-b-[0.5px] border-[#96a2b4] text-[#96a2b4]">
          {patients.length > 0 ? (
            patients?.map((patient) => (
              <tr
                key={patient?.id}
                className="hover:bg-gray-600 transition">
                <TableCell className="p-4 flex gap-2 items-center">
                  <img
                    src={patient?.patientImg || "/default-avatar.png"}
                    className="w-[30px] h-[30px] rounded-full"
                    alt="Patient"
                  />
                  {`${patient?.firstName || ""} ${patient?.lastName || ""}`.trim() || "Patient"}
                </TableCell>
                <BadgeCell
                  text={patient?.gender}
                  conditions={{
                    Male: "bg-[#1A2F34] text-[#198754] font-medium",
                    Female: "text-[#6B41BA] bg-[#272544]",
                  }}
                />
                <TableCellWithIcon
                  Icon={HiPhone}
                  text={patient?.mobile || "N/A"}
                  iconClass="text-[#4caf50]"
                />
                <TableCell>{patient?.age || "N/A"}</TableCell>
                <TableCellWithIcon
                  Icon={MdOutlineEmail}
                  text={patient?.email || "N/A"}
                  iconClass="text-[#F44336]"
                />
                <TableCell>{patient?.maritalStatus || "N/A"}</TableCell>
                <TableCellWithIcon
                  Icon={IoLocationOutline}
                  text={patient?.address || "N/A"}
                  iconClass="text-[#2196f3]"
                />
                <TableCellWithIcon
                  Icon={MdOutlineDateRange}
                  text={
                    patient?.birth
                      ? format(new Date(patient?.birth), "dd-MM-yyyy")
                      : "N/A"
                  }
                  iconClass="text-[#795548]"
                />
                <TableCell>
                  <DeleteButton onClick={() => deletePatient(patient?.id)} />
                </TableCell>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="9"
                className="text-center p-4">
                No Patients found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PatientTable;
