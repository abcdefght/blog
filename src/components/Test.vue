<template>
    <div id="test">

    </div>
</template>

<script>
  export default {
      name: "Test",
      created() {
        let a=[{id:1,name:'小明'},{id:2,name:'小红'}];
        let b=[]
        for(let i=0;i<a.length;i++){
          let c=Object.assign({},a[i]);
          b.push(c);
        }
      }
  }
</script>

<style scoped lang="less">
  #test{

  }
</style>
