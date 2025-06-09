
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageSquare, TrendingUp, Users, LogOut, Settings } from 'lucide-react';

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Users },
    { path: '/chat', label: 'Chat', icon: MessageSquare },
    { path: '/markets', label: 'Markets', icon: TrendingUp },
  ];

  if (user?.isAdmin) {
    navItems.push({ path: '/admin/dashboard', label: 'Admin', icon: Settings });
  }

  return (
    <nav className="glass-effect border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/dashboard" className="text-2xl font-bold neon-text">
            ChatTrade
          </Link>
          
          <div className="flex items-center space-x-6">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                  location.pathname === path
                    ? 'bg-primary/20 text-primary neon-glow'
                    : 'hover:bg-white/5 text-foreground/80 hover:text-foreground'
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            ))}
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-foreground/60">
                Welcome, {user?.name}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-white/20 hover:border-primary/50"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
