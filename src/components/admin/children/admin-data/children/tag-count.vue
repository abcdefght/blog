<template>
  <div class="count-item">
    <div>
      <div>标签统计</div>
      <div>
        <base-switch
          :flag="flag"
          :width="64"
          text="bar|line"
          @click="flag=!flag"
        ></base-switch>
      </div>
    </div>
    <div id="tag-count"></div>
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
import {getTagBlog} from "@/api/src";

export default {
  name: "tag-count",
  data(){
    return {
      chart:null,
      flag:true,
      xData:[],
      yData:[],
      loading:false
    }
  },
  async mounted(){
    this.loading=true;
    const res=await getTagBlog();
    if(res.code===200){
      this.xData=res.result.data.map(x=>x.name);
      this.yData=res.result.data.map(x=>x.count);
    }
    let node=document.getElementById('tag-count');
    this.chart=echarts.init(node);
    setTimeout(()=>{
      this.loading=false;
      this.chart.setOption(this.getOptions());
    },600);
  },
  methods:{
    getOptions(){
      return {
        tooltip: {
          trigger:'axis',
          axisPointer:{
            type:this.flag?'shadow':'cross'
          },
        },
        xAxis: {
          data: this.xData,
          name: '标签名'
        },
        yAxis: {
          name: '数量'
        },
        series: [{
          name: '标签名-数量',
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
            color:this.flag?'#C03531':'#315BC0'
          },
          label:{
            normal:{
              show:true,
              position:'top'
            }
          }
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
