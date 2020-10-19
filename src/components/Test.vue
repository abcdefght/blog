<template>
    <div id="test">
      <button @click="removeCookie">click Me</button>
    </div>
</template>

<script>
  import cookies from 'vue-cookies';
  export default {
      name: "Test",
      methods:{
        removeCookie(){
          cookies.remove('csrftoken');
          console.log(cookies.get('csrftoken'));
        }
      }
  }
</script>

<style scoped lang="less">
  #test{
    margin: 100px;
    padding: 30px;
    height: 300px;
    background-color: white;

  }
</style>
