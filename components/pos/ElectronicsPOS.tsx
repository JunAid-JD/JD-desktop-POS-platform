'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Search, 
  Plus, 
  Minus, 
  ShoppingCart, 
  Package, 
  Smartphone,
  Shield,
  Printer,
  QrCode
} from 'lucide-react';

interface ElectronicsItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  model: string;
  specifications: string[];
  warrantyPeriod: string;
  hasIMEI: boolean;
  hasSerial: boolean;
  image?: string;
}

interface CartItem extends ElectronicsItem {
  quantity: number;
  total: number;
  imeiNumbers?: string[];
  serialNumbers?: string[];
}

const mockElectronicsItems: ElectronicsItem[] = [
  {
    id: '1',
    name: 'iPhone 14 Pro',
    brand: 'Apple',
    category: 'Smartphones',
    price: 999,
    stock: 15,
    model: 'A2890',
    specifications: ['6.1" Display', '128GB Storage', '48MP Camera', '5G'],
    warrantyPeriod: '12 months',
    hasIMEI: true,
    hasSerial: true,
    image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    name: 'Samsung Galaxy S23',
    brand: 'Samsung',
    category: 'Smartphones',
    price: 799,
    stock: 20,
    model: 'SM-S911U',
    specifications: ['6.1" Display', '128GB Storage', '50MP Camera', '5G'],
    warrantyPeriod: '12 months',
    hasIMEI: true,
    hasSerial: true
  },
  {
    id: '3',
    name: 'MacBook Air M2',
    brand: 'Apple',
    category: 'Laptops',
    price: 1199,
    stock: 8,
    model: 'MLXY3LL/A',
    specifications: ['13.6" Display', '256GB SSD', '8GB RAM', 'M2 Chip'],
    warrantyPeriod: '12 months',
    hasIMEI: false,
    hasSerial: true
  },
  {
    id: '4',
    name: 'AirPods Pro',
    brand: 'Apple',
    category: 'Accessories',
    price: 249,
    stock: 30,
    model: 'MLWK3AM/A',
    specifications: ['Active Noise Cancellation', 'Spatial Audio', '6 hours playback'],
    warrantyPeriod: '12 months',
    hasIMEI: false,
    hasSerial: true
  },
  {
    id: '5',
    name: 'Sony WH-1000XM4',
    brand: 'Sony',
    category: 'Headphones',
    price: 349,
    stock: 12,
    model: 'WH1000XM4/B',
    specifications: ['30-hour battery', 'Noise Cancellation', 'Touch controls'],
    warrantyPeriod: '24 months',
    hasIMEI: false,
    hasSerial: true
  }
];

