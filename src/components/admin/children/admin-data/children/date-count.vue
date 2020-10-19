<template>
  <div class="count-item">
    <div>
      <div>归档统计</div>
      <base-switch
        :flag="flag"
        :width="64"
        text="bar|line"
        @click="flag=!flag"
      ></base-switch>
    </div>
    <div id="date-count"></div>
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
require('echarts/lib/chart/bar');
require('echarts/lib/chart/line')
require('echarts/lib/component/tooltip');
require('echarts/lib/component/markPoint')
require('echarts/lib/component/markLine')

import {getDateBlog} from "@/api/src";

export default {
  name: "data-count",
  data(){
    return {
      chart:null,
      flag:true,
      xData:[],
      yData:[],
      loading:true
    }
  },
  async mounted() {
    const res=await getDateBlog();
    let xData=[];
    let yData=[];
    if(res.code===200){
      Object.keys(res.data).forEach(key=>{
        xData.push(key);
        yData.push(res.data[key]);
      })
    }
    xData=xData.sort();
    this.xData=xData;
    this.yData=yData;
    let option=this.getOptions();
    let node=document.getElementById('date-count');
    this.chart=echarts.init(node);
    this.loading=true;
    setTimeout(()=>{
      this.chart.setOption(option);
      this.loading=false;
    },600);
    window.addEventListener('resize',()=>{this.$store.commit('admin/toggleResizeFlag')});
  },
  methods:{
    getOptions(){
      return {
        tooltip: {
          trigger:'axis',
          axisPointer:{
            type:this.flag?'shadow':'line'
          },
        },
        xAxis: {
          data: this.xData,
          name: '时间'
        },
        yAxis: {
          name: '数量'
        },
        series: [{
          name: '时间-数量',
          type: this.flag ? 'bar' : 'line',
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
          itemStyle:{
            color:this.flag?'#717EBF':'#3FB976'
          },
          label:{
            normal:{
              show:true,
              position:'top'
            }
          },
        }]
      };
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
