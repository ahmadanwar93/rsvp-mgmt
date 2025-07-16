import NextAuth, { AuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/src/db"
import { users, accounts, sessions, verificationTokens } from "@/src/db/schema"

// let NextAuth create all the necessary authentication endpoints just by passing the configurations 

const emailConfig = process.env.NODE_ENV === 'production' 
  ? {
    // configure resend later
      host: "smtp.resend.com",
      port: 587,
      auth: {
        user: "resend",
        pass: process.env.RESEND_API_KEY,
      },
    }
  : {
      host: "sandbox.smtp.mailtrap.io", 
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    }

export const authOptions:AuthOptions = {
    adapter: DrizzleAdapter(db, {
      usersTable: users,
      accountsTable: accounts,
      sessionsTable: sessions,
      verificationTokensTable: verificationTokens,
    }),
    providers: [
      EmailProvider({
        server: emailConfig,
        from: process.env.EMAIL_FROM,
      }),
    ],
    pages: {
      signIn: '/signin',
      verifyRequest: '/verify-request',
      signOut: '/signin',
      error: '/error'
    },
    session: {
        strategy: "jwt", 
      },
      callbacks: {
        session: async ({ session, token }) => {
          // TODO: is still necessary?
          if (session?.user && token.sub) {
            (session.user as any).id = token.sub;
          }
          return session;
        },
        jwt: async ({ token, user }) => {
          if (user) {
            token.id = user.id;
          }
          return token;
        },
        redirect: async ({ url, baseUrl }) => {
          // TODO: revamp the redirect. Now it is still too aggressive
          // If user is signing out, don't redirect to dashboard
          if (url.includes('/signout') || url.includes('/signin')) {
            return baseUrl // This will go to your home page
          }
          
          // If it's a successful sign-in (coming from email callback)
          if (url.startsWith(baseUrl)) {
            // Only redirect to dashboard for successful sign-ins
            if (url.includes('/callback/email')) {
              return `${baseUrl}/dashboard`
            }
            // For other internal URLs, allow them
            return url
          }
          
          // Default fallback
          return baseUrl
        },
      },
      cookies: {
        // TODO: check this. Not sure if still necessary
        sessionToken: {
          name: `next-auth.session-token`,
          options: {
            httpOnly: true,
            sameSite: 'lax',
            path: '/',
            secure: process.env.NODE_ENV === 'production'
          }
        }
      }
  }

const handler = NextAuth(authOptions)

  export { handler as GET, handler as POST }