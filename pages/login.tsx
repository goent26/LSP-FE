import Link from 'next/link';

export default function Login() {
  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen bg-gray-100 overflow-auto">
      <img src="/garis_belakang.png" alt="Background Line" className="bg-line bottom-left back" />
      <img src="/garis_depan.png" alt="Front Line" className="bg-line bottom-left front" />
      <img src="/gariss_belakang.png" alt="Background Line" className="bg-line top-right back" />
      <img src="/gariss_depan.png" alt="Front Line" className="bg-line top-right front" />

      <div className="login-container text-center">
        <img src="/icon.png" alt="Logo" className="logo mx-auto" />
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }} className="inline-flex gap-2">
          <span>Selamat</span>
          <span>Datang</span>
        </h1>
        <p className="subtitle">Pilih akun untuk masuk</p>

        <div className="flex flex-col items-center gap-6">
          <div className="button-group">
            <Link href="/login/peserta" className="login-button peserta">
              <img src="/peserta-icon.png" alt="Peserta" />
              <div className="text-container">
                <span>Saya Seorang</span>
                <strong>Peserta</strong>
              </div>
            </Link>
            <Link href="/login/asesor" className="login-button asesor">
              <img src="/asesor-icon.png" alt="Asesor" />
              <div className="text-container">
                <span>Saya Seorang</span>
                <strong>Asesor</strong>
              </div>
            </Link>
          </div>
          <div className="admin-container">
            <Link href="/login/admin" className="login-button admin">
              <img src="/admin-icon.png" alt="Admin" />
              <div className="text-container">
                <span>Saya Seorang</span>
                <strong>Admin</strong>
              </div>
            </Link>
          </div>
        </div>

        <footer className="mt-2">
          © LSP SMKN 58 Jakarta 2025. Hak Cipta Dilindungi oleh Undang-undang.<br />
          <span>Powered by ITHO INDOSTOCK</span>
        </footer>

        <p className="mt-4">
          Belum punya akun?{' '}
          <Link href="/register/peserta" className="text-blue-600 underline">
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
}