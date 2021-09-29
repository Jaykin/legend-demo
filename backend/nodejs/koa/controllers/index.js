/**
 * 处理登录
*/

/**
 * 登录首页
 * GET /
*/
const fn_index = async (ctx, next) => {
    ctx.render('index.html', {
        title: 'Welcome'
    });
}

/**
 * 登入接口
 * POST /signin
*/
const fn_signin = async (ctx, next) => {
    const email = ctx.request.body.email || '';
    const password = ctx.request.body.password || '';
    
    if (email === 'admin@example.com' && password === '123456') {
        // 登录成功:
        ctx.render('signin-ok.html', {
            title: 'Sign In OK',
            name: 'Mr Node'
        });
    } else {
        // 登录失败:
        ctx.render('signin-failed.html', {
            title: 'Sign In Failed'
        });
    }
}

/**
 * 统一输出
*/
module.exports = {
    'GET /': fn_index,
    'POST /signin': fn_signin
}