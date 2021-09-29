import { log } from '../../utils/logger'
log('Page pageB Before')

Page({
    onLoad() {
        log('Page pageB onLoad')
    },

    onShow() {
        log('Page pageB onShow')
    },

    onReady() {
        log('Page pageB onReady')
    },

    onHide() {
        log('Page pageB onHide')
    },

    onUnload() {
        log('Page pageB onUnload')
    },
})

log('Page pageB After')