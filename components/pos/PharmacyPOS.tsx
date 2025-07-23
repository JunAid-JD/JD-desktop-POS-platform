'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Plus, 
  Minus, 
  ShoppingCart, 
  Package, 
  Calendar,
  AlertTriangle,
  QrCode,
  Printer,
  Filter
} from 'lucide-react';

interface MedicineItem {
  id: string;
  name: string;
  batchNo: string;
  expiryDate: string;
  price: number;
  stock: number;
  manufacturer: string;
  gstRate: number;
  strength: string;
  category: string;
  barcode?: string;
}

interface CartItem extends MedicineItem {
  quantity: number;
  total: number;
}

const mockMedicines: MedicineItem[] = [
  {
    id: '1',
    name: 'Paracetamol',
    batchNo: 'PCM001',
    expiryDate: '2025-12-31',
    price: 5.0,
    stock: 150,
    manufacturer: 'Generic Pharma',
    gstRate: 12,
    strength: '500mg',
    category: 'Analgesic',
    barcode: '1234567890123'
  },
  {
    id: '2',
    name: 'Amoxicillin',
    batchNo: 'AMX002',
    expiryDate: '2025-06-30',
    price: 25.0,
    stock: 80,
    manufacturer: 'MedLife',
    gstRate: 12,
    strength: '250mg',
    category: 'Antibiotic'
  },
  {
    id: '3',
    name: 'Vitamin D3',
    batchNo: 'VD3003',
    expiryDate: '2026-03-15',
    price: 15.0,
    stock: 200,
    manufacturer: 'HealthPlus',
    gstRate: 5,
    strength: '1000 IU',
    category: 'Vitamin'
  },
  {
    id: '4',
    name: 'Cough Syrup',
    batchNo: 'CS004',
    expiryDate: '2024-12-31',
    price: 45.0,
    stock: 25,
    manufacturer: 'CoughCure',
    gstRate: 18,
    strength: '100ml',
    category: 'Respiratory'
  },
  {
    id: '5',
    name: 'Aspirin',
    batchNo: 'ASP005',
    expiryDate: '2025-08-20',
    price: 8.0,
    stock: 120,
    manufacturer: 'Generic Pharma',
    gstRate: 12,
    strength: '75mg',
    category: 'Analgesic'
  },
  {
    id: '6',
    name: 'Insulin Pen',
    batchNo: 'INS006',
    expiryDate: '2024-11-15',
    price: 180.0,
    stock: 15,
    manufacturer: 'DiabetesCare',
    gstRate: 5,
    strength: '100 units',
    category: 'Diabetes'
  }
];

