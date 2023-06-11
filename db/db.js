const pgp = require('pg-promise')();
const db = pgp({
  user: 'wf',
  password: '09',
  host: 'localhost', // or your database host
  port: 5432, // or your database port
  database: 'image-caption',
});

module.exports = db;