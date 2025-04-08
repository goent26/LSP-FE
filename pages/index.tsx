import React, { useEffect, useState } from 'react';
import Head from 'next/head';
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

      {/* Background Image */}
      {/* <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 z-0"
        style={{ backgroundImage: "url('/data.png')" }}
      ></div> */}

      {/* Konten Utama */}
      <div className="relative z-10">
        <Navbar />
        <Header />

        <section className="relative z-20 flex flex-col md:flex-row items-center justify-center mx-4 profile-section">
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
            <img src="/profile.png" alt="Profil LSP" className="w-[80%] md:w-[500px] h-auto object-cover" />
          </div>
        </section>

        <section className="container mx-auto relative z-10 mt-24">
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
        </section>

        <section className="w-full bg-white text-gray-800 mt-24 relative z-30">
          <h1 className="text-left text-2xl md:text-3xl font-bold mb-2 pl-32 mb-8 data-overview-title">
            DATA OVERVIEW
          </h1>
          <div className="flex flex-col md:flex-row justify-start mt-8">
            <div className="md:w-2/3 space-y-6">
              <div className="flex items-center">
                <img src="tuk.png" alt="" />
                <div className="ml-4 flex-grow">
                  <h2 className="text-xl font-bold">TUK</h2>
                  <p className="text-sm md:text-base">
                    Tempat Uji Kompetensi (TUK): Lokasi Resmi Untuk Pelaksanaan Uji Kompetensi Guna Memastikan Standar
                    Keahlian Sesuai Dengan Regulasi.
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <img src="skema.png" alt="" />
                <div className="ml-4 flex-grow">
                  <h2 className="text-xl font-bold">SKEMA</h2>
                  <p className="text-sm md:text-base">
                    Skema Sertifikasi: Beragam Skema Sertifikasi Yang Dirancang Untuk Mengukur Kompetensi Sesuai Dengan
                    Kebutuhan Industri.
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <img src="asesor.png" alt="" />
                <div className="ml-4 flex-grow">
                  <h2 className="text-xl font-bold">ASESOR</h2>
                  <p className="text-sm md:text-base">
                    Asesor: Para Profesional Bersertifikat Yang Bertugas Menilai Dan Memverifikasi Kompetensi Peserta Uji.
                  </p>
                </div>
              </div>
            </div>
            <div className="md:w-1/3 flex flex-col items-center justify-center mt-8 md:mt-0 md:ml-12">
              <img
                alt="Person working on a computer in a classroom setting"
                className="hidden md:block rounded-lg w-full max-w-md h-auto mb-8"
                src="data_overview.png"
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
                    {Array(8).fill(0).map((_, index) => (
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
              <h2 className="text-lg font-semibold">Unit Skema: Skema SKKNI Membuat Karya Seni Lukis Realis (Seni Lukis)</h2>
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