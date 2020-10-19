<template>
  <div>
    <visit-count></visit-count>
    <div class="admin-data">
      <date-count></date-count>
      <tag-count></tag-count>
      <file-count></file-count>
    </div>
  </div>
</template>

<script>
import DateCount from './children/date-count';
import FileCount from './children/file-count';
import TagCount from './children/tag-count';
import VisitCount from './children/visit-count';

export default {
  name: "admin-data",
  components:{
    DateCount,
    FileCount,
    TagCount,
    VisitCount
  }
}
</script>

<style scoped lang="less">
  .admin-data{
    margin: 10px;
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(450px,1fr));
    gap: 10px;
    >div{
      background-color: white;
      padding: 10px;
    }
  }
  @media screen and (max-width: 600px) {
    .admin-data{
      grid-template-columns: 1fr;
    }
  }
</style>
