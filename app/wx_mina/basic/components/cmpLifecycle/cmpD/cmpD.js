import { log } from '../../../utils/logger'
log('Component D Before')

Component({
    data: {
        name: 'cmpD'
    },

    properties: {
        prop: {
            type: Object,
            value: null,
            observer (newVal, oldVal) {
                log('cmpD observer', newVal, oldVal)
            }
        }
    },

    observers: {
        'prop': function (newVal) {
            log('cmpD observers', newVal)
        }
    },

    // 组件生命周期
    lifetimes: {
        created() {
            log('cmpD created')
        },
        attached() {
            log('cmpD attached')
        },
        ready() {
            log('cmpD ready')
        },
        moved() {
            log('cmpD moved')
        },
        detached() {
            log('cmpD detached')
        }
    },

    // 页面生命周期
    pageLifetimes: {
        show() {
            log('cmpD Page show')
        },

        hide() {
            log('cmpD Page hide')
        }
    }
})

log('Component D After')