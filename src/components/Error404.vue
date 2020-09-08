<template>
    <div class="error-404">
      <div>
        <img src="../assets/img/404.png" alt="#">
      </div>
      <div>
        404，页面不存在
      </div>
    </div>
</template>

<script>
    export default {
        name: "error404"
    }
</script>

<style scoped>
   .error-404{
     position: fixed;
     width: 300px;
     height: 160px;
     left: 50%;
     top: 30%;
     margin-left: -150px;
     display: flex;
   }
  .error-404>div{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
  }
  .error-404>div>img{
    width: 100px;
    height: auto;
  }
</style>
