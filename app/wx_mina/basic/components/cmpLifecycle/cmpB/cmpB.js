import { log } from '../../../utils/logger'
log('Component B Before')

Component({
    data: {
        name: 'cmpB'
    },

    properties: {
        prop: {
            type: Object,
            value: null,
            observer (newVal, oldVal) {
                log('cmpB observer', newVal, oldVal)
            }
        }
    },

    observers: {
        'prop': function (newVal) {
            log('cmpB observers', newVal)
        }
    },

    // 组件生命周期
    lifetimes: {
        created() {
            log('cmpB created')
        },
        attached() {
            log('cmpB attached')
        },
        ready() {
            log('cmpB ready')
        },
        moved() {
            log('cmpB moved')
        },
        detached() {
            log('cmpB detached')
        }
    },

    // 页面生命周期
    pageLifetimes: {
        show() {
            log('cmpB Page show')
        },

        hide() {
            log('cmpB Page hide')
        }
    }
})

log('Component B After')