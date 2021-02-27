var GoogleSpreadsheet = require('google-spreadsheet').GoogleSpreadsheet;
var excelColumnName = require('excel-column-name');
var ProtoPost = require("protopost");

var PORT = parseInt(process.env.PORT || "80");
var API_KEY = process.env.API_KEY;

function a1torowcol(a1)
{
  var col = a1.match(/[A-Za-z]+/)[0];
  var row = a1.match(/\d+/)[0];

  col = excelColumnName.excelColToInt(col) - 1;
  row = parseInt(row) - 1;

  return [row, col];
}

async function getCells(docID, sheetIndex, cellRange)
{
  var doc = new GoogleSpreadsheet(docID);
  doc.useApiKey(API_KEY);

  await doc.loadInfo(); // loads document properties and worksheets

  //TODO: maybe support sheetsByTitle?
  var sheet = doc.sheetsByIndex[sheetIndex];
  await sheet.loadCells(cellRange);

  var range = cellRange.split(":");
  var [row_start, col_start] = a1torowcol(range[0]);
  var [row_end, col_end] = a1torowcol(range[1]);

  var rows = [];
  for(var iRow = row_start; iRow < row_end + 1; iRow++)
  {
    var row = [];
    for(var iCol = col_start; iCol < col_end + 1; iCol++)
    {
      row.push(sheet.getCell(iRow, iCol).value);
    }
    rows.push(row);
  }

  return rows;
}

var api = new ProtoPost({}, async (data) => await getCells(data.doc, data.sheet, data.range)).start(PORT, "/");
