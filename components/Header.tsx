'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  subtext?: string;
}

const Header: React.FC<HeaderProps> = ({
  title = 'LEMBAGA SERTIFIKASI PROFESI',
  subtitle = 'TRUSTED CERTIFICATION FOR A COMPETITIVE WORKFORCE',
  subtext = 'SMKN 58 Jakarta',
}) => {
  const router = useRouter();

  const slideshowImages = [
    '/landing.png',
    '/landing-informasi.png',
    '/landing-galeri.png',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isStudent = router.pathname === '/student';
  const isAsesor = router.pathname === '/Asesor';

  const isSlideShowPage = isStudent || isAsesor;

  useEffect(() => {
    if (!isSlideShowPage) return;

    const slideDuration = 4000;
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === slideshowImages.length - 1 ? 0 : prevIndex + 1
      );
    }, slideDuration);

    return () => clearInterval(interval);
  }, [isSlideShowPage, slideshowImages.length]);

  let backgroundImage = '/landing.png';
  if (router.pathname === '/informasi') {
    backgroundImage = '/landing-informasi.png';
  } else if (router.pathname === '/galeri') {
    backgroundImage = '/landing-galeri.png';
  }

  const showTextContent = router.pathname !== '/galeri';

  const handleButtonClick = () => {
    if (isStudent) {
      router.push('/student/daftar/');
    } else if (isAsesor) {
      router.push('/Asesor/data-peserta');
    }
  };

  return (
    <header className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {isSlideShowPage ? (
        <div className="w-full h-full relative">
          {slideshowImages.map((image, index) => {
            const isActive = index === currentImageIndex;
            const isPrevious =
              index === (currentImageIndex - 1 + slideshowImages.length) % slideshowImages.length;

            let transformClass = '';
            let zIndex = 0;
            let transition = 'transition-transform duration-1000 ease-in-out';

            if (isActive) {
              transformClass = 'translate-x-0';
              zIndex = 10;
            } else if (isPrevious) {
              transformClass = '-translate-x-full';
              zIndex = 0;
            } else {
              transformClass = 'translate-x-full';
              zIndex = 0;
              transition = '';
            }

            return (
              <img
                key={index}
                src={image}
                alt={`Background ${index + 1}`}
                className={`w-full h-full object-cover absolute top-0 left-0 ${transition} ${transformClass}`}
                style={{ zIndex }}
              />
            );
          })}
        </div>
      ) : (
        <img src={backgroundImage} alt="Background" className="w-full h-full object-cover" />
      )}

      {/* Notifikasi hanya muncul di /Asesor */}
      {isAsesor && (
        <div className="absolute top-10 right-4 md:top-12 md:right-20 z-30">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
            <img src="/notif.png" alt="Notifikasi" className="w-10 h-10 object-contain" />
          </div>
        </div>
      )}

      {/* Konten Teks dan Tombol */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 header-text z-20">
        {showTextContent && (
          <>
            <h2 className="text-2xl md:text-5xl font-bold">{title}</h2>
            <p className="text-base md:text-xl mt-4">{subtitle}</p>
            <p className="text-xs md:text-lg mt-2">{subtext}</p>
          </>
        )}

        {(isStudent || isAsesor) && (
          <button
            className="mt-8 bg-red-700 text-white font-semibold py-4 px-16 rounded-lg text-base md:text-xl hover:bg-red-800 transition duration-300 shadow-lg"
            onClick={handleButtonClick}
          >
            {isAsesor ? 'Lihat Peserta' : 'Daftar'}
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;