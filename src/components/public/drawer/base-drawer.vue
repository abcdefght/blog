<template>
  <div class="base-drawer" :class="flag?'active':'no-active'">
    <div @click="closeDrawer"></div>
    <div><slot></slot></div>
  </div>
</template>

<script>
export default {
  name: "base-drawer",
  data(){
    return {
      flag:true  // 组件离开时flag
    }
  },
  methods:{
    closeDrawer(){
      this.flag=false;
      setTimeout(()=>{
        this.$emit('close');
      },300)
    },
  }
}
</script>

<style scoped lang="less">
  @keyframes leftSlide {
    0%{
      max-width: 0;
    }
    100%{
      max-width: 500px;
    }
  }
  @keyframes rightSlide {
    0%{
      max-width: 500px;
    }
    100%{
      max-width: 0;
    }
  }
  @keyframes opacity {
    0%{
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }
  @keyframes opacity2 {
    0%{
      opacity: 1;
    }
    100%{
      opacity: 0;
    }
  }
  .base-drawer{
    position: absolute;
    &.active{
      animation: opacity .3s 1;
      animation-fill-mode: forwards;
    }
    &.no-active{
      animation: opacity2 .3s 1;
      animation-fill-mode: forwards;
      >div{
        &:nth-child(2){
          animation: rightSlide .3s 1;
          animation-fill-mode: forwards;
        }
      }
    }
    left: 0;
    top: 0;
    display: flex;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.45);
    z-index: 1000;
    >div{
      &:nth-child(1){
        flex: 1;
        transition: all .3s;
        min-width: 100px;
      }
      &:nth-child(2){
        animation: leftSlide .3s 1;
        animation-fill-mode: forwards;
        overflow: hidden;
        background-color: white;
      }
    }
  }
</style>
