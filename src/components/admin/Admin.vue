<template>
  <div class="admin">
    <div class="admin-left">
      <div>
        <img src="../../assets/img/blog3.png" alt="">
        <span>awwac</span>个人<span>blog</span>后台管理
      </div>
      <ul>
        <li @mouseover="showSlide($event)" @mouseout="closeSlide($event)" @click="goTo('con')"><img src="../../assets/img/blog2.png" alt="" >博客管理</li>
        <li @mouseover="showSlide($event)" @mouseout="closeSlide($event)" @click="goTo('file')"><img src="../../assets/img/class.png" alt="">分类管理</li>
        <li @mouseover="showSlide($event)" @mouseout="closeSlide($event)"><img src="../../assets/img/admintag.png" alt="">标签管理</li>
        <li @mouseover="showSlide($event)" @mouseout="closeSlide($event)"><img src="../../assets/img/admincomment.png" alt="">评论管理</li>
        <li @mouseover="showSlide($event)" @mouseout="closeSlide($event)"><img src="../../assets/img/adminuser.png" alt="">用户管理</li>
        <li class="slide" :style="styleObj"></li>
      </ul>
    </div>
    <div class="admin-right">
      <div class="top">
        <div>
          <img src="../../assets/img/scale.png" alt="" class="scale" title="缩小导航栏" @click="scaleNav()">
        </div>
        <div>
          <span>当前用户：</span>
          <img src="../../assets/img/user.jpg" alt="#">
          <span class="user-name">awwac
          <img src="../../assets/img/san.png" alt="" :style="'transform:rotate('+deg+')'" @click="showUser">
            <transition name="fade">
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
          <span class="sf">管理员</span>
        </div>
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
      deg:'0deg',
      navFlag:true  // 导航栏缩小
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
      this.$router.push({
        path:`/admin/${path}`
      })
    },
    scaleNav(){
      this.navFlag=!this.navFlag;
      let node=document.getElementsByClassName('admin-left')[0]
      if(this.navFlag){
        node.style.width='260px';
        node.style.opacity=1;
      }
      else {
        node.style.width=0;
        node.style.opacity=0;
      }
    }
  }
}
</script>

<style scoped lang="less">
  .fade-enter{
    height: 0;
    opacity: 0;
  }
  .fade-enter-active,.fade-leave-active{
    transition: all .3s;
  }
  .fade-enter-to{
    height: 90px;
    opacity: 1;
  }
  .fade-leave-to{
    opacity: 0;
  }
  .admin{
    display: flex;
    height: 100%;
    &-left{
      width: 260px;
      background-color: #272C33;
      color: #EEEEEE;
      transition: all .3s;
      opacity: 1;
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
      overflow: hidden;
      .top{
        height: 60px;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 30px;
        >div{
          display: flex;
          align-items: center;
          &:nth-child(1){
            margin-right: 20px;
          }
          .scale{
            width: 20px;
            height: auto;
            top: 20px;
            margin-left: 10px;
          }
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
              top: 45px;
              z-index: 100;
              background-color: white;
              height: 90px;
              li{
                margin: 10px 0;
                height: 30px;
                box-sizing: border-box;
                padding: 0 5px;
                display: flex;
                justify-content: center;
                align-items: center;
                transition: all .3s;
                &:hover{
                  background-color: #F2F3F6;
                  a{
                    color: black;
                  }
                }
                a{
                  color: #999999;
                  font-size: 13px;
                  transition: color .3s;
                }
                img{
                  width: 20px;
                  height: auto;
                }
              }
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
  @media screen and (max-width: 785px){
    .admin-left{
      width: 0;
      opacity: 0;
      z-index: -10;
    }
  }
</style>
