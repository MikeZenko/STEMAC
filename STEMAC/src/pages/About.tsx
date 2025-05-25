import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  seniority: number;
  department?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: "Tair Narynov",
    role: "Founder & Global Director",
    bio: "From Almaty, Kazakhstan, Tair leads STEM Central Asia with a vision to empower youth through STEM education. Based in San Diego, he oversees global operations and coordinates initiatives across all regional departments.",
    image: "/images/team/tair-narynov.jpg",
    seniority: 1,
    department: "Global Leadership",
    socialLinks: {
      linkedin: "https://linkedin.com/in/tairnarynov",
      email: "tair@stemcentralasia.org"
    }
  },
  {
    name: "JD Gomez",
    role: "Vice President",
    bio: "As Vice President, JD helps shape and execute the organization's strategic vision.",
    image: "/images/team/jd-gomez.jpg",
    seniority: 2
  },
  {
    name: "Aru Karen",
    role: "Secretary",
    bio: "Aru oversees organizational operations and documentation.",
    image: "/images/team/aru-karen.jpg",
    seniority: 3
  },
  {
    name: "Saira Darugar",
    role: "Director of Social Media",
    bio: "Saira leads our social media strategy and digital presence.",
    image: "/images/team/saira-darugar.jpg",
    seniority: 4
  },
  {
    name: "Gokul Gopalakrishnan",
    role: "Technical Specialist",
    bio: "Gokul brings technical expertise to our programs and initiatives.",
    image: "/images/team/gokul-gopalakrishnan.jpg",
    seniority: 5
  },
  {
    name: "Joshua Gong",
    role: "Director of Curriculum",
    bio: "Joshua leads the development of our educational programs and curriculum.",
    image: "/images/team/joshua-gong.jpg",
    seniority: 6
  },
  {
    name: "Dmitry Moryakov",
    role: "Department Director - Saint Petersburg",
    bio: "Leading STEM initiatives and fostering educational partnerships in the Saint Petersburg region of Russia.",
    image: "/images/team/dmitry-moryakov.jpg",
    seniority: 7
  },
  {
    name: "Anel Narynova",
    role: "Department Director - Almaty",
    bio: "Coordinating STEM programs and educational resources in Almaty, Kazakhstan.",
    image: "/images/team/anel-narynova.jpg",
    seniority: 8
  },
  {
    name: "Aisha Usenova",
    role: "Department Director - Astana",
    bio: "Managing STEM initiatives and government partnerships in Astana, Kazakhstan.",
    image: "/images/team/aisha-usenova.jpg",
    seniority: 9
  },
  {
    name: "Muso Sharifov",
    role: "Department Director - Dushanbe",
    bio: "Developing STEM education opportunities and community outreach in Dushanbe, Tajikistan.",
    image: "/images/team/muso-sharifov.jpg",
    seniority: 10
  },
  {
    name: "Michelle DiFrancesco",
    role: "Senior Advisory Council",
    bio: "Michelle contributes valuable insights and guidance to our strategic initiatives.",
    image: "/images/team/michelle-difrancesco.jpg",
    seniority: 11
  }
];

const departments = ["All", "Global Leadership", "Regional Directors", "Advisory Council", "Operations"];

// Animation utility hook
const useInView = (threshold = 0.3) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return { ref, isInView };
};

export default function About() {
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  
  // Sort team members by seniority
  const sortedTeamMembers = [...teamMembers].sort((a, b) => a.seniority - b.seniority);

  // Filter team members by department
  const filteredMembers = selectedDepartment === "All" 
    ? sortedTeamMembers 
    : sortedTeamMembers.filter(member => member.department === selectedDepartment);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-[#20a1d2] via-[#3eb372] to-[#20a1d2] text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <img 
            src="/images/team/team-hero.jpg" 
            alt="STEM Central Asia Team" 
            className="w-full h-full object-cover opacity-30"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/images/homepage/IMG_9921.jpg';
            }}
          />
        </div>
        
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-8">
            <svg className="w-10 h-10 text-white animate-icon-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg animate-fade-in-up">
            Our <span className="text-yellow-300">Team</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-4xl mx-auto text-white/90 drop-shadow-md leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            Meet the dedicated individuals who drive STEM Central Asia's mission forward.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Department Filter */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20a1d2] to-[#3eb372]">Team Members</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {departments.map((dept) => (
                <Button
                  key={dept}
                  variant={selectedDepartment === dept ? "default" : "outline"}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`${
                    selectedDepartment === dept 
                      ? 'bg-gradient-to-r from-[#20a1d2] to-[#3eb372] hover:from-[#1b86b0] hover:to-[#359f61] text-white' 
                      : 'border-[#20a1d2] text-[#20a1d2] hover:bg-[#20a1d2] hover:text-white'
                  } transition-all duration-300 hover:scale-105 active:scale-95 font-medium`}
                >
                  {dept}
                </Button>
              ))}
            </div>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMembers.map((member, index) => (
              <div
                key={member.name}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
                onClick={() => setSelectedMember(member)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/400x300?text=Photo+Coming+Soon';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 text-white">
                      <p className="text-sm font-medium">Click to learn more</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-[#3eb372] font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 leading-relaxed line-clamp-3">{member.bio}</p>
                  
                  {member.name === "Tair Narynov" && (
                    <div className="mt-4 text-center" onClick={(e) => e.stopPropagation()}>
                      <Link 
                        to="/founder" 
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#20a1d2] to-[#3eb372] text-white rounded-lg hover:from-[#1b86b0] hover:to-[#359f61] transition-all duration-300 transform hover:scale-105 active:scale-95 font-medium"
                      >
                        View Founder's Page
                        <svg className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Member Modal */}
      {selectedMember && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setSelectedMember(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-500 scale-100 opacity-100 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{selectedMember.name}</h3>
                  <p className="text-[#3eb372] font-semibold text-lg">{selectedMember.role}</p>
                </div>
                <button 
                  onClick={() => setSelectedMember(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200 hover:rotate-90 transform p-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mb-6 rounded-xl overflow-hidden">
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/400x300?text=Photo+Coming+Soon';
                  }}
                />
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed text-lg">{selectedMember.bio}</p>
              
              {selectedMember.socialLinks && (
                <div className="flex gap-4">
                  {selectedMember.socialLinks.linkedin && (
                    <a 
                      href={selectedMember.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                      LinkedIn
                    </a>
                  )}
                  {selectedMember.socialLinks.email && (
                    <a 
                      href={`mailto:${selectedMember.socialLinks.email}`}
                      className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Call to Action Section */}
      <section className="relative py-12 bg-gradient-to-r from-[#20a1d2] via-[#3eb372] to-[#20a1d2] text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <svg className="w-8 h-8 text-white icon-lightning-enhanced" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-lg">
            Join Our Team
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-white/90 drop-shadow-md leading-relaxed">
            Passionate about STEM education? We're always looking for dedicated individuals to help us expand our mission.
          </p>
          
          <Link 
            to="/join" 
            className="group inline-flex items-center justify-center px-8 py-4 border-2 border-white text-lg font-semibold rounded-xl text-white hover:bg-white hover:text-[#20a1d2] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <svg className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
} 