'use client';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaFilter, FaCalendarAlt, FaClock } from 'react-icons/fa';
import Navbar from '../../../components/user/Navbar';
import Footer from '../../../components/user/Footer';

// Define interfaces for type safety
interface JadwalItem {
  id: number;
  title: string;
  subtitle: string;
  skema: string;
  date: string;
  time: string;
  duration: string;
  status: string;
}

interface FormData {
  tanggal: string;
  waktu: string;
  durasi: string;
  tuk: string;
  asesor: string;
  siswa: string;
}

const Jadwal = () => {
  const [activeTab, setActiveTab] = useState('Berlangsung');
  const [showFilter, setShowFilter] = useState(false);
  const [filterSkema, setFilterSkema] = useState('');
  const [filterTanggal, setFilterTanggal] = useState('');
  const [filterTUK, setFilterTUK] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'edit' | 'delete'>('create');
  const [formData, setFormData] = useState<FormData>({
    tanggal: '',
    waktu: '',
    durasi: '',
    tuk: '',
    asesor: '',
    siswa: '',
  });

  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const jadwalData: JadwalItem[] = [
    {
      id: 1,
      title: 'Web Developer',
      subtitle: 'Tempat Uji Kompetensi',
      skema: 'Lab Desain Komunikasi Visual',
      date: 'Rabu 4 April 2025',
      time: '09:00',
      duration: '60',
      status: 'Berlangsung',
    },
    {
      id: 2,
      title: 'Web Developer',
      subtitle: 'Tempat Uji Kompetensi',
      skema: 'Lab Desain Komunikasi Visual',
      date: 'Kamis 10 April 2025',
      time: '10:00',
      duration: '60',
      status: 'Akan Datang',
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

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDateForInput = (dateString: string): string => {
    try {
      const [, day, month, year] = dateString.split(' ');
      const monthMap: { [key: string]: string } = {
        Januari: '01',
        Februari: '02',
        Maret: '03',
        April: '04',
        Mei: '05',
        Juni: '06',
        Juli: '07',
        Agustus: '08',
        September: '09',
        Oktober: '10',
        November: '11',
        Desember: '12',
      };
      return `${year}-${monthMap[month]}-${day.padStart(2, '0')}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  const handleOpenModal = useCallback((type: 'create' | 'edit' | 'delete', jadwal?: JadwalItem) => {
    setModalType(type);
    if (type === 'edit' && jadwal) {
      setFormData({
        tanggal: formatDateForInput(jadwal.date),
        waktu: jadwal.time,
        durasi: jadwal.duration,
        tuk: jadwal.skema,
        asesor: 'Pilih Asesor',
        siswa: 'Pilih Siswa',
      });
    } else if (type === 'create') {
      setFormData({
        tanggal: '',
        waktu: '',
        durasi: '',
        tuk: '',
        asesor: '',
        siswa: '',
      });
    }
    setShowModal(true);
    if (type === 'delete') {
      setDropdownOpen(null);
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setModalType('create');
    setFormData({
      tanggal: '',
      waktu: '',
      durasi: '',
      tuk: '',
      asesor: '',
      siswa: '',
    });
    setDropdownOpen(null);
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const Modal = () => {
    switch (modalType) {
      case 'create':
      case 'edit':
        return (
          <div className="fixed inset-0 bg-gray-700/75 flex items-center justify-center p-4 z-50">
            <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg overflow-hidden font-['Inter']">
              <div className="bg-[#8B0B0B] px-6 py-4 rounded-t-xl relative">
                <h1 className="text-white font-semibold text-lg leading-6">
                  {modalType === 'create' ? 'Buat Jadwal Asesmen' : 'Edit Jadwal Asesmen'}
                </h1>
                <p className="text-[#F0E9E9] text-[10px] mt-1 font-sans">
                  Isi informasi dibawah untuk {modalType === 'create' ? 'membuat' : 'mengedit'} jadwal ujian
                </p>
                <button
                  aria-label="Close"
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 text-white text-xl font-bold leading-none focus:outline-none hover:text-gray-200"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <form className="px-6 py-6 space-y-5">
                <div>
                  <label htmlFor="tanggal" className="block text-[13px] font-semibold text-gray-900 mb-1">
                    Tanggal Pelaksanaan
                  </label>
                  <input
                    id="tanggal"
                    type="date"
                    value={formData.tanggal}
                    onChange={handleFormChange}
                    required
                    className="w-full border border-gray-300 rounded-md text-[12px] placeholder-gray-400 py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#8B0B0B] focus:border-[#8B0B0B]"
                  />
                </div>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label htmlFor="waktu" className="block text-[13px] font-semibold text-gray-900 mb-1">
                      Waktu Dibuka
                    </label>
                    <div className="relative">
                      <input
                        id="waktu"
                        type="time"
                        value={formData.waktu}
                        onChange={handleFormChange}
                        required
                        className="w-full border border-gray-300 rounded-md text-[12px] placeholder-gray-400 py-2 px-3 pr-8 focus:outline-none focus:ring-1 focus:ring-[#8B0B0B] focus:border-[#8B0B0B]"
                      />
                      <i className="far fa-clock absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none"></i>
                    </div>
                  </div>
                  <div className="flex-1">
                    <label htmlFor="durasi" className="block text-[13px] font-semibold text-gray-900 mb-1">
                      Durasi
                    </label>
                    <input
                      id="durasi"
                      type="text"
                      value={formData.durasi}
                      onChange={handleFormChange}
                      placeholder="Masukkan waktu dalam menit"
                      required
                      className="w-full border border-gray-300 rounded-md text-[12px] placeholder-gray-400 py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#8B0B0B] focus:border-[#8B0B0B]"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="tuk" className="block text-[13px] font-semibold text-gray-900 mb-1">
                    TUK
                  </label>
                  <input
                    id="tuk"
                    type="text"
                    value={formData.tuk}
                    onChange={handleFormChange}
                    placeholder="Pilih TUK"
                    required
                    className="w-full border border-gray-300 rounded-md text-[12px] placeholder-gray-400 py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#8B0B0B] focus:border-[#8B0B0B]"
                  />
                </div>
                <div className="flex space-x-4">
                  <div className="flex-1 relative">
                    <label htmlFor="asesor" className="block text-[13px] font-semibold text-gray-900 mb-1">
                      Asesor
                    </label>
                    <select
                      id="asesor"
                      value={formData.asesor}
                      onChange={handleFormChange}
                      required
                      className="w-full border border-gray-300 rounded-md text-[12px] placeholder-gray-400 py-2 px-3 appearance-none focus:outline-none focus:ring-1 focus:ring-[#8B0B0B] focus:border-[#8B0B0B]"
                    >
                      <option value="" disabled>
                        Pilih Asesor
                      </option>
                      <option value="Pilih Asesor">Pilih Asesor</option>
                    </select>
                    <i className="fas fa-chevron-up absolute right-3 top-[34px] text-gray-400 text-xs pointer-events-none"></i>
                  </div>
                  <div className="flex-1 relative">
                    <label htmlFor="siswa" className="block text-[13px] font-semibold text-gray-900 mb-1">
                      Siswa
                    </label>
                    <select
                      id="siswa"
                      value={formData.siswa}
                      onChange={handleFormChange}
                      required
                      className="w-full border border-gray-300 rounded-md text-[12px] placeholder-gray-400 py-2 px-3 appearance-none focus:outline-none focus:ring-1 focus:ring-[#8B0B0B] focus:border-[#8B0B0B]"
                    >
                      <option value="" disabled>
                        Pilih Siswa
                      </option>
                      <option value="Pilih Siswa">Pilih Siswa</option>
                    </select>
                    <i className="fas fa-chevron-up absolute right-3 top-[34px] text-gray-400 text-xs pointer-events-none"></i>
                  </div>
                </div>
              </form>
              <div className="bg-gray-100 px-6 py-4 rounded-b-xl flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-[#8B0B0B] text-white text-[12px] font-semibold px-6 py-2 rounded-full hover:bg-[#7a0a0a] focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#8B0B0B]"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        );

      case 'delete':
        return (
          <div className="fixed inset-0 bg-gray-400/75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center space-y-6 transform transition-all duration-300">
              <div className="flex justify-center">
                <div className="w-20 h-20 border-[6px] border-red-800 rounded-full flex items-center justify-center">
                  <div className="text-red-800 text-5xl font-bold">!</div>
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-900">Yakin ingin dihapus?</h2>
              <p className="text-gray-600">Perhatikan kembali data yang akan Anda hapus</p>
              <div className="flex justify-center gap-6 mt-6">
                <button
                  onClick={handleCloseModal}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-6 py-2 rounded-md transition transform hover:scale-105"
                >
                  Batal
                </button>
                <button
                  onClick={handleCloseModal}
                  className="bg-red-800 hover:bg-red-900 text-white font-semibold px-6 py-2 rounded-md transition transform hover:scale-105"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen font-poppins bg-gray-100 flex flex-col">
      <Navbar />
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
        .animate-fade-in-down {
          animation: fadeInDown 0.5s ease-in-out;
        }
        @keyframes fadeInDown {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <main className="p-4 max-w-7xl mx-auto w-full flex-grow">
        <div className="bg-red-800 text-white px-6 py-4 rounded-t-md rounded-b-md shadow-md flex flex-col gap-4 md:flex-row md:items-center md:justify-between flex-wrap">
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
          <div className="flex gap-3">
            <button
              onClick={() => handleOpenModal('create')}
              className="flex items-center gap-2 bg-white text-red-800 px-4 py-2 rounded-full font-semibold shadow hover:bg-gray-200 transition"
            >
              <span className="text-xl font-bold">+</span> Tambah
            </button>
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center gap-2 bg-white text-red-800 px-4 py-2 rounded-full font-semibold shadow hover:bg-gray-200 transition"
            >
              <FaFilter />
              Filter
            </button>
          </div>
        </div>

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
              {uniqueDates.map((date) => (
                <option key={date} value={date}>
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
              {uniqueTUKs.map((tuk) => (
                <option key={tuk} value={tuk}>
                  {tuk}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredJadwal.map((item) => (
            <div
              key={item.id}
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
                    onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/100?text=Books')}
                  />
                </div>
              </div>
              <div className="absolute top-4 right-4" ref={dropdownRef}>
                <div className="relative">
                  <button
                    className="text-red-800"
                    onClick={() => setDropdownOpen(dropdownOpen === item.id ? null : item.id)}
                  >
                    <span className="text-xl">⋮</span>
                  </button>
                  {dropdownOpen === item.id && (
                    <div className="absolute right-0 w-40 bg-white shadow-lg rounded-lg mt-2 z-10">
                      <button
                        onClick={() => handleOpenModal('edit', item)}
                        className="text-gray-800 px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleOpenModal('delete', item)}
                        className="text-gray-800 px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => router.push('/admin/Jadwal/detail')}
                className="mt-6 w-full bg-red-800 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
              >
                Detail
              </button>
            </div>
          ))}
        </div>
        {showModal && <Modal />}
      </main>
      <Footer />
    </div>
  );
};

export default Jadwal;