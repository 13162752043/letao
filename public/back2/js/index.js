// 图表的初始化
$(function(){
  //柱状图
  var myChart1 = echarts.init(document.querySelector('.chart1'));

        // 指定图表的配置项和数据
        var option1 = {
            title: {
                text: '2017年注册人数'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart1.setOption(option1);


  // 饼图
  // 指定饼图的配置项和数据
 var echarts_2 = echarts.init(document.querySelector(".chart2"));
 var option2 = {
 title : {
     text: '热门品牌销售',
     subtext: '2017 6月',
     x:'center'
 },
 tooltip : {
     trigger: 'item',
     formatter: "{a} <br/>{b} : {c} ({d}%)"
 },
 legend: {
     orient: 'vertical',
     left: 'left',
     data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
 },
 series : [
     {
         name: '访问来源',
         type: 'pie',
         radius : '55%',
         center: ['50%', '60%'],
         data:[
             {value:335, name:'直接访问'},
             {value:310, name:'邮件营销'},
             {value:234, name:'联盟广告'},
             {value:135, name:'视频广告'},
             {value:1548, name:'搜索引擎'}
         ],
         itemStyle: {
             emphasis: {
                 shadowBlur: 10,
                 shadowOffsetX: 0,
                 shadowColor: 'rgba(0, 0, 0, 0.5)'
             }
         }
     }
 ]
};

// 使用刚指定的配置项和数据显示图表。
echarts_2.setOption(option2);


})



