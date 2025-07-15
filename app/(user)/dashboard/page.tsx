'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  Package, 
  TrendingUp, 
  Users,
  Calendar,
  DollarSign,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Today\'s Sales',
      value: '$1,234',
      change: '+12%',
      icon: <DollarSign className="h-6 w-6" />,
      color: 'text-green-600',
    },
    {
      title: 'Total Items',
      value: '456',
      change: '+5%',
      icon: <Package className="h-6 w-6" />,
      color: 'text-blue-600',
    },
    {
      title: 'Customers',
      value: '89',
      change: '+8%',
      icon: <Users className="h-6 w-6" />,
      color: 'text-purple-600',
    },
    {
      title: 'Orders',
      value: '23',
      change: '+15%',
      icon: <ShoppingCart className="h-6 w-6" />,
      color: 'text-orange-600',
    },
  ];

  const recentActivities = [
    { action: 'New sale recorded', time: '2 minutes ago', status: 'success' },
    { action: 'Low stock alert: Medicine XYZ', time: '5 minutes ago', status: 'warning' },
    { action: 'Customer payment received', time: '10 minutes ago', status: 'success' },
    { action: 'Inventory updated', time: '1 hour ago', status: 'info' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.businessName || 'User'}!</p>
        </div>
        <div className="flex space-x-4">
          <Badge variant="outline" className="bg-green-50 text-green-700">
            <CheckCircle className="mr-2 h-4 w-4" />
            Active Subscription
          </Badge>
          <Button asChild>
            <Link href="/pos">Open POS</Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                </div>
                <div className={`${stat.color} bg-gray-50 p-3 rounded-full`}>
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your business</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'success' ? 'bg-green-500' :
                    activity.status === 'warning' ? 'bg-yellow-500' :
                    'bg-blue-500'
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

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/pos">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Start New Sale
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/inventory">
                <Package className="mr-2 h-4 w-4" />
                Manage Inventory
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/reports">
                <TrendingUp className="mr-2 h-4 w-4" />
                View Reports
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/settings">
                <AlertCircle className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Business Module Info */}
      <Card>
        <CardHeader>
          <CardTitle>Your Business Module</CardTitle>
          <CardDescription>Currently configured for {user?.businessType || 'your business type'}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold capitalize">{user?.businessType || 'General'} POS</h3>
                <p className="text-sm text-gray-600">
                  Optimized for your business needs
                </p>
              </div>
            </div>
            <Button variant="outline" asChild>
              <Link href="/settings">Customize</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}