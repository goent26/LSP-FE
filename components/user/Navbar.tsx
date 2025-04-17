'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] });

const logo = '/icon.png';
const orang = '/user_icon.png';


const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [helpDropdownOpen, setHelpDropdownOpen] = useState(false);

  const helpRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (helpRef.current && !helpRef.current.contains(event.target as Node)) {
        setHelpDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isAsesor = pathname.startsWith('/Asesor');
  const isHelpActive =
    pathname.startsWith('/student/hubungi-kami') || pathname.startsWith('/student/FAQ');

  return (
    <nav className={`flex justify-between items-center px-6 py-4 shadow ${poppins.className}`}>
      {/* Logo */}
      <div className="flex items-center space-x-2 ml-12"> {/* Lebih ke kanan */}
        <Image src={logo} alt="Logo" width={72} height={72} className="object-contain" />
      </div>

      {/* Navigasi */}
      <div className="flex items-center space-x-8 font-semibold">
        {isAsesor ? (
          <>
            <Link href="/Asesor" className={pathname === '/Asesor' ? 'text-red-700 font-bold' : 'text-black'}>
              Beranda
            </Link>
            <Link href="/Asesor/penilaian" className={pathname === '/Asesor/penilaian' ? 'text-red-700 font-bold' : 'text-black'}>
              Penilaian
            </Link>
            <Link href="/Asesor/skema" className={pathname === '/Asesor/skema' ? 'text-red-700 font-bold' : 'text-black'}>
              Skema
            </Link>
            <Link href="/Asesor/jadwal" className={pathname === '/Asesor/jadwal' ? 'text-red-700 font-bold' : 'text-black'}>
              Jadwal
            </Link>
            <Link href="/Asesor/data-peserta" className={pathname === '/Asesor/data-peserta' ? 'text-red-700 font-bold' : 'text-black'}>
              Data Peserta
            </Link>
            <Link href="/Asesor/download" className={pathname === '/Asesor/download' ? 'text-red-700 font-bold' : 'text-black'}>
              Download
            </Link>
          </>
        ) : (
          <>
            <Link href="/student" className={pathname === '/student' ? 'text-red-700 font-bold' : 'text-black'}>
              Beranda
            </Link>
            <Link href="/student/HasilAsesmen" className={pathname === '/student/HasilAsesmen' ? 'text-red-700 font-bold' : 'text-black'}>
              Hasil Asesmen
            </Link>
            <div className="relative" ref={helpRef}>
              <button
                onClick={() => setHelpDropdownOpen(!helpDropdownOpen)}
                className="flex items-center space-x-1 text-black focus:outline-none"
              >
                <span className={`font-bold ${isHelpActive ? 'text-red-700' : 'text-black'}`}>Bantuan</span>
                <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.24 4.64a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {helpDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow z-10 text-sm">
                  <Link
                    href="/student/hubungi-kami"
                    className={`block px-4 py-2 text-black hover:bg-gray-100 ${pathname === '/student/hubungi-kami' ? 'font-bold text-red-700' : ''
                      }`}
                    onClick={() => setHelpDropdownOpen(false)}
                  >
                    Hubungi Kami
                  </Link>
                  <Link
                    href="/student/FAQ"
                    className={`block px-4 py-2 text-black hover:bg-gray-100 ${pathname === '/student/FAQ' ? 'font-bold text-red-700' : ''
                      }`}
                    onClick={() => setHelpDropdownOpen(false)}
                  >
                    FAQ
                  </Link>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Profile Icon with Dropdown */}
      <div className="relative mr-12" ref={profileRef}> {/* Lebih ke kiri */}
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center space-x-2 focus:outline-none"
        >
          <Image src={orang} alt="Profile" width={42} height={42} className="rounded-full" />
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow z-10 text-sm">
            <Link
              href={isAsesor ? '/Asesor/profile' : '/student/profile'}
              className="block px-4 py-2 text-black hover:bg-gray-100"
              onClick={() => setDropdownOpen(false)}
            >
              Profile
            </Link>
            <Link
              href="/login"
              className="block px-4 py-2 text-black hover:bg-gray-100"
              onClick={() => {
                localStorage.removeItem('lsp-token');
                setDropdownOpen(false)
              }}
            >
              Logout
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
