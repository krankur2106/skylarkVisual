var express = require('express');
var router = express.Router();
var request = require('request');
var session = require('express-session');

router.get('/getData', function(req, res, next) {
	
	// var token=req.session.token;
	var token=req.headers['authorization'];
		request({
		url:req.param('url'),
		qs:JSON.parse(req.param('param')),
		method: 'GET',
		json:true, 
		headers:{
				'User-Agent':       'Super Agent/0.0.1',
				'Content-Type':     'application/x-www-form-urlencoded',
				'Authorization':	token,
		}
	}, function(error, response, body){
		if(response){
			var statusCode = response.statusCode;
			if(statusCode !== 200){
				res.status(statusCode).json(body);
			} else {
				res.json(body);
			}
		}else{
			if(error) {
				console.log(error);
			}
			res.json('');
		}
		if(error) {
			console.log(error);
		}
	});
});

router.get('/getUserData', function(req, res, next) {
	
	// var token=req.session.token;
	var urltext = req.param('url')+'&ip='+(req.ip)
	var token=req.headers['authorization'];
		request({
		url:urltext,
		//qs:{'ip':req.ip},
		method: 'GET',
		json:true, 
		headers:{
				'User-Agent':       'Super Agent/0.0.1',
				'Content-Type':     'application/x-www-form-urlencoded',
				'Authorization':	token,
				
		}
	}, function(error, response, body){

		if(error) {
			console.log(error);
		} else {
			res.json(body);	
		}
	});
});

router.post('/postData', function(req, res, next) {
	var token=req.headers['authorization'];	
	request({
		url:req.param('url'),
		form:JSON.parse(req.param('param')),
		method: 'POST',
		json:true,
		headers:{
			'User-Agent':       'Super Agent/0.0.1',
			'Content-Type':     'application/x-www-form-urlencoded',
			'Authorization':	token,
		}
	}, function(error, response, body){
		if(error) {
			console.log(error);
		} else {
			res.json(body);
		}
	});
	
});

module.exports = router;