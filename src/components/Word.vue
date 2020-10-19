<template>
  <div>
    <NavBar/>
    <div class="post-comment">
      <div class="info">有什么想说的，对网站的建议，bug或者其他问题可以在下面留言，博主看到后都会回复留言哦！</div>
      <div class="comment">
        <textarea v-model="con" :placeholder="text"></textarea>
        <button :class="{'active':con.length>0}" @click="addComment">
          <i class="el-icon-edit"></i>发表
        </button>
      </div>
      <div class="word-info">共有<span>{{len}}</span>条数据</div>
    </div>
    <div class="word" v-if="showWord">
      <div class="word-left">
        <div v-for="(item,index) in leftArr" :key="item.id">
          <div>
            <span class="name">{{item.access|userFilter}}<span v-if="item.access">博主</span></span>
            <span class="content">:{{item.con}}</span>
          </div>
         <div class="bottom">
           <div class="reply" @click="reply(item.id)">
             <i class="el-icon-position"></i>
             回复</div>
           <div class="post">
             <i class="el-icon-time"></i>
             {{item.pubDate|localFilter}}</div>
           <div class="see-reply" @click="getReplyComment(item.id,true,item.count)">
              <i class="el-icon-chat-line-square"></i>
             {{item.count}}条回复</div>
         </div>
          <div class="children" style="display: none" :class="'num-'+item.id">
            <div class="sort">时间：<img src="../assets/img/sort2.png" alt="" @click="sortChildren(item.id,$event,true)"></div>
            <transition-group name="fade3" class="fade3-group">
              <div v-for="item2 in item.children" :key="'n'+item2.id">
                {{item2.access|userFilter}}
                <span class="author" v-if="item2.access">博主</span>
                <span>:{{item2.con}}</span>
                <span class="pub-date">{{item2.pubDate|localFilter}}</span>
              </div>
            </transition-group>
            <button class="next-page" :class="'btn'+item.id" @click="getNextWordChildren(item.id,true)">下一页</button>
          </div>
          <span class="cheng">{{index*2+1}}楼</span>
        </div>
      </div>
      <div class="word-center"></div>
      <div class="word-right">
        <div v-for="(item,index) in rightArr" :key="item.id">
          <div>
            <span class="name">{{item.access|userFilter}}</span>
            <span class="content">:{{item.con}}</span>
          </div>
          <div class="bottom">
            <div class="reply" @click="reply(item.id)">
              <i class="el-icon-position"></i>回复
            </div>
            <div class="post">
              <i class="el-icon-time"></i>{{item.pubDate|localFilter}}
            </div>
            <div class="see-reply" @click="getReplyComment(item.id,false,item.count)">
              <i class="el-icon-chat-dot-square"></i>{{item.count}}条回复
            </div>
          </div>
          <div class="children" style="display: none" :class="'num-'+item.id">
            <div class="sort">时间：<img src="../assets/img/sort2.png" alt="" @click="sortChildren(item.id,$event,false)"></div>
            <transition-group name="fade3" class="fade3-group">
              <div v-for="item2 in item.children" :key="'n'+item2.id">
              {{item2.access|userFilter}}
              <span class="author" v-if="item2.access">博主</span>
              <span>:{{item2.con}}</span><span class="pub-date">{{item2.pubDate|localFilter}}</span>
            </div>
            </transition-group>
            <button class="next-page" :class="'btn'+item.id" @click="getNextWordChildren(item.id,false)">下一页</button>
          </div>
          <span class="cheng">{{index*2+2}}楼</span>
        </div>
      </div>
    </div>
    <base-loading style="margin: 10px 0;" v-if="loadingFlag"></base-loading>
  </div>
</template>

