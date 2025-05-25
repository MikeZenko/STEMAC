import React, { useState, useEffect, useRef } from "react"
import { Helmet } from 'react-helmet-async';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Link } from "react-router-dom"

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

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  role: string
  message: string
  interests: string[]
  subscribe: boolean
}

const roles = [
  { value: "student", label: "Student" },
  { value: "educator", label: "Educator" },
  { value: "professional", label: "Industry Professional" },
  { value: "volunteer", label: "Volunteer" },
  { value: "partner", label: "Organization/Partner" }
]

const interests = [
  { id: "workshops", label: "STEM Workshops" },
  { id: "mentoring", label: "Mentoring Programs" },
  { id: "research", label: "Research Projects" },
  { id: "events", label: "Events & Competitions" },
  { id: "teaching", label: "Teaching Opportunities" },
  { id: "partnership", label: "Partnership Opportunities" }
]

const opportunities = [
  {
    title: "Volunteer",
    description: "Share your skills and make a difference in students' lives across Central Asia",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    features: ["Mentor students", "Support events", "Share expertise", "Build community"]
  },
  {
    title: "Teach",
    description: "Lead workshops and inspire the next generation of innovators and creators",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    ),
    features: ["Design curriculum", "Lead workshops", "Create content", "Guide projects"]
  },
  {
    title: "Partner",
    description: "Collaborate with us to expand our impact and reach more students",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    features: ["Strategic alliance", "Resource sharing", "Joint programs", "Network expansion"]
  }
]

