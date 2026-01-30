
export interface FilterState {
  activity: string;
  date: string;
  time: string;
  ticketType: string;
  startTime: string;
  endTime: string;
  attribute4: string;
  attribute5: string;
  unitType: string;
}

export interface KPIStats {
  totalSold: number;
  totalGrossHKD: number;
  totalNetHKD: number;
}

export interface ChartDataItem {
  name: string;
  value: number;
}

export interface BarChartItem {
  time: string;
  [key: string]: number | string;
}

export interface TableRow {
  id: string;
  activityName: string;
  ticketType: string;
  dateTime: string;
  soldCount: number;
  grossRevenue: number;
  netRevenue: number;
  pendingCount: number;
}
