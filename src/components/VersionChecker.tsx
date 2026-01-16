"use client";

import React, { useEffect, useState } from "react";
import { RefreshCw, X, Info } from "lucide-react";
import { APP_VERSION, VERSION_DESC, VERSION_TITLE } from "@/lib/version";

export const VersionChecker: React.FC = () => {
  const [hasUpdate, setHasUpdate] = useState(false);
  const [showReleaseNotes, setShowReleaseNotes] = useState(false);

  useEffect(() => {
    // Check for updates
    const checkForUpdate = async () => {
      try {
        const res = await fetch(`/version.json?t=${Date.now()}`);
        if (!res.ok) return;
        const data = await res.json();
        if (data.version && data.version !== APP_VERSION) {
          setHasUpdate(true);
        }
      } catch (error) {
        console.error("Failed to check version:", error);
      }
    };

    // Check immediately and then every minute
    checkForUpdate();
    const interval = setInterval(checkForUpdate, 60000);

    // Check if we need to show release notes
    const storedVersion = localStorage.getItem("app_version");
    if (storedVersion !== APP_VERSION) {
      setShowReleaseNotes(true);
    }

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleCloseReleaseNotes = () => {
    localStorage.setItem("app_version", APP_VERSION);
    setShowReleaseNotes(false);
  };

  if (!hasUpdate && !showReleaseNotes) return null;

  return (
    <>
      {/* Update Available Banner/Modal */}
      {hasUpdate && (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg p-4 flex items-center gap-4 max-w-sm">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
              <RefreshCw className="w-5 h-5 animate-spin-slow" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-sm text-zinc-900 dark:text-zinc-100">
                发现新版本
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                请刷新页面以获取最新功能
              </p>
            </div>
            <button
              onClick={handleRefresh}
              className="px-3 py-1.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-medium rounded hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
            >
              刷新
            </button>
          </div>
        </div>
      )}

      {/* Release Notes Modal */}
      {showReleaseNotes && !hasUpdate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden ring-1 ring-zinc-200 dark:ring-zinc-800">
            {/* Header */}
            <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50">
              <div className="flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-500" />
                <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {VERSION_TITLE}
                </h2>
              </div>
              <button
                onClick={handleCloseReleaseNotes}
                className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-6 max-h-[60vh] overflow-y-auto">
              <div className="space-y-4">
                {VERSION_DESC.map((desc, index) => {
                   // Split bold text for markdown-like rendering
                   const parts = desc.split(/(\*\*.*?\*\*)/g);
                   return (
                     <div key={index} className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                       <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                       <p>
                         {parts.map((part, i) => {
                           if (part.startsWith('**') && part.endsWith('**')) {
                             return <span key={i} className="font-semibold text-zinc-900 dark:text-zinc-100">{part.slice(2, -2)}</span>;
                           }
                           return <span key={i}>{part}</span>;
                         })}
                       </p>
                     </div>
                   );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
              <button
                onClick={handleCloseReleaseNotes}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm shadow-blue-500/20"
              >
                知道了
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
