'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

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
  const pathname = usePathname() || ''; // Fallback to empty string if undefined

  const slideshowImages = [
    '/landing.png',
    '/landing-informasi.png',
    '/landing-galeri.png',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isStudent = pathname === '/student';
  const isAsesor = pathname === '/Asesor';
  const isAdmin = pathname === '/admin';
  const isSlideShowPage = isStudent || isAsesor || isAdmin;

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
  if (pathname === '/informasi') {
    backgroundImage = '/landing-informasi.png';
  } else if (pathname === '/galeri') {
    backgroundImage = '/landing-galeri.png';
  }

  const showTextContent = pathname !== '/galeri';

  const handleButtonClick = () => {
    if (isStudent) {
      router.push('/student/daftar/');
    } else if (isAsesor) {
      router.push('/Asesor/data-peserta');
    }
  };

  const handleNotificationClick = () => {
    console.log('Notification clicked');
  };

  return (
    <header
      className="relative w-full h-[80vh] sm:h-[90vh] lg:h-[100vh] min-h-[300px] overflow-hidden"
      role="banner"
    >
      <div className="absolute inset-0 bg-black/50 z-3" aria-hidden="true" />
      {isSlideShowPage ? (
        <div className="w-full h-full relative">
          {slideshowImages.map((image, index) => {
            const isActive = index === currentImageIndex;
            const isPrevious =
              index === (currentImageIndex - 1 + slideshowImages.length) % slideshowImages.length;

            let transformClass = '';
            let opacityClass = '';
            let zIndex = 1;
            let transition = 'transition-all duration-1000 ease-in-out';

            if (isActive) {
              transformClass = 'translate-x-0';
              opacityClass = 'opacity-100';
              zIndex = 2;
            } else if (isPrevious) {
              transformClass = '-translate-x-full';
              opacityClass = 'opacity-0';
              zIndex = 1;
            } else {
              transformClass = 'translate-x-full';
              opacityClass = 'opacity-0';
              zIndex = 1;
              transition = '';
            }

            return (
              <Image
                key={index}
                src={image}
                alt={`Slideshow Image ${index + 1}`}
                width={1920}
                height={1080}
                className={`w-full h-full object-cover absolute top-0 left-0 ${transition} ${transformClass} ${opacityClass}`}
                style={{ zIndex }}
                loading={index === 0 ? 'eager' : 'lazy'}
                priority={index === 0}
              />
            );
          })}
        </div>
      ) : (
        <Image
          src={backgroundImage}
          alt="Header Background"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
          loading="eager"
          priority={true}
        />
      )}

      {/* Notification (Asesor Only) */}
      {isAsesor && (
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-12 lg:right-12 z-5">
          <div
            className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-gray-100 transition-colors duration-300"
            role="button"
            aria-label="Notifikasi"
            tabIndex={0}
            onClick={handleNotificationClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleNotificationClick();
              }
            }}
          >
            <Image
              src="/notif.png"
              alt="Notifikasi Ikon"
              width={40}
              height={40}
              className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 object-contain"
              loading="lazy"
            />
          </div>
        </div>
      )}

      {/* Text Content and Button */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 sm:px-6 lg:px-8 z-4">
        {showTextContent && (
          <div className="animate-in fade-in duration-700">
            <h2 className="text-xl sm:text-3xl lg:text-5xl font-bold tracking-tight">
              {title}
            </h2>
            <p className="text-sm sm:text-lg lg:text-xl mt-2 sm:mt-4 max-w-2xl">
              {subtitle}
            </p>
            <p className="text-xs sm:text-base lg:text-lg mt-1 sm:mt-2">
              {subtext}
            </p>
          </div>
        )}

        {(isStudent || isAsesor) && (
          <button
            className="mt-4 sm:mt-6 lg:mt-8 w-full max-w-[200px] sm:max-w-[250px] bg-gradient-to-r from-red-700 to-red-800 text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-xl text-sm sm:text-base lg:text-xl hover:from-red-800 hover:to-red-900 transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 animate-in zoom-in duration-700"
            onClick={handleButtonClick}
            aria-label={isAsesor ? 'Lihat Peserta' : 'Daftar'}
          >
            {isAsesor ? 'Lihat Peserta' : 'Daftar'}
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;