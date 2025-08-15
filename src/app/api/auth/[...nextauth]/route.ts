import NextAuth, { AuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

// NextAuth config
export const authOptions: AuthOptions = {
    providers: [
        Auth0Provider({
            clientId: process.env.AUTH0_CLIENT_ID!,
            clientSecret: process.env.AUTH0_CLIENT_SECRET!,
            issuer: process.env.AUTH0_ISSUER_BASE_URL!,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.email === "admin@example.com" ? "admin" : "user";
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) session.user.role = token.role as "admin" | "user";
            return session;
        },
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
