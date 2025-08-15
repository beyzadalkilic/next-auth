// Bu sayfa, giriş yapmış tüm kullanıcılar için özel bir alan sağlar.
// Sunucu tarafında (server-side) oturum kontrolü yapar.

import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

// Asenkron bir Sunucu Bileşeni (Server Component) olarak tanımlanır.
// Bu, Next.js'in sayfayı istemciye göndermeden önce sunucuda render etmesini sağlar.
export default async function DashboardPage() {
    // 1. Sunucu Oturumunu Al:
    // getServerSession, isteğin başlıklarındaki çerezleri okuyarak
    // kullanıcının geçerli oturum verisini (JWT'den gelen) alır.
    const session = await getServerSession(authOptions);

    // 2. Oturum Kontrolü:
    // Eğer bir oturum yoksa, yani kullanıcı giriş yapmamışsa,
    // sayfaya erişimi engeller.
    if (!session) {
        // Kullanıcıya giriş yapması gerektiğini belirten bir mesaj döndürür.
        return <p>Please login to access this page.</p>;
    }

    // 3. İçeriği Göster:
    // Yukarıdaki kontrolü geçerse, yani oturum geçerliyse,
    // kullanıcının e-posta adresi gibi oturum verilerini kullanarak
    // kişiselleştirilmiş içeriği render eder.
    return (
        <div>
            <h1>Welcome, {session.user?.email}</h1>
        </div>
    );
}