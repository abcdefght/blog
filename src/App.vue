<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import NavBar from './components/NavBar';

  export default {
    name: 'App',
    components:{
      NavBar
    },

}
</script>


<style lang="less">
  @import "../src/assets/less/global.less";
</style>
<style>
  @import "../src/assets/css/code.css";
  #app{
    height: 100%;
    position: relative;
  }
</style>
