const pool = require("./dbConfig");
const bodyParser = require("body-parser");
const fs = require("fs");

module.exports = async (app) => {
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

    var sql = fs.readFileSync(__dirname+'/init_database.sql').toString();
    pool.query(sql, (error, results) => {
        if (error) {
            throw error
        }
        console.log("DB Initialized");
    });
    require('./routersConfig')(app, pool);
}