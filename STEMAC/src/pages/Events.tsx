import React, { useState, useEffect, useRef } from "react";
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Modern intersection observer hook
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

interface Event {
  id: string;
  title: string;
  description: string;
  type: "workshop" | "bootcamp" | "competition" | "seminar";
  status: "upcoming" | "ongoing" | "completed";
  location?: string;
  image?: string;
  featured?: boolean;
}

const events: Event[] = [
  {
    id: "1",
    title: "STEM Workshop Series",
    description: "A comprehensive series covering various STEM topics including robotics, programming, and engineering principles. Join us for hands-on learning experiences designed to inspire the next generation of innovators.",
    type: "workshop",
    status: "upcoming",
    location: "Almaty, Kazakhstan",
    image: "/images/events/workshop.jpg",
    featured: true
  },
  {
    id: "2",
    title: "Coding Bootcamp 2025",
    description: "Intensive coding bootcamp for beginners and intermediate learners. Master Python, web development, and modern programming practices in this immersive experience.",
    type: "bootcamp",
    status: "upcoming",
    location: "Astana, Kazakhstan",
    image: "/images/events/coding.jpg",
    featured: true
  },
  {
    id: "3",
    title: "Science Fair 2025",
    description: "Annual science fair showcasing student projects from across Central Asia. Join us for an exciting showcase of innovation, creativity, and scientific discovery!",
    type: "competition",
    status: "upcoming",
    location: "Tashkent, Uzbekistan",
    image: "/images/events/science-fair.jpg"
  },
  {
    id: "4",
    title: "Tech Innovation Summit",
    description: "Learn about the latest technological innovations and their impact on Central Asia's development. Network with industry leaders and emerging tech entrepreneurs.",
    type: "seminar",
    status: "upcoming",
    location: "Bishkek, Kyrgyzstan",
    image: "/images/events/tech-seminar.jpg"
  },
  {
    id: "5",
    title: "Mathematics Olympiad",
    description: "Regional mathematics competition for high school students with prizes and recognition. Challenge yourself with complex problems and compete with the brightest minds.",
    type: "competition",
    status: "upcoming",
    location: "Dushanbe, Tajikistan",
    image: "/images/events/math-olympiad.jpg"
  },
  {
    id: "6",
    title: "Robotics Championship",
    description: "Build, program, and compete with your robot creations. Teams from across Central Asia will showcase their engineering skills in this exciting competition.",
    type: "competition",
    status: "upcoming",
    location: "Almaty, Kazakhstan",
    image: "/images/events/robotics.jpg"
  }
];

