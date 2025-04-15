'use client';

import { useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Navbar from '../../../components/user/Navbar';
import Footer from '../../../components/user/Footer';

export default function FAQ() {
  useEffect(() => {
    let currentlyOpen: HTMLElement | null = null;

    const handleClick = (item: HTMLElement) => {
      const icon = item.querySelector('img');
      const answerBox = item.querySelector('.answer-box');

      if (!icon || !answerBox) return;

      // If this item is already open, close it
      if (currentlyOpen === item) {
        answerBox.classList.remove('open');
        icon.classList.remove('rotate-180');
        item.classList.remove('expanded');
        currentlyOpen = null;
        return;
      }

      // Close any other open item
      if (currentlyOpen) {
        const openAnswerBox = currentlyOpen.querySelector('.answer-box');
        const openIcon = currentlyOpen.querySelector('img');
        if (openAnswerBox && openIcon) {
          openAnswerBox.classList.remove('open');
          openIcon.classList.remove('rotate-180');
          currentlyOpen.classList.remove('expanded');
        }
      }

      // Open the clicked item
      answerBox.classList.add('open');
      icon.classList.add('rotate-180');
      item.classList.add('expanded');
      currentlyOpen = item;
    };

    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item) => {
      item.addEventListener('click', () => handleClick(item as HTMLElement));
    });

    // Cleanup event listeners on unmount
    return () => {
      faqItems.forEach((item) => {
        item.removeEventListener('click', () => handleClick(item as HTMLElement));
      });
    };
  }, []);

  return (
    <div className="min-h-screen font-poppins bg-white">
      <Head>
        <title>FAQ & Contact</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Navbar />

      {/* FAQ Section with Background Image */}
      <section
        className="py-20 bg-cover bg-center bg-fixed relative"
        style={{ backgroundImage: "url('/landing-FAQ.png')" }}
      >
        <div className="absolute inset-0 bg-opacity-50"></div>
        
        <div className="relative max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6 tracking-wide text-white">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
            {/* FAQ Items */}
            <div className="faq-item shadow cursor-pointer bg-white bg-opacity-90">
              <div className="content flex justify-between items-center">
                <span>Apakah saya bisa mengubah informasi akun saya?</span>
                <div className="arrow-circle">
                  <Image
                    src="/panah-kebawah.png"
                    alt="Arrow"
                    width={20}
                    height={20}
                    className="transform transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="answer-box">
                <p>
                  Ya, Anda bisa mengubah informasi akun pada bagian profil secara
                  langsung. Jika ada informasi yang tidak dapat diubah, Anda dapat
                  mengajukan perubahan kepada admin.
                </p>
              </div>
            </div>
            
            <div className="faq-item shadow cursor-pointer bg-white bg-opacity-90">
              <div className="content flex justify-between items-center">
                <span>Apakah saya bisa mengubah informasi akun saya?</span>
                <div className="arrow-circle">
                  <Image
                    src="/panah-kebawah.png"
                    alt="Arrow"
                    width={20}
                    height={20}
                    className="transform transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="answer-box">
                <p>
                  Ya, Anda bisa mengubah informasi akun pada bagian profil secara
                  langsung. Jika ada informasi yang tidak dapat diubah, Anda dapat
                  mengajukan perubahan kepada admin.
                </p>
              </div>
            </div>
            
            <div className="faq-item shadow cursor-pointer bg-white bg-opacity-90">
              <div className="content flex justify-between items-center">
                <span>Apa saja persyaratan untuk mengikuti sertifikasi?</span>
                <div className="arrow-circle">
                  <Image
                    src="/panah-kebawah.png"
                    alt="Arrow"
                    width={20}
                    height={20}
                    className="transform transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="answer-box">
                <p>
                  Persyaratan sertifikasi LSP meliputi identitas diri, ijazah atau
                  sertifikat pelatihan, serta dokumen pendukung sesuai skema yang
                  dipilih.
                </p>
              </div>
            </div>
            
            <div className="faq-item shadow cursor-pointer bg-white bg-opacity-90">
              <div className="content flex justify-between items-center">
                <span>Apa saja persyaratan untuk mengikuti sertifikasi?</span>
                <div className="arrow-circle">
                  <Image
                    src="/panah-kebawah.png"
                    alt="Arrow"
                    width={20}
                    height={20}
                    className="transform transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="answer-box">
                <p>
                  Persyaratan sertifikasi LSP meliputi identitas diri, ijazah atau
                  sertifikat pelatihan, serta dokumen pendukung sesuai skema yang
                  dipilih.
                </p>
              </div>
            </div>
            
            <div className="faq-item shadow cursor-pointer bg-white bg-opacity-90">
              <div className="content flex justify-between items-center">
                <span>Bagaimana cara mendaftar untuk sertifikasi?</span>
                <div className="arrow-circle">
                  <Image
                    src="/panah-kebawah.png"
                    alt="Arrow"
                    width={20}
                    height={20}
                    className="transform transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="answer-box">
                <p>
                  Anda bisa mendaftar sertifikasi LSP dengan mengklik tombol Daftar
                  di halaman beranda, lalu mengisi formulir dengan mengunggah proses
                  yang ditentukan.
                </p>
              </div>
            </div>
            
            <div className="faq-item shadow cursor-pointer bg-white bg-opacity-90">
              <div className="content flex justify-between items-center">
                <span>Bagaimana cara mendaftar untuk sertifikasi?</span>
                <div className="arrow-circle">
                  <Image
                    src="/panah-kebawah.png"
                    alt="Arrow"
                    width={20}
                    height={20}
                    className="transform transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="answer-box">
                <p>
                  Anda bisa mendaftar sertifikasi LSP dengan mengklik tombol Daftar
                  di halaman beranda, lalu mengisi formulir dengan mengunggah proses
                  yang ditentukan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-4 max-w-5xl mx-auto">
        <h2 className="text-xl font-bold text-center mb-8 tracking-wide">
          MORE QUESTIONS? CONTACT US!
        </h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Nama Lengkap</label>
              <div className="flex items-center border rounded px-3 py-2">
                <Image
                  src="/user-icon.png"
                  alt="User Icon"
                  width={20}
                  height={20}
                  className="mr-2 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  className="w-full outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <div className="flex items-center border rounded px-3 py-2">
                <Image
                  src="/email-icon.png"
                  alt="Email Icon"
                  width={20}
                  height={20}
                  className="mr-2 text-gray-400"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full outline-none"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1">Pertanyaan Anda</label>
            <div className="flex items-start border rounded px-3 py-2">
              <Image
                src="/question-icon.png"
                alt="Question Icon"
                width={20}
                height={20}
                className="mr-2 mt-1 text-gray-400"
              />
              <textarea
                rows={6}
                className="w-full outline-none resize-none"
                placeholder="Pertanyaan Anda"
              ></textarea>
            </div>
          </div>
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-2 rounded"
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
        .faq-item.expanded {
          margin-bottom: 20px;
        }
        .faq-item .content {
          padding: 16px;
          border-bottom: 1px solid #d1d5db;
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
          transition: background-color 0.3s ease;
        }
        .faq-item:hover .content {
          background-color: #f9fafb;
        }
        .answer-box {
          background-color: #e6e5e5;
          padding: 0 16px 16px 16px;
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: max-height 0.5s ease, opacity 0.5s ease,
            padding-top 0.5s ease;
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
        }
        .answer-box.open {
          max-height: 200px;
          padding-top: 16px;
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