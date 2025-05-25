/****** BEGIN App.tsx ******/
import React from 'react';
import { createBrowserRouter, RouterProvider, Link, Outlet } from 'react-router-dom';
import './App.css';
import Events from './pages/Events';
import JoinUs from './pages/JoinUs';
import About from './pages/About';
import Departments from './pages/Departments';
import Mission from './pages/Mission';
import Navbar from './components/Navbar';
import Newsletter from './components/Newsletter';

const HomePage = () => {
  const countries = [
    { name: 'Kazakhstan', flag: '/images/homepage/kazakhstan.jpg' },
    { name: 'Kyrgyzstan', flag: '/images/homepage/kyrgyzstan.jpg' },
    { name: 'Tajikistan', flag: '/images/homepage/tajikistan.jpg' },
    { name: 'Turkmenistan', flag: '/images/homepage/Turkmenistan.jpg' },
    { name: 'Uzbekistan', flag: '/images/homepage/Uzbekistan.jpg' }
  ];

  return (
    <main className="main-content">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#20a1d2] via-[#3eb372] to-[#20a1d2] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/40" />
          <img 
            src="/images/homepage/IMG_9921.jpg" 
            alt="Students engaged in activities" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 z-10">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-white drop-shadow-2xl [text-shadow:_2px_2px_10px_rgb(0_0_0_/_90%)]">
              Central Asia
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white drop-shadow-xl [text-shadow:_1px_1px_8px_rgb(0_0_0_/_80%)]">
              Building a brighter future by connecting young minds with opportunities in Science, Technology, Engineering, and Mathematics.
            </p>
          </div>

          {/* Flags Section */}
          <div className="flex justify-center items-center space-x-8 mb-12 relative z-10">
            {countries.map((country) => (
              <div key={country.name} className="group relative">
                <div className="w-24 h-16 md:w-32 md:h-20 overflow-hidden border-4 border-white shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                  <img
                    src={country.flag}
                    alt={`${country.name} flag`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error(`Error loading image for ${country.name}:`, e);
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/placeholder.jpg';
                    }}
                  />
                </div>
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap font-medium">
                  {country.name}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-center relative z-10">
            <Link 
              to="/join" 
              className="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-md bg-white/10 text-white backdrop-blur-sm hover:bg-white hover:text-[#20a1d2] md:text-xl md:px-12 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Join Our Mission
            </Link>
          </div>
        </div>
      </section>

      {/* Our Focus Areas */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#20a1d2] mb-4">Our Focus Areas</h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            We're committed to three key pillars that drive our mission forward and create lasting impact across Central Asia.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300 border border-gray-100">
              <div className="relative">
                <img src="/images/homepage/IMG_9920.JPG" alt="STEM Education" className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-[#20a1d2]">Education</h3>
                <p className="text-gray-600">Providing quality STEM education through workshops, bootcamps, and hands-on learning experiences.</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-[#20a1d2]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                    </svg>
                    Hands-on Workshops
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-[#20a1d2]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                    </svg>
                    Coding Bootcamps
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-[#20a1d2]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                    </svg>
                    Project-Based Learning
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300 border border-gray-100">
              <div className="relative">
                <img src="/images/homepage/IMG_9897.JPG" alt="Research and Innovation" className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-[#e76713]">Research</h3>
                <p className="text-gray-600">Supporting research initiatives and fostering innovation in Central Asian institutions.</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-[#e76713]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                    </svg>
                    Research Projects
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-[#e76713]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                    </svg>
                    Innovation Labs
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-[#e76713]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                    </svg>
                    Collaborative Studies
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300 border border-gray-100">
              <div className="relative">
                <img src="/images/homepage/IMG_9953.jpg" alt="Community Building" className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-[#edbb4d]">Community</h3>
                <p className="text-gray-600">Building a strong network of STEM professionals, educators, and students across Central Asia.</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-[#edbb4d]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                    </svg>
                    Networking Events
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-[#edbb4d]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                    </svg>
                    Mentorship Programs
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-[#edbb4d]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                    </svg>
                    Knowledge Sharing
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-[#20a1d2] mb-4">Our Vision for Central Asia</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              We envision a Central Asia where every young mind has access to quality STEM education, 
              fostering innovation and technological advancement across the region.
            </p>
          </div>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-3xl font-bold text-center text-[#20a1d2] mb-8">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300 border border-gray-100">
              <div className="text-4xl font-bold text-[#20a1d2] mb-2">49.6%</div>
              <p className="text-gray-600">Women researchers in Central Asian R&D</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300 border border-gray-100">
              <div className="text-4xl font-bold text-[#e76713] mb-2">35%</div>
              <p className="text-gray-600">STEM graduates in Uzbekistan (2018)</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300 border border-gray-100">
              <div className="text-4xl font-bold text-[#edbb4d] mb-2">300+</div>
              <p className="text-gray-600">Young minds engaged in STEM initiatives</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-[#20a1d2] mb-4">What Our Community Says</h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Hear from students and educators who have been part of our journey in transforming STEM education in Central Asia.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-[#20a1d2] flex items-center justify-center text-white text-xl font-semibold">
                  A
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Aisha K.</h4>
                  <p className="text-sm text-gray-600">Student, Kazakhstan</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"The workshops opened my eyes to the possibilities in technology. I'm now pursuing a career in software development."</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-[#e76713] flex items-center justify-center text-white text-xl font-semibold">
                  M
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Mirlan T.</h4>
                  <p className="text-sm text-gray-600">Educator, Kyrgyzstan</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"The resources and support provided have helped me create more engaging STEM lessons for my students."</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-[#edbb4d] flex items-center justify-center text-white text-xl font-semibold">
                  S
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Sabina R.</h4>
                  <p className="text-sm text-gray-600">Researcher, Uzbekistan</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"Being part of this community has connected me with fellow researchers and opened new collaboration opportunities."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />

      {/* Enhanced Call to Action */}
      <section className="bg-gradient-to-r from-[#20a1d2] via-[#3eb372] to-[#20a1d2] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white drop-shadow-lg">Be Part of the Change</h2>
          <p className="text-xl mb-6 max-w-3xl mx-auto text-white drop-shadow-md">
            Join us in our mission to transform STEM education in Central Asia. Whether you're a student, educator, or industry professional, there's a place for you in our community.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/events" 
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-[#20a1d2] transition-all duration-300 shadow-md"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Upcoming Events
            </Link>
            <Link 
              to="/join" 
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border-2 border-white bg-white text-base font-medium rounded-md text-[#20a1d2] hover:bg-blue-50 transition-all duration-300 shadow-md"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              {/* Add social media links here */}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} STEM in Central Asia. All rights reserved.</p>
        </div>
      </div>
      </footer>
    </div>
  );

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "events", element: <Events /> },
      { path: "about", element: <About /> },
      { path: "join", element: <JoinUs /> },
      { path: "departments", element: <Departments /> },
      { path: "mission", element: <Mission /> }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
/***** END App.tsx ******/