const OpportunityCard = ({ opportunity, index }: { opportunity: any; index: number }) => {
  const { ref, isInView } = useInView(0.1);

  return (
    <div 
      ref={ref}
      className={`group transition-all duration-700 ease-out ${
        isInView 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-8 scale-95'
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <Card className="h-full bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 border-0 overflow-hidden">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-6 p-4 bg-gradient-to-br from-[#20a1d2]/10 to-[#3eb372]/10 rounded-2xl text-[#3eb372] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
            {opportunity.icon}
          </div>
          <CardTitle className="text-2xl text-gray-900 group-hover:text-[#20a1d2] transition-colors duration-300">
            {opportunity.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-600 text-center leading-relaxed">{opportunity.description}</p>
          
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">What you'll do:</h4>
            <div className="grid grid-cols-1 gap-2">
              {opportunity.features.map((feature: string, idx: number) => (
                <div key={idx} className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-3 text-[#3eb372] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="pt-4">
            <Button className="w-full bg-gradient-to-r from-[#20a1d2] to-[#3eb372] hover:from-[#1b8ab3] hover:to-[#36a869] text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Get Started
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

export default function JoinUs() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    message: "",
    interests: [],
    subscribe: true
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const heroRef = useInView(0.3);
  const opportunitiesRef = useInView(0.2);
  const formRef = useInView(0.2);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this to your backend
    console.log("Form submitted:", formData)
    toast.success("Thank you for your interest! We'll be in touch soon.")
    setIsSubmitted(true)
  }

  const handleInterestChange = (checked: boolean, interest: string) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, interest]
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        interests: prev.interests.filter(i => i !== interest)
      }))
    }
  }

  if (isSubmitted) {
    return (
      <>
        <Helmet>
          <title>Thank You | STEM Central Asia</title>
          <meta name="description" content="Thank you for your interest in STEM Central Asia. We'll be in touch soon!" />
        </Helmet>
        
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center py-12">
          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
              <div className="mb-8">
                <div className="mx-auto w-24 h-24 bg-gradient-to-br from-[#20a1d2]/10 to-[#3eb372]/10 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-12 h-12 text-[#3eb372]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You for Your Interest!</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                We appreciate you reaching out to STEM Central Asia. Our team will review your information and get back to you soon.
              </p>
              
              <div className="space-y-6">
                <p className="text-sm text-gray-500">
                  While you wait, you might be interested in:
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    to="/events"
                    className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#20a1d2] text-[#20a1d2] rounded-xl hover:bg-[#20a1d2] hover:text-white transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    View Upcoming Events
                  </Link>
                  <Link 
                    to="/departments"
                    className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#20a1d2] to-[#3eb372] text-white rounded-xl hover:from-[#1b8ab3] hover:to-[#36a869] transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Explore Our Departments
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>Join Our Mission | STEM Central Asia</title>
        <meta name="description" content="Join STEM Central Asia's mission to empower youth across Central Asia. Whether you're a student, educator, or professional, there are many ways to get involved." />
        <meta name="keywords" content="join STEM Central Asia, volunteer, teach, partner, get involved, STEM education, Central Asia" />
        <link rel="canonical" href="https://stemac-qd0c6ygd7-mikezenkos-projects.vercel.app/join" />
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
              Join Our Mission
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto text-white/90 drop-shadow-md leading-relaxed mb-8">
              Whether you're a student, educator, or industry professional, there are many ways 
              to get involved with STEM Central Asia and shape the future of education.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-lg">
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <svg className="w-6 h-6 mr-3 text-[#3eb372]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>Multiple Ways to Help</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <svg className="w-6 h-6 mr-3 text-[#3eb372]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <span>Across Central Asia</span>
              </div>
            </div>
          </div>
        </section>

        {/* Opportunities Section */}
        <section className="py-20 bg-white">
          <div 
            ref={opportunitiesRef.ref}
            className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
              opportunitiesRef.isInView 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Ways to Get <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20a1d2] to-[#3eb372]">Involved</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Choose how you'd like to contribute to our mission of empowering youth through STEM education
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {opportunities.map((opportunity, index) => (
                <OpportunityCard key={opportunity.title} opportunity={opportunity} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div 
            ref={formRef.ref}
            className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
              formRef.isInView 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20a1d2] to-[#3eb372]">Touch</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Ready to make a difference? Fill out the form below and we'll get back to you soon
              </p>
            </div>

            <Card className="bg-white shadow-2xl border-0 overflow-hidden">
              <div className="bg-gradient-to-r from-[#20a1d2] to-[#3eb372] p-8">
                <h3 className="text-2xl font-bold text-white text-center">Join Our Community</h3>
                <p className="text-white/90 text-center mt-2">Start making an impact today</p>
              </div>
              
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-gray-700 font-medium">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                        placeholder="Enter your first name"
                        required
                        className="border-2 border-gray-200 focus:border-[#20a1d2] rounded-lg py-3 px-4 text-lg transition-colors duration-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-gray-700 font-medium">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                        placeholder="Enter your last name"
                        required
                        className="border-2 border-gray-200 focus:border-[#20a1d2] rounded-lg py-3 px-4 text-lg transition-colors duration-300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700 font-medium">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="Enter your email"
                        required
                        className="border-2 border-gray-200 focus:border-[#20a1d2] rounded-lg py-3 px-4 text-lg transition-colors duration-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-700 font-medium">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="Enter your phone number"
                        className="border-2 border-gray-200 focus:border-[#20a1d2] rounded-lg py-3 px-4 text-lg transition-colors duration-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-gray-700 font-medium">I am a... *</Label>
                    <Select 
                      value={formData.role}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}
                    >
                      <SelectTrigger className="border-2 border-gray-200 focus:border-[#20a1d2] rounded-lg py-3 px-4 text-lg">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.value} value={role.value}>
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-gray-700 font-medium">I'm interested in... (select all that apply)</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {interests.map((interest) => (
                        <div key={interest.id} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-[#20a1d2] transition-colors duration-300">
                          <Checkbox
                            id={interest.id}
                            checked={formData.interests.includes(interest.id)}
                            onCheckedChange={(checked) => 
                              handleInterestChange(checked as boolean, interest.id)
                            }
                          />
                          <label
                            htmlFor={interest.id}
                            className="text-gray-700 font-medium leading-none cursor-pointer"
                          >
                            {interest.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-700 font-medium">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Tell us more about your interest in STEM Central Asia..."
                      className="min-h-[120px] border-2 border-gray-200 focus:border-[#20a1d2] rounded-lg p-4 text-lg transition-colors duration-300"
                    />
                  </div>

                  <div className="flex items-start space-x-3 p-4 rounded-lg bg-gray-50">
                    <Checkbox
                      id="subscribe"
                      checked={formData.subscribe}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, subscribe: checked as boolean }))
                      }
                    />
                    <label
                      htmlFor="subscribe"
                      className="text-gray-600 leading-relaxed cursor-pointer"
                    >
                      Keep me updated about STEM Central Asia news, events, and opportunities
                    </label>
                  </div>

                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#20a1d2] to-[#3eb372] hover:from-[#1b8ab3] hover:to-[#36a869] text-white font-bold py-4 px-8 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Submit Application
                    <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </Button>
                </form>
              </CardContent>
            </Card>
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
        `
      }} />
    </>
  );
} 