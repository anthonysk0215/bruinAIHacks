"use client"

import { useState } from "react"
import { Mic } from "lucide-react"
import { cn } from "../lib/utils"

interface MicButtonProps {
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
}

export function MicButton({ isRecording, onStartRecording, onStopRecording }: MicButtonProps) {
  return (
    <div className="relative flex flex-col items-center justify-center h-48">
      {/* Pulse animation */}
      {isRecording && (
        <>
          <div className="absolute top-0 inset-x-0 h-32 rounded-full bg-[#3b82f6]/20 animate-ping"></div>
          <div className="absolute top-0 inset-x-0 h-32 rounded-full bg-[#3b82f6]/30 animate-pulse"></div>
        </>
      )}

      {/* Main button with ring */}
      <div className="relative">
        {/* Blue glowing ring - only shown when not recording */}
        {!isRecording && (
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] blur-sm opacity-75" />
        )}
        
        {/* Button */}
        <button
          onClick={isRecording ? onStopRecording : onStartRecording}
          className={`
            relative w-32 h-32 rounded-full z-10
            flex items-center justify-center
            transition-all duration-300 shadow-lg border-2
            ${isRecording 
              ? 'bg-[#3b82f6] text-white scale-110 shadow-[#3b82f6]/30 border-[#60a5fa]/70 -translate-y-6' 
              : 'bg-[#1e2030] text-[#3b82f6] hover:bg-[#2a2d3d] border-[#3b82f6]/50 hover:border-[#3b82f6]/70 translate-y-0'}
          `}
        >
          <Mic className={`h-12 w-12 transition-all duration-300 ${isRecording ? "animate-pulse" : ""}`} />
        </button>
      </div>

      {/* Listening text */}
      {isRecording && (
        <div className="text-center mt-4 text-[#3b82f6] animate-pulse">
          Listening...
        </div>
      )}
    </div>
  );
}
