import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Download,
  Plus,
  Star,
  Phone,
  Mail,
  Eye,
  MoreHorizontal,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Building,
  ArrowRight,
  Filter,
  Search,
  FileText,
  Clock
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import BrokerLayout from '../components/layout/BrokerLayout';

const BrokerDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  // Mock data for recent cases
  const recentCases = [
    {
      caseNumber: "CS-170725-BS9105-V1",
      brokerCompany: "ABC Insurance Agency",
      clientName: "TechCorp Solutions",
      network: "MEDNET",
      issuanceDate: "2024-01-15",
      censusNumber: 150,
      netPremium: "$45,678.90",
      status: "Draft"
    },
    {
      caseNumber: "CS-170725-BS9106-V1",
      brokerCompany: "XYZ Brokers Ltd",
      clientName: "Global Manufacturing",
      network: "PREMIUM",
      issuanceDate: "2024-01-14",
      censusNumber: 89,
      netPremium: "$32,450.00",
      status: "Submitted"
    },
    {
      caseNumber: "CS-170725-BS9107-V1",
      brokerCompany: "First Choice Insurance",
      clientName: "Startup Innovations",
      network: "BASIC",
      issuanceDate: "2024-01-13",
      censusNumber: 45,
      netPremium: "$18,750.50",
      status: "Approved"
    }
  ];

  // Mock data for recent brokers
  const recentBrokers = [
    {
      code: "BRK001",
      name: "John Smith",
      type: "Standard Broker",
      officeEmail: "john.smith@abcagency.com",
      officePhone: "+1 (555) 123-4567"
    },
    {
      code: "BRK002",
      name: "Sarah Johnson",
      type: "Premium Broker",
      officeEmail: "sarah.j@xyzbrokers.com",
      officePhone: "+1 (555) 234-5678"
    },
    {
      code: "BRK003",
      name: "Mike Chen",
      type: "Standard Broker",
      officeEmail: "mike.chen@firstchoice.com",
      officePhone: "+1 (555) 345-6789"
    }
  ];

  // Mock data for top brokers
  const topBrokers = [
    {
      name: "John Smith",
      company: "ABC Insurance Agency",
      premium: "$125,450.00",
      cases: 15,
      growth: "+12.5%"
    },
    {
      name: "Sarah Johnson",
      company: "XYZ Brokers Ltd",
      premium: "$98,750.00",
      cases: 12,
      growth: "+8.3%"
    },
    {
      name: "Mike Chen",
      company: "First Choice Insurance",
      premium: "$87,320.00",
      cases: 10,
      growth: "+15.2%"
    },
    {
      name: "Lisa Wang",
      company: "Elite Insurance Group",
      premium: "$76,890.00",
      cases: 8,
      growth: "+6.7%"
    },
    {
      name: "David Kim",
      company: "Premier Brokers Inc",
      premium: "$65,430.00",
      cases: 7,
      growth: "+9.1%"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'draft':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'submitted':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'approved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'rejected':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getBrokerTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'premium broker':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'standard broker':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <BrokerLayout
      title="Dashboard Overview"
      description="Monitor your cases, brokers, and performance metrics"
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 mb-1">Total Cases</p>
                <p className="text-2xl font-bold text-blue-900">1,247</p>
                <p className="text-xs text-blue-600 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12.5% from last month
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-emerald-50 to-emerald-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-600 mb-1">Active Brokers</p>
                <p className="text-2xl font-bold text-emerald-900">89</p>
                <p className="text-xs text-emerald-600 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +5.2% from last month
                </p>
              </div>
              <div className="h-12 w-12 bg-emerald-500 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-purple-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 mb-1">Total Premium</p>
                <p className="text-2xl font-bold text-purple-900">$2.4M</p>
                <p className="text-xs text-purple-600 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +18.7% from last month
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm bg-gradient-to-br from-amber-50 to-amber-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-600 mb-1">Pending Cases</p>
                <p className="text-2xl font-bold text-amber-900">23</p>
                <p className="text-xs text-amber-600 mt-1 flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  Requires attention
                </p>
              </div>
              <div className="h-12 w-12 bg-amber-500 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-wrap gap-3">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 shadow-sm">
            <Download className="h-5 w-5 mr-2" />
            Download Census
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => navigate('/cases/new')}
            className="border-gray-300 hover:bg-gray-50"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Case
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search cases..." 
              className="pl-10 w-64 border-gray-300 focus:border-blue-500"
            />
          </div>
          <Button variant="outline" size="sm" className="border-gray-300">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Recent Cases */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">Recent Cases</CardTitle>
                  <CardDescription className="text-sm text-gray-600">Recently created cases in the system</CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/cases/active')}
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  View All
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Case Number</th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Client</th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Network</th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Premium</th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {recentCases.map((caseItem, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                              {caseItem.caseNumber}
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">{caseItem.brokerCompany}</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-sm font-medium text-gray-900">{caseItem.clientName}</div>
                          <div className="text-xs text-gray-500 mt-1">{caseItem.censusNumber} members</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-sm text-gray-900">{caseItem.network}</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-sm font-semibold text-gray-900">{caseItem.netPremium}</div>
                          <div className="text-xs text-gray-500 mt-1">{caseItem.issuanceDate}</div>
                        </td>
                        <td className="py-4 px-6">
                          <Badge className={`${getStatusColor(caseItem.status)} border text-xs font-medium`}>
                            {caseItem.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-6">
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Brokers Leaderboard */}
        <div>
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                  <Star className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">Top Brokers</CardTitle>
                  <CardDescription className="text-sm text-gray-600">Highest performing brokers this month</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {topBrokers.map((broker, index) => (
                  <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                        index === 0 ? 'bg-yellow-100 text-yellow-700' :
                        index === 1 ? 'bg-gray-100 text-gray-700' :
                        index === 2 ? 'bg-amber-100 text-amber-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-sm text-gray-900">{broker.name}</div>
                        <div className="text-xs text-gray-500 flex items-center">
                          <Building className="h-3 w-3 mr-1" />
                          {broker.company}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900">{broker.premium}</div>
                      <div className="text-xs text-gray-500">{broker.cases} cases</div>
                      <div className="text-xs text-emerald-600 font-medium">{broker.growth}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Brokers */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">Recent Brokers</CardTitle>
              <CardDescription className="text-sm text-gray-600">Recently added brokers to the system</CardDescription>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/admin/brokers')}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              View All
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Code</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentBrokers.map((broker, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                        {broker.code}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm font-medium text-gray-900">{broker.name}</div>
                    </td>
                    <td className="py-4 px-6">
                      <Badge className={`${getBrokerTypeColor(broker.type)} border text-xs font-medium`}>
                        {broker.type}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-900">
                          <Mail className="h-3 w-3 mr-2 text-gray-400" />
                          {broker.officeEmail}
                        </div>
                        <div className="flex items-center text-sm text-gray-900">
                          <Phone className="h-3 w-3 mr-2 text-gray-400" />
                          {broker.officePhone}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </BrokerLayout>
  );
};

export default BrokerDashboardPage;
