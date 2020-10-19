<template>
  <div class="visit-count">
    <p>每日访问统计<span>每天7:00更新数据</span></p>
    <div id="visit-count"></div>
    <transition>
      <base-loading
        con="图形加载中"
        type="float"
        v-if="loading">
      </base-loading>
    </transition>
  </div>
</template>

<script>
const echarts=require('echarts/lib/echarts');
require('echarts/lib/chart/line')
require('echarts/lib/component/tooltip');
require('echarts/lib/component/markLine')
export default {
  name: "visit-count",
  data(){
    return {
      result:[
        {time:'1:00',number:4},
        {time:'2:00',number:7},
        {time:'3:00',number:20},
        {time:'4:00',number:20},
        {time:'5:00',number:30},
        {time:'6:00',number:50},
        {time:'7:00',number:90},
        {time:'8:00',number:63},
        {time:'9:00',number:70},
        {time:'10:00',number:30},
        {time:'11:00',number:10},
        {time:'12:00',number:5},
        {time:'13:00',number:40},
        {time:'14:00',number:89},
        {time:'15:00',number:34},
        {time:'16:00',number:56},
        {time:'17:00',number:27},
        {time:'18:00',number:69},
        {time:'19:00',number:23},
        {time:'20:00',number:45},
        {time:'21:00',number:90},
        {time:'22:00',number:20},
        {time:'23:00',number:3},
        {time:'00:00',number:1}
      ],
      index:6,
      chart:null,
      size:12,
      clock:null,
      loading:false
    }
  },
  methods:{
    getCurArr(){
      let temp=this.result.slice(this.index,this.index+this.size);
      if(temp.length<this.size){
        let arr=this.result.slice(0,this.size-temp.length);
        temp=[...temp,...arr];
      }
      return temp;
    },
    getOptions(){
      let temp=this.getCurArr();
      return {
        tooltip: {
          trigger:'axis',
          axisPointer:{
            type:'cross'
          },
        },
        xAxis: {
          data: temp.map(x=>x.time),
          name: '时间',
          boundaryGap:false
        },
        yAxis: {
          name: '访问量',
        },
        series: [{
          name: '时间-访问量',
          type: 'line',
          data: temp.map(x=>x.number),
          areaStyle:{},
          label:{
            normal:{
              show:true,
              position:'top'
            }
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
            color:'#CC0345'
          }
        }]
      };
    }
  },
  mounted(){
    let node=document.getElementById('visit-count');
    this.chart=echarts.init(node);
    this.loading=true;
    setTimeout(()=>{
      this.chart.setOption(this.getOptions());
      this.loading=false;
    },600);
    this.clock=setInterval(()=>{
      this.index+=1;
      if(this.index>this.result.length-1){
        this.index=0;
      }
    },3000);
  },
  beforeDestroy() {
    this.clock=null
  },
  watch:{
    index:function (){
      this.chart.setOption(this.getOptions());
    },
    '$store.state.admin.scaleFlag':function (){
      setTimeout(()=>{
        this.chart.resize();
      },300);
    },
    '$store.state.admin.resizeFlag':function (){
      this.chart.resize();
    },
  },

}
</script>

<style scoped lang="less">
  .visit-count{
    margin: 10px;
    padding: 10px;
    background-color: white;
    position: relative;
    #visit-count{
      height: 350px;
    }
    >p{
      span{
        float: right;
        color: #999999;
        margin-left: 10px;
        font-size: 13px;
      }
    }
  }
</style>
