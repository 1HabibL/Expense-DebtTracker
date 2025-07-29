import * as XLSX from 'xlsx';

// Export any array of objects to Excel
export function exportToExcel(dataArray, filename = "exported_data.xlsx", sheetName = "Sheet1") {
  const worksheet = XLSX.utils.json_to_sheet(dataArray);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, filename);
}