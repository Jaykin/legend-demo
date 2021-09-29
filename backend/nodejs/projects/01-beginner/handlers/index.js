

    /*
    *
    * 请求处理函数
    *
    * */
    var querystring = require('querystring');
    var fs = require('fs');
    var path = require('path');

    var formidable = require('formidable');
    var sys = require('sys');

    function response(res, opts) {
        var init = {
            status: '200',
            resMsg: 'maybe successed',
            contentType: 'text/html',
            data: '<h2>Hello World!</h2>',
            encoding: 'utf8'
        }

        var ret = Object.assign({}, init, opts);

        res.writeHeader(ret.status, ret.resMsg, {
            'Content-Type': ret.contentType
        });

        res.write(ret.data, ret.encoding, function () {
            console.log('log---response completed!');
        });

        res.end();
    }

    function sleep(ms) {
        var start = +new Date;

        while(+new Date < start + ms) ;
    }

    function root(res, req) {
        console.log('request for /');

        response(res, {
            data: '<h2>Hello root!</h2>'
        });
    }

    function start(res, req) {
        console.log('request for /start');

        //sleep(10000);

        var body ='<html>'+
            '<head>'+
            '<meta http-equiv="Content-Type" content="text/html; '+
            'charset=UTF-8" />'+
            '</head>'+
            '<body>'+
            '<form action="/upload" method="post" enctype="multipart/form-data">'+
            '<input type="file" name="file" />'+
            '<button>上传文件</button>'+
            '</form>'+
            '</body>'+
            '</html>';

        setTimeout(function () {
            response(res, {
                data: body
            });
        }, 1000);
    }

    function upload(res, req) {
        console.log('request for /upload !');
        //console.log(reqPostData);

        //var content = querystring.parse(reqPostData).text;

        var form = new formidable.IncomingForm();
        form.uploadDir = path.resolve(__dirname, '../tmp');
        form.parse(req, function (err, fields, files) {
            console.log('parse done !');
            console.log(err);
            console.log(fields);
            console.log(files);

            try {
                fs.renameSync(files.file.path, path.resolve(__dirname, '../tmp/test.png'));
            } catch(err) {
                console.log(err);
                response(res, {
                    status: '500',
                    resMsg: 'maybe fail',
                    data: '<h2>服务器故障，请稍后重试...</h2><a href="/start">返回</a>'
                })
            }

            response(res, {
                data: '<h2>upload completed!</h2><img src="/show" />' + '<a href="/start">返回</a>'
            });
        });
    }

    function show(res, req) {
        console.log('request for /show');

        fs.readFile(path.resolve(__dirname, '../tmp/test.png'), function (err, file) {
            console.log(err);
            //console.log(file);
            if (err) {
                response(res, {
                    status: '500',
                    resMsg: 'maybe fail',
                    data: '<h2>服务器故障，请稍后...</h2>'
                })
            } else {
                response(res, {
                    contentType: 'image/png',
                    encoding: 'binary',
                    data: file
                })
            }
        });
    }

    module.exports = {
        '/': root,
        '/start': start,
        '/upload': upload,
        '/show': show
    }