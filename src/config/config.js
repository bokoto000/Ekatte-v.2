const pool = require("./dbConfig");
const fs = require("fs");

module.exports = async (app) => {
    var sql = fs.readFileSync(__dirname+'\\init_database.sql').toString();
    pool.query(sql, (error, results) => {
        if (error) {
            throw error
        }
    });
    require('./routersConfig')(app, pool);
}