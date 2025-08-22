import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Users, TrendingUp, DollarSign, LogOut } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Handle logout logic
    console.log('Logout clicked');
    navigate('/login');
  };

  const stats = [
    {
      title: "Total Clients",
      value: "1,234",
      icon: <Users className="h-8 w-8" />,
      description: "Active clients in your portfolio"
    },
    {
      title: "Monthly Revenue",
      value: "$45,678",
      icon: <DollarSign className="h-8 w-8" />,
      description: "This month's total revenue"
    },
    {
      title: "Growth Rate",
      value: "+12.5%",
      icon: <TrendingUp className="h-8 w-8" />,
      description: "Compared to last month"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/maxhealth logo.png" 
                alt="MaxHealth Logo" 
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold">MaxHealth Broker Portal</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Welcome, Broker</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your MaxHealth Broker Portal dashboard
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className="text-primary">
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Welcome Card */}
        <Card>
          <CardHeader>
            <CardTitle>Welcome to MaxHealth Broker Portal</CardTitle>
            <CardDescription>
              Your comprehensive CRM and sales tool for health insurance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              This is a demo dashboard. In the full application, you would see:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Client management and profiles</li>
              <li>• Policy quotes and applications</li>
              <li>• Commission tracking and reports</li>
              <li>• Marketing materials and tools</li>
              <li>• Training resources and support</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default DashboardPage;