export function PharmacyPOS() {
  const [medicines, setMedicines] = useState<MedicineItem[]>(mockMedicines);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(medicines.map(item => item.category)))];

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.batchNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || medicine.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (medicine: MedicineItem) => {
    const existingItem = cart.find(item => item.id === medicine.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === medicine.id
          ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
          : item
      ));
    } else {
      setCart([...cart, { ...medicine, quantity: 1, total: medicine.price }]);
    }
  };

  const updateQuantity = (medicineId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(cart.filter(item => item.id !== medicineId));
      return;
    }
    setCart(cart.map(item =>
      item.id === medicineId
        ? { ...item, quantity, total: quantity * item.price }
        : item
    ));
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + item.total, 0);
  };

  const getTotalTax = () => {
    return cart.reduce((total, item) => total + (item.total * item.gstRate / 100), 0);
  };

  const getExpiryStatus = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilExpiry < 0) return 'expired';
    if (daysUntilExpiry <= 30) return 'expiring';
    return 'valid';
  };

  const handleCheckout = () => {
    console.log('Processing checkout...', cart);
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-red-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-red-800">Pharmacy POS</h1>
                <p className="text-red-600">Medicine & Healthcare Management</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" className="border-red-200 text-red-700 hover:bg-red-50">
                <QrCode className="mr-2 h-4 w-4" />
                Scan Barcode
              </Button>
              <Button className="bg-red-500 hover:bg-red-600 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Add Medicine
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Products Section */}
          <div className="lg:col-span-2">
            <Card className="border-red-200">
              <CardHeader className="bg-red-50 border-b border-red-200">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-red-800">Medicine Inventory</CardTitle>
                  <Badge className="bg-red-100 text-red-800">
                    {filteredMedicines.length} items
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {/* Search and Filters */}
                <div className="flex space-x-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search medicines by name, batch, or manufacturer..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-red-200 focus:border-red-400"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48 border-red-200">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category === 'all' ? 'All Categories' : category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Medicine Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                  {filteredMedicines.map((medicine) => {
                    const expiryStatus = getExpiryStatus(medicine.expiryDate);
                    
                    return (
                      <div
                        key={medicine.id}
                        className="p-4 border border-red-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer bg-white"
                        onClick={() => addToCart(medicine)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-red-800 mb-1">{medicine.name}</h3>
                            <p className="text-sm text-gray-600">{medicine.manufacturer}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {medicine.strength}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {medicine.category}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg text-red-600">${medicine.price}</div>
                            <div className="text-xs text-gray-500">GST: {medicine.gstRate}%</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">Exp: {medicine.expiryDate}</span>
                            <Badge 
                              variant={expiryStatus === 'expired' ? 'destructive' : 
                                     expiryStatus === 'expiring' ? 'secondary' : 'default'}
                              className="text-xs"
                            >
                              {expiryStatus === 'expired' ? 'Expired' :
                               expiryStatus === 'expiring' ? 'Expiring Soon' : 'Valid'}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-600">Stock: {medicine.stock}</span>
                            <Badge 
                              variant={medicine.stock <= 10 ? 'destructive' : 'default'}
                              className="text-xs"
                            >
                              {medicine.stock <= 10 ? 'Low' : 'Good'}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="mt-2 text-xs text-gray-500">
                          Batch: {medicine.batchNo}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cart Section */}
          <div className="space-y-6">
            <Card className="border-red-200">
              <CardHeader className="bg-red-50 border-b border-red-200">
                <CardTitle className="flex items-center text-red-800">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Cart ({cart.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {cart.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">Cart is empty</p>
                  ) : (
                    cart.map((item) => (
                      <div key={item.id} className="p-3 bg-red-50 rounded-lg border border-red-200">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm text-red-800">{item.name}</h4>
                            <p className="text-xs text-gray-600">{item.strength} • {item.manufacturer}</p>
                            <p className="text-xs text-gray-500">Batch: {item.batchNo}</p>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-red-600">${item.total.toFixed(2)}</div>
                            <div className="flex items-center space-x-1 mt-1">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateQuantity(item.id, item.quantity - 1);
                                }}
                                className="h-6 w-6 p-0 border-red-300"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="text-xs px-2 font-medium">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateQuantity(item.id, item.quantity + 1);
                                }}
                                className="h-6 w-6 p-0 border-red-300"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {cart.length > 0 && (
              <Card className="border-red-200">
                <CardHeader className="bg-red-50 border-b border-red-200">
                  <CardTitle className="text-red-800">Bill Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>${getTotalAmount().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax (GST):</span>
                      <span>${getTotalTax().toFixed(2)}</span>
                    </div>
                    <div className="border-t border-red-200 pt-3">
                      <div className="flex justify-between font-bold text-lg text-red-800">
                        <span>Total:</span>
                        <span>${(getTotalAmount() + getTotalTax()).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <Button 
                      className="w-full bg-red-500 hover:bg-red-600 text-white" 
                      onClick={handleCheckout}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Process Sale
                    </Button>
                    <Button variant="outline" className="w-full border-red-200 text-red-700 hover:bg-red-50">
                      <Printer className="mr-2 h-4 w-4" />
                      Print Receipt
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}