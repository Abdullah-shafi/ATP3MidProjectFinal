//declaration
var express = require('express');
var login = require('./controllers/login');
var home = require('./controllers/home');
var logout = require('./controllers/logout');
var ejs = require('ejs');
var exSession = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var registration = require('./controllers/registration');
var main = require('./controllers/main');
var userModel   = require.main.require('./model/user-model1');
var userModels2   = require.main.require('./models2/user-models2');
var router 		= express.Router();
var exValidator 	= require('express-validator');
//configuration

app.set('view engine', 'ejs');
router.use(express.static('./public'))
router.use('/abc', express.static('xyz'));


//middleware
app.use(express.static('public'))
app.use('/abc', express.static('xyz')); 
app.use('/abc1', express.static('xyz1')); 

app.use(bodyParser.urlencoded({extended:true}));
app.use(exSession({secret: 'my top secret value', saveUninitialized: true, resave: false}));
app.use(cookieParser());
app.use(exValidator());

app.use('/css', express.static('css'));

app.use('/login', login);
app.use('/home', home);
app.use('/logout', logout);
app.use('/registration', registration);
app.use('/main', main);


//routes
app.get('/', function(req, res){
	res.send('Welcome');
});

//server startup
app.listen(3000, function(){
	console.log('node server started at 3000!');
});