<template>
    <div class="recommend">
      <p>
        <img src="../../../assets/img/recommend.png" alt="">
        推荐阅读</p>
      <ul>
        <li v-for="(item,index) in blogData">
          <span class="num">{{index+1}}</span>
          <a href="javascript:void(0)" @click="goTo(item.id)">{{item.title}}</a>
          <span class="recommend-number">
            <span>
              <img src="../../../assets/img/see3.png" alt="#">
            </span>
            <span>{{item.number}}</span>
          </span>
        </li>
      </ul>
    </div>
</template>

<script>
    import {getMostHot} from '../../../api/src'
    export default {
        name: "IndexRecommend",
        data(){
          return {
            blogData:[]
          }
        },
        created(){
          getMostHot().then(res=>{
            if(res.code===200){
              this.blogData=res.result;
            }
          });
        },
        methods:{
          goTo(id){
            this.$router.push({
              path:'/blog/'+id
            })
          }
        }
    }
</script>

<style scoped lang="less">
    .recommend{
      padding: 20px;
      background-color: white;
      margin-top: 10px;
      >p{
        padding-bottom: 5px;
        border-bottom: 1px solid #bfbdbe;
        display: flex;
        align-items: center;
        img{
          width: 19px;
          height: auto;
          margin-right: 10px;
        }
      }
      >ul{
        position: relative;
        margin-top: 7px;
        >li{
          display: block;
          height: 30px;
          line-height: 30px;
          >.num{
            display: inline-block;
            width: 22px;
            height: 22px;
            font-size: 14px;
            color: white;
            text-align: center;
            line-height: 22px;
            margin-right: 5px;
          }
          &:nth-child(1){
            >.num{
              background-color: #FA2525;
            }
          }
          &:nth-child(2){
            .num{
              background-color: #009688;
            }
          }
          &:nth-child(3){
            .num{
              background-color: #2588FA;
            }
          }
          &:nth-child(n+4){
            .num{
              background-color: #999999;
            }
          }
          >a{
            text-decoration: none;
            color: black;
            &:hover{
              text-decoration: underline;
            }
          }
          >.recommend-number{
            float: right;
            color: #FB4670;
            font-size: 14px;
            display: flex;
            height: 100%;
            >span{
              display: flex;
              justify-content: flex-start;
              align-items: center;
              &:nth-child(1){
                width: 30px;
                height: 100%;
                >img{
                  width: 20px;
                  height: auto;
                }
              }
              &:nth-child(2){
                width: 30px;
              }
            }
          }
        }
      }
    }
</style>
