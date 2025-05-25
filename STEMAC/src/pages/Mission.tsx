import React, { useEffect, useState, useRef, ReactNode } from 'react';
import { Link } from 'react-router-dom';
// Import framer-motion using dynamic import to avoid TypeScript errors
const motion = {
  div: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <div {...props}>{children}</div>
  ),
  p: ({ children, ...props }: React.PropsWithChildren<any>) => (
    <p {...props}>{children}</p>
  )
};

// Mock animation hooks for compatibility
const useAnimation = () => ({
  start: (name: string) => {},
});

const useInView = (ref: any, options: any) => {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        setInView(entry.isIntersecting);
      });
    }, options);
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);
  
  return inView;
};

interface MilestoneType {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface ValueType {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const milestones: MilestoneType[] = [
  {
    year: "2023",
    title: "Foundation Established",
    description: "STEM Central Asia was founded with a vision to transform STEM education across the region, bringing together passionate educators and innovators.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  {
    year: "2023",
    title: "First Regional Departments",
    description: "Established our first regional departments in Almaty, Astana, and Dushanbe, creating local hubs for STEM education excellence.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    year: "2026",
    title: "Program Launch",
    description: "Launched our comprehensive STEM education programs and workshops, reaching hundreds of students across Central Asia.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    year: "2026",
    title: "Partnership Growth",
    description: "Formed strategic partnerships with leading educational institutions and organizations to expand our reach and impact.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  }
];

const values: ValueType[] = [
  {
    title: "Innovation",
    description: "Fostering creative thinking and innovative approaches to problem-solving in STEM fields through cutting-edge methodologies and technologies.",
    color: "#20a1d2",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  },
  {
    title: "Inclusivity",
    description: "Ensuring equal access to STEM education regardless of background, gender, or location, creating opportunities for all young minds to thrive.",
    color: "#3eb372",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    title: "Excellence",
    description: "Maintaining the highest standards in education and program delivery, ensuring every initiative meets international quality benchmarks.",
    color: "#e76713",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    )
  },
  {
    title: "Collaboration",
    description: "Building strong partnerships and fostering community engagement across Central Asia to create a unified STEM education ecosystem.",
    color: "#edbb4d",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  }
];

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.2
    }
  }
};

interface FadeInWhenVisibleProps {
  children: ReactNode;
  delay?: number;
}

const FadeInWhenVisible: React.FC<FadeInWhenVisibleProps> = ({ children, delay = 0 }) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  
  return (
    <div
      ref={ref}
      className="transition-all duration-700 opacity-0 translate-y-8"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        transitionDelay: `${delay}s`
      }}
    >
      {children}
    </div>
  );
};

