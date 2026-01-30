
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { ChartDataItem, BarChartItem } from '../types';
import { Select, Tag } from 'antd';

// Extract Option from Select to ensure correct JSX typing and avoid conflicts with global HTMLOptionElement
const { Option } = Select;

interface PieProps {
  data: ChartDataItem[];
  title: string;
}

export const SalesPieChart: React.FC<PieProps> = ({ data, title }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);
    
    const option: echarts.EChartsOption = {
      animationDuration: 800,
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'right',
        top: 'middle',
        itemWidth: 10,
        itemHeight: 10,
        textStyle: { fontSize: 10 }
      },
      series: [
        {
          name: title,
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['40%', '50%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 4,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '14',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: data
        }
      ],
      color: ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe']
    };

    chart.setOption(option);

    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, [data, title]);

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold text-gray-700">{title}</h3>
        <Select size="small" defaultValue="ticket" className="w-32">
          <Option value="ticket">Ticket Type</Option>
          <Option value="region">By Region</Option>
        </Select>
      </div>
      <div ref={chartRef} className="w-full flex-grow h-64"></div>
    </div>
  );
};

interface BarProps {
  data: BarChartItem[];
  title: string;
}

export const SalesBarChart: React.FC<BarProps> = ({ data, title }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);
    
    const seriesNames = Object.keys(data[0] || {}).filter(k => k !== 'time');

    const option: echarts.EChartsOption = {
      animationDuration: 1000,
      animationEasing: 'cubicOut',
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      legend: {
        bottom: 0,
        itemWidth: 10,
        itemHeight: 10,
        textStyle: { fontSize: 10 }
      },
      grid: {
        top: '10%',
        left: '3%',
        right: '4%',
        bottom: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: data.map(d => d.time),
        axisLine: { lineStyle: { color: '#e5e7eb' } },
        axisLabel: { color: '#9ca3af', fontSize: 10 },
        boundaryGap: true
      },
      yAxis: {
        type: 'value',
        splitLine: { lineStyle: { type: 'dashed', color: '#f3f4f6' } },
        axisLabel: { color: '#9ca3af', fontSize: 10 }
      },
      series: seriesNames.map(name => ({
        name,
        type: 'bar',
        stack: 'total',
        emphasis: { focus: 'series' },
        data: data.map(d => d[name] as number),
        barWidth: '40%',
        universalTransition: true
      })),
      color: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']
    };

    chart.setOption(option);

    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, [data]);

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm h-full flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-2 md:space-y-0">
        <h3 className="text-sm font-bold text-gray-700">{title}</h3>
        <div className="flex items-center space-x-3">
          <Tag color="success" bordered={false} className="m-0 flex items-center">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
            Real-time
          </Tag>
          <Select size="small" defaultValue="30m" className="w-32">
            <Option value="30m">Last 30 mins</Option>
            <Option value="1h">Last 1 hour</Option>
          </Select>
        </div>
      </div>
      <div ref={chartRef} className="w-full flex-grow h-80"></div>
    </div>
  );
};
