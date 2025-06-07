
import React from 'react';
import { settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="h-16 px-4 border-b flex items-center justify-between bg-white">
      <div className="font-semibold text-lg">FinanceView</div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm">
          <settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </div>
    </header>
  );
};

export default Header;
