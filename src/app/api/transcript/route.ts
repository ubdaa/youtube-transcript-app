import { NextRequest, NextResponse } from "next/server";
import { YoutubeTranscript } from "youtube-transcript";

// Utility function to decode HTML entities
function decodeHtmlEntities(text: string): string {
  return text.replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec));
}

export async function GET(request: NextRequest) {
  const videoId = request.nextUrl.searchParams.get("videoId");

  if (!videoId) {
    return NextResponse.json(
      { error: "Paramètre videoId manquant" },
      { status: 400 }
    );
  }

  try {
    const transcriptResponse = await YoutubeTranscript.fetchTranscript(videoId);
    
    if (!transcriptResponse || transcriptResponse.length === 0) {
      return NextResponse.json(
        { error: "Aucune transcription disponible pour cette vidéo" },
        { status: 404 }
      );
    }

    // Formater et décoder la transcription
    const transcript = transcriptResponse
      .map((item) => decodeHtmlEntities(item.text))
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    return NextResponse.json({ transcript });
  } catch (error) {
    console.error("Erreur lors de la récupération de la transcription:", error);
    
    return NextResponse.json(
      {
        error: "Impossible de récupérer la transcription. Vérifiez que la vidéo existe et possède des sous-titres."
      },
      { status: 500 }
    );
  }
}