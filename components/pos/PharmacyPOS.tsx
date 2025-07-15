'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Users,
  History
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
  }
];

export function PharmacyPOS() {
  const [medicines, setMedicines] = useState<MedicineItem[]>(mockMedicines);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<string>('');
  const [currentTab, setCurrentTab] = useState('sale');

  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.batchNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const removeFromCart = (medicineId: string) => {
    setCart(cart.filter(item => item.id !== medicineId));
  };

  const updateQuantity = (medicineId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(medicineId);
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

  const getStockStatus = (stock: number) => {
    if (stock === 0) return 'out';
    if (stock <= 10) return 'low';
    return 'good';
  };

  const handleCheckout = () => {
    // Handle checkout logic
    console.log('Processing checkout...', cart);
    // Reset cart after successful checkout
    setCart([]);
  };

  return (
    <div className="h-screen bg-gray-50 p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
        {/* Left Panel - Medicine Search & List */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Package className="mr-2 h-5 w-5" />
                  Pharmacy POS
                </CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <QrCode className="mr-2 h-4 w-4" />
                    Scan
                  </Button>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Medicine
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="flex-1">
            <CardContent className="p-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search medicines by name, batch, or manufacturer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredMedicines.map((medicine) => {
                  const expiryStatus = getExpiryStatus(medicine.expiryDate);
                  const stockStatus = getStockStatus(medicine.stock);
                  
                  return (
                    <div
                      key={medicine.id}
                      className="p-3 bg-white border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => addToCart(medicine)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{medicine.name}</h3>
                            <Badge variant="outline" className="text-xs">
                              {medicine.strength}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            {medicine.manufacturer} • Batch: {medicine.batchNo}
                          </p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-gray-500">
                              <Calendar className="inline mr-1 h-3 w-3" />
                              Exp: {medicine.expiryDate}
                            </span>
                            <Badge 
                              variant={expiryStatus === 'expired' ? 'destructive' : 
                                     expiryStatus === 'expiring' ? 'secondary' : 'default'}
                              className="text-xs"
                            >
                              {expiryStatus === 'expired' ? 'Expired' :
                               expiryStatus === 'expiring' ? 'Expiring Soon' : 'Valid'}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">${medicine.price}</div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">
                              Stock: {medicine.stock}
                            </span>
                            <Badge 
                              variant={stockStatus === 'out' ? 'destructive' : 
                                     stockStatus === 'low' ? 'secondary' : 'default'}
                              className="text-xs"
                            >
                              {stockStatus === 'out' ? 'Out' :
                               stockStatus === 'low' ? 'Low' : 'Good'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Cart & Checkout */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Cart ({cart.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {cart.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Cart is empty</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="text-xs text-gray-600">{item.strength}</p>
                          <p className="text-xs text-gray-500">Batch: {item.batchNo}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">${item.total.toFixed(2)}</div>
                          <div className="flex items-center space-x-1 mt-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                updateQuantity(item.id, item.quantity - 1);
                              }}
                              className="h-6 w-6 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-xs px-2">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                updateQuantity(item.id, item.quantity + 1);
                              }}
                              className="h-6 w-6 p-0"
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
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Bill Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${getTotalAmount().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (GST):</span>
                    <span>${getTotalTax().toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span>${(getTotalAmount() + getTotalTax()).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <Button className="w-full" onClick={handleCheckout}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Process Sale
                  </Button>
                  <Button variant="outline" className="w-full">
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
  );
}