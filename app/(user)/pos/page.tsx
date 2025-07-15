'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Plus, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

const posModules = [
  {
    id: 'pharmacy',
    name: 'Pharmacy',
    description: 'Medicine tracking, batch management, expiry alerts',
    icon: '💊',
    color: 'bg-red-50 border-red-200 text-red-700',
    features: ['Batch tracking', 'Expiry management', 'QR code scanning', 'GST compliance']
  },
  {
    id: 'grocery',
    name: 'Grocery Store',
    description: 'Fast scanning, weight-based billing, bulk items',
    icon: '🛒',
    color: 'bg-green-50 border-green-200 text-green-700',
    features: ['Weight-based billing', 'Bulk pricing', 'Fast scanning', 'Perishable alerts']
  },
  {
    id: 'clothing',
    name: 'Clothing',
    description: 'Size & color variations, visual item selection',
    icon: '👕',
    color: 'bg-blue-50 border-blue-200 text-blue-700',
    features: ['Size variations', 'Color options', 'Visual catalog', 'Seasonal tracking']
  },
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'IMEI tracking, warranty management, accessories',
    icon: '📱',
    color: 'bg-purple-50 border-purple-200 text-purple-700',
    features: ['IMEI tracking', 'Warranty logs', 'Serial numbers', 'Accessory bundling']
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    description: 'Table management, kitchen orders, takeaway system',
    icon: '🍽️',
    color: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    features: ['Table management', 'Kitchen tickets', 'Order tracking', 'Takeaway system']
  },
  {
    id: 'stationery',
    name: 'Stationery',
    description: 'Bulk packs, school supplies, seasonal inventory',
    icon: '✏️',
    color: 'bg-indigo-50 border-indigo-200 text-indigo-700',
    features: ['Bulk packs', 'School supplies', 'Seasonal items', 'Student discounts']
  }
];

export default function POSModulePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();

  const filteredModules = posModules.filter(module =>
    module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    module.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const userModule = posModules.find(module => module.id === user?.businessType);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">POS System</h1>
          <p className="text-gray-600">Choose your business module or access your current setup</p>
        </div>
      </div>

      {/* Current Module Quick Access */}
      {userModule && (
        <Card className="border-2 border-blue-500 bg-blue-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{userModule.icon}</span>
                <div>
                  <CardTitle className="text-blue-900">Your Current Module</CardTitle>
                  <CardDescription className="text-blue-700">
                    {userModule.name} - Ready to use
                  </CardDescription>
                </div>
              </div>
              <Button size="lg" asChild>
                <Link href={`/pos/${userModule.id}`}>
                  Launch POS
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
        </Card>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search modules..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Module Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.map((module) => (
          <Card key={module.id} className={`hover:shadow-lg transition-shadow cursor-pointer ${module.color}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{module.icon}</span>
                  <div>
                    <CardTitle className="text-lg">{module.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {module.description}
                    </CardDescription>
                  </div>
                </div>
                {module.id === user?.businessType && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    Active
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {module.features.map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Button asChild variant="outline" size="sm" className="flex-1">
                    <Link href={`/pos/${module.id}`}>
                      {module.id === user?.businessType ? 'Launch' : 'Preview'}
                    </Link>
                  </Button>
                  {module.id !== user?.businessType && (
                    <Button variant="ghost" size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Module Change Notice */}
      {user?.businessType && (
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-yellow-800">
              <div className="w-2 h-2 bg-yellow-500 rounded-full" />
              <p className="text-sm">
                To change your business module, please contact support. Your current subscription covers the {userModule?.name} module.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}