export default function Footer() {
    return (
      <footer className="bg-black text-white py-10 font-poppins">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="pl-4">
            <h2 className="text-xl font-semibold mb-4">Berita Terkini</h2>
            <ul className="font-normal list-disc list-inside">
              <li>Visi & Misi LSP</li>
              <li>Sertifikat Kompetensi</li>
              <li>Sejarah LSP</li>
              <li>Wewenang, Tugas & Fungsi</li>
              <li>Struktur Organisasi LSP</li>
            </ul>
          </div>
          <div className="pl-6 md:pl-0">
            <h2 className="text-xl font-semibold mb-4">Link Terkait</h2>
            <ul className="font-normal">
              <li>BNSP</li>
              <li>KEMNAKER</li>
              <li>LSP SMKN 58</li>
            </ul>
          </div>
          <div className="pr-4 pl-6 md:pl-0">
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <div className="flex items-start mb-2 font-normal">
              <i className="fas fa-map-marker-alt mr-2 mt-1"></i>
              <p className="text-sm">Jl. SMIK Bambu Apus/ TMII, Kelurahan Bambu Apus, Kecamatan Cipayung, Jakarta Timur</p>
            </div>
            <div className="flex items-center mb-2 font-normal">
              <i className="fas fa-phone mr-2"></i>
              <p>082227516582</p>
            </div>
            <div className="flex items-center mb-2 font-normal">
              <i className="fas fa-fax mr-2"></i>
              <p>0218442072</p>
            </div>
            <div className="flex items-center mb-2 font-normal">
              <i className="fas fa-envelope mr-2"></i>
              <p>lspsmkn58@gmail.com</p>
            </div>
          </div>
          <div className="flex items-center justify-center pl-6 md:pl-0">
            <img alt="Logo" src="/icon.png" className="h-32 w-auto" />
          </div>
        </div>
      </footer>
    );
  }