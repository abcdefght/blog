<template>
  <div class="admin-word">
    <p class="user-options">
      操作:
      <a href="javascript:void(0)" @click="addComment">添加留言</a>
      <a href="javascript:void(0)" class="see-comment">查看留言
        <div>
          <a href="javascript:void(0)" @click="seeBlogWord">查看博主留言</a>
          <a href="javascript:void(0)" @click="seeAllWord">查看全部留言</a>
        </div>
      </a>
      <a href="javascript:void(0)" class="time-sort" @click="sortByTime">按时间排序
        <span :class="{'span-active':rotateFlag}"></span>
      </a>
    </p>
    <div class="admin-word-con">
      <table>
        <tbody>
        <tr>
          <td>id</td>
          <td>昵称</td>
          <td>评论内容</td>
          <td>时间</td>
          <td>操作</td>
        </tr>
        <tr v-for="(item,index) in curArr" :key="index">
          <td>{{item.id}}</td>
          <td class="word-user">{{item.access|userFilter}}<span v-if="item.access">博主</span></td>
          <td v-if="item.con.length<40">{{item.con}}</td>
          <td v-else class="long-comment">{{item.con.slice(0,40)+'...'}}
            <a href="javascript:void(0)" @click="seeAll(item.con)">查看全部</a>
          </td>
          <td>{{item.pubDate}}</td>
          <td class="options">
            <button @click="seeComment(item.count,item.id)"><i class="el-icon-thumb"></i>查看评论&nbsp;{{item.count}}</button>
            <button @click="reply(item.id)"><i class="el-icon-position"></i>回复</button>
            <button @click="delComment(item.id,item.count)"><i class="el-icon-delete"></i>删除</button>
          </td>
        </tr>
        </tbody>
      </table>
      <transition name="opacity">
        <base-loading
          v-show="loading"
          type="float"
          style="z-index: 2000;">
        </base-loading>
      </transition>
      <transition name="opacity">
        <base-drawer v-if="flag" @close="flag=false;">
          <div style="margin-left: 10px;min-width: 400px;">
            <p style="padding-bottom: 10px;">回复列表</p>
            <div v-for="(item,index) in childrenComment" :key="index" class="comment-item">
              <div><span>{{index+1}}楼</span>{{item.access|userFilter}}</div>
              <div>
                <div>
                  {{item.con}}
                </div>
                <p>{{item.pubDate}}<a href="javascript:void(0)" @click="delSonComment(item.id)">删除</a></p>
              </div>
            </div>
          </div>
        </base-drawer>
      </transition>
    </div>
    <p class="footer">
      <a href="javascript:void(0)" class="page" @click="pre">上一页</a>
      <a href="javascript:void(0)"
         v-for="(item,index) in pageArr"
         :class="{active:item===page+1}"
         :key="index"
         @click="goPage(item)">
        {{item}}
      </a>
      <a href="javascript:void(0)" style="margin-right: 10px" class="page" @click="next">下一页</a>
      共{{len}}条评论
    </p>
    <transition name="slide">
      <base-box
        v-if="replyBoxFlag"
        @getCallBack="getCallBack"
        :title="title">
        <div class="reply-word">
          <textarea placeholder="请输入:(留言不能为空)" v-model="word"></textarea>
        </div>
      </base-box>
    </transition>
    <transition name="slide">
      <base-box
        v-if="showWordFlag"
        :show-cancel="false"
        :show-title="false"
        @getCallBack="showWordFlag=false;">
        <div class="show-word">
          {{showWordCon}}
        </div>
      </base-box>
    </transition>
  </div>
</template>

<script>
import {getAllWord,getAllWordDetail} from "@/api/src";
import {getLocalDate} from "@/utils";

