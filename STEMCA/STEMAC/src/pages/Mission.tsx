import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

interface MilestoneType {
  year: string;
  title: string;
  description: string;
}

interface ValueType {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const milestones: MilestoneType[] = [
  {
    year: "2023",
    title: "Foundation Established",
    description: "STEM Central Asia was founded with a vision to transform STEM education across the region."
  },
  {
    year: "2023",
    title: "First Regional Departments",
    description: "Established our first regional departments in Almaty, Astana, and Dushanbe."
  },
  {
    year: "2026",
    title: "Program Launch",
    description: "Launched our comprehensive STEM education programs and workshops."
  },
  {
    year: "2026",
    title: "Partnership Growth",
    description: "Formed strategic partnerships with educational institutions and organizations."
  }
];

const values: ValueType[] = [
  {
    title: "Innovation",
    description: "Fostering creative thinking and innovative approaches to problem-solving in STEM fields.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  },
  {
    title: "Inclusivity",
    description: "Ensuring equal access to STEM education regardless of background or location.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    title: "Excellence",
    description: "Maintaining high standards in education and program delivery across all initiatives.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    )
  },
  {
    title: "Collaboration",
    description: "Building strong partnerships and fostering community engagement across Central Asia.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  }
];

const Mission = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section - Made more compact and distinct */}
      <div className="relative bg-gradient-to-r from-[#20a1d2] via-[#3eb372] to-[#20a1d2] py-16">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/40" />
          <img 
            src="/images/homepage/IMG_9921.jpg" 
            alt="STEM education in action" 
            className="w-full h-full object-cover object-[center_65%]"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">Empowering Through STEM</h1>
            <p className="text-lg text-white max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              Our mission is to transform STEM education in Central Asia by providing innovative learning 
              opportunities and fostering a community of future scientists, technologists, engineers, and mathematicians.
            </p>
          </div>
        </div>
      </div>

      {/* Core Values Section - Redesigned layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-center text-[#20a1d2] mb-8">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value, index) => (
            <div 
              key={value.title}
              className="flex items-start p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="text-[#3eb372] mr-4 mt-1">{value.icon}</div>
              <div>
                <h3 className="text-xl font-semibold text-[#20a1d2] mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Section - More compact and visually distinct */}
      <div className="bg-[#f8fafc] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#20a1d2] mb-8">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-[#20a1d2]" />
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div 
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div className={`w-full md:w-5/12 ${
                    index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                  }`}>
                    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center mb-2">
                        <span className="text-[#3eb372] font-bold">{milestone.year}</span>
                        <div className="w-full h-0.5 bg-[#3eb372] ml-4" />
                      </div>
                      <h3 className="text-lg font-semibold text-[#20a1d2] mb-1">{milestone.title}</h3>
                      <p className="text-sm text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#3eb372] rounded-full border-2 border-white" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action - Redesigned to be more distinct */}
      <div className="bg-[#20a1d2] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-white drop-shadow-lg">Ready to Make an Impact?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto text-white drop-shadow-md">
            Join us in building a stronger STEM education ecosystem in Central Asia.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/departments" 
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-[#20a1d2] transition-all duration-300 shadow-md"
            >
              View Departments
            </Link>
            <Link 
              to="/join" 
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border-2 border-white bg-white text-base font-medium rounded-md text-[#20a1d2] hover:bg-blue-50 transition-all duration-300 shadow-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mission; 