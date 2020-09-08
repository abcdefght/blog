<template>
    <div class="user-show">
        <p>关于博主</p>
        <div class="top">
          <div>
            <img :src="user.imgUrl" alt="#">
          </div>
          <div>
            <p>{{user.nick}}</p>
            <p>{{user.motto}}</p>
          </div>
        </div>
        <div class="user-show-bottom">
          <div>
            <div>文章</div>
            <div>{{user.blogLength}}</div>
          </div>
          <div>
            <div>标签</div>
            <div>{{user.tagLength}}</div>
          </div>
          <div>
            <div>访问</div>
            <div>{{user.number}}</div>
          </div>
        </div>
    </div>
</template>

<script>
    import {getUser} from "../../../api/src";

    export default {
        name: "UserShow",
        data(){
          return {
            user:{
              motto:'',
              imgUrl:'',
              user:'',
              uid:'',
              blogLength:0,
              number:0,
              comment:0,
              tagLength:0
            }
          }
        },
        created(){
          let uid=this.$route.params.uid;
          getUser(uid).then(res=>{
            if(res.code===200){
              this.user=res.result;
            }
          })
        },
        watch:{
          '$route.params.uid':function (newVal) {
            let uid=this.$route.params.uid;
            getUser(uid).then(res=>{
              if(res.code===200){
                this.user=res.result;
              }
            })
          }
        }
    }
</script>

<style scoped lang="less">
  .user-show{
    >p{
      border-bottom: solid 1px #EEEEEE;
      margin: 0 0 5px 5px;
      padding-bottom: 5px;
    }
    >.top{
      height: 90px;
      display: flex;
      border-bottom: 1px solid #e3e3e3;
      >div{
        &:nth-child(1){
          width: 100px;
          display: flex;
          height: 100%;
          justify-content: center;
          align-items: center;
          >img{
            height: 70px;
            width: auto;
            &:hover{
              cursor: pointer;
            }
          }
        }
        &:nth-child(2){
          >p{
            &:nth-child(1){
              padding: 5px;
            }
            &:nth-child(2){
              padding: 0 5px;
              font-size: 14px;
              color: #999999;
            }
          }
        }
      }
    }
  }
  .user-show-bottom{
    display: flex;
    >div{
      flex: 1;
      margin: 6px;
      div{
        text-align: center;
      }
    }
  }

</style>
