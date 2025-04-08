import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Informasi', href: '/informasi' },
    { name: 'Galeri', href: '/galeri' },
    { name: 'Download', href: '/download' },
    { name: 'Hubungi Kami', href: '/hubungi-kami' },
  ];

  const authLinks = [
    { name: 'Login', href: '/login' },
    { name: 'Register', href: '/register/peserta' },
  ];

  const isActive = (href: string) => router.pathname === href;

  return (
    <nav className="border-b px-4 py-1 bg-white relative z-20 shadow">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center ml-2 md:ml-8">
          <img src="/icon.png" alt="Logo" className="h-20 w-auto object-contain" />
        </div>

        {/* Hamburger Icon on Mobile */}
        <div className="md:hidden z-30">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 justify-between items-center px-8">
          <div className="flex justify-center flex-1 space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`font-semibold text-black hover:text-red-500 ${
                  isActive(link.href) ? 'text-red-600' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="h-10 border-l border-black mx-2"></div>
            <Link
              href={authLinks[0].href}
              className={`font-semibold text-red-600 hover:underline ${
                isActive(authLinks[0].href) ? 'underline' : ''
              }`}
            >
              {authLinks[0].name}
            </Link>
            <Link
              href={authLinks[1].href}
              className={`font-semibold px-4 py-1.5 rounded-lg ${
                isActive(authLinks[1].href)
                  ? 'bg-red-900 text-white'
                  : 'bg-[#8D0000] text-white hover:bg-red-900'
              }`}
            >
              {authLinks[1].name}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          menuOpen ? 'max-h-[500px] mt-4' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col space-y-3 bg-white p-4 border rounded-xl shadow-md">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`block font-semibold text-black hover:text-red-500 px-2 transition-all ${
                isActive(link.href) ? 'text-red-500' : ''
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <hr />
          {/* Flex row: Login left, Register right */}
          <div className="flex justify-between items-center">
            <Link
              href={authLinks[0].href}
              className={`font-semibold text-red-600 hover:underline transition-all ${
                isActive(authLinks[0].href) ? 'underline' : ''
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {authLinks[0].name}
            </Link>
            <Link
              href={authLinks[1].href}
              className={`font-semibold px-4 py-1.5 rounded-lg transition-all ${
                isActive(authLinks[1].href)
                  ? 'bg-red-900 text-white'
                  : 'bg-[#8D0000] text-white hover:bg-red-900'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {authLinks[1].name}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;