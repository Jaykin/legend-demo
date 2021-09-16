<template>
  <div id="app">
    <el-container direction="vertical" class="app-container">
      <Header class="theme-dark"/>
      <div>{{new Date()}}</div>
      <el-container>
        <Aside />
        <el-main>
          <keep-alive :include="includes">
            <router-view />
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from '@/components/Aside'
import Header from '@/components/Header'
import { routes } from '@/router'

export default {
  components: {
    Header,
    Aside
  },
  name: 'App',
  data () {
    return {
      isLogin: 0,
      includes: ['List1', 'List2', 'List3', 'List4', 'Detail']
    }
  },
  watch: {
    $route: function (val, oldVal) {
      const cName = oldVal.name.charAt(0).toUpperCase() + oldVal.name.slice(1)
      let newIncs = []
      this.includes.forEach((inc) => {
        if (inc === cName) {
          oldVal.meta.keepAlive && newIncs.push(inc)
        } else {
          newIncs.push(inc)
        }
      })
      this.includes = newIncs
      console.log(this.includes)
    }
  },
  methods: {
    handleLogin (res) {
      if (res.data.code === 0) {
        this.isLogin = 1
      } else {
        this.$alert('请先登录')
      }
    }
  }
}
</script>

<style lang="stylus">
html, body{
  height: 100%;
}
body {
  margin: 0;
}
#app {
  height: 100%;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB",
    "Microsoft YaHei","微软雅黑",Arial,sans-serif;
  background-color: #E9EEF3;
  text-align center
}

// 保证 el-main 滑动
.el-container {
  height 100%
  overflow auto
}
</style>
