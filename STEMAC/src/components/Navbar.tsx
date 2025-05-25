import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [mobileAboutExpanded, setMobileAboutExpanded] = useState(false);
  const location = useLocation();
  const aboutDropdownRef = useRef<HTMLDivElement>(null);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsOpen(false);
    setAboutDropdownOpen(false);
  }, [location]);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(event.target as Node)) {
        setAboutDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navigation = [
    { name: 'Mission', href: '/mission' },
    { name: 'Departments', href: '/departments' },
    { 
      name: 'About', 
      href: '#',
      submenu: [
        { name: 'Our Team', href: '/about' },
        { name: 'Founder', href: '/founder' }
      ]
    },
    { name: 'Events', href: '/events' },
  ];

  // Helper function to check if current path is in the About section
  const isInAboutSection = () => {
    return location.pathname === '/about' || location.pathname === '/founder';
  };

  return (
    <nav className={`bg-white shadow-lg sticky top-0 left-0 right-0 transition-all duration-300 z-50 ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between items-center transition-all duration-300 ${scrolled ? 'h-16' : 'h-20'}`}>
          <div className="flex items-center flex-1">
            <Link to="/" className="flex-shrink-0 flex flex-col items-center justify-center group mr-8">
              <div className="flex flex-col items-center">
                <img 
                  className={`transition-all duration-300 group-hover:scale-105 ${scrolled ? 'w-24' : 'w-32'}`}
                  src="/logo.svg" 
                  alt="CA Logo" 
                />
                <span className={`font-medium text-gray-800 tracking-wide transition-all duration-200 ${scrolled ? 'text-sm' : 'text-base'}`}>
                  Central Asia
                </span>
              </div>
            </Link>
            
            <div className="hidden md:ml-auto md:flex md:items-center md:space-x-6 lg:space-x-8">
              {navigation.map((item) => {
                // For items with submenu (About)
                if (item.submenu) {
                  return (
                    <div key={item.name} className="relative" ref={aboutDropdownRef}>
                      <button
                        onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                        className={`px-3 py-2 text-sm font-medium transition-colors duration-200 relative group inline-flex items-center
                          ${isInAboutSection() 
                            ? 'text-[#20a1d2]' 
                            : 'text-gray-700 hover:text-[#20a1d2]'
                          }`}
                      >
                        {item.name}
                        <svg className={`ml-1 w-4 h-4 transition-transform duration-200 ${aboutDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                        <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#20a1d2] transform transition-transform duration-200
                          ${isInAboutSection()
                            ? 'scale-x-100' 
                            : 'scale-x-0 group-hover:scale-x-100'
                          }`} 
                        />
                      </button>
                      
                      {/* Dropdown menu */}
                      {aboutDropdownOpen && (
                        <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 ring-1 ring-black ring-opacity-5">
                          {item.submenu.map((subitem) => (
                            <Link
                              key={subitem.name}
                              to={subitem.href}
                              className={`block px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200
                                ${location.pathname === subitem.href ? 'text-[#20a1d2] font-medium' : 'text-gray-700'}`}
                            >
                              {subitem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                
                // For regular items
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`px-3 py-2 text-sm font-medium transition-colors duration-200 relative group
                      ${location.pathname === item.href 
                        ? 'text-[#20a1d2]' 
                        : 'text-gray-700 hover:text-[#20a1d2]'
                      }`}
                  >
                    {item.name}
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#20a1d2] transform transition-transform duration-200
                      ${location.pathname === item.href 
                        ? 'scale-x-100' 
                        : 'scale-x-0 group-hover:scale-x-100'
                      }`} 
                    />
                  </Link>
                );
              })}
              <Link
                to="/join"
                className="ml-4 px-5 py-2 text-sm font-medium text-white bg-[#20a1d2] rounded-md hover:bg-[#1b86b0] transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Get Involved
              </Link>
            </div>
          </div>
          
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#20a1d2] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#20a1d2] transition-colors duration-200"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        id="mobile-menu"
        className={`${isOpen ? 'max-h-screen' : 'max-h-0'} md:hidden border-t border-gray-200 overflow-hidden transition-all duration-300 ease-in-out`}
      >
        <div className="pt-2 pb-3 space-y-1 bg-white">
          {navigation.map((item) => {
            // For items with submenu (About)
            if (item.submenu) {
              return (
                <div key={item.name}>
                  <button
                    onClick={() => setMobileAboutExpanded(!mobileAboutExpanded)}
                    className={`flex justify-between items-center w-full px-4 py-2 text-base font-medium transition-colors duration-200
                      ${isInAboutSection() 
                        ? 'text-[#20a1d2] bg-gray-50' 
                        : 'text-gray-700 hover:text-[#20a1d2] hover:bg-gray-50'
                      }`}
                  >
                    <span>{item.name}</span>
                    <svg 
                      className={`w-5 h-5 transition-transform duration-200 ${mobileAboutExpanded ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <div className={`pl-6 border-l-2 border-gray-100 ml-4 mt-1 overflow-hidden transition-all duration-300 ${
                    mobileAboutExpanded ? 'max-h-40' : 'max-h-0'
                  }`}>
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.name}
                        to={subitem.href}
                        className={`block px-4 py-2 text-sm font-medium transition-colors duration-200
                          ${location.pathname === subitem.href 
                            ? 'text-[#20a1d2] bg-gray-50' 
                            : 'text-gray-600 hover:text-[#20a1d2] hover:bg-gray-50'
                          }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {subitem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }
            
            // For regular items
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-4 py-2 text-base font-medium transition-colors duration-200
                  ${location.pathname === item.href 
                    ? 'text-[#20a1d2] bg-gray-50' 
                    : 'text-gray-700 hover:text-[#20a1d2] hover:bg-gray-50'
                  }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            );
          })}
          <Link
            to="/join"
            className="block px-4 py-2 mx-4 my-4 text-center text-sm font-medium text-white bg-[#20a1d2] rounded-md hover:bg-[#1b86b0] transition-colors duration-200"
            onClick={() => setIsOpen(false)}
          >
            Get Involved
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 