export default {
  name: "admin-word",
  data(){
    return {
      arr:[],
      depArr:[],
      page:0,
      size:10,
      len:0,
      pageArr:[], // 分页页码
      loading:false,  // 加载框flag
      flag:false, // drawer的flag
      childrenComment:[],// 当前显示的回复留言
      replyBoxFlag:false, // 留言回复弹窗的flag
      word:'',  // 留言内容
      replyId:0,  // 回复的留言id
      addOrReply:true, // true表示添加留言,false表示回复留言
      randomId:1000,
      title:'',  // 弹窗标题
      rotateFlag:false,
      showWordFlag:false, // 显示留言弹窗的flag
      showWordCon:''
    }
  },
  created() {
    getAllWord().then(res=>{
      if(res.code===200){
        this.len=res.len;
        this.arr=res.result;
        this.depArr=this.arr;
      }
    });
  },
  computed:{
    curArr(){
      return this.arr.slice(this.page*this.size,(this.page+1)*this.size)
    }
  },
  filters:{
    userFilter(value){
      return value?'awwac':'游客'
    },
  },
  methods:{
    pre(){
      if(this.page>0){
        this.loading=true;
        setTimeout(()=>{
          this.page-=1;
          this.loading=false;
        },600);
      }
    },
    next(){
      if(this.page<Math.ceil(this.len/this.size)-1){
        this.loading = true;
        setTimeout(()=>{
          this.page+=1;
          this.loading=false
        },600);
      }
    },
    goPage(num){
      this.loading=true;
      setTimeout(()=>{
        this.loading=false;
        this.page=num-1;
      },600);
    },
    seeComment(count,commentId){
      if(count<=0){
        this.$msg('该评论没有回复');
      }
      else{
        this.replyId=commentId;
        this.loading=true;
        setTimeout(()=>{
          this.flag=true;
          this.loading=false;
          // 如果arr中children存在，直接取出来，不存在
          let item=this.arr.find(x=>x.id===commentId);
          if('children' in item){
            if(item['children'].length<count){
              getAllWordDetail({commentId}).then(res=>{
                if(res.code===200){
                  item['children']=[...item['children'],...res.result];
                  this.childrenComment=item['children'];
                }
              })
            }
            else{
              this.childrenComment=item['children'];
            }
          }
          else{
            // 请求数据
            getAllWordDetail({commentId}).then(res=>{
              if(res.code===200){
                item['children']=res.result;
                this.childrenComment=res.result;
              }
            })
          }
        },600)
      }
    },
    delComment(commentId,count){
      let info=''
      info=count>0?'<span style="color: #FD2D49;">该评论有他人回复</span>,确定删除吗?':'确定删除这条留言吗?'
      this.$dialog({
        con:info,
        getCallBack:({res})=>{
          if(res){
            this.loading=true;
            setTimeout(()=>{
              this.loading=false;
              let index=this.arr.findIndex(x=>x.id===commentId);
              this.arr.splice(index,1);
              this.$msg.success('删除留言成功');
              let count=0;
              for(let i=0;i<this.arr.length;i++){
                count+=1;
                if(this.arr[i].hasOwnProperty('children')){
                  count+=this.arr[i].children.length;
                }
              }
              this.len=count;
            },600)
          }
        }
      })
    },
    delSonComment(id){
      this.loading=true;
      setTimeout(()=>{
        let item=this.arr.find(x=>x.id===this.replyId);
        let index=item['children'].findIndex(x=>x.id===id);
        item['children'].splice(index,1);
        item.count-=1;
        this.len-=1;
        this.loading=false;
        this.$msg.success('删除留言成功');
      },600);

    },
    reply(commentId){
      this.replyBoxFlag=true;
      this.replyId=commentId;
      this.addOrReply=false;
      this.title='回复留言';
      this.word='';
    },
    getCallBack(flag){
      if(!flag){
        this.replyBoxFlag=false;
        return
      }
      if(this.word.length<1){
        this.$msg.error('留言不能为空');
        return
      }
      this.replyBoxFlag=false;
      if(flag){
        this.loading=true;
        setTimeout(()=>{
          if(this.addOrReply){
            // 添加留言
            let obj={access:true,con:this.word,id:this.randomId,pubDate:getLocalDate(),count:0};
            this.randomId+=1;
            this.arr.push(obj);
            this.len+=1;
            this.$msg.success('留言成功');
          }
          else{
            // 回复留言
            let obj={access: true,con:this.word,id:this.randomId,pubDate: getLocalDate()};
            this.randomId+=1;
            let item=this.arr.find(x=>x.id===this.replyId);
            if(!item.hasOwnProperty('children')){
              item['children']=[];
            }
            item['children'].push(obj);
            item['count']+=1;
            this.len+=1;
            this.$msg.success('回复成功');
          }
          this.loading=false;
        },600);
      }
    },
    addComment(){
      this.replyBoxFlag=true;
      this.addOrReply=true;
      this.title='添加留言';
      this.word='';
    },
    transformDate(value){
      return value.replace(/ /g,'').replace(/-/g,'').replace(/:/g,'');
    },
    sortByTime(){
      this.loading=true;
      setTimeout(()=>{
        this.loading=false;
        this.rotateFlag=!this.rotateFlag;
        this.arr.sort((a,b)=>{
          if(this.transformDate(a.pubDate)>this.transformDate(b.pubDate)){
            return this.rotateFlag?1:-1;
          }
          else{
            return this.rotateFlag?-1:1;
          }
        })
      },600);
    },
    seeBlogWord(){
      this.loading=true;
      setTimeout(()=>{
        this.arr=this.arr.filter(x=>x.access===true);
        this.len=this.arr.length;
        this.loading=false;
      },600);
    },
    seeAllWord(){
      this.loading=true;
      setTimeout(()=>{
        this.loading=false;
        this.arr=this.depArr;
        this.len=this.arr.length;
      },600);
    },
    genPage(){
      let temp=[]
      for(let i=1;i<=Math.ceil(this.arr.length/this.size);i++){
        temp.push(i);
      }
      this.pageArr=temp;
      if(this.curArr.length===0&&this.arr.length>0){
        this.page-=1;
      }
    },
    seeAll(con){
      this.showWordCon=con;
      this.showWordFlag=true;
    },

  },
  watch:{
    'len':function (){
        this.genPage();
    },
  }
}
</script>

