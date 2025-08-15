import { withAuth } from "next-auth/middleware";
import { NextRequest } from "next/server";

export default withAuth({
    pages: {
        signIn: "/login", // Giriş sayfası yoksa hata alırsın
    },
});

export const config = {
    matcher: ["/dashboard/:path*", "/admin/:path*"],
};
