'use client';

import Image from 'next/image';
import { useState } from 'react';
import Navbar from '../../../components/user/Navbar';
import Footer from '../../../components/user/Footer';

export default function Skema() {
  const [currentPage, setCurrentPage] = useState(1);

  const dataSkema = [
    { no: 1, judul: 'Web Developer', unit: 1, jenis: 'Klaster' },
    { no: 2, judul: 'Data Analyst', unit: 3, jenis: 'Klaster' },
    { no: 3, judul: 'UI/UX Designer', unit: 2, jenis: 'Klaster' },
    { no: 4, judul: 'Network Engineer', unit: 4, jenis: 'Klaster' },
    { no: 5, judul: 'DevOps Engineer', unit: 2, jenis: 'Klaster' },
    { no: 6, judul: 'Cyber Security', unit: 3, jenis: 'Klaster' },
  ];

  const itemsPerPage = 2;
  const totalPages = Math.ceil(dataSkema.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = dataSkema.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen font-poppins bg-gray-100 flex flex-col">
      <div className="mb-8">
        <Navbar />
      </div>

      <main className="p-4 max-w-6xl mx-auto w-full flex-grow">
        {/* Header Merah */}
        <div className="bg-red-800 text-white p-6 rounded-md shadow-md">
          <h1 className="text-white font-semibold text-lg">Skema</h1>
        </div>

        {/* Form Pencarian */}
        <div className="flex mt-6 gap-4 items-center">
          <input
            type="text"
            id="searchInput"
            placeholder="Cari Skema"
            className="flex-grow px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 placeholder-gray-400 text-sm shadow-md"
          />
          <button
            onClick={() => alert('Fungsi pencarian belum diimplementasikan.')}
            className="px-4 py-3 border border-gray-300 rounded-md bg-white hover:bg-gray-100 text-sm shadow-md"
          >
            🔍
          </button>
        </div>

        {/* Tabel Skema */}
        <div className="mt-8 rounded-md border border-gray-300 overflow-hidden bg-white shadow-md">
          <table className="w-full text-sm text-center">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-2 border-2 border-gray-300">No</th>
                <th className="py-3 px-2 border-2 border-gray-300">Judul Skema</th>
                <th className="py-3 px-2 border-2 border-gray-300">Jumlah Unit</th>
                <th className="py-3 px-2 border-2 border-gray-300">Jenis</th>
                <th className="py-3 px-2 border-2 border-gray-300">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index} className="bg-white">
                  <td className="py-3 border-y border-l border-gray-300">{item.no}</td>
                  <td className="py-3 border-y border-gray-300">{item.judul}</td>
                  <td className="py-3 border-y border-gray-300">{item.unit}</td>
                  <td className="py-3 border-y border-gray-300">{item.jenis}</td>
                  <td className="py-3 border-y border-r border-gray-300">
                    <button className="bg-red-800 text-white px-4 py-1 rounded-md text-sm hover:bg-red-700">Detail</button>
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
              className={`border border-gray-300 rounded px-3 py-1 ${currentPage === idx + 1 ? 'text-white bg-red-800' : 'hover:bg-gray-200'}`}
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

      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
}