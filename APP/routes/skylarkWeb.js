var express = require('express');
var router = express.Router();
var session = require('express-session');

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.session){
		console.log("innnn");
		if(req.session.loginStatus){
			console.log("innnn2222222222222");
			res.render('skylarkWeb/index', { sessionToken:req.session.token });
		}
		else{
			res.redirect('/login');
		}
	}
	else{
		res.redirect('/login');
	}
});

module.exports = router;
