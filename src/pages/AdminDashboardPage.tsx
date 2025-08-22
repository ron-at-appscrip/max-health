import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  UserCheck,
  Briefcase,
  Clock,
  AlertTriangle,
  CheckCircle,
  Zap,
  Activity,
  FileText,
  Settings,
  Shield
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import AdminLayout from '../components/layout/AdminLayout';

const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Mock data for dashboard
  const systemStats = {
    totalUsers: 247,
    activeUsers: 189,
    totalDeals: 1234,
    pendingApprovals: 23,
    systemHealth: 'excellent',
    uptime: '99.9%',
    lastBackup: '2 hours ago',
    storageUsed: '67%'
  };

  const criticalAlerts = [
    {
      id: 1,
      type: 'warning',
      message: '3 deals require urgent approval',
      time: '5 min ago'
    },
    {
      id: 2,
      type: 'error',
      message: 'TPA connection failed',
      time: '15 min ago'
    },
    {
      id: 3,
      type: 'info',
      message: 'System update completed successfully',
      time: '1 hour ago'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'New user created',
      user: 'Sarah Johnson',
      status: 'completed',
      time: '2 min ago'
    },
    {
      id: 2,
      type: 'Permissions updated',
      user: 'Mike Chen',
      status: 'completed',
      time: '5 min ago'
    },
    {
      id: 3,
      type: 'Notification sent',
      user: 'Admin System',
      status: 'completed',
      time: '10 min ago'
    },
    {
      id: 4,
      type: 'Data exported',
      user: 'Lisa Wang',
      status: 'completed',
      time: '15 min ago'
    },
    {
      id: 5,
      type: 'Report generated',
      user: 'David Kim',
      status: 'completed',
      time: '20 min ago'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'disconnected':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'info':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <AdminLayout
      title="Admin Dashboard"
      description="Central command center for monitoring CRM system and managing administrative tasks"
    >
      {/* System Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{systemStats.totalUsers}</div>
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
                <div className="text-2xl font-bold text-green-600">{systemStats.activeUsers}</div>
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
                <div className="text-2xl font-bold text-purple-600">{systemStats.totalDeals}</div>
                <div className="text-sm text-muted-foreground">Total Deals</div>
              </div>
              <Briefcase className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">{systemStats.pendingApprovals}</div>
                <div className="text-sm text-muted-foreground">Pending Approvals</div>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Critical Alerts and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Critical Alerts */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
              Critical Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {criticalAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getAlertIcon(alert.type)}
                    <div>
                      <div className="text-sm font-medium">{alert.message}</div>
                      <div className="text-xs text-muted-foreground">{alert.time}</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Admin Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-5 w-5 mr-2" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
                             <div className="space-y-3">
                   <Button className="w-full justify-start" onClick={() => navigate('/admin/users')}>
                     <Users className="h-4 w-4 mr-2" />
                     Add User
                   </Button>
                   <Button className="w-full justify-start" variant="outline" onClick={() => navigate('/admin/roles')}>
                     <Shield className="h-4 w-4 mr-2" />
                     Manage Roles
                   </Button>
                   <Button className="w-full justify-start" variant="outline" disabled>
                     <FileText className="h-4 w-4 mr-2" />
                     Generate Report
                   </Button>
                   <Button className="w-full justify-start" variant="outline" disabled>
                     <Settings className="h-4 w-4 mr-2" />
                     System Settings
                   </Button>
                 </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status and Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">System Health:</span>
                <Badge className="bg-green-100 text-green-800">
                  Excellent
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Uptime:</span>
                <span className="text-sm font-medium">{systemStats.uptime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Last Backup:</span>
                <span className="text-sm font-medium">{systemStats.lastBackup}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Storage Used:</span>
                <span className="text-sm font-medium">{systemStats.storageUsed}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(activity.status)}
                    <div>
                      <div className="text-sm font-medium">{activity.type}</div>
                      <div className="text-xs text-muted-foreground">{activity.user}</div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
