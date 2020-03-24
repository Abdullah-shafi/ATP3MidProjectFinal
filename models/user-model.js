var db = require('./db');

module.exports= {
	getByCustomerId : function(id, callback){
		var sql = "select * from customer where customer_id=?";
		db.getResults(sql, [id], function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	},
	getAllCustomer : function(callback){
		var sql = "select * from customer order by customer_id";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	validateUser: function(user, callback){
		var sql ="SELECT * FROM customer where username=? and password=?";
		db.getResults(sql, [user.username, user.password], function(results){

			if(results.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getByUsername: function(username, callback){
		var sql = "select * from customer where username=?";
		db.getResults(sql, [username], function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
	},
	insert: function(user, callback){
		var sql = "insert into customer values(?,?,?,?,?,?,?,?,?,?,?,?)";
		var type = "customer";
		db.execute(sql, [null, user.username, user.name, user.password, type, user.phone, user.email, user.image, 0, 0, 0, 0], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	update : function(user, callback){
		var sql = "update customer set password=?, type=?, phone=? where username=?";
		db.execute(sql, [user.password, user.type, user.phone, user.username], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(id, callback){
		var sql = "delete from customer where customer_id=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	insertUser: function(user, callback){
		var sql = "insert into customer values(?,?,?,?,?,?,?,?,?,?)";
		db.execute(sql, [null, user.username, user.name, user.password, user.type, user.phone, user.email, user.image, 0, 0, 0, 0], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	validateUsername: function(username, callback){
		var sql = "select * from customer where username=?";
		db.getResults(sql, [username], function(results){
			if(results.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	searchCustomer : function(user, callback){
		var username = user.username;
		var email = user.email;
		var type = user.type;
		var orderby = user.orderby;
		if (username) {
			username = " and username like '%" + user.username + "%' ";
		}else{
			username = " ";
		}
		if (email) {
			email = " and email like '%" + user.email + "%' ";
		}else{
			email = " ";
		}
		if (type) {
			type = " and type = '" + user.type + "'  ";
		}else{
			type = " ";
		}
		if(orderby){
			orderby = " " + user.orderby + " , customer_id " ;
		}

		var sql = "select * from customer where customer_id between 0 and 999999999 " + username + email + type + orderby ;
		console.log(sql);
		db.getResults(sql, null, function(results){
			if(results.length >= 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	}
}