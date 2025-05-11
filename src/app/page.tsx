import { TranscriptForm } from "@/components/transcript-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">YouTube Transcript</CardTitle>
          <CardDescription className="text-center">
            Entrez l&apos;URL d&apos;une vidéo YouTube pour récupérer sa transcription
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TranscriptForm />
        </CardContent>
      </Card>
    </div>
  );
}