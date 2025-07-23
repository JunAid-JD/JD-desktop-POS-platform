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
  Palette,
  Ruler,
  Image as ImageIcon,
  Printer
} from 'lucide-react';

interface ClothingItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  basePrice: number;
  sizes: { size: string; price: number; stock: number }[];
  colors: { color: string; colorCode: string; available: boolean }[];
  images: string[];
  description: string;
  sku: string;
}

interface CartItem {
  id: string;
  name: string;
  brand: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  total: number;
  sku: string;
}

const mockClothingItems: ClothingItem[] = [
  {
    id: '1',
    name: 'Cotton T-Shirt',
    brand: 'BasicWear',
    category: 'T-Shirts',
    basePrice: 299,
    sizes: [
      { size: 'S', price: 299, stock: 10 },
      { size: 'M', price: 299, stock: 15 },
      { size: 'L', price: 299, stock: 12 },
      { size: 'XL', price: 329, stock: 8 }
    ],
    colors: [
      { color: 'White', colorCode: '#FFFFFF', available: true },
      { color: 'Black', colorCode: '#000000', available: true },
      { color: 'Navy', colorCode: '#000080', available: true },
      { color: 'Red', colorCode: '#FF0000', available: false }
    ],
    images: ['https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=400'],
    description: 'Premium cotton t-shirt with comfortable fit',
    sku: 'TS001'
  },
  {
    id: '2',
    name: 'Denim Jeans',
    brand: 'DenisCo',
    category: 'Jeans',
    basePrice: 899,
    sizes: [
      { size: '28', price: 899, stock: 5 },
      { size: '30', price: 899, stock: 8 },
      { size: '32', price: 899, stock: 10 },
      { size: '34', price: 929, stock: 6 },
      { size: '36', price: 959, stock: 4 }
    ],
    colors: [
      { color: 'Blue', colorCode: '#0066CC', available: true },
      { color: 'Black', colorCode: '#000000', available: true },
      { color: 'Gray', colorCode: '#808080', available: true }
    ],
    images: ['https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=400'],
    description: 'Classic fit denim jeans with stretch comfort',
    sku: 'JN001'
  },
  {
    id: '3',
    name: 'Formal Shirt',
    brand: 'ExecutiveWear',
    category: 'Shirts',
    basePrice: 599,
    sizes: [
      { size: 'S', price: 599, stock: 7 },
      { size: 'M', price: 599, stock: 12 },
      { size: 'L', price: 599, stock: 9 },
      { size: 'XL', price: 629, stock: 5 }
    ],
    colors: [
      { color: 'White', colorCode: '#FFFFFF', available: true },
      { color: 'Blue', colorCode: '#0066CC', available: true },
      { color: 'Pink', colorCode: '#FFB6C1', available: true }
    ],
    images: ['https://images.pexels.com/photos/1232459/pexels-photo-1232459.jpeg?auto=compress&cs=tinysrgb&w=400'],
    description: 'Professional formal shirt for office wear',
    sku: 'SH001'
  }
];

