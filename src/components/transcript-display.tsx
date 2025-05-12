"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Copy, Command } from "lucide-react";

interface TranscriptDisplayProps {
  transcript: string;
  videoId: string;
}

function decodeHtmlEntities(text: string): string {
  return text.replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec));
}

export function TranscriptDisplay({ transcript, videoId }: TranscriptDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [isMac, setIsMac] = useState(false);

  // Detect OS on client-side
  useEffect(() => {
    setIsMac(navigator.userAgent.indexOf('Mac') !== -1);
  }, []);

  // Add keyboard shortcut listener for copy
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Cmd+C (Mac) or Ctrl+C (Windows/Linux)
      if ((isMac ? e.metaKey : e.ctrlKey) && e.key === 'c' && !window.getSelection()?.toString()) {
        e.preventDefault();
        copyToClipboard();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMac, transcript]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(decodeHtmlEntities(transcript));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="mt-6">
      <CardContent className="">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Transcription</h3>
          <div className="flex items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4 mr-2" />
                    {copied ? "Copié!" : "Copier"}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="flex items-center gap-1">
                    <Command className="h-3 w-3" />
                    <span>{isMac ? 'Cmd' : 'Ctrl'}+C</span>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        
        <div className="aspect-video mb-4">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-md"
          ></iframe>
        </div>
        
        <div className="max-h-96 overflow-y-auto p-4 bg-slate-100 dark:bg-slate-800 rounded-md whitespace-pre-wrap">
          {decodeHtmlEntities(transcript)}
        </div>
      </CardContent>
    </Card>
  );
}