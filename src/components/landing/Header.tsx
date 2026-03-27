import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'motion/react';
import '../../styles/components/Header.css';

const navLinks = [
  { name: '회사소개', href: '#about' },
  { name: '포트폴리오', href: '#portfolio' },
  { name: '프로젝트 후기', href: '#reviews' },
  { name: '고객센터', href: '#faq' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Clear active link if scrolled to the very top
      if (window.scrollY < 100) {
        setActiveLink('');
      } else if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        // Reached the bottom of the page, activate the last link
        setActiveLink(navLinks[navLinks.length - 1].name);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Intersection Observer for scroll spy
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const activeNav = navLinks.find(link => link.href === `#${id}`);
          if (activeNav) {
            setActiveLink(activeNav.name);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navLinks.forEach(link => {
      const id = link.href.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, name: string) => {
    e.preventDefault();
    setActiveLink(name);
    setIsMobileMenuOpen(false);

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="header-fixed-wrap">
      <div className={`header-inner-box ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="header-left-group">
          <a href="#" onClick={(e) => {
            e.preventDefault();
            setActiveLink('');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} className="header-logo-link">
            <img src="/logo-black.png" alt="ONCHAEUMLAB" className="header-logo-img" />
          </a>

          {/* Desktop Nav */}
          <nav className="header-desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.name)}
                className={`header-nav-link ${activeLink === link.name ? 'is-active' : ''}`}
              >
                {activeLink === link.name && (
                  <motion.div
                    layoutId="headerActiveTab"
                    className="header-active-bg"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="header-nav-text">{link.name}</span>
              </a>
            ))}
          </nav>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="header-mobile-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {isMobileMenuOpen && (
        <div className="header-mobile-menu">
          <div className="header-mobile-nav-inner">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`header-mobile-nav-link ${activeLink === link.name ? 'is-active' : ''}`}
                onClick={(e) => handleNavClick(e, link.href, link.name)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
