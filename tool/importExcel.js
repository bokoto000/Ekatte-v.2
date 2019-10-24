const fs = require('fs');
const Excel = require("exceljs");
const pool = require("./config/dbConfig");


var argsStrings = process.argv.slice(2);
let args = [];
for (let i = 0; i < argsStrings.length; i++) {
    const name = argsStrings[i].split(":")[0];
    const arg = argsStrings[i].split(":")[0];
    args[name] = arg;
}

const fileNameToTable = { "Ek_atte": "selista", "Ek_obl": "oblasti", "Ek_obst": "obstini" };

var getFileName = function (str) {
    return str.split('\\').pop().split('/').pop();
}

readExcel = (filepath) => {
    const excel = fs.realpathSync(filepath, { encoding: 'utf8' });
    const name = getFileName(excel);
    const worksheetName = name.split('.')[0];
    const fieldRowNumber = 1;

    let dataRowNumber = 2;
    if (worksheetName == "Ek_atte") dataRowNumber = 3;

    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile(excel)
        .then(function () {
            var worksheet = workbook.getWorksheet(worksheetName);
            const fieldRow = worksheet.getRow(fieldRowNumber);
            let fields = [];
            for (let i = 1; ; i++) {
                if (fieldRow.getCell(i).value == null) break;
                fields[i] = fieldRow.getCell(i).value;
                console.log(fieldRow.getCell(i).value);
            }
            fields.shift();
            if (worksheetName == "Ek_atte") {
                const obstinaIndex = fields.indexOf("obstina") + 1;
                const oblastIndex = fields.indexOf("oblast") + 1;
                sqlfields = fields.slice(0, 3);
                const sql = "INSERT INTO " + fileNameToTable[worksheetName] + "(" + sqlfields.toString() + ",obstina_id,oblast_id) ";
                worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
                    if (rowNumber >= dataRowNumber) {
                        //console.log(row.values.toString());
                        const obstina= row.values[obstinaIndex];
                        const oblast = row.values[oblastIndex];
                        let values = " VALUES (";
                        row.values = row.values.slice(0, 5);
                        for (let i = 1; i < row.values.length - 1; i++) {
                            values += "'" + row.values[i] + "',";
                        }
                        let obstina_id, oblast_id;
                        pool.query(`SELECT obstini.id as obstina_id,obstina FROM obstini WHERE obstina='${obstina}'`, (error, results) => {
                            if (error) {
                                throw error
                            } else {
                                const data = results.rows;
                                data.forEach(row => {
                                    obstina_id = row.obstina_id;
                                })
                                pool.query(`SELECT oblasti.id as oblast_id,oblast FROM oblasti WHERE oblast='${oblast}'`, (error, results) => {
                                    if (error) {
                                        throw error
                                    } else {
                                        const data = results.rows;
                                        //console.log("OK");
                                        data.forEach(row => {
                                            oblast_id = row.oblast_id;
                                        })
                                        values += obstina_id+","+oblast_id + ");";
                                        console.log(sql+values);
                                        pool.query(sql+values, (error, results) => {
                                            if (error) {
                                                throw error
                                            } else {
                                                const data = results.rows;
                                                //console.log("OK");
                                                data.forEach(row => {
                                                    oblast_id = row.oblast_id;
                                                })
                                                console.log(obstina_id+" "+oblast_id);
                                            }
                                        })
                                        console.log(obstina_id+" "+oblast_id);
                                    }
                                })
                            }
                        })/*
                        values += row.values[row.values.length - 1] - 1 + ");";
                        console.log(sql + values);
                        pool.query(sql + values, (error, results) => {
                            if (error) {
                                throw error
                            }
                        })*/
                    }
                });
            }
            else {
                const sql = "INSERT INTO " + fileNameToTable[worksheetName] + "(id," + fields.toString() + ") ";
                worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
                    if (rowNumber >= dataRowNumber) {
                        //console.log(row.values.toString());
                        let values = " VALUES ( DEFAULT,"
                        for (let i = 1; i < row.values.length - 1; i++) {
                            values += "'" + row.values[i] + "',";
                        }
                        values += row.values[row.values.length - 1] - 1 + ");";
                        pool.query(sql + values, (error, results) => {
                            if (error) {
                                throw error
                            }
                        })

                    }
                });
            }

        });
}

readExcel('E:\\Projects\\Ekatte\\tool\\Ek_atte.xlsx');
