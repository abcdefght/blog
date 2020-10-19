<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import NavBar from '@com/Navbar';

  export default {
    name: 'App',
    components:{
      NavBar
    }
  }
</script>


<style lang="less">
  @import "../src/assets/less/global.less";
  @import "assets/less/code.less";
  #app{
    height: 100%;
    position: relative;
  }
</style>
