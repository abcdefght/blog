<template>
  <div class="base-box">
    <p v-html="title" v-if="showTitle"></p>
    <div class="base-box-con">
      <slot></slot>
    </div>
    <div class="base-box-footer">
      <button @click="confirm(false)" v-if="showCancel">取消</button>
      <button @click="confirm(true)">确认</button>
    </div>
  </div>
</template>

<script>
import hidden from '../hidden'

export default {
  name: "base-box",
  props:{
    title:{
      type:String,
      default:'提示'
    },
    showTitle:{
      type:Boolean,
      default:true
    },
    showCancel:{
      type:Boolean,
      default: true
    }
  },
  created() {
    hidden(true);
  },
  beforeDestroy() {
    hidden(false);
  },
  methods:{
    confirm(flag){
      this.$emit('getCallBack',flag)
    }
  }
}
</script>

<style scoped lang="less">
  .base-box{
    position: fixed;
    left: 50%;
    top: 100px;
    background-color: white;
    z-index: 1000;
    padding: 20px;
    width: 330px;
    margin-left: -185px;
    &-footer{
      margin-top: 10px;
      display: flex;
      justify-content: flex-end;
      button{
        outline: none;
        border: solid 1px #E2E1E1;
        padding: 5px 12px;
        transition: all .3s;
        &:nth-child(1){
          background-color: white;
          &:hover{
            border-color: #2ba4e7;
          }
        }
        &:nth-child(2){
          background-color: #2ba4e7;
          color: white;
          border-color: #2ba4e7;
          margin-left: 20px;
          &:hover{
            opacity: .7;
          }
        }
      }
    }
    &-con{
      margin-top: 10px;
    }
  }
</style>