const Mission = () => {
  const [eyeHasTriggered, setEyeHasTriggered] = useState(false);
  const eyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !eyeHasTriggered) {
            setEyeHasTriggered(true);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (eyeRef.current) {
      observer.observe(eyeRef.current);
    }

    return () => {
      if (eyeRef.current) {
        observer.unobserve(eyeRef.current);
      }
    };
  }, [eyeHasTriggered]);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      {/* Enhanced Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-[#20a1d2] via-[#3eb372] to-[#20a1d2] text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <img 
            src="/images/homepage/IMG_9921.jpg" 
            alt="STEM education in action" 
            className="w-full h-full object-cover object-[center_65%] opacity-30"
          />
        </div>
        
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-8">
            <svg className="w-10 h-10 text-white animate-icon-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg animate-fade-in-up">
            Empowering Through <span className="text-yellow-300">STEM</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-4xl mx-auto text-white/90 drop-shadow-md leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            Our mission is to transform STEM education in Central Asia by providing innovative learning 
            opportunities and fostering a community of future scientists, technologists, engineers, and mathematicians.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center text-white/90">
              <div className="w-3 h-3 bg-yellow-300 rounded-full mr-3"></div>
              <span className="font-medium">Innovation Driven</span>
            </div>
            <div className="flex items-center text-white/90">
              <div className="w-3 h-3 bg-green-300 rounded-full mr-3"></div>
              <span className="font-medium">Community Focused</span>
            </div>
            <div className="flex items-center text-white/90">
              <div className="w-3 h-3 bg-blue-300 rounded-full mr-3"></div>
              <span className="font-medium">Future Ready</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="py-20 bg-white relative overflow-hidden" ref={eyeRef}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 opacity-50"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#20a1d2]/10 to-[#3eb372]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#3eb372]/10 to-[#20a1d2]/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#20a1d2] to-[#3eb372] rounded-full mb-8">
              <svg 
                className={`w-10 h-10 text-white ${eyeHasTriggered ? 'icon-eye-scroll-triggered' : 'icon-eye-enhanced'}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20a1d2] to-[#3eb372]">Mission</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
              To democratize access to quality STEM education across Central Asia, empowering the next generation 
              of innovators, researchers, and leaders who will drive technological advancement and economic growth in the region.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Section - Enhanced */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#20a1d2] to-[#3eb372] rounded-full mb-6">
              <svg className="w-8 h-8 text-white animate-icon-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20a1d2] to-[#3eb372]">Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              These fundamental principles guide everything we do and shape our approach to STEM education across Central Asia.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <FadeInWhenVisible key={value.title} delay={index * 0.1}>
                <div className="group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(135deg, ${value.color}05, ${value.color}10)` }}></div>
                  <div className="relative p-8">
                    <div className="flex items-start">
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center mr-6 flex-shrink-0 shadow-lg"
                        style={{ backgroundColor: value.color }}
                      >
                        <div className="text-white">
                          {value.icon}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{value.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{value.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section - Enhanced */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#20a1d2] to-[#3eb372] rounded-full mb-6">
              <svg className="w-8 h-8 text-white animate-icon-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20a1d2] to-[#3eb372]">Journey</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From humble beginnings to regional impact - discover the milestones that have shaped our mission.
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#20a1d2] to-[#3eb372] hidden lg:block"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <FadeInWhenVisible key={index} delay={index * 0.15}>
                  <div className={`relative flex items-center ${
                    index % 2 === 0 ? 'lg:justify-start' : 'lg:justify-end'
                  }`}>
                    {/* Desktop layout */}
                    <div className={`hidden lg:block w-5/12 ${
                      index % 2 === 0 ? 'pr-12' : 'pl-12'
                    }`}>
                      <div className="group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#20a1d2]/5 to-[#3eb372]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative p-8">
                          <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-[#20a1d2] to-[#3eb372] rounded-full flex items-center justify-center mr-4">
                              <div className="text-white">
                                {milestone.icon}
                              </div>
                            </div>
                            <div>
                              <span className="text-2xl font-bold text-[#20a1d2]">{milestone.year}</span>
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-3">{milestone.title}</h3>
                          <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Mobile layout */}
                    <div className="lg:hidden w-full">
                      <div className="group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#20a1d2]/5 to-[#3eb372]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative p-6">
                          <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-[#20a1d2] to-[#3eb372] rounded-full flex items-center justify-center mr-4">
                              <div className="text-white">
                                {milestone.icon}
                              </div>
                            </div>
                            <div>
                              <span className="text-xl font-bold text-[#20a1d2]">{milestone.year}</span>
                            </div>
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">{milestone.title}</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">{milestone.description}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Timeline dot for desktop */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-[#20a1d2] to-[#3eb372] border-4 border-white shadow-lg hidden lg:flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                </FadeInWhenVisible>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Call to Action */}
      <section className="relative py-20 bg-gradient-to-r from-[#20a1d2] via-[#3eb372] to-[#20a1d2] text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-8">
            <svg className="w-10 h-10 text-white icon-lightning-enhanced" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">
            Ready to Make an <span className="text-yellow-300">Impact?</span>
          </h2>
          <p className="text-xl md:text-2xl mb-10 max-w-4xl mx-auto text-white/90 drop-shadow-md leading-relaxed">
            Join us in building a stronger STEM education ecosystem in Central Asia. Together, we can shape the future of innovation and technology in our region.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link 
              to="/departments" 
              className="group w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border-2 border-white text-lg font-semibold rounded-xl text-white hover:bg-white hover:text-[#20a1d2] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <svg className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              View Departments
            </Link>
            <Link 
              to="/join" 
              className="group w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border-2 border-white bg-white text-lg font-semibold rounded-xl text-[#20a1d2] hover:bg-yellow-50 hover:border-yellow-200 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <svg className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Mission; 