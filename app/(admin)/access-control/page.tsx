'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { 
  Shield, 
  Users, 
  Key, 
  Lock, 
  Unlock,
  Settings,
  UserCheck,
  AlertTriangle
} from 'lucide-react';

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
  enabled: boolean;
}

interface Role {
  id: string;
  name: string;
  description: string;
  userCount: number;
  permissions: string[];
}

const mockPermissions: Permission[] = [
  {
    id: '1',
    name: 'View Dashboard',
    description: 'Access to main dashboard',
    category: 'Dashboard',
    enabled: true
  },
  {
    id: '2',
    name: 'Manage Users',
    description: 'Create, edit, and delete users',
    category: 'User Management',
    enabled: true
  },
  {
    id: '3',
    name: 'Approve Subscriptions',
    description: 'Approve or reject subscription requests',
    category: 'Subscriptions',
    enabled: true
  },
  {
    id: '4',
    name: 'FBR Management',
    description: 'Manage FBR integrations and users',
    category: 'FBR',
    enabled: false
  },
  {
    id: '5',
    name: 'Payment Processing',
    description: 'Process and manage payments',
    category: 'Payments',
    enabled: true
  }
];

const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Super Admin',
    description: 'Full system access',
    userCount: 2,
    permissions: ['1', '2', '3', '4', '5']
  },
  {
    id: '2',
    name: 'Admin',
    description: 'Standard admin access',
    userCount: 5,
    permissions: ['1', '2', '3', '5']
  },
  {
    id: '3',
    name: 'Support',
    description: 'Customer support access',
    userCount: 8,
    permissions: ['1', '2']
  }
];

export default function AdminAccessControl() {
  const [permissions, setPermissions] = useState<Permission[]>(mockPermissions);
  const [roles, setRoles] = useState<Role[]>(mockRoles);

  const togglePermission = (permissionId: string) => {
    setPermissions(permissions.map(permission =>
      permission.id === permissionId
        ? { ...permission, enabled: !permission.enabled }
        : permission
    ));
  };

  const getPermissionsByCategory = () => {
    const categories: { [key: string]: Permission[] } = {};
    permissions.forEach(permission => {
      if (!categories[permission.category]) {
        categories[permission.category] = [];
      }
      categories[permission.category].push(permission);
    });
    return categories;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Access Control</h1>
          <p className="text-gray-600">Manage user roles and permissions</p>
        </div>
        <div className="flex space-x-4">
          <Button variant="outline">
            <UserCheck className="mr-2 h-4 w-4" />
            Add Role
          </Button>
          <Button>
            <Shield className="mr-2 h-4 w-4" />
            Security Settings
          </Button>
        </div>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Roles</p>
                <p className="text-2xl font-bold">{roles.length}</p>
              </div>
              <Key className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Permissions</p>
                <p className="text-2xl font-bold">{permissions.filter(p => p.enabled).length}</p>
              </div>
              <Unlock className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Admin Users</p>
                <p className="text-2xl font-bold">{roles.reduce((sum, role) => sum + role.userCount, 0)}</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Security Level</p>
                <p className="text-2xl font-bold">High</p>
              </div>
              <Shield className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Roles Management */}
        <Card>
          <CardHeader>
            <CardTitle>User Roles</CardTitle>
            <CardDescription>Manage user roles and their access levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roles.map((role) => (
                <div key={role.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-semibold">{role.name}</h3>
                      <p className="text-sm text-gray-600">{role.description}</p>
                    </div>
                    <Badge variant="outline">{role.userCount} users</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {role.permissions.length} permissions assigned
                    </span>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Users className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Permissions Management */}
        <Card>
          <CardHeader>
            <CardTitle>System Permissions</CardTitle>
            <CardDescription>Configure system-wide permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(getPermissionsByCategory()).map(([category, categoryPermissions]) => (
                <div key={category}>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Lock className="h-4 w-4 mr-2" />
                    {category}
                  </h4>
                  <div className="space-y-3 ml-6">
                    {categoryPermissions.map((permission) => (
                      <div key={permission.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium">{permission.name}</div>
                          <div className="text-sm text-gray-600">{permission.description}</div>
                        </div>
                        <Switch
                          checked={permission.enabled}
                          onCheckedChange={() => togglePermission(permission.id)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
            Security Alerts
          </CardTitle>
          <CardDescription>Recent security events and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <div className="flex-1">
                <p className="font-medium">FBR Permission Disabled</p>
                <p className="text-sm text-gray-600">FBR management permission is currently disabled system-wide</p>
              </div>
              <Button variant="outline" size="sm">Review</Button>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <Shield className="h-5 w-5 text-green-500" />
              <div className="flex-1">
                <p className="font-medium">Security Update Applied</p>
                <p className="text-sm text-gray-600">Latest security patches have been applied successfully</p>
              </div>
              <Badge className="bg-green-100 text-green-800">Resolved</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}