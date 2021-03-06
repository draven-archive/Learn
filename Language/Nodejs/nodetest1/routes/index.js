var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('helloworld', { title: 'Hello, World!' });
});

router.get('/userlist', function(req, res, next) {
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({}, {}, function(err, data) {
		res.render('userlist', {
			"userlist": data
		});
	});
});

router.post('/adduser', function(req, res) {
	var db = req.db;
	var userName = req.body.username;
	var userEmail = req.body.useremail;

	var collection = db.get('usercollection');

	collection.insert({
		"username": userName,
		"email": userEmail
	}, function(err, doc) {
		if (err) {
			res.send("There was a problem adding the information to the database.");
		} else {
			res.location("userlist");
			res.redirect("userlist");
		}
	});
});

router.get('/newuser', function(req, res) {
	res.render('newuser', { title: "Add new User!"});
});

module.exports = router;
