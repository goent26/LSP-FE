'use client';

import Head from 'next/head';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../../../components/user/Navbar';
import Footer from '../../../../components/user/Footer';
import Image from 'next/image';

interface detail {
  no: number;
  nama: string;
  asesor: string;
  kehadiran: string;
}

export default function Peserta() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showPopup, setShowPopup] = useState(false);
  const [showDisqualifyPopup, setShowDisqualifyPopup] = useState(false);
  const [selecteddetailIndex, setSelecteddetailIndex] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  // Initialize data with default values
  const defaultData = Array.from({ length: 15 }, (_, i) => ({
    no: i + 1,
    nama: 'Deni Lesmana',
    asesor: 'Sinta Wulandari',
    kehadiran: 'Tanpa Keterangan',
  }));
  const [dataPeserta, setDataPeserta] = useState<detail[]>(defaultData);

  // Load data from localStorage after mount
  useEffect(() => {
    const savedData = localStorage.getItem('detailData');
    if (savedData) {
      try {
        setDataPeserta(JSON.parse(savedData));
      } catch {
        // Silent fail
      }
    }
  }, []);

  // Save to localStorage whenever dataPeserta changes
  useEffect(() => {
    try {
      localStorage.setItem('detailData', JSON.stringify(dataPeserta));
    } catch {
      // Silent fail
    }
  }, [dataPeserta]);

  // Memoize filteredPeserta and currentItems
  const filteredPeserta = useMemo(
    () =>
      dataPeserta.filter((peserta) =>
        peserta.nama.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [dataPeserta, searchQuery]
  );

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredPeserta.length / itemsPerPage);
  const currentItems = useMemo(
    () =>
      filteredPeserta.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      ),
    [filteredPeserta, currentPage]
  );

  // Event handlers with useCallback
  const toggleDropdown = useCallback((index: number) => {
    const newIndex = openDropdownIndex === index ? null : index;
    setOpenDropdownIndex(newIndex);
  }, [openDropdownIndex]);

  const openKeteranganPopup = useCallback((index: number) => {
    setSelecteddetailIndex(index);
    setShowPopup(true);
    setOpenDropdownIndex(null);
  }, []);

  const closePopup = useCallback(() => {
    setShowPopup(false);
  }, []);

  const closeDisqualifyPopup = useCallback(() => {
    setShowDisqualifyPopup(false);
  }, []);

  const handleKehadiran = useCallback(
    (status: 'Hadir' | 'Tidak Hadir') => {
      if (selecteddetailIndex !== null) {
        const updatedData = [...dataPeserta];
        updatedData[selecteddetailIndex].kehadiran = status;
        setDataPeserta(updatedData);
      }
      closePopup();
    },
    [selecteddetailIndex, dataPeserta, closePopup]
  );

  const handleDiskualifikasi = useCallback(() => {
    if (selecteddetailIndex !== null) {
      const updatedData = [...dataPeserta];
      updatedData.splice(selecteddetailIndex, 1);
      const newData = updatedData.map((item, index) => ({
        ...item,
        no: index + 1,
      }));
      setDataPeserta(newData);
    }
    closeDisqualifyPopup();
  }, [selecteddetailIndex, dataPeserta, closeDisqualifyPopup]);

  const handleOptionClick = useCallback(
    (option: string, index: number) => {
      setSelecteddetailIndex(index);
      setOpenDropdownIndex(null);
      switch (option) {
        case 'Edit':
          openKeteranganPopup(index);
          break;
        case 'Diskualifikasi':
          setShowDisqualifyPopup(true);
          break;
        default:
          break;
      }
    },
    [openKeteranganPopup]
  );

  return (
    <>
      <Head>
        <title>Manajemen Peserta - Web Developer</title>
        <meta
          name="description"
          content="Kelola peserta untuk acara Web Developer dengan fitur kehadiran, input nilai, dan diskualifikasi."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Manajemen Peserta - Web Developer" />
        <meta
          property="og:description"
          content="Kelola peserta untuk acara Web Developer dengan fitur kehadiran, input nilai, dan diskualifikasi."
        />
        <meta property="og:type" content="website" />
        <link
          rel="canonical"
          href="https://yourdomain.com/asesor/jadwal/detail"
        />
        <link rel="preload" href="/icons/calendar.svg" as="image" />
        <link rel="preload" href="/icons/clock.svg" as="image" />
        <link rel="preload" href="/icons/hourglass.svg" as="image" />
        <link rel="preload" href="/back.png" as="image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Event',
              name: 'Web Developer Workshop',
              startDate: '2025-04-04T09:00:00+07:00',
              endDate: '2025-04-04T11:00:00+07:00',
              eventStatus: 'https://schema.org/EventScheduled',
              eventAttendanceMode:
                'https://schema.org/OfflineEventAttendanceMode',
              location: {
                '@type': 'Place',
                name: 'Lab Desain Komunikasi Visual',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Unknown',
                  addressCountry: 'ID',
                },
              },
              description:
                'Kelola peserta untuk acara Web Developer dengan fitur kehadiran, input nilai, dan diskualifikasi.',
            }),
          }}
        />
      </Head>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
        .min-h-screen {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .bg-red-800 {
          background-color: #8b0b0b;
        }
        .text-white {
          color: #fff;
        }
      `}</style>
      <div className="min-h-screen font-poppins bg-gray-100 flex flex-col relative">
        <Navbar />
        <main className="p-4 max-w-6xl mx-auto w-full flex-grow">
          <button
            className="flex items-center text-black font-medium text-sm mb-4 hover:underline min-h-[48px]"
            onClick={() => router.back()}
            aria-label="Kembali ke halaman sebelumnya"
          >
            <Image
              src="/back.png"
              alt="Back"
              width={16}
              height={16}
              priority
              sizes="16px"
            />
            <span className="ml-1">Kembali</span>
          </button>

          <div className="bg-red-800 text-white p-6 rounded-md shadow-md mb-6">
            <h1 className="text-3xl font-bold text-white">Web Developer</h1>
            <div className="mt-2">
              <button className="px-4 py-1 border border-white rounded-full text-sm min-h-[48px]">
                Lab Desain Komunikasi Visual
              </button>
            </div>
            <div className="flex flex-wrap gap-6 mt-4 text-sm items-center">
              <div className="flex items-center gap-1">
                <Image
                  src="/icons/calendar.svg"
                  alt="calendar"
                  width={16}
                  height={16}
                  priority
                  sizes="16px"
                />
                Rabu 4 April 2025
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src="/icons/clock.svg"
                  alt="clock"
                  width={16}
                  height={16}
                  priority
                  sizes="16px"
                />
                09.00 - 10.00
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src="/icons/hourglass.svg"
                  alt="hourglass"
                  width={16}
                  height={16}
                  priority
                  sizes="16px"
                />
                2 Jam
              </div>
            </div>
          </div>

          <div className="flex mt-2 gap-2 items-center" aria-live="polite">
            <label htmlFor="search" className="sr-only">
              Cari Peserta
            </label>
            <input
              id="search"
              type="text"
              placeholder="Cari Peserta"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="flex-grow px-4 py-3 border border-gray-300 rounded-md shadow-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[48px]"
            />
            <button
              className="p-3 border border-gray-300 rounded-md shadow-md bg-white hover:bg-gray-100 min-h-[48px]"
              aria-label="Cari peserta"
            >
              🔍
            </button>
          </div>

          <div className="mt-6 rounded-md border border-gray-300 bg-white shadow-md">
            <table
              ref={tableRef}
              className="w-full text-sm text-center border-separate border-spacing-0"
            >
              <thead className="bg-gray-200 text-gray-700 font-semibold">
                <tr>
                  <th className="py-3 px-2 border-b border-gray-400">No</th>
                  <th className="py-3 px-2 border-b border-gray-400">Nama</th>
                  <th className="py-3 px-2 border-b border-gray-400">Asesor</th>
                  <th className="py-3 px-2 border-b border-gray-400">Kehadiran</th>
                  <th className="py-3 px-2 border-b border-gray-400">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr
                    key={item.no}
                    className="border-b border-gray-200 relative"
                    aria-current={openDropdownIndex === index ? 'true' : undefined}
                  >
                    <td className="py-3 border-b border-gray-200">{item.no}</td>
                    <td className="py-3 border-b border-gray-200 text-black font-medium">
                      {item.nama}
                    </td>
                    <td className="py-3 border-b border-gray-200">{item.asesor}</td>
                    <td
                      className={`py-3 border-b border-gray-200 ${
                        item.kehadiran === 'Hadir'
                          ? 'text-green-600'
                          : item.kehadiran === 'Tidak Hadir'
                          ? 'text-red-600'
                          : item.kehadiran === 'Didiskualifikasi'
                          ? 'text-red-800 font-semibold'
                          : 'text-gray-500'
                      }`}
                    >
                      {item.kehadiran}
                    </td>
                    <td className="py-3 border-b border-gray-200 relative">
                      <div className="relative">
                        <button
                          onClick={() => toggleDropdown(index)}
                          className="bg-red-800 text-white px-4 py-1 rounded-md text-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[48px]"
                          aria-label={`Opsi untuk ${item.nama}`}
                          aria-expanded={openDropdownIndex === index}
                          aria-controls={`dropdown-${index}`}
                        >
                          Opsi
                        </button>
                        {openDropdownIndex === index && (
                          <div
                            ref={dropdownRef}
                            className="absolute z-50 w-48 bg-white border border-gray-300 rounded-lg shadow-md text-left mt-2 right-0"
                            role="menu"
                          >
                            <button
                              className="w-full px-4 py-2 hover:bg-gray-100 flex items-center gap-2 focus:outline-none focus:bg-gray-100 min-h-[48px]"
                              onClick={() => handleOptionClick('Edit', index)}
                              role="menuitem"
                            >
                              <Image
                                src="/icons/info.svg"
                                width={16}
                                height={16}
                                alt="Edit"
                                sizes="16px"
                              />
                              Edit
                            </button>
                            <button
                              className="w-full px-4 py-2 hover:bg-gray-100 text-black flex items-center gap-2 focus:outline-none focus:bg-gray-100 min-h-[48px]"
                              onClick={() => handleOptionClick('Diskualifikasi', index)}
                              role="menuitem"
                            >
                              <Image
                                src="/icons/disqualify.svg"
                                width={16}
                                height={16}
                                alt="Diskualifikasi"
                                sizes="16px"
                              />
                              Diskualifikasi
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            className="flex justify-center mt-6 space-x-1"
            aria-label="Navigasi halaman"
          >
            <button
              className="border border-gray-300 rounded px-2 py-1 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[48px]"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              aria-label="Halaman sebelumnya"
              disabled={currentPage === 1}
            >
              
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`border border-gray-300 rounded px-3 py-1 ${
                  currentPage === idx + 1
                    ? 'text-white bg-red-800'
                    : 'hover:bg-gray-200'
                } focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[48px]`}
                aria-label={`Halaman ${idx + 1}`}
                aria-current={currentPage === idx + 1 ? 'page' : undefined}
              >
                {idx + 1}
              </button>
            ))}
            <button
              className="border border-gray-300 rounded px-2 py-1 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[48px]"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              aria-label="Halaman berikutnya"
              disabled={currentPage === totalPages}
            >
              
            </button>
          </div>
        </main>
        <Footer />

        {/* Popup Kehadiran */}
        {showPopup && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="kehadiran-title"
          >
            <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full relative">
              <button
                onClick={closePopup}
                className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[48px]"
                aria-label="Tutup popup kehadiran"
              >
                X
              </button>
              <h2 id="kehadiran-title" className="sr-only">
                Pilih status kehadiran
              </h2>
              <Image
                src="/popup-attendance.png"
                width={300}
                height={300}
                alt="Popup Kehadiran"
                className="mx-auto mb-4"
                loading="lazy"
                sizes="(max-width: 640px) 100vw, 300px"
              />
              <div className="flex justify-between gap-4 mt-4">
                <button
                  className="w-1/2 bg-red-800 text-white py-2 rounded-md font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[48px]"
                  onClick={() => handleKehadiran('Tidak Hadir')}
                >
                  Tidak Hadir
                </button>
                <button
                  className="w-1/2 bg-green-700 text-white py-2 rounded-md font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 min-h-[48px]"
                  onClick={() => handleKehadiran('Hadir')}
                >
                  Hadir
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Popup Konfirmasi Diskualifikasi */}
        {showDisqualifyPopup && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            role="dialog"
            aria-modal="true"
            aria-labelledby="diskualifikasi-title"
          >
            <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full text-center relative">
              <button
                onClick={closeDisqualifyPopup}
                className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[48px]"
                aria-label="Tutup popup diskualifikasi"
              >
                X
              </button>
              <div className="flex justify-center mb-4">
                <Image
                  src="/peringatan.png"
                  width={64}
                  height={64}
                  alt="Peringatan"
                  className="mx-auto"
                  loading="lazy"
                  sizes="64px"
                />
              </div>
              <h2
                id="diskualifikasi-title"
                className="text-xl font-bold text-gray-800 mb-2"
              >
                Yakin ingin dihapus?
              </h2>
              <p className="text-gray-600 text-sm mb-6">
                Perhatikan kembali data yang akan Anda hapus
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={closeDisqualifyPopup}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 min-h-[48px]"
                >
                  Batal
                </button>
                <button
                  onClick={handleDiskualifikasi}
                  className="bg-red-800 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[48px]"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}