
import React from 'react';
import { FilterState } from '../types';
import { Select, Input, DatePicker, TimePicker, Button, Space, Form } from 'antd';
import { SearchOutlined, FilterOutlined, UndoOutlined, InfoCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

interface Props {
  filters: FilterState;
  onFilterChange: (updates: Partial<FilterState>) => void;
  onApply: () => void;
  onReset: () => void;
}

const { Option } = Select;
const { RangePicker } = TimePicker;

const Filters: React.FC<Props> = ({ filters, onFilterChange, onApply, onReset }) => {
  return (
    <div className="p-6 bg-white border-b border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-y-6 gap-x-8 items-end">
        {/* SKU / Activity Selector */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Activity Name</label>
          <Input 
            size="large"
            placeholder="Search activity..." 
            prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />} 
            value={filters.activity}
            onChange={(e) => onFilterChange({ activity: e.target.value })}
            className="rounded-lg"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Target Date</label>
          <DatePicker 
            size="large"
            className="w-full rounded-lg"
            value={filters.date ? dayjs(filters.date) : null}
            onChange={(date) => onFilterChange({ date: date ? date.format('YYYY-MM-DD') : '' })}
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Target Time</label>
          <TimePicker 
            size="large"
            format="HH:mm"
            className="w-full rounded-lg"
            value={filters.time ? dayjs(filters.time, 'HH:mm') : null}
            onChange={(time) => onFilterChange({ time: time ? time.format('HH:mm') : '' })}
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Ticket Type</label>
          <Select 
            size="large"
            className="w-full rounded-lg" 
            placeholder="All Types"
            value={filters.ticketType || undefined}
            onChange={(val) => onFilterChange({ ticketType: val })}
            allowClear
          >
            <Option value="HK$1180">HK$1180</Option>
            <Option value="HK$680">HK$680</Option>
            <Option value="HK$380">HK$380</Option>
            <Option value="VIP Package">VIP Package</Option>
          </Select>
        </div>

        {/* Booking Time Range */}
        <div className="col-span-1 md:col-span-1">
          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Booking Period</label>
          <RangePicker 
            size="large"
            format="HH:mm"
            className="w-full rounded-lg"
            value={[
              filters.startTime ? dayjs(filters.startTime, 'HH:mm') : null,
              filters.endTime ? dayjs(filters.endTime, 'HH:mm') : null
            ]}
            onChange={(values) => {
              if (values) {
                onFilterChange({
                  startTime: values[0]?.format('HH:mm') || '',
                  endTime: values[1]?.format('HH:mm') || ''
                });
              } else {
                onFilterChange({ startTime: '', endTime: '' });
              }
            }}
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Attribute 4</label>
          <Select size="large" className="w-full rounded-lg" defaultValue="All">
            <Option value="All">All Categories</Option>
          </Select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Attribute 5</label>
          <Select size="large" className="w-full rounded-lg" defaultValue="All">
            <Option value="All">All Regions</Option>
          </Select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Unit Type</label>
          <Select size="large" className="w-full rounded-lg" defaultValue="All">
            <Option value="All">Default Unit</Option>
          </Select>
        </div>

        <div className="flex space-x-2">
          <Button 
            type="primary" 
            size="large"
            icon={<FilterOutlined />} 
            onClick={onApply}
            className="flex-1 rounded-lg h-[40px] font-semibold bg-blue-600 shadow-lg shadow-blue-100"
          >
            Apply
          </Button>
          <Button 
            size="large"
            icon={<UndoOutlined />} 
            onClick={onReset}
            className="rounded-lg h-[40px] text-gray-500"
          >
            Reset
          </Button>
        </div>
      </div>
      
      <div className="mt-6 p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-start">
        <InfoCircleOutlined className="text-blue-500 mr-2 mt-0.5" />
        <span className="text-xs text-blue-700 leading-relaxed">
          The filters above synchronize data across all modules. <strong>Activity Name</strong> is essential for refined analysis. 
          Real-time updates are reflected based on the 1-minute sliding window logic.
        </span>
      </div>
    </div>
  );
};

export default Filters;
