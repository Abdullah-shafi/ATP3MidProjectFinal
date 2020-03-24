var express = require('express');
var userModel = require.main.require('./models/user-model');
var router = express.Router();

router.get('/', function(req, res){
	res.render('registration/index');
});

router.get('/success', function(req, res){
	res.render('registration/success');
});

router.post('/', function(req, res){

	var user ={
		username: req.body.uname,
		name: req.body.name,
		password: req.body.password,
		confirmPassword: req.body.confirmPassword,
		phone: req.body.phone,
		email: req.body.email,
		image: req.body.image
	};

	if (!user.username) {
		res.send('Username cannot be empty');
	} else {
		if (!user.password) {
			res.send('Password cannot be empty');
		} else {
			if (!user.phone) {
				res.send('Phone cannot be empty');
			} else {
				userModel.validateUsername(user.username, function(status){
			 	if(!status){
					if (user.password == user.confirmPassword) {
						if (!user.image) {
							res.send('Uploading your image has an error');
						} else {
							userModel.insert(user, function(status1){
								if (status1) {
									res.redirect('/registration/success');
								}else{
									res.send('Registration has not been completed');
								}
							})
						}
					}else{
						res.send('Confirm Password did not match');
					}
				}else{
					res.send('Username already exists');
				}
				});
			}
			
		}
	}
	
});

module.exports = router;