export function ClothingPOS() {
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>(mockClothingItems);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');

  const categories = ['all', ...Array.from(new Set(clothingItems.map(item => item.category)))];

  const filteredItems = clothingItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (item: ClothingItem, size: string, color: string) => {
    const sizeOption = item.sizes.find(s => s.size === size);
    if (!sizeOption || sizeOption.stock <= 0) return;

    const cartItemKey = `${item.id}-${size}-${color}`;
    const existingItem = cart.find(cartItem => `${cartItem.id}-${cartItem.size}-${cartItem.color}` === cartItemKey);

    if (existingItem) {
      setCart(cart.map(cartItem =>
        `${cartItem.id}-${cartItem.size}-${cartItem.color}` === cartItemKey
          ? { ...cartItem, quantity: cartItem.quantity + 1, total: (cartItem.quantity + 1) * cartItem.price }
          : cartItem
      ));
    } else {
      const newCartItem: CartItem = {
        id: item.id,
        name: item.name,
        brand: item.brand,
        size,
        color,
        price: sizeOption.price,
        quantity: 1,
        total: sizeOption.price,
        sku: `${item.sku}-${size}-${color}`
      };
      setCart([...cart, newCartItem]);
    }

    // Clear selections after adding
    setSelectedSize('');
    setSelectedColor('');
    setSelectedItem(null);
  };

  const updateQuantity = (cartItemKey: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(cart.filter(item => `${item.id}-${item.size}-${item.color}` !== cartItemKey));
      return;
    }

    setCart(cart.map(item =>
      `${item.id}-${item.size}-${item.color}` === cartItemKey
        ? { ...item, quantity, total: quantity * item.price }
        : item
    ));
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + item.total, 0);
  };

  const handleCheckout = () => {
    console.log('Processing checkout...', cart);
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-blue-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-blue-800">Clothing Store POS</h1>
                <p className="text-blue-600">Fashion & Apparel Management</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                <Palette className="mr-2 h-4 w-4" />
                Colors
              </Button>
              <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                <Ruler className="mr-2 h-4 w-4" />
                Sizes
              </Button>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Products Section */}
          <div className="lg:col-span-2">
            <Card className="border-blue-200">
              <CardHeader className="bg-blue-50 border-b border-blue-200">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-blue-800">Clothing Inventory</CardTitle>
                  <Badge className="bg-blue-100 text-blue-800">
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
                      placeholder="Search clothing items..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-blue-200 focus:border-blue-400"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-40 border-blue-200">
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
                      className="p-4 border border-blue-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer bg-white"
                      onClick={() => setSelectedItem(item)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                          {item.images[0] ? (
                            <img 
                              src={item.images[0]} 
                              alt={item.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <ImageIcon className="h-8 w-8 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-blue-800">{item.name}</h3>
                            <Badge variant="outline">{item.category}</Badge>
                          </div>
                          <p className="text-sm text-gray-600">{item.brand}</p>
                          <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="font-bold text-lg text-blue-600">${item.basePrice}</span>
                            <div className="flex items-center space-x-1">
                              {item.colors.slice(0, 3).map((color, index) => (
                                <div
                                  key={index}
                                  className="w-4 h-4 rounded-full border border-gray-300"
                                  style={{ backgroundColor: color.colorCode }}
                                  title={color.color}
                                />
                              ))}
                              {item.colors.length > 3 && (
                                <span className="text-xs text-gray-500">+{item.colors.length - 3}</span>
                              )}
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
              <Card className="border-blue-200">
                <CardHeader className="bg-blue-50 border-b border-blue-200">
                  <CardTitle className="text-lg text-blue-800">Select Size & Color</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-blue-800">{selectedItem.name}</h4>
                      <p className="text-sm text-gray-600">{selectedItem.brand}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-blue-800">Size</label>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.sizes.map((size) => (
                          <Button
                            key={size.size}
                            variant={selectedSize === size.size ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedSize(size.size)}
                            disabled={size.stock <= 0}
                            className={selectedSize === size.size ? "bg-blue-500 hover:bg-blue-600" : "border-blue-200"}
                          >
                            {size.size}
                            {size.stock <= 0 && ' (Out)'}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-blue-800">Color</label>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.colors.map((color) => (
                          <Button
                            key={color.color}
                            variant={selectedColor === color.color ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedColor(color.color)}
                            disabled={!color.available}
                            className={`flex items-center space-x-2 ${
                              selectedColor === color.color ? "bg-blue-500 hover:bg-blue-600" : "border-blue-200"
                            }`}
                          >
                            <div
                              className="w-3 h-3 rounded-full border"
                              style={{ backgroundColor: color.colorCode }}
                            />
                            <span>{color.color}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <Button
                      className="w-full bg-blue-500 hover:bg-blue-600"
                      onClick={() => {
                        if (selectedSize && selectedColor) {
                          addToCart(selectedItem, selectedSize, selectedColor);
                        }
                      }}
                      disabled={!selectedSize || !selectedColor}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="border-blue-200">
              <CardHeader className="bg-blue-50 border-b border-blue-200">
                <CardTitle className="flex items-center text-blue-800">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Cart ({cart.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {cart.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">Cart is empty</p>
                  ) : (
                    cart.map((item) => {
                      const cartItemKey = `${item.id}-${item.size}-${item.color}`;
                      return (
                        <div key={cartItemKey} className="p-2 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-sm text-blue-800">{item.name}</h4>
                              <p className="text-xs text-gray-600">{item.brand}</p>
                              <p className="text-xs text-gray-500">
                                Size: {item.size}, Color: {item.color}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-blue-600">${item.total}</div>
                              <div className="flex items-center space-x-1 mt-1">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(cartItemKey, item.quantity - 1)}
                                  className="h-6 w-6 p-0 border-blue-300"
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="text-xs px-2">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(cartItemKey, item.quantity + 1)}
                                  className="h-6 w-6 p-0 border-blue-300"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>

            {cart.length > 0 && (
              <Card className="border-blue-200">
                <CardHeader className="bg-blue-50 border-b border-blue-200">
                  <CardTitle className="text-lg text-blue-800">Bill Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Items:</span>
                      <span>{cart.reduce((total, item) => total + item.quantity, 0)}</span>
                    </div>
                    <div className="border-t border-blue-200 pt-2">
                      <div className="flex justify-between font-bold text-lg text-blue-800">
                        <span>Total:</span>
                        <span>${getTotalAmount()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <Button className="w-full bg-blue-500 hover:bg-blue-600" onClick={handleCheckout}>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Process Sale
                    </Button>
                    <Button variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50">
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