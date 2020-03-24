var db = require('./db');

module.exports= {

	getAllMessage : function(callback){
		var sql = "select * from message order by message_id";
		db.getResults(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback([]);
			}
		});
	},
	
	getByUsernameFrom: function(username, callback){
		var sql = "select * from message where message.from=?";
		db.getResults(sql, [username], function(results){
			if(results.length >= 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},
	getByUsernameTo: function(username, callback){
		var sql = "select * from message where message.to=?";
		db.getResults(sql, [username], function(results){
			if(results.length >= 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},
	
	searchMessage : function(message, callback){
		var from = message.from;
		var to = message.to;
		var msg = message.msg;
		var orderby = message.orderby;
		if (from) {
			from = " and message.from like '%" + message.from + "%' ";
		}else{
			from = " ";
		}
		if (to) {
			to = " and message.to like '%" + message.to + "%' ";
		}else{
			to = " ";
		}
		if (msg) {
			msg = " and msg like '%" + message.msg + "%'  ";
		}else{
			msg = " ";
		}
		if(orderby){
			orderby = " " + message.orderby + " , message_id " ;
		}

		var sql = "select * from message where message_id between 0 and 999999999 " + from + to + msg + orderby ;
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