// Bu sayfa sadece 'admin' rolüne sahip kullanıcılar için görünür olacak.
// Sunucu tarafında (server-side) yetkilendirme kontrolü yapar.

import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

// Asenkron bir Sunucu Bileşeni (Server Component) olarak tanımlanır.
// Next.js, bu sayfayı istemciye göndermeden önce sunucuda render eder.
export default async function AdminPage() {
    // 1. Sunucu Oturumunu Al:
    // getServerSession, isteğin başlıklarındaki çerezleri okuyarak
    // kullanıcının geçerli oturum verisini (JWT'den gelen) alır.
    const session = await getServerSession(authOptions);

    // 2. Rol Kontrolü ve Yetkilendirme:
    // Eğer bir oturum yoksa VEYA oturumdaki kullanıcının rolü "admin" değilse,
    // sayfaya erişimi engeller.
    if (!session || session.user?.role !== "admin") {
        // Kullanıcıya erişimin reddedildiğini belirten bir mesaj gösterir.
        // Bu, doğrudan URL girilse bile içeriğin gizli kalmasını sağlar.
        return <p>Access Denied</p>;
    }

    // 3. İçeriği Göster:
    // Yukarıdaki yetkilendirme kontrolünden geçerse,
    // sadece yetkili (admin) kullanıcının görebileceği içeriği render eder.
    return <h1>Admin Dashboard</h1>;
}