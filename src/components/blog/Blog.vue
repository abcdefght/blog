<template>
  <div>
    <NavBar/>
    <div class="blog">
      <blog-detail></blog-detail>
      <blog-comment></blog-comment>
    </div>
  </div>
</template>

<script>
    import BlogDetail from './children/blog-detail';
    import BlogComment from './children/blog-comment';
    import NavBar from "../Navbar";

    export default {
        name: "Blog",
        components:{
          BlogDetail,
          BlogComment,
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
