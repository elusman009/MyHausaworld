import { NextResponse } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { data: { session } } = await supabase.auth.getSession();
  const url = req.nextUrl.clone();
  
  if (url.pathname.startsWith('/admin')) {
    // Temporary fix: Allow your specific email
    const tempAdminEmail = 'elusman009@gmail.com';
    
    if (!session?.user?.email) {
      console.log('No session found in middleware for admin access');
      return NextResponse.redirect(new URL('/auth', req.url));
    }
    
    console.log('Middleware checking admin access for:', session.user.email);
    
    // Check env variable first, fallback to hardcoded
    const envAllowed = (process.env.ADMIN_EMAILS||'').split(',').map(s=>s.trim()).filter(Boolean);
    const allowed = envAllowed.length > 0 ? envAllowed : [tempAdminEmail];
    
    console.log('Admin emails allowed:', allowed);
    
    if (!allowed.includes(session.user.email)) {
      console.log('User not in admin list, redirecting to home');
      return NextResponse.redirect(new URL('/', req.url));
    }
    
    console.log('Admin access granted');
  }
  
  return res;
}

// Enable middleware for admin routes
export const config = {
  matcher: ['/admin/:path*']
}
