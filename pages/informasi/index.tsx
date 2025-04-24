import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Informasi: React.FC = () => {
  const [activeTab, setActiveTab] = useState('skema');

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
    <div className="font-['Poppins'] bg-white text-gray-800">
      <Head>
        <title>Informasi - LSP SMKN 58 Jakarta</title>
        <meta name="description" content="Informasi LSP SMKN 58 Jakarta" />
      </Head>

      <Navbar />
      <Header />

      {/* Data Overview Section */}
      <section className="w-full bg-white text-gray-800 mt-10 relative z-30">
        <h1 className="text-center text-3xl font-bold mb-10 drop-shadow-lg"></h1>
        <div className="flex flex-col md:flex-row justify-start mt-8">
          <div className="w-full space-y-8">
            {[
              { src: '/tuk.png', title: 'TUK', desc: 'Tempat Uji Kompetensi (TUK): Lokasi Resmi Untuk Pelaksanaan Uji Kompetensi Guna Memastikan Standar Keahlian Sesuai Dengan Regulasi.' },
              { src: '/skema.png', title: 'SKEMA', desc: 'Skema Sertifikasi: Beragam Skema Sertifikasi Yang Dirancang Untuk Mengukur Kompetensi Sesuai Dengan Kebutuhan Industri.' },
              { src: '/asesor.png', title: 'ASESOR', desc: 'Asesor: Para Profesional Bersertifikat Yang Bertugas Menilai Dan Memverifikasi Kompetensi Peserta Uji.' }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-row items-start w-full">
                <div className="flex-shrink-0 flex items-start justify-start">
                  <Image
                    src={item.src}
                    alt=""
                    width={150}
                    height={150}
                    className="min-w-[150px] object-contain"
                    onError={(e) => (e.currentTarget.src = `https://via.placeholder.com/150?text=${item.title}`)}
                  />
                </div>
                <div className="ml-8 flex-grow">
                  <h2 className="text-xl font-bold">{item.title}</h2>
                  <p className="text-sm md:text-base">{item.desc}</p>
                </div>
              </div>
            ))}
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

      {/* Data Tables Section */}
      <section className="w-full relative z-10 mt-32 pb-20 bg-white">
        <div className="bg-white p-6 rounded-lg mx-auto max-w-7xl">
          <div className="flex justify-between items-center pb-2 mb-4">
            <div className="flex space-x-4">
              <a
                className={`text-black tab-link cursor-pointer ${activeTab === 'skema' ? 'active' : ''}`}
                onClick={() => showTab('skema')}
              >
                DATA SKEMA
              </a>
              <a
                className={`text-black tab-link cursor-pointer ${activeTab === 'tuk' ? 'active' : ''}`}
                onClick={() => showTab('tuk')}
              >
                DATA TUK
              </a>
              <a
                className={`text-black tab-link cursor-pointer ${activeTab === 'assesor' ? 'active' : ''}`}
                onClick={() => showTab('assesor')}
              >
                DATA ASSESOR
              </a>
            </div>
          </div>

          <div id="skema-tab" className="tab-content active">
            <div className="overflow-x-auto">
              <table className="min-w-full border-2 border-black">
                <thead>
                  <tr className="bg-[#8D0000] text-white">
                    <th className="py-2 px-4 border-2 border-black text-left">NOMOR</th>
                    <th className="py-2 px-4 border-2 border-black text-left">SKEMA</th>
                    <th className="py-2 px-4 border-2 border-black text-center w-16"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="skema-row border-2 border-black" onClick={() => showPopup('dkv')}>
                    <td className="py-2 px-4 border-2 border-black text-center">1</td>
                    <td className="py-2 px-4 border-2 border-black">
                      Skema Okupasi Junior Operator Desain Grafis (DKV)
                    </td>
                    <td className="py-2 px-4 border-2 border-black text-center">
                      <span className="skema-badge">1</span>
                    </td>
                  </tr>
                  <tr className="skema-row bg-[#D9D9D9] border-2 border-black" onClick={() => showPopup('kkbt')}>
                    <td className="py-2 px-4 border-2 border-black text-center">2</td>
                    <td className="py-2 px-4 border-2 border-black">
                      Skema Okupasi Pembatik Tulis Junior (KKBT)
                    </td>
                    <td className="py-2 px-4 border-2 border-black text-center">
                      <span className="skema-badge">1</span>
                    </td>
                  </tr>
                  <tr className="skema-row border-2 border-black" onClick={() => showPopup('seni-lukis')}>
                    <td className="py-2 px-4 border-2 border-black text-center">3</td>
                    <td className="py-2 px-4 border-2 border-black">
                      Skema SKKNI Membuat Karya Seni Lukis Realis (Seni Lukis)
                    </td>
                    <td className="py-2 px-4 border-2 border-black text-center">
                      <span className="skema-badge">1</span>
                    </td>
                  </tr>
                  <tr className="skema-row bg-[#D9D9D9] border-2 border-black" onClick={() => showPopup('kkkr')}>
                    <td className="py-2 px-4 border-2 border-black text-center">4</td>
                    <td className="py-2 px-4 border-2 border-black">
                      Skema SKKNI Kriya Kreatif Kayu Dan Rotan (KKKR)
                    </td>
                    <td className="py-2 px-4 border-2 border-black text-center">
                      <span className="skema-badge">1</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div id="tuk-tab" className="tab-content">
            <div className="overflow-x-auto">
              <table className="min-w-full border-2 border-black">
                <thead>
                  <tr className="bg-[#8D0000] text-white">
                    <th className="py-2 px-4 border-2 border-black text-left">NOMOR</th>
                    <th className="py-2 px-4 border-2 border-black text-left">KODE</th>
                    <th className="py-2 px-4 border-2 border-black text-left">JENIS</th>
                    <th className="py-2 px-4 border-2 border-black text-left">NAMA</th>
                    <th className="py-2 px-4 border-2 border-black text-left">ALAMAT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="shadow-md border-2 border-black">
                    <td className="py-2 px-4 border-2 border-black">1</td>
                    <td className="py-2 px-4 border-2 border-black">008.a/SK/LSP SMKN58JKT/III/2019</td>
                    <td className="py-2 px-4 border-2 border-black">2</td>
                    <td className="py-2 px-4 border-2 border-black">Desain Permodelan Dan Informasi Bangunan</td>
                    <td className="py-2 px-4 border-2 border-black">Jl. SMIK Bambu Apus Cipayung/ TMII Jakarta Timur</td>
                  </tr>
                  <tr className="shadow-md bg-[#D9D9D9] border-2 border-black">
                    <td className="py-2 px-4 border-2 border-black">2</td>
                    <td className="py-2 px-4 border-2 border-black">008.b/SK/LSP SMKN58JKT/III/2019</td>
                    <td className="py-2 px-4 border-2 border-black">2</td>
                    <td className="py-2 px-4 border-2 border-black">DKV</td>
                    <td className="py-2 px-4 border-2 border-black">Jl SMIK Bambu Apus Cipayung/ TMII Jakarta Timur</td>
                  </tr>
                  <tr className="shadow-md border-2 border-black">
                    <td className="py-2 px-4 border-2 border-black">3</td>
                    <td className="py-2 px-4 border-2 border-black">008/SK/LSP SMKN58JKT/XI/2020</td>
                    <td className="py-2 px-4 border-2 border-black">2</td>
                    <td className="py-2 px-4 border-2 border-black">Kriya Kreatif Kayu dan Rotan</td>
                    <td className="py-2 px-4 border-2 border-black">Jl. SMIK 33 Bambu Apus Cipayung Jakarta Timur</td>
                  </tr>
                  <tr className="shadow-md bg-[#D9D9D9] border-2 border-black">
                    <td className="py-2 px-4 border-2 border-black">4</td>
                    <td className="py-2 px-4 border-2 border-black">009.b/SK/LSP SMKN58JKT/III/2019</td>
                    <td className="py-2 px-4 border-2 border-black">2</td>
                    <td className="py-2 px-4 border-2 border-black">Kriya Kreatif Batik dan Tekstil</td>
                    <td className="py-2 px-4 border-2 border-black">Jl. SMIK Bambu Apus Cipayung/ TMII Jakarta Timur</td>
                  </tr>
                  <tr className="shadow-md border-2 border-black">
                    <td className="py-2 px-4 border-2 border-black">5</td>
                    <td className="py-2 px-4 border-2 border-black">NOMOR 010/B/LSP-P1SMKN58 JKT 2017</td>
                    <td className="py-2 px-4 border-2 border-black">2</td>
                    <td className="py-2 px-4 border-2 border-black">Teknik Konstruksi Kayu</td>
                    <td className="py-2 px-4 border-2 border-black">Jl smik bambu apus/tmii cipayung jakarta timu</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div id="assesor-tab" className="tab-content">
            <div className="overflow-x-auto">
              <table className="min-w-full border-2 border-black">
                <thead>
                  <tr className="bg-[#8D0000] text-white">
                    <th className="py-2 px-4 border-2 border-black text-left">NOMOR</th>
                    <th className="py-2 px-4 border-2 border-black text-left">NAMA ASESOR</th>
                    <th className="py-2 px-4 border-2 border-black text-left">NO REGISTRASI</th>
                    <th className="py-2 px-4 border-2 border-black text-left">ALAMAT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="shadow-md border-2 border-black">
                    <td className="py-2 px-4 border-2 border-black">1</td>
                    <td className="py-2 px-4 border-2 border-black">Arief Supriyadi, S.Pd</td>
                    <td className="py-2 px-4 border-2 border-black">MET.000.0016141.2019</td>
                    <td className="py-2 px-4 border-2 border-black">Kota Administrasi Jakarta Selatan, DKI Jakarta</td>
                  </tr>
                  <tr className="shadow-md bg-[#D9D9D9] border-2 border-black">
                    <td className="py-2 px-4 border-2 border-black">2</td>
                    <td className="py-2 px-4 border-2 border-black">Siti Latifah, S.Pd</td>
                    <td className="py-2 px-4 border-2 border-black">MET.000.0011101.2017</td>
                    <td className="py-2 px-4 border-2 border-black">Kota Administrasi Jakarta Timur, DKI Jakarta</td>
                  </tr>
                  <tr className="shadow-md border-2 border-black">
                    <td className="py-2 px-4 border-2 border-black">3</td>
                    <td className="py-2 px-4 border-2 border-black">Dra. Sri Tulari Kurniasih</td>
                    <td className="py-2 px-4 border-2 border-black">MET.000.0011094.2017</td>
                    <td className="py-2 px-4 border-2 border-black">Kota Depok, Jawa Barat</td>
                  </tr>
                  <tr className="shadow-md bg-[#D9D9D9] border-2 border-black">
                    <td className="py-2 px-4 border-2 border-black">4</td>
                    <td className="py-2 px-4 border-2 border-black">VERIA WULANDARI</td>
                    <td className="py-2 px-4 border-2 border-black">MET.000.003243.2019</td>
                    <td className="py-2 px-4 border-2 border-black">Kota Administrasi Jakarta Timur, DKI Jakarta</td>
                  </tr>
                  <tr className="shadow-md border-2 border-black">
                    <td className="py-2 px-4 border-2 border-black">5</td>
                    <td className="py-2 px-4 border-2 border-black">Basit Abdillah</td>
                    <td className="py-2 px-4 border-2 border-black">MET.000.003244.2019</td>
                    <td className="py-2 px-4 border-2 border-black">Kota Bekasi, Jawa Barat</td>
                  </tr>
                  <tr className="shadow-md bg-[#D9D9D9] border-2 border-black">
                    <td className="py-2 px-4 border-2 border-black">6</td>
                    <td className="py-2 px-4 border-2 border-black">DENNY</td>
                    <td className="py-2 px-4 border-2 border-black">MET.000.003232.2019</td>
                    <td className="py-2 px-4 border-2 border-black">Kota Bekasi, Jawa Barat</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Popups */}
      <div id="dkv-popup" className="popup hidden fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-[2000] justify-center items-center">
        <div className="popup-content bg-white rounded-lg w-[90%] max-w-[800px] max-h-[90vh] overflow-y-auto flex flex-col p-0">
          <div className="popup-header bg-[#8D0000] text-white p-4 rounded-t-lg flex justify-between items-center">
            <h2 className="text-lg font-semibold">Unit Skema: Skema Okupasi Junior Operator Desain Grafis (DKV)</h2>
            <i className="fas fa-times text-white cursor-pointer text-2xl" onClick={() => closePopup('dkv')}></i>
          </div>
          <div className="popup-body p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border-2 border-white">
                <thead>
                  <tr className="bg-black text-white">
                    <th className="py-2 px-4 border-2 border-white text-left w-1/3">Kode Unit</th>
                    <th className="py-2 px-4 border-2 border-white text-left">Nama Unit Kompetensi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-4 border-2 border-white">TIK.MM01.007.01</td>
                    <td className="py-2 px-4 border-2 border-white">Mengoperasikan Perangkat Lunak Desain Grafis</td>
                  </tr>
                  <tr className="bg-[#F3F4F6]">
                    <td className="py-2 px-4 border-2 border-white">TIK.MM01.009.01</td>
                    <td className="py-2 px-4 border-2 border-white">Mengoperasikan Perangkat Lunak Pengolah Gambar Vektor</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 border-2 border-white">TIK.MM01.012.01</td>
                    <td className="py-2 px-4 border-2 border-white">Mengoperasikan Perangkat Lunak Pengolah Gambar Bitmap</td>
                  </tr>
                  <tr className="bg-[#F3F4F6]">
                    <td className="py-2 px-4 border-2 border-white">K3.LGM.027.A</td>
                    <td className="py-2 px-4 border-2 border-white">Melaksanakan Prosedur K3</td>
                  </tr>
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
              <table className="min-w-full bg-white border-2 border-white">
                <thead>
                  <tr className="bg-black text-white">
                    <th className="py-2 px-4 border-2 border-white text-left">Kode Unit</th>
                    <th className="py-2 px-4 border-2 border-white text-left">Nama</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="shadow-md">
                    <td className="py-2 px-4 border-2 border-white">KKBT.001.A</td>
                    <td className="py-2 px-4 border-2 border-white">Mempersiapkan Proses Pembatikan</td>
                  </tr>
                  <tr className="shadow-md">
                    <td className="py-2 px-4 border-2 border-white">KKBT.002.A</td>
                    <td className="py-2 px-4 border-2 border-white">Membuat Desain Batik</td>
                  </tr>
                  <tr className="shadow-md">
                    <td className="py-2 px-4 border-2 border-white">KKBT.003.A</td>
                    <td className="py-2 px-4 border-2 border-white">Melakukan Proses Pembatikan</td>
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
              <table className="min-w-full bg-white border-2 border-white">
                <thead>
                  <tr className="bg-black text-white">
                    <th className="py-2 px-4 border-2 border-white text-left">Kode Unit</th>
                    <th className="py-2 px-4 border-2 border-white text-left">Nama</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="shadow-md">
                    <td className="py-2 px-4 border-2 border-white">SLR.001.A</td>
                    <td className="py-2 px-4 border-2 border-white">Mempersiapkan Bahan dan Alat Melukis</td>
                  </tr>
                  <tr className="shadow-md">
                    <td className="py-2 px-4 border-2 border-white">SLR.002.A</td>
                    <td className="py-2 px-4 border-2 border-white">Membuat Sketsa Lukisan</td>
                  </tr>
                  <tr className="shadow-md">
                    <td className="py-2 px-4 border-2 border-white">SLR.003.A</td>
                    <td className="py-2 px-4 border-2 border-white">Mewarnai Lukisan</td>
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
              <table className="min-w-full bg-white border-2 border-white">
                <thead>
                  <tr className="bg-black text-white">
                    <th className="py-2 px-4 border-2 border-white text-left">Kode Unit</th>
                    <th className="py-2 px-4 border-2 border-white text-left">Nama</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="shadow-md">
                    <td className="py-2 px-4 border-2 border-white">KKR.001.A</td>
                    <td className="py-2 px-4 border-2 border-white">Mempersiapkan Bahan dan Alat Kriya</td>
                  </tr>
                  <tr className="shadow-md">
                    <td className="py-2 px-4 border-2 border-white">KKR.002.A</td>
                    <td className="py-2 px-4 border-2 border-white">Membuat Desain Produk Kriya</td>
                  </tr>
                  <tr className="shadow-md">
                    <td className="py-2 px-4 border-2 border-white">KKR.003.A</td>
                    <td className="py-2 px-4 border-2 border-white">Membuat Produk Kriya</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Informasi;