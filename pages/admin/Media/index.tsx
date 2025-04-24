'use client';
import { useState } from 'react';
import Navbar from '../../../components/user/Navbar';
import Footer from '../../../components/user/Footer';

export default function Media() {
  const [activeTab, setActiveTab] = useState('Artikel');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);
  const itemsPerPage = 10;


  const pages = [
    {
      name: 'Profil Sekolah',
      addButtonLabel: 'Tambah Profil',
      tableHeaders: ['No', 'Jenis', 'No. SK Lisensi', 'No. Lisensi', 'Nomor Telepon', 'Nomor Fax', 'Aksi'],
      tableRows: [
        {
          columns: ['1', 'Aktif', 'SK12345', 'LIS67890', '021-1234567', '021-7654321'],
          actions: ['edit', 'delete'],
        },
      ],
    },
    {
      name: 'Artikel',
      searchPlaceholder: 'Cari Artikel',
      addButtonLabel: 'Tambah Artikel',
      tableHeaders: ['No', 'Judul Artikel', 'Sub Judul Artikel', 'Isi Artikel', 'Foto', 'Aksi'],
      tableRows: [
        {
          columns: ['1', 'Belajar React', 'Dasar-dasar React', 'Artikel tentang React untuk pemula', 'react.jpg'],
          actions: ['edit', 'delete'],
        },
        {
          columns: ['2', 'Pengenalan Next.js', 'Framework React', 'Mengenal Next.js dan fitur-fiturnya', 'nextjs.jpg'],
          actions: ['edit', 'delete'],
        },
      ],
    },
    {
      name: 'Galeri',
      searchPlaceholder: 'Cari Galeri',
      addButtonLabel: 'Tambah Galeri',
      tableHeaders: ['No', 'Judul Galeri', 'Foto', 'Aksi'],
      tableRows: [
        {
          columns: ['1', 'Hari Olahraga', 'olahraga.jpg'],
          actions: ['edit', 'delete'],
        },
        {
          columns: ['2', 'Wisuda 2024', 'wisuda.jpg'],
          actions: ['edit', 'delete'],
        },
      ],
    },
    {
      name: 'File Pendukung',
      searchPlaceholder: 'Cari File',
      addButtonLabel: 'Tambah File',
      tableHeaders: ['No', 'Nama File', 'Aksi'],
      tableRows: [
        {
          columns: ['1', 'Panduan Siswa.pdf'],
          actions: ['edit', 'delete'],
        },
        {
          columns: ['2', 'Jadwal Pelajaran.xlsx'],
          actions: ['edit', 'delete'],
        },
      ],
    },
  ];

  const currentPageData = pages.find((page) => page.name === activeTab) || pages[1];

  const filteredRows = currentPageData.tableRows.filter((row) => {
    if (activeTab === 'Profil Sekolah') return true;
    const query = searchQuery.toLowerCase();
    switch (activeTab) {
      case 'Artikel':
        return row.columns[1].toLowerCase().includes(query);
      case 'Galeri':
        return row.columns[1].toLowerCase().includes(query);
      case 'File Pendukung':
        return row.columns[1].toLowerCase().includes(query);
      default:
        return true;
    }
  });

  const totalItems = filteredRows.length;
  const totalPages = Math.max(Math.ceil(totalItems / itemsPerPage), 1);
  const paginatedRows = filteredRows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const Modal = () => {
    const closeModal = () => {
      setShowModal(false);
      setModalType('');
      setSelectedRowIndex(null);
    };

    const selectedJenis =
      selectedRowIndex !== null && currentPageData.tableRows[selectedRowIndex]
        ? currentPageData.tableRows[selectedRowIndex].columns[1] === 'Aktif'
          ? 'aktif'
          : 'tidak-aktif'
        : '';

    switch (modalType) {
      case 'tambahProfilSekolah':
        return (
          <div
            className="fixed inset-0 bg-[#f7f7f7]/75 flex items-start justify-center pt-20 sm:pt-24 p-4 z-50 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-tambah-profil-title"
          >
            <div className="w-full max-w-md sm:max-w-lg rounded-2xl overflow-hidden flex flex-col min-h-[140px] sm:min-h-[180px] border border-transparent font-['Inter']">
              <header className="bg-[#8B0000] px-3 sm:px-6 py-3 sm:py-4 flex justify-between items-center rounded-t-2xl">
                <div>
                  <h1
                    id="modal-tambah-profil-title"
                    className="text-white font-bold text-sm sm:text-base tracking-widest leading-5"
                  >
                    Buat Profil
                  </h1>
                  <p className="text-white text-[10px] sm:text-xs font-normal tracking-wide leading-4 mt-1">
                    Isi informasi dibawah untuk menambahkan profil
                  </p>
                </div>
                <button
                  aria-label="Close"
                  onClick={closeModal}
                  className="text-white text-xl sm:text-2xl font-extrabold leading-none focus:outline-none hover:text-gray-200 focus:ring-2 focus:ring-[#8B0000]"
                >
                  <i className="fas fa-times" aria-hidden="true"></i>
                </button>
              </header>
              <form className="flex-grow px-3 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 bg-white">
                <div className="mb-3 sm:mb-4">
                  <label
                    htmlFor="sk-lisensi"
                    className="block text-[10px] sm:text-xs font-extrabold tracking-widest mb-1 sm:mb-2"
                  >
                    No. SK Lisensi
                  </label>
                  <input
                    id="sk-lisensi"
                    type="text"
                    placeholder="Masukkan nomor surat keterangan lisensi"
                    className="w-full border border-gray-400 rounded-lg px-2 sm:px-3 py-1 sm:py-2 placeholder-gray-400 text-[10px] sm:text-xs font-normal tracking-wide focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                  />
                </div>
                <div className="mb-3 sm:mb-4">
                  <label
                    htmlFor="no-lisensi"
                    className="block text-[10px] sm:text-xs font-extrabold tracking-widest mb-1 sm:mb-2"
                  >
                    No. Lisensi
                  </label>
                  <input
                    id="no-lisensi"
                    type="text"
                    placeholder="Masukkan nomor lisensi"
                    className="w-full border border-gray-400 rounded-lg px-2 sm:px-3 py-1 sm:py-2 placeholder-gray-400 text-[10px] sm:text-xs font-normal tracking-wide focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                  />
                </div>
                <div className="mb-3 sm:mb-4">
                  <label
                    htmlFor="jenis"
                    className="block text-[10px] sm:text-xs font-extrabold tracking-widest mb-1 sm:mb-2"
                  >
                    Jenis
                  </label>
                  <select
                    id="jenis"
                    className="w-full border border-gray-400 rounded-lg px-2 sm:px-3 py-1 sm:py-2 text-[10px] sm:text-xs font-normal tracking-wide focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                  >
                    <option value="" disabled selected></option>
                    <option value="aktif">Aktif</option>
                    <option value="tidak-aktif">Tidak Aktif</option>
                  </select>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <div className="flex-1">
                    <label
                      htmlFor="no-telepon"
                      className="block text-[10px] sm:text-xs font-extrabold tracking-widest mb-1 sm:mb-2"
                    >
                      Nomor Telepon
                    </label>
                    <input
                      id="no-telepon"
                      type="text"
                      placeholder="Masukkan nomor telepon"
                      className="w-full border border-gray-400 rounded-lg px-2 sm:px-3 py-1 sm:py-2 placeholder-gray-400 text-[10px] sm:text-xs font-normal tracking-wide focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="no-fax"
                      className="block text-[10px] sm:text-xs font-extrabold tracking-widest mb-1 sm:mb-2"
                    >
                      Nomor Fax
                    </label>
                    <input
                      id="no-fax"
                      type="text"
                      placeholder="Masukkan nomor fax"
                      className="w-full border border-gray-400 rounded-lg px-2 sm:px-3 py-1 sm:py-2 placeholder-gray-400 text-[10px] sm:text-xs font-normal tracking-wide focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                    />
                  </div>
                </div>
              </form>
              <footer className="bg-[#F5F5F5] px-3 sm:px-6 py-3 sm:py-4 rounded-b-2xl flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-[#8B0000] text-white font-extrabold text-[10px] sm:text-xs tracking-widest rounded-full px-4 sm:px-6 py-1 sm:py-2 hover:bg-[#a10000] transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                >
                  Simpan
                </button>
              </footer>
            </div>
          </div>
        );

      case 'editProfilSekolah':
        return (
          <div
            className="fixed inset-0 bg-[#f7f7f7]/75 flex items-start justify-center pt-20 sm:pt-24 p-4 z-50 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-edit-profil-title"
          >
            <div className="w-full max-w-md sm:max-w-lg rounded-2xl overflow-hidden flex flex-col min-h-[140px] sm:min-h-[180px] border border-transparent font-['Inter']">
              <header className="bg-[#8B0000] px-3 sm:px-6 py-3 sm:py-4 flex justify-between items-center rounded-t-2xl">
                <div>
                  <h1
                    id="modal-edit-profil-title"
                    className="text-white font-bold text-sm sm:text-base tracking-widest leading-5"
                  >
                    Edit Profil
                  </h1>
                  <p className="text-white text-[10px] sm:text-xs font-normal tracking-wide leading-4 mt-1">
                    Isi informasi dibawah untuk mengedit profil
                  </p>
                </div>
                <button
                  aria-label="Close"
                  onClick={closeModal}
                  className="text-white text-xl sm:text-2xl font-extrabold leading-none focus:outline-none hover:text-gray-200 focus:ring-2 focus:ring-[#8B0000]"
                >
                  <i className="fas fa-times" aria-hidden="true"></i>
                </button>
              </header>
              <form className="flex-grow px-3 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 bg-white">
                <div className="mb-3 sm:mb-4">
                  <label
                    htmlFor="sk-lisensi"
                    className="block text-[10px] sm:text-xs font-extrabold tracking-widest mb-1 sm:mb-2"
                  >
                    No. SK Lisensi
                  </label>
                  <input
                    id="sk-lisensi"
                    type="text"
                    placeholder="Masukkan nomor surat keterangan lisensi"
                    defaultValue={
                      selectedRowIndex !== null && currentPageData.tableRows[selectedRowIndex]
                        ? currentPageData.tableRows[selectedRowIndex].columns[2]
                        : ''
                    }
                    className="w-full border border-gray-400 rounded-lg px-2 sm:px-3 py-1 sm:py-2 placeholder-gray-400 text-[10px] sm:text-xs font-normal tracking-wide focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                  />
                </div>
                <div className="mb-3 sm:mb-4">
                  <label
                    htmlFor="no-lisensi"
                    className="block text-[10px] sm:text-xs font-extrabold tracking-widest mb-1 sm:mb-2"
                  >
                    No. Lisensi
                  </label>
                  <input
                    id="no-lisensi"
                    type="text"
                    placeholder="Masukkan nomor lisensi"
                    defaultValue={
                      selectedRowIndex !== null && currentPageData.tableRows[selectedRowIndex]
                        ? currentPageData.tableRows[selectedRowIndex].columns[3]
                        : ''
                    }
                    className="w-full border border-gray-400 rounded-lg px-2 sm:px-3 py-1 sm:py-2 placeholder-gray-400 text-[10px] sm:text-xs font-normal tracking-wide focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                  />
                </div>
                <div className="mb-3 sm:mb-4">
                  <label
                    htmlFor="jenis"
                    className="block text-[10px] sm:text-xs font-extrabold tracking-widest mb-1 sm:mb-2"
                  >
                    Jenis
                  </label>
                  <select
                    id="jenis"
                    value={selectedJenis}
                    onChange={() => {}}
                    className="w-full border border-gray-400 rounded-lg px-2 sm:px-3 py-1 sm:py-2 text-[10px] sm:text-xs font-normal tracking-wide focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                  >
                    <option value="aktif">Aktif</option>
                    <option value="tidak-aktif">Tidak Aktif</option>
                  </select>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <div className="flex-1">
                    <label
                      htmlFor="no-telepon"
                      className="block text-[10px] sm:text-xs font-extrabold tracking-widest mb-1 sm:mb-2"
                    >
                      Nomor Telepon
                    </label>
                    <input
                      id="no-telepon"
                      type="text"
                      placeholder="Masukkan nomor telepon"
                      defaultValue={
                        selectedRowIndex !== null && currentPageData.tableRows[selectedRowIndex]
                          ? currentPageData.tableRows[selectedRowIndex].columns[4]
                          : ''
                      }
                      className="w-full border border-gray-400 rounded-lg px-2 sm:px-3 py-1 sm:py-2 placeholder-gray-400 text-[10px] sm:text-xs font-normal tracking-wide focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="no-fax"
                      className="block text-[10px] sm:text-xs font-extrabold tracking-widest mb-1 sm:mb-2"
                    >
                      Nomor Fax
                    </label>
                    <input
                      id="no-fax"
                      type="text"
                      placeholder="Masukkan nomor fax"
                      defaultValue={
                        selectedRowIndex !== null && currentPageData.tableRows[selectedRowIndex]
                          ? currentPageData.tableRows[selectedRowIndex].columns[5]
                          : ''
                      }
                      className="w-full border border-gray-400 rounded-lg px-2 sm:px-3 py-1 sm:py-2 placeholder-gray-400 text-[10px] sm:text-xs font-normal tracking-wide focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                    />
                  </div>
                </div>
              </form>
              <footer className="bg-[#F5F5F5] px-3 sm:px-6 py-3 sm:py-4 rounded-b-2xl flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-[#8B0000] text-white font-extrabold text-[10px] sm:text-xs tracking-widest rounded-full px-4 sm:px-6 py-1 sm:py-2 hover:bg-[#a10000] transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                >
                  Simpan
                </button>
              </footer>
            </div>
          </div>
        );

      case 'deleteProfilSekolah':
        return (
          <div
            className="fixed inset-0 bg-gray-400/75 flex items-start justify-center pt-20 sm:pt-24 p-4 z-50 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-delete-profil-title"
          >
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 w-full max-w-xs sm:max-w-sm text-center space-y-3 sm:space-y-4 transform transition-all duration-300">
              <div className="flex justify-center">
                <div className="w-12 sm:w-16 h-12 sm:h-16 border-[3px] sm:border-[4px] border-red-800 rounded-full flex items-center justify-center">
                  <div className="text-red-800 text-2xl sm:text-3xl font-bold">!</div>
                </div>
              </div>
              <h2 id="modal-delete-profil-title" className="text-base sm:text-lg font-bold text-gray-900">
                Yakin ingin dihapus?
              </h2>
              <p className="text-gray-600 text-[10px] sm:text-xs">Perhatikan kembali data yang akan Anda hapus</p>
              <div className="flex justify-center gap-3 sm:gap-4 mt-3 sm:mt-4">
                <button
                  onClick={closeModal}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-3 sm:px-4 py-1 sm:py-1.5 rounded-md transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-[10px] sm:text-xs"
                >
                  Batal
                </button>
                <button
                  onClick={closeModal}
                  className="bg-red-800 hover:bg-red-900 text-white font-semibold px-3 sm:px-4 py-1 sm:py-1.5 rounded-md transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-800 text-[10px] sm:text-xs"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        );

      case 'tambahArtikel':
        return (
          <div
            className="fixed inset-0 bg-[#f7f7f7]/75 flex items-start justify-center pt-20 sm:pt-24 p-4 z-50 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-tambah-artikel-title"
          >
            <div className="w-full max-w-md sm:max-w-lg rounded-2xl overflow-hidden flex flex-col min-h-[140px] sm:min-h-[180px] border border-transparent font-['Inter']">
              <header className="bg-[#8B0000] px-3 sm:px-6 py-3 sm:py-4 flex justify-between items-center rounded-t-2xl">
                <div>
                  <h1
                    id="modal-tambah-artikel-title"
                    className="text-white font-bold text-sm sm:text-base tracking-widest leading-5"
                  >
                    Tambah Artikel
                  </h1>
                  <p className="text-white text-[10px] sm:text-xs font-normal tracking-wide leading-4 mt-1">
                    Isi informasi dibawah untuk menambahkan artikel
                  </p>
                </div>
                <button
                  aria-label="Close"
                  onClick={closeModal}
                  className="text-white text-xl sm:text-2xl font-extrabold focus:outline-none hover:text-gray-200 focus:ring-2 focus:ring-[#8B0000]"
                >
                  <i className="fas fa-times" aria-hidden="true"></i>
                </button>
              </header>
              <form className="flex-grow px-3 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 bg-white">
                <div className="mb-3 sm:mb-4">
                  <label
                    htmlFor="judul-artikel"
                    className="block text-[10px] sm:text-xs font-extrabold tracking-widest mb-1 sm:mb-2"
                  >
                    Judul Artikel
                  </label>
                  <input
                    id="judul-artikel"
                    type="text"
                    placeholder="Judul Artikel"
                    className="w-full border border-gray-400 rounded-lg px-2 sm:px-3 py-1 sm:py-2 placeholder-gray-400 text-[10px] sm:text-xs font-normal tracking-wide focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                    required
                  />
                </div>
                <div className="mb-3 sm:mb-4">
                  <label
                    htmlFor="sub-judul-artikel"
                    className="block text-[10px] sm:text-xs font-extrabold tracking-widest mb-1 sm:mb-2"
                  >
                    Sub Judul
                  </label>
                  <input
                    id="sub-judul-artikel"
                    type="text"
                    placeholder="Sub Judul"
                    className="w-full border border-gray-400 rounded-lg px-2 sm:px-3 py-1 sm:py-2 placeholder-gray-400 text-[10px] sm:text-xs font-normal tracking-wide focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                    required
                  />
                </div>
                <div className="mb-3 sm:mb-4">
                  <label
                    htmlFor="isi-artikel"
                    className="block text-[10px] sm:text-xs font-extrabold tracking-widest mb-1 sm:mb-2"
                  >
                    Isi Artikel
                  </label>
                  <div className="border border-gray-300 rounded-md">
                    <div className="flex items-center space-x-1 sm:space-x-2 px-1 sm:px-2 py-0.5 sm:py-1 border-b border-gray-300 text-black text-sm sm:text-base">
                      <button type="button" aria-label="Bold" className="font-bold focus:outline-none">
                        B
                      </button>
                      <button type="button" aria-label="Italic" className="italic focus:outline-none">
                        I
                      </button>
                      <button type="button" aria-label="Underline" className="underline focus:outline-none">
                        U
                      </button>
                      <button type="button" aria-label="Strikethrough" className="line-through focus:outline-none">
                        S
                      </button>
                      <button
                        type="button"
                        aria-label="Superscript"
                        className="relative text-[8px] sm:text-xs font-bold leading-none focus:outline-none"
                        style={{ top: '-0.2em' }}
                      >
                        X<span className="align-super text-[0.4rem] sm:text-[0.5rem]">2</span>
                      </button>
                      <button
                        type="button"
                        aria-label="Subscript"
                        className="relative text-[8px] sm:text-xs font-bold leading-none focus:outline-none"
                        style={{ top: '0.2em' }}
                      >
                        X<span className="align-sub text-[0.4rem] sm:text-[0.5rem]">2</span>
                      </button>
                      <select
                        aria-label="Font size"
                        className="text-[10px] sm:text-xs focus:outline-none border-none bg-transparent cursor-pointer"
                      >
                        <option>16</option>
                      </select>
                      <select
                        aria-label="Font family"
                        className="text-[10px] sm:text-xs focus:outline-none border-none bg-transparent cursor-pointer"
                      >
                        <option>A</option>
                      </select>
                      <button type="button" aria-label="Bullet list" className="focus:outline-none text-sm sm:text-base">
                        <i className="fas fa-list-ul"></i>
                      </button>
                      <button type="button" aria-label="Numbered list" className="focus:outline-none text-sm sm:text-base">
                        <i className="fas fa-list-ol"></i>
                      </button>
                      <button type="button" aria-label="Align left" className="focus:outline-none text-sm sm:text-base">
                        <i className="fas fa-align-left"></i>
                      </button>
                      <button type="button" aria-label="Insert link" className="focus:outline-none text-sm sm:text-base">
                        <i className="fas fa-link"></i>
                      </button>
                      <button type="button" aria-label="Insert image" className="focus:outline-none text-sm sm:text-base">
                        <i className="fas fa-image"></i>
                      </button>
                      <button type="button" aria-label="Insert video" className="focus:outline-none text-sm sm:text-base">
                        <i className="fas fa-video"></i>
                      </button>
                    </div>
                    <textarea
                      id="isi-artikel"
                      placeholder="Isi Artikel"
                      className="w-full px-2 sm:px-3 py-1 sm:py-2 placeholder-gray-400 text-[10px] sm:text-xs font-normal tracking-wide focus:outline-none h-16 sm:h-20 resize-none rounded-b-lg"
                      required
                    />
                  </div>
                </div>
              </form>
              <footer className="bg-[#F5F5F5] px-3 sm:px-6 py-3 sm:py-4 rounded-b-2xl flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-[#8B0000] text-white font-extrabold text-[10px] sm:text-xs tracking-widest rounded-full px-4 sm:px-6 py-1 sm:py-2 hover:bg-[#a10000] transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                >
                  Simpan
                </button>
              </footer>
            </div>
          </div>
        );

      case 'editArtikel':
        return (
          <div
            className="fixed inset-0 bg-[#f7f7f7]/75 flex items-start justify-center pt-20 sm:pt-24 p-4 z-50 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-edit-artikel-title"
          >
            <div className="w-full max-w-md sm:max-w-lg rounded-2xl overflow-hidden flex flex-col min-h-[140px] sm:min-h-[180px] border border-transparent font-['Inter']">
              <header className="bg-[#8B0000] px-3 sm:px-6 py-3 sm:py-4 flex justify-between items-center rounded-t-2xl">
                <div>
                  <h1
                    id="modal-edit-artikel-title"
                    className="text-white font-bold text-sm sm:text-base tracking-widest leading-5"
                  >
                    Edit Artikel
                  </h1>
                  <p className="text-white text-[10px] sm:text-xs font-normal tracking-wide leading-4 mt-1">
                    Isi informasi dibawah untuk mengedit artikel
                  </p>
                </div>
                <button
                  aria-label="Close"
                  onClick={closeModal}
                  className="text-white text-xl sm:text-2xl font-extrabold focus:outline-none hover:text-gray-200 focus:ring-2 focus:ring-[#8B0000]"
                >
                  <i className="fas fa-times" aria-hidden="true"></i>
                </button>
              </header>
              <form className="flex-grow px-3 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 bg-white">
                <div className="mb-3 sm:mb-4">
                  <label
                    htmlFor="judul-artikel"
                    className="block text-[10px] sm:text-xs font-extrabold tracking-widest mb-1 sm:mb-2"
                  >
                    Judul Artikel
                  </label>
                  <input
                    id="judul-artikel"
                    type="text"
                    placeholder="Judul Artikel"
                    defaultValue={
                      selectedRowIndex !== null && currentPageData.tableRows[selectedRowIndex]
                        ? currentPageData.tableRows[selectedRowIndex].columns[1]
                        : ''
                    }
                    className="w-full border border-gray-400 rounded-lg px-2 sm:px-3 py-1 sm:py-2 placeholder-gray-400 text-[10px] sm:text-xs font-normal tracking-wide focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                    required
                  />
                </div>
                <div className="mb-3 sm:mb-4">
                  <label
                    htmlFor="sub-judul-artikel"
                    className="block text-[10px] sm:text-xs font-extrabold tracking-widest mb-1 sm:mb-2"
                  >
                    Sub Judul
                  </label>
                  <input
                    id="sub-judul-artikel"
                    type="text"
                    placeholder="Sub Judul"
                    defaultValue={
                      selectedRowIndex !== null && currentPageData.tableRows[selectedRowIndex]
                        ? currentPageData.tableRows[selectedRowIndex].columns[2]
                        : ''
                    }
                    className="w-full border border-gray-400 rounded-lg px-2 sm:px-3 py-1 sm:py-2 placeholder-gray-400 text-[10px] sm:text-xs font-normal tracking-wide focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                    required
                  />
                </div>
                <div className="mb-3 sm:mb-4">
                  <label
                    htmlFor="isi-artikel"
                    className="block text-[10px] sm:text-xs font-extrabold tracking-widest mb-1 sm:mb-2"
                  >
                    Isi Artikel
                  </label>
                  <div className="border border-gray-300 rounded-md">
                    <div className="flex items-center space-x-1 sm:space-x-2 px-1 sm:px-2 py-0.5 sm:py-1 border-b border-gray-300 text-black text-sm sm:text-base">
                      <button type="button" aria-label="Bold" className="font-bold focus:outline-none">
                        B
                      </button>
                      <button type="button" aria-label="Italic" className="italic focus:outline-none">
                        I
                      </button>
                      <button type="button" aria-label="Underline" className="underline focus:outline-none">
                        U
                      </button>
                      <button type="button" aria-label="Strikethrough" className="line-through focus:outline-none">
                        S
                      </button>
                      <button
                        type="button"
                        aria-label="Superscript"
                        className="relative text-[8px] sm:text-xs font-bold leading-none focus:outline-none"
                        style={{ top: '-0.2em' }}
                      >
                        X<span className="align-super text-[0.4rem] sm:text-[0.5rem]">2</span>
                      </button>
                      <button
                        type="button"
                        aria-label="Subscript"
                        className="relative text-[8px] sm:text-xs font-bold leading-none focus:outline-none"
                        style={{ top: '0.2em' }}
                      >
                        X<span className="align-sub text-[0.4rem] sm:text-[0.5rem]">2</span>
                      </button>
                      <select
                        aria-label="Font size"
                        className="text-[10px] sm:text-xs focus:outline-none border-none bg-transparent cursor-pointer"
                      >
                        <option>16</option>
                      </select>
                      <select
                        aria-label="Font family"
                        className="text-[10px] sm:text-xs focus:outline-none border-none bg-transparent cursor-pointer"
                      >
                        <option>A</option>
                      </select>
                      <button type="button" aria-label="Bullet list" className="focus:outline-none text-sm sm:text-base">
                        <i className="fas fa-list-ul"></i>
                      </button>
                      <button type="button" aria-label="Numbered list" className="focus:outline-none text-sm sm:text-base">
                        <i className="fas fa-list-ol"></i>
                      </button>
                      <button type="button" aria-label="Align left" className="focus:outline-none text-sm sm:text-base">
                        <i className="fas fa-align-left"></i>
                      </button>
                      <button type="button" aria-label="Insert link" className="focus:outline-none text-sm sm:text-base">
                        <i className="fas fa-link"></i>
                      </button>
                      <button type="button" aria-label="Insert image" className="focus:outline-none text-sm sm:text-base">
                        <i className="fas fa-image"></i>
                      </button>
                      <button type="button" aria-label="Insert video" className="focus:outline-none text-sm sm:text-base">
                        <i className="fas fa-video"></i>
                      </button>
                    </div>
                    <textarea
                      id="isi-artikel"
                      placeholder="Isi Artikel"
                      defaultValue={
                        selectedRowIndex !== null && currentPageData.tableRows[selectedRowIndex]
                          ? currentPageData.tableRows[selectedRowIndex].columns[3]
                          : ''
                      }
                      className="w-full px-2 sm:px-3 py-1 sm:py-2 placeholder-gray-400 text-[10px] sm:text-xs font-normal tracking-wide focus:outline-none h-16 sm:h-20 resize-none rounded-b-lg"
                      required
                    />
                  </div>
                </div>
              </form>
              <footer className="bg-[#F5F5F5] px-3 sm:px-6 py-3 sm:py-4 rounded-b-2xl flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-[#8B0000] text-white font-extrabold text-[10px] sm:text-xs tracking-widest rounded-full px-4 sm:px-6 py-1 sm:py-2 hover:bg-[#a10000] transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                >
                  Simpan
                </button>
              </footer>
            </div>
          </div>
        );

      case 'deleteArtikel':
        return (
          <div
            className="fixed inset-0 bg-gray-400/75 flex items-start justify-center pt-20 sm:pt-24 p-4 z-50 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-delete-artikel-title"
          >
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 w-full max-w-xs sm:max-w-sm text-center space-y-3 sm:space-y-4 transform transition-all duration-300">
              <div className="flex justify-center">
                <div className="w-12 sm:w-16 h-12 sm:h-16 border-[3px] sm:border-[4px] border-red-800 rounded-full flex items-center justify-center">
                  <div className="text-red-800 text-2xl sm:text-3xl font-bold">!</div>
                </div>
              </div>
              <h2 id="modal-delete-artikel-title" className="text-base sm:text-lg font-bold text-gray-900">
                Yakin ingin dihapus?
              </h2>
              <p className="text-gray-600 text-[10px] sm:text-xs">Perhatikan kembali data yang akan Anda hapus</p>
              <div className="flex justify-center gap-3 sm:gap-4 mt-3 sm:mt-4">
                <button
                  onClick={closeModal}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-3 sm:px-4 py-1 sm:py-1.5 rounded-md transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-[10px] sm:text-xs"
                >
                  Batal
                </button>
                <button
                  onClick={closeModal}
                  className="bg-red-800 hover:bg-red-900 text-white font-semibold px-3 sm:px-4 py-1 sm:py-1.5 rounded-md transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-800 text-[10px] sm:text-xs"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        );

      case 'tambahGaleri':
        return (
          <div
            className="fixed inset-0 bg-[#f7f7f7]/75 flex items-start justify-center pt-20 sm:pt-24 p-4 z-50 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-tambah-galeri-title"
          >
            <div className="w-full max-w-md sm:max-w-lg rounded-2xl overflow-hidden flex flex-col min-h-[140px] sm:min-h-[180px] border border-transparent font-['Inter']">
              <header className="bg-[#8B0000] px-3 sm:px-6 py-3 sm:py-4 flex justify-between items-center rounded-t-2xl">
                <div>
                  <h1
                    id="modal-tambah-galeri-title"
                    className="text-white font-bold text-sm sm:text-base tracking-widest leading-5"
                  >
                    Tambah Galeri
                  </h1>
                  <p className="text-white text-[10px] sm:text-xs font-normal tracking-wide leading-4 mt-1">
                    Isi informasi dibawah untuk menambahkan galeri
                  </p>
                </div>
                <button
                  aria-label="Close"
                  onClick={closeModal}
                  className="text-white text-xl sm:text-2xl font-extrabold focus:outline-none hover:text-gray-200 focus:ring-2 focus:ring-[#8B0000]"
                >
                  <i className="fas fa-times" aria-hidden="true"></i>
                </button>
              </header>
              <form className="flex-grow px-3 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 bg-white">
                <div className="mb-3 sm:mb-4">
                  <label
                    htmlFor="upload-foto"
                    className="block text-[10px] sm:text-xs font-extrabold tracking-widest mb-1 sm:mb-2"
                  >
                    Foto
                  </label>
                  <label
                    htmlFor="upload-foto"
                    className="flex flex-col justify-center items-center border border-gray-400 rounded-lg cursor-pointer h-16 sm:h-20 text-[#8B0000] text-xs sm:text-sm font-semibold tracking-wide select-none hover:bg-gray-50 transition"
                  >
                    <i className="fas fa-cloud-upload-alt text-2xl sm:text-3xl mb-1" aria-hidden="true"></i>
                    Klik untuk mengunggah foto
                    <input
                      id="upload-foto"
                      type="file"
                      className="hidden"
                      aria-label="Upload foto"
                      accept="image/*"
                    />
                  </label>
                </div>
                <div className="mb-3 sm:mb-4">
                  <label
                    htmlFor="judul-galeri"
                    className="block text-[10px] sm:text-xs font-extrabold tracking-widest mb-1 sm:mb-2"
                  >
                    Judul
                  </label>
                  <input
                    id="judul-galeri"
                    type="text"
                    placeholder="Tulisan Judul Galeri"
                    className="w-full border border-gray-400 rounded-lg px-2 sm:px-3 py-1 sm:py-2 placeholder-gray-400 text-[10px] sm:text-xs font-normal tracking-wide focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                    required
                  />
                </div>
              </form>
              <footer className="bg-[#F5F5F5] px-3 sm:px-6 py-3 sm:py-4 rounded-b-2xl flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-[#8B0000] text-white font-extrabold text-[10px] sm:text-xs tracking-widest rounded-full px-4 sm:px-6 py-1 sm:py-2 hover:bg-[#a10000] transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                >
                  Simpan
                </button>
              </footer>
            </div>
          </div>
        );

      case 'editGaleri':
        return (
          <div
            className="fixed inset-0 bg-[#f7f7f7]/75 flex items-start justify-center pt-20 sm:pt-24 p-4 z-50 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-edit-galeri-title"
          >
            <div className="w-full max-w-md sm:max-w-lg rounded-2xl overflow-hidden flex flex-col min-h-[140px] sm:min-h-[180px] border border-transparent font-['Inter']">
              <header className="bg-[#8B0000] px-3 sm:px-6 py-3 sm:py-4 flex justify-between items-center rounded-t-2xl">
                <div>
                  <h1
                    id="modal-edit-galeri-title"
                    className="text-white font-bold text-sm sm:text-base tracking-widest leading-5"
                  >
                    Edit Galeri
                  </h1>
                  <p className="text-white text-[10px] sm:text-xs font-normal tracking-wide leading-4 mt-1">
                    Isi informasi dibawah untuk mengedit galeri
                  </p>
                </div>
                <button
                  aria-label="Close"
                  onClick={closeModal}
                  className="text-white text-xl sm:text-2xl font-extrabold focus:outline-none hover:text-gray-200 focus:ring-2 focus:ring-[#8B0000]"
                >
                  <i className="fas fa-times" aria-hidden="true"></i>
                </button>
              </header>
              <form className="flex-grow px-3 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 bg-white">
                <div className="mb-3 sm:mb-4">
                  <label
                    htmlFor="upload-foto"
                    className="block text-[10px] sm:text-xs font-extrabold tracking-widest mb-1 sm:mb-2"
                  >
                    Foto
                  </label>
                  <label
                    htmlFor="upload-foto"
                    className="flex flex-col justify-center items-center border border-gray-400 rounded-lg cursor-pointer h-16 sm:h-20 text-[#8B0000] text-xs sm:text-sm font-semibold tracking-wide select-none hover:bg-gray-50 transition"
                  >
                    <i className="fas fa-cloud-upload-alt text-2xl sm:text-3xl mb-1" aria-hidden="true"></i>
                    Klik untuk mengunggah foto
                    <input
                      id="upload-foto"
                      type="file"
                      className="hidden"
                      aria-label="Upload foto"
                      Institut-accept="image/*"
                    />
                  </label>
                </div>
                <div className="mb-3 sm:mb-4">
                  <label
                    htmlFor="judul-galeri"
                    className="block text-[10px] sm:text-xs font-extrabold tracking-widest mb-1 sm:mb-2"
                  >
                    Judul
                  </label>
                  <input
                    id="judul-galeri"
                    type="text"
                    placeholder="Tulisan Judul Galeri"
                    defaultValue={
                      selectedRowIndex !== null && currentPageData.tableRows[selectedRowIndex]
                        ? currentPageData.tableRows[selectedRowIndex].columns[1]
                        : ''
                    }
                    className="w-full border border-gray-400 rounded-lg px-2 sm:px-3 py-1 sm:py-2 placeholder-gray-400 text-[10px] sm:text-xs font-normal tracking-wide focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                    required
                  />
                </div>
              </form>
              <footer className="bg-[#F5F5F5] px-3 sm:px-6 py-3 sm:py-4 rounded-b-2xl flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-[#8B0000] text-white font-extrabold text-[10px] sm:text-xs tracking-widest rounded-full px-4 sm:px-6 py-1 sm:py-2 hover:bg-[#a10000] transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                >
                  Simpan
                </button>
              </footer>
            </div>
          </div>
        );

      case 'deleteGaleri':
        return (
          <div
            className="fixed inset-0 bg-gray-400/75 flex items-start justify-center pt-20 sm:pt-24 p-4 z-50 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-delete-galeri-title"
          >
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 w-full max-w-xs sm:max-w-sm text-center space-y-3 sm:space-y-4 transform transition-all duration-300">
              <div className="flex justify-center">
                <div className="w-12 sm:w-16 h-12 sm:h-16 border-[3px] sm:border-[4px] border-red-800 rounded-full flex items-center justify-center">
                  <div className="text-red-800 text-2xl sm:text-3xl font-bold">!</div>
                </div>
              </div>
              <h2 id="modal-delete-galeri-title" className="text-base sm:text-lg font-bold text-gray-900">
                Yakin ingin dihapus?
              </h2>
              <p className="text-gray-600 text-[10px] sm:text-xs">Perhatikan kembali data yang akan Anda hapus</p>
              <div className="flex justify-center gap-3 sm:gap-4 mt-3 sm:mt-4">
                <button
                  onClick={closeModal}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-3 sm:px-4 py-1 sm:py-1.5 rounded-md transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-[10px] sm:text-xs"
                >
                  Batal
                </button>
                <button
                  onClick={closeModal}
                  className="bg-red-800 hover:bg-red-900 text-white font-semibold px-3 sm:px-4 py-1 sm:py-1.5 rounded-md transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-800 text-[10px] sm:text-xs"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        );

      case 'tambahFilePendukung':
        return (
          <div
            className="fixed inset-0 bg-[#f7f7f7]/75 flex items-start justify-center pt-20 sm:pt-24 p-4 z-50 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-tambah-file-title"
          >
            <div className="w-full max-w-md sm:max-w-lg rounded-2xl overflow-hidden flex flex-col min-h-[140px] sm:min-h-[180px] border border-transparent font-['Inter']">
              <header className="bg-[#8B0000] px-3 sm:px-6 py-3 sm:py-4 flex justify-between items-center rounded-t-2xl">
                <div>
                  <h1
                    id="modal-tambah-file-title"
                    className="text-white font-bold text-sm sm:text-base tracking-widest leading-5"
                  >
                    Tambah File
                  </h1>
                  <p className="text-white text-[10px] sm:text-xs font-normal tracking-wide leading-4 mt-1">
                    Isi informasi dibawah untuk menambahkan file
                  </p>
                </div>
                <button
                  aria-label="Close"
                  onClick={closeModal}
                  className="text-white text-xl sm:text-2xl font-extrabold focus:outline-none hover:text-gray-200 focus:ring-2 focus:ring-[#8B0000]"
                >
                  <i className="fas fa-times" aria-hidden="true"></i>
                </button>
              </header>
              <form className="flex-grow px-3 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 bg-white">
                <div className="mb-3 sm:mb-4">
                  <label
                    htmlFor="nama-file"
                    className="block text-[10px] sm:text-xs font-extrabold tracking-widest mb-1 sm:mb-2"
                  >
                    Nama File
                  </label>
                  <input
                    id="nama-file"
                    type="text"
                    placeholder="Nama File"
                    className="w-full border border-gray-400 rounded-lg px-2 sm:px-3 py-1 sm:py-2 placeholder-gray-400 text-[10px] sm:text-xs font-normal tracking-wide focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                    required
                  />
                </div>
                <div className="mb-3 sm:mb-4">
                  <label
                    htmlFor="kategori-file"
                    className="block text-[10px] sm:text-xs font-extrabold tracking-widest mb-1 sm:mb-2"
                  >
                    Kategori File
                  </label>
                  <input
                    id="kategori-file"
                    type="text"
                    placeholder="Kategori File"
                    className="w-full border border-gray-400 rounded-lg px-2 sm:px-3 py-1 sm:py-2 placeholder-gray-400 text-[10px] sm:text-xs font-normal tracking-wide focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                    required
                  />
                </div>
                <div className="mb-3 sm:mb-4">
                  <label
                    htmlFor="upload-file"
                    className="block text-[10px] sm:text-xs font-extrabold tracking-widest mb-1 sm:mb-2"
                  >
                    File
                  </label>
                  <label
                    htmlFor="upload-file"
                    className="flex flex-col justify-center items-center border border-gray-400 rounded-lg cursor-pointer h-16 sm:h-20 text-[#8B0000] text-xs sm:text-sm font-semibold tracking-wide select-none hover:bg-gray-50 transition"
                  >
                    <i className="fas fa-cloud-upload-alt text-2xl sm:text-3xl mb-1" aria-hidden="true"></i>
                    Klik untuk mengunggah file <br /> *Format PDF
                    <input
                      id="upload-file"
                      type="file"
                      className="hidden"
                      aria-label="Upload file"
                      accept="application/pdf"
                    />
                  </label>
                </div>
              </form>
              <footer className="bg-[#F5F5F5] px-3 sm:px-6 py-3 sm:py-4 rounded-b-2xl flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-[#8B0000] text-white font-extrabold text-[10px] sm:text-xs tracking-widest rounded-full px-4 sm:px-6 py-1 sm:py-2 hover:bg-[#a10000] transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                >
                  Simpan
                </button>
              </footer>
            </div>
          </div>
        );

      case 'editFilePendukung':
        return (
          <div
            className="fixed inset-0 bg-[#f7f7f7]/75 flex items-start justify-center pt-20 sm:pt-24 p-4 z-50 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-edit-file-title"
          >
            <div className="w-full max-w-md sm:max-w-lg rounded-2xl overflow-hidden flex flex-col min-h-[140px] sm:min-h-[180px] border border-transparent font-['Inter']">
              <header className="bg-[#8B0000] px-3 sm:px-6 py-3 sm:py-4 flex justify-between items-center rounded-t-2xl">
                <div>
                  <h1
                    id="modal-edit-file-title"
                    className="text-white font-bold text-sm sm:text-base tracking-widest leading-5"
                  >
                    Edit File
                  </h1>
                  <p className="text-white text-[10px] sm:text-xs font-normal tracking-wide leading-4 mt-1">
                    Isi informasi dibawah untuk mengedit file
                  </p>
                </div>
                <button
                  aria-label="Close"
                  onClick={closeModal}
                  className="text-white text-xl sm:text-2xl font-extrabold focus:outline-none hover:text-gray-200 focus:ring-2 focus:ring-[#8B0000]"
                >
                  <i className="fas fa-times" aria-hidden="true"></i>
                </button>
              </header>
              <form className="flex-grow px-3 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4 bg-white">
                <div className="mb-3 sm:mb-4">
                  <label
                    htmlFor="nama-file"
                    className="block text-[10px] sm:text-xs font-extrabold tracking-widest mb-1 sm:mb-2"
                  >
                    Nama File
                  </label>
                  <input
                    id="nama-file"
                    type="text"
                    placeholder="Nama File"
                    defaultValue={
                      selectedRowIndex !== null && currentPageData.tableRows[selectedRowIndex]
                        ? currentPageData.tableRows[selectedRowIndex].columns[1]
                        : ''
                    }
                    className="w-full border border-gray-400 rounded-lg px-2 sm:px-3 py-1 sm:py-2 placeholder-gray-400 text-[10px] sm:text-xs font-normal tracking-wide focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                    required
                  />
                </div>
                <div className="mb-3 sm:mb-4">
                  <label
                    htmlFor="kategori-file"
                    className="block text-[10px] sm:text-xs font-extrabold tracking-widest mb-1 sm:mb-2"
                  >
                    Kategori File
                  </label>
                  <input
                    id="kategori-file"
                    type="text"
                    placeholder="Kategori File"
                    className="w-full border border-gray-400 rounded-lg px-2 sm:px-3 py-1 sm:py-2 placeholder-gray-400 text-[10px] sm:text-xs font-normal tracking-wide focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                    required
                  />
                </div>
                <div className="mb-3 sm:mb-4">
                  <label
                    htmlFor="upload-file"
                    className="block text-[10px] sm:text-xs font-extrabold tracking-widest mb-1 sm:mb-2"
                  >
                    File
                  </label>
                  <label
                    htmlFor="upload-file"
                    className="flex flex-col justify-center items-center border border-gray-400 rounded-lg cursor-pointer h-16 sm:h-20 text-[#8B0000] text-xs sm:text-sm font-semibold tracking-wide select-none hover:bg-gray-50 transition"
                  >
                    <i className="fas fa-cloud-upload-alt text-2xl sm:text-3xl mb-1" aria-hidden="true"></i>
                    Klik untuk mengunggah file <br /> *Format PDF
                    <input
                      id="upload-file"
                      type="file"
                      className="hidden"
                      aria-label="Upload file"
                      accept="application/pdf"
                    />
                  </label>
                </div>
              </form>
              <footer className="bg-[#F5F5F5] px-3 sm:px-6 py-3 sm:py-4 rounded-b-2xl flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-[#8B0000] text-white font-extrabold text-[10px] sm:text-xs tracking-widest rounded-full px-4 sm:px-6 py-1 sm:py-2 hover:bg-[#a10000] transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
                >
                  Simpan
                </button>
              </footer>
            </div>
          </div>
        );

      case 'deleteFilePendukung':
        return (
          <div
            className="fixed inset-0 bg-gray-400/75 flex items-start justify-center pt-20 sm:pt-24 p-4 z-50 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-delete-file-title"
          >
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 w-full max-w-xs sm:max-w-sm text-center space-y-3 sm:space-y-4 transform transition-all duration-300">
              <div className="flex justify-center">
                <div className="w-12 sm:w-16 h-12 sm:h-16 border-[3px] sm:border-[4px] border-red-800 rounded-full flex items-center justify-center">
                  <div className="text-red-800 text-2xl sm:text-3xl font-bold">!</div>
                </div>
              </div>
              <h2 id="modal-delete-file-title" className="text-base sm:text-lg font-bold text-gray-900">
                Yakin ingin dihapus?
              </h2>
              <p className="text-gray-600 text-[10px] sm:text-xs">Perhatikan kembali data yang akan Anda hapus</p>
              <div className="flex justify-center gap-3 sm:gap-4 mt-3 sm:mt-4">
                <button
                  onClick={closeModal}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-3 sm:px-4 py-1 sm:py-1.5 rounded-md transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-[10px] sm:text-xs"
                >
                  Batal
                </button>
                <button
                  onClick={closeModal}
                  className="bg-red-800 hover:bg-red-900 text-white font-semibold px-3 sm:px-4 py-1 sm:py-1.5 rounded-md transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-800 text-[10px] sm:text-xs"
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
          background-color: #8B0000 !important;
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
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
      `}</style>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Navigation */}
        <nav
          className="navbar bg-[#8B0000] rounded-lg flex flex-wrap justify-between items-center gap-x-10 gap-y-2 px-4 sm:px-6 py-4 text-white text-sm font-semibold select-none z-10"
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="flex flex-wrap gap-x-10 gap-y-2">
            {pages.map((page) => (
              <button
                key={page.name}
                onClick={() => {
                  setActiveTab(page.name);
                  setCurrentPage(1);
                  setSearchQuery('');
                }}
                className={`focus:outline-none pb-1 transition-all duration-200 ${
                  activeTab === page.name ? 'border-b-2 border-white' : 'hover:text-gray-200'
                }`}
                aria-current={activeTab === page.name ? 'page' : undefined}
              >
                {page.name}
              </button>
            ))}
          </div>
        </nav>

        {/* Search Bar and Add Button */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex flex-1 items-center gap-3">
            {activeTab !== 'Profil Sekolah' && (
              <>
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
              </>
            )}
            <button
              onClick={() => {
                setModalType(`tambah${activeTab.replace(/\s/g, '')}`);
                setShowModal(true);
              }}
              className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 text-xs sm:text-sm font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#8B0B0B] transition transform hover:scale-105"
              aria-label={currentPageData.addButtonLabel}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 sm:w-5 sm:h-5"
                aria-hidden="true"
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
                        : `border-x border-gray-300 ${header === 'Aksi' ? 'w-16 sm:w-20' : ''}`
                    }`}
                    scope="col"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedRows.length === 0 && (
                <tr>
                  <td
                    colSpan={currentPageData.tableHeaders.length}
                    className="px-4 py-4 text-center text-gray-500"
                  >
                    Tidak ada data
                  </td>
                </tr>
              )}
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
                        aria-label={action.charAt(0).toUpperCase() + action.slice(1)}
                        onClick={() => {
                          setModalType(
                            action === 'edit' ? `edit${activeTab.replace(/\s/g, '')}` : `delete${activeTab.replace(/\s/g, '')}`
                          );
                          setSelectedRowIndex(rowIndex);
                          setShowModal(true);
                        }}
                        className={`p-1 sm:p-2 rounded text-white transition transform hover:scale-110 focus:outline-none focus:ring-2 ${
                          action === 'edit'
                            ? 'bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-400'
                            : 'bg-[#8B0B0B] hover:bg-[#6e0808] focus:ring-[#8B0B0B]'
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
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.958.8.8-2.957a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
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
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
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
        <div className="mt-6 flex justify-center gap-2 text-xs font-semibold select-none">
          <button
            aria-label="Previous page"
            className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#8B0B0B] transition disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
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
            aria-label="Next page"
            className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#8B0B0B] transition disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
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
            aria-label="Next page"
            className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#8B0B0B] transition disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

        {/* Modal */}
        {showModal && <Modal />}
      </div>
      <Footer />
    </div>
  );
}