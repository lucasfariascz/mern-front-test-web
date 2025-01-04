import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next(); // Permite o acesso caso o token exista
}

// Aplica o middleware em rotas específicas
export const config = {
  matcher: ['/src/:path*'], // Ajuste o caminho conforme sua estrutura
};
