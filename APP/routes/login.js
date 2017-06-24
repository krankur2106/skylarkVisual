var express = require('express');
var router = express.Router();
var request = require('request');
var session = require('express-session');
var node_config=require('../config/node-config');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'cerebra' });
});
router.post('/validateUser', function(req, res, next) {
	request({
		url: 'http://127.0.0.1:8000/authentication/login', //URL to hit
		form: {username:req.param('username'),password:req.param('password')}, //Query string data
		method: 'POST', //Specify the method
		headers:{
			'User-Agent':       'Super Agent/0.0.1',
			'Content-Type':     'application/x-www-form-urlencoded'
		}
	}, function(error, response, body){
		if(error) {
		} else {
			var json = JSON.parse(body);
			if(json.token){
				token = json.token;
				console.log("token>>>>>>>>>>>",token);
				req.session['loginStatus'] = true;
				req.session['token'] = token;
				if(body){
					session[req.sessionID]={};
					session[req.sessionID].assetList = JSON.parse(body);
				}
				res.json({ token:token, status:1, message: 'success' });
				// request({
					// url:'http://127.0.0.1:8000/assetMonitoring/assetList/?format=json', //URL to hit
					// form: {},
					// method: 'GET',
					// headers:{
						// 'User-Agent':       'Super Agent/0.0.1',
						// 'Content-Type':     'application/x-www-form-urlencoded',
						// 'Authorization':	'JWT '+token,
					// }
				// }, function(error, response, body){
					// if(error){
						// console.log(error);
					// }					
					// req.session['loginStatus'] = true;
					// req.session['token'] = token;
					// // if(body){
						// // session[req.sessionID]={};
						// // session[req.sessionID].assetList = JSON.parse(body);
					// // }
					
				// });
			}
			else
				res.json({ status:0, message: 'failure' });
		}
	});
	
});

router.get('/refreshtoken', function(req, res, next) {
	request({
		url: node_config.url.refreshtoken,
		form: {token:req.param('token')},
		method: 'POST',
		headers:{
				'User-Agent':       'Super Agent/0.0.1',
				'Content-Type':     'application/x-www-form-urlencoded'
		}
	}, function(error, response, body){
		if(error) {
			console.log(error);
		} else {
			var json = JSON.parse(body);
			if(json.token){
				req.session['loginStatus'] = true;
				req.session['token'] = json.token;
				res.json({ token:json.token, status:1, message: 'success' });
			}
			else
				res.json({ status:0, message: 'failure' });
		}
	});
});

router.get('/logout', function(req, res, next) {
	var token=req.session.token;
	request({
		url: node_config.url.userlogout,
		form: {},
		method: 'GET',
		headers:{
				'User-Agent':       'Super Agent/0.0.1',
				'Content-Type':     'application/x-www-form-urlencoded',
				'Authorization':	'JWT '+token
		}
	}, function(error, response, body){
		if(error) {
			console.log(error);
		} 
	});
	req.session.destroy();
	res.send('');
});

module.exports = router;