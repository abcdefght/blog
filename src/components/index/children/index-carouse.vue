<template>
    <div class="carouse" @mouseover="hoverClass='hover-class'">
      <div :class="{'active':1===num}" class="img"><img v-lazy="'https://www.uhnehc.top/api/media/carousel/test1.jpg'" alt=""></div>
      <div :class="{'active':2===num}" class="img"><img v-lazy="'https://www.uhnehc.top/api/media/carousel/test2.jpg'" alt=""></div>
      <div :class="{'active':3===num}" class="img"><img v-lazy="'https://www.uhnehc.top/api/media/carousel/test3.jpg'" alt=""></div>
      <div :class="{'active':4===num}" class="img"><img v-lazy="'https://www.uhnehc.top/api/media/carousel/test4.jpg'" alt=""></div>
      <div :class="{'active':5===num}" class="img"><img v-lazy="'https://www.uhnehc.top/api/media/carousel/test5.jpg'" alt=""></div>
      <div class="switch">
          <span><i :class="{'i-active':num===1}"></i></span>
          <span><i :class="{'i-active':num===2}"></i></span>
          <span><i :class="{'i-active':num===3}"></i></span>
          <span><i :class="{'i-active':num===4}"></i></span>
          <span><i :class="{'i-active':num===5}"></i></span>
      </div>
      <div class="hover-style" :class="hoverClass"></div>
    </div>
</template>

<script>
    export default {
        name: "index-carouse",
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
  @keyframes move {
    0%{
      width: 0;
      left:0;
    }
    10%,90%{
      width: 100%;
      left: 0;
      background-color: black;
    }
    100%{
      width: 0;
      left: 100%;
    }
  }
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
      width: 300px;
      height: 6px;
      position: absolute;
      z-index: 30;
      display: flex;
      justify-content: space-around;
      left: 50%;
      top: 97%;
      margin-left: -150px;
      span{
        width: 45px;
        background-color: white;
        opacity: 0.6;
        position: relative;
        i{
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          z-index: 100;
          &.i-active{
            animation: move 5s 1;
            animation-fill-mode: forwards;
          }
        }
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
