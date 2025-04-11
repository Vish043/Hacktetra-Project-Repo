
import React, { useState, useRef } from 'react';
import { Upload, FileAudio, Check, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

interface UploadVoiceProps {
  onFileSelected: (file: File) => void;
}

const UploadVoice: React.FC<UploadVoiceProps> = ({ onFileSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (validateFile(droppedFile)) {
      setFile(droppedFile);
      simulateUpload(droppedFile);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
        simulateUpload(selectedFile);
      }
    }
  };

  const validateFile = (file: File): boolean => {
    // Check if it's an audio file
    if (!file.type.startsWith('audio/')) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload an audio file (MP3, WAV, etc.).",
      });
      return false;
    }
    return true;
  };

  const simulateUpload = (file: File) => {
    setIsUploading(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          onFileSelected(file);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div 
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
          isDragging ? 'border-sentinel-500 bg-sentinel-50' : 'border-slate-300 hover:border-sentinel-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {!file ? (
          <>
            <div className="mb-4 flex justify-center">
              <div className="h-16 w-16 rounded-full bg-sentinel-100 flex items-center justify-center">
                <Upload size={30} className="text-sentinel-600" />
              </div>
            </div>
            <h3 className="text-lg font-medium mb-1 text-gray-800">Drag & drop audio file</h3>
            <p className="text-gray-500 mb-4">or click to browse from your device</p>
            <input 
              type="file" 
              ref={fileInputRef}
              className="hidden" 
              accept="audio/*" 
              onChange={handleFileInput}
            />
            <Button 
              variant="outline"
              onClick={triggerFileInput}
              className="border-sentinel-300 text-sentinel-600 hover:bg-sentinel-50"
            >
              Browse Files
            </Button>
          </>
        ) : (
          <div className="py-3">
            <div className="flex items-center justify-center mb-4">
              {progress < 100 ? (
                <div className="animate-pulse">
                  <FileAudio size={40} className="text-sentinel-400" />
                </div>
              ) : (
                <div className="h-12 w-12 rounded-full bg-success-100 flex items-center justify-center">
                  <Check size={24} className="text-success-500" />
                </div>
              )}
            </div>
            <h4 className="text-md font-medium mb-2 truncate max-w-full">{file.name}</h4>
            
            {isUploading ? (
              <div className="w-full mb-3">
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-gray-500 mt-1">Uploading... {progress}%</p>
              </div>
            ) : (
              <div className="flex justify-center mt-4 space-x-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="waveform-bar h-8" 
                    style={{ '--delay': i } as React.CSSProperties}
                  ></div>
                ))}
              </div>
            )}
            
            <div className="mt-4 flex justify-center">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  setFile(null);
                  setProgress(0);
                }}
                className="text-gray-500"
              >
                Upload different file
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4 px-4">
        <div className="flex items-center text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
          <AlertCircle size={16} className="mr-2 text-sentinel-500" />
          <p>Supported file formats: MP3, WAV, M4A (Max 10MB)</p>
        </div>
      </div>
    </div>
  );
};

export default UploadVoice;
