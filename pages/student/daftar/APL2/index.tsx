// pages/student/daftar/APL2/index.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Footer from '../../../../components/user/Footer';

const Daftar = () => {
  const router = useRouter();
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (window.location.pathname !== '/student/daftar/APL2') {
      router.push('/student/daftar/APL2');
    }
    const storedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '{}');
    setUploadedFiles(storedFiles);
  }, [router]);

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

  const renderUploadBox = (fieldKey: string, label: string, catatan: string) => (
    <div className="flex items-start gap-4">
      <label className="text-base font-semibold w-1/3">{label}</label>
      <div className="w-2/3">
        <div className="border-2 border-dashed rounded p-4 flex flex-col items-center justify-center relative cursor-pointer hover:bg-gray-100">
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={(e) => handleFileUpload(e, fieldKey)}
          />
          {uploadedFiles[fieldKey] ? (
            <div className="relative w-full">
              <Image
                src={uploadedFiles[fieldKey]}
                alt={`Uploaded ${label}`}
                width={200}
                height={96}
                className="max-w-full max-h-24 object-contain mx-auto"
              />
              <button
                onClick={() => handleDeleteFile(fieldKey)}
                className="absolute top-0 right-0 bg-[#8B0000] text-white text-sm w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-800"
              >
                X
              </button>
              <button
                onClick={() => openFile(uploadedFiles[fieldKey])}
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
                Klik untuk mengunggah file <span className="text-red-700 font-semibold">{label}</span>
              </span>
            </div>
          )}
        </div>
        <p className="text-base text-gray-500 mt-2">{catatan}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-white min-h-screen">
      <nav className="bg-[#8B0000] py-4">
        <div className="container mx-auto flex justify-center items-center">
          <h1 className="text-white text-2xl font-bold">Pendaftaran</h1>
        </div>
      </nav>

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

      <div className="container mx-auto mt-8 px-4">
        <h2 className="font-bold text-base">FR–APL–01. FORMULIR PERMOHONAN SERTIFIKASI KOMPETENSI</h2>
        <h3 className="font-bold text-base mt-2">Bagian 1 : Rincian Data Permohonan Sertifikasi</h3>
        <p className="text-base mb-4">Pada bagian ini, cantumkan data pribadi, data pendidikan anda saat ini.</p>

        <div className="mt-8">
          <h3 className="font-bold text-base">Bagian 2: Bukti Kelengkapan Pemohon</h3>
          <h4 className="font-semibold text-base mt-2">2.1 Bukti Persyaratan Dasar Pemohon</h4>

          <div className="space-y-6 mt-4 px-4">
            {renderUploadBox(
              'raport',
              'Foto raport semester 1 s.d. 4',
              '*Scan terlebih dahulu seluruh raport dan gabungkan menjadi 1 file dengan format PDF'
            )}
            {renderUploadBox(
              'pkl',
              'Foto Sertifikat/ Surat Keterangan Mengikuti PKL',
              '*Scan terlebih dahulu sertifikat/surat keterangan, ubah menjadi 1 file dengan format PDF'
            )}
          </div>

          <h4 className="font-semibold text-base mt-6">2.2 Bukti Administratif</h4>

          <div className="space-y-6 mt-4 px-4">
            {renderUploadBox(
              'kartu-pelajar',
              'Foto Kartu Pelajar',
              '*Scan kartu pelajar dan pastikan gambar terlihat jelas'
            )}
            {renderUploadBox(
              'ktp',
              'Foto KTP/NIK',
              '*Scan atau foto dengan jelas KTP atau dokumen identitas lainnya'
            )}
          </div>
        </div>

        {/* Tombol Navigasi */}
        <div className="flex flex-col items-end mt-10 px-4 gap-4">
          <button
            className="bg-[#8B0000] text-white px-6 py-2 rounded-full w-full md:w-auto"
            onClick={() => router.push('/student/daftar/')}
          >
            Kembali
          </button>
          <button
            className="bg-[#8B0000] text-white px-6 py-2 rounded-full w-full md:w-auto"
            onClick={() => router.push('/student/daftar/APL2/3')}
          >
            Selanjutnya
          </button>
        </div>
      </div>

      <Footer />

      <style jsx global>{`
        body {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default Daftar;