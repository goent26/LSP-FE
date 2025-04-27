'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Poppins } from 'next/font/google';
import { Menu, X, ChevronDown } from 'lucide-react';
import Cookies from 'js-cookie'



const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] });

const logo = '/icon.png';
const orang = '/user_icon.png';
const arrow = '/panah-icon.png';

const Navbar: React.FC = () => {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [helpDropdownOpen, setHelpDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const helpRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname() || '';


  // Handle click outside to close dropdowns
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

  // Memoized event handlers
  const toggleHelpDropdown = useCallback(() => {
    setHelpDropdownOpen((prev) => !prev);
  }, []);

  const toggleProfileDropdown = useCallback(() => {
    setDropdownOpen((prev) => !prev);
  }, []);

  const closeHelpDropdown = useCallback(() => {
    setHelpDropdownOpen(false);
  }, []);

  const closeProfileDropdown = useCallback(() => {
    setDropdownOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
    // Close dropdowns when toggling mobile menu
    setHelpDropdownOpen(false);
    setDropdownOpen(false);
  }, []);

  // Handle logout
  const handleLogout = useCallback(() => {
    // Remove tokens from Cookies
    Cookies.remove('lsp-token', { path: '/' });
    Cookies.remove('lsp-role', { path: '/' });

    // Remove token from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('lsp-token');
    }

    // Close dropdowns and mobile menu
    setDropdownOpen(false);
    setMobileMenuOpen(false);

    // Redirect to login page
    router.push('/login');
  }, [router]);

  const isAdmin = pathname.startsWith('/admin');
  const isAsesor = pathname.startsWith('/Asesor');
  const isHelpActive =
    pathname.startsWith('/student/hubungi-kami') ||
    pathname.startsWith('/student/FAQ');
  const isAdminBeranda = pathname === '/admin' || pathname === '/admin/';
  const isDataActive = pathname.startsWith('/admin/Data');

  return (
    <nav
      className={`flex justify-between items-center px-4 sm:px-6 py-3 bg-white shadow-md ${poppins.className}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <style jsx global>{`
        .min-h-[48px] {
          min-height: 48px;
        }
        .text-red-700 {
          color: #b91c1c;
        }
        .bg-white {
          background-color: #fff;
        }
      `}</style>

      {/* Logo */}
      <div className="flex items-center space-x-2 ml-3 sm:ml-8">
        <Link href={isAdmin ? '/admin' : isAsesor ? '/Asesor' : '/student'} aria-label="Home">
          <Image
            src={logo}
            alt="Logo"
            width={40}
            height={40}
            className="object-contain sm:w-16 sm:h-16"
            priority
            sizes="(max-width: 640px) 40px, 64px"
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div
        className="hidden md:flex items-center space-x-4 lg:space-x-6 font-semibold text-sm lg:text-base"
        aria-label="Primary navigation links"
      >
        {isAdmin ? (
          <>
            <Link
              href="/admin"
              className={`min-h-[48px] flex items-center hover:text-red-700 transition-colors ${isAdminBeranda ? 'text-red-700 font-bold' : 'text-black'
                }`}
              aria-current={isAdminBeranda ? 'page' : undefined}
            >
              Beranda
            </Link>
            <Link
              href="/admin/Data"
              className={`min-h-[48px] flex items-center hover:text-red-700 transition-colors ${isDataActive ? 'text-red-700 font-bold' : 'text-black'
                }`}
              aria-current={isDataActive ? 'page' : undefined}
            >
              Data
            </Link>
            <Link
              href="/admin/Jadwal"
              className={`min-h-[48px] flex items-center hover:text-red-700 transition-colors ${pathname === '/admin/Jadwal' ? 'text-red-700 font-bold' : 'text-black'
                }`}
              aria-current={pathname === '/admin/Jadwal' ? 'page' : undefined}
            >
              Jadwal
            </Link>
            <Link
              href="/admin/Penempatan"
              className={`min-h-[48px] flex items-center hover:text-red-700 transition-colors ${pathname === '/admin/Penempatan' ? 'text-red-700 font-bold' : 'text-black'
                }`}
              aria-current={pathname === '/admin/Penempatan' ? 'page' : undefined}
            >
              Penempatan
            </Link>
            <Link
              href="/admin/Media"
              className={`min-h-[48px] flex items-center hover:text-red-700 transition-colors ${pathname === '/admin/Media' ? 'text-red-700 font-bold' : 'text-black'
                }`}
              aria-current={pathname === '/admin/Media' ? 'page' : undefined}
            >
              Media
            </Link>
          </>
        ) : isAsesor ? (
          <>
            <Link
              href="/Asesor"
              className={`min-h-[48px] flex items-center hover:text-red-700 transition-colors ${pathname === '/Asesor' ? 'text-red-700 font-bold' : 'text-black'
                }`}
              aria-current={pathname === '/Asesor' ? 'page' : undefined}
            >
              Beranda
            </Link>
            <Link
              href="/Asesor/data-peserta"
              className={`min-h-[48px] flex items-center hover:text-red-700 transition-colors ${pathname === '/Asesor/data-peserta' ? 'text-red-700 font-bold' : 'text-black'
                }`}
              aria-current={pathname === '/Asesor/data-peserta' ? 'page' : undefined}
            >
              Data Peserta
            </Link>
            <Link
              href="/Asesor/jadwal"
              className={`min-h-[48px] flex items-center hover:text-red-700 transition-colors ${pathname === '/Asesor/jadwal' ? 'text-red-700 font-bold' : 'text-black'
                }`}
              aria-current={pathname === '/Asesor/jadwal' ? 'page' : undefined}
            >
              Jadwal
            </Link>
            <Link
              href="/Asesor/skema"
              className={`min-h-[48px] flex items-center hover:text-red-700 transition-colors ${pathname === '/Asesor/skema' ? 'text-red-700 font-bold' : 'text-black'
                }`}
              aria-current={pathname === '/Asesor/skema' ? 'page' : undefined}
            >
              Skema
            </Link>
            <Link
              href="/Asesor/download"
              className={`min-h-[48px] flex items-center hover:text-red-700 transition-colors ${pathname === '/Asesor/download' ? 'text-red-700 font-bold' : 'text-black'
                }`}
              aria-current={pathname === '/Asesor/download' ? 'page' : undefined}
            >
              Download
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/student"
              className={`min-h-[48px] flex items-center hover:text-red-700 transition-colors ${pathname === '/student' ? 'text-red-700 font-bold' : 'text-black'
                }`}
              aria-current={pathname === '/student' ? 'page' : undefined}
            >
              Beranda
            </Link>
            <Link
              href="/student/HasilAsesmen"
              className={`min-h-[48px] flex items-center hover:text-red-700 transition-colors ${pathname === '/student/HasilAsesmen' ? 'text-red-700 font-bold' : 'text-black'
                }`}
              aria-current={pathname === '/student/HasilAsesmen' ? 'page' : undefined}
            >
              Hasil Asesmen
            </Link>
            <div className="relative" ref={helpRef}>
              <button
                onClick={toggleHelpDropdown}
                className="flex items-center space-x-1 text-black focus:outline-none min-h-[48px]"
                aria-expanded={helpDropdownOpen}
                aria-controls="help-dropdown"
                aria-label="Toggle help menu"
              >
                <span className={`${isHelpActive ? 'text-red-700 font-bold' : 'text-black'}`}>
                  Bantuan
                </span>
                <ChevronDown
                  className={`w-4 h-4 ml-1 transition-transform ${helpDropdownOpen ? 'rotate-180' : ''
                    }`}
                />
              </button>
              {helpDropdownOpen && (
                <div
                  id="help-dropdown"
                  className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10 text-sm"
                  role="menu"
                >
                  <Link
                    href="/student/hubungi-kami"
                    className={`block px-4 py-2 text-black hover:bg-gray-100 min-h-[48px] ${pathname === '/student/hubungi-kami' ? 'font-bold text-red-700' : ''
                      }`}
                    onClick={closeHelpDropdown}
                    role="menuitem"
                  >
                    Hubungi Kami
                  </Link>
                  <Link
                    href="/student/FAQ"
                    className={`block px-4 py-2 text-black hover:bg-gray-100 min-h-[48px] ${pathname === '/student/FAQ' ? 'font-bold text-red-700' : ''
                      }`}
                    onClick={closeHelpDropdown}
                    role="menuitem"
                  >
                    FAQ
                  </Link>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Right Section: Hamburger and Profile Icons */}
      <div className="flex items-center space-x-2 sm:space-x-4 mr-3 sm:mr-8">
        {/* Hamburger Icon on Mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="focus:outline-none"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Profile Icon with Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={toggleProfileDropdown}
            className="flex items-center space-x-1 sm:space-x-2 focus:outline-none min-h-[48px]"
            aria-expanded={dropdownOpen}
            aria-controls="profile-dropdown"
            aria-label="Toggle profile menu"
          >
            <Image
              src={orang}
              alt="Profile"
              width={28}
              height={28}
              className="rounded-full sm:w-10 sm:h-10"
              priority
              sizes="(max-width: 640px) 28px, 40px"
            />
            <Image
              src={arrow}
              alt="Arrow"
              width={14}
              height={14}
              className={`sm:w-5 sm:h-5 transition-transform ${dropdownOpen ? 'rotate-180' : ''
                }`}
              sizes="(max-width: 640px) 14px, 20px"
            />
          </button>
          {dropdownOpen && (
            <div
              id="profile-dropdown"
              className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-30 text-sm animate-in fade-in duration-300"
              role="menu"
            >
              <Link
                href={isAdmin ? '/admin/profile' : isAsesor ? '/Asesor/profile' : '/student/profile'}
                className="block px-4 py-2 text-black hover:bg-gray-100 min-h-[48px]"
                onClick={closeProfileDropdown}
                role="menuitem"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-black hover:bg-gray-100 min-h-[48px]"
                role="menuitem"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-md border rounded-b-xl overflow-hidden transition-all duration-500 z-20 ${mobileMenuOpen ? 'max-h-[600px]' : 'max-h-0'
          }`}
      >
        <div className="flex flex-col p-4 space-y-2">
          {isAdmin ? (
            <>
              <Link
                href="/admin"
                className={`px-3 py-2 text-sm font-semibold rounded-md ${isAdminBeranda
                  ? 'text-red-700 bg-red-50'
                  : 'text-black hover:bg-gray-100'
                  }`}
                onClick={toggleMobileMenu}
              >
                Beranda
              </Link>
              <Link
                href="/admin/Data"
                className={`px-3 py-2 text-sm font-semibold rounded-md ${isDataActive
                  ? 'text-red-700 bg-red-50'
                  : 'text-black hover:bg-gray-100'
                  }`}
                onClick={toggleMobileMenu}
              >
                Data
              </Link>
              <Link
                href="/admin/Jadwal"
                className={`px-3 py-2 text-sm font-semibold rounded-md ${pathname === '/admin/Jadwal'
                  ? 'text-red-700 bg-red-50'
                  : 'text-black hover:bg-gray-100'
                  }`}
                onClick={toggleMobileMenu}
              >
                Jadwal
              </Link>
              <Link
                href="/admin/Penempatan"
                className={`px-3 py-2 text-sm font-semibold rounded-md ${pathname === '/admin/Penempatan'
                  ? 'text-red-700 bg-red-50'
                  : 'text-black hover:bg-gray-100'
                  }`}
                onClick={toggleMobileMenu}
              >
                Penempatan
              </Link>
              <Link
                href="/admin/Media"
                className={`px-3 py-2 text-sm font-semibold rounded-md ${pathname === '/admin/Media'
                  ? 'text-red-700 bg-red-50'
                  : 'text-black hover:bg-gray-100'
                  }`}
                onClick={toggleMobileMenu}
              >
                Media
              </Link>
            </>
          ) : isAsesor ? (
            <>
              <Link
                href="/Asesor"
                className={`px-3 py-2 text-sm font-semibold rounded-md ${pathname === '/Asesor'
                  ? 'text-red-700 bg-red-50'
                  : 'text-black hover:bg-gray-100'
                  }`}
                onClick={toggleMobileMenu}
              >
                Beranda
              </Link>
              <Link
                href="/Asesor/data-peserta"
                className={`px-3 py-2 text-sm font-semibold rounded-md ${pathname === '/Asesor/data-peserta'
                  ? 'text-red-700 bg-red-50'
                  : 'text-black hover:bg-gray-100'
                  }`}
                onClick={toggleMobileMenu}
              >
                Data Peserta
              </Link>
              <Link
                href="/Asesor/jadwal"
                className={`px-3 py-2 text-sm font-semibold rounded-md ${pathname === '/Asesor/jadwal'
                  ? 'text-red-700 bg-red-50'
                  : 'text-black hover:bg-gray-100'
                  }`}
                onClick={toggleMobileMenu}
              >
                Jadwal
              </Link>
              <Link
                href="/Asesor/skema"
                className={`px-3 py-2 text-sm font-semibold rounded-md ${pathname === '/Asesor/skema'
                  ? 'text-red-700 bg-red-50'
                  : 'text-black hover:bg-gray-100'
                  }`}
                onClick={toggleMobileMenu}
              >
                Skema
              </Link>
              <Link
                href="/Asesor/download"
                className={`px-3 py-2 text-sm font-semibold rounded-md ${pathname === '/Asesor/download'
                  ? 'text-red-700 bg-red-50'
                  : 'text-black hover:bg-gray-100'
                  }`}
                onClick={toggleMobileMenu}
              >
                Download
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/student"
                className={`px-3 py-2 text-sm font-semibold rounded-md ${pathname === '/student'
                  ? 'text-red-700 bg-red-50'
                  : 'text-black hover:bg-gray-100'
                  }`}
                onClick={toggleMobileMenu}
              >
                Beranda
              </Link>
              <Link
                href="/student/HasilAsesmen"
                className={`px-3 py-2 text-sm font-semibold rounded-md ${pathname === '/student/HasilAsesmen'
                  ? 'text-red-700 bg-red-50'
                  : 'text-black hover:bg-gray-100'
                  }`}
                onClick={toggleMobileMenu}
              >
                Hasil Asesmen
              </Link>
              <Link
                href="/student/hubungi-kami"
                className={`px-3 py-2 text-sm font-semibold rounded-md ${pathname === '/student/hubungi-kami'
                  ? 'text-red-700 bg-red-50'
                  : 'text-black hover:bg-gray-100'
                  }`}
                onClick={toggleMobileMenu}
              >
                Hubungi Kami
              </Link>
              <Link
                href="/student/FAQ"
                className={`px-3 py-2 text-sm font-semibold rounded-md ${pathname === '/student/FAQ'
                  ? 'text-red-700 bg-red-50'
                  : 'text-black hover:bg-gray-100'
                  }`}
                onClick={toggleMobileMenu}
              >
                FAQ
              </Link>
              <button
                onClick={handleLogout}
                className={`px-3 py-2 text-sm font-semibold rounded-md text-black hover:bg-gray-100 text-left`}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;