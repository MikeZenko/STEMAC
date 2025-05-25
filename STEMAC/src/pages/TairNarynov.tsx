import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function TairNarynov() {
  // Track page view for SEO analytics
  useEffect(() => {
    // Create microdata for search engines
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      'mainEntity': {
        '@type': 'Person',
        'name': 'Tair Narynov',
        'givenName': 'Tair',
        'familyName': 'Narynov',
        'jobTitle': 'Founder and Global Director of STEM Central Asia',
        'description': 'Tair Narynov is a 4.0 GPA student, UCSD research intern, FIRST Robotics competitor, and founder of STEM Central Asia.',
        'alumniOf': [
          {
            '@type': 'EducationalOrganization',
            'name': 'High Bluff Academy',
            'location': 'San Diego, California'
          }
        ],
        'knowsAbout': ['STEM Education', 'Robotics', 'Biochemistry', 'Leadership'],
        'memberOf': [
          {
            '@type': 'Organization',
            'name': 'MarauderTech 9573 FIRST Robotics Team'
          },
          {
            '@type': 'Organization',
            'name': 'Model United Nations Club',
            'roleName': 'President'
          },
          {
            '@type': 'Organization',
            'name': 'Associated Student Body (ASB)'
          }
        ],
        'award': 'Bishops SWEN Knights Hackathon Winner (Lockheed Martin sponsored)',
        'sameAs': ['https://linkedin.com/in/tairnarynov']
      }
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <Helmet prioritizeSeoTags>
        <title>Tair Narynov - Founder, Student, Researcher, Leader | Official Profile</title>
        <meta name="description" content="Official profile of Tair Narynov, founder of STEM Central Asia, 4.0 GPA student at High Bluff Academy, UCSD research intern, FIRST Robotics competitor, and Model UN President." />
        <meta name="keywords" content="Tair Narynov, Tair, Narynov, STEM Central Asia founder, High Bluff Academy, UCSD research intern, FIRST Robotics, MarauderTech 9573, Model UN President, ASB, Aerospace Robotics" />
        <link rel="canonical" href="https://stemac-qp35nolzx-mikezenkos-projects.vercel.app/tair-narynov" />
        
        {/* Additional meta tags for search engines */}
        <meta property="article:author" content="Tair Narynov" />
        <meta property="article:published_time" content="2024-07-03" />
        <meta property="article:modified_time" content="2024-07-03" />
        <meta property="article:section" content="Biography" />
        <meta property="article:tag" content="Tair Narynov" />
        <meta property="article:tag" content="STEM Central Asia" />
        <meta property="article:tag" content="Founder" />
        
        {/* Open Graph tags specifically for Tair Narynov */}
        <meta property="og:title" content="Tair Narynov - Founder, Student, Researcher, Leader | Official Profile" />
        <meta property="og:description" content="Learn about Tair Narynov, the visionary founder of STEM Central Asia. 4.0 GPA student, UCSD research intern, robotics competitor, and passionate advocate for STEM education." />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://stemac-qp35nolzx-mikezenkos-projects.vercel.app/tair-narynov" />
        <meta property="og:image" content="https://stemac-qp35nolzx-mikezenkos-projects.vercel.app/images/team/tair-narynov.jpg" />
        <meta property="profile:first_name" content="Tair" />
        <meta property="profile:last_name" content="Narynov" />
        <meta property="profile:username" content="tairnarynov" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <main className="max-w-4xl mx-auto">
          <header className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#20a1d2]">
              Tair Narynov
            </h1>
            <p className="text-xl text-[#3eb372] mb-8">
              Founder & Global Director of STEM Central Asia
            </p>
            <div className="rounded-xl overflow-hidden shadow-xl max-w-md mx-auto">
              <img 
                src="/images/team/tair-narynov.jpg" 
                alt="Tair Narynov - Founder and Global Director of STEM Central Asia" 
                className="w-full h-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/600x400?text=Tair+Narynov';
                }}
              />
            </div>
          </header>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-[#20a1d2] text-center">Who is Tair Narynov?</h2>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <p className="text-lg text-gray-700 mb-6">
                <strong>Tair Narynov</strong> is a visionary leader and founder of STEM Central Asia, an organization dedicated to promoting science, technology, engineering, and mathematics education across Central Asia. Born and raised in Almaty, Kazakhstan, <strong>Tair Narynov</strong> currently maintains a perfect 4.0 GPA at High Bluff Academy in San Diego, California.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                As a research intern at the University of California, San Diego (UCSD), <strong>Tair Narynov</strong> has demonstrated exceptional commitment to scientific inquiry and innovation. His participation in FIRST Robotics with team MarauderTech 9573 showcases his technical abilities and teamwork skills.
              </p>
              <p className="text-lg text-gray-700">
                <strong>Tair Narynov's</strong> leadership extends to serving as President of the Model United Nations club and active involvement in the Associated Student Body (ASB). His victory at the Bishops SWEN Knights Hackathon, sponsored by Lockheed Martin, highlights his problem-solving capabilities and innovative thinking.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-[#20a1d2] text-center">Achievements of Tair Narynov</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-[#20a1d2] mb-3">Academic Excellence</h3>
                <p className="text-gray-700">
                  <strong>Tair Narynov</strong> maintains a perfect 4.0 GPA at High Bluff Academy in San Diego, California, demonstrating exceptional academic dedication and intellectual ability.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-[#20a1d2] mb-3">Research Experience</h3>
                <p className="text-gray-700">
                  As a research intern at UCSD, <strong>Tair Narynov</strong> has gained valuable hands-on experience in cutting-edge scientific research, contributing to real-world applications of science and technology.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-[#20a1d2] mb-3">FIRST Robotics Competition</h3>
                <p className="text-gray-700">
                  <strong>Tair Narynov's</strong> participation with MarauderTech 9573 in the FIRST Robotics Competition has allowed him to develop engineering skills, collaborative problem-solving, and technical expertise.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-[#20a1d2] mb-3">Hackathon Winner</h3>
                <p className="text-gray-700">
                  <strong>Tair Narynov</strong> secured victory at the prestigious Bishops SWEN Knights Hackathon, sponsored by aerospace giant Lockheed Martin, showcasing his innovative thinking and technical abilities.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-[#20a1d2] text-center">Leadership Roles of Tair Narynov</h2>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <ul className="space-y-6">
                <li className="flex">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#20a1d2] flex items-center justify-center text-white font-bold mr-4">
                    F
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#20a1d2]">Founder & Global Director</h3>
                    <p className="text-gray-700">
                      <strong>Tair Narynov</strong> founded STEM Central Asia to bridge educational gaps and empower youth across Central Asia through science, technology, engineering, and mathematics.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#20a1d2] flex items-center justify-center text-white font-bold mr-4">
                    P
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#20a1d2]">President, Model United Nations Club</h3>
                    <p className="text-gray-700">
                      As MUN Club President, <strong>Tair Narynov</strong> guides club activities, organizes debates, and represents the school at regional conferences, developing diplomatic and leadership skills.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#20a1d2] flex items-center justify-center text-white font-bold mr-4">
                    T
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#20a1d2]">Team Leader, Aerospace Robotics Coding Competition</h3>
                    <p className="text-gray-700">
                      <strong>Tair Narynov</strong> led a team of talented peers to develop innovative solutions for aerospace robotics challenges, demonstrating technical leadership and project management skills.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <section className="text-center">
            <h2 className="text-3xl font-bold mb-6 text-[#20a1d2]">Connect with Tair Narynov</h2>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <a 
                href="https://linkedin.com/in/tairnarynov" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                aria-label="Connect with Tair Narynov on LinkedIn"
              >
                <svg className="w-5 h-5 mr-3 text-[#0077b5]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn
              </a>
              <a 
                href="mailto:tair@stemcentralasia.org" 
                className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                aria-label="Email Tair Narynov"
              >
                <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email
              </a>
            </div>
            <Link 
              to="/founder" 
              className="inline-flex items-center px-8 py-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-[#20a1d2] hover:bg-[#1b86b0] transition-colors duration-200"
            >
              Learn More About Tair Narynov's Vision for STEM Central Asia
            </Link>
          </section>

          {/* Hidden SEO content with high keyword density */}
          <div className="hidden">
            <h2>Tair Narynov - Biography and Achievements</h2>
            <p>This page contains information about Tair Narynov, the founder of STEM Central Asia.</p>
            <p>Tair Narynov is a student at High Bluff Academy with a 4.0 GPA.</p>
            <p>Tair Narynov works as a research intern at UCSD.</p>
            <p>Tair Narynov participates in FIRST Robotics with team MarauderTech 9573.</p>
            <p>Tair Narynov won the Bishops SWEN Knights Hackathon sponsored by Lockheed Martin.</p>
            <p>Tair Narynov serves as President of the Model United Nations club.</p>
            <p>Tair Narynov is active in the Associated Student Body (ASB).</p>
            <p>Tair Narynov led a team in the Aerospace Robotics Coding Competition.</p>
            <p>Contact Tair Narynov at tair@stemcentralasia.org.</p>
            <p>Connect with Tair Narynov on LinkedIn at linkedin.com/in/tairnarynov.</p>
          </div>
        </main>
      </div>
    </>
  );
} 