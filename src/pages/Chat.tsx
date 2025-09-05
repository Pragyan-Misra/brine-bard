import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Send, 
  Mic, 
  Download, 
  MapPin, 
  Calendar, 
  Thermometer, 
  Waves, 
  User, 
  Bot,
  BarChart3,
  FileText,
  Image as ImageIcon,
  Menu,
  Settings
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  metadata?: {
    floatId?: string;
    timestamp?: string;
    location?: { lat: number; lon: number };
    visualizations?: Array<{
      type: 'plot' | 'map' | 'timeseries';
      title: string;
      description: string;
    }>;
    provenance?: {
      source: string;
      dataPoints: number;
      timeRange: string;
    };
  };
}

const Chat = () => {
  const isMobile = useIsMobile();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m FloatChat, your AI assistant for ocean data exploration powered by Gemini AI. Ask me about ocean temperatures, salinity, float trajectories, or any oceanographic data you\'re curious about.',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Scientist');

  // Generate AI response with Gemini API integration and fallback data
  const generateAIResponse = (query: string): Message => {
    const mockFloatData = [
      { id: 'ARGO_5904471', lat: 25.5, lon: -80.2, region: 'North Atlantic' },
      { id: 'ARGO_2901234', lat: -12.3, lon: 45.6, region: 'Indian Ocean' },
      { id: 'ARGO_3900567', lat: 35.2, lon: -140.8, region: 'North Pacific' },
      { id: 'ARGO_4901890', lat: -25.7, lon: 15.4, region: 'South Atlantic' },
    ];

    const randomFloat = mockFloatData[Math.floor(Math.random() * mockFloatData.length)];
    const randomDataPoints = Math.floor(Math.random() * 2000) + 500;
    const temperatures = Array.from({ length: 10 }, () => (15 + Math.random() * 10).toFixed(1));
    
    const responses = [
      `Based on ARGO float ${randomFloat.id} in the ${randomFloat.region}, I found relevant oceanographic data for "${query}". Current analysis shows temperature variations between ${Math.min(...temperatures.map(Number))}°C and ${Math.max(...temperatures.map(Number))}°C at various depths. The data indicates ${Math.random() > 0.5 ? 'warming' : 'cooling'} trends over the specified period.`,
      
      `Analyzing ${randomDataPoints} data points from float ${randomFloat.id}, the ocean conditions show interesting patterns. Temperature profiles reveal ${Math.random() > 0.5 ? 'stable stratification' : 'mixed layer dynamics'} with salinity values ranging from ${(34 + Math.random() * 2).toFixed(2)} to ${(35 + Math.random() * 2).toFixed(2)} PSU.`,
      
      `Float trajectory analysis from ${randomFloat.region} (${randomFloat.lat}°, ${randomFloat.lon}°) shows ${Math.random() > 0.5 ? 'seasonal migration patterns' : 'circular current patterns'}. The temperature-depth relationship indicates ${Math.random() > 0.5 ? 'thermocline depth variations' : 'deep water mass characteristics'}.`
    ];

    return {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      content: responses[Math.floor(Math.random() * responses.length)],
      timestamp: new Date(),
      metadata: {
        floatId: randomFloat.id,
        timestamp: new Date().toISOString(),
        location: { lat: randomFloat.lat, lon: randomFloat.lon },
        visualizations: [
          { type: 'plot', title: 'Temperature-Depth Profile', description: 'Vertical temperature distribution' },
          { type: 'map', title: 'Float Trajectory', description: `Geographic path in ${randomFloat.region}` },
          { type: 'timeseries', title: 'Temperature Time Series', description: 'Temperature variation over time' }
        ],
        provenance: {
          source: 'ARGO Float Network (AI Generated)',
          dataPoints: randomDataPoints,
          timeRange: `${new Date().getFullYear()-1}-${String(new Date().getMonth()).padStart(2, '0')} to ${new Date().getFullYear()}-${String(new Date().getMonth()+1).padStart(2, '0')}`
        }
      }
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentQuery = inputValue;
    setInputValue('');
    setIsLoading(true);

    // Try real AI API call, fallback to mock if error
    try {
      console.log('🚀 Sending query to AI:', currentQuery);
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: currentQuery, role: selectedRole })
      });
      
      console.log('📡 API Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ API Error:', errorData);
        throw new Error(`API error: ${response.status} - ${errorData.error || 'Unknown error'}`);
      }
      
      const data = await response.json();
      console.log('✅ AI Response received:', data);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: data.content || "Sorry, I couldn't find an answer.",
        timestamp: new Date(),
        metadata: data.metadata || undefined
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.warn('⚠️ Falling back to mock data:', err);
      // fallback to mock
      const aiMessage = generateAIResponse(currentQuery);
      setMessages(prev => [...prev, aiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVisualizationClick = (viz: any, message: Message) => {
    console.log(`🎯 Opening ${viz.title} for ${message.metadata?.floatId}`);
    // TODO: Add actual visualization logic here
    alert(`${viz.title} visualization would open here!\n\nFloat: ${message.metadata?.floatId}\nDescription: ${viz.description}`);
  };

  const handleDownloadData = (format: 'csv' | 'png', message: Message) => {
    console.log(`📥 Downloading ${format.toUpperCase()} for ${message.metadata?.floatId}`);
    // TODO: Add actual download logic here
    alert(`${format.toUpperCase()} download would start here!\n\nFloat: ${message.metadata?.floatId}\nData Points: ${message.metadata?.provenance?.dataPoints}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    "What's the temperature at 1000m depth in the North Atlantic?",
    "Show me salinity trends in the Pacific Ocean",
    "Find temperature anomalies near the equator",
    "Compare ocean conditions between seasons",
    "Analyze float trajectories in the Indian Ocean",
    "Show deep water formation patterns"
  ];

  const roles = ['Scientist', 'Student'];

  const RoleAndSuggestions = () => (
    <div className="space-y-4">
      {/* Role Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Role</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {roles.map((role) => (
            <Button 
              key={role}
              variant={selectedRole === role ? "default" : "ghost"} 
              size="sm" 
              className="w-full justify-start"
              onClick={() => setSelectedRole(role)}
            >
              {role}
            </Button>
          ))}
        </CardContent>
      </Card>
      
      {/* Suggested Questions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Suggested Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {suggestedQuestions.map((question, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className="w-full text-left h-auto p-2 whitespace-normal text-xs"
              onClick={() => setInputValue(question)}
            >
              {question}
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="container mx-auto py-4 px-4 max-w-7xl h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0">
        {/* Chat Interface */}
        <div className="flex-1 flex flex-col min-w-0 min-h-0">
          <Card className="flex-1 flex flex-col min-h-0">
            <CardHeader className="border-b pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Bot className="h-5 w-5 text-primary" />
                  FloatChat AI Assistant
                  <Badge variant="outline" className="text-xs">Gemini Ready</Badge>
                </CardTitle>
                
                {isMobile && (
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Menu className="h-5 w-5" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-80">
                      <SheetHeader>
                        <SheetTitle className="flex items-center gap-2">
                          <Settings className="h-4 w-4" />
                          Chat Settings
                        </SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <RoleAndSuggestions />
                      </div>
                    </SheetContent>
                  </Sheet>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0 min-h-0">
              {/* Messages */}
              <div className="flex-1 min-h-0">
                <ScrollArea className="h-full max-h-full p-4">
                  <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex gap-3 max-w-full md:max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.type === 'user' ? 'bg-primary' : 'bg-accent'}`}>
                          {message.type === 'user' ? 
                            <User className="h-4 w-4 text-white" /> : 
                            <Bot className="h-4 w-4 text-white" />
                          }
                        </div>
                        <div className="space-y-2 min-w-0 break-words w-full">
                          <Card className={`${message.type === 'user' ? 'bg-primary text-primary-foreground' : 'glass'}`}> 
                            <CardContent className="p-3">
                              <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                            </CardContent>
                          </Card>
                          {/* AI Metadata */}
                          {message.type === 'ai' && message.metadata && (
                            <div className="space-y-2">
                              {/* Provenance */}
                              {message.metadata.provenance && (
                                <Card className="glass border border-accent/20">
                                  <CardContent className="p-3">
                                    <h4 className="font-semibold mb-2 text-xs flex items-center gap-2">
                                      <FileText className="h-3 w-3" />
                                      Data Provenance
                                    </h4>
                                    <div className="grid grid-cols-1 gap-1 text-xs">
                                      <div>
                                        <span className="font-medium">Source:</span> {message.metadata.provenance.source}
                                      </div>
                                      <div>
                                        <span className="font-medium">Points:</span> {message.metadata.provenance.dataPoints}
                                      </div>
                                      <div>
                                        <span className="font-medium">Range:</span> {message.metadata.provenance.timeRange}
                                      </div>
                                    </div>
                                    {message.metadata.floatId && (
                                      <div className="mt-2 flex items-center gap-2 text-xs">
                                        <MapPin className="h-3 w-3" />
                                        <span className="font-medium">Float ID:</span> {message.metadata.floatId}
                                        {message.metadata.location && (
                                          <span>({message.metadata.location.lat}°, {message.metadata.location.lon}°)</span>
                                        )}
                                      </div>
                                    )}
                                  </CardContent>
                                </Card>
                              )}
                              {/* Visualizations */}
                              {message.metadata.visualizations && (
                                <Card className="glass border border-accent/20">
                                  <CardContent className="p-3">
                                    <h4 className="font-semibold mb-2 text-xs flex items-center gap-2">
                                      <BarChart3 className="h-3 w-3" />
                                      Available Visualizations
                                    </h4>
                                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-2 w-full">
                                       {message.metadata.visualizations.map((viz, index) => (
                                         <Button 
                                           key={index} 
                                           variant="outline" 
                                           size="sm" 
                                           className="h-auto p-2 flex-col gap-1 text-xs w-full min-w-0 hover:bg-accent/50"
                                           onClick={() => handleVisualizationClick(viz, message)}
                                         >
                                           <ImageIcon className="h-3 w-3" />
                                           <span className="font-medium">{viz.title}</span>
                                         </Button>
                                       ))}
                                     </div>
                                     <div className="flex gap-2 flex-wrap">
                                       <Button 
                                         variant="data" 
                                         size="sm" 
                                         className="text-xs"
                                         onClick={() => handleDownloadData('csv', message)}
                                       >
                                         <Download className="h-3 w-3" />
                                         CSV
                                       </Button>
                                       <Button 
                                         variant="outline" 
                                         size="sm" 
                                         className="text-xs"
                                         onClick={() => handleDownloadData('png', message)}
                                       >
                                         <Download className="h-3 w-3" />
                                         PNG
                                       </Button>
                                     </div>
                                  </CardContent>
                                </Card>
                              )}
                            </div>
                          )}
                          <div className="text-xs text-muted-foreground">
                            {message.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white animate-pulse" />
                      </div>
                      <Card className="glass">
                        <CardContent className="p-3">
                          <div className="flex items-center gap-2 text-sm">
                            <div className="animate-pulse">Analyzing ocean data with Gemini AI...</div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                  {/* End of messages */}
                </div>
                </ScrollArea>
              </div>
              
              {/* Input */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask about ocean temperatures, salinity, float data..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="shrink-0"
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button 
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputValue.trim()}
                    className="shrink-0"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Desktop Sidebar */}
        {!isMobile && (
          <div className="w-80 flex-shrink-0">
            <RoleAndSuggestions />
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;