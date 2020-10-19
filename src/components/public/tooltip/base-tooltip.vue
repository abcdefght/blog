<template>
  <div class="base-tooltip">
    <div class="base-tooltip-con" @mouseover="openCon" @mouseout="closeCon">
      <slot></slot>
    </div>
    <transition name="scale">
      <div class="base-tooltip-info" v-show="flag">
        <span></span>
        {{info}}
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "base-tooltip",
  data:()=>({
    flag:false
  }),
  props:{
    info:{
      type:String,
      require:true
    },
  },
  methods:{
    openCon(){
      this.flag=true
    },
    closeCon(){
      this.flag=false;
    }
  },
}
</script>

<style scoped lang="less">
  .scale-enter-active,.scale-leave-active{
    transition: all .3s;
  }
  .scale-enter{
    opacity: 0;
    transform: scale(0.8);
    transform-origin: 0 100%;
  }
  .scale-leave-to{
    opacity: 0;
  }
  .scale-enter-to,.scale-leave{
    transform: scale(1,1);
    opacity: 1;
  }
  .base-tooltip{
    position: relative;
    display: inline-block;
    &-info{
      position: absolute;
      padding: 8px 14px;
      font-size: 12px;
      bottom: 100%;
      left: 0;
      margin-bottom: 16px;
      background-color: #2D2D2D;
      color: white;
      display: inline;
      span{
        position: absolute;
        width: 0;
        height: 0;
        border-left: solid 5px transparent;
        border-right: solid 5px transparent;
        border-top: solid 8px #2D2D2D;
        top: 100%;
        left: 6px;
      }
    }
  }
</style>
