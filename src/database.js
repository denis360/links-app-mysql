const mysql = require('mysql');
const { promisify } = require('util');

const { database } = require('./keys.js')

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code == 'PROTOCOL_CONNECTION_LOST') {
      console.log('DB connection was closed')
    }
    if (err.code == 'ER_CON_COUNT_ERROR') {
      console.log('DB has to many connections')
    }
    if (err.code == 'ENCONREFUSED') {
      console.log('DB connection was refused')
    }
  }
  if (connection) {
    console.log('DB is connected')
  }
  return;
});

// promisify Pool querys
pool.query = promisify(pool.query)

module.exports = pool;

