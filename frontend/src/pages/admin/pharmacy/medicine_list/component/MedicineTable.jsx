import React from "react";
import { MdOutlineDateRange } from "react-icons/md";
import DeleteButton from "../../../../../component/Table/components/DeleteButton";
import TableHeader from "../../../../../component/Table/components/TableHeader";
import TableCell from "../../../../../component/Table/components/TableCell";
import TableCellWithIcon from "../../../../../component/Table/components/TableCellWithIcon";
import { format } from "date-fns";
import { BsCurrencyRupee } from "react-icons/bs";
import EditButton from "../../../../../component/Table/components/EditButton";

function MadicineTable({ Medicine, deleteMedicine, updateMedicine }) {
  let no = 0;
  const columns = [
    "No",
    "Name",
    "Category",
    "Company Name",
    "Price",
    "Purchase Date",
    "Expire Date",
    "Stock",
    "Action",
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1000px] bg-[#1a202e] text-[#96a2b4] text-sm">
        <TableHeader columns={columns} />

        <tbody className="border-b-[0.5px] border-[#96a2b4] text-[#96a2b4]">
          {Medicine?.length > 0 ? (
            Medicine?.map((medicine) => (
              <tr
                key={medicine.id}
                className="hover:bg-gray-600 transition">
                <TableCell className="">{(no += 1)}</TableCell>
                <TableCell>{medicine.name || "Medicine Name"}</TableCell>
                <TableCell>{medicine?.category} </TableCell>
                <TableCell>{medicine.companyname || "N/A"}</TableCell>
                <TableCellWithIcon
                  Icon={BsCurrencyRupee}
                  text={medicine.price}
                  iconClass="text-[#4caf50]"
                />
                <TableCellWithIcon
                  Icon={MdOutlineDateRange}
                  text={
                    medicine.purchasedate
                      ? format(new Date(medicine?.purchasedate), "dd-MM-yyyy")
                      : "N/A"
                  }
                  iconClass="text-[#795548]"
                />
                <TableCellWithIcon
                  Icon={MdOutlineDateRange}
                  text={
                    medicine.expiredate
                      ? format(new Date(medicine?.expiredate), "dd-MM-yyyy")
                      : "N/A"
                  }
                  iconClass="text-[#795548]"
                />
                <TableCell>{medicine.stock}</TableCell>

                <div className="flex p-2 gap-2">
                  <EditButton onClick={() => updateMedicine(medicine.id)} />
                  <DeleteButton onClick={() => deleteMedicine(medicine.id)} />
                </div>
              </tr>
            ))
          ) : (
            <tr>
              <TableCell
                colSpan="9"
                className="text-center p-4">
                No medicines found.
              </TableCell>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MadicineTable;
