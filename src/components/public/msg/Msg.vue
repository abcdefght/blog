<template>
    <transition name="m-slide">
        <div class="msg" v-if="flag">
            <div>
                <img src="../img/error.png" alt="#" v-if="type==='error'">
                <img src="../img/warning.png" alt="#" v-else-if="type==='warning'">
                <img src="../img/success.png" alt="#" v-else-if="type==='success'">
                <img src="../img/info.png" alt="#" v-else>
            </div>
            <div>
                {{con}}
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "Msg",
        data(){
          return {
              flag:false
          }
        },
        props:{
            con:{
                type:String,
                required:true
            },
            type: {
                type:String,
                default:'info'
            },
            duration:{
                type:Number,
                default: 3000
            }
        },
        methods:{
            closeMsg(){
                setTimeout(()=>{
                  this.flag=false;
                  // 页面移出过渡结束后删除子节点
                  setTimeout(()=>{
                      document.body.removeChild(this.$el);
                  },300);
                },this.duration);
            }
        }
    }
</script>

<style scoped lang="less">
    .m-slide-enter-active,.m-slide-leave-active{
        opacity: 1;
        transition: all .3s;
    }
    .msg.m-slide-enter{
        opacity: 0;
        transform: translate(-50%,-20px);
    }
    .msg.m-slide-leave-to{
        opacity: 0;
        transform: translate(-50%,20px);
    }
    .msg{
        position: fixed;
        background-color: white;
        padding: 10px 15px;
        transform: translateX(-50%);
        left: 50%;
        top: 10%;
        box-shadow: #DBD9D9 2px 2px 16px;
        display: flex;
        div{
            display: flex;
            align-items: center;
            font-size: 15px;
            img{
                width: 20px;
                height: 20px;
                padding-right: 10px;
            }
        }

    }
</style>
