"use client";

import React, { useRef, useState, useEffect } from "react";
import { Alarm } from "@/types/alarm";
import { Play, Pause, Hash, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlarmDetailItemProps {
  alarm: Alarm;
}

export const AlarmDetailItem: React.FC<AlarmDetailItemProps> = ({ alarm }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div ref={containerRef} className="relative bg-[#111] border border-gray-800 rounded-lg overflow-hidden flex flex-col shadow-lg h-full">
      {/* Status Dot */}
      <div className={cn(
        "absolute top-3 right-3 w-3 h-3 rounded-full z-10 border border-black/20 shadow-sm",
        alarm.isSend === 1 ? "bg-green-500" : "bg-red-500"
      )} />

      {/* Video Section */}
      <div className="relative w-full aspect-video bg-black group cursor-pointer" onClick={togglePlay}>
        <video
          ref={videoRef}
          src={alarm.videoUrl}
          poster={alarm.previewImage}
          className="w-full h-full object-contain"
          playsInline
          loop
          muted
        />
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
            <Play className="w-12 h-12 text-white/80" fill="currentColor" />
          </div>
        )}
        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 rounded text-xs text-white flex items-center gap-1">
           {isPlaying ? "Live" : "Paused"}
        </div>
      </div>

      {/* Details Section */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between">
           <div>
              <span className={cn(
                "inline-block px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider mb-2",
                alarm.alarmType.toLowerCase().includes("fire") ? "bg-red-900/50 text-red-200 border border-red-800" : 
                alarm.alarmType.toLowerCase().includes("intrusion") ? "bg-orange-900/50 text-orange-200 border border-orange-800" : "bg-blue-900/50 text-blue-200 border border-blue-800"
              )}>
                {alarm.alarmType}
              </span>
              <h3 className="text-lg font-mono font-bold text-white flex items-center gap-2">
                <Hash className="w-4 h-4 text-gray-500" />
                {alarm.registrationNumber}
              </h3>
              {alarm.elevatorName && (
                <div className="text-sm text-gray-400 mt-1 font-medium flex items-center gap-2">
                   <MapPin className="w-3 h-3" />
                   {alarm.elevatorName}
                </div>
              )}
           </div>
        </div>

        <div className="space-y-2 text-xs text-gray-400 font-mono">
          <div className="flex items-center gap-2 p-2 bg-gray-900/50 rounded">
            <Clock className="w-3 h-3 shrink-0" />
            <span>{alarm.timestamp}</span>
          </div>
        </div>

        <div className="mt-auto pt-3 border-t border-gray-800">
          <button className="w-full py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-xs font-medium rounded transition-colors">
            View Analysis Report
          </button>
        </div>
      </div>
    </div>
  );
};
