import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Event {
  id: string;
  title: string;
  description: string;
  type: "workshop" | "bootcamp" | "competition" | "seminar";
  status: "upcoming" | "ongoing" | "completed";
  date?: string;
  location?: string;
  image?: string;
}

const events: Event[] = [
  {
    id: "1",
    title: "STEM Workshop Series",
    description: "A comprehensive series covering various STEM topics including robotics, programming, and engineering principles.",
    type: "workshop",
    status: "upcoming",
    image: "/images/events/workshop.jpg"
  },
  {
    id: "2",
    title: "Coding Bootcamp",
    description: "Intensive coding bootcamp for beginners and intermediate learners. Learn Python, web development, and more.",
    type: "bootcamp",
    status: "upcoming",
    image: "/images/events/coding.jpg"
  },
  {
    id: "3",
    title: "Science Fair 2026",
    description: "Annual science fair showcasing student projects from across Central Asia. Join us for an exciting showcase of innovation!",
    type: "competition",
    status: "upcoming",
    image: "/images/events/science-fair.jpg"
  },
  {
    id: "4",
    title: "Tech Innovation Seminar",
    description: "Learn about the latest technological innovations and their impact on Central Asia's development.",
    type: "seminar",
    status: "upcoming",
    location: "Almaty, Kazakhstan",
    image: "/images/events/tech-seminar.jpg"
  },
  {
    id: "5",
    title: "Mathematics Olympiad",
    description: "Regional mathematics competition for high school students with prizes and recognition.",
    type: "competition",
    status: "upcoming",
    location: "Astana, Kazakhstan",
    image: "/images/events/math-olympiad.jpg"
  }
];

export default function Events() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || event.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-[calc(100vh-6rem-12rem)] bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#20a1d2] mb-4">Upcoming Events</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join us for exciting STEM events across Central Asia. From workshops to bootcamps, 
            we're building a community of future innovators.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="w-full sm:w-64">
            <Input
              type="search"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            <Button
              variant={selectedType === "all" ? "default" : "outline"}
              onClick={() => setSelectedType("all")}
              className={selectedType === "all" ? "bg-[#20a1d2]" : ""}
            >
              All
            </Button>
            <Button
              variant={selectedType === "workshop" ? "default" : "outline"}
              onClick={() => setSelectedType("workshop")}
              className={selectedType === "workshop" ? "bg-[#20a1d2]" : ""}
            >
              Workshops
            </Button>
            <Button
              variant={selectedType === "bootcamp" ? "default" : "outline"}
              onClick={() => setSelectedType("bootcamp")}
              className={selectedType === "bootcamp" ? "bg-[#20a1d2]" : ""}
            >
              Bootcamps
            </Button>
            <Button
              variant={selectedType === "competition" ? "default" : "outline"}
              onClick={() => setSelectedType("competition")}
              className={selectedType === "competition" ? "bg-[#20a1d2]" : ""}
            >
              Competitions
            </Button>
            <Button
              variant={selectedType === "seminar" ? "default" : "outline"}
              onClick={() => setSelectedType("seminar")}
              className={selectedType === "seminar" ? "bg-[#20a1d2]" : ""}
            >
              Seminars
            </Button>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <Card 
              key={event.id}
              className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
            >
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <img
                  src={event.image || 'https://via.placeholder.com/400x300?text=Event+Image'}
                  alt={event.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/400x300?text=Event+Image';
                  }}
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-[#20a1d2]">
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-[#20a1d2]">{event.title}</CardTitle>
                {event.date ? (
                  <CardDescription className="text-[#3eb372] font-medium">
                    {new Date(event.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </CardDescription>
                ) : (
                  <CardDescription className="text-[#3eb372] font-medium">
                    Coming Soon
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-4 flex-grow">
                <p className="text-gray-600">{event.description}</p>
                {event.location && (
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{event.location}</span>
                  </div>
                )}
                <div className="pt-4">
                  <Button className="w-full bg-[#20a1d2] hover:bg-[#1b8ab3] text-white">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-600">No events found matching your criteria</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
} 