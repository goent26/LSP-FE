'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Navbar from '../../../components/user/Navbar';
import Footer from '../../../components/user/Footer';
import { FaFilter, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const Jadwal = () => {
  const [activeTab, setActiveTab] = useState('Berlangsung');
  const [showFilter, setShowFilter] = useState(false);
  const [filterSkema, setFilterSkema] = useState('');
  const [filterTanggal, setFilterTanggal] = useState('');
  const [filterTUK, setFilterTUK] = useState('');

  const router = useRouter();

  const jadwalData = [
    {
      title: 'Web Developer',
      subtitle: 'Tempat Uji Kompetensi',
      skema: 'Lab Desain Komunikasi Visual',
      date: 'Rabu 4 April 2025',
      time: '09.00 – 10.00',
      status: 'Berlangsung',
    },
    {
      title: 'Web Developer',
      subtitle: 'Tempat Uji Kompetensi',
      skema: 'Lab Desain Komunikasi Visual',
      date: 'Rabu 4 April 2025',
      time: '09.00 – 10.00',
      status: 'Berlangsung',
    },
    {
      title: 'Web Developer',
      subtitle: 'Tempat Uji Kompetensi',
      skema: 'Lab Desain Komunikasi Visual',
      date: 'Kamis 10 April 2025',
      time: '10.00 – 11.00',
      status: 'Akan Datang',
    },
    {
      title: 'Web Developer',
      subtitle: 'Tempat Uji Kompetensi',
      skema: 'Lab Multimedia',
      date: 'Jumat 12 April 2025',
      time: '13.00 – 14.00',
      status: 'Akan Datang',
    },
    {
      title: 'Web Developer',
      subtitle: 'Tempat Uji Kompetensi',
      skema: 'Lab Komputer Jaringan',
      date: 'Jumat 12 April 2025',
      time: '13.00 – 14.00',
      status: 'Akan Datang',
    },
    {
      title: 'Web Developer',
      subtitle: 'Tempat Uji Kompetensi',
      skema: 'Lab Komputer Jaringan',
      date: 'Sabtu 13 April 2025',
      time: '14.00 – 15.00',
      status: 'Sudah Selesai',
    },
    {
      title: 'Web Developer',
      subtitle: 'Tempat Uji Kompetensi',
      skema: 'Lab Multimedia',
      date: 'Sabtu 13 April 2025',
      time: '14.00 – 15.00',
      status: 'Sudah Selesai',
    },
  ];

  const uniqueDates = [...new Set(jadwalData.map((item) => item.date))];
  const uniqueTUKs = [...new Set(jadwalData.map((item) => item.skema))];

  const filteredJadwal = jadwalData.filter(
    (item) =>
      item.status === activeTab &&
      (filterSkema === '' || item.skema.toLowerCase().includes(filterSkema.toLowerCase())) &&
      (filterTanggal === '' || item.date === filterTanggal) &&
      (filterTUK === '' || item.skema === filterTUK)
  );

  return (
    <div className="min-h-screen font-poppins bg-gray-100 flex flex-col">
      <Navbar />
      <main className="p-4 max-w-7xl mx-auto w-full flex-grow">
        {/* Header Tabs */}
        <div className="bg-red-800 text-white px-6 py-4 rounded-t-md rounded-b-md flex justify-between items-center shadow-md flex-wrap gap-4">
          <div className="flex space-x-6">
            {['Berlangsung', 'Akan Datang', 'Sudah Selesai'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative text-lg pb-1 ${
                  activeTab === tab
                    ? 'font-bold after:absolute after:left-0 after:bottom-[-6px] after:w-full after:h-[2px] after:bg-white'
                    : 'hover:opacity-80'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2 bg-white text-red-800 px-4 py-2 rounded-md hover:bg-gray-200 transition"
          >
            <FaFilter />
            Filter
          </button>
        </div>

        {/* Filter Box */}
        {showFilter && (
          <div className="bg-white mt-4 rounded-xl shadow p-4 grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-500 ease-in-out animate-fade-in-down">
            <input
              type="text"
              placeholder="Cari berdasarkan skema"
              value={filterSkema}
              onChange={(e) => setFilterSkema(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <select
              value={filterTanggal}
              onChange={(e) => setFilterTanggal(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <option value="">Pilih Tanggal</option>
              {uniqueDates.map((date, index) => (
                <option key={index} value={date}>
                  {date}
                </option>
              ))}
            </select>
            <select
              value={filterTUK}
              onChange={(e) => setFilterTUK(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <option value="">Pilih TUK</option>
              {uniqueTUKs.map((tuk, index) => (
                <option key={index} value={tuk}>
                  {tuk}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Jadwal Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredJadwal.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl border border-gray-200 flex flex-col justify-between min-h-[380px] transition duration-300 relative group"
            >
              <div className="absolute inset-0 rounded-2xl border-[2px] border-transparent group-hover:border-[#8D0000] transition-all duration-300 pointer-events-none" />
              <div>
                <h3 className="text-2xl font-bold text-red-900">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.subtitle}</p>
                <button className="mt-2 mb-4 bg-white border-2 border-red-500 text-red-700 text-sm px-4 py-1 rounded-full hover:bg-red-100">
                  {item.skema}
                </button>

                <div className="flex justify-between items-center mt-4 gap-2 flex-wrap">
                  <div className="flex flex-col text-sm text-red-800 space-y-2">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock />
                      <span>{item.time}</span>
                    </div>
                  </div>

                  <Image
                    src="/img/books.png"
                    alt="Books"
                    width={128}
                    height={128}
                    className="w-24 md:w-28 lg:w-32 object-contain"
                    loading="lazy"
                    sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 128px"
                  />
                </div>
              </div>
              <button
                onClick={() => router.push('/Asesor/jadwal/detail')}
                className="mt-6 w-full bg-red-800 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
              >
                Detail
              </button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Jadwal;