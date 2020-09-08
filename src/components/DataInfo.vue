<template>
      <div class="date-left">
        <div class="date-left-title">
          <div>
            文章归档
          </div>
          <div>
            <span :class="{active:num===1}" @mouseover="changeChart(1)"></span>
            <span :class="{active:num===2}" @mouseover="changeChart(2)"></span>
            <span :class="{active:num===3}" @mouseover="changeChart(3)"></span>
          </div>
        </div>
        <div id="date"></div>
        <div class="date-left-title" style="padding-top: 10px">
          <div>
            博客标签
          </div>
          <div>
            <span :class="{active:num2===1}" @mouseover="changeChart2(1)"></span>
            <span :class="{active:num2===2}" @mouseover="changeChart2(2)"></span>
            <span :class="{active:num2===3}" @mouseover="changeChart2(3)"></span>
          </div>
        </div>
        <div id="tag"></div>
      </div>
</template>

<script>
    let echarts=require('echarts/lib/echarts');
    require('echarts/lib/chart/bar');
    require('echarts/lib/chart/line');
    require('echarts/lib/chart/scatter');
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    require('echarts/lib/component/markPoint');

    import {getDateBlog,getTagBlog} from "../api/src";

    export default {
        name: "DataInfo",
        data(){
          return {
            num:1,
            dateArr:[],
            tagArr:[],
            num2:2
          }
        },
        mounted(){
          this.$axios.get('../../static/vintage.json').then(res=>{
            if(res.status===200){
              echarts.registerTheme('vintage',res.data);
              // 文章归档
              let myChart=echarts.init(document.getElementById('date'),'vintage');
              myChart.showLoading();
              getDateBlog().then(res=>{
                if(res.code===200){
                  let temp=[];
                  Object.keys(res.data).forEach(key=>{
                    temp.push({'time':key,'number':res.data[key]})
                  });
                  temp.sort(function (a, b) {
                    if(parseInt(a.time.split('-').join(''),10)>parseInt(b.time.split('-').join(''),10)){
                      return 1
                    }
                    else {
                      return -1
                    }
                  });
                  this.dateArr=temp;
                  let option={
                    tooltip:{

                    },
                    xAxis:{
                      name:'时间',
                      data:temp.map(x=>x.time)
                    },
                    yAxis:{
                      name:'数量'
                    },
                    series:[
                      {
                        type:'bar',
                        data:temp.map(x=>x.number),
                        markPoint:{
                          symbol:'pin',
                          symbolSize:46,
                          data:[{type:"max"}],
                          symbolOffset: [0, -10]
                        }
                      },
                    ]
                  };
                  myChart.setOption(option);
                  myChart.hideLoading();
                }
              });
              // 博客标签
              let myChart2=echarts.init(document.getElementById("tag"),'vintage');
              myChart2.showLoading();
              getTagBlog().then(res=>{
                if(res.code===200){
                  this.tagArr=res.result.data;
                  let option={
                    tooltip:{

                    },
                    xAxis:{
                      name:'时间',
                      data:this.tagArr.map(x=>x.name)
                    },
                    yAxis:{
                      name:'数量'
                    },
                    series:[
                      {
                        type:'line',
                        data:this.tagArr.map(x=>x.count),
                        markPoint:{
                          symbol:'pin',
                          symbolSize:46,
                          data:[{type:"max"}],
                          symbolOffset: [0, -10]
                        }
                      }
                    ]
                  };
                  myChart2.setOption(option);
                  myChart2.hideLoading();
                }
              })

            }
          });
        },
        methods:{
          changeChart(num){
            this.num=num;
            let type;
            let color;
            if(num===1){
              type='bar';
              color='#79DAA6';
            }
            else if(num===2){
              type='line';
              color='#FA55EC';
            }
            else {
              type='scatter';
              color='#FA5558';
            }
            let myChart=echarts.init(document.getElementById('date'),'vintage');
            let option={
              tooltip:{},
              xAxis:{
                name:'时间',
                data:this.dateArr.map(x=>x.time)
              },
              yAxis:{
                name:'数量'
              },
              series:[
                {
                  type:type,
                  data:this.dateArr.map(x=>x.number),
                  markPoint:{
                    symbol:'pin',
                    symbolSize:46,
                    data:[{type:"max"}],
                    symbolOffset: [0, -10],
                    itemStyle: {
                      color:color
                    }
                  }
                }
              ]
            };
            myChart.setOption(option);
          },
          changeChart2(num){
            this.num2=num;
            let type;
            let color;
            if(num===1){
              type='bar';
              color="#40ADFC"
            }
            else if(num===2){
              type='line';
              color="#FC6140"
            }
            else {
              type='scatter';
              color="#009688"
            }
            let myChart=echarts.init(document.getElementById('tag'),'vintage');
            console.log(this.tagArr);
            let option={
              tooltip:{},
              xAxis:{
                name:'时间',
                data:this.tagArr.map(x=>x.name)
              },
              yAxis:{
                name:'数量'
              },
              series:[
                {
                  type:type,
                  data:this.tagArr.map(x=>x.count),
                  markPoint:{
                    symbol:'pin',
                    symbolSize:46,
                    data:[{type:"max"}],
                    symbolOffset: [0, -10],
                    itemStyle:{
                      color:color
                    }
                  }
                }
              ]
            };
            myChart.setOption(option);
          }
        }

    }
</script>

<style scoped lang="less">
  .date-left{
    max-width: 700px;
    padding: 10px;
    margin: 10px auto;
    background-color: white;
    &-title{
      padding-bottom: 10px;
      display: flex;
      justify-content: space-between;
      >div:nth-child(2){
        span{
          display: inline-block;
          height: 10px;
          width: 10px;
          background-color: #E2E2E2;
          margin-left: 6px;
          border-radius: 50%;
          transition: background-color .3s;
          &.active{
            background-color: #8F8E8E;
          }
          &:hover{
            cursor: pointer;
          }
        }
      }
    }
    #date,#tag{
      height: 300px;
    }
  }
</style>
