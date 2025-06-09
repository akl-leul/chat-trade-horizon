
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MessageSquare, TrendingUp, Users, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  username: string;
  phone: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Load all users for search functionality
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    setAllUsers(users.filter((u: User) => u.id !== user?.id));
  }, [user]);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    const results = allUsers.filter(u => 
      u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.phone.includes(searchTerm) ||
      u.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(results);
  };

  const startChat = (userId: string) => {
    navigate(`/chat/${userId}`);
  };

  const stats = [
    {
      title: 'Total Users',
      value: allUsers.length + 1,
      icon: Users,
      color: 'text-blue-400'
    },
    {
      title: 'Active Chats',
      value: '0',
      icon: MessageSquare,
      color: 'text-green-400'
    },
    {
      title: 'Market Updates',
      value: '12',
      icon: TrendingUp,
      color: 'text-yellow-400'
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold neon-text mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-foreground/70">
            Manage your trading connections and stay updated with market trends
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="glass-effect border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-foreground/60 text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* User Search */}
        <Card className="glass-effect border-white/20 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Find Users
            </CardTitle>
            <CardDescription>
              Search for users by username, phone number, or name
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-4">
              <Input
                placeholder="Enter username, phone, or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/5 border-white/20"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button onClick={handleSearch} className="bg-primary hover:bg-primary/90">
                Search
              </Button>
            </div>

            {searchResults.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground/80">Search Results:</h3>
                {searchResults.map((foundUser) => (
                  <div
                    key={foundUser.id}
                    className="flex items-center justify-between p-3 rounded-lg glass-effect border-white/10"
                  >
                    <div>
                      <p className="font-semibold">{foundUser.name}</p>
                      <p className="text-sm text-foreground/60">@{foundUser.username}</p>
                      <p className="text-sm text-foreground/60">{foundUser.phone}</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => startChat(foundUser.id)}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Chat
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {searchTerm && searchResults.length === 0 && (
              <p className="text-foreground/60 text-center py-4">
                No users found matching your search
              </p>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/chat">
            <Card className="glass-effect border-white/20 hover:neon-glow transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 text-center">
                <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Start Chatting</h3>
                <p className="text-foreground/60">Connect with traders worldwide</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/markets">
            <Card className="glass-effect border-white/20 hover:neon-glow transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Market Data</h3>
                <p className="text-foreground/60">View live trading information</p>
              </CardContent>
            </Card>
          </Link>

          {user?.isAdmin && (
            <Link to="/admin/dashboard">
              <Card className="glass-effect border-white/20 hover:neon-glow transition-all duration-300 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 text-red-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Admin Panel</h3>
                  <p className="text-foreground/60">Manage users and settings</p>
                </CardContent>
              </Link>
            )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
