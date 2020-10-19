<template>
    <transition name="m-slide">
        <div class="msg"
             :class="position"
             v-if="flag">
            <div>
              <i class="el-icon-error" v-if="type==='error'"></i>
              <i class="el-icon-warning" v-else-if="type==='warning'"></i>
              <i class="el-icon-success" v-else-if="type==='success'"></i>
              <i class="el-icon-info" v-else></i>
            </div>
            <div>
                {{con}}
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "base-msg",
        data(){
          return {
              flag:false,
              positionType:['top','bottom']
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
            },
            position:{
              type:String,
              default:'top',
              validator:function (value){
                return ['top','bottom'].includes(value)
              }
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
      &.top{
        left: 50%;
        top: 10%;
      }
      &.bottom{
        left: 50%;
        bottom: 10%;
      }
      position: fixed;
      background-color: white;
      padding: 10px 15px;
      transform: translateX(-50%);
      box-shadow: #DBD9D9 2px 2px 16px;
      display: flex;
      z-index: 1000;
      div{
          display: flex;
          align-items: center;
          font-size: 15px;
          i{
            font-size: 20px;
            margin-right: 10px;
            &.el-icon-info{
              color: #1890FF;
            }
            &.el-icon-success{
              color: #52C41A;
            }
            &.el-icon-error{
              color: #FF6365;
            }
            &.el-icon-warning{
              color: #FAAD14;
            }
          }
      }
    }
</style>
