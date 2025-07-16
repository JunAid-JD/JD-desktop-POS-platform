'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  CreditCard, 
  FileText, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  XCircle,
  DollarSign,
  Package,
  Shield
} from 'lucide-react';

export default function AdminDashboard() {
  const [stats] = useState({
    totalUsers: 1247,
    activeSubscriptions: 892,
    pendingApprovals: 23,
    fbrUsers: 156,
    monthlyRevenue: 45670,
    totalModules: 7
  });

  const recentActivities = [
    { action: 'New subscription request from ABC Pharmacy', time: '2 minutes ago', type: 'subscription' },
    { action: 'FBR integration approved for XYZ Grocery', time: '15 minutes ago', type: 'fbr' },
    { action: 'Payment received from Fashion Store', time: '1 hour ago', type: 'payment' },
    { action: 'New user registration: Electronics Hub', time: '2 hours ago', type: 'user' },
    { action: 'Module update: Restaurant POS v2.1', time: '4 hours ago', type: 'system' }
  ];

  const moduleUsage = [
    { name: 'Pharmacy', users: 234, percentage: 26 },
    { name: 'Grocery', users: 189, percentage: 21 },
    { name: 'Clothing', users: 156, percentage: 17 },
    { name: 'Electronics', users: 134, percentage: 15 },
    { name: 'Restaurant', users: 98, percentage: 11 },
    { name: 'Stationery', users: 67, percentage: 8 },
    { name: 'Mobile/Accessories', users: 45, percentage: 5 }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users, subscriptions, and platform analytics</p>
        </div>
        <div className="flex space-x-4">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button>
            <Shield className="mr-2 h-4 w-4" />
            System Settings
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                <p className="text-sm text-green-600">+12% from last month</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Subscriptions</p>
                <p className="text-2xl font-bold">{stats.activeSubscriptions}</p>
                <p className="text-sm text-green-600">+8% from last month</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Approvals</p>
                <p className="text-2xl font-bold">{stats.pendingApprovals}</p>
                <p className="text-sm text-yellow-600">Requires attention</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">FBR Users</p>
                <p className="text-2xl font-bold">{stats.fbrUsers}</p>
                <p className="text-sm text-blue-600">Premium subscribers</p>
              </div>
              <FileText className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold">${stats.monthlyRevenue.toLocaleString()}</p>
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
                <p className="text-sm text-gray-600">POS Modules</p>
                <p className="text-2xl font-bold">{stats.totalModules}</p>
                <p className="text-sm text-gray-600">Business categories</p>
              </div>
              <Package className="h-8 w-8 text-indigo-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest platform activities and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'subscription' ? 'bg-blue-500' :
                    activity.type === 'fbr' ? 'bg-green-500' :
                    activity.type === 'payment' ? 'bg-purple-500' :
                    activity.type === 'user' ? 'bg-orange-500' :
                    'bg-gray-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Module Usage */}
        <Card>
          <CardHeader>
            <CardTitle>POS Module Usage</CardTitle>
            <CardDescription>Distribution of users across business modules</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {moduleUsage.map((module, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{module.name}</span>
                    <span className="text-sm text-gray-600">{module.users} users</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${module.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Users className="h-6 w-6 mb-2" />
              <span>Manage Users</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <CreditCard className="h-6 w-6 mb-2" />
              <span>Subscriptions</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <FileText className="h-6 w-6 mb-2" />
              <span>FBR Users</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <TrendingUp className="h-6 w-6 mb-2" />
              <span>Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}