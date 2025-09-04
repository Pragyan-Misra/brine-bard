import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, BarChart3, Upload, Waves, Database, Bot, Globe, Zap } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Bot,
      title: 'AI-Powered Conversations',
      description: 'Chat with our AI to discover ocean data insights through natural language queries.',
    },
    {
      icon: Database,
      title: 'ARGO Data Integration',
      description: 'Access comprehensive ocean float data with temperature, salinity, and depth measurements.',
    },
    {
      icon: BarChart3,
      title: 'Interactive Visualizations',
      description: 'Explore data through dynamic plots, maps, and time-series visualizations.',
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Worldwide ocean data from thousands of autonomous floats across all ocean basins.',
    },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4">
        {/* Hero Banner Background Image */}
        <img src="/hero-map.png" alt="World Ocean Map" className="absolute inset-0 w-full h-full object-cover z-0 opacity-90 animate-fade-in" draggable="false" />
        <div className="container mx-auto text-center relative z-10 animate-fade-in-up">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Removed circular logo for a cleaner hero section */}
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight animate-gradient-move drop-shadow-2xl" style={{textShadow:'0 4px 24px rgba(0,0,0,0.25), 0 1px 0 #0a2540'}}>
              Democratizing Access to <span className="text-accent font-extrabold animate-pulse" style={{color:'#3ecbff',textShadow:'0 2px 12px #0a2540'}}>Ocean Intelligence</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-100" style={{color:'#e0f7fa',textShadow:'0 2px 8px #0a2540'}}>
              FloatChat is an AI-powered conversational platform that unlocks the mysteries of the ocean, making complex data accessible for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 animate-fade-in-up delay-200">
              <Link to="/chat">
                <Button variant="ocean" size="xl" className="group animate-bounce-once shadow-xl">
                  <MessageCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  Get Started
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="surface" size="xl" className="group animate-glow shadow-xl">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

  {/* Features Section */}
  <section className="py-16 px-4 animate-fade-in-up delay-300">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Discover Ocean Data Like Never Before
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform makes ocean data exploration intuitive, interactive, and insightful.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="glass border-0 data-glow group hover:scale-105 transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="mx-auto p-3 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 text-primary w-fit mb-4 group-hover:from-primary group-hover:to-accent group-hover:text-white transition-all duration-300">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

  {/* Stats Section */}
  <section className="py-16 px-4 bg-gradient-to-r from-muted/30 to-accent/5 animate-fade-in-up delay-400">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-primary dark:text-white">4,000+</div>
              <div className="text-lg text-muted-foreground">Active Ocean Floats</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-accent dark:text-white">2M+</div>
              <div className="text-lg text-muted-foreground">Ocean Profiles</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-primary-light dark:text-white">24/7</div>
              <div className="text-lg text-muted-foreground">Real-time Data</div>
            </div>
          </div>
        </div>
      </section>

  {/* CTA Section removed as requested */}
    </div>
  );
};

export default Home;