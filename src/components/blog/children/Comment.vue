<template>
    <div class="user-comment">
      <p>评论列表<span>{{len}}</span></p>
      <div v-for="(item,index) in commentData" :key="index" class="item">
        <div>{{item.name}}：</div>
        <div class="item-right">
          <div>
            <div>
            {{item.con}}
          </div>
            <div>
              <span>{{item.pubDate|localFilter}}</span><a href="javascript:void(0)" @click="reply(item.name,item.id)">回复</a>
            </div>
          </div>
          <div v-if="item.child.length>0" class="children">
            <div v-for="(item2,index2) in item.child" :key="index2">
              <div><span style="font-weight: bold;margin-right: 5px;">&gt;</span>{{item2.name1}}:{{item2.con}}</div>
              <div>{{item2.pubDate|localFilter}}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="commentData.length===0" class="no-data">
        暂无评论，快来抢沙发！
      </div>
      <div class="post-comment">
        <textarea :placeholder="commentText" id="comment" v-model="detail"></textarea>
        <div>
          <button @click="addComment()">
            <img src="../../../assets/img/post.png" alt="">
            发表</button>
        </div>
      </div>
      <transition name="opacity">
        <Loading2 v-if="loading" :float="true"/>
      </transition>
    </div>
</template>

<script>
    import {getComment,addComment,replyComment} from "../../../api/src";

    export default {
        name: "Comment",
        data(){
            return {
              commentData:[],
              commentText:'说几句话吧！',
              flag:false,  // false 直接增加评论 true 回复评论
              id:0, // 回复人id
              detail:'',
              inputValue:1,
              len:0, // 评论长度
              user:'游客',
              loading:false
            }
          },
        methods:{
          addComment(){
            if(this.detail===''){
              this.$msg.warning({con:'评论不能为空'});
              return
            }
            if(this.flag){
              // 回复评论
              let postData={u:this.user, con:this.detail};
              this.loading=true;
              setTimeout(()=>{
                replyComment(this.$route.params.id,this.id,postData).then(res=>{
                  if(res.code===200){
                    this.loading=false;
                    this.$msg({con:'回复评论成功'});
                    this.detail='';
                    this.flag=false;
                    this.commentText='说几句话吧!';
                    setTimeout(()=>{
                      getComment(this.$route.params.id).then(res=>{
                        if(res.code===200){
                          this.commentData=res.result;
                          this.len=res.len;
                        }
                      })
                    },1000)
                  }
                })
              },1000);
            }
            else{
              // 增加评论
              // type 为true 直接增加评论 为false 回复评论
              let postData={u:this.user, con:this.detail};
              this.loading=true;
              setTimeout(()=>{
                addComment(this.$route.params.id,postData).then(res=>{
                  if(res.code===200){
                    this.loading=false;
                    this.$msg({con:res.msg})
                    this.detail='';
                    this.commentText='说几句话吧!';
                    setTimeout(()=>{
                      getComment(this.$route.params.id).then(res=>{
                        if(res.code===200){
                          this.commentData=res.result;
                          this.len=res.len;
                        }
                      })
                    },1000)
                  }
                })
              },1000);
            }
          },
          reply(name,id){
            this.commentText=`回复${name}:`;
            document.getElementById('comment').focus();
            this.id=id;
            this.flag=true;
          },
          getData(){
            const blogId=this.$route.params.id;
            getComment(blogId).then(res=>{
              if(res.code===200){
                console.log(res.result);
                this.commentData=res.result;
                this.len=res.len;
              }
            })
          }
        },
        watch:{
          $route:{
            handler(){
             this.getData();
            },
            immediate:true
          },
        },
    }
</script>

<style scoped lang="less">
  .user-comment{
    padding: 20px;
    margin: 10px 0;
    background-color: white;
    position: relative;
    >.no-data{
      font-size: 14px;
      margin: 10px 0;
      color: #999999;
    }
    >p{
      padding-bottom: 5px;
      border-bottom: solid 1px #EEEEEE;
      span{
        color: #999999;
        margin-left: 5px;
      }
    }
    >.post-comment{
      margin-top: 10px;
      textarea{
        height: 100px;
        display: block;
        border: solid 1px #EEEEEE;
        font-size: 15px;
        padding: 10px;
        box-sizing: border-box;
        width: 100%;
        transition: all .3s;
        &:focus{
          border-color: #00a67c;
        }
      }
      >div{
        display: flex;
        justify-content: flex-end;
        button{
          margin-top: 5px;
          display: flex;
          align-items: center;
          border: none;
          padding: 5px;
          background-color: white;
          transition: all .3s;
          &:hover{
            background-color: #EEEEEE;
          }
          img{
            width: 20px;
            height: auto;
            margin-right: 5px;
          }
        }
      }
    }
  }
  .item{
    display: flex;
    padding: 10px 0;
    &-right{
      flex: 1;
      >div{
        &:nth-child(1){
          display: flex;
          >div{
            &:nth-child(1){
              flex: 1;
              padding-bottom: 5px;
            }
            &:nth-child(2){
              text-align: right;
            }
          }
          span{
            font-size: 14px;
          }
          a{
            margin-left: 10px;
            color: #009688;
            text-decoration: none;
            font-size: 15px;
            &:hover{
              text-decoration: underline;
            }
          }
        }
        &:nth-child(2){
          font-size: 14px;
          border-top: solid 1px #999999;
          padding-top: 5px;
          >div{
            display: flex;
            padding: 5px 0;
            >div{
              &:nth-child(1){
                flex: 1;
              }
              &:nth-child(2){
                text-align: right;
              }
            }
          }
        }
      }
    }
  }
</style>
