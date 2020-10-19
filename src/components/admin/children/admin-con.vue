<template>
  <div class="blog-con">
      <div class="con-info">
        <div>
          <p><span>公告</span></p>
          <div>
            此后台数据是真实的。由于该账号是测试账号，故删除，修改等操作并未在服务器上修改而是直接在本地修改的。<br/>
            <p style="font-size: 13px;color: #00a67c;margin-top: 10px;">如果该网站打不开了，大概率是没钱续费云服务器了</p>
          </div>
        </div>
        <div class="data-sum">
          <p><span style="background-color: #D56464;">数据统计</span></p>
          <div>
            <div>博客数目：{{depArr.length}}篇</div>
            <div>浏览总数：{{allNumber}}</div>
            <div>评论总数：{{allComment}}</div>
            <div>分类总数：{{allFile}}</div>
            <div>标签总数：{{allTag}}</div>
          </div>
        </div>
        <div>
          <p><span style="background-color: #5299F9;">网站配置信息</span></p>
          <div>
            <p>服务器：阿里云服务器（centos7）</p>
            <p>数据库：mysql8.1</p>
            <p>后端：django2.2</p>
            <p>前端：vue2.6+vue-router+webpack4+less+vuex</p>
          </div>
        </div>
      </div>
      <div class="blog-table">
        <div class="admin-search">
          <div>
            <input type="text" placeholder="按标题查询" v-model="word" @keydown.enter="adminSearch">
            <button @click="adminSearch"><i class="el-icon-search" style="margin-right: 3px"></i>搜索</button>
            <button style="background-color: #D56464" @click="reloadData"><i class="el-icon-refresh-left" style="margin-right: 3px;"></i>重新导入数据</button>
          </div>
          <div class="sort">
            排序：
            <button @click="defaultSort">默认排序</button>
            <button @click="sortByDate">按发表时间排序<span :style="'transform:rotate('+sortDeg(sort1)+'deg)'"></span></button>
            <button @click="sortByNumber">按浏览量排序<span :style="'transform:rotate('+sortDeg(sort2)+'deg)'"></span></button>
            <button @click="sortByComment">按评论数排序<span :style="'transform:rotate('+sortDeg(sort3)+'deg)'"></span></button>
          </div>
        </div>
        <div class="table">
          <table>
            <tbody>
            <tr class="title">
              <td>id</td>
              <td>标题</td>
              <td>作者</td>
              <td>标签</td>
              <td>分类栏目</td>
              <td>置顶</td>
              <td>code样式</td>
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
              </span><span @click="addTag(item.id)">+</span>
              </td>
              <td>{{item.fileName|fileFilter}}</td>
              <td>
                <base-switch :flag="item.top" :params="item.id" @click="changeAccess"></base-switch>
              </td>
              <td>
                <input type="number" :value="item.bg" :disabled="item.disableFlag">
                <a href="javascript:void(0)" @click="seeCode(item.bg)">查看示例</a>
                <button @click="updateBgFlag($event,item.id,item.disableFlag)" class="edit">
                  <i class="el-icon-edit"></i>
                  {{item.disableFlag|bgFilter}}
                </button>
              </td>
              <td class="my-option">
                <button @click="see(item.id)"><i class="el-icon-thumb"></i>查看</button>
                <button @click="delBlog(item.title,item.id)"><i class="el-icon-delete"></i>删除</button>
              </td>
            </tr>
            </tbody>
          </table>
          <base-drawer
            v-if="showDrawer"
            @close="showDrawer=false;">
            <div class="code" :class="{'bg1':num===1,'bg2':num===2,'bg3':num===3}">
              <pre><code class="javascript hljs"><table class="hljs-ln"><tbody><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="1"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-keyword">const</span> s=<span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>();</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="2"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">s.add(<span class="hljs-number">1</span>); <span class="hljs-comment">// 增加数据</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="3"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">s.add(<span class="hljs-number">2</span>);</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="4"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">s.add(<span class="hljs-number">3</span>);</div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="5"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-built_in">console</span>.log(s.has(<span class="hljs-number">1</span>));  <span class="hljs-comment">// 判断Set中是否有某个值</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="6"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">s.delete(<span class="hljs-number">1</span>);  <span class="hljs-comment">// 删除某个值</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="7"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line">s.clear();  <span class="hljs-comment">// 清空set</span></div></td></tr><tr><td class="hljs-ln-numbers"><div class="hljs-ln-line hljs-ln-n" data-line-number="8"></div></td><td class="hljs-ln-code"><div class="hljs-ln-line"><span class="hljs-built_in">console</span>.log(s.size);  <span class="hljs-comment">// 获取set的大小</span></div></td></tr></tbody></table></code></pre>
            </div>
          </base-drawer>
        </div>
        <div class="page">
          <ul>
            <li><a href="javascript:void(0)" @click="pre">上一页</a></li>
            <li v-for="(item,index) in pageArr" :key="index">
              <a href="javascript:void(0)" :class="{active:page+1===item}" @click="goPage(item-1)">{{item|pageFilter}}</a>
            </li>
            <li><a href="javascript:void(0)" @click="next">下一页</a></li>
          </ul>
          <span style="margin:0 10px;">共{{arr.length}}条数据</span>
          跳转到
          <input type="number" placeholder="页码"
                 v-model.number="page2"
                 v-on:keydown.enter="goTo"/>每页显示
          <base-select
            style="margin-left: 10px"
            position="top"
            :value="size+'条/页'">
            <base-option
              v-for="item in options"
              :key="item"
              :active="size===item"
              @click="setSize(item)">
              {{item}}条/页
            </base-option>
          </base-select>
        </div>
        <transition name="opacity">
          <base-loading
            v-if="loading"
            type="float">
          </base-loading>
        </transition>
      </div>
  </div>
