'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '../../../../../components/user/Navbar';
import Footer from '../../../../../components/user/Footer';

export default function Elemen() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const dataElemen = Array.from({ length: 15 }, (_, i) => ({
    no: i + 1,
    judul: `Judul Elemen ${i + 1}`,
    kriteria: `Kriteria Unjuk Kerja ${i + 1}`,
  }));

  const itemsPerPage = 10;
  const totalPages = Math.ceil(dataElemen.length / itemsPerPage);
  const currentItems = dataElemen.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="min-h-screen font-poppins bg-gray-100 flex flex-col">
      <Navbar />
      <main className="p-4 max-w-6xl mx-auto w-full flex-grow">
        <button
          className="flex items-center text-black font-medium text-sm mb-4 hover:underline"
          onClick={() => router.back()}
        >
          <Image src="/back.png" alt="Back" width={16} height={16} priority />
          <span className="ml-1">Kembali</span>
        </button>

        {/* Header */}
        <div className="bg-red-800 text-white p-6 rounded-md shadow-md">
          <h1 className="font-semibold text-white text-lg">Elemen</h1>
        </div>

        {/* Search */}
        <div className="flex mt-6 gap-2 items-center">
          <input
            type="text"
            placeholder="Cari Elemen"
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
                <th className="py-3 px-2 border border-gray-300">Judul Elemen</th>
                <th className="py-3 px-2 border border-gray-300">Kriteria Unjuk Kerja</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td className="py-3">{item.no}</td>
                  <td className="py-3">{item.judul}</td>
                  <td className="py-3">{item.kriteria}</td>
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
            
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`border border-gray-300 rounded px-3 py-1 ${currentPage === idx + 1 ? 'text-white bg-red-800' : 'hover:bg-gray-200'}`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            className="border border-gray-300 rounded px-2 py-1 hover:bg-gray-200"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          >
            
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}