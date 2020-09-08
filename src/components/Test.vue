<template>
    <div id="test">

    </div>
</template>

<script>
  export default {
      name: "Test",
      created(){
        let arr=[1,2,3];
        console.log(...arr.map(x => x ** 3)); // 1,8,27
        console.log(...arr.filter(x => x > 1)); // 2 3
        let arr2=[
          {id:1,name:'小明'},
          {id:2,name:'小红'},
          {id:3,name:'小智'}
        ];
        console.log(arr2.find(x => x.id === 2)); // {id:2,name:'小红'}
      }
  }
</script>

<style scoped lang="less">

</style>
