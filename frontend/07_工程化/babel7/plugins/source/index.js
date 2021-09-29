/* DCG-S QQ&TT */
// const extConfig = require('./config/index');
/* DCG-E QQ&TT */

Page({
    data: {
        switch: 1
    },
    onLoad() {
        const switch = 1;

        if (switch /* DCG-S QQ&TT *//*&& extConfig.switch*//* DCG-E QQ&TT */) {
            console.log('tt');
        }
    }
})