var express = require('express');
var path = require('path');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://123.57.143.189/shopping');
var users = require('routers/users');
var bodyParser = require('body-parser');
//使用静态文件服务器中间件 
//__dirname表示当前app.js所在的文件目录
app.use(express.static(path.join(__dirname,'app','public')));
//解析json请求 即content-type=application/json
app.use(bodyParser.json());
//解析url请求 即content-type=application/x-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));
app.use('/users',users);

app.listen(8080);