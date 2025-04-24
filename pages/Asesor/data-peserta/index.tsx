'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/user/Navbar';
import Footer from '../../../components/user/Footer';
import { FaUserAlt, FaCheckSquare } from 'react-icons/fa';
import Image from 'next/image';
 

export default function DataPeserta() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPesertaIndex, setSelectedPesertaIndex] = useState<number | null>(null); // Menyimpan indeks peserta untuk verifikasi
  const dropdownRef = useRef<HTMLDivElement>(null); // Referensi untuk dropdown

  // Data peserta dengan status verifikasi
  const [dataPeserta, setDataPeserta] = useState(
    Array.from({ length: 25 }, (_, i) => ({
      no: i + 1,
      nama: `Muhammad Deni`,
      nik: `32750${i}123456789`,
      skema: `Skema ${i + 1}`,
      status: 'Belum Diverifikasi', // Default status
    }))
  );

  const itemsPerPage = 10;
  const totalPages = Math.ceil(dataPeserta.length / itemsPerPage);
  const currentItems = dataPeserta.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Menutup dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownIndex(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (index: number) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };

  // Fungsi untuk memperbarui status verifikasi
  const handleVerification = (status: 'Terverifikasi' | 'Ditolak') => {
    if (selectedPesertaIndex !== null) {
      const updatedData = [...dataPeserta];
      updatedData[selectedPesertaIndex].status = status;
      setDataPeserta(updatedData);
    }
    setShowModal(false);
    setSelectedPesertaIndex(null);
    setDropdownIndex(null); // Tutup dropdown setelah verifikasi
  };

  // Fungsi untuk navigasi ke halaman detail
  const handleDetail = (nik: string) => {
    router.push(`/Asesor/data-peserta/detail?nik=${nik}`);
    setDropdownIndex(null); // Tutup dropdown setelah klik Detail
  };

  return (
    <div className="min-h-screen font-poppins bg-gray-100 flex flex-col relative">
      <Navbar />
      <main className="p-4 max-w-6xl mx-auto w-full flex-grow">
        {/* Header */}
        <div className="bg-red-800 p-6 rounded-md shadow-md">
          <h1 className="font-semibold text-white text-lg">Data Peserta</h1>
        </div>

        {/* Search */}
        <div className="flex mt-6 gap-2 items-center">
          <input
            type="text"
            placeholder="Cari Peserta"
            className="flex-grow px-4 py-3 border border-gray-300 rounded-md shadow-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button className="p-3 border border-gray-300 rounded-md shadow-md bg-white hover:bg-gray-100">
            🔍
          </button>
        </div>

        {/* Table */}
        <div className="mt-6 rounded-md border border-gray-300 overflow-hidden bg-white shadow-md">
          <table className="w-full text-sm text-center">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-2 border border-gray-300">No</th>
                <th className="py-3 px-2 border border-gray-300">Nama Peserta</th>
                <th className="py-3 px-2 border border-gray-300">NIK</th>
                <th className="py-3 px-2 border border-gray-300">Skema</th>
                <th className="py-3 px-2 border border-gray-300">Status</th>
                <th className="py-3 px-2 border border-gray-300">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index} className="bg-white">
                  <td className="py-3">{item.no}</td>
                  <td className="py-3 px-2 text-left text-black">{item.nama}</td>
                  <td className="py-3">{item.nik}</td>
                  <td className="py-3">{item.skema}</td>
                  <td className="py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === 'Terverifikasi'
                          ? 'bg-green-200 text-green-800'
                          : item.status === 'Ditolak'
                          ? 'bg-red-200 text-red-800'
                          : 'bg-yellow-200 text-yellow-800'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 relative">
                    <button
                      onClick={() => toggleDropdown(index)}
                      className="bg-red-800 text-white px-4 py-1 rounded-md text-sm hover:bg-red-700"
                    >
                      Edit
                    </button>
                    {dropdownIndex === index && (
                      <div
                        ref={dropdownRef}
                        className="absolute z-10 right-0 mt-2 w-36 bg-white border border-gray-300 rounded shadow-md text-left"
                      >
                        <button
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-sm"
                          onClick={() => handleDetail(item.nik)}
                        >
                          <FaUserAlt className="text-black" />
                          <span>Detail</span>
                        </button>
                        <button
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-sm"
                          onClick={() => {
                            setShowModal(true);
                            setSelectedPesertaIndex((currentPage - 1) * itemsPerPage + index); // Simpan indeks peserta
                            setDropdownIndex(null); // Tutup dropdown saat buka modal
                          }}
                        >
                          <FaCheckSquare className="text-black" />
                          <span>Verifikasi</span>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-1">
          <button
            className="border border-gray-300 rounded px-2 py-1 hover:bg-gray-200"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            &lt;
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`border border-gray-300 rounded px-3 py-1 ${
                currentPage === idx + 1 ? 'text-white bg-red-800' : 'hover:bg-gray-200'
              }`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            className="border border-gray-300 rounded px-2 py-1 hover:bg-gray-200"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          >
            &gt;
          </button>
        </div>
      </main>
      <Footer />

      {/* Modal Verifikasi */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg relative w-[360px] text-center">
            <button
              onClick={() => {
                setShowModal(false);
                setSelectedPesertaIndex(null);
              }}
              className="absolute top-2 right-2 text-black text-xl"
            >
              ✕
            </button>
            <Image
              src="/images/verifikasi.png"
              alt="Verifikasi"
              width={250}
              height={250}
              className="mx-auto"
            />
            <div className="mt-4 flex justify-around">
              <button
                className="bg-red-800 hover:bg-red-900 text-white px-6 py-2 rounded-lg font-semibold shadow"
                onClick={() => handleVerification('Ditolak')}
              >
                Ditolak
              </button>
              <button
                className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg font-semibold shadow"
                onClick={() => handleVerification('Terverifikasi')}
              >
                Verifikasi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}