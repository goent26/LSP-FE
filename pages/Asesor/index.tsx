'use client';

import Image from 'next/image';
import Navbar from '../../components/user/Navbar';
import Footer from '../../components/user/Footer';
import Header from '../../components/Header';

export default function Asesor() {
  return (
    <div className="min-h-screen font-poppins bg-white">
      <Navbar />
      <Header />

      {/* Section for the three boxes */}
      <div className="flex justify-center gap-4 pt-10 pb-28">
        {/* Box 1: TOTAL ASEMEN */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-md w-72 min-h-40">
          <div className="bg-red-800 text-white text-center py-2 rounded-t-lg">
            <p className="text-base font-semibold">TOTAL ASEMEN</p>
          </div>
          <div className="text-center py-6">
            <p className="text-4xl font-bold">12</p>
          </div>
        </div>

        {/* Box 2: JADWAL AKAN DATANG */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-md w-72 min-h-40">
          <div className="bg-red-800 text-white text-center py-2 rounded-t-lg">
            <p className="text-base font-semibold">JADWAL AKAN DATANG</p>
          </div>
          <div className="text-center py-6">
            <p className="text-4xl font-bold">12</p>
          </div>
        </div>

        {/* Box 3: TOTAL PESERTA */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-md w-72 min-h-40">
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