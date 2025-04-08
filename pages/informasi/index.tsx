// pages/informasi/index.tsx
import React from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Informasi: React.FC = () => {
  return (
    <div className="font-['Poppins'] bg-gray-100 text-gray-800">
      <Head>
        <title>Statistik & Berita - LSP SMKN 58 Jakarta</title>
        <meta
          name="description"
          content="Informasi terbaru dan statistik dari Lembaga Sertifikasi Profesi SMKN 58 Jakarta"
        />
      </Head>

      <Navbar />
      <Header />

      {/* Statistik Section */}
      <section className="bg-white py-6 px-4 sm:px-6 md:px-10 mt-[-80px]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 justify-items-center">
          {/* Box Template */}
          {[
            { number: '8', label: 'Skema Sertifikasi', icon: 'icon-book.png' },
            { number: '43', label: 'Asesor Kompetensi', icon: 'icon-orang.png' },
            { number: '352', label: 'Pemegang Sertifikat', icon: 'icon-kelompok.png' },
            { number: '24', label: 'Tempat Uji Kompetensi', icon: 'icon-arah.png' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="relative bg-red-900 text-white w-40 h-36 sm:w-52 sm:h-40 md:w-64 md:h-48 rounded-lg flex flex-col justify-center items-center text-center shadow-md"
            >
              <div className="absolute -top-5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-yellow-400 border-4 flex items-center justify-center shadow-md">
                  <img
                    src={item.icon}
                    alt={item.label}
                    className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                  />
                </div>
              </div>
              <div className="mt-6 text-sm sm:text-base">
                <div className="text-3xl sm:text-4xl font-bold">{item.number}</div>
                <div className="text-xs sm:text-sm">{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Berita Section */}
      <section className="bg-white py-10 px-4 sm:px-6 md:px-10">
        <h2 className="text-center font-bold text-3xl mb-10 drop-shadow-lg">BERITA</h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-4 items-stretch">
          {/* Berita Utama */}
          <div className="relative lg:col-span-2 h-[420px]">
            <img
              src="/berita/berita-utama.png"
              alt="Berita Utama"
              className="w-full h-full object-cover rounded-lg"
            />
            <img
              src="/berita/new.png"
              alt="NEW"
              className="absolute top-[-25px] left-[-10px] w-24 h-24"
            />
            <div className="absolute bottom-0 left-0 right-0 px-4 py-3 text-white rounded-b-lg text-black">
              <p className="text-sm font-semibold">LSP SMKN 58 Jakarta</p>
              <p className="text-xs font-bold whitespace-pre-line">
                UJI SERTIFIKASI KOMPETENSI LSP P-1 
| SMKN 58 JAKARTA – SMKN 58 Jakarta
              </p>
            </div>
          </div>

          {/* 4 Gambar Berita Lain */}
          <div className="grid grid-cols-2 lg:col-span-3 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div className="relative h-[200px]" key={i}>
                <img
                  src={`/berita/berita-${i}.png`}
                  alt={`Berita ${i}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 px-2 py-2 text-white text-xs rounded-b-lg text-black">
                  <p className="font-semibold">LSP SMKN 58 Jakarta</p>
                  <p className="whitespace-pre-line">
                    UJI SERTIFIKASI KOMPETENSI LSP P-1 
| SMKN 58 Jakarta
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galeri Section */}
      <section className="min-h-[50vh]">
        <div className="text-center pt-10 pb-10 border-b border-gray-300 shadow-lg z-10 relative bg-white">
          <h2 className="text-3xl font-bold drop-shadow-md">GALERI</h2>
        </div>

        <div className="px-4 sm:px-6 md:px-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-10">
            {/* Galeri Items */}
            {[
              {
                img: '/berita/lapangan-utama.png',
                title: 'LAPANGAN UTAMA',
                subtitle: 'SMKN 58 JAKARTA',
              },
              {
                img: '/berita/program-keahlian.png',
                title: 'PROGRAM KEAHLIAN',
                subtitle: 'SENI LUKIS',
              },
              {
                img: '/berita/program-keahlian2.png',
                title: 'PROGRAM KEAHLIAN',
                subtitle: 'KRIYA KREATIF BATIK DAN TEKSTIL',
              },
            ].map((item, idx) => (
              <div
                className="bg-white rounded-lg shadow-lg shadow-[0_10px_15px_-3px_rgba(0,0,0,0.3)] p-2"
                key={idx}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="rounded-md w-full h-56 object-cover"
                />
                <p className="font-bold text-sm text-black mt-2 mb-4 uppercase">
                  {item.title} <br /> {item.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Informasi;