<template>
  <el-header height="65px">
    <div class="logo">开放平台</div>
  </el-header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="stylus">
.el-header{
  background: rgba(0,0,0,.4);
  color: #fff;
  line-height 65px
  &.theme-dark{
    background: #313131;
  }
}
</style>
