<template>
  <div class="blog-con">
      <div class="con-info">
      这是我在gitee增加的内容
      </div>
      <div class="blog-table">
        <div class="admin-search">
          <div>
            <input type="text" placeholder="按标题查询" v-model="word" @keydown.enter="adminSearch">
            <button @click="adminSearch">搜索</button>
            <button style="background-color: #D56464" @click="reloadData">重新导入数据</button>
          </div>
          <div class="sort">
            排序：
            <button @click="defaultSort">默认排序</button>
            <button @click="sortByDate">按发表时间排序<span :style="'transform:rotate('+sortDeg(sort1)+'deg)'"></span></button>
            <button @click="sortByNumber">按浏览量排序<span :style="'transform:rotate('+sortDeg(sort2)+'deg)'"></span></button>
            <button @click="sortByComment">按评论数排序<span :style="'transform:rotate('+sortDeg(sort3)+'deg)'"></span></button>
          </div>
        </div>
        <table>
          <tbody>
          <tr class="title">
            <td>id</td>
            <td>标题</td>
            <td>作者</td>
            <td>标签</td>
            <td>分类栏目</td>
            <td>置顶</td>
            <td>操作</td>
          </tr>
          <tr class="my-item" v-for="item in curArr" :key="item.id">
            <td style="color: #999999;font-size: 13px;text-align: center;">{{item.id}}</td>
            <td class="title-info">
              <div v-html="item.title"></div>
              <div>
                <span>{{item.comment}}</span>评论
                <span>{{item.number}}</span>浏览
                <span>{{item.pubDate|dateFilter(false)}}</span>
              </div>
            </td>
            <td>{{item.author}}</td>
            <td class="my-tag">
              <span v-for="tag in item.tag.split(',')" :style="`background-color:`+getColor(tag)" @click="delTag(item.id,tag)">
                {{tag}}
              </span>
              <span @click="addTag(item.id)">+</span>
            </td>
            <td>{{item.fileName|fileFilter}}</td>
            <td>
              <my-switch :flag="item.top" :params="item.id" @change="changeAccess"></my-switch>
            </td>
            <td class="my-option">
              <button @click="see(item.id)">查看</button>
              <button @click="delBlog(item.title,item.id)">删除</button>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="page">
          <ul>
            <li><a href="javascript:void(0)" @click="pre">上一页</a></li>
            <li v-for="(item,index) in pageArr" :key="index">
              <a href="javascript:void(0)" :class="{active:page+1===item}" @click="goPage(item-1)">{{item|pageFilter}}</a>
            </li>
            <li><a href="javascript:void(0)" @click="next">下一页</a></li>
          </ul>
          <span style="margin-right: 10px">共{{arr.length}}条数据</span>
          跳转到
          <input type="number" placeholder="页码" v-model.number="page2" v-on:keydown.enter="goTo">
          每页显示
          <select v-model="size">
            <option :value="5">5条/页</option>
            <option :value="10">10条/页</option>
            <option :value="20">20条/页</option>
          </select>
        </div>
        <transition name="opacity">
          <Loading2 v-if="loading" :float="true" :type="1"/>
        </transition>
      </div>
  </div>
</template>

<script>
import {getColor} from "../../../assets/js/func";
import {getAllBlog} from "../../../api/src";

