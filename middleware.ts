import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('lsp-token')?.value
  const role = request.cookies.get('lsp-role')?.value

  const { pathname } = request.nextUrl

  // Redirect ke login jika belum login
  if (!token && (pathname.startsWith('/student') || pathname.startsWith('/admin') || pathname.startsWith('/asesor'))) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Role-based access control
  if (pathname.startsWith('/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (pathname.startsWith('/asesor') && role !== 'asesor') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (pathname.startsWith('/student') && role !== 'peserta') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/student/:path*', '/admin/:path*', '/asesor/:path*'],
}
