import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // TODO: Replace with actual API call
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      setMessage('Thank you for subscribing to our newsletter!');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Stay Updated with STEM CA
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Subscribe to our newsletter for the latest updates on events, opportunities, and success stories.
        </p>
        <form onSubmit={handleSubmit} className="mt-8 sm:flex justify-center">
          <div className="min-w-0 flex-1">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your email"
            />
          </div>
          <div className="mt-3 sm:mt-0 sm:ml-3">
            <button
              type="submit"
              disabled={status === 'loading'}
              className={`block w-full px-4 py-3 rounded-md shadow bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm ${
                status === 'loading' ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
        </form>
        {message && (
          <p className={`mt-4 text-sm ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Newsletter; 