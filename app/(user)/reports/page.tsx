'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Package, 
  Users, 
  Calendar,
  Download,
  Filter
} from 'lucide-react';

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState('7days');

  const salesData = [
    { period: 'Today', sales: 1234, change: '+12%', trend: 'up' },
    { period: 'Yesterday', sales: 1098, change: '-5%', trend: 'down' },
    { period: 'This Week', sales: 8567, change: '+18%', trend: 'up' },
    { period: 'Last Week', sales: 7234, change: '+8%', trend: 'up' },
    { period: 'This Month', sales: 34567, change: '+25%', trend: 'up' },
    { period: 'Last Month', sales: 27890, change: '+15%', trend: 'up' },
  ];

  const topProducts = [
    { name: 'Paracetamol 500mg', sales: 156, revenue: 780 },
    { name: 'Vitamin D3', sales: 134, revenue: 670 },
    { name: 'Cough Syrup', sales: 89, revenue: 445 },
    { name: 'Antiseptic Cream', sales: 76, revenue: 380 },
    { name: 'Band-Aid Pack', sales: 65, revenue: 325 },
  ];

  const inventoryAlerts = [
    { item: 'Aspirin 75mg', stock: 15, status: 'low' },
    { item: 'Insulin Pen', stock: 3, status: 'critical' },
    { item: 'Thermometer', stock: 8, status: 'low' },
    { item: 'Face Masks', stock: 25, status: 'ok' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-gray-600">Track your business performance and insights</p>
        </div>
        <div className="flex space-x-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Sales Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {salesData.slice(0, 3).map((item, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{item.period}</p>
                      <p className="text-2xl font-bold">${item.sales}</p>
                      <div className="flex items-center space-x-1 text-sm">
                        {item.trend === 'up' ? (
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500" />
                        )}
                        <span className={item.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                          {item.change}
                        </span>
                      </div>
                    </div>
                    <DollarSign className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
              <CardDescription>Best performing items in your inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-blue-600">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.sales} units sold</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${product.revenue}</p>
                      <p className="text-sm text-gray-600">Revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="space-y-6">
          {/* Sales Details */}
          <Card>
            <CardHeader>
              <CardTitle>Sales Performance</CardTitle>
              <CardDescription>Detailed sales analysis for the selected period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {salesData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{item.period}</p>
                      <p className="text-2xl font-bold">${item.sales}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {item.trend === 'up' ? (
                        <TrendingUp className="h-5 w-5 text-green-500" />
                      ) : (
                        <TrendingDown className="h-5 w-5 text-red-500" />
                      )}
                      <span className={`font-semibold ${item.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                        {item.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-6">
          {/* Inventory Status */}
          <Card>
            <CardHeader>
              <CardTitle>Inventory Status</CardTitle>
              <CardDescription>Current stock levels and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inventoryAlerts.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Package className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">{item.item}</p>
                        <p className="text-sm text-gray-600">{item.stock} units remaining</p>
                      </div>
                    </div>
                    <Badge variant={
                      item.status === 'critical' ? 'destructive' :
                      item.status === 'low' ? 'secondary' : 'default'
                    }>
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          {/* Customer Analytics */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Analytics</CardTitle>
              <CardDescription>Customer behavior and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-blue-50 rounded-lg">
                  <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <p className="text-2xl font-bold">1,234</p>
                  <p className="text-sm text-gray-600">Total Customers</p>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <p className="text-2xl font-bold">89</p>
                  <p className="text-sm text-gray-600">New This Month</p>
                </div>
                <div className="text-center p-6 bg-purple-50 rounded-lg">
                  <DollarSign className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <p className="text-2xl font-bold">$45</p>
                  <p className="text-sm text-gray-600">Average Order</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}