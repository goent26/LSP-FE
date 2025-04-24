'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // Added import for Image component
import { ArrowLeft } from 'lucide-react';

export default function Login() {
  const router = useRouter();

  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen bg-gray-100 overflow-auto">
      {/* Background Images */}
      <div className="relative">
        <Image
          src="/garis_belakang.png"
          alt="Background Line"
          layout="fill"
          className="bg-line bottom-left back"
        />
      </div>
      <div className="relative">
        <Image
          src="/garis_depan.png"
          alt="Front Line"
          layout="fill"
          className="bg-line bottom-left front"
        />
      </div>
      <div className="relative">
        <Image
          src="/gariss_belakang.png"
          alt="Background Line"
          layout="fill"
          className="bg-line top-right back"
        />
      </div>
      <div className="relative">
        <Image
          src="/gariss_depan.png"
          alt="Front Line"
          layout="fill"
          className="bg-line top-right front"
        />
      </div>

      {/* Konten Utama */}
      <div className="login-container text-center relative max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        {/* Tombol Back di pojok kiri dalam kotak */}
        <button
          onClick={() => router.push('/')}
          className="absolute top-4 left-4 flex items-center gap-2 text-gray-800 hover:underline text-lg"
        >
          <ArrowLeft size={24} />
          <span className="font-semibold">Back</span>
        </button>

        {/* Logo dan Teks Selamat Datang */}
        <div className="relative w-24 h-24 mx-auto mt-12">
          <Image
            src="/icon.png"
            alt="Logo"
            layout="fill"
            objectFit="contain"
            className="logo"
          />
        </div>
        <h1 className="inline-flex gap-2 mt-4 text-2xl font-bold">
          <span>Selamat</span>
          <span>Datang</span>
        </h1>

        <p className="subtitle">Pilih akun untuk masuk</p>

        <div className="flex flex-col items-center gap-6 mt-6">
          <div className="button-group">
            <Link href="/login/peserta" className="login-button peserta">
              <div className="relative w-12 h-12">
                <Image
                  src="/peserta-icon.png"
                  alt="Peserta"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="text-container">
                <span>Saya Seorang</span>
                <strong>Peserta</strong>
              </div>
            </Link>
            <Link href="/login/asesor" className="login-button asesor">
              <div className="relative w-12 h-12">
                <Image
                  src="/asesor-icon.png"
                  alt="Asesor"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="text-container">
                <span>Saya Seorang</span>
                <strong>Asesor</strong>
              </div>
            </Link>
          </div>
          <div className="admin-container">
            <Link href="/login/admin" className="login-button admin">
              <div className="relative w-12 h-12">
                <Image
                  src="/admin-icon.png"
                  alt="Admin"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className="text-container">
                <span>Saya Seorang</span>
                <strong>Admin</strong>
              </div>
            </Link>
          </div>
        </div>

        <footer className="mt-6 text-sm text-gray-600">
          © LSP SMKN 58 Jakarta 2025. Hak Cipta Dilindungi oleh Undang-undang.<br />
          <span>Powered by ITHO INDOSTOCK</span>
        </footer>

        <p className="mt-4 text-sm">
          Belum punya akun?{' '}
          <Link href="/register/peserta" className="text-blue-600 underline">
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
}