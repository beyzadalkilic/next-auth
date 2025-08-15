// Bu dosya, belirli rotalara (yollara) erişimi kısıtlamak için kullanılır.
// Next.js uygulamalarındaki en üst düzey yetkilendirme katmanıdır.

import { withAuth } from "next-auth/middleware";

// withAuth fonksiyonu, NextAuth.js'nin yetkilendirme mantığını uygular.
// Bu fonksiyon, bir isteğin geçerli bir oturumu olup olmadığını kontrol eder.
export default withAuth({
    // pages: Bu ayar, bir kullanıcı giriş yapmamışsa nereye yönlendirileceğini belirtir.
    pages: {
        // signIn: Kullanıcı oturum açmamışsa otomatik olarak bu sayfaya yönlendirilir.
        // Projenizde /login adında bir sayfa yoksa, / ile değiştirin.
        signIn: "/",
    },
});

// config: Bu ayar, middleware'in hangi rotalarda çalışacağını belirler.
export const config = {
    // matcher: Bu rotalar için her istekte middleware çalışır.
    // "/dashboard/:path*": dashboard ve altındaki tüm yolları korur.
    // "/admin/:path*": admin ve altındaki tüm yolları korur.
    matcher: ["/dashboard/:path*", "/admin/:path*"],
};