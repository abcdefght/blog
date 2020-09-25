<template>
  <div>
    <NavBar/>
    <div class="blog">
      <blog-detail></blog-detail>
      <Comment/>
    </div>
  </div>
</template>

<script>
    import BlogDetail from './children/BlogDetail';
    import Comment from './children/Comment';
    import NavBar from "../NavBar";

    export default {
        name: "Blog",
        components:{
          BlogDetail,
          Comment,
          NavBar
        }
    }
</script>

<style scoped lang="less">
    .blog{
      max-width: 900px;
      margin: 5px auto;
      >div{
        padding: 20px;
        background-color: white;
      }
    }
</style>
