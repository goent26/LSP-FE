import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('lsp-token')?.value
  const role = request.cookies.get('lsp-role')?.value

  const { pathname } = request.nextUrl
  console.log(pathname, "ini path")

  // Redirect ke login jika belum login
  if (!token && (pathname.startsWith('/student') || pathname.startsWith('/admin') || pathname.startsWith('/Asesor') )) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

   // Redirect antar role kalau akses halaman yang bukan miliknya
   if (role === 'admin' && (pathname.startsWith('/student') || pathname.startsWith('/Asesor'))) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  if (role === 'asesor' && (pathname.startsWith('/admin') || pathname.startsWith('/student'))) {
    return NextResponse.redirect(new URL('/asesor', request.url))
  }

  if (role === 'peserta' && (pathname.startsWith('/admin') || pathname.startsWith('/Asesor'))) {
    return NextResponse.redirect(new URL('/student', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/student/:path*', '/admin/:path*', '/Asesor/:path*'],
}
