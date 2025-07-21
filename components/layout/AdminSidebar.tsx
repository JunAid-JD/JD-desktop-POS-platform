'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Home, Users, CreditCard, Settings, FileText, BarChart3, Shield, UserCheck } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Dashboard', href: '/admin-dashboard', icon: Home },
  { name: 'Subscriptions', href: '/subscriptions', icon: CreditCard },
  { name: 'FBR Users', href: '/fbr-users', icon: FileText },
  { name: 'User Management', href: '/users', icon: Users },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Payments', href: '/payments', icon: CreditCard },
  { name: 'Access Control', href: '/access-control', icon: Shield },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className='fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 pt-16'>
      <div className='p-4'>
        <div className='mb-4'>
          <h2 className='text-lg font-semibold text-gray-900'>Admin Panel</h2>
          <p className='text-sm text-gray-500'>Manage users and subscriptions</p>
        </div>
        <nav className='space-y-2'>
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));

            return (
              <Link key={item.name} href={item.href}>
                <Button variant='ghost' className={cn('w-full justify-start', isActive && 'bg-blue-50 text-blue-600 hover:bg-blue-50')}>
                  <item.icon className='mr-2 h-4 w-4' />
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
