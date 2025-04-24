
'use client';

 
import Navbar from '../../components/user/Navbar';
import Footer from '../../components/user/Footer';
import Header from '../../components/Header';

export default function Admin() {
  return (
    <div className="min-h-screen font-poppins bg-white">
      <Navbar />
      <Header />

      {/* Section for the five boxes */}
      <div className="flex flex-wrap justify-center gap-4 pt-10 pb-28 max-w-[896px] mx-auto">
        {/* Box 1: JADWAL ASESMEN */}
        <div
          className="bg-white border border-gray-200 rounded-lg shadow-md w-72 min-h-40"
          role="region"
          aria-label="Jadwal Asesmen"
        >
          <div className="bg-red-800 text-white text-center py-2 rounded-t-lg">
            <p className="text-base font-semibold">JADWAL ASESMEN</p>
          </div>
          <div className="text-center py-6">
            <p className="text-4xl font-bold">12</p>
          </div>
        </div>

        {/* Box 2: TEMPAT UJI KOMPETENSI */}
        <div
          className="bg-white border border-gray-200 rounded-lg shadow-md w-72 min-h-40"
          role="region"
          aria-label="Tempat Uji Kompetensi"
        >
          <div className="bg-red-800 text-white text-center py-2 rounded-t-lg">
            <p className="text-base font-semibold">TEMPAT UJI KOMPETENSI</p>
          </div>
          <div className="text-center py-6">
            <p className="text-4xl font-bold">12</p>
          </div>
        </div>

        {/* Box 3: DATA ASESOR */}
        <div
          className="bg-white border border-gray-200 rounded-lg shadow-md w-72 min-h-40"
          role="region"
          aria-label="Data Asesor"
        >
          <div className="bg-red-800 text-white text-center py-2 rounded-t-lg">
            <p className="text-base font-semibold">DATA ASESOR</p>
          </div>
          <div className="text-center py-6">
            <p className="text-4xl font-bold">12</p>
          </div>
        </div>

        {/* Box 4: TOTAL SKEMA */}
        <div
          className="bg-white border border-gray-200 rounded-lg shadow-md w-72 min-h-40"
          role="region"
          aria-label="Total Skema"
        >
          <div className="bg-red-800 text-white text-center py-2 rounded-t-lg">
            <p className="text-base font-semibold">TOTAL SKEMA</p>
          </div>
          <div className="text-center py-6">
            <p className="text-4xl font-bold">12</p>
          </div>
        </div>

        {/* Box 5: TOTAL PESERTA */}
        <div
          className="bg-white border border-gray-200 rounded-lg shadow-md w-72 min-h-40"
          role="region"
          aria-label="Total Peserta"
        >
          <div className="bg-red-800 text-white text-center py-2 rounded-t-lg">
            <p className="text-base font-semibold">TOTAL PESERTA</p>
          </div>
          <div className="text-center py-6">
            <p className="text-4xl font-bold">12</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}