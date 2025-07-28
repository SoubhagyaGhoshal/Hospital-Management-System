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
                    src={appointment.patientImg}
                    className="w-[30px] h-[30px] rounded-full"
                    alt="Appointment Patient Img"
                  />
                  {appointment.firstName + " " + appointment.lastName ||
                    "Patient"}
                </TableCell>
                <BadgeCell
                  text={appointment?.gender}
                  conditions={{
                    Male: "bg-[#1A2F34] text-[#198754] font-medium",
                    Female: "text-[#6B41BA] bg-[#272544]",
                  }}
                />
                <TableCellWithIcon
                  Icon={HiPhone}
                  text={appointment.mobile}
                  iconClass="text-[#4caf50]"
                />
                <TableCell>{appointment.injury || "N/A"}</TableCell>
                <TableCell>{appointment.doctorName}</TableCell>

                <TableCellWithIcon
                  Icon={IoMdTime}
                  text={appointment.time_of_appointment}
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
