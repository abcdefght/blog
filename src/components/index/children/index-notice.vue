<template>
    <div class="notice">
      <p><img src="../../../assets/img/notice.png" alt="">公告</p>
      <div>
        个人创作的个人博客，记录生活的点点滴滴！
      </div>
    </div>
</template>

<script>
    export default {
        name: "index-notice"
    }
</script>

<style scoped lang="less">
  .notice{
    >p{
      padding-bottom: 5px;
      border-bottom: 1px solid #EEEEEE;
      display: flex;
      align-items: center;
      img{
        width: 24px;
        height: auto;
        margin-right: 10px;
      }
    }
    >div{
      padding: 10px;
      text-indent: 2em;
    }
  }

</style>
