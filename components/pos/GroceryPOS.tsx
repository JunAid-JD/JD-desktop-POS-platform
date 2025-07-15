'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Plus, 
  Minus, 
  ShoppingCart, 
  Package, 
  Scale,
  Barcode,
  Printer
} from 'lucide-react';

interface GroceryItem {
  id: string;
  name: string;
  category: string;
  price: number;
  pricePerKg?: number;
  stock: number;
  unit: 'piece' | 'kg' | 'gram' | 'liter';
  barcode?: string;
  image?: string;
  isWeightBased: boolean;
}

interface CartItem extends GroceryItem {
  quantity: number;
  weight?: number;
  total: number;
}

const mockGroceryItems: GroceryItem[] = [
  {
    id: '1',
    name: 'Basmati Rice',
    category: 'Grains',
    price: 120,
    pricePerKg: 120,
    stock: 50,
    unit: 'kg',
    isWeightBased: true,
    barcode: '1234567890123'
  },
  {
    id: '2',
    name: 'Whole Wheat Bread',
    category: 'Bakery',
    price: 45,
    stock: 25,
    unit: 'piece',
    isWeightBased: false
  },
  {
    id: '3',
    name: 'Fresh Milk',
    category: 'Dairy',
    price: 55,
    stock: 40,
    unit: 'liter',
    isWeightBased: false
  },
  {
    id: '4',
    name: 'Bananas',
    category: 'Fruits',
    price: 80,
    pricePerKg: 80,
    stock: 30,
    unit: 'kg',
    isWeightBased: true
  },
  {
    id: '5',
    name: 'Tomatoes',
    category: 'Vegetables',
    price: 60,
    pricePerKg: 60,
    stock: 20,
    unit: 'kg',
    isWeightBased: true
  },
  {
    id: '6',
    name: 'Coca Cola',
    category: 'Beverages',
    price: 25,
    stock: 100,
    unit: 'piece',
    isWeightBased: false
  }
];

export function GroceryPOS() {
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>(mockGroceryItems);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [weightInput, setWeightInput] = useState<{ [key: string]: string }>({});

  const filteredItems = groceryItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (item: GroceryItem, weight?: number) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (item.isWeightBased && !weight) {
      // For weight-based items, we need weight input
      return;
    }
    
    const quantity = item.isWeightBased ? weight || 1 : 1;
    const total = item.isWeightBased 
      ? (item.pricePerKg || item.price) * quantity
      : item.price * quantity;
    
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { 
              ...cartItem, 
              quantity: cartItem.quantity + quantity,
              weight: item.isWeightBased ? (cartItem.weight || 0) + quantity : undefined,
              total: cartItem.total + total
            }
          : cartItem
      ));
    } else {
      setCart([...cart, { 
        ...item, 
        quantity,
        weight: item.isWeightBased ? quantity : undefined,
        total 
      }]);
    }
    
    // Clear weight input after adding
    if (item.isWeightBased) {
      setWeightInput({ ...weightInput, [item.id]: '' });
    }
  };

  const updateQuantity = (itemId: string, quantity: number, weight?: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCart(cart.map(item => {
      if (item.id === itemId) {
        const newQuantity = item.isWeightBased ? weight || quantity : quantity;
        const newTotal = item.isWeightBased 
          ? (item.pricePerKg || item.price) * newQuantity
          : item.price * newQuantity;
        
        return {
          ...item,
          quantity: newQuantity,
          weight: item.isWeightBased ? newQuantity : undefined,
          total: newTotal
        };
      }
      return item;
    }));
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + item.total, 0);
  };

  const handleWeightChange = (itemId: string, weight: string) => {
    setWeightInput({ ...weightInput, [itemId]: weight });
  };

  const handleCheckout = () => {
    console.log('Processing checkout...', cart);
    setCart([]);
  };

  return (
    <div className="h-screen bg-gray-50 p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
        {/* Left Panel - Items */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Package className="mr-2 h-5 w-5" />
                  Grocery Store POS
                </CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Barcode className="mr-2 h-4 w-4" />
                    Scan
                  </Button>
                  <Button variant="outline" size="sm">
                    <Scale className="mr-2 h-4 w-4" />
                    Weigh
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
                  placeholder="Search items by name or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-white border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{item.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {item.category}
                        </Badge>
                      </div>
                      <Badge variant={item.stock <= 10 ? 'destructive' : 'default'} className="text-xs">
                        {item.stock} {item.unit}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-lg">
                          ${item.isWeightBased ? item.pricePerKg : item.price}
                          {item.isWeightBased && <span className="text-sm font-normal">/kg</span>}
                        </div>
                        <div className="text-sm text-gray-600">
                          Unit: {item.unit}
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-2">
                        {item.isWeightBased ? (
                          <div className="flex items-center space-x-2">
                            <Input
                              type="number"
                              step="0.1"
                              placeholder="Weight (kg)"
                              value={weightInput[item.id] || ''}
                              onChange={(e) => handleWeightChange(item.id, e.target.value)}
                              className="w-20 text-sm"
                            />
                            <Button
                              size="sm"
                              onClick={() => {
                                const weight = parseFloat(weightInput[item.id] || '0');
                                if (weight > 0) {
                                  addToCart(item, weight);
                                }
                              }}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => addToCart(item)}
                            className="w-full"
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Cart */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Shopping Cart ({cart.length})
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
                          <p className="text-xs text-gray-600">{item.category}</p>
                          <p className="text-xs text-gray-500">
                            {item.isWeightBased 
                              ? `${item.weight?.toFixed(1)} kg`
                              : `${item.quantity} ${item.unit}`
                            }
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">${item.total.toFixed(2)}</div>
                          <div className="flex items-center space-x-1 mt-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - (item.isWeightBased ? 0.1 : 1))}
                              className="h-6 w-6 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-xs px-2">
                              {item.isWeightBased ? item.weight?.toFixed(1) : item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + (item.isWeightBased ? 0.1 : 1))}
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
                    <span>Total Items:</span>
                    <span>{cart.length}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span>${getTotalAmount().toFixed(2)}</span>
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