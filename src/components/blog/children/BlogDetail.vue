<template>
    <div>
      <div class="detail" :class="{bg1:bg===1,bg2:bg===2,bg3:bg===3}">

        <!-- 博客标题等信息-->
        <div class="detail-title">
          <p>{{title}}</p>
          <div class="detail-author">
            <div class="four">
              <div><img src="../../../assets/img/user2.png" alt="#"></div>
              <div>awwac</div>
            </div>
            <div class="four">
              <div><img src="../../../assets/img/pub.png" alt="#"></div>
              <div>{{pubDate|pubDateFilter}}</div>
            </div>
            <div class="four">
              <div><img src="../../../assets/img/see2.png" alt="#"></div>
              <div>{{number}}</div>
            </div>
            <div class="four">
              <div><img src="../../../assets/img/commit.png" alt="#"></div>
              <div>{{comment}}</div>
            </div>
          </div>
          <div class="pub-date">
            <div>
              {{pubDate2.day}}
            </div>
            <div>
              <span>{{pubDate2.month}}月</span>
              <span>{{pubDate2.year}}</span>
            </div>
          </div>
        </div>

        <!-- 博客内容 -->
        <div id="detail" v-html="detail">















        </div>


        <!-- 博客标签 -->
        <div class="tag">
          <div><img src="../../../assets/img/tag.png" alt="#"></div>
          <div>
                <span v-for="item in myTag2" :style="{'background-color':item.color}" @click="goTo(item.name)">{{item.name}}
                  <span>查看{{item.name}}</span>
                </span>
          </div>
        </div>
      </div>

      <!-- 设置复制代码 -->
      <textarea name="" id="copy"></textarea>

    </div>
</template>

<script>
  import {addScan, getBlog} from "../../../api/src";

  export default {
        name: "BlogDetail",
        data(){
          return {
            detail:"",
            title:"ES6学习之Proxy",
            number:0,
            tag:"vuex", // 博客标签
            pubDate:"2020-08-14 9:22",
            num:-1,
            blogId:5,
            comment:0,
            bg:2
          }
        },
        computed:{
          myTag2() {
            let arr=this.tag.split(',');
            return arr.map(x => {
              return {
                name: x,
                color: this.getColor(x)
              }
            });
          },
          pubDate2(){
            let arr=this.pubDate.split(' ')[0].split('-');
            return {year:arr[0],month:arr[1],day:arr[2]}
          }
        },
        methods:{
            getData(){
              getBlog(this.blogId).then(res=>{
                if(res.code===200){
                  this.detail=res.result.detail;
                  this.title=res.result.title;
                  this.number=res.result.number;
                  this.tag=res.result.tag;
                  this.pubDate=res.result.pubDate;
                  this.comment=res.result.comment;
                  this.bg=res.result.bg;
                }
              })
            },
            copy(){
              let that=this;
              this.$nextTick().then(()=>{
              // 复制操作
              let list=document.getElementsByClassName('copy');
              for(let i=0;i<list.length;i++){
                list[i].addEventListener('click',function (e) {
                  // 复制操作
                  let temp=e.currentTarget.nextElementSibling.innerText.split('\n');
                  let s='';
                  temp.forEach(x=>{
                    if(x!==''){
                      s+=x+'\n';
                    }
                  });
                  document.getElementById('copy').value=s;
                  document.getElementById('copy').select();
                  document.execCommand('copy');
                  e.currentTarget.innerText='copied';
                  setTimeout(()=>{
                    e.target.innerText='copy';
                  },3000)
                })
              }

              // 图片缩略图
              that.imgList=[];
              let list2=document.querySelectorAll('div.img>img');
              for(let i=0;i<list2.length;i++){
                list2[i].addEventListener('click',function (e) {
                  window.open(e.target.src);
                })
              }
            })

          },
            goTo(tag){
            this.$router.push({
              path:'/tag/'+tag
            })
          },
            getColor(tag){
              let colors=[
                {name:'Python',color:'#FB4C7B'},
                {name:'Django',color:'#977ADD'},
                {name:'算法',color:'#FB674C'},
                {name:'算法练习',color:'#459CE6'},
                {name:'CSS',color:'#9EDD7A'},
                {name:'Mysql',color:'#CDDD7A'},
                {name:'Linux',color:'#DDB97A'},
                {name:'Vue',color:'#DD7A8D'},
                {name:'Javascript',color:'#DD7AB7'}
              ];

              for(let i=0;i<colors.length;i++){
                if(colors[i].name===tag){
                  return colors[i].color;
                }
              }
              return '#BF7ADD'
            },
            showTagInfo(index){
              this.num=index;
            }
        },
        created() {
          this.blogId=this.$route.params.id;
          this.getData();
        },
        mounted(){
          this.copy();
        },
        watch:{
          '$route.params.id':{
            handler(newVal){
              let temp=this.$cookies.get('seeList');
              if(temp){
                if(!temp.split(',').includes(newVal)){
                  addScan(newVal).then(res=>{});
                }
                let temp2=Array.from(new Set((temp+','+newVal).split(','))).join(',');
                this.$cookies.set('seeList',temp2,60*24-(new Date().getMinutes()));
              }
              else{
                addScan(newVal).then(res=>{});
                this.$cookies.set('seeList',newVal,60*24-(new Date().getMinutes()));
              }
              this.blogId=newVal;
              this.getData();
            },
            immediate:true
          },
          'detail': function () {
            this.copy();
          }
        },
        filters:{
          dateFilter(value){
            let temp=value.split(' ')[0].split('-');
            return temp[0]+'年'+temp[1]+'月'+temp[2]+'日'
          }
        }
    }
</script>

<style lang="less">
  @import "../../../assets/less/blogdetail2";
</style>

<style scoped lang="less">
  @import "../../../assets/less/blogdetail";
  @media screen and (max-width: 600px) {
    .pub-date{
      display: none;
    }
  }
</style>


