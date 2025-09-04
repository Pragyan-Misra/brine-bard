import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
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
  Image as ImageIcon
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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m FloatChat, your AI assistant for ocean data exploration. Ask me about ocean temperatures, salinity, float trajectories, or any oceanographic data you\'re curious about.',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock AI response function - would connect to backend
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `Based on ARGO float data analysis, I found relevant information about your query: "${inputValue}". The ocean temperature data shows interesting patterns in the specified region. Would you like me to generate visualizations for this data?`,
        timestamp: new Date(),
        metadata: {
          floatId: 'ARGO_5904471',
          timestamp: '2024-01-15T10:30:00Z',
          location: { lat: 25.5, lon: -80.2 },
          visualizations: [
            { type: 'plot', title: 'Temperature-Depth Profile', description: 'Vertical temperature distribution' },
            { type: 'map', title: 'Float Trajectory', description: 'Geographic path of the float' },
            { type: 'timeseries', title: 'Temperature Time Series', description: 'Temperature variation over time' }
          ],
          provenance: {
            source: 'ARGO Float Network',
            dataPoints: 1247,
            timeRange: '2023-12 to 2024-01'
          }
        }
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
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
    "Compare ocean conditions between seasons"
  ];

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
        
        {/* Chat Interface */}
        <div className="lg:col-span-3 flex flex-col">
          <Card className="flex-1 flex flex-col">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                FloatChat AI Assistant
                <Badge variant="outline" className="ml-auto">Connected to Supabase Required</Badge>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages */}
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-6">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex gap-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex gap-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`p-2 rounded-full ${message.type === 'user' ? 'bg-primary' : 'bg-accent'}`}>
                          {message.type === 'user' ? 
                            <User className="h-4 w-4 text-white" /> : 
                            <Bot className="h-4 w-4 text-white" />
                          }
                        </div>
                        
                        <div className="space-y-3">
                          <Card className={`${message.type === 'user' ? 'bg-primary text-primary-foreground' : 'glass'}`}>
                            <CardContent className="p-4">
                              <p className="whitespace-pre-wrap">{message.content}</p>
                            </CardContent>
                          </Card>
                          
                          {/* AI Metadata */}
                          {message.type === 'ai' && message.metadata && (
                            <div className="space-y-3">
                              {/* Provenance */}
                              {message.metadata.provenance && (
                                <Card className="glass border border-accent/20">
                                  <CardContent className="p-4">
                                    <h4 className="font-semibold mb-2 text-sm flex items-center gap-2">
                                      <FileText className="h-4 w-4" />
                                      Data Provenance
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
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
                                      <div className="mt-2 flex items-center gap-2 text-sm">
                                        <MapPin className="h-4 w-4" />
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
                                  <CardContent className="p-4">
                                    <h4 className="font-semibold mb-3 text-sm flex items-center gap-2">
                                      <BarChart3 className="h-4 w-4" />
                                      Available Visualizations
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                      {message.metadata.visualizations.map((viz, index) => (
                                        <Button key={index} variant="outline" size="sm" className="h-auto p-3 flex-col gap-1">
                                          <ImageIcon className="h-4 w-4" />
                                          <span className="font-medium text-xs">{viz.title}</span>
                                          <span className="text-xs text-muted-foreground">{viz.description}</span>
                                        </Button>
                                      ))}
                                    </div>
                                    <div className="flex gap-2 mt-3">
                                      <Button variant="data" size="sm">
                                        <Download className="h-4 w-4" />
                                        Download CSV
                                      </Button>
                                      <Button variant="outline" size="sm">
                                        <Download className="h-4 w-4" />
                                        Export PNG
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
                    <div className="flex gap-4">
                      <div className="p-2 rounded-full bg-accent">
                        <Bot className="h-4 w-4 text-white animate-pulse" />
                      </div>
                      <Card className="glass">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="animate-pulse">Analyzing ocean data...</div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              {/* Input */}
              <div className="border-t p-4">
                <div className="flex gap-3">
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
        
        {/* Sidebar */}
        <div className="space-y-4">
          {/* Role Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Role</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                Scientist
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                Policymaker  
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                Student
              </Button>
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
                  className="w-full text-left h-auto p-2 whitespace-normal"
                  onClick={() => setInputValue(question)}
                >
                  {question}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chat;