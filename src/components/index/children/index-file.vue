<template>
    <div class="file">
      <p>
        <img src="../../../assets/img/lan.png" alt="">
        分类专栏</p>
      <ul>
        <li v-for="(item,index) in arr" :key="index">
          <span>{{index+1}}</span>
          <a href="javascript:void(0)" @click="goTo(item.id)">{{item.name}}</a>
        </li>
      </ul>
    </div>
</template>

<script>
    import {getFile} from '../../../api/src';

    export default {
        name: "index-file",
        data(){
          return {
            arr:[]
          }
        },
        async created(){
          const res=await getFile();
          if(res.code===200){
            this.arr=res.result;
          }
        },
        methods:{
          goTo(id){
            this.$router.push({
              path:`/file/${id}`
            })
          }
        }
    }
</script>

<style scoped lang="less">
  .file{
    p{
      border-bottom: solid 1px #EEEEEE;
      padding-bottom: 5px;
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      img{
        width: 17px;
        height: auto;
        margin-right: 10px;
      }
    }
    ul{
      li{
        padding: 3px 0;
        display: flex;
        align-items: center;
        span{
          width: 20px;
          height: 20px;
          border-radius: 50%;
          color: white;
          line-height: 20px;
          margin-right: 10px;
          background-color: #B4B1B1;
          font-size: 13px;
          text-align: center;
        }
        a{
          color:#A56F84;
          &:hover{
            text-decoration: underline;
            color: red;
          }
        }
      }
    }
  }
</style>
