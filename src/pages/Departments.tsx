import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Departments = () => {
  const departments = [
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
      description: "Our Russian department focuses on fostering STEM education and innovation in the region, creating strong educational partnerships with local institutions.",
      image: "/images/departments/saint-petersburg.jpg"
    },
    {
      city: "Almaty",
      country: "Kazakhstan",
      director: "Anel Narynova",
      description: "The Almaty department serves as a key hub for STEM initiatives in southern Kazakhstan, providing educational resources and organizing workshops for students.",
      image: "/images/departments/almaty.jpg"
    },
    {
      city: "Astana",
      country: "Kazakhstan",
      director: "Aisha Usenova",
      description: "Our Astana department coordinates STEM programs in the capital region, working closely with government institutions and educational centers.",
      image: "/images/departments/astana.jpg.webp"
    },
    {
      city: "Dushanbe",
      country: "Tajikistan",
      director: "Muso Sharifov",
      description: "The Dushanbe department focuses on bringing STEM education opportunities to Tajikistan, with special emphasis on rural areas and underserved communities.",
      image: "/images/departments/dushanbe.jpg"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-[#20a1d2] mb-4">Our Departments</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          STEM Central Asia operates through strategic departments across the globe, 
          coordinated by our headquarters in San Diego and led by experienced directors 
          committed to advancing STEM education.
        </p>
      </div>

      {/* Headquarters Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-[#20a1d2] mb-8 text-center">Global Headquarters</h2>
        {departments
          .filter(dept => dept.isHeadquarters)
          .map((dept, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 max-w-4xl mx-auto">
              <div className="h-64 overflow-hidden">
                <img
                  src={dept.image}
                  alt={`${dept.city} office`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/placeholder.jpg';
                  }}
                />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-3xl text-[#20a1d2]">{dept.city}</h2>
                  <span className="text-xl text-gray-600">{dept.country}</span>
                </div>
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-[#3eb372]">Global Director</h3>
                  <p className="text-gray-700 text-lg">{dept.director}</p>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">{dept.description}</p>
              </div>
            </div>
          ))}
      </div>

      {/* Regional Departments */}
      <div>
        <h2 className="text-2xl font-bold text-[#20a1d2] mb-8 text-center">Regional Departments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {departments
            .filter(dept => !dept.isHeadquarters)
            .map((dept, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-48 overflow-hidden">
                  <img
                    src={dept.image}
                    alt={`${dept.city} office`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/placeholder.jpg';
                    }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl text-[#20a1d2]">{dept.city}</h2>
                    <span className="text-lg text-gray-600">{dept.country}</span>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-[#3eb372]">Department Director</h3>
                    <p className="text-gray-700">{dept.director}</p>
                  </div>
                  <p className="text-gray-600">{dept.description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Departments; 