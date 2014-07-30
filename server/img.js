	
app.post('/upload', routes.upload);

functions.upload = function(req,res){

	   fs.readFile(req.files.image.path, function (err, data) {

		var imageName = req.files.image.name

		/// If there's an error
		if(!imageName){

			console.log("There was an error")
			res.redirect("/settings");
			res.end();

		} else {
		
			GridFS gfsPhoto = new GridFS(db, "photo");
			GridFSInputFile gfsFile = gfsPhoto.createFile(imageFile);
			gfsFile.setFilename(req.session.passport,user);
			gfsFile.save();

		 	UserSchema.update({username:req.session.passport.user}, {$set {image: data}})
			.exec(function(err, user) {
			if (err) {
				res.status(500).json({status: 'failure'});
			}
			else{
				 res.render('personprofile.ejs',{user:user});
				}		

			});			
		
		}
	   });
       };

