'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../../../components/user/Navbar';
import Footer from '../../../../components/user/Footer';

export default function UnitSkema() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);
  const itemsPerPage = 10;
  const router = useRouter();

  const tableData = [
    {
      columns: ['1', 'KRA.LG.027.(1).A', 'Melakukan peran serta dengan teknik portir lunak'],
      actions: ['edit', 'copy', 'delete'],
    },
    {
      columns: ['2', 'KRA.LG.028.(1).B', 'Mengembangkan aplikasi berbasis web'],
      actions: ['edit', 'copy', 'delete'],
    },
    {
      columns: ['3', 'KRA.LG.029.(1).C', 'Mengelola basis data untuk aplikasi'],
      actions: ['edit', 'copy', 'delete'],
    },
  ];

  const filteredRows = tableData.filter((row) =>
    row.columns[2].toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalItems = filteredRows.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedRows = filteredRows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const showPagination = totalItems >= 1;

  const Modal = () => {
    const closeModal = () => {
      setShowModal(false);
      setSelectedRowIndex(null);
    };

    switch (modalType) {
      case 'tambahUnit':
        return (
          <div className="fixed inset-0 bg-gray-700/75 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="w-full max-w-4xl rounded-2xl bg-white font-['Inter'] shadow-lg transform transition-all duration-300">
              <header className="bg-[#800000] px-8 py-6 flex justify-between items-center rounded-t-2xl">
                <div>
                  <h1 className="text-white font-bold text-lg tracking-widest leading-6">Tambah Unit</h1>
                  <p className="text-white text-xs font-normal tracking-wide mt-1">Isi informasi dibawah untuk menambahkan unit</p>
                </div>
                <button
                  aria-label="Close"
                  onClick={closeModal}
                  className="text-white text-3xl font-bold leading-none focus:outline-none hover:text-gray-200"
                >
                  <i className="fas fa-times"></i>
                </button>
              </header>
              <form className="px-8 py-10">
                <div className="mb-8">
                  <label htmlFor="kode-unit" className="block text-black font-semibold text-sm tracking-widest mb-2">
                    Kode Unit
                  </label>
                  <input
                    id="kode-unit"
                    type="text"
                    placeholder="Kode Unit"
                    className="w-full border border-gray-400 rounded-md px-4 py-3 placeholder-gray-400 text-sm tracking-widest focus:outline-none focus:ring-2 focus:ring-[#800000] transition"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-1">
                    <label htmlFor="judul-unit" className="block text-black font-semibold text-sm tracking-widest mb-2">
                      Judul Unit
                    </label>
                    <input
                      id="judul-unit"
                      type="text"
                      placeholder="Judul Skema"
                      className="w-full border border-gray-400 rounded-md px-4 py-3 placeholder-gray-400 text-sm tracking-widest focus:outline-none focus:ring-2 focus:ring-[#800000] transition"
                    />
                  </div>
                  <div className="flex-1 relative">
                    <label htmlFor="jenis" className="block text-black font-semibold text-sm tracking-widest mb-2">
                      Jenis
                    </label>
                    <select
                      id="jenis"
                      className="w-full border border-gray-400 rounded-md px-4 py-3 text-sm tracking-widest appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-[#800000] transition"
                    >
                      <option hidden></option>
                      <option>Standar Khusus</option>
                      <option>Internasional</option>
                      <option>SKKNI</option>
                    </select>
                    <div className="pointer-events-none absolute right-6 top-[calc(50%+0.5rem)] text-gray-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </form>
              <footer className="bg-[#F7F7F7] px-8 py-6 rounded-b-2xl flex justify-end">
                <button
                  type="submit"
                  onClick={closeModal}
                  className="bg-[#800000] text-white font-bold text-sm tracking-widest rounded-full px-10 py-3 hover:bg-[#660000] focus:outline-none focus:ring-2 focus:ring-[#800000] transition"
                >
                  Simpan
                </button>
              </footer>
            </div>
          </div>
        );

      case 'editUnit':
        return (
          <div className="fixed inset-0 bg-gray-700/75 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="w-full max-w-4xl rounded-[20px] bg-white font-['Inter'] shadow-md transform transition-all duration-300">
              <header className="bg-[#8b0000] px-8 py-6 rounded-t-[20px] flex justify-between items-center">
                <div>
                  <h1 className="text-white font-semibold text-lg tracking-wide leading-none">Edit Unit</h1>
                  <p className="text-white text-xs font-light tracking-widest mt-1">
                    Isi informasi dibawah untuk mengedit unit
                  </p>
                </div>
                <button
                  aria-label="Close"
                  onClick={closeModal}
                  className="text-white text-3xl font-bold leading-none focus:outline-none hover:text-gray-200"
                >
                  <i className="fas fa-times"></i>
                </button>
              </header>
              <form className="px-8 py-10">
                <div className="mb-8">
                  <label htmlFor="kode-unit" className="block mb-2 font-semibold text-sm tracking-wide">
                    Kode Unit
                  </label>
                  <input
                    id="kode-unit"
                    type="text"
                    placeholder="Kode Unit"
                    defaultValue={selectedRowIndex !== null ? tableData[selectedRowIndex].columns[1] : ''}
                    className="w-full border border-gray-400 rounded-md px-4 py-3 placeholder-gray-400 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-[#8b0000] transition"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-1">
                    <label htmlFor="judul-unit" className="block mb-2 font-semibold text-sm tracking-wide">
                      Judul Unit
                    </label>
                    <input
                      id="judul-unit"
                      type="text"
                      placeholder="Judul Skema"
                      defaultValue={selectedRowIndex !== null ? tableData[selectedRowIndex].columns[2] : ''}
                      className="w-full border border-gray-400 rounded-md px-4 py-3 placeholder-gray-400 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-[#8b0000] transition"
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="jenis" className="block mb-2 font-semibold text-sm tracking-wide">
                      Jenis
                    </label>
                    <select
                      id="jenis"
                      className="w-full border border-gray-400 rounded-md px-4 py-3 text-sm font-mono text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#8b0000] appearance-none transition"
                      style={{
                        backgroundPosition: 'right 1rem center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '1rem',
                        backgroundImage: "url(\"data:image/svg+xml,%3csvg fill='none' stroke='%23666' stroke-width='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3e%3c/path%3e%3c/svg%3e\")",
                      }}
                    >
                      <option value="" disabled selected></option>
                      <option value="Standar Khusus">Standar Khusus</option>
                      <option value="Internasional">Internasional</option>
                      <option value="SKKNI">SKKNI</option>
                    </select>
                  </div>
                </div>
              </form>
              <footer className="bg-[#f7f7f7] px-8 py-6 rounded-b-[20px] flex justify-end">
                <button
                  type="submit"
                  onClick={closeModal}
                  className="bg-[#8b0000] text-white font-semibold text-sm tracking-widest rounded-full px-10 py-3 PENJELASAN DI LUAR TAG hover:bg-[#6a0000] transition-colors"
                >
                  Simpan
                </button>
              </footer>
            </div>
          </div>
        );

      case 'deleteUnit':
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
          <button className="focus:outline-none pb-1 transition-all duration-200 hover:text-gray-200">
            Unit Skema
          </button>
        </nav>

        {/* Search and Add Button */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex flex-1 items-center gap-3">
            <div className="flex-1 border border-gray-300 rounded-md shadow-sm">
              <input
                type="text"
                placeholder="Cari Unit Skema"
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
              setModalType('tambahUnit');
              setShowModal(true);
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
            <span>Tambah Unit</span>
          </button>
        </div>

        {/* Table */}
        <div className="mt-6 border border-gray-200 rounded-lg overflow-x-auto scrollbar-thin shadow-lg">
          <table className="w-full text-[10px] sm:text-xs border-collapse min-w-[600px]">
            <thead className="bg-gray-100 text-gray-700 font-semibold border-t border-gray-300">
              <tr>
                <th className="px-2 sm:px-4 py-2 text-center whitespace-nowrap border-none w-10 sm:w-12">No</th>
                <th className="px-2 sm:px-4 py-2 text-center whitespace-nowrap border-x border-gray-300">Kode Unit</th>
                <th className="px-2 sm:px-4 py-2 text-center whitespace-nowrap border-x border-gray-300">Judul Unit</th>
                <th className="px-2 sm:px-4 py-2 text-center whitespace-nowrap border-x border-gray-300 w-16 sm:w-20">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRows.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50 transition">
                  {row.columns.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-2 sm:px-4 py-2 border-none text-center whitespace-nowrap">
                      {cell}
                    </td>
                  ))}
                  <td className="border-none px-2 sm:px-4 py-2 flex justify-center gap-1 sm:gap-2">
                    {row.actions.map((action, actionIndex) => (
                      <button
                        key={actionIndex}
                        aria-label={action.charAt(0).toUpperCase() + action.slice(1)}
                        onClick={() => {
                          if (action === 'copy') {
                            router.push('/admin/Data/Unit-Skema/Elemen-Skema');
                          } else {
                            setModalType(action === 'edit' ? 'editUnit' : 'deleteUnit');
                            setSelectedRowIndex(rowIndex);
                            setShowModal(true);
                          }
                        }}
                        className={`p-1 sm:p-2 rounded text-white transition transform hover:scale-110 ${
                          action === 'edit'
                            ? 'bg-yellow-400 hover:bg-yellow-500'
                            : action === 'delete'
                            ? 'bg-[#8B0B0B] hover:bg-[#6e0808]'
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
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.2-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
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
                              d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125h9.75a1.125 1.125 0 0 1 1.125 1.125V17.25Zm0-12.375V4.875c0-.621-.504-1.125-1.125-1.125H6.75a1.125 1.125 0 0 0-1.125 1.125v1.5m10.5 0H6.75m9.75 0a1.125 1.125 0 0 1 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-1.5m-9.75-10.5h9.75"
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
              disabled={currentPage === 1}
            >
              {'<'}
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
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
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              {'>'}
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