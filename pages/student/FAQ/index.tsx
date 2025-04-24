'use client';

import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Navbar from '../../../components/user/Navbar';
import Footer from '../../../components/user/Footer';

export default function FAQ() {
  const [activeItems, setActiveItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setActiveItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  const faqData = [
    {
      question: 'Apakah saya bisa mengubah informasi akun saya?',
      answer: 'Ya, Anda bisa mengubah informasi akun pada bagian profil secara langsung. Jika ada informasi yang tidak dapat diubah, Anda dapat mengajukan perubahan kepada admin.'
    },
    {
      question: 'Apakah saya bisa mengubah informasi akun saya?',
      answer: 'Ya, Anda bisa mengubah informasi akun pada bagian profil secara langsung. Jika ada informasi yang tidak dapat diubah, Anda dapat mengajukan perubahan kepada admin.'
    },
    {
      question: 'Apa saja persyaratan untuk mengikuti sertifikasi?',
      answer: 'Persyaratan sertifikasi LSP meliputi identitas diri, ijazah atau sertifikat pelatihan, serta dokumen pendukung sesuai skema yang dipilih.'
    },
    {
      question: 'Apa saja persyaratan untuk mengikuti sertifikasi?',
      answer: 'Persyaratan sertifikasi LSP meliputi identitas diri, ijazah atau sertifikat pelatihan, serta dokumen pendukung sesuai skema yang dipilih.'
    },
    {
      question: 'Bagaimana cara mendaftar untuk sertifikasi?',
      answer: 'Anda bisa mendaftar sertifikasi LSP dengan mengklik tombol Daftar di halaman beranda, lalu mengisi formulir dengan mengunggah proses yang ditentukan.'
    },
    {
      question: 'Bagaimana cara mendaftar untuk sertifikasi?',
      answer: 'Anda bisa mendaftar sertifikasi LSP dengan mengklik tombol Daftar di halaman beranda, lalu mengisi formulir dengan mengunggah proses yang ditentukan.'
    }
  ];

  return (
    <div className="min-h-screen font-poppins bg-white">
      <Head>
        <title>FAQ & Contact</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Navbar />

      {/* FAQ Section with Background Image */}
      <section
        className="py-12 md:py-20 bg-cover bg-center bg-fixed relative"
        style={{ backgroundImage: "url('/landing-FAQ.png')" }}
      >
        <div className="absolute inset-0 bg-opacity-50"></div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 tracking-wide text-white">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqData.map((item, index) => (
              <div 
                key={index}
                className={`faq-item shadow cursor-pointer bg-white bg-opacity-90 rounded-lg overflow-hidden transition-all duration-300 ${activeItems.includes(index) ? 'mb-4' : ''}`}
                onClick={() => toggleItem(index)}
              >
                <div className="content flex justify-between items-center p-4">
                  <span className="text-sm sm:text-base">{item.question}</span>
                  <div className="arrow-circle flex-shrink-0">
                    <Image
                      src="/panah-kebawah.png"
                      alt="Arrow"
                      width={20}
                      height={20}
                      className={`transform transition-transform duration-300 ${activeItems.includes(index) ? 'rotate-180' : ''}`}
                    />
                  </div>
                </div>
                <div 
                  className={`answer-box bg-gray-200 ${activeItems.includes(index) ? 'open' : ''}`}
                >
                  <p className="p-4 text-sm sm:text-base">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 max-w-5xl mx-auto">
        <h2 className="text-lg sm:text-xl font-bold text-center mb-6 sm:mb-8 tracking-wide">
          MORE QUESTIONS? CONTACT US!
        </h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs sm:text-sm mb-1">Nama Lengkap</label>
              <div className="flex items-center border rounded px-3 py-2">
                <Image
                  src="/user-icon.png"
                  alt="User Icon"
                  width={16}
                  height={16}
                  className="mr-2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5"
                />
                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  className="w-full outline-none text-xs sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs sm:text-sm mb-1">Email</label>
              <div className="flex items-center border rounded px-3 py-2">
                <Image
                  src="/email-icon.png"
                  alt="Email Icon"
                  width={16}
                  height={16}
                  className="mr-2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full outline-none text-xs sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-xs sm:text-sm mb-1">Pertanyaan Anda</label>
            <div className="flex items-start border rounded px-3 py-2">
              <Image
                src="/question-icon.png"
                alt="Question Icon"
                width={16}
                height={16}
                className="mr-2 mt-1 text-gray-400 w-4 h-4 sm:w-5 sm:h-5"
              />
              <textarea
                rows={4}
                className="w-full outline-none resize-none text-xs sm:text-sm"
                placeholder="Pertanyaan Anda"
              ></textarea>
            </div>
          </div>
          <div className="pt-2 sm:pt-4">
            <button
              type="submit"
              className="w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-2 rounded text-sm sm:text-base"
            >
              KIRIM
            </button>
          </div>
        </form>
      </section>

      <Footer />

      <style jsx>{`
        .arrow-circle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background-color: #8d0000;
          transition: transform 0.3s ease;
        }
        .faq-item {
          position: relative;
          align-self: start;
          border-radius: 8px;
          transition: margin-bottom 0.3s ease;
        }
        .faq-item .content {
          border-bottom: 1px solid #d1d5db;
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
          transition: background-color 0.3s ease;
        }
        .faq-item:hover .content {
          background-color: #f9fafb;
        }
        .answer-box {
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-height 0.5s ease, opacity 0.5s ease;
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
        }
        .answer-box.open {
          max-height: 200px;
          opacity: 1;
        }
        .answer-box p {
          transform: translateY(10px);
          opacity: 0;
          transition: transform 0.5s ease, opacity 0.5s ease;
        }
        .answer-box.open p {
          transform: translateY(0);
          opacity: 1;
        }
      `}</style>
    </div>
  );
}