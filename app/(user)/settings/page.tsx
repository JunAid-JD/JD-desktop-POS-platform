'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Store, 
  Palette, 
  Bell, 
  Shield, 
  CreditCard, 
  FileText,
  Save
} from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuth();
  const [businessInfo, setBusinessInfo] = useState({
    businessName: user?.businessName || '',
    ownerName: user?.ownerName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    gstNumber: '',
    businessType: user?.businessType || '',
  });

  const [notifications, setNotifications] = useState({
    lowStock: true,
    dailyReports: true,
    customerUpdates: false,
    systemAlerts: true,
  });

  const [theme, setTheme] = useState({
    primaryColor: '#3b82f6',
    secondaryColor: '#10b981',
    accentColor: '#f59e0b',
  });

  const handleSave = () => {
    // Handle save logic here
    console.log('Settings saved');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-gray-600">Manage your business preferences and configuration</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="business" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="customization">Theme</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="business" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Store className="mr-2 h-5 w-5" />
                Business Information
              </CardTitle>
              <CardDescription>
                Update your business details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    value={businessInfo.businessName}
                    onChange={(e) => setBusinessInfo({...businessInfo, businessName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ownerName">Owner Name</Label>
                  <Input
                    id="ownerName"
                    value={businessInfo.ownerName}
                    onChange={(e) => setBusinessInfo({...businessInfo, ownerName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={businessInfo.email}
                    onChange={(e) => setBusinessInfo({...businessInfo, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={businessInfo.phone}
                    onChange={(e) => setBusinessInfo({...businessInfo, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type</Label>
                  <Select value={businessInfo.businessType} onValueChange={(value) => setBusinessInfo({...businessInfo, businessType: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pharmacy">Pharmacy</SelectItem>
                      <SelectItem value="grocery">Grocery Store</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="restaurant">Restaurant</SelectItem>
                      <SelectItem value="stationery">Stationery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gstNumber">GST Number</Label>
                  <Input
                    id="gstNumber"
                    value={businessInfo.gstNumber}
                    onChange={(e) => setBusinessInfo({...businessInfo, gstNumber: e.target.value})}
                    placeholder="Optional"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Business Address</Label>
                <Input
                  id="address"
                  value={businessInfo.address}
                  onChange={(e) => setBusinessInfo({...businessInfo, address: e.target.value})}
                  placeholder="Complete business address"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="mr-2 h-5 w-5" />
                Theme Customization
              </CardTitle>
              <CardDescription>
                Customize the appearance of your POS system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Primary Color</Label>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-10 h-10 rounded-lg border"
                      style={{ backgroundColor: theme.primaryColor }}
                    />
                    <Input
                      type="color"
                      value={theme.primaryColor}
                      onChange={(e) => setTheme({...theme, primaryColor: e.target.value})}
                      className="w-20"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Secondary Color</Label>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-10 h-10 rounded-lg border"
                      style={{ backgroundColor: theme.secondaryColor }}
                    />
                    <Input
                      type="color"
                      value={theme.secondaryColor}
                      onChange={(e) => setTheme({...theme, secondaryColor: e.target.value})}
                      className="w-20"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Accent Color</Label>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-10 h-10 rounded-lg border"
                      style={{ backgroundColor: theme.accentColor }}
                    />
                    <Input
                      type="color"
                      value={theme.accentColor}
                      onChange={(e) => setTheme({...theme, accentColor: e.target.value})}
                      className="w-20"
                    />
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-2">Preview</h4>
                <div className="flex space-x-2">
                  <div 
                    className="px-4 py-2 rounded text-white font-medium"
                    style={{ backgroundColor: theme.primaryColor }}
                  >
                    Primary Button
                  </div>
                  <div 
                    className="px-4 py-2 rounded text-white font-medium"
                    style={{ backgroundColor: theme.secondaryColor }}
                  >
                    Secondary Button
                  </div>
                  <div 
                    className="px-4 py-2 rounded text-white font-medium"
                    style={{ backgroundColor: theme.accentColor }}
                  >
                    Accent Button
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Choose when and how you want to be notified
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Low Stock Alerts</p>
                    <p className="text-sm text-gray-600">Get notified when items are running low</p>
                  </div>
                  <Switch
                    checked={notifications.lowStock}
                    onCheckedChange={(checked) => setNotifications({...notifications, lowStock: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Daily Reports</p>
                    <p className="text-sm text-gray-600">Receive daily sales and performance reports</p>
                  </div>
                  <Switch
                    checked={notifications.dailyReports}
                    onCheckedChange={(checked) => setNotifications({...notifications, dailyReports: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Customer Updates</p>
                    <p className="text-sm text-gray-600">Notifications about customer activities</p>
                  </div>
                  <Switch
                    checked={notifications.customerUpdates}
                    onCheckedChange={(checked) => setNotifications({...notifications, customerUpdates: checked})}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">System Alerts</p>
                    <p className="text-sm text-gray-600">Important system notifications and updates</p>
                  </div>
                  <Switch
                    checked={notifications.systemAlerts}
                    onCheckedChange={(checked) => setNotifications({...notifications, systemAlerts: checked})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Manage your account security and access
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Change Password</p>
                    <p className="text-sm text-gray-600">Update your account password</p>
                  </div>
                  <Button variant="outline">Change</Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-600">Add an extra layer of security</p>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Login History</p>
                    <p className="text-sm text-gray-600">View recent login activities</p>
                  </div>
                  <Button variant="outline">View</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Billing & Subscription
              </CardTitle>
              <CardDescription>
                Manage your subscription and billing information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-green-800">Current Plan: Basic POS</p>
                    <p className="text-sm text-green-600">Active until December 31, 2024</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Upgrade to Pro</p>
                    <p className="text-sm text-gray-600">Get advanced features and FBR integration</p>
                  </div>
                  <Button>Upgrade</Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Billing History</p>
                    <p className="text-sm text-gray-600">View your payment history</p>
                  </div>
                  <Button variant="outline">View</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Integrations
              </CardTitle>
              <CardDescription>
                Connect with external services and tools
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">FBR Integration</p>
                    <p className="text-sm text-gray-600">Connect with FBR for automated tax reporting</p>
                  </div>
                  <Button>Connect</Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">WhatsApp Business</p>
                    <p className="text-sm text-gray-600">Send receipts and notifications via WhatsApp</p>
                  </div>
                  <Button variant="outline">Coming Soon</Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Accounting Software</p>
                    <p className="text-sm text-gray-600">Sync with QuickBooks, Xero, and more</p>
                  </div>
                  <Button variant="outline">Coming Soon</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}