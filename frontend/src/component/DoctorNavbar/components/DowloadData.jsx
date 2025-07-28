import { format } from "date-fns";
import * as XLSX from "xlsx";

const handleDownloadExcel = (Doctors) => {
  if (!Doctors || Doctors.length === 0) {
    console.error("No doctor data available for download.");
    return;
  }

  const excelData = Doctors.map((doctor) => {
    let doctorData = {};

    // Merge Department and shift_management dynamically
    const source = doctor?.Department || doctor?.shift_management;
    if (source) {
      Object.keys(source).forEach((key) => {
        let value = source[key] ?? "N/A";

        // Format date fields if necessary
        if (
          ["assignedDate", "shiftstart", "shiftend"].includes(key) &&
          value !== "N/A"
        ) {
          value = format(new Date(value), "dd-MM-yyyy");
        }

        doctorData[key] = value;
      });
    }
    return doctorData;
  });

  if (excelData.length === 0) {
    console.error("No valid doctor data found.");
    return;
  }

  // Create worksheet & workbook
  const worksheet = XLSX.utils.json_to_sheet(excelData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Doctors");

  // Auto-adjust column width
  worksheet["!cols"] = Object.keys(excelData[0]).map(() => ({ wch: 20 }));

  // Save the file
  XLSX.writeFile(workbook, "Doctors.xlsx");
};

export default handleDownloadExcel;
