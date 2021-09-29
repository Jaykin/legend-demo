/**
 * Created by Administrator on 2016/11/3.
 */


/**
 * Module dependencies.
 */

var express = require('express');
var hash = require('./pass').hash;
var bodyParser = require('body-parser');
var session = require('express-session');

var app = module.exports = express();

// config
// 配置模板引擎 及 模板目录
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');



// middleware

app.use(bodyParser.urlencoded({ extended: false }));        //解析 Content-Type: application/x-www-form-urlencoded 的数据
app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'shhhh, very secret'
}));

// Session-persisted message middleware
// session 保持信息 中间件
//Session对象
/*
* req.session {
     cookie:{
             path: '/',
             _expires: null,
             originalMaxAge: null,
             httpOnly: true
     },
     user:{
         name: 'tj',
         salt: 'VH3VWbLmyFKGotfIN96CcGdXZg3kqO+JOIqafNxvmT6zp/FsyBYzPMgs5Y5aQ9ThL5/lr+SgeVfs14uegvPx1Ole8b8lbpr5tnnoFHffo3h6b90OdgQQjoGdR2lWLyj9hV1LNUbfegPjFyrTzuctTo/J6GwRRypli3c44DworOE=',
         hash: 'tXKSu3AnILKc3pmdV5FKlk/sP8ES3zU1vwkuPKhDIcez5URW197iOAIHDluFGFgrFiSV1G244YDOpFb0wfQhnLRhchUaUqvdmtGhHpOF8V+wVTgBeLqQp/GWYRkwIcfnJeMQSHztc3jGCqT2srMnRQ4GtHMd5FLYA9Ud0busurE='
     },
     success:'' 或者
     error:''
 }
* */

app.use(function(req, res, next){
        //显示登陆成功 或 失败的提示信息
    var err = req.session.error;
    var msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
        //res.locals是模板的数据源
    res.locals.message = '';
    if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
    if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
    next();
});

// dummy database  仿真数据库

var users = {
    tj: { name: 'tj' }
};

// when you create a user, generate a salt
// and hash the password ('foobar' is the pass here)
// 生成用户名 密码信息
hash('foobar', function(err, salt, hash){
        //通过hash 获取 私钥 和公钥  （函数式编程）
    if (err) throw err;
    // store the salt & hash in the "db"    储存 salt & hash 在数据库
    users.tj.salt = salt;
    users.tj.hash = hash;
});


// Authenticate using our plain-object database of doom!

function authenticate(name, pass, fn) {
        // module.parent  引入这个模块的模块
    if (!module.parent) console.log('authenticating %s:%s', name, pass);
    var user = users[name];
    // query the db for the given username
    // 查询数据库 验证用户
    if (!user) return fn(new Error('cannot find user'));
    // apply the same algorithm to the POSTed password, applying
    // the hash against the pass / salt, if there is a match we
    // found the user
    hash(pass, user.salt, function(err, hash){
            // 通过 password 和 salt，生成hash，然后跟数据库中存储的hash比较下
        if (err) return fn(err);
        if (hash == user.hash) return fn(null, user);
        fn(new Error('invalid password'));
    });
}

function restrict(req, res, next) {
        // 只有认证成功 才会往 session中写入user字段
    if (req.session.user) {
        next();
    } else {
            // 如果未 登陆成功则重定向回登陆
        req.session.error = 'Access denied!';
        res.redirect('/login');
    }
}

app.get('/', function(req, res){
        // express 重定向
        // res.redirect([status,] path)
    res.redirect('/login');
});

app.get('/restricted', restrict, function(req, res){
        // 使用组合的中间件
    res.send('Wahoo! restricted area, click to <a href="/logout">logout</a>');
});

app.get('/logout', function(req, res){
    // destroy the user's session to log them out
    // will be re-created next request
    // 退出登陆，销毁用户的session
    req.session.destroy(function(){
        res.redirect('/');
    });
});

app.get('/login', function(req, res){
    // 模板渲染并返回给客户端 res.render(view [, locals] [, callback])
    res.render('login');
});

app.post('/login', function(req, res){
        // post 方式 说明是在登陆
    authenticate(req.body.username, req.body.password, function(err, user){
        if (user) {
            // Regenerate(回收 再生) session when signing in
            // to prevent fixation
            req.session.regenerate(function(){
                // 重新生成session，因为这是已经登陆成功的状态了
                // Store the user's primary key
                // in the session store to be retrieved,
                // or in this case the entire user object
                req.session.user = user;
                req.session.success = 'Authenticated as ' + user.name
                    + ' click to <a href="/logout">logout</a>. '
                    + ' You may now access <a href="/restricted">/restricted</a>.';
                res.redirect('back');       // 重定向 返回
            });
        } else {
                // 登陆失败
            req.session.error = 'Authentication failed, please check your '
                + ' username and password.'
                + ' (use "tj" and "foobar")';
            res.redirect('/login');
        }
    });
});

/* istanbul ignore next */
if (!module.parent) {
        // 为啥要做这个判断？？
    app.listen(3000);
    console.log('Express started on port 3000');
}