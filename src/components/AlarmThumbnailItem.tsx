"use client";

import React from "react";
import { Alarm } from "@/types/alarm";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlarmThumbnailItemProps {
  alarm: Alarm;
  onClick?: () => void;
}

export const AlarmThumbnailItem: React.FC<AlarmThumbnailItemProps> = ({ alarm, onClick }) => {
  return (
    <div 
      className="group relative aspect-video bg-gray-900 rounded-lg overflow-hidden border border-gray-800 cursor-pointer hover:border-gray-600 transition-colors"
      onClick={onClick}
    >
      <img 
        src={alarm.previewImage} 
        alt={alarm.registrationNumber}
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

      {/* Status Dot */}
      <div className={cn(
        "absolute top-2 right-2 w-2.5 h-2.5 rounded-full z-10 border border-black/20 shadow-sm",
        alarm.isSend === 1 ? "bg-green-500" : "bg-red-500"
      )} />

      {/* Play Icon */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-black/50 p-2 rounded-full backdrop-blur-sm">
          <Play className="w-6 h-6 text-white" fill="currentColor" />
        </div>
      </div>

      {/* Time Overlay (Top Right or Bottom Right) */}
      <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/60 rounded text-[10px] font-mono text-gray-300 backdrop-blur-sm">
        {alarm.timestamp}
      </div>

      {/* Elevator Name Overlay (Top Left) */}
      {alarm.elevatorName && (
        <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/60 rounded text-[10px] font-medium text-white backdrop-blur-sm max-w-[80%] truncate">
          {alarm.elevatorName}
        </div>
      )}
    </div>
  );
};
