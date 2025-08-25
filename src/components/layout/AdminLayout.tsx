import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  BarChart3,
  Users,
  Settings,
  Shield,
  Globe,
  Activity,
  Mail,
  Lock,
  FileText,
  Bell,
  RefreshCw,
  LogOut,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  WifiOff,
  Plus,
  TrendingUp,
  DollarSign,
  UserCheck,
  Building,
  Briefcase,
  Heart,
  MessageSquare,
  Calendar,
  Clock,
  Zap,
  Home,
  User,
  Database,
  Workflow,
  BellRing,
  BarChart,
  Cog,
  Key,
  FileSpreadsheet,
  Network,
  Palette,
  Languages,
  Monitor,
  Server,
  HardDrive,
  Cloud,
  Smartphone,
  Tablet,
  Laptop
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

// RTL Support Hook
const useRTL = () => {
  const [isRTL, setIsRTL] = useState(false);
  
  useEffect(() => {
    const savedRTL = localStorage.getItem('admin-rtl');
    if (savedRTL) {
      setIsRTL(savedRTL === 'true');
    } else {
      const lang = navigator.language || navigator.languages[0];
      setIsRTL(['ar', 'he', 'fa', 'ur'].includes(lang.split('-')[0]));
    }
  }, []);

  const toggleRTL = () => {
    const newRTL = !isRTL;
    setIsRTL(newRTL);
    localStorage.setItem('admin-rtl', newRTL.toString());
    document.documentElement.dir = newRTL ? 'rtl' : 'ltr';
  };

  return { isRTL, toggleRTL };
};

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title, description }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isRTL, toggleRTL } = useRTL();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('light');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(isRTL ? 'ar-SA' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(isRTL ? 'ar-SA' : 'en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Sidebar navigation items
  const sidebarItems = [
    {
      id: 'dashboard',
      title: isRTL ? 'لوحة التحكم' : 'Dashboard',
      icon: <Home className="h-5 w-5" />,
      route: '/admin',
      badge: null,
      enabled: true
    },
    {
      id: 'users',
      title: isRTL ? 'إدارة المستخدمين' : 'User Management',
      icon: <Users className="h-5 w-5" />,
      route: '/admin/users',
      badge: null,
      enabled: true
    },
    {
      id: 'roles',
      title: isRTL ? 'الأدوار والصلاحيات' : 'Roles & Permissions',
      icon: <Shield className="h-5 w-5" />,
      route: '/admin/roles',
      badge: null,
      enabled: true
    },
    {
      id: 'system',
      title: isRTL ? 'إعدادات النظام' : 'System Config',
      icon: <Settings className="h-5 w-5" />,
      route: '/admin/config',
      badge: null,
      enabled: false
    },
    {
      id: 'integrations',
      title: isRTL ? 'التكاملات' : 'Integrations',
      icon: <Network className="h-5 w-5" />,
      route: '/admin/integrations',
      badge: null,
      enabled: false
    },
    {
      id: 'workflows',
      title: isRTL ? 'سير العمل' : 'Workflows',
      icon: <Workflow className="h-5 w-5" />,
      route: '/admin/workflows',
      badge: null,
      enabled: false
    },
    {
      id: 'notifications',
      title: isRTL ? 'الإشعارات' : 'Notifications',
      icon: <BellRing className="h-5 w-5" />,
      route: '/admin/notifications',
      badge: '3',
      enabled: false
    },
    {
      id: 'data',
      title: isRTL ? 'البيانات والتحليلات' : 'Data & Analytics',
      icon: <BarChart className="h-5 w-5" />,
      route: '/admin/data',
      badge: null,
      enabled: false
    },
    {
      id: 'security',
      title: isRTL ? 'الأمان' : 'Security',
      icon: <Key className="h-5 w-5" />,
      route: '/admin/security',
      badge: null,
      enabled: false
    },
    {
      id: 'templates',
      title: isRTL ? 'القوالب' : 'Templates',
      icon: <FileSpreadsheet className="h-5 w-5" />,
      route: '/admin/templates',
      badge: null,
      enabled: false
    }
  ];

  const isActiveRoute = (route: string) => {
    return location.pathname === route;
  };

  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-background border-r z-40 transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              {!sidebarCollapsed && (
                <div className="flex items-center space-x-2">
                  <img 
                    src="/maxhealth logo.png" 
                    alt="MaxHealth Logo" 
                    className="h-8 w-auto"
                  />
                
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-1"
              >
                <ChevronRight className={`h-4 w-4 transition-transform ${!sidebarCollapsed ? 'rotate-180' : ''}`} />
              </Button>
            </div>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {sidebarItems.map((item) => (
              <Button
                key={item.id}
                variant={isActiveRoute(item.route) ? 'default' : 'ghost'}
                className={`w-full justify-start ${sidebarCollapsed ? 'px-2' : 'px-4'} ${!item.enabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => item.enabled && navigate(item.route)}
                disabled={!item.enabled}
              >
                <div className="flex items-center space-x-3">
                  {item.icon}
                  {!sidebarCollapsed && (
                    <>
                      <span className="flex-1 text-left">{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                      {!item.enabled && (
                        <Badge variant="outline" className="ml-auto text-xs">
                          {isRTL ? 'قريباً' : 'Soon'}
                        </Badge>
                      )}
                    </>
                  )}
                </div>
              </Button>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t">
            <div className="space-y-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleRTL}
                className={`w-full justify-start ${sidebarCollapsed ? 'px-2' : 'px-4'}`}
              >
                <Globe className="h-5 w-5" />
                {!sidebarCollapsed && (
                  <span className="ml-3">{isRTL ? 'LTR' : 'RTL'}</span>
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className={`w-full justify-start ${sidebarCollapsed ? 'px-2' : 'px-4'}`}
              >
                <LogOut className="h-5 w-5" />
                {!sidebarCollapsed && (
                  <span className="ml-3">{isRTL ? 'تسجيل الخروج' : 'Logout'}</span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center space-x-4">
                <div>
                  <span className="text-xl font-bold">
                    {isRTL ? "نظام إدارة العملاء - لوحة الإدارة" : "MaxHealth CRM - Admin Dashboard"}
                  </span>
                  <div className="text-sm text-muted-foreground">
                    {formatDate(currentTime)} | {formatTime(currentTime)} GST
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Theme Toggle */}
         

                {/* Notifications */}
                <Button variant="outline" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
                    3
                  </Badge>
                </Button>

                {/* Refresh */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                >
                  <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                </Button>

                <div className="text-right">
                  <div className="text-sm font-medium">
                    {isRTL ? "جون أدمن" : "John Admin"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {isRTL ? "مدير النظام" : "System Administrator"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {title && (
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">{title}</h1>
              {description && (
                <p className="text-muted-foreground">{description}</p>
              )}
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
