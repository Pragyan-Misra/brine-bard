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
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 wave-animation opacity-10 rounded-3xl"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-lg">
                <Waves className="h-12 w-12" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary-light bg-clip-text text-transparent leading-tight">
              FloatChat
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              AI-Powered Conversational Interface for ARGO Ocean Data Discovery and Visualization
            </p>
            
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Explore the world's oceans through intelligent conversations. Ask questions about temperature, 
              salinity, and ocean conditions in natural language and get instant insights with beautiful visualizations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <Link to="/chat">
                <Button variant="ocean" size="xl" className="group">
                  <MessageCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  Start Chat
                </Button>
              </Link>
              
              <Link to="/dashboard">
                <Button variant="surface" size="xl" className="group">
                  <BarChart3 className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  Open Dashboard
                </Button>
              </Link>
              
              <Link to="/upload">
                <Button variant="glass" size="xl" className="group">
                  <Upload className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  Upload Data
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
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
      <section className="py-16 px-4 bg-gradient-to-r from-muted/30 to-accent/5">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-primary">4,000+</div>
              <div className="text-lg text-muted-foreground">Active Ocean Floats</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-accent">2M+</div>
              <div className="text-lg text-muted-foreground">Ocean Profiles</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-primary-light">24/7</div>
              <div className="text-lg text-muted-foreground">Real-time Data</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <Card className="glass border-0 data-glow p-8 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <Zap className="h-12 w-12 mx-auto text-accent" />
              <h3 className="text-2xl md:text-3xl font-bold">Ready to Explore?</h3>
              <p className="text-lg text-muted-foreground">
                Start your ocean data discovery journey today. Ask questions, explore patterns, and 
                gain insights from the world's largest ocean observation network.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/chat">
                  <Button variant="ocean" size="lg">
                    <MessageCircle className="h-5 w-5" />
                    Ask Your First Question
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;