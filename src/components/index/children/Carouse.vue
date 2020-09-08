<template>
    <div class="carouse" @mouseover="hoverClass='hover-class'">
      <div :class="{'active':1===num}" class="img"><img v-lazy="'https://www.uhnehc.top/api/media/carousel/test1.jpg'" alt=""></div>
      <div :class="{'active':2===num}" class="img"><img v-lazy="'https://www.uhnehc.top/api/media/carousel/test2.jpg'" alt=""></div>
      <div :class="{'active':3===num}" class="img"><img v-lazy="'https://www.uhnehc.top/api/media/carousel/test3.jpg'" alt=""></div>
      <div :class="{'active':4===num}" class="img"><img v-lazy="'https://www.uhnehc.top/api/media/carousel/test4.jpg'" alt=""></div>
      <div :class="{'active':5===num}" class="img"><img v-lazy="'https://www.uhnehc.top/api/media/carousel/test5.jpg'" alt=""></div>
      <div class="switch">
          <span :class="{'switch-active':1===num}"></span>
          <span :class="{'switch-active':2===num}"></span>
          <span :class="{'switch-active':3===num}"></span>
          <span :class="{'switch-active':4===num}"></span>
          <span :class="{'switch-active':5===num}"></span>
      </div>
      <div class="hover-style" :class="hoverClass"></div>
    </div>
</template>

<script>
    export default {
        name: "Carouse",
        data(){
          return {
            num:1,
            hoverClass:''
          }
        },
        mounted() {
          let that=this;
          setInterval(function () {
            that.num+=1;
            if(that.num>5){
              that.num=1;
            }
          },5000)
        },
    }
</script>

<style scoped lang="less">
  .carouse{
    width: 100%;
    height: 400px;
    overflow: hidden;
    position: relative;
    .img{
      width: 100%;
      height: 100%;
      position: absolute;
      transition: all 1.5s;
      z-index:5;
      opacity: 0;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .active{
      opacity: 1;
      z-index: 20;
    }
    .switch{
      width: 280px;
      height: 5px;
      position: absolute;
      z-index: 30;
      display: flex;
      left: 50%;
      top: 97%;
      margin-left: -140px;
      span{
        flex: 1;
        margin: 0 5px;
        background-color: white;
        opacity: 0.6;
      }
      >.switch-active{
        background-color: #393739;
      }
    }
  }
  .hover-style{
    position: absolute;
    width: 30px;
    height: 400px;
    background-color: white;
    z-index: 100;
    opacity: 0.5;
    transform: skew(-30deg) translateX(-90px);
    transition: transform 1.8s;
  }
  .hover-class{
    transform: translateX(1000px) skew(-30deg);
  }
</style>
