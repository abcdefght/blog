<template>
    <div class="file">
      <p>分类专栏</p>
      <ul>
        <li v-for="(item,index) in arr" :key="index">
          <div><img src="../../../assets/img/file.png" alt="#"></div>
          <div><a href="javascript:void(0)" @click="goTo(item.id)">{{item.name}}</a></div>
        </li>

      </ul>
    </div>
</template>

<script>
    import {getFile} from '../../../api/src';

    export default {
        name: "BlogFile",
        data(){
          return {
            arr:[]
          }
        },
        created(){
          getFile().then(res=>{
            if(res.code===200){
              this.arr=res.result;
            }
          })
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
    }
    li{
      display: flex;
      div{
        display: flex;
        align-items: center;
        &:nth-child(1){
          width: 30px;
          height: 30px;
          img{
            width: 20px;
            height: 20px;
          }
        }
        a{
          color: black;text-decoration: none;
          &:hover{
            text-decoration: underline;
          }
        }
      }
    }
  }
</style>
