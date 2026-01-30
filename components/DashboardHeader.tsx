
import React from 'react';
import { Button, Space, Tag, Typography } from 'antd';
import { ReloadOutlined, FilePdfOutlined, DashboardOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface Props {
  lastUpdated: Date;
  onRefresh: () => void;
  onExport: () => void;
}

const DashboardHeader: React.FC<Props> = ({ lastUpdated, onRefresh, onExport }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm px-6">
      <div className="flex items-center space-x-4">
        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
          <DashboardOutlined style={{ fontSize: '20px' }} />
        </div>
        <div>
          <Title level={4} style={{ margin: 0 }} className="text-gray-800">
            Merchant Sales Analysis
          </Title>
          <Text type="secondary" style={{ fontSize: '11px' }}>Global Real-time Monitoring Suite</Text>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
        <div className="flex items-center bg-gray-50/80 px-4 py-2 rounded-full border border-gray-100">
          <span className="text-[10px] text-gray-400 uppercase font-bold mr-3">Sync Status:</span>
          <Text code className="text-xs">
            {lastUpdated.toLocaleTimeString()}
          </Text>
          <Button 
            type="text" 
            size="small" 
            icon={<ReloadOutlined className="text-blue-500" />} 
            onClick={onRefresh}
            className="ml-2 hover:bg-blue-50"
          />
        </div>
        
        <Space>
          <Button 
            icon={<FilePdfOutlined />} 
            onClick={onExport}
            className="rounded-full shadow-sm hover:border-blue-500 hover:text-blue-500"
          >
            Export PDF
          </Button>
          <Button 
            type="primary" 
            className="rounded-full bg-blue-600 shadow-lg shadow-blue-100"
          >
            Settings
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default DashboardHeader;
