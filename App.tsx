
import React, { useState, useCallback, useEffect, useRef } from 'react';
import DashboardHeader from './components/DashboardHeader';
import Filters from './components/Filters';
import KPICards from './components/KPICards';
import { SalesPieChart, SalesBarChart } from './components/SalesCharts';
import SalesTable from './components/SalesTable';
import * as mockService from './services/mockDataService';
import { FilterState, KPIStats, ChartDataItem, BarChartItem, TableRow } from './types';

const App: React.FC = () => {
  // --- States ---
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [countdown, setCountdown] = useState<number>(60);
  const [isAutoRefresh, setIsAutoRefresh] = useState<boolean>(true);
  
  const [filters, setFilters] = useState<FilterState>({
    activity: 'xxxx演唱会啦啦啦啦啦啦啦',
    date: '2025-01-29',
    time: '15:00',
    ticketType: '',
    startTime: '15:00',
    endTime: '23:59',
    attribute4: '',
    attribute5: '',
    unitType: ''
  });

  const [kpiStats, setKpiStats] = useState<KPIStats>(mockService.generateInitialKPIs());
  const [pieData, setPieData] = useState<ChartDataItem[]>(mockService.getPieData());
  const [barData, setBarData] = useState<BarChartItem[]>(mockService.getBarDataInitial());
  const [tableData, setTableData] = useState<TableRow[]>(mockService.getTableData());

  // 使用 ref 记录模拟时钟，确保手动模拟时时间轴是连续的
  const virtualTimeRef = useRef<Date>(new Date());

  // --- Handlers ---
  const stepForward = useCallback((isAuto: boolean = false) => {
    const now = new Date();
    
    // 如果是手动模拟，我们让虚拟时间往后推1分钟
    // 如果是自动更新，我们使用当前的真实时间
    const targetTime = isAuto ? now : new Date(virtualTimeRef.current.getTime() + 60000);
    virtualTimeRef.current = targetTime;

    setLastUpdated(now);
    setCountdown(60);
    
    // 1. 更新其他业务数据
    setKpiStats(prev => mockService.updateKPIs(prev));
    setPieData(mockService.getPieData());
    setTableData(mockService.getTableData());

    // 2. 滑动窗口逻辑：移除最老的一分钟，加入新的一分钟
    setBarData(prev => {
      const nextPoint = mockService.getNextBarPoint(targetTime);
      return [...prev.slice(1), nextPoint];
    });
  }, []);

  // 重置/应用过滤器时的刷新
  const refreshAll = useCallback(() => {
    stepForward(true);
  }, [stepForward]);

  // --- Timers ---
  useEffect(() => {
    let intervalId: any;
    if (isAutoRefresh) {
      intervalId = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            stepForward(true);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isAutoRefresh, stepForward]);

  const handleFilterChange = (updates: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...updates }));
  };

  const applyFilters = () => {
    console.log("Applying filters:", filters);
    refreshAll(); 
  };

  const resetFilters = () => {
    setFilters({
      activity: '',
      date: '',
      time: '',
      ticketType: '',
      startTime: '',
      endTime: '',
      attribute4: '',
      attribute5: '',
      unitType: ''
    });
  };

  const handleExport = () => {
    alert("Exporting dashboard... PDF generation simulated.");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <DashboardHeader 
        lastUpdated={lastUpdated} 
        onRefresh={refreshAll}
        onExport={handleExport}
      />

      <div className="max-w-[1600px] mx-auto">
        <Filters 
          filters={filters} 
          onFilterChange={handleFilterChange}
          onApply={applyFilters}
          onReset={resetFilters}
        />

        <div className="p-4 md:p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <KPICards stats={kpiStats} />
              <div className="mt-6">
                <SalesBarChart 
                  data={barData} 
                  title="最近30分钟销售趋势 (Every 1 Min Update)"
                />
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <SalesPieChart 
                data={pieData} 
                title="已售票数组成 (Sales Composition)" 
              />
              
              <div className="mt-6 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Live Sync Status</h3>
                  <div className={`w-2 h-2 rounded-full ${isAutoRefresh ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Update Mode</span>
                    <button 
                      onClick={() => setIsAutoRefresh(!isAutoRefresh)}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded transition-colors ${
                        isAutoRefresh ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {isAutoRefresh ? 'AUTO-SYNC ON' : 'AUTO-SYNC OFF'}
                    </button>
                  </div>
                  
                  {isAutoRefresh && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Next Update In</span>
                      <span className="text-blue-600 font-mono font-bold text-sm">{countdown}s</span>
                    </div>
                  )}

                  <div className="pt-4 border-t border-gray-100">
                    <button 
                      onClick={() => stepForward(false)}
                      className="w-full py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-all flex items-center justify-center shadow-lg shadow-blue-100 active:scale-95"
                    >
                      <i className="fa-solid fa-forward-step mr-2"></i>
                      Simulate 1-Min Step
                    </button>
                    <p className="text-[9px] text-gray-400 mt-2 text-center leading-relaxed">
                      Click to force window to slide forward by 1 minute for demonstration.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <SalesTable data={tableData} />
          </div>
        </div>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-6 flex justify-between items-center text-[10px] text-gray-400 z-50">
        <div className="flex items-center space-x-4">
          <span>&copy; 2025 Sliding Window Dashboard System. 1-minute data granularity.</span>
        </div>
        <div className="flex items-center space-x-2">
           <span className={`px-2 py-0.5 rounded font-bold uppercase ${isAutoRefresh ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-400'}`}>
             {isAutoRefresh ? 'Live Monitoring' : 'Paused'}
           </span>
        </div>
      </footer>
    </div>
  );
};

export default App;
