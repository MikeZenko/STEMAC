/****** BEGIN App.tsx ******/
import React, { useEffect, useState, useRef } from 'react';
import { createBrowserRouter, RouterProvider, Link, Outlet, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './App.css';
import Events from './pages/Events';
import JoinUs from './pages/JoinUs';
import About from './pages/About';
import Departments from './pages/Departments';
import Mission from './pages/Mission';
import Founder from './pages/Founder';
import TairNarynov from './pages/TairNarynov';
import NewsOpportunities from './pages/NewsOpportunities';
import Navbar from './components/Navbar';
import Newsletter from './components/Newsletter';
import { Toaster } from '@/components/ui/toaster';
import Hero from './components/Hero';
import BackToTop from './components/BackToTop';

// ScrollToTop component - scrolls to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const HomePage = () => {
  const [eyeHasTriggered, setEyeHasTriggered] = useState(false);
  const eyeRef = useRef<HTMLDivElement>(null);
  
  const countries = [
    { name: 'Kazakhstan', flag: '/images/homepage/kazakhstan.jpg' },
    { name: 'Kyrgyzstan', flag: '/images/homepage/kyrgyzstan.jpg' },
    { name: 'Tajikistan', flag: '/images/homepage/tajikistan.jpg' },
    { name: 'Afghanistan', flag: '/images/homepage/afghanistan.jpg' },
    { name: 'Turkmenistan', flag: '/images/homepage/Turkmenistan.jpg' },
    { name: 'Uzbekistan', flag: '/images/homepage/Uzbekistan.jpg' }
  ];

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
        threshold: 0.5, // Trigger when 50% of the element is visible
        rootMargin: '0px 0px -100px 0px' // Trigger a bit before the element is fully visible
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
    <main className="main-content">
      {/* Hero Section */}
      <Hero />

      {/* Trust Indicators */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-600">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Trusted by 300+ students</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <span className="text-sm font-medium">6 Countries Served</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
              <span className="text-sm font-medium">Expert Educators</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Hands-on Learning</span>
            </div>
          </div>
        </div>
      </section>

      {/* Our Focus Areas - Enhanced Design */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#20a1d2] to-[#3eb372] rounded-full mb-6">
              <svg className="w-8 h-8 text-white icon-lightning-enhanced" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20a1d2] to-[#3eb372]">Transforming</span> Central Asia
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our strategic focus areas are designed to address the unique STEM education challenges and opportunities in Central Asia.
            </p>
          </div>

          {/* Focus Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Education Card */}
            <div className="group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-[#20a1d2]/5 to-[#20a1d2]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                  <img src="/images/homepage/IMG_9920.JPG" alt="STEM Education" className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.168 18.477 18.582 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 mr-3">STEM Education</h3>
                    <div className="h-1 flex-1 bg-gradient-to-r from-[#20a1d2] to-transparent rounded"></div>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    We're expanding access to quality STEM education through interactive workshops, bootcamps, and project-based learning for students across all socioeconomic backgrounds.
                  </p>
                  <div className="space-y-3">
                    {[
                      {text: 'Hands-on Workshops', value: '12+ Workshops Conducted'},
                      {text: 'Coding Bootcamps', value: '5 Cities Reached'},
                      {text: 'Project-Based Learning', value: '150+ Students Engaged'}
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-sm text-gray-700">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-[#20a1d2] rounded-full mr-3 flex-shrink-0"></div>
                          <span>{item.text}</span>
                        </div>
                        <span className="text-[#20a1d2] font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <Link to="/join" className="inline-flex items-center text-[#20a1d2] font-medium hover:text-[#20a1d2]/80 transition-colors">
                      Get involved
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
              </div>
              </div>
            </div>

            {/* Research Card */}
            <div className="group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-[#e76713]/5 to-[#e76713]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                  <img src="/images/homepage/IMG_9897.JPG" alt="Research and Innovation" className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 mr-3">Research & Innovation</h3>
                    <div className="h-1 flex-1 bg-gradient-to-r from-[#e76713] to-transparent rounded"></div>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Cultivating a culture of inquiry and innovation by supporting student research projects and connecting them with global innovation ecosystems.
                  </p>
                  <div className="space-y-3">
                    {[
                      {text: 'Student Research Projects', value: '8 Projects Supported'},
                      {text: 'Innovation Competitions', value: '3 Events Hosted'},
                      {text: 'International Collaborations', value: '4 Partners'}
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-sm text-gray-700">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-[#e76713] rounded-full mr-3 flex-shrink-0"></div>
                          <span>{item.text}</span>
                        </div>
                        <span className="text-[#e76713] font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <Link to="/events" className="inline-flex items-center text-[#e76713] font-medium hover:text-[#e76713]/80 transition-colors">
                      View our initiatives
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
              </div>
              </div>
            </div>

            {/* Community Card */}
            <div className="group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-[#edbb4d]/5 to-[#edbb4d]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                  <img src="/images/homepage/IMG_9953.jpg" alt="Community Building" className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 mr-3">Community Building</h3>
                    <div className="h-1 flex-1 bg-gradient-to-r from-[#edbb4d] to-transparent rounded"></div>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Creating a vibrant network of STEM enthusiasts, educators, and professionals across Central Asia to foster collaboration and knowledge sharing.
                  </p>
                  <div className="space-y-3">
                    {[
                      {text: 'Networking Events', value: '6 Events Organized'},
                      {text: 'Mentorship Programs', value: '25+ Active Mentors'},
                      {text: 'Online Community', value: '300+ Members'}
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-sm text-gray-700">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-[#edbb4d] rounded-full mr-3 flex-shrink-0"></div>
                          <span>{item.text}</span>
                        </div>
                        <span className="text-[#edbb4d] font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <Link to="/about" className="inline-flex items-center text-[#edbb4d] font-medium hover:text-[#edbb4d]/80 transition-colors">
                      Meet our community
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Statement - Enhanced */}
      <section className="py-20 bg-white relative overflow-hidden" ref={eyeRef}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 opacity-50"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#20a1d2]/10 to-[#3eb372]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#3eb372]/10 to-[#20a1d2]/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Vision text content */}
            <div className="lg:w-1/2">
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
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20a1d2] to-[#3eb372]">Vision</span> for Central Asia
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                We envision a Central Asia where every young mind has access to quality STEM education, 
                fostering innovation and technological advancement across the region.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                By 2030, we aim to empower over 10,000 students with STEM skills, establish innovation hubs in all six Central Asian countries, and create a self-sustaining ecosystem of STEM educators and mentors.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-10 h-10 bg-[#20a1d2]/10 rounded-full flex items-center justify-center mb-4">
                    <div className="w-5 h-5 bg-[#20a1d2] rounded-full"></div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Education</h3>
                  <p className="text-sm text-gray-600">Accessible STEM learning for all</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-10 h-10 bg-[#3eb372]/10 rounded-full flex items-center justify-center mb-4">
                    <div className="w-5 h-5 bg-[#3eb372] rounded-full"></div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Innovation Focus</h3>
                  <p className="text-sm text-gray-600">Nurturing creative problem solvers</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-10 h-10 bg-[#edbb4d]/10 rounded-full flex items-center justify-center mb-4">
                    <div className="w-5 h-5 bg-[#edbb4d] rounded-full"></div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Regional Impact</h3>
                  <p className="text-sm text-gray-600">Building connections across borders</p>
                </div>
              </div>
              
              <Link to="/mission" className="inline-flex items-center text-[#20a1d2] font-medium hover:text-[#20a1d2]/80 transition-colors">
                Read our full mission
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
            
            {/* Vision image/visual */}
            <div className="lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#20a1d2]/30 to-[#3eb372]/30 mix-blend-overlay"></div>
                <img 
                  src="/images/homepage/IMG_9921.jpg" 
                  alt="Students collaborating on STEM projects" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg max-w-xs text-center transform transition-transform duration-500 hover:scale-105">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Join Our Mission</h3>
                    <p className="text-gray-600 mb-4">Be part of the movement to transform STEM education in Central Asia</p>
                    <Link 
                      to="/join"
                      className="inline-block px-4 py-2 bg-gradient-to-r from-[#20a1d2] to-[#3eb372] text-white font-medium rounded-md hover:opacity-90 transition-opacity"
                    >
                      Get Involved
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Statistics - Enhanced */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20a1d2] to-[#3eb372]">Impact</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real numbers that showcase our commitment to transforming STEM education across Central Asia.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 text-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#20a1d2]/5 to-[#20a1d2]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-[#20a1d2] to-[#20a1d2]/80 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="text-5xl font-bold text-[#20a1d2] mb-3">49.6%</div>
                <p className="text-gray-600 font-medium">Women researchers in Central Asian R&D</p>
              </div>
            </div>
            
            <div className="group relative bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 text-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#e76713]/5 to-[#e76713]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-[#e76713] to-[#e76713]/80 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div className="text-5xl font-bold text-[#e76713] mb-3">35%</div>
                <p className="text-gray-600 font-medium">STEM graduates in Uzbekistan (2018)</p>
              </div>
            </div>
            
            <div className="group relative bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 text-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#edbb4d]/5 to-[#edbb4d]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-r from-[#edbb4d] to-[#edbb4d]/80 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="text-5xl font-bold text-[#edbb4d] mb-3">300+</div>
                <p className="text-gray-600 font-medium">Young minds engaged in STEM initiatives</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Enhanced */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Voices from Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20a1d2] to-[#3eb372]">Community</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from students, educators, and partners who are part of our journey to transform STEM education across Central Asia.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Aisha Karimova",
                role: "Student, Nazarbayev University",
                location: "Kazakhstan",
                avatar: "/images/team/placeholder-female.jpg",
                color: "#20a1d2",
                quote: "The robotics workshop completely changed my perspective on engineering. I never thought I could build something that actually works! Now I'm mentoring younger students in my community."
              },
              {
                name: "Dr. Mirlan Torobekov",
                role: "Physics Teacher",
                location: "Kyrgyzstan",
                avatar: "/images/team/placeholder-male.jpg",
                color: "#e76713",
                quote: "The teaching resources and professional development opportunities have transformed my classroom. My students are now actively engaged in hands-on experiments rather than just theoretical learning."
              },
              {
                name: "Sabina Rahimova",
                role: "Tech Entrepreneur",
                location: "Uzbekistan",
                avatar: "/images/team/placeholder-female.jpg",
                color: "#edbb4d",
                quote: "As someone who had to leave Central Asia to access quality tech education, I'm thrilled to partner with an organization building these opportunities locally. The talent and creativity is incredible."
              }
            ].map((testimonial, index) => (
              <div key={index} className="group relative bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full blur-xl"></div>
                <div className="relative">
                  <div className="flex items-center mb-6">
                    <div className="h-16 w-16 rounded-full overflow-hidden shadow-lg border-2" style={{ borderColor: testimonial.color }}>
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = '/images/homepage/IMG_9921.jpg';
                        }}
                      />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                      <div className="flex items-center mt-1">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: testimonial.color }}></div>
                        <span className="text-xs text-gray-500">{testimonial.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <svg className="w-8 h-8" style={{ color: testimonial.color + '40' }} fill="currentColor" viewBox="0 0 32 32">
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                  </div>
                  <p className="text-gray-700 leading-relaxed italic">"{testimonial.quote}"</p>
                  <div className="mt-6 pt-6 border-t border-gray-100 flex justify-end">
                    <span className="inline-flex items-center text-sm" style={{ color: testimonial.color }}>
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Verified Student
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/about" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-[#20a1d2] to-[#3eb372] hover:opacity-90 transition-opacity shadow-md">
              Read More Success Stories
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />

      {/* Enhanced Call to Action */}
      <section className="relative py-20 bg-gradient-to-r from-[#20a1d2] via-[#3eb372] to-[#20a1d2] text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white/5 rounded-full blur-2xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-8">
            <svg className="w-10 h-10 text-white icon-lightning-enhanced" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">
            Be Part of the <span className="text-yellow-300">Change</span>
          </h2>
          <p className="text-xl md:text-2xl mb-10 max-w-4xl mx-auto text-white/90 drop-shadow-md leading-relaxed">
            Join us in our mission to transform STEM education in Central Asia. Whether you're a student, educator, or industry professional, there's a place for you in our community.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link 
              to="/events" 
              className="group w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border-2 border-white text-lg font-semibold rounded-xl text-white hover:bg-white hover:text-[#20a1d2] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <svg className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Upcoming Events
            </Link>
            <Link 
              to="/join" 
              className="group w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border-2 border-white bg-white text-lg font-semibold rounded-xl text-[#20a1d2] hover:bg-yellow-50 hover:border-yellow-200 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <svg className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Get Involved
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

const Layout = () => (
  <div className="min-h-screen flex flex-col bg-gray-50">
    <Navbar />
    <ScrollToTop />
    <Outlet />
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-400">Empowering Central Asia through STEM education and innovation.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/events" className="text-gray-400 hover:text-white">Events</Link></li>
              <li><Link to="/news-opportunities" className="text-gray-400 hover:text-white">News & Opportunities</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link to="/join" className="text-gray-400 hover:text-white">Join Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-400">Email: centralasiastem@gmail.com</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} STEM in Central Asia. All rights reserved.</p>
        </div>
      </div>
    </footer>
    <BackToTop />
    <Toaster />
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "mission", element: <Mission /> },
      { path: "departments", element: <Departments /> },
      { path: "about", element: <About /> },
      { path: "founder", element: <Founder /> },
      { path: "tair-narynov", element: <TairNarynov /> },
      { path: "events", element: <Events /> },
      { path: "join", element: <JoinUs /> },
      { path: "news-opportunities", element: <NewsOpportunities /> }
    ]
  }
]);

function App() {
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}

export default App;
/***** END App.tsx ******/

