import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, ArrowLeft, HelpCircle } from "lucide-react";
import AnalysisResult from "@/components/AnalysisResult";
import ScamAlerts from "@/components/ScamAlerts";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Result = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [analysisData, setAnalysisData] = useState({
    isReal: false,
    confidenceScore: 0,
    audioName: "voice_sample.mp3",
  });

  useEffect(() => {
    // Simulate API response
    const timer = setTimeout(() => {
      setIsLoading(false);

      // Random result for demo purposes
      const isReal = Math.random() > 0.5;
      setAnalysisData({
        isReal,
        confidenceScore: isReal ? 92 : 87,
        audioName: "voice_sample.mp3",
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleAnalyzeAnother = () => {
    // Navigate back to upload page
    window.location.href = "/upload";
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header / Navigation */}
      <header className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <ShieldCheck className="h-8 w-8 text-sentinel-600 mr-2" />
            <h1 className="text-xl font-bold text-gray-900">
              Voice Sentinel Shield
            </h1>
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className="text-gray-600 hover:text-sentinel-600">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/upload"
                  className="text-gray-600 hover:text-sentinel-600"
                >
                  Analyze
                </Link>
              </li>
              <li>
                <Link
                  to="/learn"
                  className="text-gray-600 hover:text-sentinel-600"
                >
                  Learn
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-5xl mx-auto">
          {/* Back button */}
          <div className="mb-6">
            <Link to="/upload">
              <Button variant="ghost" className="text-gray-600">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Upload
              </Button>
            </Link>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold flex items-center mb-2">
              Analysis Results
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2 text-gray-400"
                    >
                      <HelpCircle size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>
                      Our analysis determines if a voice is human or
                      AI-generated based on subtle patterns and characteristics.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </h2>
            <p className="text-gray-600">
              Voice authenticity evaluation using advanced AI detection
              technology
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <AnalysisResult
                isReal={analysisData.isReal}
                confidenceScore={analysisData.confidenceScore}
                audioName={analysisData.audioName}
                onAnalyzeAnother={handleAnalyzeAnother}
                isLoading={isLoading}
              />

              {!isLoading && (
                <div className="mt-8 bg-sentinel-50 border border-sentinel-100 rounded-lg p-5">
                  <h3 className="font-bold text-lg mb-2">
                    What do these results mean?
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {analysisData.isReal
                      ? "Our analysis indicates this is likely a genuine human voice based on natural speech patterns, breathing rhythms, and vocal variations that are difficult for AI to replicate perfectly."
                      : "Our analysis indicates this is likely an AI-generated voice. We've detected patterns, uniformities, and subtle artifacts that are common in synthetic voice generation."}
                  </p>

                  <h4 className="font-medium text-sentinel-700 mb-1">
                    Next Steps:
                  </h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {analysisData.isReal ? (
                      <>
                        <li>
                          Even with a high confidence score for human voice,
                          remain vigilant if the call seems suspicious.
                        </li>
                        <li>
                          Verify the caller's identity through official channels
                          if they request sensitive information.
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          Be extremely cautious about any requests or
                          information from this source.
                        </li>
                        <li>
                          Do not share personal information, financial details,
                          or access codes.
                        </li>
                        <li>
                          Report the incident to relevant authorities or
                          organizations.
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              )}
            </div>

            <div className="lg:w-1/3">
              <ScamAlerts />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 py-6 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <ShieldCheck className="h-6 w-6 text-sentinel-600 mr-2" />
              <span className="font-medium text-gray-700">
                Voice Sentinel Shield
              </span>
            </div>

            <div className="text-sm text-gray-500">
              2025 Voice Sentinel Shield.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Result;
