import { log } from '../../utils/logger'
log('Page pageA Before')

Page({
    onLoad() {
        log('Page pageA onLoad')
    },

    onShow() {
        log('Page pageA onShow')
    },

    onReady() {
        log('Page pageA onReady')
    },

    onHide() {
        log('Page pageA onHide')
    },

    onUnload() {
        log('Page pageA onUnload')
    },

    handleTapPageA() {
        wx.navigateTo({
            url: '/pages/pageB/pageB',
        })
    }
})

log('Page pageA After')