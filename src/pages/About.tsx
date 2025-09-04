import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Waves, 
  MessageCircle, 
  Database, 
  Bot, 
  Globe, 
  Zap, 
  TrendingUp, 
  Users, 
  Heart,
  Leaf,
  DollarSign,
  Building,
  Flag
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const impacts = [
    {
      icon: Users,
      title: 'Social Impact',
      color: 'text-blue-600',
      description: 'Democratizing ocean data access for researchers, educators, and policymakers worldwide.',
      benefits: [
        'Simplified data exploration for non-experts',
        'Educational tool for ocean science learning',
        'Enhanced collaboration between research institutions',
        'Public awareness of ocean health and climate change'
      ]
    },
    {
      icon: DollarSign,
      title: 'Economic Impact',
      color: 'text-green-600',
      description: 'Reducing research costs and accelerating scientific discoveries through AI automation.',
      benefits: [
        'Reduced time for data analysis (hours vs. days)',
        'Lower computational costs through smart querying',
        'Faster hypothesis testing and validation',
        'Improved resource allocation for ocean monitoring'
      ]
    },
    {
      icon: Leaf,
      title: 'Environmental Impact',
      color: 'text-emerald-600',
      description: 'Supporting climate research and ocean conservation through better data accessibility.',
      benefits: [
        'Enhanced climate modeling accuracy',
        'Better understanding of ocean-atmosphere interactions',
        'Improved marine ecosystem monitoring',
        'Support for sustainable fishing and marine policies'
      ]
    },
    {
      icon: Zap,
      title: 'Technological Impact',
      color: 'text-purple-600',
      description: 'Advancing the intersection of AI and oceanography with innovative RAG techniques.',
      benefits: [
        'Novel AI applications in Earth sciences',
        'Advanced natural language processing for scientific data',
        'Scalable vector search for large datasets',
        'Open-source contributions to scientific computing'
      ]
    },
    {
      icon: Flag,
      title: 'National Impact',
      color: 'text-red-600',
      description: 'Strengthening national capabilities in ocean science and climate research.',
      benefits: [
        'Enhanced national ocean monitoring capabilities',
        'Support for evidence-based policy making',
        'Improved disaster preparedness and response',
        'Contribution to international climate initiatives'
      ]
    }
  ];

  const technicalApproach = [
    {
      step: '1',
      title: 'Data Ingestion',
      description: 'NetCDF files are parsed to extract metadata and measurements, then stored in PostgreSQL with spatial indexing.',
      tech: ['Python', 'NetCDF4', 'PostgreSQL', 'PostGIS']
    },
    {
      step: '2',
      title: 'Chunk Generation',
      description: 'Ocean profiles are converted to natural language descriptions and embedded using sentence transformers.',
      tech: ['SentenceTransformers', 'FAISS', 'Embeddings', 'NLP']
    },
    {
      step: '3',
      title: 'Vector Search',
      description: 'User queries are embedded and matched against the vector database to find relevant ocean data.',
      tech: ['FAISS', 'Similarity Search', 'Vector DB', 'Retrieval']
    },
    {
      step: '4',
      title: 'AI Generation',
      description: 'Retrieved data is processed by LLM with scientific context to generate accurate, cited responses.',
      tech: ['OpenAI GPT-4', 'RAG', 'Prompt Engineering', 'Citations']
    },
    {
      step: '5',
      title: 'Visualization',
      description: 'Matplotlib and Plotly generate interactive plots, maps, and time-series for data exploration.',
      tech: ['Matplotlib', 'Plotly', 'Leaflet', 'Interactive Viz']
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4 space-y-12">
      {/* Header */}
      <section className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-lg">
            <Waves className="h-12 w-12" />
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary-light bg-clip-text text-transparent">
            About FloatChat
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Revolutionizing ocean data discovery through AI-powered conversations with the world's largest 
            autonomous ocean observation network.
          </p>
        </div>
      </section>

      {/* Problem Statement */}
      <Card className="glass border-0 data-glow">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Globe className="h-6 w-6 text-primary" />
            The Challenge
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg leading-relaxed">
            The ARGO float network generates over <strong>100,000 ocean profiles monthly</strong> from 4,000+ 
            autonomous floats worldwide. However, accessing and understanding this vast dataset requires 
            specialized knowledge of oceanography, programming, and data formats.
          </p>
          <p className="text-lg leading-relaxed">
            Scientists, policymakers, and educators struggle with:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-destructive rounded-full"></div>
                <span>Complex data formats (NetCDF, MATLAB)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-destructive rounded-full"></div>
                <span>Steep learning curve for data access</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-destructive rounded-full"></div>
                <span>Time-intensive manual data exploration</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-destructive rounded-full"></div>
                <span>Limited discoverability of relevant datasets</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-destructive rounded-full"></div>
                <span>Lack of immediate data interpretation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-destructive rounded-full"></div>
                <span>Barriers for non-expert users</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical Approach */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Our Technical Approach</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            FloatChat combines cutting-edge AI with oceanographic expertise to create an intuitive, 
            conversational interface for ocean data exploration.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {technicalApproach.map((step, index) => (
            <Card key={index} className="relative group hover:scale-105 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-gradient-to-r from-primary to-accent text-white rounded-full flex items-center justify-center font-bold text-lg mb-2">
                  {step.step}
                </div>
                <CardTitle className="text-lg">{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <CardDescription className="text-center text-sm">
                  {step.description}
                </CardDescription>
                <div className="flex flex-wrap gap-1 justify-center">
                  {step.tech.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              {index < technicalApproach.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-0.5 bg-gradient-to-r from-primary to-accent transform -translate-y-1/2 z-10"></div>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* Impact Analysis */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Impact Assessment</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            FloatChat addresses critical needs across multiple dimensions, creating value for diverse stakeholder groups.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {impacts.map((impact, index) => (
            <Card key={index} className="glass border-0 data-glow group hover:scale-105 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-3 rounded-lg bg-gradient-to-r from-background/60 to-card/60 ${impact.color}`}>
                    <impact.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{impact.title}</CardTitle>
                </div>
                <CardDescription className="text-sm">
                  {impact.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {impact.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0"></div>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Architecture Overview */}
      <Card className="glass border-0 data-glow">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Database className="h-6 w-6 text-accent" />
            System Architecture
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                Frontend (React)
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground ml-7">
                <li>• Conversational chat interface</li>
                <li>• Interactive data visualizations</li>
                <li>• Real-time plot generation</li>
                <li>• Responsive design system</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Bot className="h-5 w-5 text-accent" />
                Backend (FastAPI)
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground ml-7">
                <li>• RAG pipeline implementation</li>
                <li>• Vector similarity search</li>
                <li>• LLM integration & prompting</li>
                <li>• Data processing & visualization</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Database className="h-5 w-5 text-success" />
                Database Layer
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground ml-7">
                <li>• PostgreSQL for metadata</li>
                <li>• FAISS for vector search</li>
                <li>• Spatial/temporal indexing</li>
                <li>• Automated data ingestion</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="glass border-0 data-glow text-center p-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <Heart className="h-12 w-12 mx-auto text-destructive" />
          <h3 className="text-2xl md:text-3xl font-bold">Ready to Explore Ocean Data?</h3>
          <p className="text-lg text-muted-foreground">
            Join us in making ocean science more accessible, discoverable, and actionable for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/chat">
              <Button variant="ocean" size="lg">
                <MessageCircle className="h-5 w-5" />
                Start Exploring Data
              </Button>
            </Link>
            <Link to="/team">
              <Button variant="outline" size="lg">
                <Users className="h-5 w-5" />
                Meet Our Team
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default About;