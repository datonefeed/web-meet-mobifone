import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import {NextRequest, NextResponse} from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl;
  if (pathname.startsWith('/admin')) {
    return NextResponse.next();
  }
  return intlMiddleware(request);
}
export const config = {
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)']
};
