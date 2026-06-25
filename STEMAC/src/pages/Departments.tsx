import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

interface DepartmentType {
  city: string;
  country: string;
  director: string;
  description: string;
  image: string;
  isHeadquarters?: boolean;
  flagEmoji?: string;
  established?: string;
  projects?: string[];
}

const Departments = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedDepartment, setSelectedDepartment] = useState<DepartmentType | null>(null);
  
  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const departments: DepartmentType[] = [
    {
      city: "San Diego",
      country: "United States",
      director: "Tair Narynov",
      description: "Our headquarters and main department, leading global initiatives and coordinating all regional operations. As our central hub, we develop core programs, establish international partnerships, and provide strategic direction for all regional departments.",
      image: "/images/departments/san-diego.jpg",
      isHeadquarters: true,
      flagEmoji: "🇺🇸",
      established: "January 2024",
      projects: [
        "Global STEM Curriculum Development",
        "International Partnership Program",
        "Central Asian Exchange Initiative",
        "Research Coordination Hub"
      ]
    },
    {
      city: "Saint Petersburg",
      country: "Russia",
      director: "Dmitry Moryakov",
      description: "Our Russian department focuses on fostering STEM education and innovation in the region, creating strong educational partnerships with local institutions and developing cutting-edge research initiatives.",
      image: "/images/departments/saint-petersburg.jpg",
      flagEmoji: "🇷🇺",
      established: "March 2024",
      projects: [
        "Russian Innovation Hub",
        "STEM Robotics Competition",
        "Winter Coding Bootcamp"
      ]
    },
    {
      city: "Almaty",
      country: "Kazakhstan",
      director: "Anel Narynova",
      description: "The Almaty department serves as a key hub for STEM initiatives in southern Kazakhstan, providing educational resources and organizing workshops for students across the region.",
      image: "/images/departments/almaty.jpg",
      flagEmoji: "🇰🇿",
      established: "February 2024",
      projects: [
        "Kazakhstan Youth STEM Academy",
        "Mobile Science Lab Initiative",
        "Girls in STEM Mentorship Program"
      ]
    },
    {
      city: "Astana",
      country: "Kazakhstan",
      director: "Aisha Usenova",
      description: "Our Astana department coordinates STEM programs in the capital region, working closely with government institutions and educational centers to drive national STEM initiatives.",
      image: "/images/departments/astana.jpg.webp",
      flagEmoji: "🇰🇿",
      established: "February 2024",
      projects: [
        "Government Education Partnership",
        "National STEM Olympiad",
        "Kazakhstan Science Festival"
      ]
    },
    {
      city: "Dushanbe",
      country: "Tajikistan",
      director: "Muso Sharifov",
      description: "The Dushanbe department focuses on bringing STEM education opportunities to Tajikistan, with special emphasis on rural areas and underserved communities throughout the country.",
      image: "/images/departments/dushanbe.jpg",
      flagEmoji: "🇹🇯",
      established: "April 2024",
      projects: [
        "Rural STEM Outreach",
        "Digital Literacy Campaign",
        "Mountain Region Education Access"
      ]
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Department detail modal
  const renderDepartmentModal = () => {
    if (!selectedDepartment) return null;
    
    return (
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={() => setSelectedDepartment(null)}
      >
        <div 
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-64 md:h-80">
            <img 
              src={selectedDepartment.image} 
              alt={`${selectedDepartment.city} office`} 
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/images/placeholder.jpg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full p-6 text-white">
              <div className="flex items-center mb-2">
                <span className="text-5xl mr-4">{selectedDepartment.flagEmoji}</span>
                <div>
                  <h2 className="text-3xl font-bold">{selectedDepartment.city}</h2>
                  <p className="text-xl text-white/80">{selectedDepartment.country}</p>
                </div>
              </div>
              <p className="text-white/70">Established: {selectedDepartment.established}</p>
            </div>
            <button 
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              onClick={() => setSelectedDepartment(null)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#20a1d2] mb-1">Department Director</h3>
              <p className="text-2xl font-bold">{selectedDepartment.director}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#20a1d2] mb-3">About This Department</h3>
              <p className="text-gray-700 leading-relaxed">{selectedDepartment.description}</p>
            </div>
            
            {selectedDepartment.projects && (
              <div>
                <h3 className="text-lg font-semibold text-[#20a1d2] mb-3">Key Projects</h3>
                <ul className="space-y-2">
                  {selectedDepartment.projects.map((project, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#20a1d2] to-[#3eb372] flex-shrink-0 mt-0.5 mr-3 flex items-center justify-center text-white text-xs font-bold">
                        {idx + 1}
                      </div>
                      <span className="text-gray-700">{project}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="mt-8 flex justify-end">
              <button 
                className="px-5 py-2 bg-gradient-to-r from-[#20a1d2] to-[#3eb372] text-white rounded-lg hover:from-[#1b86b0] hover:to-[#359f61] transition-all duration-300 shadow-md"
                onClick={() => setSelectedDepartment(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-12 bg-gradient-to-r from-[#20a1d2] via-[#3eb372] to-[#20a1d2] text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <img 
            src="/images/departments/world-map.jpg" 
            alt="World map" 
            className="w-full h-full object-cover opacity-30"
            style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
          />
        </div>
        
        <div className="absolute top-0 left-0 w-full h-full" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
          <div 
            className="absolute top-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-xl animate-float"
            style={{
              transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`
            }}
          />
          <div 
            className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"
            style={{ 
              animationDelay: '2s',
              transform: `translate(${-mousePosition.x * 0.1}px, ${-mousePosition.y * 0.1}px)`
            }}
          />
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-float" 
            style={{ 
              animationDelay: '1s',
              transform: `translate(${(mousePosition.x - 50) * 0.05}px, ${(mousePosition.y - 50) * 0.05}px) translate(-50%, -50%)`
            }}
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4">
            <svg className="w-8 h-8 text-white animate-icon-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
            </svg>
          </div>
          
          <h1 className={`transition-all duration-1000 ease-out transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          } text-3xl md:text-4xl font-bold mb-3 text-white drop-shadow-lg`}>
            <span className="inline-block hover:scale-105 transition-transform duration-300 hover:text-blue-100">O</span>
            <span className="inline-block hover:scale-105 transition-transform duration-300 hover:text-blue-100">u</span>
            <span className="inline-block hover:scale-105 transition-transform duration-300 hover:text-blue-100">r</span>
            <span className="inline-block mx-2"></span>
            <span className="inline-block hover:scale-105 transition-transform duration-300 hover:text-yellow-300">D</span>
            <span className="inline-block hover:scale-105 transition-transform duration-300 hover:text-yellow-300">e</span>
            <span className="inline-block hover:scale-105 transition-transform duration-300 hover:text-yellow-300">p</span>
            <span className="inline-block hover:scale-105 transition-transform duration-300 hover:text-yellow-300">a</span>
            <span className="inline-block hover:scale-105 transition-transform duration-300 hover:text-yellow-300">r</span>
            <span className="inline-block hover:scale-105 transition-transform duration-300 hover:text-yellow-300">t</span>
            <span className="inline-block hover:scale-105 transition-transform duration-300 hover:text-yellow-300">m</span>
            <span className="inline-block hover:scale-105 transition-transform duration-300 hover:text-yellow-300">e</span>
            <span className="inline-block hover:scale-105 transition-transform duration-300 hover:text-yellow-300">n</span>
            <span className="inline-block hover:scale-105 transition-transform duration-300 hover:text-yellow-300">t</span>
            <span className="inline-block hover:scale-105 transition-transform duration-300 hover:text-yellow-300">s</span>
          </h1>
          
          <p className={`transition-all duration-1000 delay-300 ease-out transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          } text-lg md:text-xl mb-6 max-w-4xl mx-auto text-white/90 drop-shadow-md leading-relaxed`}>
            Meet the dedicated leaders and teams driving STEM education across our global network.
          </p>
        </div>
      </section>

      {/* Global Headquarters Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20a1d2] to-[#3eb372]">Global Headquarters</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our headquarters in San Diego serves as the central hub for all STEM Central Asia operations, coordinating initiatives across our regional departments.
            </p>
          </div>

          {departments
            .filter(dept => dept.isHeadquarters)
            .map((dept, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 max-w-6xl mx-auto transform hover:-translate-y-1 cursor-pointer"
                onClick={() => setSelectedDepartment(dept)}
              >
                <div className="lg:flex">
                  <div className="lg:w-2/5 h-64 lg:h-auto overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#20a1d2]/80 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300 z-10"></div>
                    <img
                      src={dept.image}
                      alt={`${dept.city} office`}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/placeholder.jpg';
                      }}
                    />
                    <div className="absolute top-4 left-4 z-20">
                      <div className="flex items-center bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
                        <span className="text-2xl mr-2">{dept.flagEmoji}</span>
                        <span className="font-medium text-gray-800">{dept.city}, {dept.country}</span>
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-3/5 p-8">
                    <div className="inline-block px-3 py-1 bg-[#e76713]/10 text-[#e76713] rounded-full text-xs font-semibold mb-4">
                      Global Headquarters
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-base font-bold text-[#3eb372] mb-1">Global Director</h4>
                      <p className="text-gray-900 font-medium text-lg">{dept.director}</p>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed mb-4">{dept.description}</p>
                    
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Projects:</h4>
                      <div className="flex flex-wrap gap-2">
                        {dept.projects?.map((project, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                            {project}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-6 text-right">
                      <button 
                        className="inline-flex items-center text-[#20a1d2] font-medium group-hover:text-[#1b86b0] transition-colors duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDepartment(dept);
                        }}
                      >
                        Learn More
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Regional Departments */}
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20a1d2] to-[#3eb372]">Regional Departments</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our regional departments implement STEM education initiatives tailored to local needs across Central Asia.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {departments
              .filter(dept => !dept.isHeadquarters)
              .map((dept, index) => (
                <div 
                  key={index} 
                  className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-[1.01] cursor-pointer"
                  onClick={() => setSelectedDepartment(dept)}
                >
                  <div className="h-48 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#20a1d2]/80 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300 z-10"></div>
                    <img
                      src={dept.image}
                      alt={`${dept.city} office`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/placeholder.jpg';
                      }}
                    />
                    <div className="absolute top-4 left-4 z-20">
                      <div className="flex items-center bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
                        <span className="text-2xl mr-2">{dept.flagEmoji}</span>
                        <span className="font-medium text-gray-800">{dept.city}, {dept.country}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-4">
                      <p className="text-[#3eb372] font-bold text-sm mb-1">Department Director</p>
                      <p className="text-gray-900 font-medium text-lg">{dept.director}</p>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed text-sm mb-4">{dept.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {dept.projects?.slice(0, 2).map((project, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                          {project}
                        </span>
                      ))}
                      {dept.projects && dept.projects.length > 2 && (
                        <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                          +{dept.projects.length - 2} more
                        </span>
                      )}
                    </div>
                    
                    <div className="text-right">
                      <button 
                        className="inline-flex items-center text-[#20a1d2] font-medium group-hover:text-[#1b86b0] transition-colors duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDepartment(dept);
                        }}
                      >
                        Learn More
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-12 bg-gradient-to-r from-[#20a1d2] via-[#3eb372] to-[#20a1d2] text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-full" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
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
          
          <Link 
            to="/join" 
            className="group inline-flex items-center justify-center px-6 py-3 border-2 border-white text-base font-semibold rounded-lg text-white hover:bg-white hover:text-[#20a1d2] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Get in Touch
          </Link>
        </div>
      </section>
      
      {/* Department Detail Modal */}
      {renderDepartmentModal()}
    </div>
  );
};

export default Departments; 