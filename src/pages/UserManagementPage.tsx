import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Filter,
  Download,
  Upload,
  User,
  UserCheck,
  UserX,
  Building,
  Briefcase,
  Mail,
  Phone,
  Calendar,
  Shield,
  CheckCircle,
  AlertTriangle,
  Clock,
  X,
  Save
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import AdminLayout from '../components/layout/AdminLayout';

// User interface
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  avatar?: string;
  phone?: string;
  position?: string;
  manager?: string;
  joinDate: string;
  permissions: string[];
}

// Form interface for create/edit
interface UserFormData {
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'active' | 'inactive' | 'pending';
  phone: string;
  position: string;
  manager: string;
}

const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortField, setSortField] = useState<keyof User>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    role: '',
    department: '',
    status: 'active',
    phone: '',
    position: '',
    manager: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data
  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@maxhealth.ae',
        role: 'Sales Manager',
        department: 'Sales',
        status: 'active',
        lastLogin: '2 hours ago',
        phone: '+971 50 123 4567',
        position: 'Senior Sales Manager',
        manager: 'VP Sales',
        joinDate: '2022-03-15',
        permissions: ['view_deals', 'edit_deals', 'manage_team']
      },
      {
        id: '2',
        name: 'Mike Chen',
        email: 'mike.chen@maxhealth.ae',
        role: 'Operations Manager',
        department: 'Operations',
        status: 'active',
        lastLogin: '1 hour ago',
        phone: '+971 50 234 5678',
        position: 'Operations Manager',
        manager: 'COO',
        joinDate: '2021-08-20',
        permissions: ['view_policies', 'edit_policies', 'approve_claims']
      },
      {
        id: '3',
        name: 'Lisa Wang',
        email: 'lisa.wang@maxhealth.ae',
        role: 'Medical Manager',
        department: 'Medical',
        status: 'active',
        lastLogin: '30 min ago',
        phone: '+971 50 345 6789',
        position: 'Medical Director',
        manager: 'Chief Medical Officer',
        joinDate: '2020-11-10',
        permissions: ['view_medical', 'edit_medical', 'approve_medical']
      },
      {
        id: '4',
        name: 'David Kim',
        email: 'david.kim@maxhealth.ae',
        role: 'Finance Manager',
        department: 'Finance',
        status: 'active',
        lastLogin: '3 hours ago',
        phone: '+971 50 456 7890',
        position: 'Finance Manager',
        manager: 'CFO',
        joinDate: '2021-01-05',
        permissions: ['view_financial', 'edit_financial', 'approve_payments']
      },
      {
        id: '5',
        name: 'Ahmed Hassan',
        email: 'ahmed.hassan@maxhealth.ae',
        role: 'Senior Broker',
        department: 'External',
        status: 'active',
        lastLogin: '1 day ago',
        phone: '+971 50 567 8901',
        position: 'Senior Insurance Broker',
        manager: 'Broker Relations Manager',
        joinDate: '2022-06-12',
        permissions: ['view_clients', 'edit_clients', 'create_deals']
      },
      {
        id: '6',
        name: 'Fatima Al-Zahra',
        email: 'fatima.alzahra@maxhealth.ae',
        role: 'Standard Broker',
        department: 'External',
        status: 'pending',
        lastLogin: 'Never',
        phone: '+971 50 678 9012',
        position: 'Insurance Broker',
        manager: 'Broker Relations Manager',
        joinDate: '2023-01-20',
        permissions: ['view_clients', 'create_deals']
      },
      {
        id: '7',
        name: 'John Smith',
        email: 'john.smith@maxhealth.ae',
        role: 'IT Manager',
        department: 'IT',
        status: 'active',
        lastLogin: '4 hours ago',
        phone: '+971 50 789 0123',
        position: 'IT Manager',
        manager: 'CTO',
        joinDate: '2021-12-01',
        permissions: ['view_system', 'edit_system', 'manage_users']
      },
      {
        id: '8',
        name: 'Maria Garcia',
        email: 'maria.garcia@maxhealth.ae',
        role: 'HR Manager',
        department: 'HR',
        status: 'inactive',
        lastLogin: '1 week ago',
        phone: '+971 50 890 1234',
        position: 'HR Manager',
        manager: 'VP HR',
        joinDate: '2020-05-15',
        permissions: ['view_hr', 'edit_hr', 'manage_employees']
      }
    ];
    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
  }, []);

  // Filter and sort users
  useEffect(() => {
    let filtered = users.filter(user => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.department.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole = selectedRole === 'all' || user.role === selectedRole;
      const matchesDepartment = selectedDepartment === 'all' || user.department === selectedDepartment;
      const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;

      return matchesSearch && matchesRole && matchesDepartment && matchesStatus;
    });

    // Sort users
    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      // Handle undefined values
      if (aValue === undefined && bValue === undefined) return 0;
      if (aValue === undefined) return sortDirection === 'asc' ? 1 : -1;
      if (bValue === undefined) return sortDirection === 'asc' ? -1 : 1;

      // Convert to strings for comparison if needed
      const aStr = String(aValue);
      const bStr = String(bValue);

      if (sortDirection === 'asc') {
        return aStr < bStr ? -1 : aStr > bStr ? 1 : 0;
      } else {
        return aStr > bStr ? -1 : aStr < bStr ? 1 : 0;
      }
    });

    setFilteredUsers(filtered);
  }, [users, searchTerm, selectedRole, selectedDepartment, selectedStatus, sortField, sortDirection]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDepartmentIcon = (department: string) => {
    switch (department) {
      case 'Sales':
        return <Briefcase className="h-4 w-4" />;
      case 'Operations':
        return <Building className="h-4 w-4" />;
      case 'Medical':
        return <User className="h-4 w-4" />;
      case 'Finance':
        return <Briefcase className="h-4 w-4" />;
      case 'External':
        return <UserCheck className="h-4 w-4" />;
      case 'IT':
        return <Building className="h-4 w-4" />;
      case 'HR':
        return <Users className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    pendingUsers: users.filter(u => u.status === 'pending').length,
    inactiveUsers: users.filter(u => u.status === 'inactive').length
  };

  // Form handlers
  const handleInputChange = (field: keyof UserFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      role: '',
      department: '',
      status: 'active',
      phone: '',
      position: '',
      manager: ''
    });
  };

  const openAddUserModal = () => {
    resetForm();
    setShowAddUserModal(true);
  };

  const openEditUserModal = (user: User) => {
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      status: user.status,
      phone: user.phone || '',
      position: user.position || '',
      manager: user.manager || ''
    });
    setSelectedUser(user);
    setShowEditUserModal(true);
  };

  const closeModals = () => {
    setShowAddUserModal(false);
    setShowEditUserModal(false);
    setSelectedUser(null);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (showEditUserModal && selectedUser) {
        // Update existing user
        const updatedUsers = users.map(user =>
          user.id === selectedUser.id
            ? {
                ...user,
                name: formData.name,
                email: formData.email,
                role: formData.role,
                department: formData.department,
                status: formData.status,
                phone: formData.phone,
                position: formData.position,
                manager: formData.manager
              }
            : user
        );
        setUsers(updatedUsers);
      } else {
        // Create new user
        const newUser: User = {
          id: Date.now().toString(),
          name: formData.name,
          email: formData.email,
          role: formData.role,
          department: formData.department,
          status: formData.status,
          lastLogin: 'Never',
          phone: formData.phone,
          position: formData.position,
          manager: formData.manager,
          joinDate: new Date().toISOString().split('T')[0],
          permissions: []
        };
        setUsers(prev => [...prev, newUser]);
      }

      closeModals();
    } catch (error) {
      console.error('Error saving user:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout
      title="User Management"
      description="Manage user accounts, roles, and permissions across the MaxHealth CRM system"
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{stats.totalUsers}</div>
                <div className="text-sm text-muted-foreground">Total Users</div>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">{stats.activeUsers}</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <UserCheck className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-yellow-600">{stats.pendingUsers}</div>
                <div className="text-sm text-muted-foreground">Pending Users</div>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-600">{stats.inactiveUsers}</div>
                <div className="text-sm text-muted-foreground">Inactive Users</div>
              </div>
              <UserX className="h-8 w-8 text-gray-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="Sales Manager">Sales Manager</SelectItem>
                  <SelectItem value="Operations Manager">Operations Manager</SelectItem>
                  <SelectItem value="Medical Manager">Medical Manager</SelectItem>
                  <SelectItem value="Finance Manager">Finance Manager</SelectItem>
                  <SelectItem value="Senior Broker">Senior Broker</SelectItem>
                  <SelectItem value="Standard Broker">Standard Broker</SelectItem>
                  <SelectItem value="IT Manager">IT Manager</SelectItem>
                  <SelectItem value="HR Manager">HR Manager</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Medical">Medical</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="External">External</SelectItem>
                  <SelectItem value="IT">IT</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={openAddUserModal}>
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
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
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced Filters
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users List</CardTitle>
          <CardDescription>
            Showing {filteredUsers.length} of {users.length} users
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="p-4 text-left font-medium">User</th>
                  <th className="p-4 text-left font-medium">Role & Department</th>
                  <th className="p-4 text-left font-medium">Status</th>
                  <th className="p-4 text-left font-medium">Last Login</th>
                  <th className="p-4 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-muted/50">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                          {user.phone && (
                            <div className="text-xs text-muted-foreground">{user.phone}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        {getDepartmentIcon(user.department)}
                        <div>
                          <div className="font-medium">{user.role}</div>
                          <div className="text-sm text-muted-foreground">{user.department}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className={getStatusColor(user.status)}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-muted-foreground">{user.lastLogin}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => openEditUserModal(user)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" disabled>
                          <Shield className="h-4 w-4" />
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

      {/* Add/Edit User Modal */}
      {(showAddUserModal || showEditUserModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    {showEditUserModal ? 'Edit User' : 'Add New User'}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {showEditUserModal ? 'Update user information' : 'Create a new user account'}
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={closeModals}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter full name"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter email address"
                    required
                  />
                </div>

                {/* Role */}
                <div className="space-y-2">
                  <Label htmlFor="role">Role *</Label>
                  <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sales Manager">Sales Manager</SelectItem>
                      <SelectItem value="Operations Manager">Operations Manager</SelectItem>
                      <SelectItem value="Medical Manager">Medical Manager</SelectItem>
                      <SelectItem value="Finance Manager">Finance Manager</SelectItem>
                      <SelectItem value="Senior Broker">Senior Broker</SelectItem>
                      <SelectItem value="Standard Broker">Standard Broker</SelectItem>
                      <SelectItem value="IT Manager">IT Manager</SelectItem>
                      <SelectItem value="HR Manager">HR Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Department */}
                <div className="space-y-2">
                  <Label htmlFor="department">Department *</Label>
                  <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="Operations">Operations</SelectItem>
                      <SelectItem value="Medical">Medical</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="External">External</SelectItem>
                      <SelectItem value="IT">IT</SelectItem>
                      <SelectItem value="HR">HR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value as 'active' | 'inactive' | 'pending')}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+971 50 123 4567"
                  />
                </div>

                {/* Position */}
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    placeholder="Enter position title"
                  />
                </div>

                {/* Manager */}
                <div className="space-y-2">
                  <Label htmlFor="manager">Manager</Label>
                  <Input
                    id="manager"
                    value={formData.manager}
                    onChange={(e) => handleInputChange('manager', e.target.value)}
                    placeholder="Enter manager name"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-2 mt-6 pt-6 border-t">
                <Button variant="outline" onClick={closeModals} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  <Save className="h-4 w-4 mr-2" />
                  {isSubmitting ? 'Saving...' : (showEditUserModal ? 'Update User' : 'Create User')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default UserManagementPage;
