'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  Clock,
  Eye,
  Mail,
  Phone
} from 'lucide-react';

interface SubscriptionRequest {
  id: string;
  user: {
    name: string;
    email: string;
    phone: string;
    businessName: string;
    businessType: string;
    gstNumber?: string;
  };
  planType: 'basic' | 'pro' | 'pro-fbr';
  status: 'pending' | 'approved' | 'rejected';
  requestDate: string;
  notes?: string;
}

const mockSubscriptions: SubscriptionRequest[] = [
  {
    id: '1',
    user: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      businessName: 'ABC Pharmacy',
      businessType: 'pharmacy',
      gstNumber: 'GST123456789'
    },
    planType: 'pro-fbr',
    status: 'pending',
    requestDate: '2024-01-15',
    notes: 'Requested FBR integration for tax compliance'
  },
  {
    id: '2',
    user: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1234567891',
      businessName: 'XYZ Grocery',
      businessType: 'grocery'
    },
    planType: 'basic',
    status: 'approved',
    requestDate: '2024-01-14'
  },
  {
    id: '3',
    user: {
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+1234567892',
      businessName: 'Fashion Store',
      businessType: 'clothing'
    },
    planType: 'pro',
    status: 'pending',
    requestDate: '2024-01-13'
  }
];

export default function AdminSubscriptions() {
  const [subscriptions, setSubscriptions] = useState<SubscriptionRequest[]>(mockSubscriptions);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedSubscription, setSelectedSubscription] = useState<SubscriptionRequest | null>(null);

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = sub.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sub.user.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sub.user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (subscriptionId: string) => {
    setSubscriptions(subscriptions.map(sub =>
      sub.id === subscriptionId ? { ...sub, status: 'approved' } : sub
    ));
  };

  const handleReject = (subscriptionId: string) => {
    setSubscriptions(subscriptions.map(sub =>
      sub.id === subscriptionId ? { ...sub, status: 'rejected' } : sub
    ));
  };

  const getPlanBadge = (planType: string) => {
    switch (planType) {
      case 'basic': return <Badge variant="outline">Basic</Badge>;
      case 'pro': return <Badge className="bg-blue-100 text-blue-800">Pro</Badge>;
      case 'pro-fbr': return <Badge className="bg-green-100 text-green-800">Pro + FBR</Badge>;
      default: return <Badge variant="outline">{planType}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return <Badge variant="secondary"><Clock className="mr-1 h-3 w-3" />Pending</Badge>;
      case 'approved': return <Badge className="bg-green-100 text-green-800"><CheckCircle className="mr-1 h-3 w-3" />Approved</Badge>;
      case 'rejected': return <Badge variant="destructive"><XCircle className="mr-1 h-3 w-3" />Rejected</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Subscription Management</h1>
          <p className="text-gray-600">Review and manage user subscription requests</p>
        </div>
        <div className="flex space-x-4">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, business, or email..."
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Subscription List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Subscription Requests ({filteredSubscriptions.length})</CardTitle>
            <CardDescription>Click on a request to view details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredSubscriptions.map((sub) => (
                <div
                  key={sub.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedSubscription?.id === sub.id ? 'border-blue-500 bg-blue-50' : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedSubscription(sub)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{sub.user.name}</h3>
                    {getStatusBadge(sub.status)}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{sub.user.businessName}</p>
                  <p className="text-xs text-gray-500 mb-2">{sub.user.businessType}</p>
                  <div className="flex items-center justify-between">
                    {getPlanBadge(sub.planType)}
                    <span className="text-xs text-gray-500">{sub.requestDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Subscription Details */}
        <Card>
          <CardHeader>
            <CardTitle>Subscription Details</CardTitle>
            <CardDescription>
              {selectedSubscription ? 'Review and take action' : 'Select a subscription to view details'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedSubscription ? (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-4">User Information</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">Name:</span>
                      <span>{selectedSubscription.user.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span>{selectedSubscription.user.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{selectedSubscription.user.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">Business:</span>
                      <span>{selectedSubscription.user.businessName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">Type:</span>
                      <span className="capitalize">{selectedSubscription.user.businessType}</span>
                    </div>
                    {selectedSubscription.user.gstNumber && (
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">GST Number:</span>
                        <span>{selectedSubscription.user.gstNumber}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-4">Subscription Details</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">Plan:</span>
                      {getPlanBadge(selectedSubscription.planType)}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">Status:</span>
                      {getStatusBadge(selectedSubscription.status)}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">Request Date:</span>
                      <span>{selectedSubscription.requestDate}</span>
                    </div>
                    {selectedSubscription.notes && (
                      <div>
                        <span className="font-medium">Notes:</span>
                        <p className="text-sm text-gray-600 mt-1">{selectedSubscription.notes}</p>
                      </div>
                    )}
                  </div>
                </div>

                {selectedSubscription.status === 'pending' && (
                  <div className="flex space-x-3">
                    <Button
                      className="flex-1"
                      onClick={() => handleApprove(selectedSubscription.id)}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1"
                      onClick={() => handleReject(selectedSubscription.id)}
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Select a subscription request to view details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}