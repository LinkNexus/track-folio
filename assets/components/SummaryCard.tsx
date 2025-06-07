
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  subtitle?: string;
  className?: string;
}

const SummaryCard = ({ 
  title, 
  value, 
  change, 
  isPositive = true, 
  subtitle,
  className 
}: SummaryCardProps) => {
  return (
    <Card className={cn("border shadow-sm", className)}>
      <CardContent className="p-6">
        <p className="text-sm text-muted-foreground mb-2">{title}</p>
        <div className="flex items-end justify-between">
          <h3 className="text-2xl font-bold">{value}</h3>
          {change && (
            <div 
              className={cn(
                "flex items-center text-sm font-medium", 
                isPositive ? "text-positive" : "text-negative"
              )}
            >
              {isPositive ? (
                <ArrowUp className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDown className="h-3 w-3 mr-1" />
              )}
              {change}
            </div>
          )}
        </div>
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
