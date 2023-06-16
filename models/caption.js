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

  static getByUser(user_id) {
    const query = `SELECT photos.id, photos.name AS photo, 
    captions.title, captions.caption FROM captions
    LEFT JOIN users ON users.id = captions.user_id
    LEFT JOIN photos ON captions.photo_id = photos.id
    WHERE users.id = $1
    ORDER BY photos.id;`
    return db.manyOrNone(query, [user_id])
  }
}

module.exports = Caption