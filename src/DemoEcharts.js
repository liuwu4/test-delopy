import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const DemoEcharts = ({ id }) => {
  const charts = () => {
    var chartDom = document.getElementById(`${id}`);
    var myChart = echarts.init(chartDom);
    var option;
    option = {
      backgroundColor: '#FFF',
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }
      ]
    };
    option && myChart.setOption(option);
  };
  useEffect(() => {
    charts();
  });
  return <div className='main' id={id}></div>;
};
export default DemoEcharts;
