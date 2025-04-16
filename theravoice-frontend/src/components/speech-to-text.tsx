import { useEffect, useState } from "react";

interface SpeechToTextProps {
  isRecording: boolean;
  onTranscriptUpdate: (transcript: string) => void;
}

export function SpeechToText({ isRecording, onTranscriptUpdate }: SpeechToTextProps) {
  const [transcript, setTranscript] = useState<string>("");
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Initialize speech recognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event) => {
          let currentTranscript = '';
          for (let i = 0; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setTranscript(currentTranscript);
          onTranscriptUpdate(currentTranscript);
        };

        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
        };

        setRecognition(recognition);
      }
    }
  }, []);

  useEffect(() => {
    if (recognition) {
      if (isRecording) {
        recognition.start();
      } else {
        recognition.stop();
        setTranscript("");
      }
    }
  }, [isRecording, recognition]);

  return (
    <div className={`
      fixed right-24 top-1/3
      w-96 h-[32rem] bg-[#1e2030] rounded-lg
      border border-[#3b82f6]/30
      transform transition-all duration-300 ease-in-out
      ${isRecording ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'}
    `}>
      <div className="p-6 h-full flex flex-col">
        <h3 className="text-lg font-semibold text-[#3b82f6] mb-4">
          Transcription
        </h3>
        <div className="flex-1 overflow-auto">
          <p className="text-gray-300 whitespace-pre-wrap">
            {transcript || "Listening..."}
          </p>
        </div>
      </div>
    </div>
  );
} 