import React from "react";
import {
  CheckCircle2,
  XCircle,
  Shield,
  RefreshCw,
  Download,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface AnalysisResultProps {
  isReal: boolean;
  confidenceScore: number;
  audioName?: string;
  onAnalyzeAnother: () => void;
  isLoading?: boolean;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({
  isReal,
  confidenceScore,
  audioName = "Analyzed audio",
  onAnalyzeAnother,
  isLoading = false,
}) => {
  return (
    <Card
      className="w-full max-w-2xl mx-auto shadow-lg border-t-8 transition-all duration-300"
      style={{
        borderTopColor: isLoading ? "#9ca3af" : isReal ? "#10b981" : "#ef4444",
      }}
    >
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl sm:text-3xl font-bold">
          {isLoading ? (
            <div className="flex items-center justify-center text-gray-600">
              <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
              Analyzing...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              {isReal ? (
                <CheckCircle2 className="mr-3 h-8 w-8 text-success-500" />
              ) : (
                <XCircle className="mr-3 h-8 w-8 text-destructive" />
              )}
              <span>{isReal ? "Authentic Voice" : "AI-Generated Voice"}</span>
            </div>
          )}
        </CardTitle>
        <CardDescription className="text-base mt-1">
          {isLoading ? (
            "Please wait while we analyze your audio"
          ) : (
            <>"{audioName}"</>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-4 pb-6">
        {isLoading ? (
          <div className="space-y-4">
            <p className="text-center text-sm text-muted-foreground">
              Our advanced AI is analyzing voice patterns and characteristics...
            </p>
            <Progress value={45} className="h-2 w-full max-w-md mx-auto" />
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Confidence Score</span>
              <span className="text-sm font-bold">{confidenceScore}%</span>
            </div>
            <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  isReal ? "bg-success-500" : "bg-destructive"
                } transition-all duration-500`}
                style={{ width: `${confidenceScore}%` }}
              ></div>
            </div>

            <div className="mt-6 bg-slate-50 p-4 rounded-lg">
              <h4 className="font-medium flex items-center mb-2">
                <Shield className="mr-2 h-4 w-4 text-sentinel-500" />
                Analysis Summary
              </h4>
              <p className="text-sm text-gray-600">
                {isReal
                  ? "Our system has detected natural voice patterns, breath variations, and phonetic markers consistent with human speech."
                  : "Our system has detected unnatural intonation, uniform patterns, and audio artifacts typically found in AI-generated voice content."}
              </p>
            </div>

            <div className="mt-6">
              <h4 className="font-medium mb-2">Audio Waveform</h4>
              <div className="bg-gray-100 h-24 rounded-lg overflow-hidden p-2 flex items-center justify-center">
                <div className="flex h-full items-end justify-around w-full px-2">
                  {Array.from({ length: 30 }).map((_, i) => {
                    const height = isReal
                      ? Math.floor(Math.random() * 100)
                      : 40 + Math.sin(i / 2) * 30;
                    return (
                      <div
                        key={i}
                        style={{ height: `${height}%` }}
                        className={`w-1 rounded-t-sm ${
                          isReal ? "bg-success-400" : "bg-destructive/70"
                        }`}
                      ></div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>

      <CardFooter className="flex flex-wrap justify-center gap-3 pt-2">
        {!isLoading && (
          <>
            <Button variant="outline" size="sm" onClick={onAnalyzeAnother}>
              Analyze Another
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default AnalysisResult;
