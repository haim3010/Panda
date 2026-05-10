import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isEmployeeRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/profile(.*)',
  '/explore(.*)',
  '/matches(.*)',
  '/activities(.*)',
  '/chat(.*)',
  '/badges(.*)',
  '/rewards(.*)',
  '/onboarding(.*)',
])

const isHrRoute = createRouteMatcher(['/hr(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isEmployeeRoute(req) || isHrRoute(req)) {
    const authObj = await auth()
    if (!authObj.userId) {
      return authObj.redirectToSignIn()
    }
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
