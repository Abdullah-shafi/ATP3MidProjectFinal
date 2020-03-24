var express = require('express');
var userModel = require.main.require('./models/user-model');
var router = express.Router();

router.get('/', function(req, res){
	res.render('login/index');
});

router.post('/', function(req, res){

	var user ={
		username: req.body.uname,
		password: req.body.password
	};

	userModel.validateUser(user, function(status){
	 	if(status){
	 		userModel.getByUsername(user.username, function(result){
	 			if(result.type == 'admin'){
	 				res.cookie('username', req.body.uname);
					res.redirect('/home');
	 			}
                else if(result.type == 'customer'){
	 				res.cookie('username', req.body.uname);
					res.redirect('home/Customer_Home');
	 			}
	 			else if(result.type == 'employee'){
	 				//res.send('This is not my part');
	 				res.cookie('username', req.body.uname);
					res.redirect('home/indexed');
	 			}
	 		});
		}else{
			res.send('invalid username/password');
		}
	});
});

module.exports = router;