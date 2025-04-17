'use client'; // jika menggunakan Next.js App Router

import { useRouter } from 'next/navigation'; // Ubah dari next/router ke next/navigation untuk App Router
import { useState, useRef } from 'react';
import { login } from '@/Client/AuthClient'
import { AxiosError } from 'axios';

export default function LoginForm() {
  const router = useRouter();
  const [showResetPopup, setShowResetPopup] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleBack = () => {
    router.back();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(form);
      const { token, user } = res.payload;
      if (user?.role === 'admin') {
        localStorage.setItem('lsp-token', JSON.stringify(token));
        console.log('Login berhasil!', user, token);
        router.push('/admin');
      } else {
        // Role tidak sesuai
        alert(`Anda adalah ${user.role}. Silakan login melalui halaman ${user.role}.`);
      }

    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      console.error('Gagal login: ' + err.response?.data?.message);
    }
  };

  const togglePassword = () => {
    if (passwordRef.current && checkboxRef.current) {
      passwordRef.current.type = checkboxRef.current.checked ? 'text' : 'password';
    }
  };

  return (
    <div className="main-container relative min-h-screen flex items-center justify-center bg-gray-100 font-poppins">
      {/* Background images */}
      <img src="/form/garis_belakang.png" className="form-bg-line bottom-left back" alt="bg" />
      <img src="/form/garis_depan.png" className="form-bg-line bottom-left front" alt="fg" />
      <img src="/form/gariss_belakang.png" className="form-bg-line top-right back" alt="bg" />
      <img src="/form/gariss_depan.png" className="form-bg-line top-right front" alt="fg" />

      {/* Login box */}
      <div className="login-container rounded-lg overflow-hidden flex flex-col md:flex-row min-h-[200px] sm:min-h-[400px] relative z-10 bg-white shadow-lg">
        <div className="p-4 sm:p-8 md:w-1/2 flex flex-col items-center justify-center">
          <h2
            className="text-xl sm:text-3xl font-bold text-center text-red-700 mb-4 sm:mb-5"
            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}
          >
            Selamat Datang
          </h2>
          <p className="text-center text-gray-500 mb-5 sm:mb-6 text-xs sm:text-lg">
            Masukkan akun dan password
          </p>

          <form className="w-full max-w-xs sm:max-w-md" onSubmit={handleSubmit}>
            <div className="mb-4 sm:mb-6">
              <label className="block text-xs sm:text-base font-bold mb-2">Email or Number Phone</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 text-sm sm:text-lg border rounded-full focus:outline-none focus:ring-2 focus:ring-red-700"
                placeholder="Email or Number Phone"
                type="text"
              />
            </div>

            <div className="mb-4 sm:mb-6">
              <label className="block text-xs sm:text-base font-bold mb-2">Password</label>
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                id="password"
                ref={passwordRef}
                className="w-full px-4 py-2 text-sm sm:text-lg border rounded-full focus:outline-none focus:ring-2 focus:ring-red-700"
                placeholder="Password"
                type="password"
              />
            </div>

            <div className="flex justify-between items-center mb-5 sm:mb-7">
              <div className="flex items-center">
                <input
                  ref={checkboxRef}
                  className="mr-2 w-4 h-4 sm:w-5 sm:h-5"
                  id="show-password"
                  type="checkbox"
                  onChange={togglePassword}
                />
                <label className="text-gray-500 text-xs sm:text-base" htmlFor="show-password">
                  See Password
                </label>
              </div>
              <button
                type="button"
                onClick={() => setShowResetPopup(true)}
                className="text-red-700 text-xs sm:text-base font-semibold hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <div className="flex flex-col items-center sm:flex-row sm:justify-between gap-3 sm:gap-6 mt-4 w-full">
              <button
                className="login-button kembali py-2 px-5 rounded-md w-full max-w-[300px] text-sm sm:text-lg"
                type="button"
                onClick={handleBack}
              >
                Kembali
              </button>
              <button
                className="login-button masuk py-2 px-5 rounded-md w-full max-w-[300px] text-sm sm:text-lg"
                type="submit"
              >
                Masuk
              </button>
            </div>
          </form>
        </div>

        <div className="hidden md:block md:w-1/2 p-2 bg-white rounded-lg">
          <img
            src="/backround_login.png"
            alt="Login Illustration"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      {/* POPUP Reset Password */}
      {showResetPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-lg max-w-md w-full px-6 py-10 sm:px-8 relative text-center">
            <button
              className="absolute top-3 right-5 text-2xl sm:text-3xl font-bold text-red-700 hover:text-red-900"
              onClick={() => setShowResetPopup(false)}
            >
              ×
            </button>
            <h3 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6">Lupa Password</h3>

            <img
              src="/form/Mail.png"
              alt="Mail"
              className="w-52 sm:w-64 mx-auto mb-6 sm:mb-10"
            />

            <h4 className="text-base sm:text-xl font-semibold text-gray-700 mb-2 sm:mb-4">
              Atur Ulang Password
            </h4>
            <p className="text-xs sm:text-base text-gray-500 mb-5 sm:mb-8 px-2 sm:px-4 leading-relaxed">
              Klik tombol di bawah untuk mendapatkan link reset password dan mengatur ulang kata sandi Anda.
            </p>
            <button className="bg-red-700 hover:bg-red-800 text-white py-2 px-6 sm:py-3 sm:px-8 rounded-md font-semibold text-xs sm:text-base">
              Dapatkan Link Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}