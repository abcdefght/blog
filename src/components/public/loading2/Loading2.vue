<template>
    <div class="loading2" :class="[{'loading-active':float},'num'+type]">
      <div></div>
      <div>
        <img src="../img/loading.png" alt="">
        {{con}}....
      </div>
    </div>
</template>

<script>
export default {
  name: "Loading2",
  props:{
    con:{
      type:String,
      default:'玩命加载中'
    },
    float:{
      type:Boolean,
      default: false
    },
    type:{
      type:Number,
      default:0
    }
  }
}
</script>

<style scoped lang="less">
  @keyframes rotateImg {
    0%{
      transform: rotate(0deg);
    }
    100%{
      transform: rotate(360deg);
    }
  }
  .loading2{
    font-size: 14px;
    >div{
      &:nth-child(2){
        display: flex;
        align-items: center;
        justify-content: center;
        img{
          width: 30px;
          height: 30px;
          margin-right: 10px;
          animation: rotateImg .8s infinite;
        }
      }
    }
    &.loading-active{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      &.num1{
        >div{
          &:nth-child(1){
            background-color: transparent;
          }
          &:nth-child(2){
            padding: 20px;
            opacity: .7;
            background-color: black;
            color: white;
            border-radius: 5px;
          }
        }
      }
      >div{
        &:nth-child(1){
          background-color: white;
          z-index: 100;
          opacity: .6;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }
        &:nth-child(2){
          z-index: 999;
        }
      }
    }
  }
</style>
