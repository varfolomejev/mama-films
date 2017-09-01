module.exports = function (db) {
    
    var Film = {
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
        count: function(callback){
            db.get("SELECT COUNT(*) as count FROM films", [], callback);
        },
        getOne: function (params, callback) {
            console.log('getOne', params);
            db.get("SELECT * FROM films WHERE name LIKE ?", [params.name], callback);
        },
        create: function (object, callback) {
            db.run("INSERT INTO films (name) VALUES ($name)", {$name: object.name}, callback);
        }
    };

    Film.prepare();

    return Film;
}
