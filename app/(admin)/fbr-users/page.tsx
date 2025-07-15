'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, FileText, CheckCircle, XCircle, Clock, Settings, AlertCircle, FolderSync as Sync } from 'lucide-react';

interface FBRUser {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  gstNumber: string;
  businessType: string;
  fbrStatus: 'active' | 'inactive' | 'pending' | 'suspended';
  lastSync: string;
  totalInvoices: number;
  monthlyInvoices: number;
  registrationDate: string;
}

const mockFBRUsers: FBRUser[] = [
  {
    id: '1',
    businessName: 'ABC Pharmacy',
    ownerName: 'John Doe',
    email: 'john@abc-pharmacy.com',
    phone: '+1234567890',
    gstNumber: 'GST123456789',
    businessType: 'pharmacy',
    fbrStatus: 'active',
    lastSync: '2024-01-15 14:30:00',
    totalInvoices: 1250,
    monthlyInvoices: 89,
    registrationDate: '2023-06-15'
  },
  {
    id: '2',
    businessName: 'XYZ Grocery',
    ownerName: 'Jane Smith',
    email: 'jane@xyz-grocery.com',
    phone: '+1234567891',
    gstNumber: 'GST987654321',
    businessType: 'grocery',
    fbrStatus: 'active',
    lastSync: '2024-01-15 13:45:00',
    totalInvoices: 2340,
    monthlyInvoices: 156,
    registrationDate: '2023-08-22'
  },
  {
    id: '3',
    businessName: 'Fashion Store',
    ownerName: 'Mike Johnson',
    email: 'mike@fashionstore.com',
    phone: '+1234567892',
    gstNumber: 'GST456789123',
    businessType: 'clothing',
    fbrStatus: 'pending',
    lastSync: 'Never',
    totalInvoices: 0,
    monthlyInvoices: 0,
    registrationDate: '2024-01-10'
  },
  {
    id: '4',
    businessName: 'Tech Solutions',
    ownerName: 'Sarah Wilson',
    email: 'sarah@techsolutions.com',
    phone: '+1234567893',
    gstNumber: 'GST789123456',
    businessType: 'electronics',
    fbrStatus: 'suspended',
    lastSync: '2024-01-10 09:15:00',
    totalInvoices: 845,
    monthlyInvoices: 23,
    registrationDate: '2023-11-05'
  }
];

export default function AdminFBRUsers() {
  const [fbrUsers, setFBRUsers] = useState<FBRUser[]>(mockFBRUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<FBRUser | null>(null);

  const filteredUsers = fbrUsers.filter(user => {
    const matchesSearch = user.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.gstNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.fbrStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (userId: string, newStatus: FBRUser['fbrStatus']) => {
    setFBRUsers(fbrUsers.map(user =>
      user.id === userId ? { ...user, fbrStatus: newStatus } : user
    ));
  };

  const handleSyncNow = (userId: string) => {
    setFBRUsers(fbrUsers.map(user =>
      user.id === userId ? { ...user, lastSync: new Date().toISOString() } : user
    ));
  };

  const getStatusBadge = (status: FBRUser['fbrStatus']) => {
    switch (status) {
      case 'active': return <Badge className="bg-green-100 text-green-800"><CheckCircle className="mr-1 h-3 w-3" />Active</Badge>;
      case 'inactive': return <Badge variant="secondary"><XCircle className="mr-1 h-3 w-3" />Inactive</Badge>;
      case 'pending': return <Badge variant="outline"><Clock className="mr-1 h-3 w-3" />Pending</Badge>;
      case 'suspended': return <Badge variant="destructive"><AlertCircle className="mr-1 h-3 w-3" />Suspended</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getBusinessTypeIcon = (type: string) => {
    const icons = {
      pharmacy: '💊',
      grocery: '🛒',
      clothing: '👕',
      electronics: '📱',
      restaurant: '🍽️',
      stationery: '✏️'
    };
    return icons[type as keyof typeof icons] || '🏪';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">FBR Users Management</h1>
          <p className="text-gray-600">Manage users with FBR invoice integration</p>
        </div>
        <div className="flex space-x-4">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button>
            <Sync className="mr-2 h-4 w-4" />
            Sync All
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total FBR Users</p>
                <p className="text-2xl font-bold">{fbrUsers.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold">{fbrUsers.filter(u => u.fbrStatus === 'active').length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold">{fbrUsers.filter(u => u.fbrStatus === 'pending').length}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Monthly Invoices</p>
                <p className="text-2xl font-bold">{fbrUsers.reduce((sum, u) => sum + u.monthlyInvoices, 0)}</p>
              </div>
              <FileText className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter FBR Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by business name, owner, or GST number..."
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
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>FBR Users ({filteredUsers.length})</CardTitle>
            <CardDescription>Click on a user to view details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedUser?.id === user.id ? 'border-blue-500 bg-blue-50' : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedUser(user)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getBusinessTypeIcon(user.businessType)}</span>
                      <h3 className="font-semibold">{user.businessName}</h3>
                    </div>
                    {getStatusBadge(user.fbrStatus)}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{user.ownerName}</p>
                  <p className="text-xs text-gray-500 mb-2">{user.gstNumber}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {user.monthlyInvoices} invoices this month
                    </span>
                    <span className="text-xs text-gray-500">
                      Last sync: {user.lastSync === 'Never' ? 'Never' : new Date(user.lastSync).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* User Details */}
        <Card>
          <CardHeader>
            <CardTitle>User Details</CardTitle>
            <CardDescription>
              {selectedUser ? 'Manage FBR settings and view statistics' : 'Select a user to view details'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedUser ? (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-4">Business Information</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getBusinessTypeIcon(selectedUser.businessType)}</span>
                      <span className="font-medium">{selectedUser.businessName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">Owner:</span>
                      <span>{selectedUser.ownerName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">GST Number:</span>
                      <span>{selectedUser.gstNumber}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">Type:</span>
                      <span className="capitalize">{selectedUser.businessType}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">Status:</span>
                      {getStatusBadge(selectedUser.fbrStatus)}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-4">FBR Statistics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Total Invoices</p>
                      <p className="text-xl font-bold">{selectedUser.totalInvoices}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">This Month</p>
                      <p className="text-xl font-bold">{selectedUser.monthlyInvoices}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg col-span-2">
                      <p className="text-sm text-gray-600">Last Sync</p>
                      <p className="text-sm font-medium">
                        {selectedUser.lastSync === 'Never' ? 'Never' : new Date(selectedUser.lastSync).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-4">Actions</h3>
                  <div className="space-y-3">
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSyncNow(selectedUser.id)}
                        disabled={selectedUser.fbrStatus !== 'active'}
                      >
                        <Sync className="mr-2 h-4 w-4" />
                        Sync Now
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Button>
                    </div>
                    
                    <div className="flex space-x-2">
                      {selectedUser.fbrStatus === 'pending' && (
                        <Button
                          size="sm"
                          onClick={() => handleStatusChange(selectedUser.id, 'active')}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Activate
                        </Button>
                      )}
                      {selectedUser.fbrStatus === 'active' && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleStatusChange(selectedUser.id, 'suspended')}
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Suspend
                        </Button>
                      )}
                      {selectedUser.fbrStatus === 'suspended' && (
                        <Button
                          size="sm"
                          onClick={() => handleStatusChange(selectedUser.id, 'active')}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Reactivate
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Select a user to view FBR details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}