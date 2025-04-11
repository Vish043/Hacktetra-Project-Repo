
import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, Save, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";

interface RecordVoiceProps {
  onRecordingComplete: (audioBlob: Blob) => void;
}

const RecordVoice: React.FC<RecordVoiceProps> = ({ onRecordingComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        setAudioBlob(audioBlob);
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      
      // Start timer
      setRecordingTime(0);
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      toast({
        title: "Recording started",
        description: "Speak clearly into your microphone.",
      });
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        variant: "destructive",
        title: "Microphone access denied",
        description: "Please allow access to your microphone to record audio.",
      });
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      
      // Stop all audio tracks from the stream
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      toast({
        title: "Recording complete",
        description: "You can now play back your recording or save it.",
      });
    }
  };
  
  const handleSaveRecording = () => {
    if (audioBlob) {
      onRecordingComplete(audioBlob);
    }
  };
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <div className="flex flex-col items-center justify-center mb-6">
          {!isRecording && !audioUrl ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={startRecording}
                    className="relative w-24 h-24 rounded-full bg-sentinel-600 flex items-center justify-center text-white hover:bg-sentinel-700 transition-all focus:outline-none focus:ring-2 focus:ring-sentinel-400 focus:ring-offset-2"
                  >
                    <span className="absolute w-full h-full rounded-full bg-sentinel-400 opacity-60 animate-pulse-ring"></span>
                    <Mic size={36} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Start recording</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : isRecording ? (
            <button
              onClick={stopRecording}
              className="w-24 h-24 rounded-full bg-destructive flex items-center justify-center text-white hover:bg-red-700 transition-all"
            >
              <Square size={32} />
            </button>
          ) : (
            <div className="w-24 h-24 rounded-full bg-sentinel-100 flex items-center justify-center text-sentinel-600">
              <Save size={32} />
            </div>
          )}
        </div>

        <div className="mb-6">
          {isRecording ? (
            <div className="flex flex-col items-center">
              <div className="text-2xl font-mono font-medium mb-2">{formatTime(recordingTime)}</div>
              <div className="flex justify-center items-end space-x-1 h-8">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="waveform-bar h-8" 
                    style={{ '--delay': i } as React.CSSProperties}
                  ></div>
                ))}
              </div>
              <p className="mt-4 text-red-500 flex items-center">
                <span className="mr-1 h-2 w-2 rounded-full bg-red-500 inline-block animate-pulse"></span>
                Recording in progress
              </p>
            </div>
          ) : audioUrl ? (
            <div className="flex flex-col items-center">
              <p className="text-lg font-medium mb-3">Recording complete</p>
              <audio controls src={audioUrl} className="w-full max-w-md rounded mb-4"></audio>
              <Button onClick={handleSaveRecording} className="bg-sentinel-600 hover:bg-sentinel-700">
                Analyze This Recording
              </Button>
            </div>
          ) : (
            <p className="text-gray-600">Click the microphone button to start recording</p>
          )}
        </div>

        <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg flex items-center justify-center">
          <AlertCircle size={16} className="mr-2 text-sentinel-500" />
          <p>Maximum recording length: 2 minutes</p>
        </div>
      </div>
    </div>
  );
};

export default RecordVoice;
