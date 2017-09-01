const config = require('./config/config');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(config.dbName);
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const consolidate = require('consolidate');
const handlebars = require('handlebars');
const session = require('express-session')
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
const opn = require('opn');

app.use( bodyParser.urlencoded({extended: true}) );
app.use( bodyParser.json() );
app.use('/assets', express.static('assets'));
app.engine('hbs', consolidate.handlebars);
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
    Film.getAll(function (err, models){
        if( err ){
            console.log( err );
        }
        Film.count(function (err, count) {
            app.render('index', {
                models: models,
                info: req.flash('info'),
                count: count ? count.count : 0,
            }, function (err, html) {
                res.render('layouts/main', {content: html});
            })
        });
    });
});

app.get('/search', function (req, res) {
    Film.find(req.query.name, function (err, models){
        if( err ){
            res.json(err);
        } else {
            app.render('search', {
                models: models,
            }, function (err, html) {
                res.render('layouts/empty', {content: html});
            })
        }
    });
});

app.get('/create', function (req, res) {
    app.render('create', {message: req.flash('error')}, function (err, html) {
        res.render('layouts/main', {content: html});
    })
});

app.post('/create', function (req, res) {
    Film.getOne({name: req.body.name}, function (err, model) {
        if( err ){
            console.log( 'getOne error', err );
        }

        if( model ){
            req.flash('error', 'Film is exists')
            res.redirect('/create');
        } else {
            Film.create({name: req.body.name}, function (err, model) {
                console.log( err, model );
                req.flash('info', 'Film was created');
                res.redirect('/');
            })
        }
    });
});

app.listen(8081);

console.log("Server work. Link http://localhost:8081");
opn("http://localhost:8081");