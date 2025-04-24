'use client';

import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { registPeserta } from '../../Client/AuthClient';

export default function RegisterPeserta() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const passwordRef = useRef<HTMLInputElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);

  const handleBack = () => {
    router.back();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Basic client-side validation
    if (!formData.username || !formData.email || !formData.password) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      setLoading(false);
      return;
    }

    try {
      const res = await registPeserta({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      const { token } = res.payload;

      // Store token in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('lsp-token', token);
      }

      setSuccess('Registration successful! Redirecting to dashboard...');
      console.log('Pendaftaran berhasil!', res.message, token);
      router.push('/student');
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      console.error('Registration error:', axiosError.response?.data?.message || 'Terjadi kesalahan saat mendaftar.');
      setError(axiosError.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const togglePassword = () => {
    if (passwordRef.current && checkboxRef.current) {
      passwordRef.current.type = checkboxRef.current.checked ? 'text' : 'password';
    }
  };

  return (
    <div className="main-container relative min-h-screen flex items-center justify-center bg-gray-100 font-poppins">
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

      <div className="login-container rounded-lg overflow-hidden flex flex-col md:flex-row min-h-[200px] sm:min-h-[400px] relative z-10 bg-white shadow-lg">
        <div className="p-6 sm:p-10 md:w-1/2 flex flex-col items-center justify-center">
          <h2
            className="text-3xl sm:text-4xl font-bold text-center text-red-700 mb-2 sm:mb-4"
            style={{ textShadow: '2px 2px 5px rgba(0, 0, 0, 0.25)' }}
          >
            Selamat Datang
          </h2>
          <p className="text-center text-gray-500 mb-6 text-sm sm:text-base">
            Silakan isi form pendaftaran
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm w-full max-w-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm w-full max-w-sm">
              {success}
            </div>
          )}

          <form className="w-full max-w-sm sm:max-w-md" onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block text-sm font-semibold mb-2">Username</label>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 text-sm sm:text-base border rounded-full focus:outline-none focus:ring-2 focus:ring-red-700"
                placeholder="Username"
                type="text"
                required
              />
            </div>
            <div className="mb-5">
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 text-sm sm:text-base border rounded-full focus:outline-none focus:ring-2 focus:ring-red-700"
                placeholder="Email"
                type="email"
                required
              />
            </div>
            <div className="mb-5">
              <label className="block text-sm font-semibold mb-2">Password</label>
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                id="password"
                ref={passwordRef}
                className="w-full px-4 py-2 text-sm sm:text-base border rounded-full focus:outline-none focus:ring-2 focus:ring-red-700"
                placeholder="Password (min 8 karakter)"
                type="password"
                required
                minLength={8}
              />
            </div>
            <div className="mb-8 flex items-center">
              <input
                ref={checkboxRef}
                className="mr-2 w-4 h-4 sm:w-5 sm:h-5"
                id="show-password"
                type="checkbox"
                onChange={togglePassword}
              />
              <label className="text-gray-500 text-sm sm:text-base" htmlFor="show-password">
                Lihat Password
              </label>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-6">
              <button
                className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded-md w-full text-sm sm:text-base transition duration-200 disabled:opacity-50"
                type="button"
                onClick={handleBack}
                disabled={loading}
              >
                Kembali
              </button>
              <button
                className="bg-red-800 hover:bg-red-900 text-white font-semibold py-2 rounded-md w-full text-sm sm:text-base transition duration-200 disabled:opacity-50"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Memproses...' : 'Daftar'}
              </button>
            </div>
          </form>
        </div>
        <div className="hidden md:block md:w-1/2 p-2 bg-white rounded-lg relative">
          <Image
            src="/backround_login.png"
            alt="Login background"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}