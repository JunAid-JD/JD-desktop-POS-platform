'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Users, Mail, Phone, Building, Calendar, MoreHorizontal } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  businessType: string;
  subscriptionStatus: 'active' | 'inactive' | 'pending';
  joinDate: string;
  lastLogin: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@abcpharmacy.com',
    phone: '+1234567890',
    businessName: 'ABC Pharmacy',
    businessType: 'pharmacy',
    subscriptionStatus: 'active',
    joinDate: '2024-01-15',
    lastLogin: '2024-01-20'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@xyzgrocery.com',
    phone: '+1234567891',
    businessName: 'XYZ Grocery',
    businessType: 'grocery',
    subscriptionStatus: 'active',
    joinDate: '2024-01-10',
    lastLogin: '2024-01-19'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@fashionstore.com',
    phone: '+1234567892',
    businessName: 'Fashion Store',
    businessType: 'clothing',
    subscriptionStatus: 'pending',
    joinDate: '2024-01-18',
    lastLogin: '2024-01-18'
  }
];

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.businessName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.subscriptionStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'inactive': return <Badge variant="secondary">Inactive</Badge>;
      case 'pending': return <Badge variant="outline">Pending</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getBusinessIcon = (type: string) => {
    const icons = {
      pharmacy: '💊',
      grocery: '🛒',
      clothing: '👕',
      electronics: '📱',
      restaurant: '🍽️',
      stationery: '✏️',
      mobile: '📱'
    };
    return icons[type as keyof typeof icons] || '🏪';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-gray-600">Manage all platform users and their subscriptions</p>
        </div>
        <Button>
          <Users className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold">{users.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-2xl font-bold">{users.filter(u => u.subscriptionStatus === 'active').length}</p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Users</p>
                <p className="text-2xl font-bold">{users.filter(u => u.subscriptionStatus === 'pending').length}</p>
              </div>
              <Users className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">New This Month</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, email, or business..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
          <CardDescription>Manage user accounts and subscriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">User</th>
                  <th className="text-left p-4">Business</th>
                  <th className="text-left p-4">Contact</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Join Date</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{getBusinessIcon(user.businessType)}</span>
                        <div>
                          <div className="font-medium">{user.businessName}</div>
                          <div className="text-sm text-gray-500 capitalize">{user.businessType}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>{user.phone}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      {getStatusBadge(user.subscriptionStatus)}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{user.joinDate}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}