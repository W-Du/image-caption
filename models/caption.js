const db = require('../db/db')

class Caption {

  static create(photo_id, user_id, title, caption){
    const query = 
    `INSERT INTO captions (photo_id, user_id, title, caption) 
    VALUES ($1, $2, $3, $4) RETURNING *`
    return db.one(query, [photo_id, user_id, title, caption])
  }

  static getAll() {
    return db.any('SELECT * FROM captions')
  }

  static getById(caption_id) {
    return db.one(
      'SELECT * FROM captions WHERE id = $1', [caption_id])
  }

  static update(caption_id, newTitle, newCaptionText) {
    const query = 
    `UPDATE captions SET title = $1, 
    caption = $2 WHERE id = $3 RETURNING *`
    return db.one(query, [newTitle, newCaptionText, caption_id])
  }

  static delete(caption_id) {
    return db.one('DELETE FROM captions WHERE id = $1 RETURNING *', [caption_id])
  }
}

module.exports = Caption