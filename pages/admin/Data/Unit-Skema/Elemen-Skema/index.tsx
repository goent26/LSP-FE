'use client';

import { useState } from 'react';
import Navbar from '../../../../../components/user/Navbar';
import Footer from '../../../../../components/user/Footer';

export default function ElemenSkema() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const itemsPerPage = 10;

  const tableData = [
    {
      columns: ['1', 'Judul Elemen 1', 'Kriteria Unjuk Kerja 1'],
      actions: ['edit', 'delete'],
    },
  ];

  const filteredRows = tableData.filter((row) =>
    row.columns[1].toLowerCase().includes(searchQuery.toLowerCase())
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
    };

    switch (modalType) {
      case 'tambahElemen':
        return (
          <div className="fixed inset-0 bg-gray-700/75 flex items-start justify-center mt-16 p-4 z-50 overflow-y-auto">
            <div className="w-full max-w-5xl rounded-2xl overflow-hidden flex flex-col min-h-[300px] bg-white font-['Inter']">
              {/* Header */}
              <header className="bg-[#8b0000] flex justify-between items-center px-8 py-4 rounded-t-2xl">
                <div>
                  <h1 className="text-white font-bold text-lg tracking-widest leading-6">Tambah Elemen</h1>
                  <p className="text-white text-[13px] font-normal leading-4 tracking-tight mt-1">
                    Isi informasi dibawah untuk menambahkan elemen
                  </p>
                </div>
                <button
                  aria-label="Close"
                  onClick={closeModal}
                  className="text-white text-2xl font-bold leading-none focus:outline-none hover:text-gray-200"
                >
                  <i className="fas fa-times"></i>
                </button>
              </header>

              {/* Form */}
              <form className="flex flex-col flex-grow px-8 py-6">
                <label
                  htmlFor="judul-elemen"
                  className="font-semibold text-sm leading-5 tracking-wider mb-2 text-black"
                >
                  Judul Elemen
                </label>
                <input
                  id="judul-elemen"
                  type="text"
                  placeholder="Judul Elemen"
                  className="border border-gray-300 rounded-md px-4 py-3 placeholder:text-gray-400 placeholder:text-sm placeholder:tracking-widest focus:outline-none focus:ring-2 focus:ring-[#8b0000] mb-6"
                />

                <label
                  htmlFor="kriteria-unjuk-kerja"
                  className="font-semibold text-sm leading-5 tracking-wider mb-2 text-black"
                >
                  Kriteria Unjuk Kerja
                </label>
                <div className="border border-gray-300 rounded-md">
                  {/* Toolbar */}
                  <div className="flex items-center space-x-4 px-3 py-2 border-b border-gray-300 text-black text-lg">
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
                      className="relative text-xs font-bold leading-none focus:outline-none"
                      style={{ top: '-0.3em' }}
                    >
                      X<span className="align-super text-[0.5rem]">2</span>
                    </button>
                    <button
                      type="button"
                      aria-label="Subscript"
                      className="relative text-xs font-bold leading-none focus:outline-none"
                      style={{ top: '0.3em' }}
                    >
                      X<span className="align-sub text-[0.5rem]">2</span>
                    </button>
                    <select
                      aria-label="Font size"
                      className="text-sm focus:outline-none border-none bg-transparent cursor-pointer"
                    >
                      <option>16</option>
                    </select>
                    <select
                      aria-label="Font family"
                      className="text-sm focus:outline-none border-none bg-transparent cursor-pointer"
                    >
                      <option>A</option>
                    </select>
                    <button type="button" aria-label="Bullet list" className="focus:outline-none text-xl">
                      <i className="fas fa-list-ul"></i>
                    </button>
                    <button type="button" aria-label="Numbered list" className="focus:outline-none text-xl">
                      <i className="fas fa-list-ol"></i>
                    </button>
                    <button type="button" aria-label="Align left" className="focus:outline-none text-xl">
                      <i className="fas fa-align-left"></i>
                    </button>
                    <button type="button" aria-label="Insert link" className="focus:outline-none text-xl">
                      <i className="fas fa-link"></i>
                    </button>
                    <button type="button" aria-label="Insert image" className="focus:outline-none text-xl">
                      <i className="fas fa-image"></i>
                    </button>
                    <button type="button" aria-label="Insert video" className="focus:outline-none text-xl">
                      <i className="fas fa-video"></i>
                    </button>
                  </div>
                  <textarea
                    id="kriteria-unjuk-kerja"
                    rows={4}
                    className="w-full p-3 resize-none border-none focus:outline-none"
                  ></textarea>
                </div>
              </form>

              {/* Footer */}
              <footer className="bg-[#f7f7f7] flex justify-end items-center px-8 py-4 rounded-b-2xl">
                <button
                  type="submit"
                  onClick={closeModal}
                  className="bg-[#8b0000] text-white font-semibold text-sm tracking-widest rounded-full px-8 py-3 hover:bg-[#7a0000] focus:outline-none"
                >
                  Simpan
                </button>
              </footer>
            </div>
          </div>
        );

      case 'editElemen':
        return (
          <div className="fixed inset-0 bg-gray-700/75 flex items-start justify-center mt-16 p-4 z-50 overflow-y-auto">
            <div className="w-full max-w-5xl rounded-2xl overflow-hidden flex flex-col min-h-[300px] bg-white font-['Inter']">
              {/* Header */}
              <header className="bg-[#8b0000] flex justify-between items-center px-8 py-4 rounded-t-2xl">
                <div>
                  <h1 className="text-white font-bold text-lg tracking-widest leading-6">Edit Elemen</h1>
                  <p className="text-white text-[13px] font-normal leading-4 tracking-tight mt-1">
                    Isi informasi dibawah untuk mengedit elemen
                  </p>
                </div>
                <button
                  aria-label="Close"
                  onClick={closeModal}
                  className="text-white text-2xl font-bold leading-none focus:outline-none hover:text-gray-200"
                >
                  <i className="fas fa-times"></i>
                </button>
              </header>

              {/* Form */}
              <form className="flex flex-col flex-grow px-8 py-6">
                <label
                  htmlFor="judul-elemen"
                  className="font-semibold text-sm leading-5 tracking-wider mb-2 text-black"
                >
                  Judul Elemen
                </label>
                <input
                  id="judul-elemen"
                  type="text"
                  placeholder="Judul Elemen"
                  className="border border-gray-300 rounded-md px-4 py-3 placeholder:text-gray-400 placeholder:text-sm placeholder:tracking-widest focus:outline-none focus:ring-2 focus:ring-[#8b0000] mb-6"
                />

                <label
                  htmlFor="kriteria-unjuk-kerja"
                  className="font-semibold text-sm leading-5 tracking-wider mb-2 text-black"
                >
                  Kriteria Unjuk Kerja
                </label>
                <div className="border border-gray-300 rounded-md">
                  {/* Toolbar */}
                  <div className="flex items-center space-x-4 px-3 py-2 border-b border-gray-300 text-black text-lg">
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
                      className="relative text-xs font-bold leading-none focus:outline-none"
                      style={{ top: '-0.3em' }}
                    >
                      X<span className="align-super text-[0.5rem]">2</span>
                    </button>
                    <button
                      type="button"
                      aria-label="Subscript"
                      className="relative text-xs font-bold leading-none focus:outline-none"
                      style={{ top: '0.3em' }}
                    >
                      X<span className="align-sub text-[0.5rem]">2</span>
                    </button>
                    <select
                      aria-label="Font size"
                      className="text-sm focus:outline-none border-none bg-transparent cursor-pointer"
                    >
                      <option>16</option>
                    </select>
                    <select
                      aria-label="Font family"
                      className="text-sm focus:outline-none border-none bg-transparent cursor-pointer"
                    >
                      <option>A</option>
                    </select>
                    <button type="button" aria-label="Bullet list" className="focus:outline-none text-xl">
                      <i className="fas fa-list-ul"></i>
                    </button>
                    <button type="button" aria-label="Numbered list" className="focus:outline-none text-xl">
                      <i className="fas fa-list-ol"></i>
                    </button>
                    <button type="button" aria-label="Align left" className="focus:outline-none text-xl">
                      <i className="fas fa-align-left"></i>
                    </button>
                    <button type="button" aria-label="Insert link" className="focus:outline-none text-xl">
                      <i className="fas fa-link"></i>
                    </button>
                    <button type="button" aria-label="Insert image" className="focus:outline-none text-xl">
                      <i className="fas fa-image"></i>
                    </button>
                    <button type="button" aria-label="Insert video" className="focus:outline-none text-xl">
                      <i className="fas fa-video"></i>
                    </button>
                  </div>
                  <textarea
                    id="kriteria-unjuk-kerja"
                    rows={4}
                    className="w-full p-3 resize-none border-none focus:outline-none"
                  ></textarea>
                </div>
              </form>

              {/* Footer */}
              <footer className="bg-[#f7f7f7] flex justify-end items-center px-8 py-4 rounded-b-2xl">
                <button
                  type="submit"
                  onClick={closeModal}
                  className="bg-[#8b0000] text-white font-semibold text-sm tracking-widest rounded-full px-8 py-3 hover:bg-[#7a0000] focus:outline-none"
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
    <div className="min-h-screen bg-gray-100 font-poppins flex flex-col">
      <Navbar />
      <main className="p-4 max-w-6xl mx-auto w-full flex-grow">
        {/* Header */}
        <div className="bg-red-800 text-white p-6 rounded-md shadow-md">
          <h1 className="font-semibold text-lg">Elemen Skema</h1>
        </div>

        {/* Search and Add Button */}
        <div className="flex mt-6 gap-2 items-center">
          <input
            type="text"
            placeholder="Cari Elemen"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow px-4 py-3 border border-gray-300 rounded-md shadow-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button className="p-3 border border-gray-300 rounded-md shadow-md bg-white hover:bg-gray-100">
            🔍
          </button>
          <button
            onClick={() => {
              setModalType('tambahElemen');
              setShowModal(true);
            }}
            className="bg-red-800 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Tambah Elemen
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
                <th className="py-3 px-2 border border-gray-300">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRows.map((row, index) => (
                <tr key={index}>
                  {row.columns.map((cell, cellIndex) => (
                    <td key={cellIndex} className="py-3 border border-gray-300">
                      {cell}
                    </td>
                  ))}
                  <td className="py-3 border border-gray-300">
                    <button
                      onClick={() => {
                        setModalType('editElemen');
                        setShowModal(true);
                      }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-800 text-white px-3 py-1 rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {showPagination && (
          <div className="flex justify-center mt-6 space-x-1">
            <button
              className="border border-gray-300 rounded px-2 py-1 hover:bg-gray-200"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              {'<'}
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
              {'>'}
            </button>
          </div>
        )}
      </main>
      <Footer />
      {showModal && <Modal />}
    </div>
  );
}