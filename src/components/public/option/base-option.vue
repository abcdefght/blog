<template>
  <div class="base-option" @click="getValue" :class="{'base-option-active':active}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "base-option",
  props:{
    active:{
      type:Boolean,
      default:false
    }
  },
  methods:{
    getValue(){
      this.$emit('click')
    }
  }
}
</script>

<style scoped lang="less">
  .base-option{
    padding: 5px 0 5px 10px;
    color: #999999;
    &-active{
      color: #D56464;
      font-weight: bold;
    }
    &:hover{
      background-color: #F5F7FA;
      cursor: pointer;
    }
  }
</style>
