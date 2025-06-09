
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Globe, Mail, MapPin, Award, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold neon-text mb-4">
              About the Creator
            </h1>
            <p className="text-xl text-foreground/70">
              Meet the developer behind ChatTrade
            </p>
          </div>

          {/* Creator Profile */}
          <Card className="glass-effect border-white/20 mb-8">
            <CardHeader className="text-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-purple-500 mx-auto mb-4 flex items-center justify-center">
                <Code className="w-16 h-16 text-white" />
              </div>
              <CardTitle className="text-3xl neon-text">Leul Ayfokru</CardTitle>
              <p className="text-xl text-primary">Full Stack Developer</p>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-foreground/80 mb-6">
                Passionate full stack website and application developer with more than 3 years of experience 
                creating innovative digital solutions. Based in the vibrant city of Addis Ababa, Ethiopia.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>Addis Ababa, Ethiopia</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-primary" />
                    <span>3+ Years Experience</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-primary" />
                    <span>Full Stack Development</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Code className="w-5 h-5 text-primary" />
                    <span>Web & Mobile Applications</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-primary" />
                    <span>User-Centered Design</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <span>Available for Projects</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills & Expertise */}
          <Card className="glass-effect border-white/20 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Skills & Expertise</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-3">Frontend</h3>
                  <ul className="space-y-2 text-foreground/80">
                    <li>React & Next.js</li>
                    <li>TypeScript</li>
                    <li>Tailwind CSS</li>
                    <li>Vue.js</li>
                    <li>Mobile Development</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-3">Backend</h3>
                  <ul className="space-y-2 text-foreground/80">
                    <li>Node.js & Express</li>
                    <li>Python & Django</li>
                    <li>Database Design</li>
                    <li>API Development</li>
                    <li>Cloud Services</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-3">Tools & Others</h3>
                  <ul className="space-y-2 text-foreground/80">
                    <li>Git & GitHub</li>
                    <li>Docker</li>
                    <li>AWS/Azure</li>
                    <li>UI/UX Design</li>
                    <li>Project Management</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About ChatTrade */}
          <Card className="glass-effect border-white/20">
            <CardHeader>
              <CardTitle className="text-2xl">About ChatTrade</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80 leading-relaxed">
                ChatTrade represents the culmination of modern web development technologies and trading industry insights. 
                Built with React, TypeScript, and a futuristic design approach, this platform combines real-time communication 
                capabilities with market data integration. The application features secure authentication, admin management, 
                and a responsive design that works seamlessly across all devices.
              </p>
              <br />
              <p className="text-foreground/80 leading-relaxed">
                Every aspect of ChatTrade has been carefully crafted to provide users with a professional trading communication 
                platform while maintaining the highest standards of security and user experience. The project showcases advanced 
                full-stack development skills and modern web application architecture.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
