var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');
var propertyModel = require.main.require('./models/property-model');
var messageModel = require.main.require('./models/message-model');



router.get('/', function(req, res){
	
		propertyModel.getAllPropertyGuest(function(results){
			if(results.length >= 0){
				res.render('main/index', {propertylist: results});
			}else{
				res.redirect('/');
			}
		});
});

router.post('/', function(req, res){
	var property = {
	    title: req.body.title,
	    location: req.body.location,
	    bed: req.body.bed,
	    bath: req.body.bath,
	    floor: req.body.floor,
	    price_from: req.body.price_from,
	    price_to: req.body.price_to,
	    purpose: req.body.purpose,
	    type: req.body.type,
	    orderby: req.body.orderby
	};
	
	propertyModel.searchPropertyGuest(property, function(results){
		if(results.length >= 0){
			res.render('main/index', {propertylist: results});
		}else{
			res.redirect('/');
		}
	});
});



module.exports = router;