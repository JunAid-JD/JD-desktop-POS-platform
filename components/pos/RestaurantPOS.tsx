'use client';

import { useState } from 'react';
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
  Clock,
  Users,
  Printer,
  Car,
  Home,
  ChefHat
} from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image?: string;
  prepTime: number; // in minutes
  available: boolean;
  isVeg: boolean;
  isSpicy: boolean;
}

interface OrderItem extends MenuItem {
  quantity: number;
  total: number;
  instructions?: string;
}

interface Table {
  id: string;
  number: number;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved';
  currentOrder?: OrderItem[];
}

const mockMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Chicken Biryani',
    category: 'Main Course',
    price: 299,
    description: 'Aromatic basmati rice with spiced chicken',
    prepTime: 25,
    available: true,
    isVeg: false,
    isSpicy: true,
    image: 'https://images.pexels.com/photos/11543467/pexels-photo-11543467.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '2',
    name: 'Margherita Pizza',
    category: 'Pizza',
    price: 399,
    description: 'Fresh tomato sauce, mozzarella, and basil',
    prepTime: 15,
    available: true,
    isVeg: true,
    isSpicy: false,
    image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: '3',
    name: 'Butter Chicken',
    category: 'Main Course',
    price: 349,
    description: 'Creamy tomato-based curry with tender chicken',
    prepTime: 20,
    available: true,
    isVeg: false,
    isSpicy: true
  },
  {
    id: '4',
    name: 'Paneer Tikka',
    category: 'Starters',
    price: 249,
    description: 'Grilled cottage cheese with spices',
    prepTime: 12,
    available: true,
    isVeg: true,
    isSpicy: true
  },
  {
    id: '5',
    name: 'Chocolate Brownie',
    category: 'Desserts',
    price: 149,
    description: 'Rich chocolate brownie with vanilla ice cream',
    prepTime: 5,
    available: true,
    isVeg: true,
    isSpicy: false
  },
  {
    id: '6',
    name: 'Fresh Lime Soda',
    category: 'Beverages',
    price: 79,
    description: 'Refreshing lime soda with mint',
    prepTime: 3,
    available: true,
    isVeg: true,
    isSpicy: false
  }
];

const mockTables: Table[] = [
  { id: '1', number: 1, capacity: 4, status: 'available' },
  { id: '2', number: 2, capacity: 2, status: 'occupied' },
  { id: '3', number: 3, capacity: 6, status: 'available' },
  { id: '4', number: 4, capacity: 4, status: 'reserved' },
  { id: '5', number: 5, capacity: 8, status: 'available' },
  { id: '6', number: 6, capacity: 2, status: 'occupied' }
];

