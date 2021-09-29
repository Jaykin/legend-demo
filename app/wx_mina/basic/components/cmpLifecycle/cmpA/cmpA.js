import { log } from '../../../utils/logger'
log('Component A Before')

Component({
    data: {
        name: 'cmpA'
    },

    properties: {
        prop: {
            type: Object,
            value: null,
            observer (newVal, oldVal) {
                log('cmpA observer', newVal, oldVal)
            }
        }
    },

    observers: {
        'prop': function (newVal) {
            log('cmpA observers', newVal)
        }
    },

    // 组件生命周期
    lifetimes: {
        created() {
            log('cmpA created')
        },
        attached() {
            log('cmpA attached')
        },
        ready() {
            log('cmpA ready')
        },
        moved() {
            log('cmpA moved')
        },
        detached() {
            log('cmpA detached')
        }
    },

    // 页面生命周期
    pageLifetimes: {
        show() {
            log('cmpA Page show')
        },

        hide() {
            log('cmpA Page hide')
        }
    }
})

log('Component A After')