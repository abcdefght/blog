<template>
  <div>
    <NavBar/>
    <div class="container">
      <div class="one">
        <index-carouse></index-carouse>
        <index-recommend></index-recommend>
        <index-blog></index-blog>
      </div>
      <div class="two">
        <index-calender></index-calender>
        <index-notice></index-notice>
        <index-user></index-user>
        <index-file></index-file>
        <index-date></index-date>
        <index-tags></index-tags>
        <index-link></index-link>
      </div>
    </div>
    <div>
      <index-info></index-info>
    </div>
  </div>
</template>

<script>
import IndexCalender from './children/index-calender'
import IndexCarouse from './children/index-carouse'
import IndexInfo from './children/index-info'
import IndexBlog from './children/index-blog';
import IndexRecommend from './children/index-recommend';
import IndexLink from './children/index-link';
import IndexDate from './children/index-date';
import IndexUser from './children/index-user';
import IndexTags from './children/index-tags';
import IndexNotice from './children/index-notice';
import IndexFile from './children/index-file';
import NavBar from "../NavBar";

export default {
  name: 'App',
  components: {
    IndexCalender,
    IndexCarouse,
    IndexInfo,
    IndexBlog,
    IndexRecommend,
    IndexLink,
    IndexDate,
    IndexUser,
    IndexTags,
    IndexNotice,
    IndexFile,
    NavBar
  },
  created() {
    this.$axios.get('https://www.uhnehc.top/api/blog/1').then(res=>console.log(res));
  }
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
        padding: 20px;
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