export default {
  name: "BlogCon",
  data(){
    return {
      nowTime:'2020-09-17 12:34',
      arr:[],
      size:10,
      page:0,
      page2:1,
      pageArr:[],
      sort1:true, // 按时间排序flag
      sort2:true, // 按浏览量排序flag
      sort3:true,  // 按评论数排序flag
      loading:false, // 加载动画
      word:'', // 搜索关键字
      depArr:[], // 拷贝arr
    }
  },
  created() {
    this.getColor=getColor;
    this.getData();
    let s='在VUex中使用actionVuex';
    let word='vUe';
    s=s.replace(eval(`/(${word})/ig`),'<span style="color: red">$1</span>');
  },
  computed:{
    curArr(){
      return this.arr.slice(this.page*this.size,(this.page+1)*this.size)
    }
    },
  methods: {
    async getData(){
      const res=await getAllBlog();
      if(res.code===200){
        this.arr=res.result;
        this.depArr=res.result;
        this.genPageArr();
      }
    },
    sortDeg(flag){
      return flag?0:180;
    },
    goTo(){
      if(this.page2>0&&this.page2<=Math.max(...this.pageArr)){
        this.loading=true;
        setTimeout(()=>{
          this.page=this.page2-1;
          this.loading=false;
        },600);
      }
    },
    goPage(num){
      if(num>-1){
        this.loading=true;
        setTimeout(()=>{
          this.page=num;
          this.loading=false;
        },600);
      }
    },
    next(){
      if(this.page<Math.max(...this.pageArr)-1){
        this.loading=true;
        setTimeout(()=>{
          this.page+=1;
          this.loading=false;
        },600);
      }
      else{
        this.$msg({con:'下一页没有数据了'})
      }
    },
    pre(){
      if(this.page>0){
        this.loading=true;
        setTimeout(()=>{
          this.page-=1;
          this.loading=false;
        },600);
      }
      else{
        this.$msg({con:'上一页没有数据了'})
      }
    },
    delBlog(title,blogId){
      this.$dialog({
        con:`确定删除<span style="color: #00a67c;">${title}</span>这篇博客吗？`,
        getCallBack:({res})=>{
          if(res){
            this.loading=true;
            setTimeout(()=>{
              this.loading=false;
              this.arr=this.arr.filter(x=>x.id!==blogId);
              this.depArr=this.depArr.filter(x=>x.id!==blogId);
              this.$msg.success({con:'删除博客成功'});
            },600);
          }
        }});
    },
    changeAccess(flag,params){
      let item=this.arr.find(x=>x.id===params);
      item.top=flag;
      this.$msg.success({con:'修改成功'});
    },
    sortByDate(){
      this.loading=true;
      setTimeout(()=>{
        this.arr.sort((a,b)=>{
          if(parseInt(a.pubDate.split('-').join(''),10)>parseInt(b.pubDate.split('-').join(''),10)){
            return this.sort1?1:-1;
          }
          else{
            return this.sort1?-1:1;
          }
        });
        this.sort1=!this.sort1;
        this.loading=false;
      },500);
    },
    sortByNumber(){
      this.loading=true;
      setTimeout(()=>{
        this.arr.sort((a,b)=>{
          if(a.number>b.number){
            return this.sort2?1:-1;
          }
          else{
            return this.sort2?-1:1;
          }
        });
        this.sort2=!this.sort2;
        this.loading=false;
      },500);
    },
    sortByComment(){
      this.loading=true;
      setTimeout(()=>{
        this.arr.sort((a,b)=>{
          if(a.comment>b.comment){
            return this.sort3?1:-1;
          }
          else{
            return this.sort3?-1:1;
          }
        });
        this.sort3=!this.sort3;
        this.loading=false;
      },500)
    },
    adminSearch(){
      if(this.word.length>0){
        this.loading=true;
        setTimeout(x=>{
          let temp=[]
          this.depArr.map(x=>{
            if(x.title.toLowerCase().includes(this.word.toLowerCase())){
              x.title=x.title.replace(eval(`/(${this.word})/ig`),'<span style="color: red">$1</span>');
              temp.push(x);
            }
          })
          this.arr=temp;
          this.page=0;
          this.loading=false;
        },1000);
      }
      else{
       this.$msg({con:'查询关键字不能为空'});
      }
    },
    reloadData(){
      this.loading=true;
      setTimeout(()=>{
        this.getData();
        this.loading=false;
      },1000);
    },
    see(blogId){
      this.$dialog({
        con:'页面将跳转到该博客页面,是否跳转',
        getCallBack:({res})=>{
          if(res){
            this.$router.push({path:`/blog/${blogId}`})
          }
        }
      })
    },
    delTag(blogId,tag){
      this.$dialog({
        con:`确定删除<span style="color: #00a67c">${tag}</span>标签吗？`,
        getCallBack: ({res})=>{
          if(res){
            let x=this.arr.find(x=>x.id===blogId);
            let temp=x.tag.split(',');
            if(temp.length>1){
              this.loading=true;
              setTimeout(()=>{
                temp.splice(temp.indexOf(tag),1);
                x.tag=temp.join(',');
                this.loading=false;
                this.$msg.success({con:'删除标签成功'});
              },600);
            }
            else {
              this.$msg.error({con:'删除失败,博客至少需要一个标签'});
            }
          }
        }
      })
    },
    addTag(blogId){
      this.$dialog({
        con:'请输入标签：<input type="text" placeholder="标签不能为空且长度不大于12" ' +
          'style="height: 30px;border: solid 1px #EEEEEE;padding:0 10px;outline: none; width: 200px;"/>',
        getCallBack: ({res,params})=>{
          if(res){
            if(typeof params==='undefined'){
              this.$msg.error({con:'标签不能为空'});
            }
            else{
              if(params.length<12){
                let x=this.arr.find(x=>x.id===blogId);
                if(x.tag.split(',').length<=2){
                  this.loading=true;
                  setTimeout(()=>{
                    x.tag+=','+params.replace(/,/g,'');
                    this.loading=false;
                    this.$msg.success({con:'增加成功'});
                  },600);
                }
                else{
                  this.$msg.error({con:'每篇博客最多只能有3个标签'});
                }
              }
              else{
                this.$msg.error({con:'标签长度不能大于12'});
              }
            }
          }
        }
      })
    },
    defaultSort(){
      this.loading=true;
      setTimeout(()=>{
        let temp1=this.arr.filter(x=>x.top);
        let temp2=this.arr.filter(x=>!x.top);
        temp2.sort((a,b)=>{
          if(parseInt(a.pubDate.split('-').join(''),10)<parseInt(b.pubDate.split('-').join(''),10)){
            return 1;
          }
          else{
            return -1;
          }
        });
        this.arr=[...temp1,...temp2];
        this.loading=false;
      },600);

    },
    genPageArr(){
      this.pageArr=[];
      let temp1=[];
      let len=this.arr.length;
      if(len>0){
        let num=Math.ceil(len/this.size);
        for(let i=1;i<=num;i++){
          temp1.push(i);
        }
      }
      let max=Math.max(...temp1);
      if(max>5){
          this.pageArr=[1,2,3,-1,max];
      }
      else{
        for(let i=1;i<=max;i++){
          this.pageArr.push(i);
        }
      }
    },
    watchPage(){
      let max=Math.max(...this.pageArr);
      if(max>5){
        let temp1=[1];
        let flag=true;
        for(let i=2;i<max;i++){
          if(i===this.page+1||i===this.page||i===this.page+2){
            flag=true;
            temp1.push(i);
          }
          else{
            if(flag){
              temp1.push(-1)
              flag=false;
            }
          }
        }
        temp1.push(max);
        this.pageArr=temp1;
      }
    }
  },
  filters:{
    'fileFilter':function (value){
      return value.length>0?value:'暂无分类'
    },
    'pageFilter':function (value){
      return value>0?value:'...'
    }
  },
  watch:{
    'size':function (){
      this.page=0;
      this.genPageArr();
    },
    'page':'watchPage',
    'arr.length':function (newVal){
      this.genPageArr();
    }
  }
}
</script>

