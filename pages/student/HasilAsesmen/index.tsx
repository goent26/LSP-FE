'use client';

import Navbar from '../../../components/user/Navbar';
import Footer from '../../../components/user/Footer';

export default function HasilAsesmenPage() {
  return (
    <div className="min-h-screen font-poppins bg-white">
      <Navbar />
      
      <main className="pt-5 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto py-10">
          {/* Header Merah */}
          <div className="bg-red-800 text-center py-3 rounded-t-xl">
            <h1 className="text-lg font-semibold text-white">Hasil Asesmen</h1>
          </div>

          {/* Konten tabel */}
          <div className="bg-white border rounded-b-xl shadow px-6 py-8">
            <div className="grid grid-cols-4 font-semibold text-center mb-4">
              <div>Nama</div>
              <div>Skema</div>
              <div>Jurusan</div>
              <div>Hasil</div>
            </div>

            <div className="grid grid-cols-4 text-center text-sm">
              <div>Muhammad Deni</div>
              <div>
                Skema Okupasi<br />
                Junior Operator<br />
                Desain Grafis<br />
                (DKV)
              </div>
              <div>
                Desain Komunikasi<br />
                Visual
              </div>
              <div>
                <span className="bg-green-700 text-white px-4 py-1 rounded-lg text-sm font-medium inline-block">
                  Kompeten
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
