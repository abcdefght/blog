<template>
    <div class="blog">
      <blog-detail></blog-detail>
      <Comment/>
    </div>
</template>

<script>
    import BlogDetail from './children/BlogDetail';
    import Comment from './children/Comment'

    export default {
        name: "Blog",
        components:{
          BlogDetail,
          Comment
        }
    }
</script>

<style scoped lang="less">
    .blog{
      max-width: 900px;
      margin: 5px auto;
      >div{
        padding: 15px;
        background-color: white;
      }
    }
</style>
