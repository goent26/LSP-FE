'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Footer from '../../../components/user/Footer';

const Daftar = () => {
  const router = useRouter();
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '{}');
    setUploadedFiles(storedFiles);
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        const updatedFiles = { ...uploadedFiles, [field]: base64String };
        setUploadedFiles(updatedFiles);
        localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteFile = (field: string) => {
    const updatedFiles = { ...uploadedFiles };
    delete updatedFiles[field];
    setUploadedFiles(updatedFiles);
    localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));
  };

  const openFile = (file: string) => {
    window.open(file, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-[#8B0000] py-4 flex-shrink-0">
        <div className="container mx-auto flex justify-center items-center">
          <h1 className="text-white text-2xl font-bold">Pendaftaran</h1>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow overflow-y-auto">
        {/* Step Navigation with Image */}
        <div className="container mx-auto mt-6 relative">
          <Image
            src="/step-indicator.png"
            alt="Langkah Pendaftaran"
            width={1200}
            height={100}
            className="w-full"
          />
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 text-sm font-semibold text-[#8B0000] pl-2">
            Formulir Peserta
          </div>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 text-sm font-semibold text-[#8B0000] pr-2">
            Asesmen Mandiri
          </div>
        </div>

        {/* Form */}
        <div className="container mx-auto mt-8 px-4 pb-8">
          <h2 className="font-bold text-base">FR–APL–01. FORMULIR PERMOHONAN SERTIFIKASI KOMPETENSI</h2>
          <h3 className="font-bold text-base mt-2">Bagian 1 : Rincian Data Permohonan Sertifikasi</h3>
          <p className="text-base mb-4">Pada bagian ini, cantumkan data pribadi, data pendidikan anda saat ini.</p>

          {/* Form Section 1 */}
          <div className="rounded-md">
            <p className="font-semibold text-base mb-4">a. Data Pribadi</p>
            <div className="grid gap-3 px-4">
              <div className="flex items-center gap-4">
                <label className="text-base font-semibold w-1/3">Nama Lengkap</label>
                <input
                  type="text"
                  placeholder="Masukkan Nama Lengkap"
                  className="w-2/3 p-2 border rounded text-sm"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="text-base font-semibold w-1/3">No. KTP/NIK/Paspor</label>
                <input type="text" className="w-2/3 p-2 border rounded text-sm" />
              </div>
              <div className="flex items-center gap-4">
                <label className="text-base font-semibold w-1/3">Tempat/tgl. Lahir</label>
                <input type="text" className="w-2/3 p-2 border rounded text-sm" />
              </div>
              <div className="flex gap-4 items-start">
                <label className="text-base font-semibold w-1/3 pt-2 text-gray-900">Jenis Kelamin</label>
                <div className="flex gap-4 w-2/3 items-center">
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="radio" name="gender" className="accent-[#8B0000]" /> Laki-laki
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="radio" name="gender" className="accent-[#8B0000]" /> Perempuan
                  </label>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <label className="text-base font-semibold w-1/3">Kebangsaan</label>
                <input type="text" className="w-2/3 p-2 border rounded text-sm" />
              </div>
              <div className="flex items-center gap-4">
                <label className="text-base font-semibold w-1/3">Alamat Rumah</label>
                <input
                  type="text"
                  placeholder="Alamat Lengkap"
                  className="w-2/3 p-2 border rounded text-sm"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="text-base font-semibold w-1/3">No. Telepon</label>
                <input
                  type="text"
                  placeholder="Nomor Telepon"
                  className="w-2/3 p-2 border rounded text-sm"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="text-base font-semibold w-1/3">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-2/3 p-2 border rounded text-sm"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="text-base font-semibold w-1/3">Jurusan/Skema</label>
                <input type="text" className="w-2/3 p-2 border rounded text-sm" />
              </div>
            </div>
          </div>

          {/* Bukti Kelengkapan Pemohon */}
          <div className="mt-8">
            <h3 className="font-bold text-base">Bagian 2: Bukti Kelengkapan Pemohon</h3>
            <h4 className="font-semibold text-base mt-2">2.1 Bukti Persyaratan Dasar Pemohon</h4>

            {/* Upload Fields */}
            <div className="space-y-6 mt-4 px-4">
              <div className="flex items-start gap-4">
                <label className="text-base font-semibold w-1/3">Foto raport semester 1 s.d. 4</label>
                <div className="w-2/3">
                  <div className="border-2 border-dashed rounded p-4 flex flex-col items-center justify-center relative cursor-pointer hover:bg-gray-100">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => handleFileUpload(e, 'raport')}
                    />
                    {uploadedFiles['raport'] ? (
                      <div className="relative w-full">
                        <Image
                          src={uploadedFiles['raport']}
                          alt="Uploaded Raport"
                          width={200}
                          height={96}
                          className="max-w-full max-h-24 object-contain mx-auto"
                        />
                        <button
                          onClick={() => handleDeleteFile('raport')}
                          className="absolute top-0 right-0 bg-[#8B0000] text-white text-sm w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-800"
                        >
                          X
                        </button>
                        <button
                          onClick={() => openFile(uploadedFiles['raport'])}
                          className="absolute bottom-0 right-0 bg-[#8B0000] text-white text-xs px-2 py-1 rounded hover:bg-red-800"
                        >
                          Lihat File
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Image
                          src="/download-bukti.png"
                          alt="Upload"
                          width={24}
                          height={24}
                          className="w-6 h-6"
                        />
                        <span className="text-gray-500 text-sm">
                          Klik untuk mengunggah file <span className="text-red-700 font-semibold">raport</span>
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-base text-gray-500 mt-2">
                    *Scan terlebih dahulu seluruh raport dan gabungkan menjadi 1 file dengan format PDF
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <label className="text-base font-semibold w-1/3">
                  Foto Sertifikat/ Surat Keterangan Mengikuti PKL
                </label>
                <div className="w-2/3">
                  <div className="border-2 border-dashed rounded p-4 flex flex-col items-center justify-center relative cursor-pointer hover:bg-gray-100">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => handleFileUpload(e, 'pkl')}
                    />
                    {uploadedFiles['pkl'] ? (
                      <div className="relative w-full">
                        <Image
                          src={uploadedFiles['pkl']}
                          alt="Uploaded PKL"
                          width={200}
                          height={96}
                          className="max-w-full max-h-24 object-contain mx-auto"
                        />
                        <button
                          onClick={() => handleDeleteFile('pkl')}
                          className="absolute top-0 right-0 bg-[#8B0000] text-white text-sm w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-800"
                        >
                          X
                        </button>
                        <button
                          onClick={() => openFile(uploadedFiles['pkl'])}
                          className="absolute bottom-0 right-0 bg-[#8B0000] text-white text-xs px-2 py-1 rounded hover:bg-red-800"
                        >
                          Lihat File
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Image
                          src="/download-bukti.png"
                          alt="Upload"
                          width={24}
                          height={24}
                          className="w-6 h-6"
                        />
                        <span className="text-gray-500 text-sm">
                          Klik untuk mengunggah file <span className="text-red-700 font-semibold">PKL</span>
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-base text-gray-500 mt-1">
                    *Scan terlebih dahulu sertifikat/surat keterangan, ubah menjadi 1 file dengan format PDF
                  </p>
                </div>
              </div>

              <h4 className="font-semibold text-base">2.2 Bukti Administratif</h4>

              <div className="flex items-start gap-4">
                <label className="text-base font-semibold w-1/3">Foto Kartu Pelajar</label>
                <div className="w-2/3">
                  <div className="border-2 border-dashed rounded p-4 flex flex-col items-center justify-center relative cursor-pointer hover:bg-gray-100">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => handleFileUpload(e, 'kartu-pelajar')}
                    />
                    {uploadedFiles['kartu-pelajar'] ? (
                      <div className="relative w-full">
                        <Image
                          src={uploadedFiles['kartu-pelajar']}
                          alt="Uploaded Kartu Pelajar"
                          width={200}
                          height={96}
                          className="max-w-full max-h-24 object-contain mx-auto"
                        />
                        <button
                          onClick={() => handleDeleteFile('kartu-pelajar')}
                          className="absolute top-0 right-0 bg-[#8B0000] text-white text-sm w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-800"
                        >
                          X
                        </button>
                        <button
                          onClick={() => openFile(uploadedFiles['kartu-pelajar'])}
                          className="absolute bottom-0 right-0 bg-[#8B0000] text-white text-xs px-2 py-1 rounded hover:bg-red-800"
                        >
                          Lihat File
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Image
                          src="/download-bukti.png"
                          alt="Upload"
                          width={24}
                          height={24}
                          className="w-6 h-6"
                        />
                        <span className="text-gray-500 text-sm">
                          Klik untuk mengunggah file <span className="text-red-700 font-semibold">Kartu Pelajar</span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <label className="text-base font-semibold w-1/3">Foto KK/KTP</label>
                <div className="w-2/3">
                  <div className="border-2 border-dashed rounded p-4 flex flex-col items-center justify-center relative cursor-pointer hover:bg-gray-100">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => handleFileUpload(e, 'kk-ktp')}
                    />
                    {uploadedFiles['kk-ktp'] ? (
                      <div className="relative w-full">
                        <Image
                          src={uploadedFiles['kk-ktp']}
                          alt="Uploaded KK/KTP"
                          width={200}
                          height={96}
                          className="max-w-full max-h-24 object-contain mx-auto"
                        />
                        <button
                          onClick={() => handleDeleteFile('kk-ktp')}
                          className="absolute top-0 right-0 bg-[#8B0000] text-white text-sm w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-800"
                        >
                          X
                        </button>
                        <button
                          onClick={() => openFile(uploadedFiles['kk-ktp'])}
                          className="absolute bottom-0 right-0 bg-[#8B0000] text-white text-xs px-2 py-1 rounded hover:bg-red-800"
                        >
                          Lihat File
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Image
                          src="/download-bukti.png"
                          alt="Upload"
                          width={24}
                          height={24}
                          className="w-6 h-6"
                        />
                        <span className="text-gray-500 text-sm">
                          Klik untuk mengunggah file <span className="text-red-700 font-semibold">KK/KTP</span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <label className="text-base font-semibold w-1/3">Pas Foto 3x4</label>
                <div className="w-2/3">
                  <div className="border-2 border-dashed rounded p-4 flex flex-col items-center justify-center relative cursor-pointer hover:bg-gray-100">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => handleFileUpload(e, 'pas-foto')}
                    />
                    {uploadedFiles['pas-foto'] ? (
                      <div className="relative w-full">
                        <Image
                          src={uploadedFiles['pas-foto']}
                          alt="Uploaded Pas Foto"
                          width={200}
                          height={96}
                          className="max-w-full max-h-24 object-contain mx-auto"
                        />
                        <button
                          onClick={() => handleDeleteFile('pas-foto')}
                          className="absolute top-0 right-0 bg-[#8B0000] text-white text-sm w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-800"
                        >
                          X
                        </button>
                        <button
                          onClick={() => openFile(uploadedFiles['pas-foto'])}
                          className="absolute bottom-0 right-0 bg-[#8B0000] text-white text-xs px-2 py-1 rounded hover:bg-red-800"
                        >
                          Lihat File
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Image
                          src="/download-bukti.png"
                          alt="Upload"
                          width={24}
                          height={24}
                          className="w-6 h-6"
                        />
                        <span className="text-gray-500 text-sm">
                          Klik untuk mengunggah file <span className="text-red-700 font-semibold">Pas Foto</span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-10 px-4">
            <button
              className="bg-[#8B0000] text-white px-6 py-2 rounded-full"
              onClick={() => router.back()}
            >
              Batal
            </button>
            <button
              className="bg-[#8B0000] text-white px-6 py-2 rounded-full"
              onClick={() => router.push('/student/daftar/APL2')}
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Daftar;