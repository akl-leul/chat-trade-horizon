
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageSquare, TrendingUp, Shield, Users } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-purple-500/20"></div>
        
        <nav className="relative z-10 container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold neon-text">ChatTrade</div>
            <div className="space-x-4">
              <Link to="/login">
                <Button variant="outline" className="border-white/20">Login</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-primary hover:bg-primary/90 neon-glow">Register</Button>
              </Link>
            </div>
          </div>
        </nav>

        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <h1 className="text-6xl font-bold mb-6 neon-text">
            The Future of
            <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              {" "}Trading & Communication
            </span>
          </h1>
          <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            Connect with traders worldwide, access real-time market data, and communicate securely 
            in our next-generation trading platform.
          </p>
          <div className="space-x-4">
            <Link to="/register">
              <Button size="lg" className="bg-primary hover:bg-primary/90 neon-glow">
                Get Started
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="border-white/20">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 neon-text">
          Powerful Features
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: MessageSquare,
              title: 'Secure Chat',
              description: 'End-to-end encrypted messaging with traders worldwide'
            },
            {
              icon: TrendingUp,
              title: 'Live Markets',
              description: 'Real-time market data and trading insights'
            },
            {
              icon: Users,
              title: 'User Discovery',
              description: 'Find traders by username or phone number'
            },
            {
              icon: Shield,
              title: 'Admin Control',
              description: 'Comprehensive admin panel for user management'
            }
          ].map((feature, index) => (
            <div key={index} className="glass-effect p-6 rounded-xl hover:neon-glow transition-all duration-300">
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-foreground/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-purple-500/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 neon-text">
            Ready to Start Trading?
          </h2>
          <p className="text-xl text-foreground/80 mb-8">
            Join thousands of traders already using ChatTrade
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-primary hover:bg-primary/90 neon-glow">
              Create Account Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="container mx-auto px-4 text-center text-foreground/60">
          <p>&copy; 2024 ChatTrade. Built by Leul Ayfokru.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
