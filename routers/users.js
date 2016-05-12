var express = require('express');
var User = require('../models').User;
var crypto = require('crypto');
var router = express.Router();

function encrypt(str){
	return crypto.createHash('md5').update(str).digest('hex');
}

router.post('/reg',function(req,res){
	var user = req.body;
	var md5Email = encrypt(user.email);
	user.avatar = "http://secure.aravatar.com/avatar/"+md5Email+"?s=48";
	user.password = encrypt(user.password);
	new User(user).save(function(err,user){
		console.log(user);
		if(err){
			res.status(500).json({msg:err});
		}else{
			res.json(user);
		}
	});
});

router.post('/login',function(req,res){
	var user = req.body;
	User.findOne({username:user.username,password:encrypt(user.password)},function(err,user){
		if(err){
			res.status(500).json({msg:err});
		}else{
			res.json(user);
		}
	});
});


module.exports = router;