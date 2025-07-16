'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Package, 
  Calendar,
  Download,
  BarChart3
} from 'lucide-react';

export default function AdminAnalytics() {
  const moduleStats = [
    { name: 'Pharmacy', users: 234, revenue: 15680, growth: '+12%' },
    { name: 'Grocery', users: 189, revenue: 12450, growth: '+8%' },
    { name: 'Clothing', users: 156, revenue: 9870, growth: '+15%' },
    { name: 'Electronics', users: 134, revenue: 8900, growth: '+5%' },
    { name: 'Restaurant', users: 98, revenue: 6540, growth: '+18%' },
    { name: 'Stationery', users: 67, revenue: 4320, growth: '+10%' },
    { name: 'Mobile/Accessories', users: 45, revenue: 3240, growth: '+22%' }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 45000 },
    { month: 'Feb', revenue: 52000 },
    { month: 'Mar', revenue: 48000 },
    { month: 'Apr', revenue: 61000 },
    { month: 'May', revenue: 55000 },
    { month: 'Jun', revenue: 67000 }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-gray-600">Platform performance and business insights</p>
        </div>
        <div className="flex space-x-4">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button>
            <BarChart3 className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">$67,890</p>
                <p className="text-sm text-green-600">+15% from last month</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-2xl font-bold">923</p>
                <p className="text-sm text-blue-600">+8% from last month</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Transactions</p>
                <p className="text-2xl font-bold">12,456</p>
                <p className="text-sm text-purple-600">+22% from last month</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Order Value</p>
                <p className="text-2xl font-bold">$45.67</p>
                <p className="text-sm text-orange-600">+5% from last month</p>
              </div>
              <Package className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Module Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Module Performance</CardTitle>
          <CardDescription>Revenue and user statistics by business module</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Module</th>
                  <th className="text-left p-4">Users</th>
                  <th className="text-left p-4">Revenue</th>
                  <th className="text-left p-4">Growth</th>
                  <th className="text-left p-4">Performance</th>
                </tr>
              </thead>
              <tbody>
                {moduleStats.map((module, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="font-medium">{module.name}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span>{module.users}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium">${module.revenue.toLocaleString()}</div>
                    </td>
                    <td className="p-4">
                      <Badge className="bg-green-100 text-green-800">{module.growth}</Badge>
                    </td>
                    <td className="p-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(module.users / 250) * 100}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
          <CardDescription>Monthly revenue performance over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {revenueData.map((data, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <span className="font-medium">{data.month} 2024</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-bold text-lg">${data.revenue.toLocaleString()}</span>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${(data.revenue / 70000) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}