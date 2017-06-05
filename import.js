const fs = require('fs');
const os = require('os');

const config = require('./config/config');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(config.dbName);
const Film = require('./models/Film')(db);

fs.readFile('./films.txt', (err, buffer) => {
    if (err) throw err;
    let arr = buffer.toString().split( os.EOL );
    for(let i = 0; i < arr.length; i++){
        if(arr[i].length){
            Film.create({name: arr[i]}, function () {
                console.log('added');
            });
        }
    }
});