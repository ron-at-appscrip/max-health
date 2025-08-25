import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  BarChart3,
  Users,
  Settings,
  Shield,
  LogOut,
  ChevronRight,
  CheckCircle,
  Plus,
  FileText,
  CreditCard,
  Archive,
  Download,
  BarChart3 as Reports,
  Newspaper,
  BookOpen,
  FolderOpen,
  UserPlus,
  Bell,
  User,
  ArrowUpRight,
  Menu
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface BrokerLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const BrokerLayout: React.FC<BrokerLayoutProps> = ({ children, title, description }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [expandedSections, setExpandedSections] = useState<string[]>(['case-management']);

  const handleLogout = () => {
    console.log('Logout clicked');
    navigate('/login');
  };

  const handleNavigation = (section: string, item: string) => {
    setActiveSection(item);
    
    // Handle navigation based on item
    switch (item) {
      case 'dashboard':
        navigate('/dashboard');
        break;
      case 'active-case':
        navigate('/cases/active');
        break;
      case 'archive-case':
        navigate('/cases/archive');
        break;
      case 'new-case':
        navigate('/cases/new');
        break;
      case 'payments':
        navigate('/payments');
        break;
      case 'reports':
        navigate('/reports');
        break;
      case 'downloads':
        navigate('/downloads');
        break;
      case 'plan-parameters':
        navigate('/plans/parameters');
        break;
      case 'plan':
        navigate('/plans');
        break;
      case 'news':
        navigate('/content/news');
        break;
      case 'tutorial':
        navigate('/content/tutorial');
        break;
      case 'documents':
        navigate('/content/documents');
        break;
      case 'new-admin':
        navigate('/admin/new');
        break;
      case 'admin-list':
        navigate('/admin/list');
        break;
      case 'broker-agent-list':
        navigate('/admin/broker-agents');
        break;
      case 'broker-list':
        navigate('/admin/brokers');
        break;
      default:
        break;
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const isActive = (item: string) => activeSection === item;

  const navigationItems = [
    {
      id: 'case-management',
      title: "CASE MANAGEMENT",
      items: [
        { id: 'active-case', name: "Active Case", icon: <CheckCircle className="h-4 w-4" />, count: 12 },
        { id: 'archive-case', name: "Archive Case", icon: <Archive className="h-4 w-4" />, count: 45 },
        { id: 'new-case', name: "New Case", icon: <Plus className="h-4 w-4" /> },
        { id: 'payments', name: "Payments", icon: <CreditCard className="h-4 w-4" /> },
        { id: 'reports', name: "Reports", icon: <Reports className="h-4 w-4" /> },
        { id: 'downloads', name: "Downloads", icon: <Download className="h-4 w-4" /> }
      ]
    },
    {
      id: 'plan-management',
      title: "PLAN MANAGEMENT",
      items: [
        { id: 'plan-parameters', name: "Plan Parameters", icon: <Settings className="h-4 w-4" /> },
        { id: 'plan', name: "Plan", icon: <FileText className="h-4 w-4" /> }
      ]
    },
    {
      id: 'content-management',
      title: "CONTENT MANAGEMENT",
      items: [
        { id: 'news', name: "News", icon: <Newspaper className="h-4 w-4" /> },
        { id: 'tutorial', name: "Tutorial", icon: <BookOpen className="h-4 w-4" /> },
        { id: 'documents', name: "Documents", icon: <FolderOpen className="h-4 w-4" /> }
      ]
    },
    {
      id: 'user-administration',
      title: "USER ADMINISTRATION",
      items: [
        { id: 'new-admin', name: "New Admin", icon: <UserPlus className="h-4 w-4" /> },
        { id: 'admin-list', name: "Admin List", icon: <Users className="h-4 w-4" /> },
        { id: 'broker-agent-list', name: "Broker Agent List", icon: <Users className="h-4 w-4" /> },
        { id: 'broker-list', name: "Broker List", icon: <Users className="h-4 w-4" /> }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-3">
              <img 
                src="/maxhealth logo.png" 
                alt="MaxHealth Logo" 
                className="h-8 w-auto"
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {/* Dashboard Link */}
            <button
              onClick={() => handleNavigation('dashboard', 'dashboard')}
              className={`w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-md transition-colors ${
                isActive('dashboard') 
                  ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-500' 
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </button>

            {navigationItems.map((section) => (
              <div key={section.id}>
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors"
                >
                  <span>{section.title}</span>
                  <ChevronRight 
                    className={`h-3 w-3 transition-transform ${
                      expandedSections.includes(section.id) ? 'rotate-90' : ''
                    }`} 
                  />
                </button>
                
                {expandedSections.includes(section.id) && (
                  <ul className="ml-4 space-y-1 mt-2">
                    {section.items.map((item) => (
                      <li key={item.id}>
                        <button
                          onClick={() => handleNavigation(section.id, item.id)}
                          className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors ${
                            isActive(item.id) 
                              ? 'bg-blue-100 text-blue-700 border-l-2 border-blue-500' 
                              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            {item.icon}
                            <span>{item.name}</span>
                          </div>
                          {item.count && (
                            <Badge variant="secondary" className="text-xs">
                              {item.count}
                            </Badge>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t">
            <div className="text-xs text-gray-500 text-center mb-2">
              Version 4.2.2
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="w-full justify-start"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`${sidebarOpen ? 'lg:ml-64' : ''} transition-margin duration-300 ease-in-out`}>
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {title || "MaxHealth Insurance Calculator – Dashboard"}
                </h1>
                <p className="text-sm text-gray-500">
                  {description || "Welcome back, Broker"}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <ArrowUpRight className="h-4 w-4 mr-2" />
                Switch to CRM
              </Button>
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-gray-400" />
                <User className="h-6 w-6 text-gray-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default BrokerLayout;