</template>

<script>
import {getColor,getSum} from "@/utils";
import {getAllBlog} from "@/api/src";

export default {
  name: "admin-con",
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
      showDrawer:false, // 显示code样式
      num:0,  // bg值
      options:[5,10,20]
    }
  },
  created() {
    this.getColor=getColor;
    this.getData()
  },
  computed:{
    curArr(){
      return this.arr.slice(this.page*this.size,(this.page+1)*this.size)
    },
    allComment(){
      return getSum(this.depArr,'comment')
    },
    allNumber(){
      return getSum(this.depArr,'number')
    },
    allTag(){
      let temp=[];
      this.depArr.forEach(x=>{
        x.tag.split(',').forEach(x2=>{
          if(!temp.includes(x2)){
            temp.push(x2)
          }
        })
      });
      return temp.length;
    },
    allFile(){
      let temp=[];
      this.depArr.forEach(x=>{
        if(!temp.includes(x.fileName)){
          temp.push(x.fileName);
        }
      })
      return temp.length-1;
    },
  },
  methods: {
    setSize(value){
      if(value!==this.size){
        this.loading=true;
        setTimeout(()=>{
          this.size=value;
          this.loading=false;
        },600);
      }
    },
    async getData(){
      const res=await getAllBlog();
      if(res.code===200){
        let temp1={disableFlag:true}
        let temp2=res.result.map(x=>({...x,...temp1}))
        this.arr=temp2;
        this.depArr=temp2;
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
        this.$msg('下一页没有数据了')
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
        this.$msg('上一页没有数据了')
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
              this.$msg.success('删除博客成功');
            },600);
          }
        }});
    },
    changeAccess(blogId){
      let item=this.arr.find(x=>x.id===blogId);
      item.top=!item.top;
      this.$msg.success('修改成功');
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
        this.arr.sort((a,b)=> this.sort2?a.number-b.number:b.number-a.number)
        this.sort2=!this.sort2;
        this.loading=false;
      },500);
    },
    sortByComment(){
      this.loading=true;
      setTimeout(()=>{
        this.arr.sort((a,b)=>this.sort3?a.comment-b.comment:b.comment-a.comment)
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
       this.$msg('查询关键字不能为空');
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
                this.$msg.success('删除标签成功');
              },600);
            }
            else {
              this.$msg.error('删除失败,博客至少需要一个标签');
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
              this.$msg.error('标签不能为空');
            }
            else{
              if(params.length<12){
                let x=this.arr.find(x=>x.id===blogId);
                if(x.tag.split(',').length<=2){
                  this.loading=true;
                  setTimeout(()=>{
                    x.tag+=','+params.replace(/,/g,'');
                    this.loading=false;
                    this.$msg.success('增加成功');
                  },600);
                }
                else{
                  this.$msg.error('每篇博客最多只能有3个标签');
                }
              }
              else{
                this.$msg.error('标签长度不能大于12');
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
    },
    updateBgFlag(e,blogId,flag){
      let item=this.arr.find(x=>x.id===blogId);
      item.disableFlag=!item.disableFlag;
      let value=parseInt(e.currentTarget.parentNode.querySelector('input').value,10);
      if(!flag&&value!==item.bg){
        if([1,2,3].indexOf(value)!==-1){
          this.loading=true;
          setTimeout(()=>{
            item.bg=value;
            this.loading=false;
            this.$msg.success('修改成功');
          },600);
        }
        else{
          this.$msg.error('输入框值应该在1,2,3之中')
        }
      }
    },
    seeCode(blogId){
      this.showDrawer=true;
      this.num=blogId
    }
  },
  filters:{
    'fileFilter':function (value){
      return value.length>0?value:'暂无分类'
    },
    'pageFilter':function (value){
      return value>0?value:'...'
    },
    'bgFilter':function (value){
      return value?'修改':'确定'
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
      padding: 20px;
      background-color: white;
      >.table{
        width: 100%;
        overflow: auto;
        position: relative;
        >table{
          width: 100%;
          border-collapse: collapse;
          background-color: white;
          .title{
            background-color: #F2F2F2;
          }
          .my-item{
            font-size: 14px;
            font-family: Small-Italic,sans-serif;
            transition: all .3s;
            .my-tag{
              span{
                display: inline-block;
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
                i{
                  margin-right: 3px;
                }
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
            input{
              height: 26px;
              border: solid 1px #EEEEEE;
              padding-left: 10px;
              width: 30px;
              transition: all .3s;
              &:focus{
                box-shadow: 0 0 0 3px rgba(90,139,255,0.2);
                border-color: #00a67c;
              }
            }
            >a{
              color: #999999;
              transition: color .3s;
              &:hover{
                color: #009688;
              }
            }
          }
        }
      }
    }
  }
.page{
    margin-top: 10px;
    font-size: 13px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    ul{
      display: flex;
      li{
        height: 28px;
        line-height: 28px;
        &:nth-child(n+2){
          margin-left: 5px;
        }
        &:nth-child(1),&:last-child{
          a{
            background-color: #2BA4E7;
            color: white;
          }
        }
        a{
          color: black;
          padding: 5px 10px;
          font-family: Small-Italic,sans-serif;
          transition: all .3s;
          background-color: #EEEEEE;
          &.active{
            background-color: #00a67c;
            color: white;
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
    flex-wrap: wrap;
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
.con-info{
  margin: 10px 0;
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(200px,1fr));
  gap: 10px;
  >div{
    flex: 1;
    background-color: white;
    padding: 10px;
    &.data-sum{
      >div{
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 5px;
      }
    }
    >p{
      padding-bottom: 10px;
      span{
        padding: 3px 5px;
        font-size: 12px;
        background-color: #00a67c;
        color: white;
      }
    }
    >div{
      color: #999999;
      font-size: 15px;
    }
  }
}
.code{
  margin: 0 0 0 10px;
  pre{
    margin: 0;
  }
}
.edit{
  outline: none;
  padding: 3px 8px;
  color: white;
  background-color: #7380E4;
  border: none;
}
@media screen  and (max-width: 875px){
  .table{
    >table
    tr{
      >td{
        &:nth-child(2){
          min-width: 240px;
        }
       &:nth-child(4){
         min-width: 250px;
       }
        &:nth-child(5){
          min-width: 120px;
        }
        &:last-child{
          min-width: 100px;
        }
        &:nth-last-child(2){
          min-width: 180px;
        }
      }
    }
  }
}
</style>
