
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ProfileSettings = () => {
  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Profile Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input 
            id="email" 
            placeholder="john.doe@example.com" 
            defaultValue="john.doe@example.com" 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="current-password">Current Password</Label>
          <Input 
            id="current-password" 
            type="password" 
            placeholder="••••••••••••" 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="new-password">New Password</Label>
          <Input 
            id="new-password" 
            type="password" 
            placeholder="••••••••••••" 
          />
        </div>
        
        <Button className="mt-4 w-full md:w-auto">
          Update Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileSettings;
