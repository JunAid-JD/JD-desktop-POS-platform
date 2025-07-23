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
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [weightInput, setWeightInput] = useState<{ [key: string]: string }>({});

  const categories = ['all', ...Array.from(new Set(groceryItems.map(item => item.category)))];

  const filteredItems = groceryItems.filter(item =>
    (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === 'all' || item.category === selectedCategory)
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-green-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-green-800">Grocery Store POS</h1>
                <p className="text-green-600">Fresh Products & Daily Essentials</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                <Barcode className="mr-2 h-4 w-4" />
                Scan
              </Button>
              <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                <Scale className="mr-2 h-4 w-4" />
                Weigh
              </Button>
              <Button className="bg-green-500 hover:bg-green-600 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Products Section */}
          <div className="lg:col-span-2">
            <Card className="border-green-200">
              <CardHeader className="bg-green-50 border-b border-green-200">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-green-800">Product Inventory</CardTitle>
                  <Badge className="bg-green-100 text-green-800">
                    {filteredItems.length} items
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {/* Search and Filters */}
                <div className="flex space-x-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search items by name or category..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-green-200 focus:border-green-400"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48 border-green-200">
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

                {/* Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 border border-green-200 rounded-lg hover:shadow-md transition-shadow bg-white"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-green-800">{item.name}</h3>
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
                          <div className="font-bold text-lg text-green-600">
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
                                className="w-20 text-sm border-green-200"
                              />
                              <Button
                                size="sm"
                                className="bg-green-500 hover:bg-green-600"
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
                              className="w-full bg-green-500 hover:bg-green-600"
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

          {/* Cart Section */}
          <div className="space-y-6">
            <Card className="border-green-200">
              <CardHeader className="bg-green-50 border-b border-green-200">
                <CardTitle className="flex items-center text-green-800">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Shopping Cart ({cart.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {cart.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">Cart is empty</p>
                  ) : (
                    cart.map((item) => (
                      <div key={item.id} className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm text-green-800">{item.name}</h4>
                            <p className="text-xs text-gray-600">{item.category}</p>
                            <p className="text-xs text-gray-500">
                              {item.isWeightBased 
                                ? `${item.weight?.toFixed(1)} kg`
                                : `${item.quantity} ${item.unit}`
                              }
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-green-600">${item.total.toFixed(2)}</div>
                            <div className="flex items-center space-x-1 mt-1">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - (item.isWeightBased ? 0.1 : 1))}
                                className="h-6 w-6 p-0 border-green-300"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="text-xs px-2 font-medium">
                                {item.isWeightBased ? item.weight?.toFixed(1) : item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + (item.isWeightBased ? 0.1 : 1))}
                                className="h-6 w-6 p-0 border-green-300"
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
              <Card className="border-green-200">
                <CardHeader className="bg-green-50 border-b border-green-200">
                  <CardTitle className="text-green-800">Bill Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Total Items:</span>
                      <span>{cart.length}</span>
                    </div>
                    <div className="border-t border-green-200 pt-3">
                      <div className="flex justify-between font-bold text-lg text-green-800">
                        <span>Total:</span>
                        <span>${getTotalAmount().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <Button 
                      className="w-full bg-green-500 hover:bg-green-600 text-white" 
                      onClick={handleCheckout}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Process Sale
                    </Button>
                    <Button variant="outline" className="w-full border-green-200 text-green-700 hover:bg-green-50">
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