'use client';

import Navbar from '../../../components/user/Navbar';
import Footer from '../../../components/user/Footer';

export default function HasilAsesmenPage() {
  return (
    <div className="min-h-screen font-poppins bg-gray-50">
      <Navbar />
      
      <main className="pt-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto py-8 sm:py-12">
          {/* Header Merah */}
          <div className="bg-gradient-to-r from-red-800 to-red-900 text-center py-4 sm:py-5 rounded-t-2xl shadow-lg transform transition-all duration-300">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Hasil Asesmen
            </h1>
          </div>

          {/* Konten tabel */}
          <div className="bg-white border border-gray-100 rounded-b-2xl shadow-xl px-4 sm:px-6 py-8 sm:py-10 transform transition-all duration-300">
            {/* Scrollable Container */}
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <div className="min-w-[640px]">
                {/* Header Grid */}
                <div className="grid grid-cols-4 font-semibold text-center mb-6 text-gray-800">
                  <div>Nama</div>
                  <div>Skema</div>
                  <div>Jurusan</div>
                  <div>Hasil</div>
                </div>

                {/* Data Grid */}
                <div className="grid grid-cols-4 gap-4 text-center text-sm sm:text-base">
                  <div className="text-gray-800">Muhammad Deni</div>
                  <div className="text-gray-800">
                    Skema Okupasi<br />
                    Junior Operator<br />
                    Desain Grafis<br />
                    (DKV)
                  </div>
                  <div className="text-gray-800">
                    Desain Komunikasi<br />
                    Visual
                  </div>
                  <div>
                    <span className="bg-green-600 text-white px-4 py-1.5 rounded-full text-sm font-medium inline-block shadow-sm hover:bg-green-700 transition-colors duration-200">
                      Kompeten
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}