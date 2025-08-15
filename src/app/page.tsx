// Bu dosya, Next.js uygulamasının ana sayfasıdır.
// Oturum durumuna göre farklı içerik gösteren bir istemci bileşenidir.

// 'use client' yönergesi, bu bileşenin sadece tarayıcıda çalışacağını belirtir.
// NextAuth'un useSession, signIn, ve signOut gibi fonksiyonları tarayıcıda çalışır.
"use client";

// NextAuth'dan oturum yönetimi için gerekli fonksiyonları içe aktarıyorum.
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

// Ana sayfa bileşeni.
export default function Home() {
  // useSession hook'u ile kullanıcının oturum verisini (data) ve durumunu (status) alıyorum.
  const { data: session, status } = useSession();
  const router = useRouter();

  // Oturum durumu "loading" ise, yani oturum verisi henüz gelmediyse,
  // bir yükleme ekranı göstererek beklenir.
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <p className="text-gray-600 font-semibold">Oturum kontrol ediliyor...</p>
      </div>
    );
  }

  // Yükleme tamamlandığında sayfanın ana içeriğini render ediyorum.
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      {/* Sayfa içeriğini ortalayan ve stil veren ana kapsayıcı */}
      <div className="flex flex-col items-center justify-center p-10 bg-white rounded-xl shadow-lg w-full max-w-sm border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Hoş Geldiniz</h1>

        {/* session nesnesi varsa (yani kullanıcı giriş yapmışsa) bu blok çalışır. */}
        {session ? (
          <>
            <div className="flex flex-col items-center">
              <p className="text-lg font-semibold text-gray-800 mb-4">
                Merhaba, {session.user?.email}!
              </p>
              {/* Logout butonu. Tıklandığında kullanıcıyı güvenli bir şekilde çıkış yapar */}
              <button
                className="w-full px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors duration-200"
                onClick={async () => {
                  // signOut fonksiyonu ile kullanıcının oturumunu sonlandırırım.
                  // callbackUrl, çıkış sonrası kullanıcının yönlendirileceği sayfayı belirler.
                  await signOut({ callbackUrl: window.location.origin });
                }}
              >
                Güvenli Çıkış Yap
              </button>
            </div>
          </>
        ) : (
          /* session nesnesi yoksa (yani kullanıcı giriş yapmamışsa) bu blok çalışır. */
          <button
            className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
            onClick={() => signIn("auth0", { callbackUrl: "/" })}
          >
            Login with Auth0
          </button>
        )}
      </div>
    </div>
  );
}