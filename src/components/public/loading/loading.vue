<template>
    <transition name="opacity">
      <div id="loading" v-if="flag">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </transition>
</template>

<script>
    export default {
        name: "loading",
        data(){
          return {
            flag:false
          }
        },
        methods:{
          open(){
            this.flag=true;
          },
          close(){
            this.flag=false;
          }
        }
    }
</script>

<style scoped lang="less">
  #loading{
    display: flex;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    align-items: center;
    z-index: 100;
    justify-content: center;
    padding: 30px;
    .dot{
      position: relative;
      width: 20px;
      height: 20px;
      margin: 10px;
      border-radius: 50%;
      &:before{
        position: absolute;
        content: '';
        width: 100%;
        height: 100%;
        background: inherit;
        border-radius: inherit;
        animation: wave 2s ease-out infinite;
      }
      &:nth-child(1){
        background-color: #F9532C;
      }
      &:nth-child(2){
        background-color: #00a67c;
        &:before{
          animation-delay: .2s;
        }
      }
      &:nth-child(3){
        background-color: #1eb6fd;
        &:before{
          animation-delay: .4s;
        }
      }
    }
  }
  @keyframes wave {
    50%,75%{
      transform: scale(2.5);
    }
    80%,100%{
      opacity: 0;
    }
  }
</style>
