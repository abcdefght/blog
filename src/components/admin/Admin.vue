<template>
  <div class="admin">
    <div class="admin-left">
      <div>
        <img src="../../assets/img/blog3.png" alt="">
        <span>awwac</span>个人<span>blog</span>后台管理
      </div>
      <ul>
        <li @mouseover="showSlide($event)" @mouseout="closeSlide($event)" @click="goTo('blog-con')"><img src="../../assets/img/blog2.png" alt="" >博客管理</li>
        <li @mouseover="showSlide($event)" @mouseout="closeSlide($event)"><img src="../../assets/img/class.png" alt="">分类管理</li>
        <li @mouseover="showSlide($event)" @mouseout="closeSlide($event)"><img src="../../assets/img/admintag.png" alt="">标签管理</li>
        <li @mouseover="showSlide($event)" @mouseout="closeSlide($event)"><img src="../../assets/img/admincomment.png" alt="">评论管理</li>
        <li @mouseover="showSlide($event)" @mouseout="closeSlide($event)"><img src="../../assets/img/adminuser.png" alt="">用户管理</li>
        <li class="slide" :style="styleObj"></li>
      </ul>
    </div>
    <div class="admin-right">
      <div class="top">
        <span>当前用户：</span>
        <img src="../../assets/img/user.jpg" alt="#">
        <span class="user-name">awwac
          <img src="../../assets/img/san.png" alt="" :style="'transform:rotate('+deg+')'" @click="showUser">
          <transition name="slide">
            <ul class="options" v-if="flag">
            <li>
              <img src="../../assets/img/index.png" alt="">
              <a href="javascript:void(0)">返回主页</a>
            </li>
            <li>
              <img src="../../assets/img/logout.png" alt="">
              <a href="javascript:void(0)">退出登陆</a>
            </li>
          </ul>
          </transition>
        </span>
        <span class="sf">普通用户</span>
      </div>
      <div class="con">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Admin",
  data(){
    return {
      styleObj:{
        height:0,
        top:0,
        opacity:0
      },
      flag:false,  // 登陆框显示
      deg:'0deg'
    }
  },
  methods:{
    showSlide(e){
      this.styleObj.height=e.currentTarget.offsetHeight+'px';
      this.styleObj.opacity=1;
      this.styleObj.top=e.currentTarget.offsetTop+'px';
    },
    closeSlide(e){
      this.styleObj.height=0;
      this.styleObj.opacity=0;
      this.styleObj.top=e.currentTarget.offsetTop+e.currentTarget.offsetHeight/2+'px';
    },
    showUser(){
      this.flag=!this.flag;
      this.deg=this.flag?'180deg':'0deg'
    },
    goTo(path){
      console.log('跳转');
      this.$router.push({
        path:`/admin/${path}`
      })
    }
  }
}
</script>

<style scoped lang="less">
  .admin{
    display: flex;
    height: 100%;
    &-left{
      width: 260px;
      background-color: #272C33;
      color: #EEEEEE;
      >div{
        padding-left: 15px;
        margin: 40px 0;
        display: flex;
        align-items: center;
        font-size: 14px;
        img{
          width: 16px;
          height: auto;
          margin-right: 5px;
        }
        span{
          font-family: "Small-Italic",sans-serif;
          color: #00a67c;
          padding: 0 2px;
          font-size: 16px;
        }
      }
      ul{
        position: relative;
        li{
          height: 44px;
          line-height: 44px;
          padding-left: 15px;
          display: flex;
          align-items: center;
          color: #999999;
          font-size: 14px;
          transition: all .3s;
          &:hover{
            color: #00a67c;
            cursor: pointer;
          }
          >div{
            position: relative;
            top: 0;
          }
          img{
            width: 20px;
            height: auto;
            margin-right: 12px;
          }
          &.slide{
            position: absolute;
            width: 4px;
            background-color: #00a67c;
            left: 0;
            padding-left: 0;
          }
        }
      }
    }
    &-right{
      flex: 1;
      display: flex;
      flex-direction: column;
      .top{
        height: 60px;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: 14px;
        padding-right: 30px;
        img{
          width: 30px;
          height: auto;
          margin-right: 5px;
        }
        .sf{
          font-size: 12px;
          background-color: #999999;
          color: white;
          padding: 3px 5px;
          margin-left: 5px;
        }
        .user-name{
          display: flex;
          align-items: center;
          >img{
            width: 20px;
            height: auto;
            margin-left: 14px;
            transition: all .3s;
            &:hover{
              cursor: pointer;
            }
          }
          font-family: "Small-Italic",sans-serif;
          color: #999999;
          padding: 5px 15px;
          position: relative;
          .options{
            width: 100%;
            left: 0;
            position: absolute;
            top: 100%;
            margin-top: 10px;
            z-index: 100;
            background-color: #3C3C3C;
            list-style: none;
            li{
              height: 40px;
              box-sizing: border-box;
              padding: 0 5px;
              display: flex;
              justify-content: center;
              align-items: center;
              opacity: .6;
              transition: opacity .3s;
              &:hover{
                opacity: 1;
              }
              a{
                color: white;
                font-size: 13px;
                transition: color .3s;
              }
              img{
                width: 20px;
                height: auto;
              }
            }
            &:after{
              content: ' ';
              position: absolute;
              width: 0;
              height: 0;
              left: 16px;
              bottom: 100%;
              border-left: solid 8px transparent;
              border-right: solid 8px transparent;
              border-bottom: solid 10px #3C3C3C;
            }
          }
        }
      }
      .con{
        flex: 1;
        overflow: auto;
      }
    }
  }

</style>
