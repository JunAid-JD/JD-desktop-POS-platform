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
  BookOpen,
  PenTool,
  Printer,
  GraduationCap,
  Users
} from 'lucide-react';

interface StationeryItem {
  id: string;
  name: string;
  category: string;
  price: number;
  bulkPrice?: number;
  bulkQuantity?: number;
  stock: number;
  brand: string;
  description: string;
  isSchoolItem: boolean;
  grade?: string;
  season?: 'all' | 'summer' | 'winter';
}

interface CartItem extends StationeryItem {
  quantity: number;
  total: number;
  isBulk: boolean;
}

const mockStationeryItems: StationeryItem[] = [
  {
    id: '1',
    name: 'HB Pencils',
    category: 'Writing',
    price: 2,
    bulkPrice: 20,
    bulkQuantity: 12,
    stock: 500,
    brand: 'Staedtler',
    description: 'Premium graphite pencils for writing',
    isSchoolItem: true,
    grade: 'All Grades',
    season: 'all'
  },
  {
    id: '2',
    name: 'Ballpoint Pens (Blue)',
    category: 'Writing',
    price: 5,
    bulkPrice: 45,
    bulkQuantity: 10,
    stock: 200,
    brand: 'Pilot',
    description: 'Smooth writing ballpoint pens',
    isSchoolItem: true,
    grade: 'All Grades',
    season: 'all'
  },
  {
    id: '3',
    name: 'A4 Notebooks',
    category: 'Notebooks',
    price: 25,
    bulkPrice: 220,
    bulkQuantity: 10,
    stock: 150,
    brand: 'Classmate',
    description: '200 pages ruled notebook',
    isSchoolItem: true,
    grade: 'Grade 1-12',
    season: 'all'
  },
  {
    id: '4',
    name: 'Geometry Box',
    category: 'Math Tools',
    price: 89,
    stock: 80,
    brand: 'Camlin',
    description: 'Complete geometry set with compass, ruler, protractor',
    isSchoolItem: true,
    grade: 'Grade 5-12',
    season: 'all'
  },
  {
    id: '5',
    name: 'Colored Pencils Set',
    category: 'Art Supplies',
    price: 149,
    stock: 60,
    brand: 'Faber-Castell',
    description: '24 colors pencil set',
    isSchoolItem: true,
    grade: 'Grade 1-8',
    season: 'all'
  },
  {
    id: '6',
    name: 'Winter Uniform Set',
    category: 'Uniforms',
    price: 299,
    stock: 40,
    brand: 'SchoolWear',
    description: 'Complete winter uniform set',
    isSchoolItem: true,
    grade: 'Grade 1-12',
    season: 'winter'
  },
  {
    id: '7',
    name: 'Summer Uniform Set',
    category: 'Uniforms',
    price: 199,
    stock: 45,
    brand: 'SchoolWear',
    description: 'Complete summer uniform set',
    isSchoolItem: true,
    grade: 'Grade 1-12',
    season: 'summer'
  },
  {
    id: '8',
    name: 'Office File Folders',
    category: 'Office Supplies',
    price: 15,
    bulkPrice: 120,
    bulkQuantity: 10,
    stock: 100,
    brand: 'DataBank',
    description: 'Plastic file folders for documents',
    isSchoolItem: false,
    season: 'all'
  }
];