const EventCard = ({ event, index }: { event: Event; index: number }) => {
  const { ref, isInView } = useInView(0.1);
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'workshop':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        );
      case 'bootcamp':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case 'competition':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'seminar':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'workshop': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'bootcamp': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'competition': return 'bg-green-100 text-green-700 border-green-200';
      case 'seminar': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div 
      ref={ref}
      className={`group transition-all duration-700 ease-out ${
        isInView 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-8 scale-95'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <Card className={`h-full bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 border-0 overflow-hidden ${
        event.featured ? 'ring-2 ring-[#3eb372]/20' : ''
      }`}>
        <div className="relative">
          <div className="h-56 overflow-hidden">
            <img
              src={event.image || 'https://via.placeholder.com/400x300?text=Event+Image'}
              alt={event.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/400x300?text=Event+Image';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>
          
          {/* Type badge */}
          <div className={`absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${getTypeColor(event.type)} backdrop-blur-sm`}>
            {getTypeIcon(event.type)}
            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
          </div>
          
          {/* Featured badge */}
          {event.featured && (
            <div className="absolute top-4 right-4 bg-[#3eb372] text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
              Featured
            </div>
          )}
          
          {/* Date overlay */}
          {event.status === "upcoming" && (
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
              <div className="text-[#20a1d2] font-bold text-sm">
                Coming Soon
              </div>
            </div>
          )}
        </div>
        
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-gray-900 group-hover:text-[#20a1d2] transition-colors duration-300 line-clamp-2">
            {event.title}
          </CardTitle>
          {event.location && (
            <div className="flex items-center text-sm text-gray-500 mt-2">
              <svg className="w-4 h-4 mr-2 text-[#3eb372]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{event.location}</span>
            </div>
          )}
        </CardHeader>
        
        <CardContent className="space-y-4 flex-grow flex flex-col">
          <p className="text-gray-600 line-clamp-3 flex-grow">{event.description}</p>
          
          <div className="pt-4">
            <Button className="w-full bg-gradient-to-r from-[#20a1d2] to-[#3eb372] hover:from-[#1b8ab3] hover:to-[#36a869] text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Learn More
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default function Events() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const heroRef = useInView(0.3);
  const filtersRef = useInView(0.2);

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

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || event.type === selectedType;
    return matchesSearch && matchesType;
  });

  const eventTypes = [
    { key: "all", label: "All Events", count: events.length },
    { key: "workshop", label: "Workshops", count: events.filter(e => e.type === "workshop").length },
    { key: "bootcamp", label: "Bootcamps", count: events.filter(e => e.type === "bootcamp").length },
    { key: "competition", label: "Competitions", count: events.filter(e => e.type === "competition").length },
    { key: "seminar", label: "Seminars", count: events.filter(e => e.type === "seminar").length }
  ];

  return (
    <>
      <Helmet>
        <title>Events | STEM Central Asia</title>
        <meta name="description" content="Join exciting STEM events across Central Asia. From workshops to bootcamps, competitions to seminars - discover opportunities to learn, compete, and innovate." />
        <meta name="keywords" content="STEM events, workshops, bootcamps, competitions, seminars, Central Asia, science fair, coding, robotics" />
        <link rel="canonical" href="https://stemac-qd0c6ygd7-mikezenkos-projects.vercel.app/events" />
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
        <section className="relative py-20 bg-gradient-to-r from-[#20a1d2] via-[#3eb372] to-[#20a1d2] text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-800/30 via-purple-800/20 to-blue-900/30"></div>
          </div>
          
          {/* Floating elements */}
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
          </div>
          
          <div 
            ref={heroRef.ref}
            className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${
              heroRef.isInView 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-8 animate-bounce-slow">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
              Upcoming Events
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto text-white/90 drop-shadow-md leading-relaxed mb-8">
              Join us for exciting STEM events across Central Asia. From workshops to bootcamps, 
              we're building a community of future innovators and problem solvers.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-lg">
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <svg className="w-6 h-6 mr-3 text-[#3eb372]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>6 Upcoming Events</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <svg className="w-6 h-6 mr-3 text-[#3eb372]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <span>5 Countries</span>
              </div>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-16 bg-white">
          <div 
            ref={filtersRef.ref}
            className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
              filtersRef.isInView 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            {/* Search Bar - Centered */}
            <div className="text-center mb-12">
              <div className="max-w-md mx-auto">
                <div className="relative">
                  <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <Input
                    type="search"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-[#20a1d2] rounded-xl shadow-lg w-full"
                  />
                </div>
              </div>
            </div>
            
            {/* Filter Buttons - Centered */}
            <div className="flex justify-center mb-12">
              <div className="flex gap-3 flex-wrap justify-center">
                {eventTypes.map((type) => (
                  <Button
                    key={type.key}
                    variant={selectedType === type.key ? "default" : "outline"}
                    onClick={() => setSelectedType(type.key)}
                    className={`px-6 py-3 font-medium rounded-xl transition-all duration-300 transform hover:scale-105 ${
                      selectedType === type.key 
                        ? "bg-gradient-to-r from-[#20a1d2] to-[#3eb372] text-white shadow-lg hover:shadow-xl" 
                        : "border-2 border-gray-200 hover:border-[#20a1d2] hover:text-[#20a1d2]"
                    }`}
                  >
                    {type.label}
                    <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                      {type.count}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="pb-20 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredEvents.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredEvents.map((event, index) => (
                  <EventCard key={event.id} event={event} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-600 mb-2">No events found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search or filters to find more events</p>
                <Button 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedType("all");
                  }}
                  className="bg-gradient-to-r from-[#20a1d2] to-[#3eb372] text-white px-8 py-3"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* CSS animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
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
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          .animate-bounce-slow {
            animation: bounce-slow 3s ease-in-out infinite;
          }
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `
      }} />
    </>
  );
} 