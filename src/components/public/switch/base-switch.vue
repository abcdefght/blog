<template>
    <div class="switch"  @click="toggle" :class="{active2:flag2,active:curFlag}">
        <div></div>
        <span v-if="textShow">{{infoText}}</span>
    </div>
</template>

<script>
    export default {
        name: "base-switch",
        data(){
            return {
                flag2:false,  // 点击波浪效果
                curFlag:this.flag
            }
        },
        props:{
            text:{
              type:String,
              default: 'on|off'
            },
            textShow:{
              type:Boolean,
              default:true
            },
            flag:{  // Flag值
                type:Boolean,
                default:true
            },
            params:[String,Number,Object],   // 可能需要的参数[可选]
        },
      methods:{
            toggle(){
              this.$emit('click',this.params)
            }
        },
        computed:{
          infoText(){
            return this.curFlag?this.text.split('|')[0]:this.text.split('|')[1];
          }
        },
        watch:{
          'flag':function (newVal){
            this.flag2=true;
            this.curFlag=newVal;
            setTimeout(()=>{
              this.flag2=false;
            },600);
          }
        }
    }
</script>

<style scoped lang="less">
    @keyframes wave {
        80%{
            transform: scale(1.2,1.5);
            opacity: 0;
        }
        100%{
            opacity: 0;
            transform: scale(1,1);
        }
    }
    .switch{
        width: 56px;
        height: 22px;
        background-color: #BFBFBF;
        border-radius: 12px;
        position: relative;
        font-size: 13px;
        span{
          position: absolute;
          top: 0;
          line-height: 22px;
          left: 8px;
          font-family: Small,sans-serif;
          transition: all .3s;
        }
        &.active{
            background-color: #3683FD;
            div{
                left: 4px;
            }
            span{
              left: 30px;
              color: white;
            }
        }
        div{
            left: 35px;
            position: absolute;
            display: inline-block;
            width: 16px;
            height: 16px;
            background-color: white;
            border-radius: 50%;
            margin: 3px 0;
            transition: all .3s;
        }
        &:after{
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            border-radius: 12px;
            background-color: #85B4FE;
            z-index: -1;
        }
        &.active2{
            &:after{
                animation: wave .6s 1;
                z-index: 2;
            }
        }
    }
</style>
