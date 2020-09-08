<template>
  <div>
    <div class="container">
      <div class="one">
        <Carouse/>
        <index-recommend></index-recommend>
        <TopBlog/>
      </div>
      <div class="two">
        <Calender/>
        <Notice/>
        <user-show></user-show>
        <blog-file></blog-file>
        <Date/>
        <Tags/>
        <friend-link></friend-link>
      </div>
    </div>
    <div>
      <Info/>
    </div>
  </div>
</template>

<script>
import Calender from './children/Calender'
import Carouse from './children/Carouse'
import Info from './children/Info'
import TopBlog from './children/TopBlog';
import IndexRecommend from './children/IndexRecommend';
import FriendLink from './children/FriendLink';
import Date from './children/Date';
import UserShow from './children/UserShow';
import Tags from './children/Tags';
import Notice from './children/Notice';
import BlogFile from './children/BlogFile';

export default {
  name: 'App',
  components: {
    Calender,
    Carouse,
    Info,
    TopBlog,
    IndexRecommend,
    FriendLink,
    Date,
    UserShow,
    Tags,
    Notice,
    BlogFile
  },
}
</script>

<style lang="less" scoped>
  .container{
    display: flex;
    max-width: 1160px;
    margin: 10px auto 0 auto;
    .one{
      flex: 3;
    }
    .two{
      flex: 1;
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      >div{
        background-color: white;
        padding: 10px;
        &:nth-child(n+2){
          margin-top: 10px;
        }
        &:last-child{
          margin-bottom: 10px;
        }
      }
    }
  }
  @media screen and (max-width: 785px) {
    .container{
      flex-direction: column;
      .carouse{
        height: 220px;
      }
      .two{
        margin-left: 0;
      }
    }
  }
</style>
