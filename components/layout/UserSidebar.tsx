'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Home, 
  ShoppingCart, 
  Package, 
  TrendingUp, 
  Settings, 
  FileText,
  Users
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'POS System', href: '/pos', icon: ShoppingCart },
  { name: 'Inventory', href: '/inventory', icon: Package },
  { name: 'Reports', href: '/reports', icon: TrendingUp },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Profile', href: '/profile', icon: Users },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function UserSidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 pt-16">
      <div className="p-4">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/dashboard' && pathname.startsWith(item.href));
            
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    'w-full justify-start',
                    isActive && 'bg-blue-50 text-blue-600 hover:bg-blue-50'
                  )}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}