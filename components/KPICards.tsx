
import React from 'react';
import { KPIStats } from '../types';

interface Props {
  stats: KPIStats;
}

const KPICards: React.FC<Props> = ({ stats }) => {
  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `HK$${(val / 1000000).toFixed(2)}M`;
    if (val >= 1000) return `HK$${(val / 1000).toFixed(2)}K`;
    return `HK$${val.toFixed(2)}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-2 opacity-10 text-6xl group-hover:scale-110 transition-transform">
           <i className="fa-solid fa-ticket"></i>
        </div>
        <span className="text-sm font-semibold text-gray-500 mb-2">已售票数 (Total Sold)</span>
        <span className="text-4xl font-extrabold text-blue-900 tracking-tight">
          {stats.totalSold.toLocaleString()}
        </span>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-2 opacity-10 text-6xl group-hover:scale-110 transition-transform">
           <i className="fa-solid fa-money-bill-trend-up"></i>
        </div>
        <span className="text-sm font-semibold text-gray-500 mb-2">总销售额 (Gross Revenue)</span>
        <span className="text-4xl font-extrabold text-blue-900 tracking-tight">
          {formatCurrency(stats.totalGrossHKD)}
        </span>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-2 opacity-10 text-6xl group-hover:scale-110 transition-transform">
           <i className="fa-solid fa-wallet"></i>
        </div>
        <span className="text-sm font-semibold text-gray-500 mb-2">不含优惠券的总销售额 (Net Revenue)</span>
        <span className="text-4xl font-extrabold text-blue-900 tracking-tight">
          {formatCurrency(stats.totalNetHKD)}
        </span>
      </div>
    </div>
  );
};

export default KPICards;
