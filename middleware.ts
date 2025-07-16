import { withAuth } from "next-auth/middleware"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    // this will run after authorized returns true
    // can put logging here 
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Return true if user is authenticated
        // this authorized callback will run before the custom middleware
        // can put RBAC here
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    // use :path* such that it will match /dashboard/ as well
    "/dashboard/:path*",
  ]
}