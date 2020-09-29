<template>
    <transition name="d-slide">
        <div class="dialog" v-if="flag">
            <div class="top">
                <div><img src="../img/warning.png" alt="#"></div>
                <div>提示</div>
            </div>
            <div class="con" v-html="con">

            </div>
            <div class="bottom">
                <button @click="closeDialog(false)">取消</button>
                <button @click="closeDialog(true)">确定</button>
            </div>
        </div>
    </transition>
</template>

<script>
    import hidden from '../hidden';
    export default {
        name: "v-dialog",
        data(){
            return {
                flag:false
            }
        },
        methods:{
            closeDialog(flag){
              this.flag=false;
              let temp=[];
              this.$el.querySelectorAll('.con input').forEach(x=>{
                if(x.value){
                  temp.push(x.value);
                }
              })
              document.body.removeChild(this.$el);
              if(temp.length>0){
                this.getCallBack({res:flag,params:temp[0]});
              }
              else{
                this.getCallBack({res:flag})
              }
            }
        },
        props:{
            con:{
                type:String,
                required:true
            },
            getCallBack:{
                type: Function,
                default:()=>{}
            },
        },
        watch:{
            flag:function (newVal) {
                hidden(newVal);
            }
        }
    }
</script>

<style scoped lang="less">
    .d-slide-enter-active{
        opacity: 1;
        transition: all .3s;
    }
    .dialog.d-slide-enter{
        opacity: 0;
        transform: translate(-50%,-20px);
    }
    .dialog{
        position: fixed;
        background-color: white;
        max-width: 360px;
        min-width: 300px;
        padding: 20px;
        z-index: 1000;
        left: 50%;
        top: 10%;
        transform: translateX(-50%);
        .close{
            font-size: 20px;
            font-weight: bolder;
        }
        .top{
            display: flex;
            div{
               img{
                   width: 22px;
                   height: auto;
               }
                &:nth-child(2){
                    margin-left: 10px;
                }
            }
        }
        .con{
            padding: 10px 0;
        }
        .bottom{
            display: flex;
            justify-content: flex-end;
            button{
                padding: 6px 14px;
                margin-left: 20px;
                outline: none;
                border-radius: 2px;
                transition: all .3s;
                &:hover{
                    cursor: pointer;
                }
                &:nth-child(1){
                    background-color: white;
                    border: solid 1px #EEEEEE;
                    color: #999999;
                    &:hover{
                        color: #1890FF;
                        border-color: #1890FF;
                    }
                }
                &:nth-child(2){
                    background-color: #1890FF;
                    color: white;
                    border: none;
                    &:hover{
                        opacity: .7;
                    }
                }
            }
        }
    }
</style>
