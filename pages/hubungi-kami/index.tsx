import React from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Image from 'next/image';
import { User, Home, MessageSquare, Mail, Phone } from 'lucide-react';

const HubungiKami: React.FC = () => {
  return (
    <div className="bg-white text-black relative overflow-hidden font-['Poppins']">
      <Head>
        <title>Hubungi Kami - LSP SMKN 58 Jakarta</title>
      </Head>

      <Navbar />

      {/* SECTION BACKGROUND CONTAINER */}
      <section
        className="relative z-0 pt-10 pb-20 bg-white bg-no-repeat"
        style={{
          backgroundImage: "url('/hubungikami.png')",
          backgroundSize: '30% auto',
          backgroundPosition: 'top right',
        }}
      >
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-20 xl:px-28 relative z-10">
          {/* Judul */}
          <h1 className="text-2xl md:text-3xl font-semibold mb-10 tracking-wide text-black">
            HUBUNGI KAMI
          </h1>

          {/* Konten utama */}
          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* FORM */}
            <form className="space-y-4 w-full">
              <div>
                <label className="block font-medium text-sm mb-1">Nama Lengkap</label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Nama Lengkap"
                    className="w-full border border-gray-300 p-3 pl-10 rounded-md focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-sm mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full border border-gray-300 p-3 pl-10 rounded-md focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-sm mb-1">No. Telepon</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="No Telepon"
                    className="w-full border border-gray-300 p-3 pl-10 rounded-md focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-sm mb-1">Alamat</label>
                <div className="relative">
                  <Home className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Alamat"
                    className="w-full border border-gray-300 p-3 pl-10 rounded-md focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                  <textarea
                    placeholder="Tuangkan Pesan Anda"
                    className="w-full border border-gray-300 p-3 pl-10 pt-3 rounded-md h-60 resize-none focus:outline-none"
                  ></textarea>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-[#8B0000] text-white font-bold py-3 w-full rounded-md text-base tracking-widest hover:bg-red-800 transition duration-300"
                >
                  KIRIM
                </button>
              </div>
            </form>

            {/* MAP + KONTAK */}
            <div className="flex flex-col justify-between h-full w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.579543013888!2d106.89595717499246!3d-6.186844360519391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3c6834b8487%3A0x469f1987fded3f06!2sState%20Vocational%20High%20School%2058%20Jakarta!5e0!3m2!1sen!2sid!4v1712564053795!5m2!1sen!2sid"
                width="100%"
                height="340"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="rounded-md"
              ></iframe>

              <h2 className="text-2xl font-semibold mt-8 mb-4 tracking-wide text-black text-center">
                KONTAK
              </h2>

              <div className="flex flex-row flex-wrap gap-4 justify-center mt-4">
                <div className="bg-[#8B0000] text-white rounded-md flex flex-col justify-center items-center h-44 w-44 p-3 text-center">
                  <Image src="/mail.png" alt="Mail Icon" width={48} height={48} className="mb-2" />
                  <p className="text-sm">admin@lsp.id</p>
                </div>

                <div className="bg-[#8B0000] text-white rounded-md flex flex-col justify-center items-center h-44 w-44 p-3 text-center">
                  <Image src="/map.png" alt="Map Icon" width={48} height={48} className="mb-2" />
                  <p className="text-sm">Bambu Apus,<br />Jakarta 13890</p>
                </div>

                <div className="bg-[#8B0000] text-white rounded-md flex flex-col justify-center items-center h-44 w-44 p-3 text-center">
                  <Image src="/phone.png" alt="Phone Icon" width={48} height={48} className="mb-2" />
                  <p className="text-sm">(021) 8446304</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HubungiKami;
