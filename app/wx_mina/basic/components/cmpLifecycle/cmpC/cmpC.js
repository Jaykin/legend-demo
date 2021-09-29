import { log } from '../../../utils/logger'
log('Component C Before')

Component({
    data: {
        name: 'cmpC'
    },

    properties: {
        prop: {
            type: Object,
            value: null,
            observer (newVal, oldVal) {
                log('cmpC observer', newVal, oldVal)
            }
        }
    },

    observers: {
        'prop': function (newVal) {
            log('cmpC observers', newVal)
        }
    },

    // 组件生命周期
    lifetimes: {
        created() {
            log('cmpC created')
        },
        attached() {
            log('cmpC attached')
        },
        ready() {
            log('cmpC ready')
        },
        moved() {
            log('cmpC moved')
        },
        detached() {
            log('cmpC detached')
        }
    },

    // 页面生命周期
    pageLifetimes: {
        show() {
            log('cmpC Page show')
        },

        hide() {
            log('cmpC Page hide')
        }
    }
})

log('Component C After')