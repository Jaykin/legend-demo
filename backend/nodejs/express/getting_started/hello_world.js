/**
 * Created by Administrator on 2016/11/2.
 */
var express = require('express');
var app = express();

var app = require('express')();
var bodyParser = require('body-parser');
//var multer = require('multer');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//app.use(multer()); // for parsing multipart/form-data

app.post('/', function (req, res) {
    console.log(req.body);
    res.end();
})

var server = app.listen(3000, '192.168.3.103', function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);       //格式化输出
});