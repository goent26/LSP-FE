import React, { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Index: React.FC = () => {
  const [activeTab, setActiveTab] = useState('skema');
  const galleryImages = [
    '/berita/lapangan-utama.png',
    '/berita/program-keahlian.png',
    '/berita/program-keahlian2.png'
  ];
  const [sliderPosition, setSliderPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('nav');
      if (window.scrollY > 10) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }
    };

    if (window.matchMedia('(min-width: 769px)').matches) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let animationId: number;
    let startTime: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      setSliderPosition((prev) => {
        const newPosition = (progress * 0.05) % (300 * galleryImages.length);
        return newPosition;
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [galleryImages.length]);

  const showTab = (tabName: string) => {
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach((content) => content.classList.remove('active'));
    const tabLinks = document.querySelectorAll('.tab-link');
    tabLinks.forEach((link) => link.classList.remove('active'));

    document.getElementById(`${tabName}-tab`)?.classList.add('active');
    const activeLink = Array.from(tabLinks).find(
      (link) => link.getAttribute('onclick') === `showTab('${tabName}')`
    );
    activeLink?.classList.add('active');
    setActiveTab(tabName);
  };

  const showPopup = (type: string) => {
    document.getElementById(`${type}-popup`)!.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  };

  const closePopup = (type: string) => {
    document.getElementById(`${type}-popup`)!.style.display = 'none';
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const handlePopupClose = (event: MouseEvent) => {
      if ((event.target as HTMLElement).classList.contains('popup')) {
        (event.target as HTMLElement).style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    };
    window.addEventListener('click', handlePopupClose);
    return () => window.removeEventListener('click', handlePopupClose);
  }, []);

  return (
    <div className="font-['Poppins'] relative min-h-screen">
      <Head>
        <title>LSP SMKN 58 Jakarta</title>
        <meta name="description" content="Lembaga Sertifikasi Profesi SMKN 58 Jakarta" />
      </Head>

      {/* Konten Utama */}
      <div className="relative z-10">
        <Navbar />
        <Header />

        {/* Statistics Section */}
        <section className="bg-transparent py-6 px-4 sm:px-6 md:px-10 mt-[-100px] z-50">
          <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 justify-items-center">
            {[
              { number: '8', label: 'Skema Sertifikasi', icon: '/icon-book.png' },
              { number: '43', label: 'Asesor Kompetensi', icon: '/icon-orang.png' },
              { number: '352', label: 'Pemegang Sertifikat', icon: '/icon-kelompok.png' },
              { number: '24', label: 'Tempat Uji Kompetensi', icon: '/icon-arah.png' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative bg-red-900 text-white w-40 h-36 sm:w-52 sm:h-40 md:w-64 md:h-48 rounded-lg flex flex-col justify-center items-center text-center shadow-md"
              >
                <div className="absolute -top-5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-yellow-400 border-4 flex items-center justify-center shadow-md">
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={32}
                      height={32}
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

        {/* Profile LSP Section */}
        <section className="relative z-20 px-6 mt-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:space-x-10 items-center">
              <div className="relative w-full md:w-96 border border-[#a33a3a] rounded-lg p-2">
                <Image
                  src="/profile-lsp.png"
                  alt="School building with red roof"
                  width={400}
                  height={300}
                  className="rounded-lg object-cover w-full h-auto"
                />
                <div className="absolute bottom-10 right-[-14px] bg-white rounded-full w-10 h-10 flex items-center justify-center text-red-800 shadow-md">
                  <i className="fas fa-phone-alt fa-lg"></i>
                </div>
                <div className="absolute top-1/2 -left-5 bg-white rounded-full w-10 h-10 flex items-center justify-center text-red-800 shadow-md -translate-y-1/2">
                  <i className="fas fa-graduation-cap fa-lg"></i>
                </div>
                <div className="absolute top-10 right-[-14px] bg-white rounded-full w-10 h-10 flex items-center justify-center text-red-800 shadow-md">
                  <i className="fas fa-envelope fa-lg"></i>
                </div>
              </div>

              <div className="mt-6 md:mt-0 flex-1 flex flex-col justify-center">
                <h2 className="font-bold text-4xl uppercase tracking-wide mb-2">PROFIL LSP</h2>
                <p className="text-sm mb-4 font-semibold">
                  Website Resmi Lembaga Sertifikasi Profesi SMKN 58 Jakarta. Menyediakan Informasi Seputar Lisensi, Layanan Uji Kompetensi, Skema Sertifikasi.
                </p>
                <div className="text-sm space-y-2">
                  {[
                    ['Nama LSP', 'LSP SMKN 58 Jakarta'],
                    ['Jenis LSP', 'LSP Pihak Kesatu'],
                    ['Nomor Lisensi', 'BNSP–LSP–1022–ID'],
                    ['Status Lisensi', 'Aktif (Berlaku Hingga 27 September 2026)'],
                    ['SK Lisensi', 'KEP.1962/BNSP/IX/2021'],
                  ].map(([label, value]) => (
                    <div key={label} className="flex">
                      <p className="w-36 font-normal">{label}</p>
                      <p className="font-normal">: {value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0">
              <div className="flex items-center justify-center space-x-4 border border-[#a33a3a] rounded-md p-4 max-w-md w-full">
                <div className="bg-red-800 text-white rounded-full w-12 h-12 flex items-center justify-center translate-x-2">
                  <i className="fas fa-graduation-cap fa-lg"></i>
                </div>
                <p className="text-xs leading-tight">
                  Jl. SMIK Bambu Apus / TMII, Kel. Bambu Apus, Kec. Cipayung, Jakarta Timur
                </p>
              </div>
              <div className="flex items-center justify-center space-x-4 border border-[#a33a3a] rounded-md p-4 max-w-md w-full">
                <div className="bg-red-800 text-white rounded-full w-12 h-12 flex items-center justify-center translate-x-2">
                  <i className="fas fa-envelope fa-lg"></i>
                </div>
                <p className="text-sm">lspsmkn58@gmail.com</p>
              </div>
              <div className="flex items-center justify-center space-x-4 border border-[#a33a3a] rounded-md p-4 max-w-md w-full">
                <div className="bg-red-800 text-white rounded-full w-12 h-12 flex items-center justify-center translate-x-2">
                  <i className="fas fa-phone-alt fa-lg"></i>
                </div>
                <div className="text-sm space-y-1">
                  <p>0218446304</p>
                  <p>0218442072</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* News Section */}
        <section className="bg-white py-10 px-4 sm:px-6 md:px-10 mt-16">
          <h2 className="text-center font-bold text-3xl mb-10 drop-shadow-lg">BERITA</h2>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-4 items-stretch">
            {/* Berita Utama */}
            <div className="relative lg:col-span-2 h-[420px]">
              <Image
                src="/berita/berita-utama.png"
                alt="Berita Utama"
                width={672}
                height={420}
                className="w-full h-full object-cover rounded-lg"
              />
              <Image
                src="/berita/new.png"
                alt="NEW"
                width={96}
                height={96}
                className="absolute top-[-25px] left-[-10px] w-24 h-24"
              />
              <div className="absolute bottom-0 left-0 right-0 px-4 py-3 text-white rounded-b-lg text-black">
                <p className="text-sm font-semibold">LSP SMKN 58 Jakarta</p>
                <p className="text-xs font-bold whitespace-pre-line">
                  UJI SERTIFIKASI KOMPETENSI LSP P-1
                  | SMKN 58 JAKARTA
                </p>
              </div>
            </div>

            {/* 4 Gambar Berita Lain */}
            <div className="grid grid-cols-2 lg:col-span-3 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div className="relative h-[200px]" key={i}>
                  <Image
                    src={`/berita/berita-${i}.png`}
                    alt={`Berita ${i}`}
                    width={320}
                    height={200}
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

        {/* Updated Gallery Section with Seamless Infinite Sliding */}
        <section className="min-h-[50vh] mb-10 overflow-hidden bg-white">
          <div className="text-center pt-10 pb-10">
            <h2 className="text-3xl font-bold">GALERI</h2>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative h-[300px] overflow-hidden rounded-lg">
              <div
                className="absolute top-0 left-0 h-full flex items-center gap-8"
                style={{
                  transform: `translateX(-${sliderPosition}px)`,
                  transition: 'transform 0.1s linear',
                }}
              >
                {/* Original + Duplicated images for smooth loop */}
                {[...Array(2)].map((_, arrayIndex) => (
                  <React.Fragment key={`set-${arrayIndex}`}>
                    {galleryImages.map((img, index) => (
                      <div
                        key={`${arrayIndex}-${index}`}
                        className="w-[300px] h-[280px] flex-shrink-0"
                      >
                        <Image
                          src={img}
                          alt={`Gallery ${index + 1}`}
                          width={300}
                          height={280}
                          className="w-full h-full object-cover rounded-lg shadow-md"
                        />
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};
export default Index;