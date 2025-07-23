'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Store, 
  Palette, 
  Package, 
  ArrowRight, 
  Plus,
  Trash2
} from 'lucide-react';

const businessTypes = [
  { value: 'pharmacy', label: 'Pharmacy / Medical Store', icon: '💊' },
  { value: 'grocery', label: 'Grocery Store', icon: '🛒' },
  { value: 'clothing', label: 'Clothing / Garments', icon: '👕' },
  { value: 'electronics', label: 'Electronics / Mobile Shop', icon: '📱' },
  { value: 'restaurant', label: 'Restaurant / Takeaway', icon: '🍽️' },
  { value: 'stationery', label: 'Stationery Store', icon: '✏️' },
  { value: 'mobile', label: 'Mobile/Accessories', icon: '📱' },
];

const themes = [
  { id: 'green', name: 'Green Theme', primary: '#22c55e', secondary: '#16a34a' },
  { id: 'blue', name: 'Blue Theme', primary: '#3b82f6', secondary: '#1d4ed8' },
  { id: 'purple', name: 'Purple Theme', primary: '#8b5cf6', secondary: '#7c3aed' },
  { id: 'orange', name: 'Orange Theme', primary: '#f97316', secondary: '#ea580c' },
];

interface OnboardingData {
  businessName: string;
  businessType: string;
  phone: string;
  address: string;
  selectedTheme: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    category: string;
  }>;
}

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    businessName: '',
    businessType: '',
    phone: '',
    address: '',
    selectedTheme: 'green',
    items: []
  });
  const [newItem, setNewItem] = useState({ name: '', price: '', category: '' });
  const { user } = useAuth();
  const router = useRouter();

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      console.log('Onboarding completed:', data);
      // Update user data in context
      // Redirect to specific POS based on business type
      router.push(`/pos/${data.businessType}`);
    }
  };

  const handleAddItem = () => {
    if (newItem.name && newItem.price && newItem.category) {
      const item = {
        id: Date.now().toString(),
        name: newItem.name,
        price: parseFloat(newItem.price),
        category: newItem.category
      };
      setData({ ...data, items: [...data.items, item] });
      setNewItem({ name: '', price: '', category: '' });
    }
  };

  const handleRemoveItem = (id: string) => {
    setData({ ...data, items: data.items.filter(item => item.id !== id) });
  };

  const selectedBusiness = businessTypes.find(b => b.value === data.businessType);
  const selectedThemeData = themes.find(t => t.id === data.selectedTheme);

  return (
    <div className="min-h-screen nexus-bg p-4">
      <div className="nexus-circles">
        <div className="nexus-circle"></div>
        <div className="nexus-circle"></div>
        <div className="nexus-circle"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome to NEXUS DESKTOP</h1>
          <p className="text-white/80">Let's set up your business in a few simple steps</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= stepNum ? 'bg-green-500 text-white' : 'bg-white/20 text-white/60'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 4 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step > stepNum ? 'bg-green-500' : 'bg-white/20'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card className="glass-card border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">
              {step === 1 && 'Business Information'}
              {step === 2 && 'Select Your Business Type'}
              {step === 3 && 'Choose Your Theme'}
              {step === 4 && 'Add Your Products'}
            </CardTitle>
            <CardDescription className="text-white/80">
              {step === 1 && 'Tell us about your business'}
              {step === 2 && 'Choose the POS module that fits your business'}
              {step === 3 && 'Pick a theme that represents your brand'}
              {step === 4 && 'Add some initial products to get started'}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            {/* Step 1: Business Information */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="businessName" className="text-white">Business Name</Label>
                  <Input
                    id="businessName"
                    className="glass-input border-white/20 text-white placeholder:text-white/70"
                    placeholder="Enter your business name"
                    value={data.businessName}
                    onChange={(e) => setData({ ...data, businessName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">Phone Number</Label>
                  <Input
                    id="phone"
                    className="glass-input border-white/20 text-white placeholder:text-white/70"
                    placeholder="Enter your phone number"
                    value={data.phone}
                    onChange={(e) => setData({ ...data, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-white">Business Address</Label>
                  <Textarea
                    id="address"
                    className="glass-input border-white/20 text-white placeholder:text-white/70"
                    placeholder="Enter your business address"
                    value={data.address}
                    onChange={(e) => setData({ ...data, address: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Business Type Selection */}
            {step === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {businessTypes.map((business) => (
                  <div
                    key={business.value}
                    className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                      data.businessType === business.value
                        ? 'border-green-400 bg-green-500/20'
                        : 'border-white/20 bg-white/10 hover:border-white/40'
                    }`}
                    onClick={() => setData({ ...data, businessType: business.value })}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-3">{business.icon}</div>
                      <h3 className="text-white font-semibold mb-2">{business.label}</h3>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Step 3: Theme Selection */}
            {step === 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {themes.map((theme) => (
                  <div
                    key={theme.id}
                    className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                      data.selectedTheme === theme.id
                        ? 'border-green-400 bg-green-500/20'
                        : 'border-white/20 bg-white/10 hover:border-white/40'
                    }`}
                    onClick={() => setData({ ...data, selectedTheme: theme.id })}
                  >
                    <div className="text-center">
                      <div className="flex justify-center space-x-2 mb-4">
                        <div 
                          className="w-8 h-8 rounded-full"
                          style={{ backgroundColor: theme.primary }}
                        />
                        <div 
                          className="w-8 h-8 rounded-full"
                          style={{ backgroundColor: theme.secondary }}
                        />
                      </div>
                      <h3 className="text-white font-semibold">{theme.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Step 4: Add Products */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white">Product Name</Label>
                    <Input
                      className="glass-input border-white/20 text-white placeholder:text-white/70"
                      placeholder="Enter product name"
                      value={newItem.name}
                      onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Price</Label>
                    <Input
                      type="number"
                      className="glass-input border-white/20 text-white placeholder:text-white/70"
                      placeholder="0.00"
                      value={newItem.price}
                      onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Category</Label>
                    <Input
                      className="glass-input border-white/20 text-white placeholder:text-white/70"
                      placeholder="Enter category"
                      value={newItem.category}
                      onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    />
                  </div>
                </div>
                <Button onClick={handleAddItem} className="bg-green-500 hover:bg-green-600">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </Button>

                {data.items.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-white font-semibold">Added Products ({data.items.length})</h4>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {data.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                          <div className="text-white">
                            <span className="font-medium">{item.name}</span>
                            <span className="text-white/70 ml-2">${item.price}</span>
                            <Badge variant="outline" className="ml-2 text-xs">{item.category}</Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                disabled={step === 1}
                className="border-white/20 text-white hover:bg-white/10"
              >
                Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={
                  (step === 1 && !data.businessName) ||
                  (step === 2 && !data.businessType) ||
                  (step === 3 && !data.selectedTheme)
                }
                className="bg-green-500 hover:bg-green-600"
              >
                {step === 4 ? 'Complete Setup' : 'Next'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}