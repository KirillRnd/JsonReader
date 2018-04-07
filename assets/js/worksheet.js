
function createXLSXsheet(json,e) {
/* create a new blank workbook */
var wb = XLSX.utils.book_new();
var ws = XLSX.utils.json_to_sheet(json);
XLSX.utils.book_append_sheet(wb, ws, "Table");

XLSX.writeFile(wb, e+".xlsx");
}
