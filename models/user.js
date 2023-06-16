const db = require('../db/db');

class User {

  static register(username, hashedPassword) {
    return db.one(`INSERT INTO users (username, password) 
    VALUES ($1, $2) RETURNING *`, [username, hashedPassword])
  }

  static findByUsername(username) {
    return db.oneOrNone('SELECT * FROM users WHERE username = $1', [username])
  }

  static findById(id) {
    return db.one('SELECT * FROM users WHERE id = $1', [id])
  }
}

module.exports = User