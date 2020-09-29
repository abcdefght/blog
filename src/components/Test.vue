<template>
    <div id="test">
      <div class="test-table">
        <table>
          <tr>
            <td>菜单1<button>click1</button><button>click2</button></td>
            <td>菜单2</td>
            <td>菜单3</td>
            <td>菜单4</td>
            <td>菜单5</td>
            <td>菜单6</td>
            <td>菜单7</td>
            <td>菜单8</td>
            <td>菜单9</td>
            <td>菜单10</td>
          </tr>
        </table>
      </div>
    </div>
</template>

<script>
  export default {
      name: "Test",
  }
</script>

<style scoped lang="less">
  #test{
    margin: 10px;
    background-color: white;
    padding: 20px;
    .test-table{
      width: 100%;
      overflow: auto;
      table{
        border-collapse: collapse;
        width: 100%;
        td{
          padding: 5px 10px;
          border: solid 1px #00a67c;
          min-width: 200px;
        }
      }
    }
  }
</style>
