
import React, { useState, useEffect } from 'react';
import { BarChart4, Calendar, Menu, X, ArrowRight, Bell, Search, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navLinks = [
    { text: "Mérkőzések", href: "/matches", icon: <Calendar className="w-4 h-4" /> },
    { text: "Ranglista", href: "/leaderboard", icon: <BarChart4 className="w-4 h-4" /> },
    { text: "Élő mérkőzések", href: "/live", icon: <Trophy className="w-4 h-4" /> },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
      ? 'backdrop-blur-xl bg-black/30 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-b border-white/5' 
      : 'py-5'
    }`}>
      <div className="container px-4 mx-auto flex items-center justify-between">
        {/* Logo Component */}
        <Logo />
        
        {/* Desktop Navigation - Glassmorphism */}
        <nav className="hidden md:flex items-center gap-2">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-full pl-1 pr-1 py-1">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className={`flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-full transition-all duration-300
                  ${window.location.pathname === link.href 
                    ? 'bg-gradient-to-r from-blue-500/80 to-blue-600/80 text-white shadow-[0_2px_10px_rgba(59,130,246,0.3)]' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'}`}
              >
                {link.icon}
                {link.text}
              </Link>
            ))}
          </div>
          
          {/* Action Icons */}
          <div className="flex items-center ml-2 gap-1">
            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200">
              <Search className="w-4 h-4 text-gray-300" />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200 relative">
              <Bell className="w-4 h-4 text-gray-300" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500"></span>
            </button>
          </div>
        </nav>
        
        {/* User Section with Neumorphic buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link 
            to="/login" 
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 border-b border-transparent hover:border-white/50"
          >
            Bejelentkezés
          </Link>
          <Link 
            to="/signup" 
            className="group inline-flex items-center gap-1.5 relative overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 text-white text-sm font-medium px-5 py-2.5 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0_4px_20px_rgba(59,130,246,0.25)] transition-all duration-300"
          >
            <span className="relative z-10">Regisztráció</span>
            <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/80 to-blue-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </div>
        
        {/* Mobile Menu Toggle with Neomorphic effect */}
        <button 
          className="md:hidden flex items-center justify-center w-10 h-10 text-gray-200 bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.15)]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      
      {/* Mobile Menu with Glassmorphism */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[72px] bg-black/80 backdrop-blur-xl z-40 animate-fade-in">
          <div className="p-6 flex flex-col h-full">
            <div className="space-y-2 py-4">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300
                    ${window.location.pathname === link.href 
                      ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/30 text-white' 
                      : 'text-gray-300 hover:text-white hover:bg-white/5'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.icon}
                  {link.text}
                </Link>
              ))}
            </div>
            
            <div className="mt-auto pt-6 border-t border-gray-800/50 flex items-center gap-3">
              <Link 
                to="/login" 
                className="flex-1 py-3 text-center text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 border border-gray-700/30 rounded-xl bg-white/5 backdrop-blur-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Bejelentkezés
              </Link>
              <Link 
                to="/signup" 
                className="flex-1 py-3 text-center bg-gradient-to-r from-blue-500/80 to-blue-600/80 shadow-[0_4px_12px_rgba(59,130,246,0.25)] backdrop-blur-sm text-white text-sm font-medium rounded-xl"
                onClick={() => setMobileMenuOpen(false)}
              >
                Regisztráció
              </Link>
            </div>
            
            <div className="mt-6 text-center">
              <div className="text-xs text-gray-500">© 2025 WinMix Tipster. Minden jog fenntartva.</div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
