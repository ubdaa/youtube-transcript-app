"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { extractVideoId } from "@/lib/utils";
import { TranscriptDisplay } from "./transcript-display";
import { Loader2, Command } from "lucide-react";

// Utility function to decode HTML entities
function decodeHtmlEntities(text: string): string {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
}

interface FormValues {
  youtubeUrl: string;
}

export function TranscriptForm() {
  const [transcript, setTranscript] = useState<string>("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMac, setIsMac] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Detect OS on client-side
  useEffect(() => {
    setIsMac(navigator.userAgent.indexOf('Mac') !== -1);
  }, []);

  // Add keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Cmd+F (Mac) or Ctrl+F (Windows/Linux)
      if ((isMac ? e.metaKey : e.ctrlKey) && e.key === 'k') {
        e.preventDefault(); // Prevent default browser search
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMac]);

  const form = useForm<FormValues>({
    defaultValues: {
      youtubeUrl: "",
    },
  });

  const onSubmit = async (formData: FormValues) => {
    setLoading(true);
    setError(null);
    
    try {
      const id = extractVideoId(formData.youtubeUrl);
      
      if (!id) {
        setError("URL YouTube invalide");
        setLoading(false);
        return;
      }
      
      setVideoId(id);
      
      const response = await fetch(`/api/transcript?videoId=${id}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Impossible de récupérer la transcription");
      }
      
      const responseData = await response.json();
      
      if (responseData.transcript) {
        // Decode HTML entities before setting the transcript
        setTranscript(decodeHtmlEntities(responseData.transcript));
      } else {
        setError(responseData.error || "Une erreur est survenue");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="youtubeUrl"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="https://www.youtube.com/watch?v=..."
                      {...field}
                      disabled={loading}
                      ref={inputRef}
                      className="pr-24" // Add padding to the right to make room for the badge
                    />
                    <Badge 
                      variant="outline" 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 gap-1 flex items-center"
                    >
                      <Command className="h-3 w-3" />
                      <span>{isMac ? 'Cmd' : 'Ctrl'}+K</span>
                    </Badge>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Chargement...
              </>
            ) : (
              "Récupérer la transcription"
            )}
          </Button>
        </form>
      </Form>

      {error && (
        <div className="p-4 border border-red-300 bg-red-50 text-red-800 rounded-md">
          {error}
        </div>
      )}

      {transcript && videoId && (
        <TranscriptDisplay transcript={transcript} videoId={videoId} />
      )}
    </div>
  );
}