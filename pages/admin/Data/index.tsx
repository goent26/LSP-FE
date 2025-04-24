'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/user/Navbar';
import Footer from '../../../components/user/Footer';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('Peserta');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const itemsPerPage = 10;
  const router = useRouter();

  const pages = [
    {
      name: 'Peserta',
      searchPlaceholder: 'Cari Peserta',
      addButtonLabel: 'Tambah Peserta',
      tableHeaders: ['No', 'Email', 'Nama Peserta', 'NIK', 'Skema', 'Aksi'],
      tableRows: Array.from({ length: 12 }, (_, i) => ({
        columns: [
          `${i + 1}`,
          `peserta${i + 1}@example.com`,
          `Peserta ${i + 1}`,
          `12345678901234${i}`,
          'Web Developer',
        ],
        actions: ['edit', 'delete'],
      })),
    },
    {
      name: 'Asesor',
      searchPlaceholder: 'Cari Asesor',
      addButtonLabel: 'Tambah Asesor',
      tableHeaders: [
        'No',
        'Email',
        'Nama Asesor',
        'No. Registrasi',
        'Asal Sekolah',
        'Kompetensi',
        'Masa Berlaku',
        'Aksi',
      ],
      tableRows: Array.from({ length: 11 }, (_, i) => ({
        columns: [
          `${i + 1}`,
          `asesor${i + 1}@example.com`,
          `Asesor ${i + 1}`,
          `REG${i + 1}`,
          'SMK 1',
          'Web Development',
          '2025-12-31',
        ],
        actions: ['edit', 'delete'],
      })),
    },
    {
      name: 'Skema',
      searchPlaceholder: 'Cari Skema',
      addButtonLabel: 'Tambah Skema',
      tableHeaders: ['No', 'Judul Skema', 'Jenis', 'Aksi'],
      tableRows: [
        {
          columns: ['1', 'Web Developer', 'Klaster'],
          actions: ['edit', 'copy', 'delete'],
        },
      ],
    },
    {
      name: 'TUK',
      searchPlaceholder: 'Cari TUK',
      addButtonLabel: 'Tambah TUK',
      tableHeaders: ['No', 'Judul Skema', 'Jenis', 'Nama TUK', 'Alamat', 'Aksi'],
      tableRows: [
        {
          columns: ['1', 'Web Developer', 'Klaster', 'Lab DKV', 'Jl. Contoh 123'],
          actions: ['edit', 'delete'],
        },
      ],
    },
    {
      name: 'MUK',
      searchPlaceholder: 'Cari MUK',
      addButtonLabel: 'Tambah MUK',
      tableHeaders: ['No', 'Nama File', 'Aksi'],
      tableRows: [
        {
          columns: ['1', 'MUK_2025.pdf'],
          actions: ['edit', 'download', 'delete'],
        },
      ],
    },
  ];

  const currentPageData = pages.find((page) => page.name === activeTab) || pages[0];

  // Include original index in filteredRows
  const filteredRows = currentPageData.tableRows
    .map((row, index) => ({ ...row, originalIndex: index }))
    .filter((row) => {
      const query = searchQuery.toLowerCase();
      switch (activeTab) {
        case 'Peserta':
          return row.columns[2].toLowerCase().includes(query);
        case 'Asesor':
          return row.columns[2].toLowerCase().includes(query);
        case 'Skema':
          return row.columns[1].toLowerCase().includes(query);
        case 'TUK':
          return (
            row.columns[1].toLowerCase().includes(query) ||
            row.columns[3].toLowerCase().includes(query)
          );
        case 'MUK':
          return row.columns[1].toLowerCase().includes(query);
        default:
          return true;
      }
    });

  const totalItems = filteredRows.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedRows = filteredRows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const showPagination = totalItems >= 10;

  const Modal = () => {
    const closeModal = () => {
      setShowModal(false);
      setSelectedRowIndex(null); // Reset index on close
    };

    // Safety check for selectedRowIndex
    const getRowData = (columnIndex: number) => {
      if (
        selectedRowIndex === null ||
        selectedRowIndex >= currentPageData.tableRows.length
      ) {
        return '';
      }
      return currentPageData.tableRows[selectedRowIndex].columns[columnIndex] || '';
    };

    switch (modalType) {
      case 'tambahPeserta':
        return (
          <div className="fixed inset-0 bg-gray-700/75 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="w-full max-w-3xl sm:max-w-4xl rounded-xl bg-white font-['Inter'] shadow-2xl transform transition-all duration-300">
              <div className="bg-[#8B0B0B] px-6 py-5 flex justify-between items-center rounded-t-xl">
                <div>
                  <h1 className="text-white font-semibold text-lg tracking-widest">
                    Tambah Peserta
                  </h1>
                  <p className="text-white text-xs mt-1 font-normal">
                    Isi informasi dibawah untuk menambahkan peserta
                  </p>
                </div>
                <button
                  aria-label="Close modal"
                  onClick={closeModal}
                  className="text-white text-2xl font-bold focus:outline-none hover:text-gray-200"
                >
                  ×
                </button>
              </div>
              <form className="px-6 py-6 space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-900 font-semibold text-sm mb-1 tracking-wide"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-400 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B0B0B] transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-gray-900 font-semibold text-sm mb-1 tracking-wide"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-400 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B0B0B] transition"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    id="see-password"
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                    className="w-4 h-4 border border-gray-300 rounded text-[#8B0B0B] focus:ring-[#8B0B0B]"
                  />
                  <label
                    htmlFor="see-password"
                    className="ml-2 text-gray-500 text-xs select-none"
                  >
                    See Password
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="nama-peserta"
                    className="block text-gray-900 font-semibold text-sm mb-1 tracking-wide"
                  >
                    Nama Peserta
                  </label>
                  <input
                    id="nama-peserta"
                    type="text"
                    placeholder="Nama Lengkap"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-400 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B0B0B] transition"
                  />
                </div>
              </form>
              <div className="bg-gray-100 px-6 py-5 rounded-b-xl flex justify-end">
                <button
                  type="submit"
                  onClick={closeModal}
                  className="bg-[#8B0B0B] text-white text-sm font-semibold tracking-widest rounded-full px-8 py-2 focus:outline-none hover:bg-[#7a0a0a] transition transform hover:scale-105"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        );

      case 'editPeserta':
        return (
          <div className="fixed inset-0 bg-gray-700/75 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="w-full max-w-3xl sm:max-w-4xl rounded-xl bg-white font-['Inter'] shadow-2xl transform transition-all duration-300">
              <div className="bg-[#8B0B0B] px-6 py-4 rounded-t-xl flex justify-between items-center">
                <div>
                  <h1 className="text-white font-semibold text-lg tracking-wide">
                    Edit Peserta
                  </h1>
                  <p className="text-[#F0E9E9] text-xs mt-1">
                    Isi informasi dibawah untuk mengedit peserta
                  </p>
                </div>
                <button
                  aria-label="Close"
                  onClick={closeModal}
                  className="text-white text-2xl font-bold focus:outline-none hover:text-gray-200"
                >
                  ×
                </button>
              </div>
              <form className="px-6 py-8 space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold mb-1 tracking-wide text-gray-900"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    defaultValue={getRowData(1)}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B0B0B] transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold mb-1 tracking-wide text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    className="w-full border border-gray-300 rounded-md px-4 py-3 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B0B0B] transition"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    id="show-password"
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                    className="w-4 h-4 text-[#8B0B0B] border-gray-300 rounded focus:ring-[#8B0B0B]"
                  />
                  <label
                    htmlFor="show-password"
                    className="ml-2 text-xs text-gray-400 select-none"
                  >
                    See Password
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="nama-peserta"
                    className="block text-sm font-semibold mb-1 tracking-wide text-gray-900"
                  >
                    Nama Peserta
                  </label>
                  <input
                    id="nama-peserta"
                    type="text"
                    placeholder="Nama Lengkap"
                    defaultValue={getRowData(2)}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B0B0B] transition"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    onClick={closeModal}
                    className="bg-[#8B0B0B] text-white text-sm font-semibold rounded-full px-6 py-2 hover:bg-[#6e0808] transition transform hover:scale-105"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
        );

      case 'deletePeserta':
      case 'deleteAsesor':
      case 'deleteSkema':
      case 'deleteTUK':
      case 'deleteMUK':
        return (
          <div className="fixed inset-0 bg-gray-400/75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center space-y-6 transform transition-all duration-300">
              <div className="flex justify-center">
                <div className="w-20 h-20 border-[6px] border-red-800 rounded-full flex items-center justify-center">
                  <div className="text-red-800 text-5xl font-bold">!</div>
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                Yakin ingin dihapus?
              </h2>
              <p className="text-gray-600">
                Perhatikan kembali data yang akan Anda hapus
              </p>
              <div className="flex justify-center gap-6 mt-6">
                <button
                  onClick={closeModal}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-6 py-2 rounded-md transition transform hover:scale-105"
                >
                  Batal
                </button>
                <button
                  onClick={closeModal}
                  className="bg-red-800 hover:bg-red-900 text-white font-semibold px-6 py-2 rounded-md transition transform hover:scale-105"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        );

      case 'tambahAsesor':
        return (
          <div className="fixed inset-0 bg-gray-400/75 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="w-full max-w-lg rounded-xl bg-white font-['Inter'] shadow-2xl transform transition-all duration-300">
              <div className="bg-[#8B0B0B] px-6 py-4 rounded-t-xl relative">
                <h1 className="text-white font-semibold text-lg tracking-widest">
                  Tambah Asesor
                </h1>
                <p className="text-[#F0E9E9] text-[10px] mt-1">
                  Isi informasi dibawah untuk menambahkan asesor
                </p>
                <button
                  aria-label="Close"
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-white text-xl font-bold focus:outline-none hover:text-gray-200"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <form className="px-6 py-6 space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[11px] font-semibold mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    className="w-full border border-gray-300 rounded-md text-[11px] placeholder:text-[11px] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B0B0B] transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-[11px] font-semibold mb-1"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    className="w-full border border-gray-300 rounded-md text-[11px] placeholder:text-[11px] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B0B0B] transition"
                  />
                  <div className="mt-1 flex items-center text-[10px] text-gray-700">
                    <input
                      id="see-password"
                      type="checkbox"
                      checked={showPassword}
                      onChange={() => setShowPassword(!showPassword)}
                      className="mr-1 w-3 h-3 border border-gray-300 rounded-sm"
                    />
                    <label htmlFor="see-password" className="select-none">
                      See Password
                    </label>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="nomor-registrasi"
                    className="block text-[11px] font-semibold mb-1"
                  >
                    Nomor Registrasi
                  </label>
                  <input
                    id="nomor-registrasi"
                    type="text"
                    placeholder="Nomor Registrasi"
                    className="w-full border border-gray-300 rounded-md text-[11px] placeholder:text-[11px] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B0B0B] transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="nama-asesor"
                    className="block text-[11px] font-semibold mb-1"
                  >
                    Nama Asesor
                  </label>
                  <input
                    id="nama-asesor"
                    type="text"
                    placeholder="Nama Lengkap"
                    className="w-full border border-gray-300 rounded-md text-[11px] placeholder:text-[11px] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B0B0B] transition"
                  />
                </div>
              </form>
              <div className="bg-[#F0F0F0] px-6 py-4 rounded-b-xl flex justify-end">
                <button
                  type="submit"
                  onClick={closeModal}
                  className="bg-[#8B0B0B] text-white text-[11px] font-semibold tracking-widest rounded-full px-6 py-2 hover:bg-[#6e0808] focus:outline-none transition transform hover:scale-105"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        );

      case 'editAsesor':
        return (
          <div className="fixed inset-0 bg-white/75 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div
              className="w-full max-w-4xl rounded-2xl bg-white border border-gray-300 font-['Inter'] shadow-2xl transform transition-all duration-300"
              style={{ maxHeight: '90vh' }}
            >
              <div className="bg-[#8B0008] flex justify-between items-center px-8 py-5 rounded-t-2xl">
                <div>
                  <h1 className="text-white font-semibold text-lg tracking-[0.05em]">
                    Edit Asesor
                  </h1>
                  <p className="text-white text-xs font-normal tracking-tight mt-1">
                    Isi informasi dibawah untuk mengedit asesor
                  </p>
                </div>
                <button
                  aria-label="Close"
                  onClick={closeModal}
                  className="text-white text-3xl font-bold hover:text-gray-200"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <form
                className="bg-white px-8 py-6 flex flex-col gap-6 overflow-y-auto"
                style={{ maxHeight: '60vh' }}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-900 font-semibold text-sm mb-1 tracking-[0.05em]"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    defaultValue={getRowData(1)}
                    className="w-full border border-gray-400 rounded-md px-4 py-3 placeholder-gray-400 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#8B0008] transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-gray-900 font-semibold text-sm mb-1 tracking-[0.05em]"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    className="w-full border border-gray-400 rounded-md px-4 py-3 placeholder-gray-400 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#8B0008] transition"
                  />
                  <div className="flex items-center mt-2 space-x-2">
                    <input
                      id="see-password"
                      type="checkbox"
                      checked={showPassword}
                      onChange={() => setShowPassword(!showPassword)}
                      className="w-4 h-4 border border-gray-400 rounded-sm focus:ring-2 focus:ring-[#8B0008]"
                    />
                    <label
                      htmlFor="see-password"
                      className="text-gray-500 text-xs font-mono select-none"
                    >
                      See Password
                    </label>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="nomor-registrasi"
                    className="block text-gray-900 font-semibold text-sm mb-1 tracking-[0.05em]"
                  >
                    Nomor Registrasi
                  </label>
                  <input
                    id="nomor-registrasi"
                    type="text"
                    placeholder="Nomor Registrasi"
                    defaultValue={getRowData(3)}
                    className="w-full border border-gray-400 rounded-md px-4 py-3 placeholder-gray-400 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#8B0008] transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="nama-asesor"
                    className="block text-gray-900 font-semibold text-sm mb-1 tracking-[0.05em]"
                  >
                    Nama Asesor
                  </label>
                  <input
                    id="nama-asesor"
                    type="text"
                    placeholder="Nama Lengkap"
                    defaultValue={getRowData(2)}
                    className="w-full border border-gray-400 rounded-md px-4 py-3 placeholder-gray-400 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#8B0008] transition"
                  />
                </div>
              </form>
              <div className="bg-gray-200 px-8 py-6 flex justify-end rounded-b-2xl">
                <button
                  type="submit"
                  onClick={closeModal}
                  className="bg-[#8B0008] text-white font-semibold text-sm px-8 py-3 rounded-full hover:bg-[#6a0005] transition transform hover:scale-105"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        );

      case 'tambahSkema':
        return (
          <div className="fixed inset-0 bg-[#F8F8F8]/75 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="w-full max-w-4xl rounded-2xl bg-white font-['Inter'] shadow-2xl transform transition-all duration-300">
              <header className="bg-[#8B0007] flex justify-between items-center px-6 py-5 rounded-t-2xl">
                <div>
                  <h1 className="text-white font-bold text-lg tracking-widest leading-6">
                    Tambah Skema Kompetensi
                  </h1>
                  <p className="text-white text-xs font-normal tracking-wide leading-4 mt-1">
                    Isi informasi dibawah untuk membuat Daftar Skema Kompetensi
                  </p>
                </div>
                <button
                  aria-label="Close"
                  onClick={closeModal}
                  className="text-white text-2xl font-bold focus:outline-none hover:text-gray-200"
                >
                  <i className="fas fa-times"></i>
                </button>
              </header>
              <main className="px-6 py-8">
                <form className="space-y-8 max-w-3xl mx-auto">
                  <div>
                    <label
                      htmlFor="judul-skema"
                      className="block text-black font-semibold text-sm tracking-widest mb-2"
                    >
                      Skema Sertifikasi
                    </label>
                    <input
                      id="judul-skema"
                      type="text"
                      placeholder="Judul Skema"
                      className="w-full border border-gray-400 rounded-md px-4 py-3 placeholder-gray-400 text-sm tracking-widest font-normal focus:outline-none focus:ring-2 focus:ring-[#8B0007] transition"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="jenis-skema"
                      className="block text-black font-semibold text-sm tracking-widest mb-2"
                    >
                      Jenis
                    </label>
                    <div className="relative">
                      <select
                        id="jenis-skema"
                        className="w-full border border-gray-400 rounded-md px-4 py-3 text-sm font-normal appearance-none focus:outline-none focus:ring-2 focus:ring-[#8B0007] transition"
                      >
                        <option disabled selected hidden>
                          Jenis Skema
                        </option>
                        <option>KKNI</option>
                        <option>Okupasi</option>
                        <option>Klaster</option>
                      </select>
                      <i
                        className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
                        aria-hidden="true"
                      ></i>
                    </div>
                  </div>
                </form>
              </main>
              <footer className="bg-[#F8F8F8] px-6 py-6 rounded-b-2xl flex justify-end">
                <button
                  type="submit"
                  onClick={closeModal}
                  className="bg-[#8B0007] text-white font-semibold text-sm tracking-widest rounded-full px-10 py-3 hover:bg-[#6a0003] focus:outline-none transition transform hover:scale-105"
                >
                  Simpan
                </button>
              </footer>
            </div>
          </div>
        );

      case 'editSkema':
        return (
          <div className="fixed inset-0 bg-[#f7f7f7]/75 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="w-full max-w-4xl rounded-2xl bg-white font-['Inter'] shadow-2xl transform transition-all duration-300">
              <header className="bg-[#8b0000] flex justify-between items-center px-8 py-5 rounded-t-2xl">
                <div>
                  <h1 className="text-white font-semibold text-lg tracking-widest">
                    Edit Skema Kompetensi
                  </h1>
                  <p className="text-white text-xs font-light tracking-wide mt-1">
                    Isi informasi dibawah untuk mengedit Daftar Skema Kompetensi
                  </p>
                </div>
                <button
                  aria-label="Close"
                  onClick={closeModal}
                  className="text-white text-3xl font-bold hover:text-gray-200"
                >
                  <i className="fas fa-times"></i>
                </button>
              </header>
              <form className="px-8 py-8 space-y-8">
                <div>
                  <label
                    htmlFor="judul-skema"
                    className="block text-sm font-semibold mb-2 tracking-wide"
                  >
                    Skema Sertifikasi
                  </label>
                  <input
                    id="judul-skema"
                    type="text"
                    placeholder="Judul Skema"
                    defaultValue={getRowData(1)}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#8b0000] transition"
                  />
                </div>
                <div>
                  <label
                    htmlFor="jenis-skema"
                    className="block text-sm font-semibold mb-2 tracking-wide"
                  >
                    Jenis
                  </label>
                  <div className="relative">
                    <select
                      id="jenis-skema"
                      className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#8b0000] transition"
                    >
                      <option disabled selected hidden>
                        Jenis Skema
                      </option>
                      <option>KKNI</option>
                      <option>Okupasi</option>
                      <option>Klaster</option>
                    </select>
                    <i
                      className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                    ></i>
                  </div>
                </div>
              </form>
              <footer className="bg-[#f7f7f7] px-8 py-6 rounded-b-2xl flex justify-end">
                <button
                  type="submit"
                  onClick={closeModal}
                  className="bg-[#8b0000] text-white font-semibold text-sm tracking-widest rounded-full px-8 py-3 hover:bg-[#6a0000] transition transform hover:scale-105"
                >
                  Simpan
                </button>
              </footer>
            </div>
          </div>
        );

      case 'tambahTUK':
        return (
          <div className="fixed inset-0 bg-white/75 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="w-full max-w-4xl rounded-2xl bg-white font-['Inter'] shadow-2xl transform transition-all duration-300">
              <header className="bg-[#8B0000] px-8 py-6 rounded-t-2xl flex justify-between items-center">
                <div>
                  <h1 className="text-white font-bold text-lg tracking-[0.1em] leading-tight">
                    Buat Tempat Ujian Kompetensi
                  </h1>
                  <p className="text-white text-xs font-normal mt-1 leading-tight">
                    Isi informasi dibawah untuk membuat TUK
                  </p>
                </div>
                <button
                  aria-label="Close"
                  onClick={closeModal}
                  className="text-white text-2xl font-bold focus:outline-none hover:text-gray-200"
                >
                  <i className="fas fa-times"></i>
                </button>
              </header>
              <form className="px-8 sm:px-14 pt-8 pb-0">
                <div className="mb-6">
                  <label
                    htmlFor="nama"
                    className="block text-black font-semibold text-sm mb-2 tracking-wide"
                  >
                    Nama
                  </label>
                  <input
                    id="nama"
                    type="text"
                    placeholder="Nama TUK"
                    className="w-full border border-gray-400 rounded-md py-3 px-4 text-gray-400 placeholder-gray-400 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="judul-skema"
                    className="block text-black font-semibold text-sm mb-2 tracking-wide"
                  >
                    Judul Skema
                  </label>
                  <input
                    id="judul-skema"
                    type="text"
                    placeholder="Judul Skema"
                    className="w-full border border-gray-400 rounded-md py-3 px-4 text-gray-400 placeholder-gray-400 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="alamat"
                    className="block text-black font-semibold text-sm mb-2 tracking-wide"
                  >
                    Alamat
                  </label>
                  <input
                    id="alamat"
                    type="text"
                    placeholder="Alamat TUK"
                    className="w-full border border-gray-400 rounded-md py-3 px-4 text-gray-400 placeholder-gray-400 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-6 mb-6">
                  <div className="flex-1">
                    <label
                      htmlFor="kode"
                      className="block text-black font-semibold text-sm mb-2 tracking-wide"
                    >
                      Kode
                    </label>
                    <input
                      id="kode"
                      type="text"
                      placeholder="Kode"
                      className="w-full border border-gray-400 rounded-md py-3 px-4 text-gray-400 placeholder-gray-400 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                    />
                  </div>
                  <div className="flex-1 relative">
                    <label
                      htmlFor="jenis"
                      className="block text-black font-semibold text-sm mb-2 tracking-wide"
                    >
                      Jenis
                    </label>
                    <select
                      id="jenis"
                      className="w-full border border-gray-400 rounded-md py-3 px-4 text-gray-400 text-sm font-normal appearance-none focus:outline-none focus:ring-2 focus:ring-[#8B0000] transition"
                    >
                      <option disabled selected hidden>
                        Jenis
                      </option>
                      <option>Sewaktu</option>
                      <option>Tetap</option>
                      <option>Mandiri</option>
                    </select>
                    <i
                      className="fas fa-chevron-down absolute right-4 top-[38px] text-gray-500 pointer-events-none"
                      aria-hidden="true"
                    ></i>
                  </div>
                </div>
              </form>
              <footer className="bg-[#F7F7F7] px-8 sm:px-14 py-6 rounded-b-2xl flex justify-end">
                <button
                  type="submit"
                  onClick={closeModal}
                  className="bg-[#8B0000] text-white font-semibold text-sm tracking-[0.1em] rounded-full px-10 py-3 focus:outline-none transition transform hover:scale-105"
                >
                  Simpan
                </button>
              </footer>
            </div>
          </div>
        );

      case 'editTUK':
        return (
          <div className="fixed inset-0 bg-white/75 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="w-full max-w-4xl rounded-2xl bg-white font-['Inter'] shadow-2xl transform transition-all duration-300">
              <header className="bg-[#8B000A] px-8 py-6 rounded-t-2xl">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-white font-semibold text-lg tracking-[0.1em]">
                      Edit Tempat Ujian Kompetensi
                    </h1>
                    <p className="text-white text-xs mt-1 font-normal">
                      Isi informasi dibawah untuk membuat TUK
                    </p>
                  </div>
                  <button
                    aria-label="Close"
                    onClick={closeModal}
                    className="text-white text-2xl font-bold focus:outline-none hover:text-gray-200"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </header>
              <form className="px-8 pt-8 pb-8">
                <div className="mb-6">
                  <label
                    htmlFor="nama"
                    className="block text-black font-semibold text-sm mb-2 tracking-[0.05em]"
                  >
                    Nama
                  </label>
                  <input
                    id="nama"
                    type="text"
                    placeholder="Nama TUK"
                    defaultValue={getRowData(3)}
                    className="w-full border border-gray-300 rounded-md py-3 px-4 text-gray-400 placeholder-gray-400 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#8B000A] transition"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="judul-skema"
                    className="block text-black font-semibold text-sm mb-2 tracking-[0.05em]"
                  >
                    Judul Skema
                  </label>
                  <input
                    id="judul-skema"
                    type="text"
                    placeholder="Judul Skema"
                    defaultValue={getRowData(1)}
                    className="w-full border border-gray-300 rounded-md py-3 px-4 text-gray-400 placeholder-gray-400 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#8B000A] transition"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="alamat"
                    className="block text-black font-semibold text-sm mb-2 tracking-[0.05em]"
                  >
                    Alamat
                  </label>
                  <input
                    id="alamat"
                    type="text"
                    placeholder="Alamat TUK"
                    defaultValue={getRowData(4)}
                    className="w-full border border-gray-300 rounded-md py-3 px-4 text-gray-400 placeholder-gray-400 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#8B000A] transition"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-6 mb-6">
                  <div className="flex-1">
                    <label
                      htmlFor="kode"
                      className="block text-black font-semibold text-sm mb-2 tracking-[0.05em]"
                    >
                      Kode
                    </label>
                    <input
                      id="kode"
                      type="text"
                      placeholder="Kode"
                      className="w-full border border-gray-300 rounded-md py-3 px-4 text-gray-400 placeholder-gray-400 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#8B000A] transition"
                    />
                  </div>
                  <div className="flex-1 relative">
                    <label
                      htmlFor="jenis"
                      className="block text-black font-semibold text-sm mb-2 tracking-[0.05em]"
                    >
                      Jenis
                    </label>
                    <select
                      id="jenis"
                      className="w-full border border-gray-300 rounded-md py-3 px-4 text-gray-400 text-sm font-mono appearance-none focus:outline-none focus:ring-2 focus:ring-[#8B000A] transition"
                    >
                      <option disabled selected hidden></option>
                      <option>Sewaktu</option>
                      <option>Tetap</option>
                      <option>Mandiri</option>
                    </select>
                    <i
                      className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                    ></i>
                  </div>
                </div>
              </form>
              <footer className="bg-[#F5F5F5] px-8 py-6 rounded-b-2xl flex justify-end">
                <button
                  type="submit"
                  onClick={closeModal}
                  className="bg-[#8B000A] text-white font-semibold text-sm tracking-[0.1em] rounded-full px-10 py-3 transition transform hover:scale-105"
                >
                  Simpan
                </button>
              </footer>
            </div>
          </div>
        );

      case 'tambahMUK':
        return (
          <div className="fixed inset-0 bg-[#f7f7f7]/75 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="w-full max-w-4xl rounded-2xl bg-white font-['Inter'] shadow-2xl transform transition-all duration-300">
              <header className="bg-[#8a0000] px-6 py-5 flex justify-between items-center rounded-t-2xl">
                <div>
                  <h1 className="text-white font-bold text-lg tracking-wide">
                    Tambah MUK
                  </h1>
                  <p className="text-white text-[10px] font-normal mt-1 tracking-wide">
                    Isi informasi dibawah untuk menambahkan materi ujian kompetensi
                  </p>
                </div>
                <button
                  aria-label="Close"
                  onClick={closeModal}
                  className="text-white text-3xl font-extrabold focus:outline-none hover:text-gray-200"
                >
                  <i className="fas fa-times"></i>
                </button>
              </header>
              <form className="px-6 py-8 space-y-8">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="nama-file"
                    className="font-semibold text-sm tracking-wide text-black"
                  >
                    Nama File
                  </label>
                  <input
                    id="nama-file"
                    type="text"
                    placeholder="Nama File"
                    className="border border-gray-400 rounded-md px-4 py-3 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#8a0000] transition"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="upload-file"
                    className="font-semibold text-sm tracking-wide text-black"
                  >
                    Upload File
                  </label>
                  <label
                    htmlFor="upload-file"
                    className="flex flex-col justify-center items-center border border-gray-400 rounded-md cursor-pointer h-28 text-[#8a0000] text-lg font-semibold tracking-wide select-none hover:bg-gray-50 transition"
                  >
                    <i className="fas fa-cloud-upload-alt text-4xl mb-1"></i>
                    Klik untuk mengunggah file
                    <input
                      id="upload-file"
                      type="file"
                      className="hidden"
                      aria-label="Upload file"
                    />
                  </label>
                </div>
              </form>
              <footer className="bg-[#f7f7f7] px-6 py-6 flex justify-end rounded-b-2xl">
                <button
                  type="submit"
                  onClick={closeModal}
                  className="bg-[#8a0000] text-white font-semibold text-sm tracking-wide rounded-full px-8 py-3 min-w-[140px] hover:bg-[#a10000] transition transform hover:scale-105"
                >
                  Simpan
                </button>
              </footer>
            </div>
          </div>
        );

      case 'editMUK':
        return (
          <div className="fixed inset-0 bg-[#f7f7f7]/75 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="w-full max-w-4xl rounded-2xl bg-white font-['Inter'] shadow-2xl transform transition-all duration-300">
              <header className="bg-[#8a0000] px-6 py-5 flex justify-between items-center rounded-t-2xl">
                <div>
                  <h1 className="text-white font-bold text-lg tracking-wide">
                    Edit MUK
                  </h1>
                  <p className="text-white text-[10px] font-normal mt-1 tracking-wide">
                    Isi informasi dibawah untuk mengedit materi ujian kompetensi
                  </p>
                </div>
                <button
                  aria-label="Close"
                  onClick={closeModal}
                  className="text-white text-3xl font-extrabold focus:outline-none hover:text-gray-200"
                >
                  <i className="fas fa-times"></i>
                </button>
              </header>
              <form className="px-6 py-8 space-y-8">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="nama-file"
                    className="font-semibold text-sm tracking-wide text-black"
                  >
                    Nama File
                  </label>
                  <input
                    id="nama-file"
                    type="text"
                    placeholder="Nama File"
                    defaultValue={getRowData(1)}
                    className="border border-gray-400 rounded-md px-4 py-3 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#8a0000] transition"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="upload-file"
                    className="font-semibold text-sm tracking-wide text-black"
                  >
                    Upload File
                  </label>
                  <label
                    htmlFor="upload-file"
                    className="flex flex-col justify-center items-center border border-gray-400 rounded-md cursor-pointer h-28 text-[#8a0000] text-lg font-semibold tracking-wide select-none hover:bg-gray-50 transition"
                  >
                    <i className="fas fa-cloud-upload-alt text-4xl mb-1"></i>
                    Klik untuk mengunggah file
                    <input
                      id="upload-file"
                      type="file"
                      className="hidden"
                      aria-label="Upload file"
                    />
                  </label>
                </div>
              </form>
              <footer className="bg-[#f7f7f7] px-6 py-6 flex justify-end rounded-b-2xl">
                <button
                  type="submit"
                  onClick={closeModal}
                  className="bg-[#8a0000] text-white font-semibold text-sm tracking-wide rounded-full px-8 py-3 min-w-[140px] hover:bg-[#a10000] transition transform hover:scale-105"
                >
                  Simpan
                </button>
              </footer>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen font-poppins bg-white">
      <Navbar />
      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          height: 6px;
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: #b91c1c;
          border-radius: 10px;
        }
        nav.navbar {
          background-color: #8B0B0B !important;
          position: sticky;
          top: 0;
          z-index: 20;
          transition: none !important;
          opacity: 1 !important;
        }
        nav.navbar button {
          background-color: transparent !important;
          color: white !important;
          transition: none !important;
          opacity: 1 !important;
        }
        nav.navbar button:hover,
        nav.navbar button:focus {
          background-color: transparent !important;
          color: white !important;
          outline: none !important;
        }
      `}</style>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
      `}</style>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Navigation */}
        <nav className="navbar bg-[#8B0B0B] rounded-lg flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2 px-4 sm:px-6 py-4 text-white text-sm font-semibold select-none">
          {pages.map((page) => (
            <button
              key={page.name}
              onClick={() => {
                setActiveTab(page.name);
                setCurrentPage(1);
                setSearchQuery('');
              }}
              className={`focus:outline-none pb-1 transition-all duration-200 ${
                activeTab === page.name
                  ? 'border-b-2 border-white'
                  : 'hover:text-gray-200'
              }`}
            >
              {page.name}
            </button>
          ))}
        </nav>

        {/* Search and Add Button */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex flex-1 items-center gap-3">
            <div className="flex-1 border border-gray-300 rounded-md shadow-sm">
              <input
                type="text"
                placeholder={currentPageData.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-2 text-xs sm:text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B0B0B] rounded-md transition"
              />
            </div>
            <button
              aria-label="Search"
              className="border border-gray-300 rounded-md p-2 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#8B0B0B] transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 sm:w-5 sm:h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </div>
          <button
            onClick={() => {
              setModalType(`tambah${activeTab}`);
              setShowModal(true);
              setShowPassword(false);
            }}
            className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 text-xs sm:text-sm font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#8B0B0B] transition transform hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 sm:w-5 sm:h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <span>{currentPageData.addButtonLabel}</span>
          </button>
        </div>

        {/* Table */}
        <div className="mt-6 border border-gray-200 rounded-lg overflow-x-auto scrollbar-thin shadow-lg">
          <table className="w-full text-[10px] sm:text-xs border-collapse min-w-[600px]">
            <thead className="bg-gray-100 text-gray-700 font-semibold border-t border-gray-300">
              <tr>
                {currentPageData.tableHeaders.map((header, index) => (
                  <th
                    key={index}
                    className={`px-2 sm:px-4 py-2 text-center whitespace-nowrap ${
                      index === 0
                        ? 'border-none w-10 sm:w-12'
                        : `border-x border-gray-300 ${
                            header === 'Aksi' ? 'w-16 sm:w-20' : ''
                          }`
                    }`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedRows.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50 transition">
                  {row.columns.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="px-2 sm:px-4 py-2 border-none text-center whitespace-nowrap"
                    >
                      {cell}
                    </td>
                  ))}
                  <td className="border-none px-2 sm:px-4 py-2 flex justify-center gap-1 sm:gap-2">
                    {row.actions.map((action, actionIndex) => (
                      <button
                        key={actionIndex}
                        aria-label={
                          action.charAt(0).toUpperCase() + action.slice(1)
                        }
                        onClick={() => {
                          if (action === 'copy' && activeTab === 'Skema') {
                            router.push('/admin/Data/Unit-Skema');
                          } else {
                            setModalType(
                              action === 'edit'
                                ? `edit${activeTab}`
                                : action === 'delete'
                                ? `delete${activeTab}`
                                : action
                            );
                            if (action === 'edit' || action === 'delete') {
                              setSelectedRowIndex(row.originalIndex);
                            }
                            setShowModal(true);
                            setShowPassword(false);
                          }
                        }}
                        className={`p-1 sm:p-2 rounded text-white transition transform hover:scale-110 ${
                          action === 'edit'
                            ? 'bg-yellow-400 hover:bg-yellow-500'
                            : action === 'delete'
                            ? 'bg-[#8B0B0B] hover:bg-[#6e0808]'
                            : action === 'copy'
                            ? 'bg-green-700 hover:bg-green-800'
                            : 'bg-green-700 hover:bg-green-800'
                        }`}
                      >
                        {action === 'edit' ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4 sm:w-5 sm:h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.958.8.8-2.957a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                            />
                          </svg>
                        ) : action === 'delete' ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4 sm:w-5 sm:h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        ) : action === 'copy' ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4 sm:w-5 sm:h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75m9.75-3.375v10.5c0 .621-.504 1.125-1.125 1.125H6.75a1.125 1.125 0 0 1-1.125-1.125v-1.5m10.5 0H6.75m9.75 0a1.125 1.125 0 0 1 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-1.5m-9.75-10.5h9.75"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4 sm:w-5 sm:h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                            />
                          </svg>
                        )}
                      </button>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {showPagination && (
          <div className="mt-6 flex justify-center gap-2 text-xs font-semibold select-none">
            <button
              aria-label="Previous"
              className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#8B0B0B] transition"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            {[1, 2, 3].slice(0, totalPages).map((pageNum) => (
              <button
                key={pageNum}
                aria-current={currentPage === pageNum ? 'page' : undefined}
                className={`border border-gray-300 rounded px-3 py-1 transition ${
                  currentPage === pageNum
                    ? 'text-[#8B0B0B] bg-white'
                    : 'hover:bg-gray-100'
                } focus:outline-none focus:ring-2 focus:ring-[#8B0B0B]`}
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </button>
            ))}
            <button
              aria-label="Next"
              className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#8B0B0B] transition"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Modal */}
        {showModal && <Modal />}
      </div>
      <Footer />
    </div>
  );
}