<template>
  <div class="count-item">
    <div>
      <div>分类统计</div>
      <base-switch
        :flag="flag"
        :width="64"
        text="line|pie"
        @click="flag=!flag"
      ></base-switch>
    </div>
    <div id="file-count"></div>
    <transition name="opacity">
      <base-loading
        v-if="loading"
        con="图形加载中"
        type="float">
      </base-loading>
    </transition>
  </div>
</template>

<script>
const echarts=require('echarts/lib/echarts');
require('echarts/lib/chart/pie');
require('echarts/lib/chart/line')
require('echarts/lib/component/tooltip');
require('echarts/lib/component/markPoint')
require('echarts/lib/component/markLine')
import {getFile} from "@/api/src";

export default {
  name: "file-count",
  data(){
    return {
      flag:true,
      chart:null,
      xData:[],
      yData:[],
      result:[],
      loading:false
    }
  },
  async mounted(){
    this.loading=true;
    const res=await getFile();
    if(res.code===200){
      this.xData=res.result.map(x=>x.name);
      this.yData=res.result.map(x=>x.count);
      this.result=res.result.map(x=>({value:x.count,name:x.name}));
    }
    let node=document.getElementById('file-count');
    this.chart=echarts.init(node);
    setTimeout(()=>{
      this.loading=false;
      this.chart.setOption(this.getOptions());
    },600);
  },
  methods:{
    getOptions(){
      if(this.flag){
        return {
          tooltip: {
            trigger:'axis',
            axisPointer:{
              type:'line'
            },
          },
          xAxis: {
            data: this.xData,
            name: '时间',
            show:true
          },
          yAxis: {
            name: '数量',
            show: true
          },
          series: [
            {
              name: '分类名-数量',
              type: 'line',
              stack:'总量',
              data: this.yData,
              markPoint: {
                data: [
                  {
                    type: 'max',
                    name: 'Max'
                  },
                  {
                    type: 'min',
                    name: 'Min'
                  }
                ]
              },
              markLine: {
                data: [
                  {
                    type: 'average',
                    name: 'Avg'
                  }
                ]
              },
              label:{
                normal:{
                  show:true,
                  position:'top'
                }
              },
            },
          ]
        }
      }
      else{
        return {
          tooltip: {
            trigger: 'item',
            axisPointer:{
              type: "none"
            },
          },
          legend:{
            orient:'vertical',
            left:10,
            data:this.xData
          },
          xAxis: {
            show:false,
          },
          yAxis: {
            show:false
          },
          series: [
            {
              type:'pie',
              data:this.result
            }
          ]
        }
      }
    }
  },
  watch:{
    '$store.state.admin.scaleFlag':function (){
      setTimeout(()=>{
        this.chart.resize();
      },300);
    },
    '$store.state.admin.resizeFlag':function (){
      this.chart.resize();
    },
    flag:function (){
      this.loading=true;
      setTimeout(()=>{
        this.loading=false;
        this.chart.setOption(this.getOptions());
      },600);
    }
  }
}
</script>

<style scoped lang="less">
@import "../../../../../assets/less/count";
</style>
