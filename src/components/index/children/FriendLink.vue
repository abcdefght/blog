<template>
    <div class="friend-link">
      <p>友情链接</p>
      <div>
        <a href="https://blog.csdn.net/qq_42402381" target="_blank">awwac的博客</a>
        <a href="https://www.cnblogs.com/uhnehc/" target="_blank">awwao的博客</a>
      </div>
    </div>
</template>

<script>
    export default {
        name: "FriendLink"
    }
</script>

<style scoped lang="less">
  .friend-link{
    >p{
      padding-bottom: 5px;
      border-bottom: 1px solid #EEEEEE;
    }
    >div{
      display: flex;
      justify-content: space-between;
      margin-top: 5px;
      a{
        color: #A56F84;
        text-decoration: none;
        &:hover{
          color: red;
          text-decoration: underline;
        }
      }
    }
  }
</style>
