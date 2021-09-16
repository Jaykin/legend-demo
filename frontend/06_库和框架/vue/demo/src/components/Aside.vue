<template>
  <el-aside width="auto">
    <div @click="handleCollapse" class="collapse-btn">{{$route.name}}-{{activeItem}}</div>
    <el-menu
      ref="menu1"
      class="el-menu-vertical-demo"
      :default-active="activeItem"
      :collapse="isCollapse"
      router
      @select="handleMenuSelect">
      <el-menu-item index="list1">
        <i class="el-icon-menu"></i>
        <span slot="title">导航1</span>
        <!-- <router-link slot="title" to="list1" tag="span">导航一</router-link> -->
      </el-menu-item>
      <el-menu-item index="list2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航2</span>
        <!-- <router-link slot="title" to="list2" tag="span">导航二</router-link> -->
      </el-menu-item>
      <el-menu-item index="list3">
        <i class="el-icon-document"></i>
        <span slot="title">导航3</span>
        <!-- <router-link slot="title" to="list3" tag="span">导航三</router-link> -->
      </el-menu-item>
      <el-menu-item index="list4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航4</span>
        <!-- <router-link slot="title" to="list4" tag="span">导航四</router-link> -->
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
const blcakRouteList = ['detail'] // 不触发 active 的路由名称

export default {
  name: 'Aside',
  data () {
    return {
      isCollapse: false,
      activeItem: this.$route.name
    }
  },
  watch: {
    $route: function (val) {
      const newIndex = val.name
      if (newIndex && blcakRouteList.indexOf(newIndex) < 0 && this.activeItem !== newIndex) {
        this.activeItem = newIndex
      }
    }
  },
  methods: {
    handleCollapse () {
      this.isCollapse = !this.isCollapse
    },

    handleMenuSelect (key, keyPath) {
      // this.$router.replace(`/${key}`)
    }
  },
  mounted () {
    // eslint-disable-next-line no-console
    // console.log(this.$refs);
    // this.$refs.menu1.open(1)
    //    this.$refs.menu1.open(2);
    //    this.$refs.menu1.open(3);
  }
}
</script>

<style lang="stylus" scoped>
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    // line-height: 200px;
  }
  .el-submenu__title{
    font-weight: bold;
    font-size: 16px;
    background-color: #ecf6fe;
  }
  .router-link{
    text-decoration: none;
  }

  .el-menu {
    width:
  }
  .collapse-btn {
    cursor pointer
    text-align left
  }
</style>
