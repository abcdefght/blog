<template>
  <div class="admin-comment">
    <div class="admin-comment-con">
      <div>
        <p>博客列表 <a href="javascript:void(0)" @click="filterComment">过滤掉无评论的博客</a></p>
        <ul>
          <li v-for="(item,index) in arr" :key="index">
            <span>{{index+1}}.</span>
            <span :class="{active:blogId===item.id}">{{item.title}}</span>
            <a href="javascript:void(0)" @click="seeComment(item.comment,item.id)">查看评论({{item.comment}})</a>
            <a href="javascript:void(0)" @click="addComment(item.id,item.comment)">添加评论</a>
          </li>
        </ul>
      </div>
    </div>
    <transition name="width">
      <div v-show="comment.length>0&&showComment" class="comment-list">
        <p>评论列表(<span style="margin: 0">{{len}}</span>)<a href="javascript:void(0)" @click="showComment=false;">&times;</a></p>
        <div class="comment-item" v-for="(item,index) in comment">
          <div>
            <span>{{index+1}}楼</span>
            <span>{{item.name}}<span v-if="item.name==='awwac'" style="color: #00a67c;">[博主]</span></span>
          </div>
          <div class="comment-item-con">
            <div>
              <div>
                {{item.con}}
              </div>
              <div style="font-size: 13px;">{{item.pubDate|dateFilter}}&nbsp;
                <a href="javascript:void(0)" @click="replyComment(item.id)">回复</a>
                <a href="javascript:void(0)" @click="delComment(item.id)">删除</a></div>
            </div>
            <div class="children" v-for="(item2,index2) in item.child" :key="index2">
              <div>
                <div>&gt;&nbsp;<span>{{item2.name1}}<span v-if="item2.name1==='awwac'" style="color: #00a67c">[作者]</span></span>:{{item2.con}}</div>
                <div>{{item2.pubDate|dateFilter}}&nbsp;<a href="javascript:void(0)" @click="delSonComment(item.id,item2.id)">删除</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="opacity">
      <base-loading
        v-if="loading"
        type="fixed"
      >
      </base-loading>
    </transition>
    <transition name="slide">
      <base-box
        v-if="replyBoxFlag"
        @getCallBack="submitComment"
        :title="commentInfo">
        <div class="reply-comment-con">
          <textarea placeholder="请输入评论" v-model="commentCon"></textarea>
        </div>
      </base-box>
    </transition>
  </div>
</template>

<script>
import {getAllBlog,getComment} from "@/api/src";

