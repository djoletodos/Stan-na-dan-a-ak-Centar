import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MapPin, Map, Globe } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { useTranslation } from 'react-i18next';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith('sr') ? 'en' : 'sr';
    i18n.changeLanguage(newLang);
  };

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.apartment'), path: '/apartman' },
    { name: t('nav.location'), path: '/lokacija' },
    { name: t('nav.gallery'), path: '/galerija' },
    { name: t('nav.blog'), path: '/blog' },
    { name: t('nav.contact'), path: '/kontakt' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-[#FAF9F6] border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="font-heading text-2xl tracking-tight text-primary">
              CENTAR ČAČAK<span className="text-accent">.</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-xs uppercase tracking-widest font-medium transition-opacity ${
                    location.pathname === link.path ? 'border-b border-black text-primary opacity-100' : 'text-primary opacity-50 hover:opacity-100'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={toggleLanguage} className="flex items-center text-primary/70 hover:text-primary transition-colors uppercase text-xs font-bold tracking-widest mr-2">
                <Globe className="w-4 h-4 mr-1" />
                {i18n.language.startsWith('sr') ? 'EN' : 'SR'}
              </button>
              <a href="tel:+381648255735" className="flex items-center text-primary/70 hover:text-primary transition-colors">
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-xs uppercase tracking-widest font-medium">+3816482557350</span>
              </a>
              <Button asChild className="bg-[#1A1A1A] hover:bg-[#333] text-white rounded-none px-6 py-3 text-xs uppercase tracking-tighter transition-colors">
                <Link to="/kontakt">{t('nav.book')}</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button onClick={toggleLanguage} className="flex items-center text-primary/70 hover:text-primary transition-colors uppercase text-xs font-bold tracking-widest">
                <Globe className="w-4 h-4 mr-1" />
                {i18n.language.startsWith('sr') ? 'EN' : 'SR'}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary hover:text-accent focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#FAF9F6] border-b border-black/5">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 text-xs uppercase tracking-widest font-medium ${
                  location.pathname === link.path
                    ? 'text-primary border-l-2 border-black bg-black/5'
                    : 'text-primary/70 hover:text-primary hover:bg-black/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a href="tel:+38160000000" className="block px-3 py-2 text-xs uppercase tracking-widest font-medium text-primary/70 hover:text-primary">
              <Phone className="w-4 h-4 inline mr-2" />
              +381 60 000 000
            </a>
            <div className="px-3 py-2">
              <Button asChild className="w-full bg-[#1A1A1A] hover:bg-[#333] text-white rounded-none flex items-center justify-center text-xs uppercase tracking-tighter">
                <Link to="/kontakt" onClick={() => setIsOpen(false)}>{t('nav.bookNow')}</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
