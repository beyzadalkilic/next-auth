// 'use client' yönergesi, bu bileşenin sadece tarayıcıda çalışacağını belirtir.
// NextAuth'un SessionProvider'ı tarayıcıda oturum durumunu yönettiği için bu gereklidir.
'use client';

// NextAuth'dan SessionProvider'ı içe aktarıyorum.
// Bu bileşen, uygulamanızın oturum verisine erişmesini sağlar.
import { SessionProvider } from 'next-auth/react';

// NextAuthSessionProvider bileşenini tanımlıyorum.
// Bu bileşen, içine aldığı tüm alt bileşenleri (children) sarmalar.
export default function NextAuthSessionProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    // Uygulamanın geri kalanını SessionProvider ile sarmalıyorum.
    // Bu işlem, uygulamanın tamamındaki tüm bileşenlerin (sayfaların)
    // oturum verisine (`useSession`) erişebilmesini sağlar.
    return <SessionProvider>{children}</SessionProvider>;
}