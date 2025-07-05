import { NextResponse, NextRequest } from 'next/server';
 
export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const searchParams = request.nextUrl.searchParams;

    if (path == '/editor' && searchParams.get('uuid') == null) {
        const homeURL = new URL('/home', request.url);
        homeURL.searchParams.set('error', 'no-uuid');
        return NextResponse.redirect(homeURL);
    }

    return NextResponse.next()
}
 
export const config = {
    matcher: ['/editor']
}