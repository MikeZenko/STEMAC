import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loading from "@/components/ui/Loading";

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }
    
    setStatus('loading');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success
      setStatus('success');
      toast.success("Thank you for subscribing to our newsletter!");
      setEmail('');
      
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    } catch (error) {
      setStatus('error');
      toast.error("Something went wrong. Please try again.");
      
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-20">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-green-50/50"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#20a1d2]/5 to-[#3eb372]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#3eb372]/5 to-[#20a1d2]/5 rounded-full blur-3xl"></div>
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(#20a1d2 1px, transparent 1px)', 
          backgroundSize: '30px 30px' 
        }} />
      </div>
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#20a1d2] to-[#3eb372] rounded-full mb-8">
            <svg className="w-8 h-8 text-white icon-envelope-enhanced" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Stay <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20a1d2] to-[#3eb372]">Connected</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Subscribe to our newsletter for the latest updates on events, opportunities, and success stories across Central Asia.
          </p>
          
          {/* Feature highlights */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8">
            <div className="flex items-center text-gray-600">
              <div className="w-2 h-2 bg-[#20a1d2] rounded-full mr-3"></div>
              <span className="text-sm font-medium">Weekly Updates</span>
            </div>
            <div className="flex items-center text-gray-600">
              <div className="w-2 h-2 bg-[#3eb372] rounded-full mr-3"></div>
              <span className="text-sm font-medium">Event Notifications</span>
            </div>
            <div className="flex items-center text-gray-600">
              <div className="w-2 h-2 bg-[#edbb4d] rounded-full mr-3"></div>
              <span className="text-sm font-medium">Success Stories</span>
            </div>
          </div>
        </div>
        
        {/* Enhanced form */}
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative group">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-6 py-4 text-lg rounded-xl border-2 border-gray-200 focus:border-[#20a1d2] focus:ring-4 focus:ring-[#20a1d2]/20 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                placeholder="Enter your email address"
                disabled={status === 'loading' || status === 'success'}
              />
              {status === 'success' && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            
            <Button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="w-full py-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-[#20a1d2] to-[#3eb372] hover:from-[#1b8bb3] hover:to-[#359c63] text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-[#20a1d2]/30"
            >
              {status === 'loading' ? (
                <div className="flex items-center justify-center">
                  <Loading size="sm" color="white" text="" />
                  <span className="ml-2">Subscribing...</span>
                </div>
              ) : status === 'success' ? (
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Successfully Subscribed!
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Subscribe to Newsletter
                </div>
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 flex items-center justify-center">
              <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter; 