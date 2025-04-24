import React from 'react';
import Head from 'next/head';
import Image from 'next/image'; 
import Navbar from '../../components/Navbar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Galeri: React.FC = () => {
  return (
    <div className="relative font-['Poppins'] text-gray-800 bg-white">
      <Head>
        <title>Galeri - LSP SMKN 58 Jakarta</title>
        <meta name="description" content="Galeri Lembaga Sertifikasi Profesi SMKN 58 Jakarta" />
      </Head>

      <Navbar />
      <Header />

      <main className="relative z-10">
        {/* Konten Putih */}
        <section
          className="relative z-0 pt-6 pb-20 bg-white bg-no-repeat"
          style={{
            backgroundImage: "url('/berita/landng-galeri.png')",
            backgroundSize: '100% auto', // Diubah menjadi 100% lebar
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10"> {/* Padding dipindahkan ke div dalam */}
            <h2 className="text-3xl font-bold text-left mb-6">GALERI</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10 items-start relative z-10">
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
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 w-[360px] mx-auto"
                  key={idx}
                >
                  <div className="relative w-full h-[220px]">
                    <Image
                      src={item.img}
                      alt={item.title}
                      layout="fill"
                      objectFit="cover"
                      className="w-full h-[220px]"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <p className="font-semibold text-sm sm:text-base uppercase leading-snug">
                      {item.title} <br />
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Galeri;
