<template>
    <div>
      <div class="detail" :class="{bg1:bg===1,bg2:bg===2,bg3:bg===3}">

        <!-- 博客标题等信息-->
        <div class="detail-title">
          <p>{{title}}</p>
          <div class="detail-author">
            <div class="four">
              <i class="el-icon-user"></i>awwac
            </div>
            <div class="four">
              <i class="el-icon-date"></i>{{pubDate|dateFilter}}
            </div>
            <div class="four">
              <i class="el-icon-tickets"></i>{{number}}
            </div>
            <div class="four">
              <i class="el-icon-chat-dot-round"></i>
              {{comment}}
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
            <base-tooltip v-for="(item,index) in myTag2" :key="index" :info="'查看'+item.name" style="margin-right: 10px;">
              <a href="javascript:void(0)"
                 :style="{'background-color':item.color}"
                 @click="goTo(item.name)">{{item.name}}</a>
            </base-tooltip>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
  import {addScan, getBlog} from "@/api/src";
  import {getColor} from "@/utils";

  export default {
    name: "blog-detail",
    data(){
      return {
        detail:"",
        title:"element-ui icon图标库打包后的字体文件显示404 not find",
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
            color: getColor(x)
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
        goTo(tag){
        this.$router.push({
          path:'/tag/'+tag
        })
      }
    },
    created() {
      this.blogId=this.$route.params.id;
      this.getData();
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


