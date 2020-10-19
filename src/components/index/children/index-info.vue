<template>
  <div class="index-info">
    awwac个人博客
    <span class="sep">|</span>
    托管于阿里云服务器
    <span class="sep">|</span>
    <a href="https://github.com/abcdefght/blog" target="_blank">项目地址</a>
    <span class="sep">|</span>
    <a href="http://www.beian.miit.gov.cn/" target="_blank">鄂ICP备18014803号-1</a>

  </div>

</template>

<script>
    export default {
        name: "index-info",
    }
</script>

<style scoped lang="less">
  .index-info{
    border-top: solid 6px #D56464;
    color: #cccccc;
    background-color: #333333;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0;
    a {
        color: #cccccc;
        &:hover {
          color: white;
          text-decoration: underline;
        }
      }
    .sep{
        margin: 0 10px;
      }
  }
</style>
