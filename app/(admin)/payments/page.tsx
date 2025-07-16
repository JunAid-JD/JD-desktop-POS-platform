'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  CreditCard, 
  CheckCircle, 
  Clock, 
  XCircle,
  DollarSign,
  Calendar,
  User
} from 'lucide-react';

interface Payment {
  id: string;
  user: {
    name: string;
    email: string;
    businessName: string;
  };
  amount: number;
  planType: 'basic' | 'pro' | 'pro-fbr';
  paymentMethod: 'bank_transfer' | 'cash' | 'card';
  status: 'pending' | 'completed' | 'failed';
  date: string;
  transactionId?: string;
}

const mockPayments: Payment[] = [
  {
    id: '1',
    user: {
      name: 'John Doe',
      email: 'john@abcpharmacy.com',
      businessName: 'ABC Pharmacy'
    },
    amount: 79,
    planType: 'pro-fbr',
    paymentMethod: 'bank_transfer',
    status: 'completed',
    date: '2024-01-15',
    transactionId: 'TXN123456789'
  },
  {
    id: '2',
    user: {
      name: 'Jane Smith',
      email: 'jane@xyzgrocery.com',
      businessName: 'XYZ Grocery'
    },
    amount: 29,
    planType: 'basic',
    paymentMethod: 'cash',
    status: 'pending',
    date: '2024-01-14'
  },
  {
    id: '3',
    user: {
      name: 'Mike Johnson',
      email: 'mike@fashionstore.com',
      businessName: 'Fashion Store'
    },
    amount: 49,
    planType: 'pro',
    paymentMethod: 'card',
    status: 'failed',
    date: '2024-01-13'
  }
];

export default function AdminPayments() {
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.user.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.transactionId?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = (paymentId: string, newStatus: Payment['status']) => {
    setPayments(payments.map(payment =>
      payment.id === paymentId ? { ...payment, status: newStatus } : payment
    ));
  };

  const getStatusBadge = (status: Payment['status']) => {
    switch (status) {
      case 'completed': return <Badge className="bg-green-100 text-green-800"><CheckCircle className="mr-1 h-3 w-3" />Completed</Badge>;
      case 'pending': return <Badge variant="secondary"><Clock className="mr-1 h-3 w-3" />Pending</Badge>;
      case 'failed': return <Badge variant="destructive"><XCircle className="mr-1 h-3 w-3" />Failed</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPlanBadge = (planType: string) => {
    switch (planType) {
      case 'basic': return <Badge variant="outline">Basic - $29</Badge>;
      case 'pro': return <Badge className="bg-blue-100 text-blue-800">Pro - $49</Badge>;
      case 'pro-fbr': return <Badge className="bg-green-100 text-green-800">Pro + FBR - $79</Badge>;
      default: return <Badge variant="outline">{planType}</Badge>;
    }
  };

  const getTotalRevenue = () => {
    return payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Payment Management</h1>
          <p className="text-gray-600">Track and manage subscription payments</p>
        </div>
        <Button>
          <CreditCard className="mr-2 h-4 w-4" />
          Manual Payment Entry
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">${getTotalRevenue()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold">{payments.filter(p => p.status === 'completed').length}</p>
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
                <p className="text-2xl font-bold">{payments.filter(p => p.status === 'pending').length}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Failed</p>
                <p className="text-2xl font-bold">{payments.filter(p => p.status === 'failed').length}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, business, or transaction ID..."
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
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History ({filteredPayments.length})</CardTitle>
          <CardDescription>Manage subscription payments and status updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">User</th>
                  <th className="text-left p-4">Plan</th>
                  <th className="text-left p-4">Amount</th>
                  <th className="text-left p-4">Method</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <User className="h-5 w-5 text-gray-400" />
                        <div>
                          <div className="font-medium">{payment.user.name}</div>
                          <div className="text-sm text-gray-500">{payment.user.businessName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      {getPlanBadge(payment.planType)}
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-lg">${payment.amount}</div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="capitalize">
                        {payment.paymentMethod.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="p-4">
                      {getStatusBadge(payment.status)}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{payment.date}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        {payment.status === 'pending' && (
                          <Button
                            size="sm"
                            onClick={() => handleStatusUpdate(payment.id, 'completed')}
                          >
                            Approve
                          </Button>
                        )}
                        {payment.status === 'failed' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusUpdate(payment.id, 'pending')}
                          >
                            Retry
                          </Button>
                        )}
                      </div>
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