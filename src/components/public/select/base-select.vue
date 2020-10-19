<template>
  <div class="base-select">
    <div class="base-select-top" @click="toggleSelect">
      <input type="text" readonly="readonly" :placeholder="curValue" :class="{'input-active':flag}">
      <i class="el-icon-arrow-down" :class="{active:flag}"></i>
    </div>
    <transition name="height">
      <div class="base-select-bottom"
           :class="'active-'+position"
           v-show="flag">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "base-select",
  data(){
    return {
      flag:false
    }
  },
  props:{
    value:{
      type:String,
      require:true
    },
    position:{
      type:'String',
      default:'bottom',
      validator:function (value){
        return ['bottom','top'].includes(value);
      }
    }
  },
  computed:{
    curValue(){
      return this.value?this.value:'请选择'
    }
  },
  methods:{
    toggleSelect(){
      this.flag=!this.flag;
    },
  },
  watch:{
    value:function (){
      this.flag=false;
    }
  }
}
</script>

<style scoped lang="less">
  .height-enter{
    opacity: 0;
  }
  .height-enter-active{
    transition: all .3s;
  }
  .height-enter-to{
    opacity: 1;
  }
  .base-select{
    display: inline-block;
    position: relative;
    font-size: 13px;
    &-top{
      position: relative;
      display: flex;
      align-items: center;
      &:hover{
        cursor: pointer;
      }
      input{
        width: 90px;
        height: 26px;
        padding-left: 10px;
        border: solid 1px #DEE3F0;
        transition: border-color .3s;
        &.input-active{
          border-color: #1A75FF;
        }
      }
      i{
        position: absolute;
        right: 5px;
        padding: 8px;
        color: #999999;
        transition: all .3s;
        &:hover{
          cursor: pointer;
        }
        &.active{
          transform: rotate(-180deg);
        }
      }
    }
    &-bottom{
      position: absolute;
      box-sizing: border-box;
      left: 0;
      right: 0;
      z-index: 100;
      padding: 10px 0;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      background-color: white;
      &:after{
        content: ' ';
        position: absolute;
        left: 10px;
        width: 0;
        height: 0;
        border-left: solid 6px transparent;
        border-right: solid 6px transparent;
      }
      &.active-bottom{
        top: 100%;
        margin-top: 16px;
        &:after{
          bottom: 100%;
          border-bottom: solid 8px white;
        }
      }
      &.active-top{
        bottom: 100%;
        margin-bottom: 16px;
        &:after{
          top: 100%;
          border-top: solid 8px white;
        }
      }
    }
  }
</style>
