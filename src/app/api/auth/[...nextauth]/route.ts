import NextAuth, { AuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

// AuthOptions, NextAuth.js'nin tüm yapılandırmalarını içerir.
export const authOptions: AuthOptions = {
    // Kimlik doğrulama sağlayıcılarını tanımlanır.
    providers: [
        Auth0Provider({
            clientId: process.env.AUTH0_CLIENT_ID!,
            clientSecret: process.env.AUTH0_CLIENT_SECRET!,
            issuer: process.env.AUTH0_ISSUER_BASE_URL!,
        }),
    ],

    // Oturum verilerinin şifrelenmesi için kullanılan gizli anahtardır.
    secret: process.env.NEXTAUTH_SECRET,

    // Oturum yönetim stratejisini JWT (JSON Web Token) olarak belirledim.
    // Bu, sunucu tarafında oturum verisi tutmayı gerektirmez.
    session: {
        strategy: "jwt",
    },

    // NextAuth.js'nin çeşitli olaylar (login, token oluşturma vb.) sırasında
    // çalıştırdığı geri çağırma fonksiyonları.
    callbacks: {
        // 1. JWT callback: Kimlik doğrulama başarılı olduğunda çalışır.
        // Auth0'dan gelen kullanıcı verisini (user) alırız ve JWT'ye (token) eklerim.
        async jwt({ token, user }) {
            // Sadece ilk girişte kullanıcı objesi mevcuttur.
            if (user) {
                // Burada rol ataması yapıyoruz. admin@example.com ise "admin" değilse "user" olur.
                token.role = user.email === "admin@example.com" ? "admin" : "user";
            }
            return token;
        },

        // 2. Session callback: Sayfalardaki oturum verisini günceller.
        // JWT'deki rol bilgisini alarak session objesine ekler.
        // Bu sayede, `useSession` ve `getServerSession` ile role erişebiliriz.
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role as "admin" | "user";
            }
            return session;
        },

        // 3. Redirect callback: Giriş/çıkış sonrası yönlendirmeleri yönetir.
        async redirect({ url, baseUrl }) {
            // Eğer URL, uygulamanın temel URL'si ile başlıyorsa,
            // kullanıcıyı her zaman ana sayfaya yönlendir.
            if (url.startsWith(baseUrl)) {
                // Logout sonrası NextAuth, Auth0'a yönlenip sonra buraya geri döner.
                // Bu kod, kullanıcının ana sayfada kalmasını sağlar.
                return baseUrl;
            }
            return url;
        },
    },
};

// NextAuth handler'ı oluşturur ve HTTP metotlarına bağlarız.
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };