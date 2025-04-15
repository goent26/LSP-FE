'use client';

import Image from 'next/image';
import Navbar from '../../components/user/Navbar';
import Footer from '../../components/user/Footer';
import Header from '../../components/Header';

export default function PesertaPage() {
  return (
    <div className="min-h-screen font-poppins bg-white">
      <Navbar />
      <Header />

      <main className="pt-5 px-4 sm:px-8">
        {/* Rekap Formulir */}
        <section className="mt-12 max-w-4xl mx-auto bg-white border rounded-2xl shadow">
  <div className="bg-red-800 text-white text-center text-xl font-semibold py-3 rounded-t-2xl">
    Rekap Formulir
  </div>
  <div className="p-4">
    <div className="overflow-x-auto">
      <table className="w-full text-sm sm:text-base border rounded-xl">
        <thead>
          <tr className="bg-gray-200 text-black font-semibold">
            <th className="p-4 text-center">Nama Lengkap</th>
            <th className="p-4 text-center">Tanggal Pengisian</th>
            <th className="p-4 text-center">Status Verifikasi</th>
            <th className="p-4 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center border">
            <td className="p-4">Deni Lesmana</td>
            <td className="p-4">04 April 2025</td>
            <td className="p-4">
              <span className="bg-green-600 text-white text-sm px-4 py-1 rounded-lg inline-block shadow">
                Terverifikasi
              </span>
            </td>
            <td className="p-4 flex justify-center gap-2">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded shadow transition duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13h3l9-9a2.828 2.828 0 00-4-4l-9 9v3z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7l-1.5-1.5" />
                </svg>
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white p-2 rounded shadow transition duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-5-5.917V4a2 2 0 10-4 0v1.083A6.002 6.002 0 004 11v3.159c0 .538-.214 1.055-.595 1.436L2 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>


        {/* Skema & Jadwal */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto mt-10">
          {/* Skema Asesmen */}
          <div className="bg-white border rounded-xl shadow">
            <div className="bg-red-800 text-white font-semibold text-center py-2 rounded-t-xl">
              Skema Asesmen
            </div>
            <div className="p-5 text-center">
              <p>Skema Okupasi Junior<br />Operator Desain Grafis<br />(DKV)</p>
            </div>
          </div>

          {/* Jadwal Asesmen */}
          <div className="bg-white border rounded-xl shadow">
            <div className="bg-red-800 text-white font-semibold text-center py-2 rounded-t-xl">
              Jadwal Asesmen
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center gap-3">
                <Image src="/tanggal.png" alt="Tanggal" width={24} height={24} />
                <span>Rabu, 04 April 2024</span>
              </div>
              <div className="flex items-center gap-3">
                <Image src="/jam.png" alt="Jam" width={24} height={24} />
                <span>08.00 - 11.00</span>
              </div>
              <div className="flex items-center gap-3">
                <Image src="/tempat.png" alt="Tempat" width={24} height={24} />
                <span>Aula SMKN 58 Jakarta</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
