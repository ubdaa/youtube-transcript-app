import { NextResponse } from 'next/server';

export function middleware() {
  // Récupérer la réponse
  const response = NextResponse.next();
  
  // Ajouter les headers CORS
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  
  return response;
}

// Configurer les chemins où le middleware s'applique
export const config = {
  matcher: '/api/:path*',
};
