<template>
  <div>
    <h1>This is list1 page</h1>
    <p>{{backData}}</p>
    <el-input v-model="txt"></el-input>
    <el-button type="text" @click="goTo('/detail')">to detail</el-button>
  </div>
</template>

<script>
import { isNavRoute } from '@/router/index'
import store from '@/utils/store'

export default {
  name: 'List1',
  data () {
    return {
      txt: '',
      backData: ''
    }
  },
  mounted () {
    console.log('mock', 'mounted', store.getData('sels'))
  },
  activated () {
    this.backData = JSON.stringify(store.getData('sels'))
    store.removeData('sels')
  },
  beforeRouteLeave (to, from, next) {
    from.meta.keepAlive = !isNavRoute(to.name)
    console.log('List1 beforeRouteLeave')
    next()
  },
  methods: {
    goTo (path) {
      this.$router.push(path)
    }
  }
}
</script>