<style scoped lang="less">
  .admin-word{
    margin: 10px;
    padding: 20px;
    background-color: white;
    font-size: 14px;
    .user-options{
      margin-bottom: 10px;
      display: flex;
      justify-content: flex-end;
      >a{
        color: #999999;
        margin-left: 10px;
      }
    }
    .footer{
      display: flex;
      align-items: center;
      font-size: 13px;
      a{
        padding: 5px 10px;
        background-color: #EEEEEE;
        color: black;
        &:nth-child(n+2){
          margin-left: 5px;
        }
        &.page{
          background-color: #2BA4E7;
          color: white;
        }
        &.active{
          background-color: #00a67c;
          color: white;
        }
      }
    }
    &-con{
      position: relative;
      min-height: 500px;
      >table{
        width: 100%;
        border-collapse: collapse;
        tr{
          transition: all .3s;
          &:hover{
            background-color: #F2F2F2;
          }
          &:nth-child(1){
            background-color: #F2F2F2;
          }
        }
        td{
          padding: 8px;
          border: solid 1px #E7E3E4;
          &.options{
            button{
              border: none;
              padding: 5px;
              color: white;
              i{
                margin-right: 3px;
              }
              &:nth-child(1){
                background-color: #00a67c;
              }
              &:nth-child(2){
                background-color: #607BD7;
              }
              &:nth-child(3){
                background-color: #FC4D4D;
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
        padding-top: 10px;
        margin-right: 20px;
        >span{
          color: #999999;
          font-size: 12px;
          padding-right: 10px;
        }
      }
      &:nth-child(2){
        position: relative;
        flex: 1;
        padding: 10px;
        background-color: #E9B6BC;
        >p{
          color: white;
          font-size: 12px;
          font-family: Small-Italic,sans-serif;
          padding-top: 10px;
          >a{
            color: white;
            margin-left: 10px;
            &:hover{
              text-decoration: underline;
            }
          }
        }
        &:after{
          content: ' ';
          position: absolute;
          width: 0;
          height: 0;
          left: -14px;
          top: 5px;
          border-top: solid 6px transparent;
          border-bottom: solid 10px transparent;
          border-right: solid 14px #E9B6BC;
        }
      }
    }
  }
  .reply-word{
    textarea{
      box-sizing: border-box;
      width: 100%;
      border: solid 1px #EEEEEE;
      font-size: 15px;
      padding: 10px;
      height: 100px;
    }
  }
  .time-sort{
    display: flex;
    align-items: center;
    span{
      width: 0;
      height: 0;
      margin-left: 4px;
      border-left: solid 5px transparent;
      border-right: solid 5px transparent;
      border-bottom: solid 8px black;
      transform: rotate(0deg);
      transition: all .3s;
      &.span-active{
        transform: rotate(180deg);
      }
    }
  }
  .long-comment{
    a{
      color: #999999;
      font-size: 13px;
      &:hover{
        text-decoration: underline;
      }
    }
  }
  .see-comment{
    position: relative;
    &:hover{
      >div{
        opacity: 1;
        z-index: 100;
      }
    }
    >div{
      transition: all .3s;
      width: 200%;
      left: -50%;
      opacity: 0;
      z-index: -1;
      top: 100%;
      position: absolute;
      box-sizing: border-box;
      background-color: white;
      padding: 10px 0;
      a{
        display: block;
        font-size: 14px;
        color:#999999;
        padding: 10px 0;
        text-align: center;
        &:hover{
          text-decoration: underline;
        }
      }
    }
  }
  .word-user{
    span{
      font-size: 12px;
      padding: 3px 5px;
      background-color: #00a67c;
      color: white;
      margin-left: 3px;
    }
  }
  .show-word{
    max-height: 300px;
    overflow: auto;
  }
  @media screen and (max-width: 785px){
    .admin-word-con{
      overflow: auto;
      table{
        tr{
          td{
            &:nth-child(1){
              min-width: 60px;
            }
            &:nth-child(2){
              min-width:100px
            }
            &:nth-child(3){
              min-width: 200px;
            }
            &:nth-child(4){
              min-width: 160px;
            }
            &:nth-child(5){
              min-width: 200px;
            }
          }
        }
      }
    }
  }
</style>
