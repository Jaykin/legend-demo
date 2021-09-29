const glob = require('glob');

// 判断 pattern 是否被 glob 支持
// console.log(glob.hasMagic('a{/b/c, bc}'));

// 匹配 process.pwd() 下的路径
glob('*', {}, function(err, matches) {
    if (err != null) {
        console.log('error: ', err);
        return;
    }

    console.log('matches: ', matches);
});


const myGlob = new glob.Glob();