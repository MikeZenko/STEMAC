import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-[#20a1d2] transition-all duration-300">
            Our Team
          </h1>
          <div className="max-w-3xl mx-auto transition-all duration-300">
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Meet the dedicated individuals who drive STEM Central Asia's mission forward,
              working together to empower youth through quality education in Science,
              Technology, Engineering, and Mathematics.
            </p>
          </div>
        </div>

        {/* Department Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {departments.map((dept) => (
              <Button
                key={dept}
                variant={selectedDepartment === dept ? "default" : "outline"}
                onClick={() => setSelectedDepartment(dept)}
                className={`${selectedDepartment === dept ? 'bg-[#20a1d2]' : ''} transition-all duration-300`}
              >
                {dept}
              </Button>
            ))}
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredMembers.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              onClick={() => setSelectedMember(member)}
            >
              <div className="aspect-w-4 aspect-h-3 relative overflow-hidden rounded-t-lg">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/400x300?text=Photo+Coming+Soon';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm font-medium">Click to learn more</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2 text-[#20a1d2]">{member.name}</h4>
                <p className="text-sm text-[#3eb372] font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Member Modal */}
        {selectedMember && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div 
              className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-[#20a1d2]">{selectedMember.name}</h3>
                    <p className="text-[#3eb372] font-medium">{selectedMember.role}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedMember(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="aspect-w-16 aspect-h-9 mb-6">
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="rounded-lg object-cover w-full h-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/400x300?text=Photo+Coming+Soon';
                    }}
                  />
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">{selectedMember.bio}</p>
                {selectedMember.socialLinks && (
                  <div className="flex gap-4">
                    {selectedMember.socialLinks.linkedin && (
                      <a 
                        href={selectedMember.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                    )}
                    {selectedMember.socialLinks.email && (
                      <a 
                        href={`mailto:${selectedMember.socialLinks.email}`}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 