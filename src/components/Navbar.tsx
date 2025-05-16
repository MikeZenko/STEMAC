import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: 'Mission', href: '/mission' },
    { name: 'Departments', href: '/departments' },
    { name: 'About', href: '/about' },
    { name: 'Events', href: '/events' },
  ];

  return (
    <nav className="bg-white shadow-lg relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24">
          <div className="flex items-center flex-1">
            <Link to="/" className="flex-shrink-0 flex flex-col items-center justify-center group mr-8">
              <div className="flex flex-col items-center">
                <img 
                  className="w-32 h-auto mb-1 transform transition-transform duration-300 group-hover:scale-105" 
                  src="/logo.svg" 
                  alt="CA Logo" 
                />
                <span className="text-base font-medium text-gray-800 tracking-wide">
                  Central Asia
                </span>
              </div>
            </Link>
            
            <div className="hidden md:ml-auto md:flex md:items-center md:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#20a1d2] transition-colors duration-200 relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#20a1d2] transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
                </Link>
              ))}
              <Link
                to="/join"
                className="ml-4 px-6 py-2.5 text-sm font-medium text-white bg-[#20a1d2] rounded-md hover:bg-[#1b86b0] transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Get Involved
              </Link>
            </div>
          </div>
          
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#20a1d2] hover:bg-gray-100 focus:outline-none transition-colors duration-200"
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
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden border-t border-gray-200`}>
        <div className="pt-2 pb-3 space-y-1 bg-white">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-[#20a1d2] hover:bg-gray-50 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/join"
            className="block px-4 py-2 mx-4 mt-4 text-center text-sm font-medium text-white bg-[#20a1d2] rounded-md hover:bg-[#1b86b0] transition-colors duration-200"
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