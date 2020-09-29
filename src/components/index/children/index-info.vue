<template>
  <div>
    <div class="foot-top">
    </div>
    <div class="foot-info">
      <span>awwac个人博客</span>
      <span>|</span>
      <a href="http://www.beian.miit.gov.cn/" target="_blank">鄂ICP备18014803号-1</a>
    </div>
  </div>

</template>

<script>
    export default {
        name: "index-info",
    }
</script>

<style scoped lang="less">

  .foot-info {
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #cccccc;
    background-color: #333333;
    padding: 10px;
    > a {
      color: #cccccc;
      &:hover {
        color: white;
        text-decoration: underline;
      }
    }
    >span{
      &:nth-child(2){
        margin: 0 10px;
      }
    }
  }
  .foot-top{
    height: 6px;
    background-color: #D56464;
  }
</style>
