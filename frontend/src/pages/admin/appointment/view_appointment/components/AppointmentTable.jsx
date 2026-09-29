import React from "react";
import { MdOutlineDateRange } from "react-icons/md";
import DeleteButton from "../../../../../component/Table/components/DeleteButton";
import TableHeader from "../../../../../component/Table/components/TableHeader";
import TableCell from "../../../../../component/Table/components/TableCell";
import TableCellWithIcon from "../../../../../component/Table/components/TableCellWithIcon";
import { format } from "date-fns";
import { HiPhone } from "react-icons/hi";
import BadgeCell from "../../../../../component/Table/components/BadgeCell";
import { IoMdTime } from "react-icons/io";

function AppointmentTable({ Appointment, deleteAppointment }) {
  const columns = [
    "Name",
    "Gender",
    "Mobile",
    "Injury",
    "Doctor",
    "Time",
    "Date",
    "Action",
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1000px] bg-[#1a202e] text-[#96a2b4] text-sm">
        <TableHeader columns={columns} />

        <tbody className="border-b-[0.5px] border-[#96a2b4] text-[#96a2b4]">
          {Appointment?.length > 0 ? (
            Appointment?.map((appointment) => (
              <tr
                key={appointment.id}
                className="hover:bg-gray-600 transition">
                <TableCell className="p-4 flex gap-2 items-center">
                  <img
                    src={appointment.patientImg || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3E%3Ccircle cx='15' cy='15' r='15' fill='%2396a2b4'/%3E%3Ccircle cx='15' cy='12' r='5' fill='%231a202e'/%3E%3Cpath d='M5 25c0-5.5 4.5-10 10-10s10 4.5 10 10' fill='%231a202e'/%3E%3C/svg%3E"}
                    className="w-[30px] h-[30px] rounded-full"
                    alt="Appointment Patient Img"
                    onError={(e) => {
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3E%3Ccircle cx='15' cy='15' r='15' fill='%2396a2b4'/%3E%3Ccircle cx='15' cy='12' r='5' fill='%231a202e'/%3E%3Cpath d='M5 25c0-5.5 4.5-10 10-10s10 4.5 10 10' fill='%231a202e'/%3E%3C/svg%3E";
                    }}
                  />
                  {`${appointment.firstName || ""} ${appointment.lastName || ""}`.trim() || "Patient"}
                </TableCell>
                <BadgeCell
                  text={appointment?.gender || "N/A"}
                  conditions={{
                    Male: "bg-[#1A2F34] text-[#198754] font-medium",
                    Female: "text-[#6B41BA] bg-[#272544]",
                  }}
                />
                <TableCellWithIcon
                  Icon={HiPhone}
                  text={appointment.mobile || "N/A"}
                  iconClass="text-[#4caf50]"
                />
                <TableCell>{appointment.injury || "N/A"}</TableCell>
                <TableCell>{appointment.doctorName || "N/A"}</TableCell>

                <TableCellWithIcon
                  Icon={IoMdTime}
                  text={appointment.time_of_appointment || "N/A"}
                  iconClass="text-[#4caf50]"
                />

                <TableCellWithIcon
                  Icon={MdOutlineDateRange}
                  text={
                    appointment.date_of_appointment
                      ? format(
                          new Date(appointment?.date_of_appointment),
                          "dd-MM-yyyy"
                        )
                      : "N/A"
                  }
                  iconClass="text-[#795548]"
                />
                <TableCell>
                  <DeleteButton
                    onClick={() => deleteAppointment(appointment.id)}
                  />
                </TableCell>
              </tr>
            ))
          ) : (
            <tr>
              <TableCell
                colSpan="9"
                className="text-center p-4">
                No appointments found.
              </TableCell>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentTable;
