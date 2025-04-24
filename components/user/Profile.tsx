import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Profile: React.FC = () => {
  const router = useRouter();
  const isAsesorProfile = router.pathname === '/Asesor/profile';

  return (
    <div className="bg-white font-sans">
      {/* Header */}
      <div className="bg-red-800 text-white p-4">
        <button onClick={() => window.history.back()} className="flex items-center space-x-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-medium">Back</span>
        </button>
      </div>

      {/* Container */}
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Kotak 1 & 2 */}
        <div className="bg-white rounded-2xl border-2 border-gray-300 shadow-lg overflow-hidden">
          <div className="relative">
            <Image
              src="/profile-user.png.png"
              alt="Banner"
              width={896}
              height={192}
              className="w-full h-48 object-cover"
            />
            <div className="absolute left-6 -bottom-10">
              <Image
                src="/contoh-user.png"
                alt="Profile picture"
                width={96}
                height={96}
                className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-xl"
              />
            </div>
          </div>
          <div className="pt-5 pb-6 flex items-center justify-start pl-40">
            <h2 className="text-xl font-bold text-red-800">Muhammad Deni Lesmana Kurniawan</h2>
          </div>
        </div>

        {/* Profil Section */}
        <div className="bg-white p-6 rounded-2xl border-2 border-gray-300 shadow-lg space-y-4">
          <h3 className="font-semibold text-red-700">Profile</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center border-2 rounded px-3 py-2 space-x-2 text-gray-500 bg-gray-50">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.161 0 4.178.512 5.879 1.414M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Muhammad Deni Lesmana Kurniawan</span>
            </div>
            <div className="flex items-center border-2 rounded px-3 py-2 space-x-2 text-gray-500 bg-gray-50">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m8 0l-4-4m4 4l-4 4" />
              </svg>
              <span>dnl@gmail.com</span>
            </div>
            <div className="flex items-center border-2 rounded px-3 py-2 space-x-2 text-gray-500 bg-gray-50">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m0-6v2m-6 4h12a2 2 0 002-2V9a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
              </svg>
              <span>••••••••</span>
            </div>
            <div className="flex items-center border-2 rounded px-3 py-2 space-x-2 text-gray-500 bg-gray-50">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3a.75.75 0 00-.75.75v.334a8.25 8.25 0 00-2.89 14.456.75.75 0 00.965-1.14A6.75 6.75 0 0112 6.75a6.75 6.75 0 015.925 10.65.75.75 0 10.965 1.14 8.25 8.25 0 00-2.89-14.456V3.75a.75.75 0 00-.75-.75h-6.5z" />
              </svg>
              <span>Sistem Informasi Jaringan dan Aplikasi</span>
            </div>
          </div>
          <div className="text-right">
            <button className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 transition">Edit</button>
          </div>
        </div>

        {/* Sertifikat Section - Hidden on /Asesor/profile */}
        {!isAsesorProfile && (
          <div className="bg-white p-6 rounded-2xl border-2 border-gray-300 shadow-lg space-y-4">
            <h3 className="font-semibold text-red-700">Sertifikat</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-2">
                <thead className="bg-gray-200 text-gray-700">
                  <tr>
                    <th className="py-2 px-4 border-2">Nama Lengkap</th>
                    <th className="py-2 px-4 border-2">Tahun Terbit</th>
                    <th className="py-2 px-4 border-2">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="py-2 px-4 border-2">Deni Lesmana</td>
                    <td className="py-2 px-4 border-2">04 April 2025</td>
                    <td className="py-2 px-4 border-2">
                      <button onClick={() => alert('Menampilkan sertifikat...')} className="bg-yellow-400 text-white px-4 py-1 rounded hover:bg-yellow-500 transition">
                        Lihat
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;