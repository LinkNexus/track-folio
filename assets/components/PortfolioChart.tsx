
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data - would come from API in real app
const data = [
  { month: 'Jan', value: 3500 },
  { month: 'Feb', value: 3000 },
  { month: 'Mar', value: 4800 },
  { month: 'Apr', value: 2900 },
  { month: 'May', value: 2000 },
  { month: 'Jun', value: 2400 },
  { month: 'Jul', value: 3400 },
];

type TimeRange = '1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL';

const PortfolioChart = () => {
  const [selectedRange, setSelectedRange] = useState<TimeRange>('1M');

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Portfolio Performance</CardTitle>
        <div className="flex items-center space-x-1 mt-2">
          {(['1D', '1W', '1M', '3M', '1Y', 'ALL'] as TimeRange[]).map((range) => (
            <Button 
              key={range} 
              variant={selectedRange === range ? "secondary" : "ghost"}
              className="h-8 px-3 text-xs"
              onClick={() => setSelectedRange(range)}
            >
              {range}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="p-0 pt-4">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12 }}
                domain={[0, 'dataMax + 1000']}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff',
                  border: '1px solid #f0f0f0',
                  borderRadius: '4px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#f87171" 
                dot={false}
                activeDot={{ r: 6 }}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioChart;
