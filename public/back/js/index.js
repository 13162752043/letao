$(function() {
  // 实现柱状图和饼状图

  // 1. 左侧柱状图
  var echarts_1 = echarts.init(document.querySelector(".chart1"));

  // 指定图表的配置项和数据
  var option1 = {
    // 大标题
    title: {
      // 标题文本
      text: '2017年 注册人数',
      // 配置标题样式
      textStyle: {
        color: "red",
        //fontSize: 30  // 配置大小
      }
    },
    // 提示框组件
    tooltip: {},
    // 图例
    legend: {
      data:['人数']
    },
    // 表示 x 轴
    xAxis: {
      data: ["1月","2月","3月","4月","5月","6月"]
    },
    // 表示 y 轴, y 轴一般是刻度, 尽量根据数据自适应
    yAxis: {},
    // 配置的是数据
    series: [{
      name: '人数',
      // type 表示图标的类型, bar柱状图, line 折线图, pie 饼图
      type: 'bar',
      data: [1000, 1500, 2500, 1300, 1800, 2400]
    }]
  };

  // 使用刚指定的配置项和数据显示图表。
  echarts_1.setOption(option1);

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