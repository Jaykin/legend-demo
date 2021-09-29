import { log } from './utils/logger'

log('App Before')

App({
    onLaunch() {
        log('App onLaunch')
    },

    onShow() {
        log('App onShow')
    },

    onHide() {
        log('App onHide')
    },

    onError() {
        log('App onError')
    }
});

log('App After')