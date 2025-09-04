import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Upload as UploadIcon, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Trash2, 
  Download,
  Database,
  Waves,
  MapPin,
  Calendar,
  Activity
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  progress: number;
  metadata?: {
    floatId: string;
    profiles: number;
    dateRange: string;
    location: { lat: number; lon: number };
    variables: string[];
  };
  error?: string;
}

const Upload = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadedFile[] = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      status: 'uploading',
      progress: 0,
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate file processing
    newFiles.forEach(file => {
      simulateFileProcessing(file.id);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/x-netcdf': ['.nc'],
      'application/octet-stream': ['.nc'],
    },
    multiple: true,
  });

  const simulateFileProcessing = (fileId: string) => {
    const updateProgress = (progress: number, status: UploadedFile['status']) => {
      setFiles(prev => prev.map(file => 
        file.id === fileId ? { ...file, progress, status } : file
      ));
    };

    // Simulate upload progress
    let progress = 0;
    const uploadInterval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        clearInterval(uploadInterval);
        updateProgress(100, 'processing');
        
        // Simulate processing
        setTimeout(() => {
          const mockMetadata = {
            floatId: `ARGO_${Math.floor(Math.random() * 9000000) + 1000000}`,
            profiles: Math.floor(Math.random() * 500) + 50,
            dateRange: '2023-01 to 2024-01',
            location: { 
              lat: Math.random() * 180 - 90, 
              lon: Math.random() * 360 - 180 
            },
            variables: ['temperature', 'salinity', 'pressure', 'oxygen']
          };
          
          setFiles(prev => prev.map(file => 
            file.id === fileId ? { 
              ...file, 
              status: 'completed',
              progress: 100,
              metadata: mockMetadata
            } : file
          ));
        }, 2000);
      } else {
        updateProgress(progress, 'uploading');
      }
    }, 200);
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const getStatusColor = (status: UploadedFile['status']) => {
    switch (status) {
      case 'uploading': return 'bg-blue-500';
      case 'processing': return 'bg-yellow-500';
      case 'completed': return 'bg-green-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: UploadedFile['status']) => {
    switch (status) {
      case 'uploading':
      case 'processing':
        return <Activity className="h-4 w-4 animate-spin" />;
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Upload Ocean Data</h1>
        <p className="text-muted-foreground">
          Upload NetCDF files containing ARGO float data for automatic processing and ingestion
        </p>
      </div>

      {/* Backend Required Alert */}
      <Alert>
        <Database className="h-4 w-4" />
        <AlertTitle>Backend Integration Required</AlertTitle>
        <AlertDescription>
          To enable file upload and processing, you need to connect to Supabase for backend functionality.
          The upload interface is ready and will automatically process NetCDF files once backend is connected.
        </AlertDescription>
      </Alert>

      {/* Upload Zone */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UploadIcon className="h-5 w-5" />
            Drag & Drop Files
          </CardTitle>
          <CardDescription>
            Upload NetCDF (.nc) files containing ocean profile data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all duration-300 ${
              isDragActive 
                ? 'border-primary bg-primary/5 scale-105' 
                : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/30'
            }`}
          >
            <input {...getInputProps()} />
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <UploadIcon className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-medium">
                  {isDragActive ? 'Drop files here' : 'Drag & drop NetCDF files'}
                </p>
                <p className="text-sm text-muted-foreground">
                  or click to select files from your computer
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="outline">.nc files</Badge>
                <Badge variant="outline">Multiple files</Badge>
                <Badge variant="outline">Auto-processing</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File Processing Status */}
      {files.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Upload Status
            </CardTitle>
            <CardDescription>
              Track the progress of your file uploads and processing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {files.map((file) => (
                <div key={file.id} className="space-y-3 p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(file.status)}
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={file.status === 'completed' ? 'default' : 'secondary'}
                        className={file.status === 'completed' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {file.status}
                      </Badge>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeFile(file.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {file.status !== 'completed' && (
                    <Progress value={file.progress} className="w-full" />
                  )}
                  
                  {file.metadata && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-3 p-3 bg-muted/30 rounded">
                      <div className="flex items-center gap-2">
                        <Waves className="h-4 w-4 text-primary" />
                        <span className="text-sm">
                          <span className="font-medium">Float:</span> {file.metadata.floatId}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-accent" />
                        <span className="text-sm">
                          <span className="font-medium">Profiles:</span> {file.metadata.profiles}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          <span className="font-medium">Range:</span> {file.metadata.dateRange}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-success" />
                        <span className="text-sm">
                          <span className="font-medium">Location:</span> 
                          {file.metadata.location.lat.toFixed(1)}°, {file.metadata.location.lon.toFixed(1)}°
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary Table */}
      {files.filter(f => f.status === 'completed').length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              Processed Files Summary
            </CardTitle>
            <CardDescription>
              Successfully processed ocean profile data ready for analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File Name</TableHead>
                  <TableHead>Float ID</TableHead>
                  <TableHead>Profiles</TableHead>
                  <TableHead>Date Range</TableHead>
                  <TableHead>Variables</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {files
                  .filter(f => f.status === 'completed' && f.metadata)
                  .map((file) => (
                    <TableRow key={file.id}>
                      <TableCell className="font-medium">{file.name}</TableCell>
                      <TableCell>{file.metadata?.floatId}</TableCell>
                      <TableCell>{file.metadata?.profiles}</TableCell>
                      <TableCell>{file.metadata?.dateRange}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {file.metadata?.variables.map(variable => (
                            <Badge key={variable} variant="outline" className="text-xs">
                              {variable}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>File Format Requirements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Supported Formats</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• NetCDF (.nc) files</li>
                <li>• ARGO float profile data</li>
                <li>• Standard CF conventions</li>
                <li>• Multiple profiles per file</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Required Variables</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Temperature (TEMP)</li>
                <li>• Salinity (SAL)</li>
                <li>• Pressure/Depth (PRES)</li>
                <li>• Latitude/Longitude (LAT/LON)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Upload;