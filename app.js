/*
 * Include necessary files and modules.
 */
var config = require('./config/main');
global.configuration = config;

var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

/*
 * Create some global variable.
 */
var app = express();

/*
 * Create services.
 */
var mainService = require('./services/core');

/*
 * Serve public folder.
 */
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }));

app.use(session({
    secret: mainService.randomString(32, '#Aa'),
    resave: true, saveUninitialized: true,
    key: 'express.sessionID',
    cookie: {secure: false, maxAge: 300000 }
}));

app.use(expressValidator());

/*
 * Include services.
 */
app.use(require('./services/user'));
app.use(require('./services/controls'));
app.use(require('./services/dashboard'));


module.exports = app;