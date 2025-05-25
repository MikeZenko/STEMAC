import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Link } from "react-router-dom"

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
    description: "Share your skills and make a difference in students' lives",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  },
  {
    title: "Teach",
    description: "Lead workshops and inspire the next generation",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    )
  },
  {
    title: "Partner",
    description: "Collaborate with us to expand our impact",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  }
]

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this to your backend
    console.log("Form submitted:", formData)
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
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-xl p-8 text-center">
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-[#20a1d2]/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-[#20a1d2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-[#20a1d2] mb-4">Thank You for Your Interest!</h2>
            <p className="text-gray-600 mb-8">
              We appreciate you reaching out to STEM Central Asia. Our team will review your information and get back to you soon.
            </p>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                While you wait, you might be interested in:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/events"
                  className="inline-flex items-center justify-center px-6 py-3 border border-[#20a1d2] text-[#20a1d2] rounded-md hover:bg-[#20a1d2] hover:text-white transition-colors duration-200"
                >
                  View Upcoming Events
                </Link>
                <Link 
                  to="/departments"
                  className="inline-flex items-center justify-center px-6 py-3 bg-[#20a1d2] text-white rounded-md hover:bg-[#1b86b0] transition-colors duration-200"
                >
                  Explore Our Departments
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[#20a1d2] mb-4">Join Our Mission</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Whether you're a student, educator, or industry professional, there are many ways 
            to get involved with STEM Central Asia. Join us in shaping the future of STEM education.
          </p>
        </div>

        {/* Opportunities Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center text-[#20a1d2] mb-8">Ways to Get Involved</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {opportunities.map((opportunity) => (
              <Card key={opportunity.title} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto text-[#3eb372] mb-4">
                    {opportunity.icon}
                  </div>
                  <CardTitle className="text-xl text-[#20a1d2]">{opportunity.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{opportunity.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-[#20a1d2]/10">
            <CardHeader>
              <CardTitle className="text-2xl text-[#20a1d2]">Get in Touch</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you soon</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                      placeholder="Enter your first name"
                      required
                      className="border-gray-200 focus:border-[#20a1d2]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                      placeholder="Enter your last name"
                      required
                      className="border-gray-200 focus:border-[#20a1d2]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter your email"
                      required
                      className="border-gray-200 focus:border-[#20a1d2]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Enter your phone number"
                      className="border-gray-200 focus:border-[#20a1d2]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">I am a...</Label>
                  <Select 
                    value={formData.role}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}
                  >
                    <SelectTrigger className="border-gray-200 focus:border-[#20a1d2]">
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

                <div className="space-y-3">
                  <Label>I'm interested in...</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {interests.map((interest) => (
                      <div key={interest.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={interest.id}
                          checked={formData.interests.includes(interest.id)}
                          onCheckedChange={(checked) => 
                            handleInterestChange(checked as boolean, interest.id)
                          }
                        />
                        <label
                          htmlFor={interest.id}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {interest.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Tell us more about your interest in STEM Central Asia..."
                    className="min-h-[100px] border-gray-200 focus:border-[#20a1d2]"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="subscribe"
                    checked={formData.subscribe}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, subscribe: checked as boolean }))
                    }
                  />
                  <label
                    htmlFor="subscribe"
                    className="text-sm text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Keep me updated about STEM Central Asia news and opportunities
                  </label>
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-[#20a1d2] hover:bg-[#1b8ab3] text-white"
                >
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 