<script>
    import {addWord,replyWord,getWord,getWordDetail} from "@/api/src";
    import NavBar from "./Navbar";

    export default {
        name: "Word",
        data(){
          return {
            leftArr:[],
            rightArr:[],
            con:'',
            text:'兄台留步，请留下你的足迹！',
            flag:false,  // 回复flag,为true时回复，为false时添加留言
            replyId:0, // 回复评论的id
            page:1,
            loadingFlag:false,  // 下一页加载flag
            flag2:true,  // 下一页flag
          }
        },
        computed:{
          len(){
            return this.leftArr.length+this.rightArr.length;
          },
          showWord(){
            return this.leftArr.length>0||this.rightArr.length>0
          }
        },
        created() {
          getWord({page:0,size:10}).then(res=>{
            if(res.code===200){
              this.leftArr=res.result.filter((x,index) => index % 2 === 0);
              this.rightArr=res.result.filter((x,index) => index % 2 === 1);
            }
          });
        },
        mounted(){
          window.addEventListener('scroll',this.scrollEvent,true);
        },
        destroyed(){
          window.removeEventListener('scroll',this.scrollEvent,true);
        },
        methods:{
            getReplyComment(id,flag,count){
              if(count>0){
                let node=document.getElementsByClassName('num-'+id)[0];
                if(node.style.display==='none'){
                  node.style.display='block';
                  node.classList.add('active');
                  let node2=null;
                  if(flag){
                    node2=this.leftArr.find(x => x.id === id);
                  }
                  else {
                    node2 = this.rightArr.find(x => x.id === id);
                  }
                  if(node2.children.length===0){
                    getWordDetail({page:0,size:5,commentId:id}).then(res=>{
                      if(res.code===200){
                        node2.page=0;
                        node2.children=res.result;
                        if(res.result.length<5){
                          let btnNode=document.getElementsByClassName('btn'+id);
                          btnNode[0].style.display='none';
                        }
                      }
                    })
                  }

                }
                else{
                  node.classList.add('active2')
                  setTimeout(()=>{
                    node.style.display='none';
                    node.classList.remove('active');
                    node.classList.remove('active2');
                  },300);
                }
              }
              else{
                this.$msg('该评论暂时没有回复');
              }
            },
            addComment(){
              if(this.con.length===0){
                this.$msg('留言不能为空');
                return
              }
              if(!this.flag){
                addWord({access:false,con:this.con}).then(res=>{
                  if(res.code===200){
                    this.$msg.success('留言成功');
                    setTimeout(()=>{
                      location.reload();
                    },1000)
                  }
                })
              }
              else{
                replyWord({access:false,commentId:this.replyId,con:this.con}).then(res=>{
                  if(res.code===200){
                    this.$msg.success('回复留言成功');
                    setTimeout(()=>{
                      location.reload();
                    },1000)
                  }
                })
              }
              this.flag=false;
              this.con='';
              this.text='祝兄台迎娶白富美，走上人生巅峰';
              this.replyId=0;
            },
            reply(replyId){
              this.text=`回复游客`;
              this.flag=true;
              this.replyId=replyId;
              document.getElementsByTagName('textarea')[0].focus();
            },
            getNextWordChildren(commentId,flag){
              let node=null;
              let page=-1;
              if(flag){
                node=this.leftArr.find(x=>x.id===commentId)
              }
              else{
                node = this.rightArr.find(x => x.id === commentId);
              }
              page=node.page+1
              getWordDetail({page:page,size:5,commentId:commentId}).then(res=>{
                if(res.code===200){
                  if(res.result.length>0){
                    node.page=res.page;
                    node.children=[...node.children,...res.result];
                    if(res.result.length<5){
                      let btnNode=document.getElementsByClassName('btn'+commentId);
                      btnNode[0].style.display='none';
                    }
                  }
                  else{
                    this.$msg('没有数据了');
                  }
                }
              })
            },
            sortChildren(commentId,e,flag){
              let classList=e.target.classList;
              let order=false;
              let node=null;
              if(flag){
                node=this.leftArr.find(x=>x.id===commentId);
              }
              else{
                node=this.rightArr.find(x=>x.id===commentId);
              }
              if(classList.contains('sort-active')){
                classList.remove('sort-active');
                order=false;
              }
              else{
                classList.add('sort-active');
                order=true;
              }
              node.children.sort((a,b)=>{
                if(this.getPubDate(a.pubDate)>this.getPubDate(b.pubDate)){
                  return order?1:-1
                }
                else{
                  return order?-1:1
                }
              });
            },
            /*
            * 将日期转化为数字
            * @param {String} s
            * */
            getPubDate(s=''){
              let temp1=s.split(' ')[0].split('-').join('');
              let temp2=s.split(' ')[1].split(':').join('');
              return parseInt(temp1+temp2,10);
            },
            scrollEvent(){
              if(this.flag2){
                let client=document.documentElement.clientHeight||document.body.clientHeight;// 获取可使区域的高度
                let top=document.documentElement.scrollTop||document.body.scrollTop;  // 获取可视区域到顶部的高度
                let height=document.documentElement.scrollHeight; // 获取整个body的高度
                if(height-top-client<1){
                  // 此时滑倒了底部
                  this.loadingFlag=true;
                  getWord({page:this.page,size:10}).then(res=>{
                    if(res.code===200){
                      if(res.result.length>0){
                        this.page+=1;
                        let leftTemp=res.result.filter((x,index)=>index%2===0);
                        let rightTemp=res.result.filter((x,index)=>index%2===1);
                        setTimeout(()=>{
                          this.leftArr=[...this.leftArr,...leftTemp];
                          if(typeof rightTemp !=='undefined'){
                            this.rightArr=[...this.rightArr,...rightTemp];
                          }
                          this.loadingFlag=false;
                        },1000);
                        if(res.result.length<11){
                          this.flag2=false;
                        }
                      }
                      else {
                        this.$msg('没有数据了');
                        this.flag2=false;
                        this.loadingFlag=false;
                      }
                    }
                  })
                }
              }

            }
          },
        filters:{
          'userFilter':function (value){
            return value?'博主':'游客'
          }
        },
        components:{
          NavBar
        },
    }
</script>

