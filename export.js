const fs = require('fs');
const os = require('os');
const config = require('./config/config');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(config.dbName);
const Film = require('./models/Film')(db);

Film.getAll(function (err, models){
    if( err ){
        console.log( err );
        return;
    }
    let arr = [];
    for(let i = 0; i < models.length; i++){
        arr.push(models[i].name);
    }
    fs.writeFile('./films.txt', arr.join(os.EOL), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
});