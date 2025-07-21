'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  email: string;
  businessName: string;
  ownerName: string;
  phone: string;
  businessType: string;
  role: 'user' | 'admin' | 'superadmin';
  subscriptionStatus: 'active' | 'inactive' | 'pending';
  fbrEnabled: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if it's admin login
      if (email === 'admin@gmail.com' && password === 'admin123') {
        const adminUser: User = {
          id: 'admin1',
          email,
          businessName: 'JD Desktop Admin',
          ownerName: 'Admin User',
          phone: '+1234567890',
          businessType: 'admin',
          role: 'admin',
          subscriptionStatus: 'active',
          fbrEnabled: true,
        };
        setUser(adminUser);
        localStorage.setItem('user', JSON.stringify(adminUser));
      } else {
        // Mock regular user data for any other email/password
        const mockUser: User = {
          id: '1',
          email,
          businessName: 'Sample Pharmacy',
          ownerName: 'John Doe',
          phone: '+1234567890',
          businessType: 'pharmacy',
          role: 'user',
          subscriptionStatus: 'active',
          fbrEnabled: false,
        };
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
      }
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: any) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockUser: User = {
        id: '1',
        email: userData.email,
        businessName: userData.businessName,
        ownerName: userData.ownerName,
        phone: userData.phone,
        businessType: userData.businessType,
        role: 'user',
        subscriptionStatus: 'pending',
        fbrEnabled: false,
      };

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // Redirect based on current role
    const currentPath = window.location.pathname;
    if (currentPath.startsWith('/admin')) {
      window.location.href = '/admin-login';
    } else {
      window.location.href = '/login';
    }
  };

  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
