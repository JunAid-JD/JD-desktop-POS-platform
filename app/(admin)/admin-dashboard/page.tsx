'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  CreditCard, 
  FileText, 
  TrendingUp,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      change: '+12%',
      icon: <Users className="h-6 w-6" />,
      color: 'text-blue-600',
    },
    {
      title: 'Active Subscriptions',
      value: '987',
      change: '+8%',
      icon: <CheckCircle className="h-6 w-6" />,
      color: 'text-green-600',
    },
    {
      title: 'Pending Approvals',
      value: '45',
      change: '+3%',
      icon: <Clock className="h-6 w-6" />,
      color: 'text-yellow-600',
    },
    {
      title: 'Monthly Revenue',
      value: '$45,678',
      change: '+15%',
      icon: <DollarSign className="h-6 w-6" />,
      color: 'text-green-600',
    },
  ];

  const recentSubscriptions = [
    { id: 1, user: 'John Doe', business: 'ABC Pharmacy', type: 'Basic', status: 'pending', date: '2024-01-15' },
    { id: 2, user: 'Jane Smith', business: 'XYZ Grocery', type: 'Pro + FBR', status: 'approved', date: '2024-01-14' },
    { id: 3, user: 'Mike Johnson', business: 'Fashion Store', type: 'Basic', status: 'pending', date: '2024-01-13' },
    { id: 4, user: 'Sarah Wilson', business: 'Tech Shop', type: 'Pro + FBR', status: 'approved', date: '2024-01-12' },
  ];

  const fbrUsers = [
    { id: 1, business: 'ABC Pharmacy', gstNumber: 'GST123456789', status: 'active', lastSync: '2024-01-15 10:30' },
    { id: 2, business: 'XYZ Grocery', gstNumber: 'GST987654321', status: 'active', lastSync: '2024-01-15 09:15' },
    { id: 3, business: 'Fashion Store', gstNumber: 'GST456789123', status: 'pending', lastSync: 'Never' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users, subscriptions, and system overview</p>
        </div>
        <div className="flex space-x-4">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button>
            <TrendingUp className="mr-2 h-4 w-4" />
            View Analytics
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Subscription Requests */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Subscription Requests</CardTitle>
            <CardDescription>Latest subscription requests requiring review</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSubscriptions.map((sub) => (
                <div key={sub.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{sub.user}</p>
                    <p className="text-sm text-gray-600">{sub.business}</p>
                    <p className="text-xs text-gray-500">Type: {sub.type}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={sub.status === 'approved' ? 'default' : 'secondary'}>
                      {sub.status}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">{sub.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FBR Integration Status */}
        <Card>
          <CardHeader>
            <CardTitle>FBR Integration Status</CardTitle>
            <CardDescription>Users with FBR invoice integration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {fbrUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{user.business}</p>
                    <p className="text-sm text-gray-600">{user.gstNumber}</p>
                    <p className="text-xs text-gray-500">Last sync: {user.lastSync}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                      {user.status}
                    </Badge>
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
          <CardDescription>Frequently used admin functions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <Users className="h-6 w-6 mb-2" />
              <span>Manage Users</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <CreditCard className="h-6 w-6 mb-2" />
              <span>Process Payments</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <FileText className="h-6 w-6 mb-2" />
              <span>Enable FBR</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
              <TrendingUp className="h-6 w-6 mb-2" />
              <span>View Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}