<template>
    <div class="notice">
      <p>公告</p>
      <div>
        个人创作的个人博客，记录生活的点点滴滴！
      </div>
    </div>
</template>

<script>
    export default {
        name: "Notice"
    }
</script>

<style scoped lang="less">
  .notice{
    >p{
      padding-bottom: 5px;
      border-bottom: 1px solid #EEEEEE;
    }
    >div{
      padding: 10px;
      text-indent: 2em;
    }
  }

</style>