export default {
  name: "admin-comment",
  data(){
    return {
      arr:[],
      comment:[],
      len:0,
      blogId:0,
      loading:false,
      temp:[],  // 临时存储之前已经请求的评论
      replyBoxFlag:false,
      commentInfo:'',
      commentCon:'',
      replyFlag:true, // true为添加评论，false为回复评论
      addFlag:false, // 添加评论时判断是否需要请求数据
      replyCommentId:0, // 回复评论的id
      randomId:1000,
      showComment:false
    }
  },
  created(){
    getAllBlog().then(res=>{
      if(res.code===200){
        this.arr=res.result.map(x=>({title:x.title,comment:x.comment,id:x.id}))
      }
    })
  },
  methods:{
    seeComment(num,id){
      if(num===0){
        this.$msg('该博客无评论');
      }
      else{
        this.showComment=true;
        this.loading=true;
        setTimeout(()=>{
          let index=this.temp.findIndex(x=>x.blogId===id);
          if(index===-1){
            getComment(id).then(res=>{
              if(res.code===200){
                this.showComment=true;
                this.temp.push({
                  len:res.len,
                  blogId:id,
                  result:res.result
                });
                this.blogId=id;
              }
            })
          }
          else{
            // 此时用户已经请求，从缓存中取出数据即可
            let index=this.temp.findIndex(x=>x.blogId===id);
            if(this.temp[index].len<num){
              getComment(id).then(res=>{
                if(res.code===200){
                  this.temp[index].result=[...this.temp[index].result,...res.result];
                  this.comment=this.temp[index].result
                  this.blogId=id;
                  let count=0;
                  for(let i=0;i<this.temp[index].result.length;i++){
                    count+=1;
                    count+=this.temp[index].result[i].child.length;
                  }
                  this.len=count;
                  this.temp[index].len=count;
                }
              })
            }
            else{
              this.comment=this.temp[index].result
              this.len=this.temp[index].len
              this.blogId=id;
            }
          }
          this.loading=false;
        },600);
      }
    },
    filterComment(){
      this.loading=true;
      setTimeout(()=>{
        this.arr=this.arr.filter(x=>x.comment>0);
        this.loading=false;
      },600);
    },
    delComment(id){
      let index=this.comment.findIndex(x=>x.id===id);
      let info=this.comment[index].child.length>0?'<span style="color: red;">该评论有他人的回复</span>，确定删除吗?':'确定删除这条评论吗?';
      this.$dialog({
        con:info,
        getCallBack:({res})=>{
          if(res){
            this.loading=true;
            setTimeout(()=>{
              this.comment.splice(index,1);
              let count=0;
              for(let i=0;i<this.comment.length;i++){
                count+=1;
                count+=this.comment[i].child.length;
              }
              this.len=count;
              let item=this.arr.find(x=>x.id===this.blogId);
              item.comment=count;
              this.loading=false;
              this.$msg.success('删除评论成功');
            },600)
          }
        }
      })
    },
    delSonComment(id1,id2){
      this.$dialog({
        con:`确定删除这条评论吗？`,
        getCallBack:({res})=>{
          if(res){
            this.loading=true;
            setTimeout(()=>{
              let item=this.comment.find(x=>x.id===id1).child;
              let index=item.findIndex(x=>x.id===id2);
              item.splice(index,1);
              let count=0;
              for(let i=0;i<this.comment.length;i++){
                count+=1;
                count+=this.comment[i].child.length;
              }
              this.len=count;
              let item2=this.arr.find(x=>x.id===this.blogId);
              item2.comment=count;
              this.loading=false;
              this.$msg.success('删除评论成功');
            },600);
          }
        }
      })
    },
    addComment(blogId,num){
      this.replyFlag=true;
      this.addFlag=num>0;
      this.blogId=blogId;
      this.commentInfo='添加评论';
      this.commentCon=''
      this.openCommentBox();
    },
    openCommentBox(){
      this.replyBoxFlag=true;
    },
    submitComment(flag){
      if(flag){
        if(this.commentCon.length>0){
          this.loading=true;
          setTimeout(()=>{
            if(this.replyFlag){
              // 添加评论
              let index=this.temp.findIndex(x=>x.blogId===this.blogId);
              let commentObj={
                id:this.randomId,
                name:'awwac',
                con:this.commentCon,
                pubDate:new Date().toLocaleDateString(),
                child:[]
              }
              if(index>-1){
                // temp存在缓存数据时，向缓存数据中添加
                this.temp[index].len+=1;
                this.temp[index].result.push(commentObj);
                this.randomId+=1;
                this.len+=1;
              }
              else{
                // temp不存在缓存数据时直接添加
                // addFlag为真时请求数据
                if(this.addFlag){
                  getComment(this.blogId).then(res=>{
                    if(res.code===200){
                      this.temp.push({
                        len:res.len,
                        blogId:this.blogId,
                        result:res.result
                      });
                    }
                  })
                }
                let obj={
                  len:1,
                  blogId:this.blogId,
                  result:[commentObj]
                };
                this.temp.push(obj);
                let index2=this.temp.findIndex(x=>x.blogId===this.blogId);
                this.comment=this.temp[index2].result;
                this.temp[index2].len=1;
                this.len=1;
              }
              let item=this.arr.find(x=>x.id===this.blogId);
              item.comment+=1;
              this.$msg.success('添加评论成功');
            }
            else{
              // 回复评论
              let item=this.comment.find(x=>x.id===this.replyCommentId).child;
              let obj={
                name1:'awwac',
                con:this.commentCon,
                pubDate:new Date().toLocaleDateString(),
                id:this.randomId
              };
              this.randomId+=1;
              item.push(obj);
              this.len+=1;
              let item2=this.arr.find(x=>x.id===this.blogId);
              item2.comment+=1;
              this.$msg.success('回复评论成功');
            }
            this.loading=false;
          },600);
          this.replyBoxFlag=false;
        }
        else{
          this.$msg.error('评论不能为空');
        }
      }
      else{
        this.replyBoxFlag=false;
      }
    },
    replyComment(blogId){
      this.replyFlag=false;
      this.commentInfo='回复评论';
      this.commentCon='';
      this.openCommentBox();
      this.replyCommentId=blogId;
    }
  },
  watch:{
    blogId:function (newVal){
      let index=this.temp.findIndex(x=>x.blogId===newVal);
      this.comment=index>-1?this.temp[index].result:[]
      this.len=index>-1?this.temp[index].len:0
    }
  },
  filters:{
    dateFilter(value){
      if(value.includes('-')){
        return value.split(' ')[0];
      }
      else{
        return value.replace(/\//g,'-');
      }
    },
  }
}
</script>

<style scoped lang="less">
  .admin-comment{
    margin: 10px;
    position: relative;
    &-con{
      background-color: white;
      padding: 20px;
      >div{
        >p{
          padding-bottom: 10px;
          color: #999999;
          font-size: 14px;
          span{
            margin: 0 10px;
            color: black;
          }
          a{
            color: #999999;
            transition: color .3s;
            &:hover{
              color:#FB524F;
            }
          }
        }
        &:nth-child(1){
          >ul{
            display: grid;
            gap: 10px;
            li{
              display: flex;
              align-items: center;
              flex-wrap: wrap;
              padding: 5px 0;
              >span{
                &:nth-child(1){
                  color: #999999;
                  margin-right: 10px;
                  font-family:Small-Italic,sans-serif;
                }
                &.active{
                  color: #00a67c;
                }
              }
              >a{
                font-size: 13px;
                margin-left: 10px;
                color:#999999;
                transition: color .3s;
                &:hover{
                  color:#FB524F;
                }
              }
            }
          }
        }
      }
    }
  }
  .comment-item{
    display: flex;
    &:nth-child(n+2){
      margin-top: 10px;
    }
    >div{
      &:nth-child(1){
        color: #00a67c;
        >span{
          font-size: 13px;
          color: #999999;
        }
      }
      &:nth-child(2){
        color: #999999;
        flex: 1;
        margin-left: 20px;
        background-color: #1E1E1E;
        padding: 10px;
        border-radius: 3px;
        position: relative;
        &:after{
          position: absolute;
          content: ' ';
          width: 0;
          height: 0;
          top: 5px;
          left: -12px;
          border-right: solid 12px #1E1E1E;
          border-top: solid 8px transparent;
          border-bottom: solid 8px transparent;
        }
        >div{
          &:nth-child(1){
            display: flex;
            justify-content: space-between;
          }
        }
        .children{
          margin-top: 6px;
          font-size: 13px;
          &:nth-child(2){
            border-top: solid 1px #1E1E1E;
          }
          >div{
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            margin: 6px 0;
          }
        }
        a{
          color: #999999;
          &:hover{
            text-decoration: underline;
          }
        }
      }
    }
  }
  .comment-list{
    background-color: rgba(71,70,70);
    position: fixed;
    z-index: 100;
    top: 0;
    bottom: 0;
    overflow: auto;
    right: 0;
    width: 600px;
    padding: 20px;
    box-sizing: border-box;
    font-size: 14px;
    transition: all .6s;
    >p{
      color: #999999;
      a{
        float: right;
        right: 20px;
        font-size: 20px;
        color: #999999;
        transition: color .3s;
        padding: 0 5px;
        &:hover{
          color: white;
        }
      }
    }
  }
  .width-enter,.width-leave-to{
    width: 0;
    opacity: 0 !important;
  }
  .reply-comment-con{
    textarea{
      border: solid 1px #EEEEEE;
      box-sizing: border-box;
      padding: 10px;
      width: 100%;
      height: 100px;
    }
  }
  @media screen and (max-width: 785px) {
    .comment-list{
      width: 100%;
    }
  }
</style>
