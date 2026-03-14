import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '회사소개', href: '#about' },
    { name: '서비스', href: '#services' },
    { name: '포트폴리오', href: '#portfolio' },
    { name: '고객지원', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-black/90 backdrop-blur-md border-white/10 py-4' : 'bg-transparent border-black/10 py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <a href="#" className="flex items-center">
          <img src="/logo.png" alt="ONCHAEUM LAB" className="h-8 md:h-10 object-contain" />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10 items-center">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className={`text-sm font-bold transition-colors ${isScrolled ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-black'}`}>
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button className={`md:hidden ${isScrolled ? 'text-white' : 'text-black'}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black shadow-lg py-4 px-4 flex flex-col space-y-4 border-t border-white/10">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-white font-bold py-2 px-2 hover:bg-white/10 rounded-lg" onClick={() => setIsMobileMenuOpen(false)}>
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
