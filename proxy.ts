import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { checkSession } from '@/lib/api/serverApi';

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const isAuthRoute =
    pathname.startsWith('/sign-in') || pathname.startsWith('/sign-up');

  const isPrivateRoute =
    pathname.startsWith('/profile') || pathname.startsWith('/notes');

  if (!accessToken && refreshToken) {
    try {
      const sessionResponse = await checkSession();
      const setCookie = sessionResponse.headers['set-cookie'];

      if (sessionResponse.status === 200) {
        if (isAuthRoute) {
          const response = NextResponse.redirect(new URL('/', request.url));

          if (setCookie) {
            const cookieArray = Array.isArray(setCookie)
              ? setCookie
              : [setCookie];

            for (const cookieStr of cookieArray) {
              const parsed = parse(cookieStr);
              const options = {
                expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
                path: parsed.Path,
                maxAge: Number(parsed['Max-Age']),
              };

              if (parsed.accessToken) {
                response.cookies.set(
                  'accessToken',
                  parsed.accessToken,
                  options
                );
              }

              if (parsed.refreshToken) {
                response.cookies.set(
                  'refreshToken',
                  parsed.refreshToken,
                  options
                );
              }
            }
          }

          return response;
        }

        const response = NextResponse.next();

        if (setCookie) {
          const cookieArray = Array.isArray(setCookie)
            ? setCookie
            : [setCookie];

          for (const cookieStr of cookieArray) {
            const parsed = parse(cookieStr);
            const options = {
              expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
              path: parsed.Path,
              maxAge: Number(parsed['Max-Age']),
            };

            if (parsed.accessToken) {
              response.cookies.set('accessToken', parsed.accessToken, options);
            }

            if (parsed.refreshToken) {
              response.cookies.set('refreshToken', parsed.refreshToken, options);
            }
          }
        }

        return response;
      }
    } catch {
      if (isPrivateRoute) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
      }
    }
  }

  if (!accessToken && !refreshToken && isPrivateRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (accessToken && isAuthRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}