export function StationeryPOS() {
  const [stationeryItems, setStationeryItems] = useState<StationeryItem[]>(mockStationeryItems);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [showSchoolItems, setShowSchoolItems] = useState<boolean>(true);
  const [customerType, setCustomerType] = useState<'individual' | 'school' | 'bulk'>('individual');

  const categories = ['all', ...Array.from(new Set(stationeryItems.map(item => item.category)))];
  const grades = ['all', 'Grade 1-5', 'Grade 6-8', 'Grade 9-12', 'All Grades'];

  const filteredItems = stationeryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesGrade = selectedGrade === 'all' || item.grade === selectedGrade;
    const matchesSchool = !showSchoolItems || item.isSchoolItem;
    
    return matchesSearch && matchesCategory && matchesGrade && matchesSchool;
  });

  const addToCart = (item: StationeryItem, isBulk: boolean = false) => {
    const cartKey = `${item.id}-${isBulk ? 'bulk' : 'single'}`;
    const existingItem = cart.find(cartItem => `${cartItem.id}-${cartItem.isBulk ? 'bulk' : 'single'}` === cartKey);
    
    const quantity = isBulk ? item.bulkQuantity || 1 : 1;
    const price = isBulk ? item.bulkPrice || item.price : item.price;
    
    if (existingItem) {
      setCart(cart.map(cartItem =>
        `${cartItem.id}-${cartItem.isBulk ? 'bulk' : 'single'}` === cartKey
          ? { 
              ...cartItem, 
              quantity: cartItem.quantity + quantity,
              total: (cartItem.quantity + quantity) * (cartItem.isBulk ? (cartItem.bulkPrice || cartItem.price) : cartItem.price)
            }
          : cartItem
      ));
    } else {
      setCart([...cart, { 
        ...item, 
        quantity,
        total: price,
        isBulk
      }]);
    }
  };

  const updateQuantity = (cartKey: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(cart.filter(item => `${item.id}-${item.isBulk ? 'bulk' : 'single'}` !== cartKey));
      return;
    }
    
    setCart(cart.map(item => {
      const currentKey = `${item.id}-${item.isBulk ? 'bulk' : 'single'}`;
      if (currentKey === cartKey) {
        const unitPrice = item.isBulk ? (item.bulkPrice || item.price) : item.price;
        return { ...item, quantity, total: quantity * unitPrice };
      }
      return item;
    }));
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + item.total, 0);
  };

  const getDiscountAmount = () => {
    if (customerType === 'school') {
      return getTotalAmount() * 0.1; // 10% school discount
    }
    if (customerType === 'bulk' && getTotalAmount() > 500) {
      return getTotalAmount() * 0.05; // 5% bulk discount
    }
    return 0;
  };

  const handleCheckout = () => {
    console.log('Processing checkout...', {
      cart,
      customerType,
      total: getTotalAmount(),
      discount: getDiscountAmount()
    });
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-indigo-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-indigo-800">Stationery Store POS</h1>
                <p className="text-indigo-600">School & Office Supplies</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Select value={customerType} onValueChange={(value: any) => setCustomerType(value)}>
                <SelectTrigger className="w-32 border-indigo-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">Individual</SelectItem>
                  <SelectItem value="school">School</SelectItem>
                  <SelectItem value="bulk">Bulk</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant={showSchoolItems ? "default" : "outline"}
                size="sm"
                onClick={() => setShowSchoolItems(!showSchoolItems)}
                className={showSchoolItems ? "bg-indigo-500 hover:bg-indigo-600" : "border-indigo-200"}
              >
                <GraduationCap className="mr-2 h-4 w-4" />
                School Items
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Products Section */}
          <div className="lg:col-span-2">
            <Card className="border-indigo-200">
              <CardHeader className="bg-indigo-50 border-b border-indigo-200">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-indigo-800">Stationery Inventory</CardTitle>
                  <Badge className="bg-indigo-100 text-indigo-800">
                    {filteredItems.length} items
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex space-x-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search stationery items..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-indigo-200"
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-40 border-indigo-200">
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
                  <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                    <SelectTrigger className="w-32 border-indigo-200">
                      <SelectValue placeholder="Grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {grades.map(grade => (
                        <SelectItem key={grade} value={grade}>
                          {grade === 'all' ? 'All Grades' : grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 border border-indigo-200 rounded-lg hover:shadow-md transition-shadow bg-white"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-indigo-800">{item.name}</h3>
                            <Badge variant="outline">{item.category}</Badge>
                            {item.isSchoolItem && (
                              <Badge className="bg-blue-100 text-blue-800">School</Badge>
                            )}
                            {item.season !== 'all' && (
                              <Badge variant="secondary">{item.season}</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{item.brand} • {item.description}</p>
                          {item.grade && (
                            <p className="text-xs text-gray-500 mt-1">{item.grade}</p>
                          )}
                          <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-lg text-indigo-600">${item.price}</span>
                              {item.bulkPrice && (
                                <span className="text-sm text-gray-600">
                                  | Bulk: ${item.bulkPrice} ({item.bulkQuantity} pcs)
                                </span>
                              )}
                            </div>
                            <Badge variant={item.stock <= 20 ? 'destructive' : 'default'}>
                              Stock: {item.stock}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Button
                            size="sm"
                            onClick={() => addToCart(item, false)}
                            disabled={item.stock <= 0}
                            className="bg-indigo-500 hover:bg-indigo-600"
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Single
                          </Button>
                          {item.bulkPrice && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => addToCart(item, true)}
                              disabled={item.stock < (item.bulkQuantity || 1)}
                              className="border-indigo-200"
                            >
                              <Package className="mr-2 h-4 w-4" />
                              Add Bulk
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
            <Card className="border-indigo-200">
              <CardHeader className="bg-indigo-50 border-b border-indigo-200">
                <CardTitle className="flex items-center text-indigo-800">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Cart ({cart.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Customer Type:</span>
                    <Badge variant="outline">{customerType}</Badge>
                  </div>
                  {customerType === 'school' && (
                    <div className="text-sm text-green-600">
                      🎓 School discount: 10% off
                    </div>
                  )}
                  {customerType === 'bulk' && getTotalAmount() > 500 && (
                    <div className="text-sm text-green-600">
                      📦 Bulk discount: 5% off
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-indigo-200">
              <CardHeader className="bg-indigo-50 border-b border-indigo-200">
                <CardTitle className="text-indigo-800">Order Items</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {cart.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">Cart is empty</p>
                  ) : (
                    cart.map((item) => {
                      const cartKey = `${item.id}-${item.isBulk ? 'bulk' : 'single'}`;
                      return (
                        <div key={cartKey} className="p-2 bg-indigo-50 rounded-lg border border-indigo-200">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-sm text-indigo-800">{item.name}</h4>
                              <p className="text-xs text-gray-600">
                                {item.brand} • {item.isBulk ? 'Bulk Pack' : 'Single'}
                              </p>
                              <p className="text-xs text-gray-500">
                                ${item.isBulk ? item.bulkPrice : item.price} each
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-indigo-600">${item.total}</div>
                              <div className="flex items-center space-x-1 mt-1">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(cartKey, item.quantity - (item.isBulk ? item.bulkQuantity || 1 : 1))}
                                  className="h-6 w-6 p-0 border-indigo-300"
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="text-xs px-2">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(cartKey, item.quantity + (item.isBulk ? item.bulkQuantity || 1 : 1))}
                                  className="h-6 w-6 p-0 border-indigo-300"
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
              <Card className="border-indigo-200">
                <CardHeader className="bg-indigo-50 border-b border-indigo-200">
                  <CardTitle className="text-lg text-indigo-800">Bill Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${getTotalAmount().toFixed(2)}</span>
                    </div>
                    {getDiscountAmount() > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount:</span>
                        <span>-${getDiscountAmount().toFixed(2)}</span>
                      </div>
                    )}
                    <div className="border-t border-indigo-200 pt-2">
                      <div className="flex justify-between font-bold text-lg text-indigo-800">
                        <span>Total:</span>
                        <span>${(getTotalAmount() - getDiscountAmount()).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <Button className="w-full bg-indigo-500 hover:bg-indigo-600" onClick={handleCheckout}>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Process Sale
                    </Button>
                    <Button variant="outline" className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50">
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