'use client';

import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { login } from '../../Client/AuthClient';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';

export default function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResetPopup, setShowResetPopup] = useState(false);

  const passwordRef = useRef<HTMLInputElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);

  const togglePassword = () => {
    if (passwordRef.current && checkboxRef.current) {
      passwordRef.current.type = checkboxRef.current.checked ? 'text' : 'password';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Client-side validation
    if (!form.email || !form.password) {
      setError('Email/No HP dan Password wajib diisi.');
      return;
    }

    if (form.password.length < 8) {
      setError('Password harus minimal 8 karakter.');
      return;
    }

    setLoading(true);

    try {
      // Send only email and password in the payload
      const payload = {
        email: form.email,
        password: form.password,
      };
      const result = await login(payload);

      if (result.error) {
        setError(result.message || 'Login gagal. Coba lagi.');
        return;
      }

      const { token, user } = result.payload;

      if (user?.role === 'peserta') {
        // Store token and role in cookies
        Cookies.set('lsp-token', token, {
          path: '/',
          expires: 1,
        });
        Cookies.set('lsp-role', user.role, {
          path: '/',
          expires: 1,
        });

        // Store token in localStorage for consistency with register
        if (typeof window !== 'undefined') {
          localStorage.setItem('lsp-token', token);
        }

        setSuccess('Login berhasil! Mengalihkan ke dashboard...');
        toast.success('Login berhasil!', {
          autoClose: 2000,
          onClose: () => router.push('/student'),
        });
      } else {
        setError(`Anda adalah ${user.role}. Silakan login melalui halaman ${user.role}.`);
      }
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;
      setError(axiosError.response?.data?.message || 'Terjadi kesalahan. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container min-h-screen flex items-center justify-center bg-gray-100 font-poppins relative">
      <ToastContainer />

      {/* Background */}
      <div className="relative">
        <Image
          src="/form/garis_belakang.png"
          alt="Background Line"
          layout="fill"
          className="form-bg-line bottom-left back"
        />
      </div>
      <div className="relative">
        <Image
          src="/form/garis_depan.png"
          alt="Foreground Line"
          layout="fill"
          className="form-bg-line bottom-left front"
        />
      </div>
      <div className="relative">
        <Image
          src="/form/gariss_belakang.png"
          alt="Background Line"
          layout="fill"
          className="form-bg-line top-right back"
        />
      </div>
      <div className="relative">
        <Image
          src="/form/gariss_depan.png"
          alt="Foreground Line"
          layout="fill"
          className="form-bg-line top-right front"
        />
      </div>

      <div className="login-container bg-white rounded-lg overflow-hidden flex flex-col md:flex-row shadow-lg z-10">
        <div className="p-8 md:w-1/2 flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold text-red-700 mb-4">Selamat Datang</h2>
          <p className="text-gray-500 mb-6">Masukkan akun dan password</p>

          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-100 text-red-700 text-sm p-2 mb-4 rounded-md text-center">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-100 text-green-700 text-sm p-2 mb-4 rounded-md text-center">
                {success}
              </div>
            )}
            <div className="mb-4">
              <label className="block font-bold mb-1">Email atau Nomor HP</label>
              <input
                type="text"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email or Number Phone"
                className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-red-700"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block font-bold mb-1">Password</label>
              <input
                ref={passwordRef}
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-red-700"
                required
                minLength={8}
              />
            </div>

            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <input
                  ref={checkboxRef}
                  id="show-password"
                  type="checkbox"
                  onChange={togglePassword}
                  className="mr-2"
                />
                <label htmlFor="show-password" className="text-gray-500 text-sm">
                  Lihat Password
                </label>
              </div>
              <button
                type="button"
                onClick={() => setShowResetPopup(true)}
                className="text-red-700 text-sm font-semibold hover:underline"
              >
                Lupa Password?
              </button>
            </div>

            <div className="flex justify-between gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="w-1/2 py-2 px-4 bg-gray-300 hover:bg-gray-400 rounded-md"
                disabled={loading}
              >
                Kembali
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`w-1/2 py-2 px-4 text-white rounded-md ${
                  loading ? 'bg-gray-400' : 'bg-red-700 hover:bg-red-800'
                }`}
              >
                {loading ? 'Memproses...' : 'Masuk'}
              </button>
            </div>
          </form>
        </div>

        <div className="hidden md:block md:w-1/2 bg-white relative">
          <Image
            src="/backround_login.png"
            alt="Login Illustration"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </div>

      {/* POPUP Reset Password */}
      {showResetPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-lg max-w-md w-full px-6 py-10 sm:px-8 relative text-center">
            <button
              className="absolute top-3 right-5 text-3xl font-bold text-red-700 hover:text-red-900"
              onClick={() => setShowResetPopup(false)}
            >
              ×
            </button>
            <h3 className="text-2xl font-bold mb-6">Lupa Password</h3>
            <div className="relative w-52 h-52 mx-auto mb-6">
              <Image
                src="/form/Mail.png"
                alt="Mail"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <h4 className="text-xl font-semibold mb-2">Atur Ulang Password</h4>
            <p className="text-gray-500 mb-5">
              Klik tombol di bawah untuk mendapatkan link reset password.
            </p>
            <button className="bg-red-700 hover:bg-red-800 text-white py-2 px-6 rounded-md font-semibold">
              Dapatkan Link Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}