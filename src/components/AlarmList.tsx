"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Alarm } from "@/types/alarm";
import { AlarmDetailItem } from "./AlarmDetailItem";
import { AlarmThumbnailItem } from "./AlarmThumbnailItem";
import { VideoModal } from "./VideoModal";
import { LayoutList, LayoutGrid, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { fetchAlarms } from "@/app/actions/getAlarms";
import { fetchElevatorMappings } from "@/app/actions/getElevators";

interface AlarmListProps {
  initialAlarms: Alarm[];
}

type ViewMode = 'detail' | 'thumbnail';

export const AlarmList: React.FC<AlarmListProps> = ({ initialAlarms }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('detail');
  const [alarms, setAlarms] = useState<Alarm[]>(initialAlarms);
  const [elevatorMap, setElevatorMap] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Fetch elevator mappings on mount
  useEffect(() => {
    const loadMappings = async () => {
      const mapping = await fetchElevatorMappings();
      setElevatorMap(mapping);
      
      // Update initial alarms if needed
      setAlarms(prevAlarms => 
        prevAlarms.map(alarm => ({
          ...alarm,
          elevatorName: mapping[alarm.registrationNumber] || alarm.elevatorName
        }))
      );
    };
    loadMappings();
  }, []);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const nextPage = page + 1;
      const { alarms: newAlarms, total } = await fetchAlarms(nextPage, 10);
      
      if (newAlarms.length === 0) {
        setHasMore(false);
      } else {
        // Enrich new alarms with elevator names from map
        const enrichedAlarms = newAlarms.map(alarm => ({
          ...alarm,
          elevatorName: elevatorMap[alarm.registrationNumber]
        }));
        
        setAlarms(prev => [...prev, ...enrichedAlarms]);
        setPage(nextPage);
        if (alarms.length + newAlarms.length >= total) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error("Failed to load more alarms", error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page, alarms.length, elevatorMap]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [loadMore, hasMore, loading]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6">
      {/* Header / Controls */}
      <div className="flex items-center justify-between mb-6 sticky top-0 z-20 bg-black/90 backdrop-blur py-4 border-b border-gray-800">
        <h1 className="text-xl font-bold text-white tracking-tight">Alarm Monitor</h1>
        
        <div className="flex items-center bg-gray-900 rounded-lg p-1 border border-gray-800">
          <button
            onClick={() => setViewMode('detail')}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all",
              viewMode === 'detail' 
                ? "bg-gray-700 text-white shadow-sm" 
                : "text-gray-400 hover:text-gray-200"
            )}
          >
            <LayoutList className="w-4 h-4" />
            <span>Detail</span>
          </button>
          <button
            onClick={() => setViewMode('thumbnail')}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all",
              viewMode === 'thumbnail' 
                ? "bg-gray-700 text-white shadow-sm" 
                : "text-gray-400 hover:text-gray-200"
            )}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Grid</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="min-h-screen pb-20">
        {alarms.length === 0 && !loading ? (
           <div className="text-center text-gray-500 mt-20">No alarms found.</div>
        ) : (
          viewMode === 'detail' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {alarms.map((alarm, index) => (
                <AlarmDetailItem key={`${alarm.id}-${index}`} alarm={alarm} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {alarms.map((alarm, index) => (
                <AlarmThumbnailItem 
                  key={`${alarm.id}-${index}`} 
                  alarm={alarm} 
                  onClick={() => setSelectedVideo(alarm.videoUrl)}
                />
              ))}
            </div>
          )
        )}
        
        {/* Loading Indicator / Sentinel */}
        <div ref={observerTarget} className="h-20 flex items-center justify-center mt-8">
          {loading && <Loader2 className="w-8 h-8 animate-spin text-gray-500" />}
          {!hasMore && alarms.length > 0 && <span className="text-gray-600 text-sm">No more alarms</span>}
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal 
        videoUrl={selectedVideo || ""} 
        isOpen={!!selectedVideo} 
        onClose={() => setSelectedVideo(null)} 
      />
    </div>
  );
};
