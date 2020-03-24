var db = require('./db');

module.exports ={
	getAllc:function(callback){
		var a='allowed';
		var sql = "select * from property,customer,property_picture where property.username=customer.username and property.property_id=property_picture.property_id and property.status='"+a+"' order by date DESC";
		db.getResult(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(0);
			}
		});
	},
	getProfile:function(user,callback){
		

		var sql = "select * from customer where username= ?";
		db.getResult(sql, [user.username], function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},
	customervalidate: function(user, callback){

		var sql = "select * from customer where username=? and password=?";
		db.getResult(sql, [user.username, user.password], function(result){
			if(result.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getProperty:function(user,callback){
		var a='allowed';
		var sql = "select * from property,customer,property_picture where property.property_id=? and property.username=customer.username and property.property_id=property_picture.property_id  and property.status='"+a+"' ";
		db.getResult(sql, [user.id], function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(0);
			}
		});
	},
	getProperty4:function(user,callback){
		var a='allowed';
		var sql = "select * from property,customer,property_picture where property.property_id=? and property.username=customer.username and property.property_id=property_picture.property_id  and property.status='"+a+"' ";
		db.getResult(sql, [user.id], function(results){
			if(results.length > 0){
				var sql2 = "update property set no_of_clicks=no_of_clicks+1 where property.property_id=? ";
		         db.execute(sql2, [user.id], function(status){
			if(status){
				callback(true);
			}
		});
             	//callback(results);
			}else{
				callback(0);
			}
		});
	},
	getProperty2:function(user,callback){
		var a='allowed';
		var sql = "select * from property,customer,property_picture where property.username=? and property.username=customer.username and property.property_id=property_picture.property_id  and property.status='"+a+"' ";
		db.getResult(sql, [user.username], function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(0);
			}
		});
	},
	getProperty3:function(user,callback){
		var a='allowed';
		var sql = "select * from property,customer,property_picture where property.username=? and property.username=customer.username and property.property_id=property_picture.property_id   ";
		db.getResult(sql, [user.username], function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(0);
			}
		});
	},


	customerdelete: function(user, callback){
		var sql = "delete from property where property_id=?";
		db.execute(sql, [user.id], function(status){
			if(status){
		         
				 var sql1 = "delete from property_picture where property_id=?";
				 db.execute(sql1, [user.id], function(status){
			if(status){
				//callback(true);
				var sql2 = "update customer set total_posts=total_posts-1 where username=?";
		         db.execute(sql2, [user.username], function(status){
			if(status){
				callback(true);
			}
		});
			}
		});

				//callback(true);
			}else{
				callback(false);
			}
		});
	},

   updateProfile: function(user, callback){
		var sql = "update customer set name=?,phone=?,email=? where username=?";
		db.execute(sql, [user.name,user.phone,user.email,user.username], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	UpdateStatus:function(user, callback){
		var s='sold';
		var sql = "update property set status='"+s+"' where property_id=? and username=?";
		db.execute(sql,[user.id,user.username], function(status){
			if(status){
				callback(true);
			}
			else{
				callback(false)		
			}

		});
	},
	UpdatePassword:function(user, callback){
		var s='sold';
		var sql = "update customer set password=? where username=?";
		db.execute(sql,[user.npass,user.username], function(status){
			if(status){
				callback(true);
			}
			else{
				callback(false);
			}
		});
	},
	UploadProperty:function(user, callback){
		
		var sql = "Insert into property(property.username,property_price,property_area,p_type,style,bed,bath,feet,title,floor,description,status) VALUES (?,?,?,?,?,?,?,?,?,?,?,'pending') ";
		db.execute(sql,[user.username,user. property_price,user.property_area,user.type,user.style,user.bed,user.bath,user.feet,user.title,user.floor,user.description], function(status) {
			if(status){
				 var sql1 = "Insert into property_picture( property_picture.property_id,image) select max(property_id),? from property";
		         db.execute(sql1, [user.image], function(status){
			 if(status){
			 	 var sql2 = "update customer set pending_posts=pending_posts+1,total_posts=total_posts+1 where username=?";
		         db.execute(sql2, [user.username], function(status){
			if(status){
				callback(true);
			}
		});
				//callback(true);
			 }
	          	});
				//callback(true);
			}
			else{
				callback(false);
			}
		});
	},

	getFeedback:function(user,callback){

		var sql = "select * from message where message.from in(?,'admin') and message.to in(?,'admin') order by message.message_id";
		
		db.getResult(sql,[user.username,user.username], function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(0);
			}
		});
	},

	addFeedback:function(user, callback){
		
		var sql = "INSERT INTO `message`( `from`, `to`, `msg`) VALUES (?,'admin',?)";
		db.execute(sql,[user.username,user.msg], function(status) {
			if(status){
				callback(true);
			}
			else{
				callback(false);
			}
		});
	},

	editProperty:function(user, callback){
		var sql = "update property set property_price=?,property_area=?,p_type=?,style=?,bed=?,bath=?,feet=?,title=?,floor=?,description=? where property_id=? and username=?";
		db.execute(sql,[user. property_price,user.property_area,user.type,user.style,user.bed,user.bath,user.feet,user.title,user.floor,user.description,user.id,user.username], function(status){
			if(status){
			    callback(true);
				
			}
			else{
				callback(false)		
			}

		});
	},

	searchProp:function(property, callback){
	var title = property.title;
		var location = property.location;
		var bed = property.bed;
		var bath = property.bath;
		var floor = property.floor;
		var price_from = property.price_from;
		var price_to = property.price_to;
		var purpose = property.purpose;
		var type = property.type;
		var orderby = property.orderby;

		if(title){
			title = " and title like '%" + property.title + "%'  ";
		}else{
			title = " ";
		}
		if(location){
			location = " and  property_area like '%" + property.location + "%'  ";
		}else{
			location = " ";
		}
		if(bed){
			bed = " and  bed = " + property.bed + "  ";
		}else{
			bed = " ";
		}
		if(bath){
			bath = " and  bath = " + property.bath + "  ";
		}else{
			bath = " ";
		}
		if(floor){
			floor = " and  floor = '" + property.floor + "'  ";
		}else{
			floor = " ";
		}
		if(purpose){
			purpose = " and  style = '" + property.purpose + "'  ";
		}else{
			purpose = " ";
		}
		if(type){
			type = " and  p_type = '" + property.type + "'  ";
		}else{
			type = " ";
		}
		if(price_from){
			price_from = " and  property_price  between " + property.price_from + " and 100000000000 ";
		}else{
			price_from = " and   property_price  between 0 and 10000000000  ";
		}
		
		var sql ="SELECT * from  property,customer,property_picture where  status = 'allowed' " + title + location + bed + bath + floor + purpose + type + price_from + "and property.username=customer.username and property.property_id=property_picture.property_id   ";
		
		db.getResult(sql, null, function(results){

			if(results.length >= 0){
				callback(results);
			}else{
				
				callback(false);
			}
		});
	}

}





