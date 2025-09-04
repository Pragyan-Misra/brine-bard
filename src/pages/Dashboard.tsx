import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Calendar, 
  Filter, 
  Download, 
  RefreshCw, 
  Thermometer, 
  Droplets, 
  Gauge,
  TrendingUp,
  Globe,
  BarChart3
} from 'lucide-react';

const Dashboard = () => {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [selectedVariable, setSelectedVariable] = useState('temperature');

  // Mock data for demonstration
  const floatStats = {
    active: 4247,
    profiles: 1834529,
    lastUpdate: '2024-01-15 14:30 UTC',
    regions: {
      'North Atlantic': 892,
      'South Atlantic': 634,
      'North Pacific': 1123,
      'South Pacific': 987,
      'Indian Ocean': 611
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Ocean Data Dashboard</h1>
          <p className="text-muted-foreground">Interactive visualization of ARGO float network data</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <RefreshCw className="h-3 w-3" />
            Last updated: {floatStats.lastUpdate}
          </Badge>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="data-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Floats</CardTitle>
            <Globe className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{floatStats.active.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +12% from last month
              </span>
            </p>
          </CardContent>
        </Card>

        <Card className="data-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Profiles</CardTitle>
            <BarChart3 className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-accent">{floatStats.profiles.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +2.3K daily average
              </span>
            </p>
          </CardContent>
        </Card>

        <Card className="data-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temperature Range</CardTitle>
            <Thermometer className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-2°C to 30°C</div>
            <p className="text-xs text-muted-foreground">Global ocean surface</p>
          </CardContent>
        </Card>

        <Card className="data-glow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Coverage</CardTitle>
            <MapPin className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">98.7%</div>
            <p className="text-xs text-muted-foreground">Ocean basin coverage</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Data Filters
          </CardTitle>
          <CardDescription>
            Customize your data view by selecting location, time range, and variables
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="region">Region</Label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="north-atlantic">North Atlantic</SelectItem>
                  <SelectItem value="south-atlantic">South Atlantic</SelectItem>
                  <SelectItem value="north-pacific">North Pacific</SelectItem>
                  <SelectItem value="south-pacific">South Pacific</SelectItem>
                  <SelectItem value="indian-ocean">Indian Ocean</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time-range">Time Range</Label>
              <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="3m">Last 3 months</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="variable">Variable</Label>
              <Select value={selectedVariable} onValueChange={setSelectedVariable}>
                <SelectTrigger>
                  <SelectValue placeholder="Select variable" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="temperature">Temperature</SelectItem>
                  <SelectItem value="salinity">Salinity</SelectItem>
                  <SelectItem value="pressure">Pressure</SelectItem>
                  <SelectItem value="oxygen">Dissolved Oxygen</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="depth">Depth Range (m)</Label>
              <div className="flex gap-2">
                <Input placeholder="Min" className="w-20" />
                <Input placeholder="Max" className="w-20" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map View */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Global Float Trajectories
                <Badge className="ml-auto">Leaflet Integration Required</Badge>
              </CardTitle>
              <CardDescription>Interactive map showing float locations and trajectories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center border border-dashed border-primary/20">
                <div className="text-center space-y-2">
                  <Globe className="h-12 w-12 mx-auto text-primary/40" />
                  <p className="text-muted-foreground">Interactive Map Component</p>
                  <p className="text-sm text-muted-foreground">Requires backend integration for real data</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Regional Statistics */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Regional Distribution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(floatStats.regions).map(([region, count]) => (
                <div key={region} className="flex justify-between items-center">
                  <span className="text-sm">{region}</span>
                  <Badge variant="outline">{count}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Thermometer className="h-4 w-4" />
                Current Conditions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Label className="text-sm">Surface Temperature</Label>
                <div className="flex justify-between">
                  <span>Global Average</span>
                  <span className="font-semibold">18.2°C</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Salinity</Label>
                <div className="flex justify-between">
                  <span>Global Average</span>
                  <span className="font-semibold">34.7 PSU</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Mixed Layer Depth</Label>
                <div className="flex justify-between">
                  <span>Average</span>
                  <span className="font-semibold">47m</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Data Visualizations */}
      <Card>
        <CardHeader>
          <CardTitle>Data Visualizations</CardTitle>
          <CardDescription>Interactive plots and time-series analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Depth Profile</TabsTrigger>
              <TabsTrigger value="timeseries">Time Series</TabsTrigger>
              <TabsTrigger value="comparison">Comparison</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-4">
              <div className="h-80 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg flex items-center justify-center border border-dashed border-primary/20">
                <div className="text-center space-y-2">
                  <BarChart3 className="h-12 w-12 mx-auto text-primary/40" />
                  <p className="text-muted-foreground">Temperature vs Depth Profile</p>
                  <p className="text-sm text-muted-foreground">Plotly/Matplotlib integration required</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="timeseries" className="space-y-4">
              <div className="h-80 bg-gradient-to-r from-accent/5 to-primary/5 rounded-lg flex items-center justify-center border border-dashed border-accent/20">
                <div className="text-center space-y-2">
                  <TrendingUp className="h-12 w-12 mx-auto text-accent/40" />
                  <p className="text-muted-foreground">Temperature Time Series Analysis</p>
                  <p className="text-sm text-muted-foreground">Time-series plotting component</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="comparison" className="space-y-4">
              <div className="h-80 bg-gradient-to-r from-success/5 to-warning/5 rounded-lg flex items-center justify-center border border-dashed border-success/20">
                <div className="text-center space-y-2">
                  <Gauge className="h-12 w-12 mx-auto text-success/40" />
                  <p className="text-muted-foreground">Multi-Float Comparison View</p>
                  <p className="text-sm text-muted-foreground">Comparative analysis dashboard</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;