<style scoped lang="less">
@keyframes rotateImg {
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
.blog-con{
  margin: 10px;
  .blog-table{
      position: relative;
      flex: 1;
      padding: 20px;
      background-color: white;
      overflow: auto;
      >table{
        width: 100%;
        border-collapse: collapse;
        .title{
          background-color: #F2F2F2;
        }
        .my-item{
          font-size: 14px;
          font-family: Small-Italic,sans-serif;
          transition: all .3s;
          .my-tag{
            span{
              color: white;
              padding: 4px 8px;
              transition: all .3s;
              cursor: pointer;
              &:nth-child(n+2){
                margin-left: 3px;
              }
              &:last-child{
                background-color: #999999;
              }
            }
          }
          .my-option{
            button{
              border: none;
              background-color: #00a67c;
              padding: 3px 8px;
              color: white;
              &:nth-child(2){
                background-color: #F93D57;
              }
            }
          }
          .title-info{
            >div{
              &:nth-child(2){
                color: #999999;
                font-size: 13px;
              }
            }
          }
          &:hover{
            background-color: #F2F2F2;
          }
        }
        td{
          border: solid 1px #E7E3E4;
          padding: 8px;
        }
      }
    }
  }
.page{
    margin-top: 10px;
    font-size: 13px;
    display: flex;
    align-items: center;
    ul{
      display: flex;
      li{
        height: 28px;
        line-height: 28px;
        a{
          color: #999999;
          padding: 3px 8px;
          font-family: Small-Italic,sans-serif;
          border: solid 1px #EEEEEE;
          margin-right: 10px;
          transition: all .3s;
          &:hover{
            border: solid 1px #00a67c;
          }
          &.active{
            background-color: #1eb6fd;
            color: white;
            border: solid 1px #1eb6fd;
          }
        }
      }
    }
    input{
      padding-left: 5px;
      margin: 0 8px;
      width: 50px;
      height: 24px;
      border: solid 1px #999999;
      transition: all .3s;
      &:focus{
        box-shadow: 0 0 0 3px rgba(90,139,255,0.2);
        border-color: #00a67c;
      }
    }
    select{
      outline: none;
      padding: 3px 8px;
      margin-left: 5px;
      border: solid 1px #999999;
      &:focus{
        border-color: #00a67c;
      }
    }
  }
.admin-search{
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    >div{
      display: flex;
      align-items: center;
      font-size: 14px;
      input{
        height: 30px;
        padding-left: 10px;
        border: solid 1px #EEEEEE;
        transition: all .3s;
        &:focus{
          box-shadow: 0 0 0 3px rgba(90,139,255,0.2);
          border-color: #00a67c;
        }
      }
      button{
        margin-left: 10px;
        background-color: #00a67c;
        color: white;
        border: none;
        padding: 6px 8px;
        transition: all .3s;
        &:hover{
          opacity: .7;
        }
      }
      &.sort{
        button{
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: white;
          color: black;
          &:hover{
            opacity: 1;
            color: #FE5A5A;
          }
          span{
            border-left: solid 5px transparent;
            border-right: solid 5px transparent;
            border-bottom: solid 8px black;
            margin-left: 4px;
            transition: all .3s;
          }
        }
      }
    }
  }
</style>
