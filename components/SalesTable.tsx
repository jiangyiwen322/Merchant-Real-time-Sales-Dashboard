
import React from 'react';
import { TableRow } from '../types';
import { Table, Tag, Typography, Select, Button, Space } from 'antd';
import type { TableColumnsType } from 'antd';

const { Text } = Typography;

interface Props {
  data: TableRow[];
}

const SalesTable: React.FC<Props> = ({ data }) => {
  const columns: TableColumnsType<TableRow> = [
    {
      title: 'Activity Name (活动名称)',
      dataIndex: 'activityName',
      key: 'activityName',
      fixed: 'left',
      width: 200,
      render: (text) => <Text strong className="text-gray-800">{text}</Text>,
    },
    {
      title: 'Ticket Type',
      dataIndex: 'ticketType',
      key: 'ticketType',
      width: 120,
      render: (type) => <Tag color="blue">{type}</Tag>,
    },
    {
      title: 'Date & Time',
      dataIndex: 'dateTime',
      key: 'dateTime',
      width: 180,
    },
    {
      title: 'Sold Count',
      dataIndex: 'soldCount',
      key: 'soldCount',
      align: 'right',
      sorter: (a, b) => a.soldCount - b.soldCount,
      render: (val) => val.toLocaleString(),
    },
    {
      title: 'Gross Revenue',
      dataIndex: 'grossRevenue',
      key: 'grossRevenue',
      align: 'right',
      render: (val) => `HK$${val.toLocaleString()}`,
    },
    {
      title: 'Net Revenue',
      dataIndex: 'netRevenue',
      key: 'netRevenue',
      align: 'right',
      render: (val) => `HK$${val.toLocaleString()}`,
    },
    {
      title: 'Pending',
      dataIndex: 'pendingCount',
      key: 'pendingCount',
      align: 'right',
      render: (val) => <span className="font-mono text-orange-500">{val}</span>,
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <div>
          <h3 className="text-sm font-bold text-gray-700">Sales Summary Detail</h3>
          <p className="text-[10px] text-gray-400 uppercase tracking-tight">Granular data view per SKU</p>
        </div>
        <Space>
          <Select 
            defaultValue="aggregate" 
            size="small" 
            className="w-48"
            options={[
              { value: 'aggregate', label: 'By Ticket Type / Time' },
              { value: 'plain', label: 'Flat View' }
            ]}
          />
          <Button type="primary" size="small" ghost>Configure Pivot</Button>
        </Space>
      </div>
      
      <div className="px-4">
      <Table 
        columns={columns} 
        dataSource={data} 
        rowKey="id" 
        size="small"
        pagination={{ 
          pageSize: 10,
          showSizeChanger: false,
          className: "px-4"
        }}
        scroll={{ x: 1000 }}
        className="custom-antd-table"
      />
      </div>
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-[10px] text-gray-400">
        <span>Displaying latest {data.length} records. Refresh for live updates.</span>
        <span>Version 2.1.0</span>
      </div>
    </div>
  );
};

export default SalesTable;
