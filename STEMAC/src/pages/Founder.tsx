import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function Founder() {
  return (
    <>
      <Helmet>
        <title>Founder | STEM Central Asia</title>
        <meta
          name="description"
          content="A short note from the founder of STEM Central Asia."
        />
        <link
          rel="canonical"
          href="https://stemac-qp35nolzx-mikezenkos-projects.vercel.app/founder"
        />
      </Helmet>

      <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm uppercase tracking-widest text-[#3eb372] font-semibold mb-4">
              About the founder
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              A note from{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20a1d2] to-[#3eb372]">
                Tair Narynov
              </span>
            </h1>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              STEM Central Asia exists because too many bright students across
              Central Asia don&apos;t have access to the kind of STEM education
              and opportunities that change lives. I started this organization
              to help close that gap — not to put any one person at the centre
              of the work.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The real story of STEM Central Asia is the students, educators,
              mentors, and partners across Kazakhstan, Kyrgyzstan, Tajikistan,
              Turkmenistan, Uzbekistan, and Afghanistan who make our programs
              possible. That&apos;s where I&apos;d much rather your attention go.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/mission"
                className="inline-flex items-center px-6 py-3 rounded-md bg-[#20a1d2] text-white font-medium hover:bg-[#1b86b0] transition-colors"
              >
                Read our mission
              </Link>
              <Link
                to="/join"
                className="inline-flex items-center px-6 py-3 rounded-md border border-[#20a1d2] text-[#20a1d2] font-medium hover:bg-[#20a1d2]/5 transition-colors"
              >
                Get involved
              </Link>
              <a
                href="mailto:centralasiastem@gmail.com"
                className="inline-flex items-center px-6 py-3 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Contact us
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