<style scoped lang="less">
    .word{
      max-width: 900px;
      margin: 10px auto;
      padding: 0 10px;
      display: grid;
      grid-template-columns: 1fr 8px 1fr;
      gap: 30px;
      &-center{
        border-radius: 5px;
        background-image: linear-gradient(to bottom,#E55272,#7852E5,white,#E58652);
      }
      &-left,&-right{
        >div{
          min-height: 100px;
          background-color: white;
          display: inline-block;
          width: 100%;
          margin-bottom: 150px;
          position: relative;
          box-sizing: border-box;
          padding: 20px;
          .content{
            font-size: 15px;
          }
          .bottom{
            display: flex;
            margin-top: 10px;
            flex-wrap: wrap;
            i{
              color: black;
              margin-right: 5px;
              font-size: 16px;
            }
            .post,.reply,.see-reply{
              color: #999999;
              margin-right: 10px;
              font-size: 14px;
              display: flex;
              align-items: center;
            }
            .reply,.see-reply{
              transition: all .3s;
              &:hover{
                cursor: pointer;
                color: #00a67c;
              }
            }
          }
          .cheng{
            position: absolute;
            right: 5px;
            top: 5px;
            border-radius: 50%;
            font-size: 13px;
            color: #999999;
          }
          .name{
            color: #5893c2;
            span{
              margin-left: 5px;
              padding: 3px 6px;
              background-color: #F11459;
              color: white;
              font-size: 12px;
            }
          }
        }
      }
      &-right{
        margin-top: 125px;
        >div{
          &:nth-child(1){
            .cheng{
              color: #F12E14;
            }
          }
          &:last-child{
            margin-bottom: 0;
          }
          &:before{
            content: '';
            position: absolute;
            right: 100%;
            top: 10px;
            border-top: solid 14px transparent;
            border-bottom: solid 14px transparent;
            border-right: solid 20px white;
          }
        }
      }
      &-left{
        >div{
          &:nth-child(1){
            .cheng{
              color: #00a67c;
            }
          }
          &:nth-child(2){
            .cheng{
              color: #1eb6fd;
            }
          }
          &:after{
            content: '';
            position: absolute;
            left: 100%;
            top: 10px;
            border-top: solid 14px transparent;
            border-bottom: solid 14px transparent;
            border-left: solid 20px white;
          }
        }
      }
    }
    .post-comment{
      max-width: 900px;
      margin: 10px auto;
      padding: 0 10px;
      .info{
        padding: 5px 0;
      }
      .comment{
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        textarea{
          flex: 1;
          margin-right: 10px;
          height: 80px;
          border: solid 1px #EEEEEE;
          padding: 10px;
          font-size: 16px;
          transition: all .3s;
          &:focus{
            border-color: #999999;
          }
        }
        button{
          display: flex;
          align-items: center;
          border: none;
          padding: 5px 10px;
          transition: color .3s;
          i{
            margin-right: 5px;
            font-size: 16px;
          }
          &.active{
            color: #00a67c;
          }
        }
      }
      .word-info{
        margin-top: 10px;
        color: #999999;
        span{
          color: #009688;
          margin: 0 5px;
        }
      }
    }
    .children{
      border-top: solid 1px #EEEEEE;
      margin-top: 5px;
      font-size: 14px;
      .sort{
        display: flex;
        justify-content: flex-end;
        align-items:center;
        font-size: 14px;
        padding-top: 5px;
        img{
          width: 16px;
          height: auto;
          padding: 3px;
          border: solid 1px #EEEEEE;
          transition: all .3s;
          &.sort-active{
            transform: rotate(180deg);
          }
          &:hover{
            border-color: #999999;
            cursor: pointer;
          }
        }
      }
      >.fade3-group{
        >div{
          padding: 8px 0;
          span{
            color: #999999;
            &:last-child{
              margin-left: 10px;
            }
            &.pub-date{
              font-family: "Small-Italic",sans-serif;
            }
          }
        }
      }
      .next-page{
        width: 100%;
        display: block;
        background-color: #1eb6fd;
        color: white;
        border: none;
        height: 30px;
        transition: all .3s;
        &:hover{
          opacity: .6;
        }
      }
      .author{
        font-size: 12px;
        background-color: #F11459;
        color: white !important;
        padding: 3px 6px;
      }
      &.active{
        animation: fade .3s 1 ;
        animation-fill-mode: forwards;
      }
      &.active2{
        animation: fade2 .3s 1 ;
        animation-fill-mode: forwards;
      }
    }
    @keyframes fade {
      0%{
        transform: scale(1,0);
        opacity: 0;
      }
      100%{
        transform: scale(1,1);
        opacity: 1;
      }
    }
    @keyframes fade2 {
      0%{
        opacity: 1;
      }
      100%{
        opacity: 0;
      }
    }
    .fade3-enter-active,.fade3-leave-active{
      opacity: 1;
      transition: all .3s;
    }
    .fade3-enter,.fade3-leave-to{
      opacity: 0;
    }
</style>
