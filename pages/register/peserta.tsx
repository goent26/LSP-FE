import { useRouter } from 'next/router';
import { registPeserta } from '@/Client/AuthClient'
import { useState } from 'react';
import { AxiosError } from 'axios';


export default function RegisterPeserta() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  console.log('ini form', form)

  const handleBack = () => {
    router.back(); // Kembali ke halaman sebelumnya
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await registPeserta({
        username: form.username,
        email: form.email,
        password: form.password,
      });
      console.log('ini message', res.message)
      const { token } = res.payload;
      console.log('ini token', token)

      localStorage.setItem('lsp-token', token);

      console.log('Pendaftaran berhasil!');
      router.push('/student'); // arahkan ke halaman setelah daftar
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      console.error(err.response?.data?.message || 'Terjadi kesalahan saat mendaftar.');
    }
  };

  return (
    <div className="main-container relative min-h-screen flex items-center justify-center bg-gray-100 font-poppins">
      {/* Background */}
      <img src="/form/garis_belakang.png" alt="BG" className="form-bg-line bottom-left back" />
      <img src="/form/garis_depan.png" alt="FG" className="form-bg-line bottom-left front" />
      <img src="/form/gariss_belakang.png" alt="BG" className="form-bg-line top-right back" />
      <img src="/form/gariss_depan.png" alt="FG" className="form-bg-line top-right front" />

      {/* Form Container */}
      <div className="login-container rounded-lg overflow-hidden flex flex-col md:flex-row min-h-[200px] sm:min-h-[400px] relative z-10 bg-white shadow-lg">
        <div className="p-6 sm:p-10 md:w-1/2 flex flex-col items-center justify-center">
          <h2
            className="text-3xl sm:text-4xl font-bold text-center text-red-700 mb-2 sm:mb-4"
            style={{ textShadow: '2px 2px 5px rgba(0, 0, 0, 0.25)' }}
          >
            Selamat Datang
          </h2>
          <p className="text-center text-gray-500 mb-6 text-sm sm:text-base">
            Masukkan akun dan password
          </p>
          <form className="w-full max-w-sm sm:max-w-md" onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block text-sm font-semibold mb-2">Username</label>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 text-sm sm:text-base border rounded-full focus:outline-none focus:ring-2 focus:ring-red-700"
                placeholder="Username"
                type="text"
              />
            </div>
            <div className="mb-5">
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 text-sm sm:text-base border rounded-full focus:outline-none focus:ring-2 focus:ring-red-700"
                placeholder="Email"
                type="email"
              />
            </div>
            <div className="mb-5">
              <label className="block text-sm font-semibold mb-2">Password</label>
              <input
                name="password"
                id="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 text-sm sm:text-base border rounded-full focus:outline-none focus:ring-2 focus:ring-red-700"
                placeholder="Password"
                type="password"
              />
            </div>
            <div className="mb-8 flex items-center">
              <input
                className="mr-2 w-4 h-4 sm:w-5 sm:h-5"
                id="show-password"
                type="checkbox"
                onChange={() => togglePassword()}
              />
              <label className="text-gray-500 text-sm sm:text-base" htmlFor="show-password">
                See Password
              </label>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-6">
              <button
                className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded-md w-full text-sm sm:text-base"
                type="button"
                onClick={handleBack}
              >
                Kembali
              </button>
              <button
                className="bg-red-800 hover:bg-red-900 text-white font-semibold py-2 rounded-md w-full text-sm sm:text-base"
                type="submit"
              >
                Daftar
              </button>
            </div>
          </form>
        </div>
        <div className="hidden md:block md:w-1/2 p-2 bg-white rounded-lg">
          <img
            alt="Login background"
            className="w-full h-full object-cover rounded-lg"
            src="/backround_login.png"
          />
        </div>
      </div>
    </div>
  );
}

function togglePassword() {
  const passwordField = document.getElementById('password') as HTMLInputElement;
  const checkbox = document.getElementById('show-password') as HTMLInputElement;
  passwordField.type = checkbox.checked ? 'text' : 'password';
}
