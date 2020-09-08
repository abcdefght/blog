<template>
  <div class="blog-date">
    <p>文章归档</p>
    <p v-for="(item,index) in dateData" class="date" :key="index">
      <a href="javascript:void(0)" @click="goTo(index)">{{index|dateFilter}}</a><span>{{item}}篇</span>
    </p>
  </div>
</template>

<script>
    import {getDateBlog} from "../../../api/src";

    export default {
        name: "date",
        data(){
          return {
            dateData:[]
          }
        },
        created(){
          getDateBlog(this.$route.params.uid).then(res=>{
            if(res.code===200){
              this.dateData=res.data;
            }
          })
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
        watch:{
          '$route.params.uid':function () {
            getDateBlog(this.$route.params.uid).then(res=>{
              if(res.code===200){
                this.dateData=res.data;
              }
            })
          }
        },
    }
</script>

<style scoped lang="less">
    @import "../../../assets/less/date";
</style>
