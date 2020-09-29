<template>
  <div class="blog-date">
    <p>
      <img src="../../../assets/img/guidang.png" alt="">
      文章归档</p>
    <p v-for="(item,index) in dateData" class="date" :key="index">
      <a href="javascript:void(0)" @click="goTo(item.pubDate)">{{item.pubDate|dateFilter}}</a><span>{{item.count}}篇</span>
    </p>
  </div>
</template>

<script>
    import {getDateBlog} from "../../../api/src";

    export default {
        name: "index-date",
        data(){
          return {
            dateData:[]
          }
        },
        async created(){
          const res=await getDateBlog();
          if(res.code===200){
            let temp=[];
            Object.keys(res.data).forEach(key=>{
              temp.push({'pubDate':key,'count':res.data[key]})
            });
            temp.sort(function (a,b){
              if(parseInt(a.pubDate.split('-').join(''),10)>parseInt(b.pubDate.split('-').join(''),10)){
                return 1
              }
              else {
                return -1
              }
            })
            this.dateData=temp;
          }
        },
        filters:{
          dateFilter(data) {
            let a=data.split("-");
            return a[0]+"年"+parseInt(a[1],10)+"月"
          },
        },
        methods:{
          goTo(index){
            this.$router.push({
              path:'/date/'+index
            })
          }
        },
    }
</script>

<style scoped lang="less">
    @import "../../../assets/less/date";
</style>
