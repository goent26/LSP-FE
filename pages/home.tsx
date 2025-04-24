import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Index: React.FC = () => {
  const [activeTab, setActiveTab] = useState('skema');
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
        <section className="bg-white py-6 px-4 sm:px-6 md:px-10 mt-[-80px] z-50">
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
        <section className="relative z-20 flex flex-col md:flex-row items-center justify-center mx-4 profile-section mt-8">
          <div className="w-full md:w-[40%] p-4 md:p-6 bg-white profile-card relative -mt-10 md:-mt-12 ml-auto mr-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-left">PROFILE LSP</h2>
            <div className="profil-grid text-sm md:text-lg">
              <div className="grid-row">
                <p className="label">No. SK Lisensi</p>
                <p className="colon">:</p>
                <p className="value">KEP.1962/BNSP/IX/2021</p>
              </div>
              <div className="grid-row">
                <p className="label">No Lisensi</p>
                <p className="colon">:</p>
                <p className="value">BNSP-LSP-1022-ID</p>
              </div>
              <div className="grid-row">
                <p className="label">Jenis</p>
                <p className="colon">:</p>
                <p className="value">LSP Pihak Kesatu</p>
              </div>
              <div className="grid-row">
                <p className="label">No Telp</p>
                <p className="colon">:</p>
                <p className="value">0218446304, 0218442072</p>
              </div>
              <div className="grid-row">
                <p className="label">No Hp</p>
                <p className="colon">:</p>
                <p className="value">082227516582</p>
              </div>
              <div className="grid-row">
                <p className="label">No Fax</p>
                <p className="colon">:</p>
                <p className="value">0218442072</p>
              </div>
              <div className="grid-row">
                <p className="label">No Email</p>
                <p className="colon">:</p>
                <p className="value">lspsmk58@gmail.com</p>
              </div>
              <div className="grid-row">
                <p className="label">Website</p>
                <p className="colon">:</p>
                <p className="value">
                  <a href="http://www.smkn58jakarta.sch.id" className="text-blue-600 underline">
                    smkn58jakarta.sch.id
                  </a>
                </p>
              </div>
              <div className="grid-row">
                <p className="label">Masa Berlaku Sertifikat</p>
                <p className="colon">:</p>
                <p className="value">2026-09-27</p>
              </div>
              <div className="grid-row">
                <p className="label">Status Lisensi</p>
                <p className="colon">:</p>
                <p className="value">Aktif</p>
              </div>
            </div>
            <h3 className="text-lg md:text-xl font-bold mt-6 text-left">ALAMAT</h3>
            <p className="mt-2 text-sm md:text-base">
              Jl. SMIK Bambu Apus/ TMII, Kelurahan Bambu Apus, Kecamatan Cipayung, Jakarta Timur
            </p>
          </div>
          <div className="w-full md:w-[45%] flex justify-end mr-8 -mt-10 md:-mt-12">
            <Image
              src="/profile.png"
              alt="Profil LSP"
              width={500}
              height={500}
              className="w-[80%] md:w-[500px] h-auto object-cover"
              onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/500?text=Profile')}
            />
          </div>
        </section>

        {/* News Section */}
        <section className="bg-white py-10 px-4 sm:px-6 md:px-10">
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

        {/* Gallery Section */}
        <section className="min-h-[50vh] mb-10">
          <div className="text-center pt-10 pb-10 border-b border-gray-300 shadow-lg z-10 relative bg-white">
            <h2 className="text-3xl font-bold drop-shadow-md">GALERI</h2>
          </div>

          <div className="px-4 sm:px-6 md:px-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-10">
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
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={384}
                    height={224}
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

        <section
          className="w-full relative z-10 mt-32 pb-20"
          style={{
            backgroundImage: `url('/landing-download.png')`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            margin: 0,
            paddingTop: '120px',
            paddingBottom: '120px',
          }}
        >
          <div className="bg-white bg-opacity-90 p-6 rounded-lg mx-auto max-w-7xl">
            <div className="flex justify-between items-center pb-2 mb-4">
              <div className="flex space-x-4">
                <a
                  className={`text-black tab-link ${activeTab === 'skema' ? 'active' : ''}`}
                  onClick={() => showTab('skema')}
                >
                  DATA SKEMA
                </a>
                <a
                  className={`text-black tab-link ${activeTab === 'tuk' ? 'active' : ''}`}
                  onClick={() => showTab('tuk')}
                >
                  DATA TUK
                </a>
                <a
                  className={`text-black tab-link ${activeTab === 'assesor' ? 'active' : ''}`}
                  onClick={() => showTab('assesor')}
                >
                  DATA ASSESOR
                </a>
              </div>
            </div>

            <div id="skema-tab" className="tab-content active">
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                  <thead>
                    <tr className="bg-[#8D0000] text-white">
                      <th className="py-2 px-4 border-r-2 border-white text-left">NOMOR</th>
                      <th className="py-2 px-4 text-left">SKEMA</th>
                      <th className="py-2 px-4 text-center w-16"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="skema-row" onClick={() => showPopup('dkv')}>
                      <td className="py-2 px-4 border border-gray-200 text-center">1</td>
                      <td className="py-2 px-4 border border-gray-200">
                        Skema Okupasi Junior Operator Desain Grafis (DKV)
                      </td>
                      <td className="py-2 px-4 border border-gray-200 text-center">
                        <span className="skema-badge">1</span>
                      </td>
                    </tr>
                    <tr className="skema-row bg-[#D9D9D9]" onClick={() => showPopup('kkbt')}>
                      <td className="py-2 px-4 border border-gray-200 text-center">2</td>
                      <td className="py-2 px-4 border border-gray-200">
                        Skema Okupasi Pembatik Tulis Junior (KKBT)
                      </td>
                      <td className="py-2 px-4 border border-gray-200 text-center">
                        <span className="skema-badge">1</span>
                      </td>
                    </tr>
                    <tr className="skema-row" onClick={() => showPopup('seni-lukis')}>
                      <td className="py-2 px-4 border border-gray-200 text-center">3</td>
                      <td className="py-2 px-4 border border-gray-200">
                        Skema SKKNI Membuat Karya Seni Lukis Realis (Seni Lukis)
                      </td>
                      <td className="py-2 px-4 border border-gray-200 text-center">
                        <span className="skema-badge">1</span>
                      </td>
                    </tr>
                    <tr className="skema-row bg-[#D9D9D9]" onClick={() => showPopup('kkkr')}>
                      <td className="py-2 px-4 border border-gray-200 text-center">4</td>
                      <td className="py-2 px-4 border border-gray-200">
                        Skema SKKNI Kriya Kreatif Kayu Dan Rotan (KKKR)
                      </td>
                      <td className="py-2 px-4 border border-gray-200 text-center">
                        <span className="skema-badge">1</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div id="tuk-tab" className="tab-content">
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                  <thead>
                    <tr className="bg-[#8D0000] text-white">
                      <th className="py-2 px-4 border border-gray-200 text-left">NOMOR</th>
                      <th className="py-2 px-4 border border-gray-200 text-left">KODE</th>
                      <th className="py-2 px-4 border border-gray-200 text-left">JENIS</th>
                      <th className="py-2 px-4 border border-gray-200 text-left">NAMA</th>
                      <th className="py-2 px-4 border border-gray-200 text-left">ALAMAT</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="shadow-md">
                      <td className="py-2 px-4 border border-gray-200">1</td>
                      <td className="py-2 px-4 border border-gray-200">008.a/SK/LSP SMKN58JKT/III/2019</td>
                      <td className="py-2 px-4 border border-gray-200">2</td>
                      <td className="py-2 px-4 border border-gray-200">Desain Permodelan Dan Informasi Bangunan</td>
                      <td className="py-2 px-4 border border-gray-200">Jl. SMIK Bambu Apus Cipayung/ TMII Jakarta Timur</td>
                    </tr>
                    <tr className="shadow-md bg-[#D9D9D9]">
                      <td className="py-2 px-4 border border-gray-200">2</td>
                      <td className="py-2 px-4 border border-gray-200">008.b/SK/LSP SMKN58JKT/III/2019</td>
                      <td className="py-2 px-4 border border-gray-200">2</td>
                      <td className="py-2 px-4 border border-gray-200">DKV</td>
                      <td className="py-2 px-4 border border-gray-200">Jl SMIK Bambu Apus Cipayung/ TMII Jakarta Timur</td>
                    </tr>
                    <tr className="shadow-md">
                      <td className="py-2 px-4 border border-gray-200">3</td>
                      <td className="py-2 px-4 border border-gray-200">008/SK/LSP SMKN58JKT/XI/2020</td>
                      <td className="py-2 px-4 border border-gray-200">2</td>
                      <td className="py-2 px-4 border border-gray-200">Kriya Kreatif Kayu dan Rotan</td>
                      <td className="py-2 px-4 border border-gray-200">Jl. SMIK 33 Bambu Apus Cipayung Jakarta Timur</td>
                    </tr>
                    <tr className="shadow-md bg-[#D9D9D9]">
                      <td className="py-2 px-4 border border-gray-200">4</td>
                      <td className="py-2 px-4 border border-gray-200">009.b/SK/LSP SMKN58JKT/III/2019</td>
                      <td className="py-2 px-4 border border-gray-200">2</td>
                      <td className="py-2 px-4 border border-gray-200">Kriya Kreatif Batik dan Tekstil</td>
                      <td className="py-2 px-4 border border-gray-200">Jl. SMIK Bambu Apus Cipayung/ TMII Jakarta Timur</td>
                    </tr>
                    <tr className="shadow-md">
                      <td className="py-2 px-4 border border-gray-200">5</td>
                      <td className="py-2 px-4 border border-gray-200">NOMOR 010/B/LSP-P1SMKN58 JKT 2017</td>
                      <td className="py-2 px-4 border border-gray-200">2</td>
                      <td className="py-2 px-4 border border-gray-200">Teknik Konstruksi Kayu</td>
                      <td className="py-2 px-4 border border-gray-200">Jl smik bambu apus/tmii cipayung jakarta timu</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div id="assesor-tab" className="tab-content">
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                  <thead>
                    <tr className="bg-[#8D0000] text-white">
                      <th className="py-2 px-4 border border-gray-200 text-left">NOMOR</th>
                      <th className="py-2 px-4 border border-gray-200 text-left">NAMA ASESOR</th>
                      <th className="py-2 px-4 border border-gray-200 text-left">NO REGISTRASI</th>
                      <th className="py-2 px-4 border border-gray-200 text-left">ALAMAT</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="shadow-md">
                      <td className="py-2 px-4 border border-gray-200">1</td>
                      <td className="py-2 px-4 border border-gray-200">Arief Supriyadi, S.Pd</td>
                      <td className="py-2 px-4 border border-gray-200">MET.000.0016141.2019</td>
                      <td className="py-2 px-4 border border-gray-200">Kota Administrasi Jakarta Selatan, DKI Jakarta</td>
                    </tr>
                    <tr className="shadow-md bg-[#D9D9D9]">
                      <td className="py-2 px-4 border border-gray-200">2</td>
                      <td className="py-2 px-4 border border-gray-200">Siti Latifah, S.Pd</td>
                      <td className="py-2 px-4 border border-gray-200">MET.000.0011101.2017</td>
                      <td className="py-2 px-4 border border-gray-200">Kota Administrasi Jakarta Timur, DKI Jakarta</td>
                    </tr>
                    <tr className="shadow-md">
                      <td className="py-2 px-4 border border-gray-200">3</td>
                      <td className="py-2 px-4 border border-gray-200">Dra. Sri Tulari Kurniasih</td>
                      <td className="py-2 px-4 border border-gray-200">MET.000.0011094.2017</td>
                      <td className="py-2 px-4 border border-gray-200">Kota Depok, Jawa Barat</td>
                    </tr>
                    <tr className="shadow-md bg-[#D9D9D9]">
                      <td className="py-2 px-4 border border-gray-200">4</td>
                      <td className="py-2 px-4 border border-gray-200">VERIA WULANDARI</td>
                      <td className="py-2 px-4 border border-gray-200">MET.000.003243.2019</td>
                      <td className="py-2 px-4 border border-gray-200">Kota Administrasi Jakarta Timur, DKI Jakarta</td>
                    </tr>
                    <tr className="shadow-md">
                      <td className="py-2 px-4 border border-gray-200">5</td>
                      <td className="py-2 px-4 border border-gray-200">Basit Abdillah</td>
                      <td className="py-2 px-4 border border-gray-200">MET.000.003244.2019</td>
                      <td className="py-2 px-4 border border-gray-200">Kota Bekasi, Jawa Barat</td>
                    </tr>
                    <tr className="shadow-md bg-[#D9D9D9]">
                      <td className="py-2 px-4 border border-gray-200">6</td>
                      <td className="py-2 px-4 border border-gray-200">DENNY</td>
                      <td className="py-2 px-4 border border-gray-200">MET.000.003232.2019</td>
                      <td className="py-2 px-4 border border-gray-200">Kota Bekasi, Jawa Barat</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-white text-gray-800 mt-10 relative z-30">
          <h1 className="text-left text-2xl md:text-3xl font-bold mb-2 pl-32 mb-8 data-overview-title">
            DATA OVERVIEW
          </h1>
          <div className="flex flex-col md:flex-row justify-start mt-8">
            <div className="md:w-2/3 space-y-6">
              <div className="flex items-center">
                <Image
                  src="/tuk.png"
                  alt=""
                  width={50}
                  height={50}
                  onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/50?text=TUK')}
                />
                <div className="ml-4 flex-grow">
                  <h2 className="text-xl font-bold">TUK</h2>
                  <p className="text-sm md:text-base">
                    Tempat Uji Kompetensi (TUK): Lokasi Resmi Untuk Pelaksanaan Uji Kompetensi Guna Memastikan Standar
                    Keahlian Sesuai Dengan Regulasi.
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Image
                  src="/skema.png"
                  alt=""
                  width={50}
                  height={50}
                  onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/50?text=Skema')}
                />
                <div className="ml-4 flex-grow">
                  <h2 className="text-xl font-bold">SKEMA</h2>
                  <p className="text-sm md:text-base">
                    Skema Sertifikasi: Beragam Skema Sertifikasi Yang Dirancang Untuk Mengukur Kompetensi Sesuai Dengan
                    Kebutuhan Industri.
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Image
                  src="/asesor.png"
                  alt=""
                  width={50}
                  height={50}
                  onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/50?text=Asesor')}
                />
                <div className="ml-4 flex-grow">
                  <h2 className="text-xl font-bold">ASESOR</h2>
                  <p className="text-sm md:text-base">
                    Asesor: Para Profesional Bersertifikat Yang Bertugas Menilai Dan Memverifikasi Kompetensi Peserta Uji.
                  </p>
                </div>
              </div>
            </div>
            <div className="md:w-1/3 flex flex-col items-center justify-center mt-8 md:mt-0 md:ml-12">
              <Image
                alt="Person working on a computer in a classroom setting"
                className="hidden md:block rounded-lg w-full max-w-[300px] h-auto mb-8"
                src="/data_overview.png"
                width={300}
                height={200}
                onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Data+Overview')}
              />
            </div>
          </div>
        </section>

        <div id="dkv-popup" className="popup hidden fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-[2000] justify-center items-center">
          <div className="popup-content bg-white rounded-lg w-[90%] max-w-[800px] max-h-[90vh] overflow-y-auto">
            <div className="popup-header bg-[#8D0000] text-white p-4 rounded-t-lg flex justify-between items-center">
              <h2 className="text-lg font-semibold">Unit Skema: Skema Okupasi Junior Operator Desain Grafis (DKV)</h2>
              <i className="fas fa-times text-white cursor-pointer text-2xl" onClick={() => closePopup('dkv')}></i>
            </div>
            <div className="popup-body p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr className="bg-black text-white">
                      <th className="py-2 px-4 border border-gray-200 text-left">Kode Unit</th>
                      <th className="py-2 px-4 border border-gray-200 text-left">Nama</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array(8)
                      .fill(0)
                      .map((_, index) => (
                        <tr key={index} className="shadow-md">
                          <td className="py-2 px-4 border border-gray-200">KRA.LGM.027.A</td>
                          <td className="py-2 px-4 border border-gray-200">Melaksanakan Persyaratan K-3</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div id="kkbt-popup" className="popup hidden fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-[2000] justify-center items-center">
          <div className="popup-content bg-white rounded-lg w-[90%] max-w-[800px] max-h-[90vh] overflow-y-auto">
            <div className="popup-header bg-[#8D0000] text-white p-4 rounded-t-lg flex justify-between items-center">
              <h2 className="text-lg font-semibold">Unit Skema: Skema Okupasi Pembatik Tulis Junior (KKBT)</h2>
              <i className="fas fa-times text-white cursor-pointer text-2xl" onClick={() => closePopup('kkbt')}></i>
            </div>
            <div className="popup-body p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr className="bg-black text-white">
                      <th className="py-2 px-4 border border-gray-200 text-left">Kode Unit</th>
                      <th className="py-2 px-4 border border-gray-200 text-left">Nama</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="shadow-md">
                      <td className="py-2 px-4 border border-gray-200">KKBT.001.A</td>
                      <td className="py-2 px-4 border border-gray-200">Mempersiapkan Proses Pembatikan</td>
                    </tr>
                    <tr className="shadow-md">
                      <td className="py-2 px-4 border border-gray-200">KKBT.002.A</td>
                      <td className="py-2 px-4 border border-gray-200">Membuat Desain Batik</td>
                    </tr>
                    <tr className="shadow-md">
                      <td className="py-2 px-4 border border-gray-200">KKBT.003.A</td>
                      <td className="py-2 px-4 border border-gray-200">Melakukan Proses Pembatikan</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div id="seni-lukis-popup" className="popup hidden fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-[2000] justify-center items-center">
          <div className="popup-content bg-white rounded-lg w-[90%] max-w-[800px] max-h-[90vh] overflow-y-auto">
            <div className="popup-header bg-[#8D0000] text-white p-4 rounded-t-lg flex justify-between items-center">
              <h2 className="text-lg font-semibold">
                Unit Skema: Skema SKKNI Membuat Karya Seni Lukis Realis (Seni Lukis)
              </h2>
              <i className="fas fa-times text-white cursor-pointer text-2xl" onClick={() => closePopup('seni-lukis')}></i>
            </div>
            <div className="popup-body p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr className="bg-black text-white">
                      <th className="py-2 px-4 border border-gray-200 text-left">Kode Unit</th>
                      <th className="py-2 px-4 border border-gray-200 text-left">Nama</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="shadow-md">
                      <td className="py-2 px-4 border border-gray-200">SLR.001.A</td>
                      <td className="py-2 px-4 border border-gray-200">Mempersiapkan Bahan dan Alat Melukis</td>
                    </tr>
                    <tr className="shadow-md">
                      <td className="py-2 px-4 border border-gray-200">SLR.002.A</td>
                      <td className="py-2 px-4 border border-gray-200">Membuat Sketsa Lukisan</td>
                    </tr>
                    <tr className="shadow-md">
                      <td className="py-2 px-4 border border-gray-200">SLR.003.A</td>
                      <td className="py-2 px-4 border border-gray-200">Mewarnai Lukisan</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div id="kkkr-popup" className="popup hidden fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-[2000] justify-center items-center">
          <div className="popup-content bg-white rounded-lg w-[90%] max-w-[800px] max-h-[90vh] overflow-y-auto">
            <div className="popup-header bg-[#8D0000] text-white p-4 rounded-t-lg flex justify-between items-center">
              <h2 className="text-lg font-semibold">Unit Skema: Skema SKKNI Kriya Kreatif Kayu Dan Rotan (KKKR)</h2>
              <i className="fas fa-times text-white cursor-pointer text-2xl" onClick={() => closePopup('kkkr')}></i>
            </div>
            <div className="popup-body p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr className="bg-black text-white">
                      <th className="py-2 px-4 border border-gray-200 text-left">Kode Unit</th>
                      <th className="py-2 px-4 border border-gray-200 text-left">Nama</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="shadow-md">
                      <td className="py-2 px-4 border border-gray-200">KKR.001.A</td>
                      <td className="py-2 px-4 border border-gray-200">Mempersiapkan Bahan dan Alat Kriya</td>
                    </tr>
                    <tr className="shadow-md">
                      <td className="py-2 px-4 border border-gray-200">KKR.002.A</td>
                      <td className="py-2 px-4 border border-gray-200">Membuat Desain Produk Kriya</td>
                    </tr>
                    <tr className="shadow-md">
                      <td className="py-2 px-4 border border-gray-200">KKR.003.A</td>
                      <td className="py-2 px-4 border border-gray-200">Membuat Produk Kriya</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Index;