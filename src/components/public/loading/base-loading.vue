<template>
    <div class="loading"
         :class="{'loading-active':type==='float','fixed-active':type==='fixed'}">
      <div>
        <i class="el-icon-loading"></i>{{con}}....
      </div>
    </div>
</template>

<script>
export default {
  name: "base-loading",
  props:{
    con:{
      type:String,
      default:'玩命加载中'
    },
    type:{
      type:String,
      default:'default',
      validator:function (value){
        return ['default','float','fixed'].includes(value)
      }
    },
  }
}
</script>

<style scoped lang="less">
  .loading{
    font-size: 14px;
    >div{
        display: flex;
        align-items: center;
        justify-content: center;
        i{
          font-size: 20px;
          margin-right: 10px;
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
      >div{
        max-width: 300px;
        padding: 20px;
        background-color: rgba(64,63,63,.9);
        color: white;
        border-radius: 5px;
      }
    }
    &.fixed-active{
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 100;
      >div{
        background-color: rgba(4,0,0,.6);
        padding: 20px;
        color: white;
        border-radius: 5px;
      }
    }
  }
</style>
