import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            /** email, name gibi default alanlar */
            name?: string | null;
            email?: string | null;
            image?: string | null;
            /** bizim eklediğimiz role */
            role?: "admin" | "user";
        } & DefaultSession["user"];
    }

    interface JWT {
        role?: "admin" | "user";
    }
}
