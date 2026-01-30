
import { KPIStats, ChartDataItem, BarChartItem, TableRow } from '../types';

const TICKET_TYPES = ['HK$1180', 'HK$680', 'HK$380', 'VIP Package'];

export const generateInitialKPIs = (): KPIStats => ({
  totalSold: 123456,
  totalGrossHKD: 120670000,
  totalNetHKD: 100450000,
});

export const updateKPIs = (prev: KPIStats): KPIStats => {
  const increment = Math.random() > 0.3 ? Math.floor(Math.random() * 5) : 0;
  if (increment === 0) return prev;
  
  const grossAdd = increment * (500 + Math.random() * 680);
  return {
    totalSold: prev.totalSold + increment,
    totalGrossHKD: prev.totalGrossHKD + grossAdd,
    totalNetHKD: prev.totalNetHKD + (grossAdd * 0.85),
  };
};

export const getPieData = (): ChartDataItem[] => [
  { name: 'HK$1180', value: 35 + Math.random() * 5 },
  { name: 'HK$680', value: 25 + Math.random() * 5 },
  { name: 'HK$380', value: 20 + Math.random() * 5 },
  { name: 'VIP Package', value: 15 },
  { name: 'Other', value: 5 },
];

// 初始化 30 个点 (Last 30 mins)
export const getBarDataInitial = (): BarChartItem[] => {
  const count = 30;
  const data: BarChartItem[] = [];
  const now = new Date();

  for (let i = count - 1; i >= 0; i--) {
    const timeLabel = new Date(now.getTime() - i * 60000);
    const label = `${timeLabel.getHours().toString().padStart(2, '0')}:${timeLabel.getMinutes().toString().padStart(2, '0')}`;

    data.push({
      time: label,
      'HK$1180': Math.floor(100 + Math.random() * 300),
      'HK$680': Math.floor(100 + Math.random() * 200),
      'HK$380': Math.floor(50 + Math.random() * 150),
    });
  }
  return data;
};

// 生成下一个滑动窗口点
export const getNextBarPoint = (currentTime: Date): BarChartItem => {
  const label = `${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}`;
  return {
    time: label,
    'HK$1180': Math.floor(100 + Math.random() * 400),
    'HK$680': Math.floor(100 + Math.random() * 300),
    'HK$380': Math.floor(50 + Math.random() * 200),
  };
};

export const getTableData = (): TableRow[] => {
  return Array.from({ length: 15 }).map((_, i) => ({
    id: `row-${Math.random()}`,
    activityName: i === 0 ? 'xxxx演唱会啦啦啦啦' : 'Sample Event ' + i,
    ticketType: TICKET_TYPES[i % TICKET_TYPES.length],
    dateTime: '2025/01/29 15:00',
    soldCount: Math.floor(200 + Math.random() * 500),
    grossRevenue: Math.floor(50000 + Math.random() * 100000),
    netRevenue: Math.floor(40000 + Math.random() * 85000),
    pendingCount: Math.floor(Math.random() * 50),
  }));
};
