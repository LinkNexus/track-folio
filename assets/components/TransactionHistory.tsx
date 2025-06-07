
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

// Sample data - would come from API in real app
const transactions = [
  { id: 1, date: '2023-12-01', asset: 'Tesla Stock', amount: '$1,200.00', change: '+2.5%', status: 'Completed', isPositive: true },
  { id: 2, date: '2023-11-30', asset: 'Bitcoin', amount: '$800.00', change: '-1.2%', status: 'Completed', isPositive: false },
  { id: 3, date: '2023-11-29', asset: 'US Bonds', amount: '$5,000.00', change: '+0.5%', status: 'Completed', isPositive: true },
  { id: 4, date: '2023-11-28', asset: 'Apple Stock', amount: '$2,300.00', change: '+3.1%', status: 'Completed', isPositive: true },
  { id: 5, date: '2023-11-27', asset: 'ETF Fund', amount: '$1,500.00', change: '-0.8%', status: 'Completed', isPositive: false },
];

const TransactionHistory = () => {
  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Transaction History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Date</TableHead>
              <TableHead>Asset</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Change</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell className="font-medium">{tx.date}</TableCell>
                <TableCell>{tx.asset}</TableCell>
                <TableCell className="text-right">{tx.amount}</TableCell>
                <TableCell className="text-right">
                  <div 
                    className={cn(
                      "flex items-center justify-end text-sm font-medium", 
                      tx.isPositive ? "text-positive" : "text-negative"
                    )}
                  >
                    {tx.isPositive ? (
                      <ArrowUp className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDown className="h-3 w-3 mr-1" />
                    )}
                    {tx.change}
                  </div>
                </TableCell>
                <TableCell className="text-right">{tx.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;
