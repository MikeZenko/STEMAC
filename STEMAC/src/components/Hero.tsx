import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const flagsRef = useRef<HTMLDivElement>(null);
  
  // Country data with flag emojis
  const countries = [
    { name: 'Kazakhstan', flag: '🇰🇿' },
    { name: 'Kyrgyzstan', flag: '🇰🇬' },
    { name: 'Tajikistan', flag: '🇹🇯' },
    { name: 'Turkmenistan', flag: '🇹🇲' },
    { name: 'Uzbekistan', flag: '🇺🇿' }
  ];
  
  useEffect(() => {
    setIsVisible(true);
    
    // Scroll effect for parallax
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleFlagHover = (isHovering: boolean) => {
    setIsPaused(isHovering);
  };

  return (
    <section className="relative">
      {/* Background overlay with pattern and parallax effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/30" />
        <div 
          ref={parallaxRef}
          className="w-full h-full transition-transform duration-200 ease-out"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        >
          <img 
            src="/images/homepage/IMG_9921.jpg" 
            alt="Students engaged in STEM activities" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/10" />
      </div>
      
      {/* Main content container - adjusted padding for mobile */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 pt-20 pb-24 md:px-6 md:pt-28 md:pb-32 lg:px-8">
        <div className="text-center mb-10 md:mb-12">
          <h1 
            className={`transition-all duration-1000 ease-out transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            } text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 md:mb-6 text-white drop-shadow-2xl [text-shadow:_2px_2px_8px_rgb(0_0_0_/_90%)]`}
          >
            <span className="inline-block hover:scale-105 transition-transform duration-300 hover:text-blue-100">S</span>
            <span className="inline-block hover:scale-105 transition-transform duration-300 hover:text-blue-100">T</span>
            <span className="inline-block hover:scale-105 transition-transform duration-300 hover:text-blue-100">E</span>
            <span className="inline-block hover:scale-105 transition-transform duration-300 hover:text-blue-100">M</span>
            <span className="inline-block mx-2"></span>
            <span className="inline-block hover:scale-105 transition-transform duration-300 hover:text-blue-100">C</span>
            <span className="inline-block hover:scale-105 transition-transform duration-300 hover:text-blue-100">e</span>
            <span className="inline-block hover:scale-105 transition-transform duration-300 hover:text-blue-100">n</span>
            <span className="inline-block hover:scale-105 transition-transform duration-300 hover:text-blue-100">t</span>
            <span className="inline-block hover:scale-105 transition-transform duration-300 hover:text-blue-100">r</span>
            <span className="inline-block hover:scale-105 transition-transform duration-300 hover:text-blue-100">a</span>
            <span className="inline-block hover:scale-105 transition-transform duration-300 hover:text-blue-100">l</span>
            <span className="inline-block mx-2"></span>
            <span className="inline-block hover:scale-105 transition-transform duration-300 hover:text-blue-100">A</span>
            <span className="inline-block hover:scale-105 transition-transform duration-300 hover:text-blue-100">s</span>
            <span className="inline-block hover:scale-105 transition-transform duration-300 hover:text-blue-100">i</span>
            <span className="inline-block hover:scale-105 transition-transform duration-300 hover:text-blue-100">a</span>
          </h1>
          <p 
            className={`transition-all duration-1000 delay-300 ease-out transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            } text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto text-white drop-shadow-xl [text-shadow:_1px_1px_6px_rgb(0_0_0_/_80%)]`}
          >
            Building a brighter future by connecting young minds with opportunities in Science, Technology, Engineering, and Mathematics.
          </p>
        </div>

        {/* Flag Emoji Animation - No initial drop, fast to slow */}
        <div 
          className="flags-animation-wrapper mb-16 md:mb-16 overflow-hidden"
        >
          <div className={`flags-track ${isPaused ? 'paused' : ''}`}>
            {/* Create 4 copies of flags for smoother seamless loop */}
            {[...Array(4)].map((_, copyIndex) => (
              <div key={`copy-${copyIndex}`} className="flags-segment">
                {countries.map((country, index) => (
                  <div 
                    key={`flag-${copyIndex}-${index}`} 
                    className="flag-item group"
                    onMouseEnter={() => handleFlagHover(true)}
                    onMouseLeave={() => handleFlagHover(false)}
                  >
                    {/* Flag emoji with enhanced glow effect */}
                    <div className="flag-emoji-container">
                      <span 
                        className="text-6xl sm:text-7xl md:text-8xl block flag-emoji"
                      >
                        {country.flag}
                      </span>
                    </div>
                    
                    {/* Country name that only appears on hover */}
                    <div className="country-name">
                      <span className="text-white text-xs sm:text-sm font-medium">
                        {country.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button - Updated to match Upcoming Events button style */}
        <div 
          className={`transition-all duration-1000 delay-1000 ease-out transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          } flex justify-center mt-8`}
        >
          <Link 
            to="/join" 
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-[#20a1d2] transition-all duration-300 shadow-md"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Join Our Mission
          </Link>
        </div>
      </div>
      
      {/* Properly fixed wave divider with no gap */}
      <div className="relative w-full h-12 md:h-16 mt-0 bg-[#f9fafb]">
        <div className="absolute bottom-full left-0 right-0 h-12 md:h-16 overflow-hidden">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1440 100" 
            preserveAspectRatio="none"
            className="absolute bottom-0 w-full h-full"
            style={{ fill: '#f9fafb', display: 'block' }}
          >
            <path d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,53.3C672,43,768,21,864,21.3C960,21,1056,43,1152,48C1248,53,1344,43,1392,37.3L1440,32L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero; 