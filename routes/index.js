var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page */
router.get('/helloworld', function(req, res) {
	res.render('helloworld', { title: 'Hello, World!'})
});

router.get('/userlist', function(req, res) {
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({}, {}, function(e, docs) {
		res.render('userlist', {
			"userlist" : docs
		});
	});
});

/* GET New User page */
router.get('/newuser', function(req, res) {
	res.render('newuser', { title: 'Add new user' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

	// Set our internal DB variable
	var db = req.db;

	// Get our form values. These rely on the "name" attributes
	var userName = req.body.nameUser;
	var userEmail = req.body.email;
	var userUserName = req.body.username;

	// Set our collection
	var collection = db.get('usercollection');

	// Submit to the DB
	collection.insert({
		"name" : userName,
		"email" : userEmail,
		"username" : userUserName
	}, function (err, doc) {
		if (err) {
			// if it failed, return error
			res.send("There was a problem with your registration")
		}
		else {
			// if it worked, set the header so the address bar doesn't still say /adduser
			res.location("userlist");
			// and forward to success page
			res.redirect("userlist");
		}
	});
});

module.exports = router;
