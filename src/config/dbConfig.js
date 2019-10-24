const Pool = require('pg').Pool
const pool = new Pool({
  user:  process.env.DBUserId || 'postgres',
  host:  process.env.DBCON || 'localhost',
  database: process.env.DBNAME || 'ekatte',
  password: process.env.DBPASS || 'admin',
  port: process.env.DBPORT || '5432',
})

module.exports = pool;