export function RestaurantPOS() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(mockMenuItems);
  const [tables, setTables] = useState<Table[]>(mockTables);
  const [currentOrder, setCurrentOrder] = useState<OrderItem[]>([]);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway' | 'delivery'>('dine-in');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(menuItems.map(item => item.category)))];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory && item.available;
  });

  const addToOrder = (item: MenuItem) => {
    const existingItem = currentOrder.find(orderItem => orderItem.id === item.id);
    
    if (existingItem) {
      setCurrentOrder(currentOrder.map(orderItem =>
        orderItem.id === item.id
          ? { ...orderItem, quantity: orderItem.quantity + 1, total: (orderItem.quantity + 1) * orderItem.price }
          : orderItem
      ));
    } else {
      setCurrentOrder([...currentOrder, { ...item, quantity: 1, total: item.price }]);
    }
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setCurrentOrder(currentOrder.filter(item => item.id !== itemId));
      return;
    }
    
    setCurrentOrder(currentOrder.map(item =>
      item.id === itemId
        ? { ...item, quantity, total: quantity * item.price }
        : item
    ));
  };

  const getTotalAmount = () => {
    return currentOrder.reduce((total, item) => total + item.total, 0);
  };

  const getTotalPrepTime = () => {
    return Math.max(...currentOrder.map(item => item.prepTime));
  };

  const selectTable = (table: Table) => {
    if (table.status === 'available') {
      setSelectedTable(table);
      setOrderType('dine-in');
    }
  };

  const handlePlaceOrder = () => {
    if (orderType === 'dine-in' && selectedTable) {
      // Update table status
      setTables(tables.map(table =>
        table.id === selectedTable.id
          ? { ...table, status: 'occupied', currentOrder: [...currentOrder] }
          : table
      ));
    }
    
    console.log('Order placed:', {
      orderType,
      table: selectedTable,
      items: currentOrder,
      total: getTotalAmount(),
      prepTime: getTotalPrepTime()
    });
    
    // Reset order
    setCurrentOrder([]);
    setSelectedTable(null);
  };

  const getTableStatusColor = (status: Table['status']) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 border-green-300';
      case 'occupied': return 'bg-red-100 text-red-800 border-red-300';
      case 'reserved': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-orange-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                <ChefHat className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-orange-800">Restaurant POS</h1>
                <p className="text-orange-600">Food & Beverage Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex space-x-2">
                <Button
                  variant={orderType === 'dine-in' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setOrderType('dine-in')}
                  className={orderType === 'dine-in' ? "bg-orange-500 hover:bg-orange-600" : "border-orange-200"}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Dine-In
                </Button>
                <Button
                  variant={orderType === 'takeaway' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setOrderType('takeaway')}
                  className={orderType === 'takeaway' ? "bg-orange-500 hover:bg-orange-600" : "border-orange-200"}
                >
                  <Package className="mr-2 h-4 w-4" />
                  Takeaway
                </Button>
                <Button
                  variant={orderType === 'delivery' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setOrderType('delivery')}
                  className={orderType === 'delivery' ? "bg-orange-500 hover:bg-orange-600" : "border-orange-200"}
                >
                  <Car className="mr-2 h-4 w-4" />
                  Delivery
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="menu" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="tables">Tables</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <TabsContent value="menu">
                <Card className="border-orange-200">
                  <CardHeader className="bg-orange-50 border-b border-orange-200">
                    <CardTitle className="text-orange-800">Menu</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex space-x-4 mb-6">
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search menu items..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 border-orange-200"
                        />
                      </div>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-3 py-2 border border-orange-200 rounded-md text-sm"
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>
                            {category === 'all' ? 'All Categories' : category}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                      {filteredItems.map((item) => (
                        <div
                          key={item.id}
                          className="p-4 border border-orange-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer bg-white"
                          onClick={() => addToOrder(item)}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                              {item.image ? (
                                <img 
                                  src={item.image} 
                                  alt={item.name}
                                  className="w-full h-full object-cover rounded-lg"
                                />
                              ) : (
                                <Package className="h-8 w-8 text-gray-400" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-orange-800">{item.name}</h3>
                                <div className="flex items-center space-x-1">
                                  {item.isVeg && <Badge className="bg-green-100 text-green-800">Veg</Badge>}
                                  {item.isSpicy && <Badge className="bg-red-100 text-red-800">Spicy</Badge>}
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="font-bold text-lg text-orange-600">${item.price}</span>
                                <div className="flex items-center space-x-2">
                                  <Clock className="h-4 w-4 text-gray-400" />
                                  <span className="text-sm text-gray-600">{item.prepTime} min</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tables">
                <Card className="border-orange-200">
                  <CardHeader className="bg-orange-50 border-b border-orange-200">
                    <CardTitle className="text-orange-800">Table Management</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {tables.map((table) => (
                        <div
                          key={table.id}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            getTableStatusColor(table.status)
                          } ${selectedTable?.id === table.id ? 'ring-2 ring-orange-500' : ''}`}
                          onClick={() => selectTable(table)}
                        >
                          <div className="text-center">
                            <div className="text-2xl font-bold">Table {table.number}</div>
                            <div className="text-sm">Capacity: {table.capacity}</div>
                            <div className="text-sm capitalize mt-1">{table.status}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders">
                <Card className="border-orange-200">
                  <CardHeader className="bg-orange-50 border-b border-orange-200">
                    <CardTitle className="text-orange-800">Active Orders</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {tables.filter(table => table.status === 'occupied' && table.currentOrder).map((table) => (
                        <div key={table.id} className="p-4 bg-white border border-orange-200 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-orange-800">Table {table.number}</h3>
                            <Badge className="bg-orange-100 text-orange-800">In Progress</Badge>
                          </div>
                          <div className="space-y-1">
                            {table.currentOrder?.map((item, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span>{item.quantity}x {item.name}</span>
                                <span>${item.total}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card className="border-orange-200">
                <CardHeader className="bg-orange-50 border-b border-orange-200">
                  <CardTitle className="flex items-center text-orange-800">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Current Order
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Order Type:</span>
                      <Badge variant="outline">{orderType}</Badge>
                    </div>
                    {selectedTable && (
                      <div className="flex items-center justify-between text-sm">
                        <span>Table:</span>
                        <span>{selectedTable.number}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-200">
                <CardHeader className="bg-orange-50 border-b border-orange-200">
                  <CardTitle className="text-orange-800">Order Items ({currentOrder.length})</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {currentOrder.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">No items in order</p>
                    ) : (
                      currentOrder.map((item) => (
                        <div key={item.id} className="p-2 bg-orange-50 rounded-lg border border-orange-200">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-sm text-orange-800">{item.name}</h4>
                              <p className="text-xs text-gray-600">{item.category}</p>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-orange-600">${item.total}</div>
                              <div className="flex items-center space-x-1 mt-1">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="h-6 w-6 p-0 border-orange-300"
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="text-xs px-2">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="h-6 w-6 p-0 border-orange-300"
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

              {currentOrder.length > 0 && (
                <Card className="border-orange-200">
                  <CardHeader className="bg-orange-50 border-b border-orange-200">
                    <CardTitle className="text-lg text-orange-800">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Total Items:</span>
                        <span>{currentOrder.reduce((total, item) => total + item.quantity, 0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Prep Time:</span>
                        <span>{getTotalPrepTime()} min</span>
                      </div>
                      <div className="border-t border-orange-200 pt-2">
                        <div className="flex justify-between font-bold text-lg text-orange-800">
                          <span>Total:</span>
                          <span>${getTotalAmount()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <Button 
                        className="w-full bg-orange-500 hover:bg-orange-600" 
                        onClick={handlePlaceOrder}
                        disabled={orderType === 'dine-in' && !selectedTable}
                      >
                        <ChefHat className="mr-2 h-4 w-4" />
                        Place Order
                      </Button>
                      <Button variant="outline" className="w-full border-orange-200 text-orange-700 hover:bg-orange-50">
                        <Printer className="mr-2 h-4 w-4" />
                        Print KOT
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
}