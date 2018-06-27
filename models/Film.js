module.exports = function (db) {
	const Film = {
		prepare: function () {
			db.run("CREATE TABLE IF NOT EXISTS films (" +
				"id INTEGER PRIMARY KEY AUTOINCREMENT," +
				"name VARCHAR(255) NOT NULL," +
				"CONSTRAINT unique_name UNIQUE (name)" +
				")")
		},
		getAll: function (callback) {
			db.all("SELECT * FROM films ORDER BY name ASC LIMIT 20", [], callback);
		},
		find: function (name, callback) {
			let params = {$name: name + '%'};
			db.all("SELECT * FROM films WHERE name LIKE $name ORDER BY name ASC LIMIT 20", params, callback);
		},
		count: function (callback) {
			db.get("SELECT COUNT(*) as count FROM films", [], callback);
		},
		getOne: function (params, callback) {
			db.get("SELECT * FROM films WHERE name LIKE ?", [params.name], callback);
		},
		create: function (object, callback) {
			db.run("INSERT INTO films (name) VALUES ($name)", {$name: object.name}, callback);
		},
		deleteOne: function (params, callback) {
			console.log(params);
			db.get("DELETE FROM films WHERE id = ?", [params.id], callback);
		},
	};

	Film.prepare();

	return Film;
}
