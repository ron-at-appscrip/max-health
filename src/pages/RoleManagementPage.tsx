import React, { useState, useEffect } from 'react';
import {
  Shield,
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  Eye,
  Download,
  Upload,
  Users,
  Settings,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  AlertTriangle,
  CheckCircle,
  User,
  LogOut,
  ArrowLeft,
  Globe,
  RefreshCw,
  FileText,
  Lock,
  Unlock,
  UserCheck,
  UserX,
  Building,
  Briefcase,
  Heart,
  DollarSign,
  BarChart3,
  MessageSquare,
  Calendar,
  Clock,
  Zap,
  Filter,
  Save,
  RotateCcw,
  EyeOff
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import AdminLayout from '../components/layout/AdminLayout';

// Role interface
interface Role {
  id: string;
  name: string;
  code: string;
  category: 'internal' | 'external' | 'client' | 'system';
  department: string;
  level: 'executive' | 'manager' | 'specialist' | 'junior' | 'external';
  description: string;
  status: 'active' | 'inactive' | 'deprecated';
  usersCount: number;
  permissionsCount: number;
  reportsTo?: string;
  manages?: string[];
  icon: React.ReactNode;
  color: string;
}

// Permission interface
interface Permission {
  id: string;
  name: string;
  module: string;
  action: 'view' | 'create' | 'edit' | 'delete' | 'export' | 'import' | 'approve' | 'override';
  accessLevel: 'all' | 'department' | 'team' | 'own' | 'restricted' | 'none';
  conditions?: string;
}

const RoleManagementPage: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [filteredRoles, setFilteredRoles] = useState<Role[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateRoleModal, setShowCreateRoleModal] = useState(false);
  const [showPermissionMatrix, setShowPermissionMatrix] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [activeTab, setActiveTab] = useState('roles');

  // Mock data
  useEffect(() => {
    const mockRoles: Role[] = [
      {
        id: '1',
        name: 'System Administrator',
        code: 'SYS_ADMIN',
        category: 'system',
        department: 'IT',
        level: 'executive',
        description: 'Full system access and configuration rights',
        status: 'active',
        usersCount: 3,
        permissionsCount: 247,
        icon: <Settings className="h-5 w-5" />,
        color: 'bg-red-500'
      },
      {
        id: '2',
        name: 'Sales Manager',
        code: 'SALES_MGR',
        category: 'internal',
        department: 'Sales',
        level: 'manager',
        description: 'Oversee sales team operations and performance',
        status: 'active',
        usersCount: 4,
        permissionsCount: 89,
        reportsTo: 'VP Sales',
        icon: <Briefcase className="h-5 w-5" />,
        color: 'bg-blue-500'
      },
      {
        id: '3',
        name: 'Sales Representative',
        code: 'SALES_REP',
        category: 'internal',
        department: 'Sales',
        level: 'specialist',
        description: 'Manage assigned deals and client relationships',
        status: 'active',
        usersCount: 12,
        permissionsCount: 45,
        reportsTo: 'Sales Manager',
        icon: <Users className="h-5 w-5" />,
        color: 'bg-blue-400'
      },
      {
        id: '4',
        name: 'Operations Manager',
        code: 'OPS_MGR',
        category: 'internal',
        department: 'Operations',
        level: 'manager',
        description: 'Oversee policy operations and document management',
        status: 'active',
        usersCount: 3,
        permissionsCount: 76,
        reportsTo: 'COO',
        icon: <Settings className="h-5 w-5" />,
        color: 'bg-green-500'
      },
      {
        id: '5',
        name: 'Medical Manager',
        code: 'MED_MGR',
        category: 'internal',
        department: 'Medical',
        level: 'manager',
        description: 'Oversee medical underwriting and claims processes',
        status: 'active',
        usersCount: 2,
        permissionsCount: 68,
        reportsTo: 'Chief Medical Officer',
        icon: <Heart className="h-5 w-5" />,
        color: 'bg-pink-500'
      },
      {
        id: '6',
        name: 'Finance Manager',
        code: 'FIN_MGR',
        category: 'internal',
        department: 'Finance',
        level: 'manager',
        description: 'Oversee financial operations and accounting',
        status: 'active',
        usersCount: 2,
        permissionsCount: 71,
        reportsTo: 'CFO',
        icon: <DollarSign className="h-5 w-5" />,
        color: 'bg-yellow-500'
      },
      {
        id: '7',
        name: 'Senior Broker',
        code: 'SEN_BROKER',
        category: 'external',
        department: 'External',
        level: 'external',
        description: 'Experienced broker with established client portfolio',
        status: 'active',
        usersCount: 8,
        permissionsCount: 28,
        icon: <UserCheck className="h-5 w-5" />,
        color: 'bg-purple-500'
      },
      {
        id: '8',
        name: 'Standard Broker',
        code: 'STD_BROKER',
        category: 'external',
        department: 'External',
        level: 'external',
        description: 'Regular broker with standard access and features',
        status: 'active',
        usersCount: 15,
        permissionsCount: 22,
        icon: <User className="h-5 w-5" />,
        color: 'bg-purple-400'
      },
      {
        id: '9',
        name: 'Corporate Client',
        code: 'CORP_CLIENT',
        category: 'client',
        department: 'External',
        level: 'external',
        description: 'Company representatives with group policy access',
        status: 'active',
        usersCount: 12,
        permissionsCount: 15,
        icon: <Building className="h-5 w-5" />,
        color: 'bg-indigo-500'
      }
    ];
    setRoles(mockRoles);
    setFilteredRoles(mockRoles);
  }, []);

  // Filter roles
  useEffect(() => {
    let filtered = roles.filter(role => {
      const matchesSearch =
        role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        role.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        role.department.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || role.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    setFilteredRoles(filtered);
  }, [roles, searchTerm, selectedCategory]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'internal':
        return <Building className="h-4 w-4" />;
      case 'external':
        return <UserCheck className="h-4 w-4" />;
      case 'client':
        return <User className="h-4 w-4" />;
      case 'system':
        return <Settings className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'internal':
        return 'bg-blue-100 text-blue-800';
      case 'external':
        return 'bg-purple-100 text-purple-800';
      case 'client':
        return 'bg-indigo-100 text-indigo-800';
      case 'system':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'executive':
        return 'bg-red-100 text-red-800';
      case 'manager':
        return 'bg-orange-100 text-orange-800';
      case 'specialist':
        return 'bg-blue-100 text-blue-800';
      case 'junior':
        return 'bg-green-100 text-green-800';
      case 'external':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'deprecated':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    totalRoles: roles.length,
    activeRoles: roles.filter(r => r.status === 'active').length,
    totalUsers: roles.reduce((sum, role) => sum + role.usersCount, 0),
    totalPermissions: roles.reduce((sum, role) => sum + role.permissionsCount, 0)
  };

  const categoryStats = {
    internal: roles.filter(r => r.category === 'internal').length,
    external: roles.filter(r => r.category === 'external').length,
    client: roles.filter(r => r.category === 'client').length,
    system: roles.filter(r => r.category === 'system').length
  };

  return (
    <AdminLayout
      title="Role & Permission Management"
      description="Define roles, configure permissions, and manage access controls"
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{stats.totalRoles}</div>
                <div className="text-sm text-muted-foreground">Total Roles</div>
              </div>
              <Shield className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">{stats.activeRoles}</div>
                <div className="text-sm text-muted-foreground">Active Roles</div>
              </div>
              <UserCheck className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-600">{stats.totalUsers}</div>
                <div className="text-sm text-muted-foreground">Assigned Users</div>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">{stats.totalPermissions}</div>
                <div className="text-sm text-muted-foreground">Active Permissions</div>
              </div>
              <Lock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Tabs */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('all')}
            className="flex items-center space-x-2"
          >
            <Users className="h-4 w-4" />
            <span>All</span>
            <Badge variant="secondary">{stats.totalRoles}</Badge>
          </Button>
          <Button
            variant={selectedCategory === 'internal' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('internal')}
            className="flex items-center space-x-2"
          >
            <Building className="h-4 w-4" />
            <span>Internal Staff</span>
            <Badge variant="secondary">{categoryStats.internal}</Badge>
          </Button>
          <Button
            variant={selectedCategory === 'external' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('external')}
            className="flex items-center space-x-2"
          >
            <UserCheck className="h-4 w-4" />
            <span>External Brokers</span>
            <Badge variant="secondary">{categoryStats.external}</Badge>
          </Button>
          <Button
            variant={selectedCategory === 'client' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('client')}
            className="flex items-center space-x-2"
          >
            <User className="h-4 w-4" />
            <span>Clients</span>
            <Badge variant="secondary">{categoryStats.client}</Badge>
          </Button>
          <Button
            variant={selectedCategory === 'system' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('system')}
            className="flex items-center space-x-2"
          >
            <Settings className="h-4 w-4" />
            <span>System Roles</span>
            <Badge variant="secondary">{categoryStats.system}</Badge>
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search roles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm" disabled>
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </Button>
                <Button variant="outline" size="sm" disabled>
                  <Copy className="h-4 w-4 mr-2" />
                  Templates
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Roles Table */}
      <Card>
        <CardHeader>
          <CardTitle>Roles List</CardTitle>
          <CardDescription>
            Showing {filteredRoles.length} of {roles.length} roles
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="p-4 text-left font-medium">Role Name</th>
                  <th className="p-4 text-left font-medium">Category</th>
                  <th className="p-4 text-left font-medium">Users</th>
                  <th className="p-4 text-left font-medium">Permissions</th>
                  <th className="p-4 text-left font-medium">Status</th>
                  <th className="p-4 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRoles.map((role) => (
                  <tr key={role.id} className="border-b hover:bg-muted/50">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className={`h-10 w-10 rounded-lg ${role.color} flex items-center justify-center text-white`}>
                          {role.icon}
                        </div>
                        <div>
                          <div className="font-medium">{role.name}</div>
                          <div className="text-sm text-muted-foreground">{role.code}</div>
                          <div className="text-xs text-muted-foreground">{role.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        {getCategoryIcon(role.category)}
                        <Badge className={getCategoryColor(role.category)}>
                          {role.category.charAt(0).toUpperCase() + role.category.slice(1)}
                        </Badge>
                        <Badge className={getLevelColor(role.level)}>
                          {role.level.charAt(0).toUpperCase() + role.level.slice(1)}
                        </Badge>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{role.usersCount}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Lock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{role.permissionsCount}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className={getStatusColor(role.status)}>
                        {role.status.charAt(0).toUpperCase() + role.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setSelectedRole(role);
                            setShowPermissionMatrix(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" disabled>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" disabled>
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" disabled>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Permission Matrix Modal */}
      {showPermissionMatrix && selectedRole && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg shadow-lg max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold flex items-center">
                    {selectedRole.icon}
                    <span className="ml-2">Permission Matrix</span>
                    <span className="ml-2 text-muted-foreground">- {selectedRole.name}</span>
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">{selectedRole.description}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setShowPermissionMatrix(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="p-6">
              {/* Module Permissions */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Module Permissions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { name: 'Dashboard & Analytics', icon: <BarChart3 className="h-4 w-4" />, access: 'full' },
                      { name: 'Deal Management', icon: <Briefcase className="h-4 w-4" />, access: 'full' },
                      { name: 'User Management', icon: <Users className="h-4 w-4" />, access: 'read' },
                      { name: 'Broker Relations', icon: <UserCheck className="h-4 w-4" />, access: 'full' },
                      { name: 'Client Management', icon: <User className="h-4 w-4" />, access: 'full' },
                      { name: 'Policy Management', icon: <FileText className="h-4 w-4" />, access: 'read' },
                      { name: 'Medical & Claims', icon: <Heart className="h-4 w-4" />, access: 'none' },
                      { name: 'Financial Management', icon: <DollarSign className="h-4 w-4" />, access: 'read' },
                      { name: 'Communication Hub', icon: <MessageSquare className="h-4 w-4" />, access: 'full' }
                    ].map((module, index) => (
                      <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              {module.icon}
                              <span className="text-sm font-medium">{module.name}</span>
                            </div>
                            <Badge className={
                              module.access === 'full' ? 'bg-green-100 text-green-800' :
                              module.access === 'read' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }>
                              {module.access.charAt(0).toUpperCase() + module.access.slice(1)}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Data Access Rules */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Data Access Rules</h3>
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium mb-2">Client Data:</h4>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Check className="h-4 w-4 text-green-500" />
                                <span className="text-sm">Can view all client basic information</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Check className="h-4 w-4 text-green-500" />
                                <span className="text-sm">Can view financial summary (premium, commission)</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <X className="h-4 w-4 text-red-500" />
                                <span className="text-sm">Cannot view detailed financial records</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <X className="h-4 w-4 text-red-500" />
                                <span className="text-sm">Cannot view medical information</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Deal Data:</h4>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Check className="h-4 w-4 text-green-500" />
                                <span className="text-sm">Can view all sales team deals</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Check className="h-4 w-4 text-green-500" />
                                <span className="text-sm">Can view deal financial details</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Check className="h-4 w-4 text-green-500" />
                                <span className="text-sm">Can view deal progression and timeline</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <X className="h-4 w-4 text-red-500" />
                                <span className="text-sm">Cannot view medical underwriting details</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Approval Authority */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Approval Authority</h3>
                  <Card>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-3">Approval Limits:</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm">Deal Approval:</span>
                              <span className="text-sm font-medium">AED 500,000</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Discount Authority:</span>
                              <span className="text-sm font-medium">15%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">SLA Extensions:</span>
                              <span className="text-sm font-medium">24 hours</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-3">Additional Permissions:</h4>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span className="text-sm">Can approve team member actions</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span className="text-sm">Can assign team members</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span className="text-sm">Can view performance analytics</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-2 mt-6 pt-6 border-t">
                <Button variant="outline" onClick={() => setShowPermissionMatrix(false)}>
                  Close
                </Button>
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default RoleManagementPage;
