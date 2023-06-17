const db = require('../db/db')

class Photo {

	static getAll() {
		return db.any('SELECT * FROM photos;')
	}

	static getById(id) {
		return db.one('SELECT * FROM photos WHERE id = $1', [id])
	}

	static create(url, name, description) {
		const query = `INSERT INTO photos (url, name, description)
		VALUES ($1, $2, $3) RETURNING *;`
		return db.one(query, [url, name, description])
	}

	static update(id, url, name, description) {
		const query = `UPDATE photos SET url = $1, 
		name = $2, description = $3 WHERE id = $4 RETURNING *;`
		return db.one(query, [url, name, description, id])
	}

	static delete(id) {
		return db.none('DELETE FROM photos WHERE id = $1', [id])
	}
}

module.exports = Photo