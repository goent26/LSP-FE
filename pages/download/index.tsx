import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Download: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const documents = [
    "SK Pembekuan LSP Hatsindo Indonesia Teknik",
    "SK Pembekuan LSP Hatsindo Indonesia Teknik",
    "SK Pembekuan LSP Hatsindo Indonesia Teknik",
    "SK Pembekuan LSP Hatsindo Indonesia Teknik",
    "SK Pembekuan LSP Hatsindo Indonesia Teknik",
  ];

  const filteredDocuments = documents.filter((doc) =>
    doc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="bg-white text-black font-['Poppins']">
      <Head>
        <title>Download - LSP SMKN 58 Jakarta</title>
        <meta name="description" content="Download Lembaga Sertifikasi Profesi SMKN 58 Jakarta" />
      </Head>

      <Navbar />

      <section
        className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-28 pt-16 pb-20 min-h-[60vh]"
        style={{
          backgroundImage: `url('/landing-download.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 0px',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Semua konten berada di tengah atas */}
        <div className="flex flex-col items-center text-base md:text-lg">
          {/* Judul */}
          <h1 className="text-3xl md:text-4xl font-semibold mb-8 tracking-wide text-black text-center">
            DOWNLOAD AREA
          </h1>

          {/* Konten utama */}
          <div className="w-full max-w-4xl">
            {/* Form Pencarian */}
            <div className="mb-8">
              <div className="bg-white rounded-lg shadow-md p-4 bg-opacity-90">
                <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2 shadow-md bg-white">
                  <input
                    type="text"
                    placeholder="Cari dokumen yang ingin di download"
                    className="flex-grow outline-none text-gray-600 placeholder-gray-400 bg-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="ml-2 p-2 bg-white rounded-md hover:bg-gray-100 transition border border-gray-300">
                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M10,2A8,8 0 0,1 18,10C18,12.21 17.21,14.21 15.83,15.59L21.71,21.46L20.29,22.88L14.41,17C13.03,18.38 11.03,19.17 9,19.17A8,8 0 1,1 10,2M10,4A6,6 0 1,0 16,10A6,6 0 0,0 10,4Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Daftar Dokumen */}
            <div className="space-y-10">
              {filteredDocuments.map((doc, index) => (
                <div
                  key={index}
                  className="bg-white bg-opacity-90 rounded-lg shadow-md border border-gray-200 overflow-hidden transition-all duration-500"
                >
                  <div className="flex items-center justify-between px-6 py-4">
                    <p className="text-sm md:text-base text-gray-800">{doc}</p>
                    <button
                      onClick={() => toggleExpand(index)}
                      className="bg-red-700 p-2 rounded-full hover:bg-red-800 transition"
                    >
                      <Image
                        src="/panah-keatas.png"
                        alt="Toggle"
                        width={20}
                        height={20}
                        className={`w-5 h-5 transform transition-transform duration-300 ${
                          expandedIndex === index ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>

                  <div
                    className={`transition-all duration-500 ease-in-out px-6 ${
                      expandedIndex === index ? 'max-h-40 opacity-100 py-4' : 'max-h-0 opacity-0 py-0'
                    } overflow-hidden`}
                  >
                    <div className="flex items-center bg-gray-200 rounded-md shadow-md p-4">
                      <a
                        href="/dokumen/sk-pembekuan.pdf"
                        className="bg-red-800 text-white font-semibold px-4 py-2 rounded-md mr-4 hover:bg-red-900 transition"
                        download
                      >
                        Download
                      </a>
                      <p className="text-sm text-gray-700">
                        SK Pembekuan LSP Hatsindo Indonesia Teknik
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {filteredDocuments.length === 0 && (
                <p className="text-center text-white bg-gray-900 bg-opacity-50 p-4 rounded-lg">
                  Tidak ada dokumen yang ditemukan
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Download;