export function ElectronicsPOS() {
  const [electronicsItems, setElectronicsItems] = useState<ElectronicsItem[]>(mockElectronicsItems);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<ElectronicsItem | null>(null);
  const [imeiInput, setImeiInput] = useState('');
  const [serialInput, setSerialInput] = useState('');

  const filteredItems = electronicsItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (item: ElectronicsItem, imeiNumbers?: string[], serialNumbers?: string[]) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { 
              ...cartItem, 
              quantity: cartItem.quantity + 1,
              total: (cartItem.quantity + 1) * cartItem.price,
              imeiNumbers: imeiNumbers ? [...(cartItem.imeiNumbers || []), ...imeiNumbers] : cartItem.imeiNumbers,
              serialNumbers: serialNumbers ? [...(cartItem.serialNumbers || []), ...serialNumbers] : cartItem.serialNumbers
            }
          : cartItem
      ));
    } else {
      setCart([...cart, { 
        ...item, 
        quantity: 1,
        total: item.price,
        imeiNumbers,
        serialNumbers
      }]);
    }
    
    // Clear inputs after adding
    setImeiInput('');
    setSerialInput('');
    setSelectedItem(null);
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCart(cart.map(item =>
      item.id === itemId
        ? { ...item, quantity, total: quantity * item.price }
        : item
    ));
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + item.total, 0);
  };

  const handleAddItemWithDetails = () => {
    if (!selectedItem) return;

    const imeiNumbers = selectedItem.hasIMEI && imeiInput ? imeiInput.split(',').map(s => s.trim()) : undefined;
    const serialNumbers = selectedItem.hasSerial && serialInput ? serialInput.split(',').map(s => s.trim()) : undefined;

    addToCart(selectedItem, imeiNumbers, serialNumbers);
  };

  const handleCheckout = () => {
    console.log('Processing checkout...', cart);
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-purple-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <Smartphone className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-purple-800">Electronics Store POS</h1>
                <p className="text-purple-600">Technology & Gadgets Management</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                <QrCode className="mr-2 h-4 w-4" />
                Scan
              </Button>
              <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Products Section */}
          <div className="lg:col-span-2">
            <Card className="border-purple-200">
              <CardHeader className="bg-purple-50 border-b border-purple-200">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-purple-800">Electronics Inventory</CardTitle>
                  <Badge className="bg-purple-100 text-purple-800">
                    {filteredItems.length} items
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search electronics by name, brand, or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-purple-200 focus:border-purple-400"
                  />
                </div>

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 border border-purple-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer bg-white"
                      onClick={() => setSelectedItem(item)}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                          {item.image ? (
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <Package className="h-10 w-10 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-lg text-purple-800">{item.name}</h3>
                            <Badge variant="outline">{item.category}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{item.brand} • Model: {item.model}</p>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {item.specifications.slice(0, 3).map((spec, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {spec}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <span className="font-bold text-xl text-purple-600">${item.price}</span>
                              <div className="flex items-center space-x-1">
                                <Shield className="h-4 w-4 text-green-600" />
                                <span className="text-sm text-gray-600">{item.warrantyPeriod}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-500">Stock: {item.stock}</span>
                                <Badge variant={item.stock <= 5 ? 'destructive' : 'default'}>
                                  {item.stock <= 5 ? 'Low' : 'In Stock'}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cart & Item Details Section */}
          <div className="space-y-6">
            {selectedItem && (
              <Card className="border-purple-200">
                <CardHeader className="bg-purple-50 border-b border-purple-200">
                  <CardTitle className="text-lg text-purple-800">Add Item Details</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-1 text-purple-800">{selectedItem.name}</h4>
                      <p className="text-sm text-gray-600">{selectedItem.brand} • ${selectedItem.price}</p>
                    </div>
                    
                    {selectedItem.hasIMEI && (
                      <div>
                        <Label htmlFor="imei" className="text-purple-800">IMEI Numbers (comma-separated)</Label>
                        <Textarea
                          id="imei"
                          placeholder="Enter IMEI numbers separated by commas"
                          value={imeiInput}
                          onChange={(e) => setImeiInput(e.target.value)}
                          className="mt-1 border-purple-200"
                          rows={3}
                        />
                      </div>
                    )}
                    
                    {selectedItem.hasSerial && (
                      <div>
                        <Label htmlFor="serial" className="text-purple-800">Serial Numbers (comma-separated)</Label>
                        <Textarea
                          id="serial"
                          placeholder="Enter serial numbers separated by commas"
                          value={serialInput}
                          onChange={(e) => setSerialInput(e.target.value)}
                          className="mt-1 border-purple-200"
                          rows={3}
                        />
                      </div>
                    )}
                    
                    <div className="flex space-x-2">
                      <Button
                        className="flex-1 bg-purple-500 hover:bg-purple-600"
                        onClick={handleAddItemWithDetails}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedItem(null)}
                        className="border-purple-200"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="border-purple-200">
              <CardHeader className="bg-purple-50 border-b border-purple-200">
                <CardTitle className="flex items-center text-purple-800">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Cart ({cart.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {cart.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">Cart is empty</p>
                  ) : (
                    cart.map((item) => (
                      <div key={item.id} className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm text-purple-800">{item.name}</h4>
                            <p className="text-xs text-gray-600">{item.brand} • {item.model}</p>
                            {item.imeiNumbers && item.imeiNumbers.length > 0 && (
                              <p className="text-xs text-gray-500">IMEI: {item.imeiNumbers.join(', ')}</p>
                            )}
                            {item.serialNumbers && item.serialNumbers.length > 0 && (
                              <p className="text-xs text-gray-500">Serial: {item.serialNumbers.join(', ')}</p>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-purple-600">${item.total}</div>
                            <div className="flex items-center space-x-1 mt-1">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="h-6 w-6 p-0 border-purple-300"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="text-xs px-2">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="h-6 w-6 p-0 border-purple-300"
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
              <Card className="border-purple-200">
                <CardHeader className="bg-purple-50 border-b border-purple-200">
                  <CardTitle className="text-lg text-purple-800">Bill Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Items:</span>
                      <span>{cart.reduce((total, item) => total + item.quantity, 0)}</span>
                    </div>
                    <div className="border-t border-purple-200 pt-2">
                      <div className="flex justify-between font-bold text-lg text-purple-800">
                        <span>Total:</span>
                        <span>${getTotalAmount()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <Button className="w-full bg-purple-500 hover:bg-purple-600" onClick={handleCheckout}>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Process Sale
                    </Button>
                    <Button variant="outline" className="w-full border-purple-200 text-purple-700 hover:bg-purple-50">
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