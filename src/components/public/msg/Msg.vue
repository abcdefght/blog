<template>
    <transition name="msg">
        <div id="p-msg" v-if="flag">
            {{text}}
        </div>
    </transition>
</template>

<script>
    export default {
        name: "msg",
        data(){
          return {
            text:'',
            flag:false
          }
        },
        methods:{
          showMsg(title){
            this.text=title;
            this.flag=true;
            setTimeout(()=>{
              this.flag=false;
            },2000)
          }
        }
    }
</script>

<style scoped lang="less">
    #p-msg{
      position: fixed;
      width: 160px;
      padding:10px;
      left: 50%;
      top: 35%;
      background-color: black;
      color: white;
      z-index: 1000;
      opacity: 0.6;
      text-align: center;
      margin-left: -90px;
    }
    .msg-enter-active,.msg-leave-active{
      transition: all .6s;
      opacity: 0.6;
    }
    .msg-enter{
      opacity: 0;
      transform: scale(0.1,0.1);
    }
    .msg-leave-to{
      opacity: 0;
    }

</style>
