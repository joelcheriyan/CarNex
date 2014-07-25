
/* Function routes called by the app.js */
var UserSchema = require('../schemas/user');
var PostsSchema = require('../schemas/posts');



module.exports = function(){

	var functions = {};//contains the functions to be exported
	

//the login/logout functions


	functions.login = function(req, res) {
	//this function simply renders the homepage, where the 'Log In' button leads to the the login.js file

		res.render('index.ejs');
	
	};


	functions.logout = function(req, res) {
	//this function simply removes the login session and renders the homepage
		req.logout();
		res.render('index.ejs');
		
	};





//signup page 


	functions.signup = function(req, res) {
	//this function creates a new user entry in the database
	
		// create a record with the submitted information accroding to the schema of the user entry in the database	
		var record = new UserSchema({
			name: req.body.name, 
			email: req.body.email,
			username: req.body.username,
			password: req.body.password,
			phone: req.body.phone,
			birthdate: req.body.birthdate,     
			city: req.body.city,
			lat: req.body.lat,
			lon: req.body.lon,
			counts: 0,
    			rating: 0

		});

		//save the records into the database
		record.save(function(err) {
				if (err) {
					console.log(err);
					res.status(500).json({status: 'failure'}); // if an error occurs report a failure
				} 
		});
	};




//dashboard page


	functions.dashboard = function(req, res) {
	//this function renders the current user's dashboard page
	
		//checks if a user is trying to go to the dashboard without being logged in
		if (req.session.passport.user === undefined) {    
		 	res.redirect('/login');
		} 
		
		//if the user is logged in, we query the database for the user's information 
		else{		
		UserSchema.find({username: req.session.passport.user}) 
		.exec(function(err, user) {
			if (err) {
				res.status(500).json({status: 'failure'});
			}
			else{
				//then render the user's dashboard page
				 res.render('dashboard.ejs',{
					posts: undefined,
					user:user
				});
			}	
		});
		}					
	};


	functions.postsearch = function(req, res) {
	//this function allows users to search for posts by starting point and destination 

		var current_date = new Date();//return the current date 

		//query for posts as specified, that are leaving after the current date
		PostsSchema.find({from: req.body.from, to: req.body.to, returndate: { $gt: current_date} })
		.setOptions({sort: 'startdate'})
		.exec(function(err, posts) {
			if (err) {
				res.status(500).json({status: 'failure'});
			} 
			else {
				//search for currently logged in user
				UserSchema.find({username: req.session.passport.user})
				.exec(function(err, user) {
				if (err) {
				res.status(500).json({status: 'failure'});
				} 

				// render the current user's dashboard page with the post results 
				else {
					res.render('dashboard.ejs', {
					posts:posts,
					user: user
					});					
				}
				});
			}
		});	
	};


	functions.save = function(req, res) {
	//this function saves the information of a post for the currently logged in user 

		// updates the information from the post to the user's saved_posts array in the database 
		UserSchema.update({username:req.session.passport.user}, { $addToSet: {saved_posts :{
													from: req.body.from,
													to: req.body.to,
													startdate: req.body.startdate,
													returndate: req.body.returndate,
													description: req.body.descript, 
													poster: req.body.poster
											}}
		}).exec(function(err, user){
			if (err) {
				res.status(500).json({status: 'failure'});
			} else {
				//then redirects the user to their own personal profile
				res.redirect('/personalprofile');
			}		
		});	
	};




//create a post page


	functions.createpost = function(req, res) {
	// this function creates a new post from the currently logged in user

  
		// create a record with the submitted information accroding to the schema of a post entry in the database
  		var record = new PostsSchema({
			from: req.body.from,
			to: req.body.to,
			startdate: req.body.startdate,
			returndate: req.body.returndate,
			description: req.body.descript,
			username: req.session.passport.user,
			counts: 0,
    		rating: 0,
    		result: "",
			sLoc_lat: req.body.sLoc_lat,
			sLoc_lon: req.body.sLoc_lon,
			dest_lat: req.body.dest_lat,
			dest_lon: req.body.dest_lon

		});
  		
		//save the records into the database
		record.save(function(err) {
				if (err) {
					console.log(err);
					res.status(500).json({status: 'failure'});
				}else {
					res.redirect('/dashboard');
				} 
		});
		
		//update the information of the post to the current user's my_post array in the database
		UserSchema.update({username:req.session.passport.user}, { $push: {my_posts :{
			from: req.body.from,
			to: req.body.to,
			startdate: req.body.startdate,
			returndate: req.body.returndate,
			description: req.body.descript, 
			poster: req.session.passport.user
		}}}).exec(function(err){});
	};




// public profile page


	functions.profile = function(req, res) {
	//this function queries for a user's information and renders the public profile	page
	
		console.log(req.body.username);	
		if(req.body.username != undefined)
		{

			//query for the user whose page we would like to view
			UserSchema.find({username: req.body.username})
			.exec(function(err, user) {
				if (err) {
				res.status(500).json({status: 'failure'});
				} 
				else {

					console.log(user[0].lat);
					res.render('profile.ejs', {
					user: user,
					lat: user[0].lat,
					lon: user[0].lon
					});					
				}
		
				});
		}
	};


	functions.comment = function(req, res) {
	//this function adds a comment about a specific user

		// update a specific user's comments array in the database 
		UserSchema.update({username:req.body.username}, { $addToSet: { comments: {commenter: req.body.name, comment:req.body.comment}})
		.exec(function(err, user){
			
			if (err) {
				res.status(500).json({status: 'failure'});
			} 
			else {
				//query for the user we are currently viewing and refresh their profile page
				UserSchema.find({username: req.body.username})
				.exec(function(err, user) {
				if (err) {
					
				res.status(500).json({status: 'failure'});
				} 

				else {
					res.render('profile.ejs', {
					user: user,
					lat: user[0].lat,
					lon: user[0].lon

				  });					
				}
			 });
			}
				
			
			});		
		};


	functions.rating = function(req, res) {	
	// this function allows user to submit a rating for another user
		console.log(req.body.username);

		//find the user
		
		UserSchema.find({username: req.body.username})
		.exec(function(err, user1) {
			if (err) {
				res.status(500).json({status: 'failure'});
			}
			else{

				//total counts 
				var counts_new = user1[0].counts + 1;


				//total ratings
				var one_rate = parseInt(req.body.rating);
				var tot_rate = user1[0].rating + one_rate;
				

				//((tot_rate/counts_new) / 5) * 100 to transfer to percentage)
				var final = Math.round((tot_rate/counts_new)*20);
				var result = final + "%";
				console.log(result);
				//updating the info
				UserSchema.update({username: req.body.username}, { 	
					counts: counts_new,
    				rating: tot_rate
				}).exec(function(err, user){});



				PostsSchema.update({username: req.body.username}, { 	
					result: result
				}).exec(function(err, user){});

					res.redirect('/dashboard');
			}		
		});			  
	};




//personal profile page


	functions.personalprofile = function(req, res) {
	//this function renders the personal profile page of the currently logged in user
		
		// query for the information of the currently logged in user and render the personal profile
		UserSchema.find({username: req.session.passport.user})
		.exec(function(err, user) {
			if (err) {
				res.status(500).json({status: 'failure'});
			}
			else{
				 res.render('personprofile.ejs',{user:user});
				}		
			});					
	};


	functions.deletepost = function(req, res) {
	// this function deletes a post created by the currently logged in user
		
		// removes the post from the users my_posts array that corresponds to the specified fields
		UserSchema.update({username:req.session.passport.user}, { $pull: {my_posts :{
												from: req.body.from,
												to: req.body.to,
												description: req.body.descript,
												poster: req.body.poster
									}}
		}).exec(function(err){});

		
		// removes the post from the database that corresponds to the specified fields
		PostsSchema.remove({from:req.body.from, to:req.body.to, description: req.body.descript, username: req.body.poster}, true)
		.exec(function(err, user){
			if (err) 
			{
				res.status(500).json({status: 'failure'});
			} else 
			{

				res.redirect('/personalprofile');
			}		
			
		});

		
	};


	functions.unsave = function(req, res) {
	//this function unsaves a post that a user had previously saved

	
		// removes the post from the users saved_posts array that corresponds to the specified fields 		
		UserSchema.update({username:req.session.passport.user}, { $pull: {saved_posts :{
												from: req.body.from,
												to: req.body.to,
												description: req.body.descript,
												poster: req.body.poster
									}}
		}).exec(function(err, user){
			if (err) 
			{
				res.status(500).json({status: 'failure'});
			} else 
			{

				res.redirect('/personalprofile');
			}		
			
		});

		
	};




//settings page


	functions.settings = function(req, res) {
	//this function renders the settings page for the currenlty logged in user

		//query for the currently logged in user's information and display their settings	
		UserSchema.find({username:req.session.passport.user})
		.exec(function(err, user){
			if (err) 
			{
				res.status(500).json({status: 'failure'});
			} else 
			{

				res.render('settings.ejs',{
					user: user,
					lat: user[0].lat,
					lon: user[0].lon
				});
			}		
			
		});
		
	};


	functions.update = function(req, res) {
	//this function updates a change to a user's settings

		// update the database entry for the current user's information
		UserSchema.update({username:req.session.passport.user},  {
			name: req.body.name,
			username: req.body.username,
			password: req.body.password,
			email: req.body.email,
			phone: req.body.phone 
									})
		.exec(function(err, user){});
		

				res.redirect('/logout');
		
	};

	


//mapping page


	functions.map = function(req, res) {
		res.render('map.ejs', {
			sLoc_lat: req.body.sLoc_lat,
			sLoc_lon: req.body.sLoc_lon,
			dest_lat: req.body.dest_lat,
			dest_lon: req.body.dest_lon
		});
	};




//error page


	functions.error = function(req, res){
		res.render('error.ejs');
	};


	return functions;
};
