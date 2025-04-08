// components/Header.tsx
import React from 'react';
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

  // Conditionally set the background image based on the route
  let backgroundImage = 'landing.png'; // default image
  if (router.pathname === '/informasi') {
    backgroundImage = 'landing-informasi.png';
  } else if (router.pathname === '/galeri') {
    backgroundImage = 'landing-galeri.png';
  }

  // Conditionally render the text content
  const showTextContent = router.pathname !== '/galeri';

  return (
    <header className="relative w-full h-[500px] md:h-[600px]">
      <img src={backgroundImage} alt="Background" className="w-full h-full object-cover" />
      {showTextContent && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 header-text">
          <h2 className="text-3xl md:text-6xl font-bold">{title}</h2>
          <p className="text-lg md:text-2xl mt-4">{subtitle}</p>
          <p className="text-sm md:text-xl mt-2">{subtext}</p>
        </div>
      )}
    </header>
  );
};

export default Header;