import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// Enhanced intersection observer hook with scroll progress tracking
const useInView = (threshold = 0.2, triggerOnce = true) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            observer.unobserve(entry.target);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
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
  }, [threshold, triggerOnce]);

  return { ref, isInView };
};

// Simplified timeline progress hook - one way only
const useTimelineProgress = () => {
  const [progress, setProgress] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          // Smooth progress animation
          let currentProgress = 0;
          const animate = () => {
            currentProgress += 0.01;
            if (currentProgress <= 1) {
              setProgress(currentProgress);
              requestAnimationFrame(animate);
            }
          };
          animate();
        }
      },
      { threshold: 0.1 }
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
  }, [hasStarted]);

  return { ref, progress, hasStarted };
};

// Simple one-way typewriter effect
const useOneWayTypewriter = (text: string, shouldStart: boolean, speed = 30) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!shouldStart || hasStarted) return;
    
    setHasStarted(true);
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        setIsComplete(true);
        clearInterval(typingInterval);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, speed, shouldStart, hasStarted]);

  return { displayText, isComplete };
};

// Simple one-way intersection observer for timeline items
const useTimelineItemVisibility = (delay = 0) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold: 0.3 }
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
  }, [delay, isVisible]);

  return { ref, isVisible };
};

// Timeline Item Component with smooth one-way animations
interface TimelineItemProps {
  event: {
    year: string;
    event: string;
    description: string;
  };
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ event, index }) => {
  const { ref, isVisible } = useTimelineItemVisibility(index * 200); // Staggered delay
  const [showTypewriter, setShowTypewriter] = useState(false);
  
  // Start typewriter after main animation
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setShowTypewriter(true);
      }, 800); // Delay after main animation
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const { displayText } = useOneWayTypewriter(event.description, showTypewriter, 25);

  return (
    <div 
      ref={ref}
      className={`relative flex md:items-center transition-all duration-1000 ease-out ${
        index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
      } ${
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-8 scale-95'
      }`}
      style={{ 
        transitionDelay: isVisible ? '0ms' : `${index * 100}ms`
      }}
    >
      <div className={`pl-12 md:pl-0 md:w-5/12 ${
        index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
      }`}>
        <div className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border-l-4 border-[#20a1d2] relative overflow-hidden">
          {/* Year section */}
          <div className="flex items-center mb-3">
            <span 
              className={`text-[#3eb372] font-bold text-xl transition-all duration-700 ease-out ${
                isVisible 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-4'
              }`}
              style={{ transitionDelay: isVisible ? '200ms' : '0ms' }}
            >
              {event.year}
            </span>
            <div 
              className={`h-0.5 bg-[#3eb372]/30 ml-4 transition-all duration-1000 ease-out ${
                isVisible ? 'w-full opacity-100' : 'w-0 opacity-0'
              }`}
              style={{ transitionDelay: isVisible ? '400ms' : '0ms' }}
            />
          </div>

          {/* Event title */}
          <h3 
            className={`text-xl font-bold text-gray-900 mb-2 transition-all duration-700 ease-out ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-3'
            }`}
            style={{ transitionDelay: isVisible ? '300ms' : '0ms' }}
          >
            {event.event}
          </h3>

          {/* Description - with fallback to ensure text always shows */}
          <div 
            className={`text-gray-600 transition-opacity duration-700 ease-out ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: isVisible ? '600ms' : '0ms' }}
          >
            {/* Show typewriter text if active, otherwise show full text after delay */}
            {showTypewriter && displayText ? (
              <>
                {displayText}
                {displayText !== event.description && (
                  <span className="animate-pulse ml-1">|</span>
                )}
              </>
            ) : (
              isVisible && event.description
            )}
          </div>

          {/* Bottom accent */}
          <div 
            className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#20a1d2] to-[#3eb372] transition-all duration-1000 ease-out ${
              isVisible ? 'w-full opacity-100' : 'w-0 opacity-0'
            }`}
            style={{ transitionDelay: isVisible ? '800ms' : '0ms' }}
          />
        </div>
      </div>
      
      {/* Timeline dot */}
      <div 
        className={`absolute left-0 md:left-1/2 top-8 transform -translate-x-1/2 transition-all duration-700 ease-out ${
          isVisible 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-50'
        }`}
        style={{ transitionDelay: isVisible ? '100ms' : '0ms' }}
      >
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white border-4 border-[#3eb372] shadow-lg relative">
          <div className="w-3 h-3 bg-[#3eb372] rounded-full" />
          
          {/* Subtle pulse effect - only when visible */}
          {isVisible && (
            <div 
              className="absolute inset-0 rounded-full border-2 border-[#3eb372] animate-ping opacity-20"
              style={{ animationDelay: '1s', animationDuration: '3s' }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default function Founder() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Animation refs
  const introRef = useInView(0.3);
  const interestsRef = useInView(0.2);
  const achievementsRef = useInView(0.2);
  const timelineSectionRef = useInView(0.1);
  const ctaRef = useInView(0.3);

  // Timeline scroll progress tracking
  const { ref: timelineProgressRef, progress: timelineProgress, hasStarted: timelineHasStarted } = useTimelineProgress();

  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Academic interests
  const academicInterests = [
    {
      title: "Biochemistry",
      description: "Passionate about understanding the chemical processes within living organisms",
      icon: (
        <svg className="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      title: "STEM Education",
      description: "Dedicated to improving access to quality STEM education across Central Asia",
      icon: (
        <svg className="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      )
    },
    {
      title: "Research",
      description: "Keen interest in research methodologies and scientific inquiry",
      icon: (
        <svg className="h-8 w-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    }
  ];

  // Achievements for Tair
  const achievements = [
    {
      title: "Academic Excellence",
      description: "4.0 GPA student at High Bluff Academy, consistently demonstrating commitment to scholarly pursuits",
      icon: (
        <svg className="h-8 w-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      )
    },
    {
      title: "Research Intern at UCSD",
      description: "Gaining hands-on experience in cutting-edge research at the University of California, San Diego",
      icon: (
        <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      title: "Hackathon Winner",
      description: "Winner of the Lockheed Martin sponsored Bishops SWEN Knights Hackathon, demonstrating innovation and problem-solving skills",
      icon: (
        <svg className="h-8 w-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "FIRST Robotics Competitor",
      description: "Active participant in FIRST Robotics Competition with MarauderTech 9573, developing engineering and teamwork skills",
      icon: (
        <svg className="h-8 w-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    }
  ];

  // Timeline events for Tair's journey
  const timelineEvents = [
    {
      year: "2007",
      event: "Born in Almaty, Kazakhstan",
      description: "Began his journey in the heart of Central Asia"
    },
    {
      year: "2017",
      event: "Developed interest in STEM",
      description: "Participated in local science competitions and workshops"
    },
    {
      year: "2021",
      event: "Moved to the United States",
      description: "Continued education at High Bluff Academy in San Diego, California while maintaining a perfect 4.0 GPA"
    },
    {
      year: "2023",
      event: "Multiple Leadership Roles",
      description: "Became MUN Club President, served in ASB, and won the Bishops SWEN Knights Hackathon sponsored by Lockheed Martin"
    },
    {
      year: "2024",
      event: "Founded STEM Central Asia",
      description: "Established the organization to promote STEM education in his home region while joining FIRST Robotics team MarauderTech 9573"
    },
    {
      year: "2025",
      event: "Research Internship at UCSD",
      description: "Gained valuable research experience while preparing for university studies in Biochemistry and leading the Aerospace Robotics Coding Competition team"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Tair Narynov | Founder of STEM Central Asia</title>
        <meta name="description" content="Learn about Tair Narynov, the founder of STEM Central Asia. 4.0 GPA student, UCSD research intern, robotics competitor, and passionate advocate for STEM education." />
        <meta name="keywords" content="Tair Narynov, STEM Central Asia founder, High Bluff Academy, UCSD research intern, FIRST Robotics, MarauderTech 9573, Bishops SWEN Knights Hackathon" />
        <link rel="canonical" href="https://stemac-qd0c6ygd7-mikezenkos-projects.vercel.app/founder" />
      </Helmet>

      <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen overflow-hidden">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div 
            className="absolute w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse"
            style={{
              top: `${20 + mousePosition.y * 0.1}%`,
              left: `${10 + mousePosition.x * 0.05}%`,
            }}
          />
          <div 
            className="absolute w-80 h-80 bg-green-200/20 rounded-full blur-3xl animate-pulse"
            style={{
              bottom: `${15 + mousePosition.y * 0.08}%`,
              right: `${15 + mousePosition.x * 0.06}%`,
              animationDelay: '1s'
            }}
          />
        </div>

        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-r from-[#20a1d2] via-[#3eb372] to-[#20a1d2] text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-800/30 via-purple-800/20 to-blue-900/30"></div>
          </div>
          
          {/* Enhanced floating elements with parallax */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div 
              className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"
              style={{
                transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`
              }}
            />
            <div 
              className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl animate-float" 
              style={{ 
                animationDelay: '2s',
                transform: `translate(${mousePosition.x * -0.05}px, ${mousePosition.y * 0.08}px)`
              }}
            />
            <div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white/5 rounded-full blur-2xl animate-float" 
              style={{ 
                animationDelay: '1s',
                transform: `translate(-50%, -50%) translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.04}px)`
              }}
            />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-8 animate-bounce-slow">
              <svg className="w-10 h-10 text-white animate-icon-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg animate-fade-in-up">
              Tair Narynov
            </h1>
            <h2 className="text-xl md:text-2xl font-medium mb-6 text-white/90 drop-shadow-md animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Founder & Global Director of STEM Central Asia
            </h2>
            <p className="text-lg md:text-xl max-w-4xl mx-auto text-white/90 drop-shadow-md leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              A passionate advocate for STEM education from Almaty, Kazakhstan, leading the mission to empower youth across Central Asia.
            </p>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div 
              ref={introRef.ref}
              className={`flex flex-col lg:flex-row items-center gap-12 transition-all duration-1000 ${
                introRef.isInView 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <div className={`lg:w-3/5 transition-all duration-1000 delay-200 ${
                introRef.isInView 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-10'
              }`}>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20a1d2] to-[#3eb372]">Tair</span>
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                  Born and raised in Almaty, Kazakhstan, Tair Narynov developed a deep appreciation for education from an early age. 
                  Witnessing firsthand the disparities in educational opportunities across Central Asia, particularly in STEM fields, 
                  Tair was inspired to create change.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                  As a <strong className="text-[#20a1d2]">4.0 GPA student at High Bluff Academy in San Diego, California</strong>, Tair exemplifies academic excellence while 
                  balancing numerous leadership roles. His passion for science led him to secure a 
                  <strong className="text-[#3eb372]"> research internship at UC San Diego (UCSD)</strong>, where he contributes to cutting-edge research.
                </p>
                <div className="flex flex-wrap gap-4 mt-8 animate-fade-in-up" style={{ animationDelay: '1s' }}>
                  <a 
                    href="https://www.linkedin.com/in/tair-narynov-0107572a0" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:rotate-1 font-medium shadow-lg hover:shadow-xl"
                  >
                    <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    LinkedIn
                  </a>
                  <a 
                    href="mailto:narynovts@gmail.com" 
                    className="group inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 hover:-rotate-1 font-medium shadow-lg hover:shadow-xl"
                  >
                    <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </a>
                </div>
              </div>
              
              <div className={`lg:w-2/5 transition-all duration-1000 delay-400 ${
                introRef.isInView 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-10'
              }`}>
                <div className="relative">
                  <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500 max-w-sm mx-auto">
                    <img 
                      src="/images/team/tair-narynov.jpg" 
                      alt="Tair Narynov - Founder and Global Director of STEM Central Asia" 
                      className="w-full h-auto"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/400x400?text=Tair+Narynov';
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Academic Interests and Achievements */}
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Academic Interests */}
              <div 
                ref={interestsRef.ref}
                className={`transition-all duration-1000 ${
                  interestsRef.isInView 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20a1d2] to-[#3eb372]">Interests</span>
                </h2>
                <div className="space-y-6">
                  {academicInterests.map((interest, index) => (
                    <div 
                      key={interest.title}
                      className={`group bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 ${
                        interestsRef.isInView 
                          ? 'opacity-100 translate-x-0' 
                          : 'opacity-0 -translate-x-10'
                      }`}
                      style={{ transitionDelay: `${index * 0.2}s` }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                          {interest.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#20a1d2] transition-colors duration-300">{interest.title}</h3>
                          <p className="text-gray-600">{interest.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div 
                ref={achievementsRef.ref}
                className={`transition-all duration-1000 delay-300 ${
                  achievementsRef.isInView 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20a1d2] to-[#3eb372]">Achievements</span>
                </h2>
                <div className="space-y-6">
                  {achievements.map((achievement, index) => (
                    <div 
                      key={achievement.title}
                      className={`group bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:-rotate-1 ${
                        achievementsRef.isInView 
                          ? 'opacity-100 translate-x-0' 
                          : 'opacity-0 translate-x-10'
                      }`}
                      style={{ transitionDelay: `${index * 0.2}s` }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300">
                          {achievement.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#3eb372] transition-colors duration-300">{achievement.title}</h3>
                          <p className="text-gray-600">{achievement.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section ref={timelineProgressRef} className="py-16 bg-white relative overflow-hidden">
          {/* Animated background elements that respond to scroll */}
          <div className="absolute inset-0 pointer-events-none">
            <div 
              className="absolute w-64 h-64 bg-blue-100/30 rounded-full blur-3xl transition-all duration-1000"
              style={{
                top: `${10 + timelineProgress * 20}%`,
                left: `${5 + timelineProgress * 10}%`,
                opacity: timelineProgress * 0.6,
              }}
            />
            <div 
              className="absolute w-48 h-48 bg-green-100/30 rounded-full blur-3xl transition-all duration-1000"
              style={{
                bottom: `${15 + timelineProgress * 15}%`,
                right: `${10 + timelineProgress * 8}%`,
                opacity: timelineProgress * 0.4,
              }}
            />
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <h2 
              className={`text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center transition-all duration-1000 ${
                timelineHasStarted 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
            >
              Educational <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20a1d2] to-[#3eb372]">Journey</span>
            </h2>
            
            <div className="relative">
              {/* Enhanced animated progress line */}
              <div className="absolute left-4 md:left-1/2 top-0 w-0.5 h-full transform -translate-x-1/2">
                {/* Background line */}
                <div className="w-full h-full bg-gray-200 rounded-full"></div>
                {/* Animated progress line */}
                <div 
                  className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#20a1d2] via-[#3eb372] to-[#20a1d2] rounded-full transition-all duration-2000 ease-out"
                  style={{ 
                    height: `${Math.max(0, Math.min(100, timelineProgress * 100))}%`,
                  }}
                />
                {/* Glowing effect at the tip */}
                <div 
                  className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#3eb372] rounded-full shadow-lg transition-all duration-300"
                  style={{ 
                    top: `${Math.max(0, Math.min(95, timelineProgress * 100))}%`,
                    opacity: timelineProgress > 0.1 ? 1 : 0,
                    boxShadow: `0 0 20px #3eb372`,
                  }}
                />
              </div>
              
              <div className="space-y-12">
                {timelineEvents.map((event, index) => (
                  <TimelineItem
                    key={event.year}
                    event={event}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="relative py-12 bg-gradient-to-r from-[#20a1d2] via-[#3eb372] to-[#20a1d2] text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div 
              className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"
              style={{
                transform: `translate(${mousePosition.x * 0.08}px, ${mousePosition.y * 0.06}px)`
              }}
            />
            <div 
              className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl animate-float" 
              style={{ 
                animationDelay: '2s',
                transform: `translate(${mousePosition.x * -0.04}px, ${mousePosition.y * 0.05}px)`
              }}
            />
            <div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white/5 rounded-full blur-2xl animate-float" 
              style={{ 
                animationDelay: '1s',
                transform: `translate(-50%, -50%) translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.03}px)`
              }}
            />
          </div>
          
          <div 
            ref={ctaRef.ref}
            className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${
              ctaRef.isInView 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6 animate-bounce-slow">
              <svg className="w-8 h-8 text-white icon-lightning-enhanced animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-lg">
              Connect with Tair
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-white/90 drop-shadow-md leading-relaxed">
              Interested in collaborating or learning more about STEM Central Asia's initiatives?
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link 
                to="/join" 
                className="group inline-flex items-center px-8 py-4 border-2 border-white text-lg font-semibold rounded-xl text-white hover:bg-white hover:text-[#20a1d2] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:rotate-1"
              >
                <svg className="w-6 h-6 mr-3 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Join Our Mission
              </Link>
              <a 
                href="mailto:narynovts@gmail.com" 
                className="group inline-flex items-center px-8 py-4 bg-white rounded-xl text-[#20a1d2] hover:bg-gray-50 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:-rotate-1"
              >
                <svg className="w-6 h-6 mr-3 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Directly
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* CSS animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes bounce-slow {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-10px);
            }
            60% {
              transform: translateY(-5px);
            }
          }
          @keyframes spin-slow {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          @keyframes timeline-pulse {
            0% {
              transform: scale(1);
              box-shadow: 0 0 0 0 rgba(62, 179, 114, 0.7);
            }
            50% {
              transform: scale(1.1);
              box-shadow: 0 0 0 10px rgba(62, 179, 114, 0.2);
            }
            100% {
              transform: scale(1);
              box-shadow: 0 0 0 20px rgba(62, 179, 114, 0);
            }
          }
          @keyframes timeline-dot {
            0% {
              opacity: 0;
              transform: scale(0.8);
            }
            50% {
              opacity: 1;
              transform: scale(1.2);
            }
            100% {
              opacity: 0.7;
              transform: scale(1);
            }
          }
          @keyframes slide-in-from-left {
            0% {
              opacity: 0;
              transform: translateX(-50px) rotate(-3deg);
            }
            100% {
              opacity: 1;
              transform: translateX(0) rotate(0deg);
            }
          }
          @keyframes slide-in-from-right {
            0% {
              opacity: 0;
              transform: translateX(50px) rotate(3deg);
            }
            100% {
              opacity: 1;
              transform: translateX(0) rotate(0deg);
            }
          }
          @keyframes grow-line {
            0% {
              width: 0%;
              opacity: 0;
            }
            100% {
              width: 100%;
              opacity: 1;
            }
          }
          @keyframes glow-pulse {
            0%, 100% {
              box-shadow: 0 0 5px rgba(32, 161, 210, 0.3);
            }
            50% {
              box-shadow: 0 0 20px rgba(32, 161, 210, 0.6), 0 0 30px rgba(62, 179, 114, 0.4);
            }
          }
          @keyframes text-shimmer {
            0% {
              background-position: -200% center;
            }
            100% {
              background-position: 200% center;
            }
          }
          @keyframes float-gentle {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }
            33% {
              transform: translateY(-10px) rotate(1deg);
            }
            66% {
              transform: translateY(5px) rotate(-1deg);
            }
          }
          
          .animate-bounce-slow {
            animation: bounce-slow 3s ease-in-out infinite;
          }
          .animate-spin-slow {
            animation: spin-slow 8s linear infinite;
          }
          .animate-timeline-pulse {
            animation: timeline-pulse 2s ease-in-out infinite;
          }
          .animate-timeline-dot {
            animation: timeline-dot 2s ease-in-out infinite;
          }
          .animate-slide-in-left {
            animation: slide-in-from-left 0.8s ease-out;
          }
          .animate-slide-in-right {
            animation: slide-in-from-right 0.8s ease-out;
          }
          .animate-grow-line {
            animation: grow-line 1s ease-out;
          }
          .animate-glow-pulse {
            animation: glow-pulse 2s ease-in-out infinite;
          }
          .animate-text-shimmer {
            background: linear-gradient(90deg, #374151 25%, #60A5FA 50%, #374151 75%);
            background-size: 200% 100%;
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: text-shimmer 2s ease-in-out infinite;
          }
          .animate-float-gentle {
            animation: float-gentle 6s ease-in-out infinite;
          }
          
          /* Smooth scroll behavior for timeline */
          .timeline-container {
            scroll-behavior: smooth;
          }
          
          /* Custom scrollbar for timeline section */
          .timeline-section::-webkit-scrollbar {
            width: 4px;
          }
          .timeline-section::-webkit-scrollbar-track {
            background: #f1f5f9;
          }
          .timeline-section::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #20a1d2, #3eb372);
            border-radius: 2px;
          }
          .timeline-section::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, #1e90d2, #36a36a);
          }
        `
      }} />
    </>
  );
} 