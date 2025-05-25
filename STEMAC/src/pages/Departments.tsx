import React, { useEffect, useState, useRef } from 'react';

interface DepartmentType {
  city: string;
  country: string;
  director: string;
  description: string;
  image: string;
  isHeadquarters?: boolean;
}

const Departments = () => {
  const departments: DepartmentType[] = [
    {
      city: "San Diego",
      country: "United States",
      director: "Tair Narynov",
      description: "Our headquarters and main department, leading global initiatives and coordinating all regional operations. As our central hub, we develop core programs, establish international partnerships, and provide strategic direction for all regional departments.",
      image: "/images/departments/san-diego.jpg",
      isHeadquarters: true
    },
    {
      city: "Saint Petersburg",
      country: "Russia",
      director: "Dmitry Moryakov",
      description: "Our Russian department focuses on fostering STEM education and innovation in the region, creating strong educational partnerships with local institutions and developing cutting-edge research initiatives.",
      image: "/images/departments/saint-petersburg.jpg"
    },
    {
      city: "Almaty",
      country: "Kazakhstan",
      director: "Anel Narynova",
      description: "The Almaty department serves as a key hub for STEM initiatives in southern Kazakhstan, providing educational resources and organizing workshops for students across the region.",
      image: "/images/departments/almaty.jpg"
    },
    {
      city: "Astana",
      country: "Kazakhstan",
      director: "Aisha Usenova",
      description: "Our Astana department coordinates STEM programs in the capital region, working closely with government institutions and educational centers to drive national STEM initiatives.",
      image: "/images/departments/astana.jpg.webp"
    },
    {
      city: "Dushanbe",
      country: "Tajikistan",
      director: "Muso Sharifov",
      description: "The Dushanbe department focuses on bringing STEM education opportunities to Tajikistan, with special emphasis on rural areas and underserved communities throughout the country.",
      image: "/images/departments/dushanbe.jpg"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-8 bg-gradient-to-r from-[#20a1d2] via-[#3eb372] to-[#20a1d2] text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <img 
            src="/images/departments/world-map.jpg" 
            alt="World map" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4">
            <svg className="w-8 h-8 text-white animate-icon-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
            </svg>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white drop-shadow-lg animate-fade-in-up">
            Our <span className="text-yellow-300">Departments</span>
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-4xl mx-auto text-white/90 drop-shadow-md leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            Meet the dedicated leaders and teams driving STEM education across our global network.
          </p>
        </div>
      </section>

      {/* Global Headquarters Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20a1d2] to-[#3eb372]">Global Headquarters</span>
            </h2>
          </div>

          {departments
            .filter(dept => dept.isHeadquarters)
            .map((dept, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 max-w-6xl mx-auto transform hover:-translate-y-1">
                <div className="lg:flex">
                  <div className="lg:w-2/5 h-48 lg:h-auto overflow-hidden">
                    <img
                      src={dept.image}
                      alt={`${dept.city} office`}
                      className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/placeholder.jpg';
                      }}
                    />
                  </div>
                  <div className="lg:w-3/5 p-6">
                    <div className="inline-block px-3 py-1 bg-[#3eb372]/10 text-[#3eb372] rounded-full text-xs font-semibold mb-4">
                      Global Headquarters
                    </div>
                    
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-2xl text-[#20a1d2]">{dept.city}</h3>
                      <span className="text-lg text-gray-500">{dept.country}</span>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-base font-bold text-[#3eb372] mb-1">Global Director</h4>
                      <p className="text-gray-900 font-medium text-lg">{dept.director}</p>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed text-sm">{dept.description}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Regional Departments */}
      <section className="py-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20a1d2] to-[#3eb372]">Regional Departments</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
            {departments
              .filter(dept => !dept.isHeadquarters)
              .map((dept, index) => (
                <div key={index} className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-[1.01]">
                  <div className="h-40 overflow-hidden">
                    <img
                      src={dept.image}
                      alt={`${dept.city} office`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/placeholder.jpg';
                      }}
                    />
                  </div>
                  
                  <div className="p-5">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl text-[#20a1d2]">{dept.city}</h3>
                      <span className="text-lg text-gray-500">{dept.country}</span>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-[#3eb372] font-bold text-sm mb-1">Department Director</p>
                      <p className="text-gray-900 font-medium text-base">{dept.director}</p>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed text-xs">{dept.description}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-8 bg-gradient-to-r from-[#20a1d2] via-[#3eb372] to-[#20a1d2] text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full mb-4">
            <svg className="w-6 h-6 text-white icon-lightning-enhanced" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white drop-shadow-lg">
            Want to Lead a Department?
          </h2>
          <p className="text-base md:text-lg mb-6 max-w-4xl mx-auto text-white/90 drop-shadow-md leading-relaxed">
            Join our network of passionate leaders making a difference in STEM education.
          </p>
          
          <a 
            href="/join" 
            className="group inline-flex items-center justify-center px-6 py-3 border-2 border-white text-base font-semibold rounded-lg text-white hover:bg-white hover:text-[#20a1d2] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
};

export default Departments; 