
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import { ShieldCheck, Upload as UploadIcon, Mic, ChevronRight } from 'lucide-react';
import UploadVoice from '@/components/UploadVoice';
import RecordVoice from '@/components/RecordVoice';
import TipsSection from '@/components/TipsSection';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    setCurrentStep(2);
    toast({
      title: "File uploaded successfully",
      description: `"${file.name}" is ready for analysis.`,
    });
  };

  const handleRecordingComplete = (blob: Blob) => {
    setRecordedBlob(blob);
    setCurrentStep(2);
    toast({
      title: "Recording saved",
      description: "Your voice recording is ready for analysis.",
    });
  };

  const handleAnalyze = () => {
    // In a real app, you'd send the file/blob to your API here
    toast({
      title: "Analysis started",
      description: "Processing your audio. This may take a moment...",
    });
    
    // Simulate processing delay
    setTimeout(() => {
      navigate('/result');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header / Navigation */}
      <header className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <ShieldCheck className="h-8 w-8 text-sentinel-600 mr-2" />
            <h1 className="text-xl font-bold text-gray-900">Voice Sentinel Shield</h1>
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li><Link to="/" className="text-gray-600 hover:text-sentinel-600">Home</Link></li>
              <li><Link to="/upload" className="text-gray-600 hover:text-sentinel-600 font-medium">Analyze</Link></li>
              <li><Link to="/learn" className="text-gray-600 hover:text-sentinel-600">Learn</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 flex-grow">
        {/* Steps */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-center">
            <div className={`step-item ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'complete' : ''}`}>
              <div className="step">1</div>
              <p className="text-sm mt-2">Upload/Record</p>
            </div>
            <div className={`step-item ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'complete' : ''}`}>
              <div className="step">2</div>
              <p className="text-sm mt-2">Analyze</p>
            </div>
            <div className={`step-item ${currentStep >= 3 ? 'active' : ''} ${currentStep > 3 ? 'complete' : ''}`}>
              <div className="step">3</div>
              <p className="text-sm mt-2">Results</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 max-w-5xl mx-auto">
          <div className="lg:w-3/5">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold mb-1">Check Voice Authenticity</h2>
                <p className="text-gray-600">Upload an audio file or record your voice to analyze</p>
              </div>
              
              <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
                <Tab.List className="flex border-b">
                  <Tab className={({ selected }) => 
                    `w-1/2 py-3 text-sm font-medium text-center outline-none ${
                      selected 
                        ? 'text-sentinel-600 border-b-2 border-sentinel-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`
                  }>
                    <div className="flex items-center justify-center">
                      <UploadIcon className="h-4 w-4 mr-2" />
                      Upload Audio
                    </div>
                  </Tab>
                  <Tab className={({ selected }) => 
                    `w-1/2 py-3 text-sm font-medium text-center outline-none ${
                      selected 
                        ? 'text-sentinel-600 border-b-2 border-sentinel-600' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`
                  }>
                    <div className="flex items-center justify-center">
                      <Mic className="h-4 w-4 mr-2" />
                      Record Voice
                    </div>
                  </Tab>
                </Tab.List>
                <Tab.Panels className="p-6">
                  <Tab.Panel>
                    <UploadVoice onFileSelected={handleFileSelected} />
                  </Tab.Panel>
                  <Tab.Panel>
                    <RecordVoice onRecordingComplete={handleRecordingComplete} />
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
              
              {(selectedFile || recordedBlob) && (
                <div className="p-6 bg-gray-50 border-t">
                  <Button 
                    onClick={handleAnalyze}
                    className="w-full bg-sentinel-600 hover:bg-sentinel-700"
                    size="lg"
                  >
                    Analyze Audio
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <div className="lg:w-2/5">
            <TipsSection />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 py-6 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <ShieldCheck className="h-6 w-6 text-sentinel-600 mr-2" />
              <span className="font-medium text-gray-700">Voice Sentinel Shield</span>
            </div>
            
            <div className="text-sm text-gray-500">
              &copy; 2025 Voice Sentinel Shield. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Upload;
