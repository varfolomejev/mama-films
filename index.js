const config = require('./config/config');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(config.dbName);
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const session = require('express-session')
const cookieParser = require('cookie-parser');
const flash = require('express-flash');

app.use( bodyParser.urlencoded({extended: true}) );
app.use( bodyParser.json() );
app.use('/assets', express.static('assets'));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(cookieParser('test'));
app.use(session({
    secret: 'secret',
    name: 'nme',
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
app.use( flash() );

const Film = require('./models/Film')(db);

app.get('/', function (req, res) {
	res.sendFile(__dirname+'/assets/index.html');
});

app.get('/search', function (req, res) {
    if(req.query && req.query.name) {
			Film.find(req.query.name, function (err, models){
				res.json(err || models);
			});
    } else {
			Film.getAll(function (err, models){
				res.json(err || models);
			});
    }
});

app.get('/count', function (req, res) {
	Film.count(function (err, models){
		res.json(err || models);
	});
});

app.post('/create', function (req, res) {
    Film.getOne({name: req.body.name}, function (err, model) {
        if(err){
					res.json({status: 'fail', error: err.message});
        }
        if(model){
					res.json(model);
        } else {
            Film.create({name: req.body.name}, function (err, model) {
            	console.log('model', model);
							if(err){
								res.json({status: 'fail', error: err.message});
							} else {
								Film.getOne({name: req.body.name}, function (err, model) {
									res.json(err || model);
								});
							}
            })
        }
    });
});

app.delete('/', function (req, res) {
	Film.deleteOne({id: req.body.id}, function (err, model) {
		console.log(err, model);
		res.json({id: req.body.id});
	});
});

app.listen(8081);

console.log("Server work. Link http://localhost:8081");
