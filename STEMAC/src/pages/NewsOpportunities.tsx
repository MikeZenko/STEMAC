import React, { useState, useEffect, useRef } from "react";
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useLinkPreview } from "@/hooks/useLinkPreview";

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

interface NewsItem {
  id: string;
  title: string;
  description: string;
  source: string;
  sourceUrl: string;
  url: string;
  category: "news" | "scholarship" | "competition" | "program" | "research";
  tags: string[];
  date: string;
  featured?: boolean;
  image?: string;
}

// Sample data - In a real application, this would be fetched from an API
const newsItems: NewsItem[] = [
  {
    id: "0",
    title: "Crisis in Afghanistan: Taliban Bans Girls from Secondary Education",
    description: "Since returning to power in August 2021, the Taliban has systematically restricted girls' education in Afghanistan. Despite initial promises, girls are banned from attending secondary schools and universities. This educational crisis affects millions of Afghan girls, creating a generation gap in female education and severely limiting future opportunities for women in the country.",
    source: "Human Rights Watch",
    sourceUrl: "https://www.hrw.org",
    url: "https://www.hrw.org/world-report/2022/country-chapters/afghanistan",
    category: "news",
    tags: ["Afghanistan", "Girls Education", "Human Rights", "Taliban Ban", "Educational Crisis"],
    date: "2025-06-01",
    featured: true,
    image: "https://www.hrw.org/sites/default/files/styles/1200w/public/media_2022/01/202201asia_afghanistan_banner.jpg"
  },
  {
    id: "1",
    title: "8 students from Kyrgyzstan win medals at Al-Khwarizmi International Mathematics and Informatics Olympiad",
    description: "The Kyrgyz national team won 1 gold, 2 silver, and 1 bronze medals in Informatics and gold, 3 silver, 1 bronze in mathematics at the 3rd Al-Khwarizmi International Mathematics and Informatics Olympiad in Tashkent, competing against 205 students from 9 countries.",
    source: "AKIpress",
    sourceUrl: "https://akipress.com",
    url: "https://m.akipress.com/news:831015:8_students_from_Kyrgyzstan_win_medals_at__Al-Khwarizmi_International_Mathematics_and_Informatics_Olympiad_in_Tashkent/",
    category: "competition",
    tags: ["Mathematics", "Informatics", "Olympiad", "Kyrgyzstan", "Uzbekistan"],
    date: "2025-05-15",
    featured: true
  },
  {
    id: "2",
    title: "U.S.-CAEF Enterprise Fellowship Program 2025-26 Application Now Open",
    description: "The U.S.-Central Asia Education Foundation offers four-year scholarships to exceptional students from Kazakhstan, Kyrgyzstan, Tajikistan, and Uzbekistan. Awards are based on financial need, academic achievement, and commitment to Central Asian development, focusing on business and technology with emphasis on entrepreneurship.",
    source: "USCAEF",
    sourceUrl: "https://uscaef.org",
    url: "https://uscaef.org/",
    category: "scholarship",
    tags: ["Scholarship", "Undergraduate", "Business", "Technology", "Entrepreneurship"],
    date: "2025-04-20",
    featured: true,
    image: "https://uscaef.org/wp-content/uploads/2019/09/20150421_100219-1024x683.jpg"
  },
  {
    id: "3",
    title: "Robotics for Good Youth Challenge 2025-2026 Registration Opens",
    description: "The UN-based Robotics for Good Youth Challenge invites students to design, build, and program robots to complete missions based on global challenges. The competition features Junior (born 2010-2013) and Senior (born 2006-2009) divisions with qualifying tournaments across Central Asia, including Kazakhstan, Uzbekistan, and Kyrgyzstan.",
    source: "AI for Good",
    sourceUrl: "https://aiforgood.itu.int",
    url: "https://aiforgood.itu.int/robotics-for-good-youth-challenge/",
    category: "competition",
    tags: ["Robotics", "Programming", "Engineering", "UN", "Global Challenges"],
    date: "2025-05-14",
    featured: true,
    image: "https://aiforgood.itu.int/wp-content/uploads/2023/04/AdobeStock_464153764-scaled-e1682332356794-1200x675.jpeg"
  },
  {
    id: "4",
    title: "Research: How a Tutor's Gender Affects Girls' Interest in STEM",
    description: "A new Stanford University study found that pairing girls with female math tutors increases their interest in STEM fields and improves academic performance in math. Girl students paired with female tutors were 4 percentage points more likely to earn a C-minus or better in Algebra 1 and reported greater interest in pursuing STEM majors and careers.",
    source: "Education Week",
    sourceUrl: "https://www.edweek.org",
    url: "https://www.edweek.org/leadership/how-a-tutors-gender-affects-girls-interest-in-stem/2025/05",
    category: "research",
    tags: ["Gender Equality", "Tutoring", "Mathematics", "Education Research"],
    date: "2025-05-21",
    image: "https://www.edweek.org/media/ed-futures-article-stem.jpg"
  },
  {
    id: "5",
    title: "Central Asian University Merit-Based Scholarships for 2025 Entry",
    description: "Central Asian University offers merit-based scholarships to recognize and support top students from Central Asian countries (Uzbekistan, Tajikistan, Kazakhstan, Kyrgyzstan, and Turkmenistan). The top 10% of applicants with highest scores on the university's scholarship exam will receive 25-100% tuition coverage for their first semester.",
    source: "Central Asian University",
    sourceUrl: "https://centralasian.uz",
    url: "https://centralasian.uz/merit-basedscholarship-2025",
    category: "scholarship",
    tags: ["Scholarship", "Merit-Based", "University", "Tuition Coverage"],
    date: "2025-05-01"
  },
  {
    id: "6",
    title: "Bolashak International Scholarship Program Now Accepting Applications",
    description: "Kazakhstan's prestigious Bolashak Scholarship program is now accepting applications for the 2025 academic year. The program provides full funding for Kazakh students to study at leading universities worldwide in key STEM fields, with a focus on developing skills needed for Kazakhstan's economic and social development.",
    source: "Bolashak",
    sourceUrl: "https://bolashak.gov.kz",
    url: "https://bolashak.gov.kz/ru",
    category: "scholarship",
    tags: ["Kazakhstan", "International Study", "Full Funding", "Graduate Studies"],
    date: "2025-04-15"
  },
  {
    id: "7",
    title: "RoboContest Online Programming Competition for Central Asian Students",
    description: "RoboContest, the leading algorithmic programming platform in Central Asia, announces its 103rd online competition open to all high school and university students. The platform offers challenging problems in mathematics, algorithms, and data structures with real-time ratings and competitive programming experience.",
    source: "RoboContest",
    sourceUrl: "https://robocontest.uz",
    url: "https://robocontest.uz/",
    category: "competition",
    tags: ["Programming", "Algorithms", "Online Competition", "Uzbekistan"],
    date: "2025-03-09"
  },
  {
    id: "8",
    title: "Kazakhstan, Armenia, and Uzbekistan Experts Discuss Making STEM Education Accessible",
    description: "Experts from Kazakhstan, Armenia, and Uzbekistan will participate in a Global Impact Conference discussion on how to make STEM education more accessible to all students and promote women's leadership in STEM fields. The conference will bring together specialists, speakers, and educators from across Central Asia.",
    source: "Impact Mission",
    sourceUrl: "https://impact-mission.org",
    url: "https://impact-mission.org/blog/experts-from-kazakhstan-armenia-and-uzbekistan-will-talk-about-how-to-make-stem-education-accessible/",
    category: "news",
    tags: ["Education Access", "Women in STEM", "Regional Cooperation"],
    date: "2025-01-25"
  },
  {
    id: "9",
    title: "FIRST Kazakhstan Robotics Competitions 2025 Season Announced",
    description: "FIRST Kazakhstan announces the 'FIRST DIVE' 2024-2025 season, focusing on water resource challenges and underwater exploration through robotics projects. Programs are available for different age groups, from FIRST LEGO League Discover (ages 4-6) to FIRST Global Challenge (ages 14-18), with regional competitions across Kazakhstan.",
    source: "FIRST Robotics",
    sourceUrl: "https://firstrobotics.kz",
    url: "https://firstroboticskz.vercel.app/",
    category: "program",
    tags: ["Robotics", "LEGO", "Engineering", "Kazakhstan", "Competition"],
    date: "2025-02-18",
    image: ""
  },
  {
    id: "10",
    title: "CAU Five Central Asian Countries Scholarship Program for 2024-2025",
    description: "The CAU Five Central Asian Countries Scholarship is now accepting applications from citizens of Kazakhstan, Kyrgyzstan, Tajikistan, Turkmenistan, and Uzbekistan. The scholarship covers tuition, housing, insurance, and provides a living stipend for a 1-year foundation program plus 4-year undergraduate studies.",
    source: "China Agricultural University",
    sourceUrl: "https://en.cau.edu.cn",
    url: "https://en.cau.edu.cn/art/2023/8/15/art_25250_928102.html",
    category: "scholarship",
    tags: ["Full Scholarship", "Undergraduate", "Chinese Universities", "HSK"],
    date: "2025-01-10",
    image: ""
  },
  {
    id: "11",
    title: "Development of ML Framework for Predicting Student Performance in STEM Education",
    description: "Researchers from Kazakhstan have developed a framework using Machine Learning algorithms to predict students' academic performance in STEM disciplines. The study, published in the International Journal of Advanced Computer Science and Applications, evaluates multiple ML models to help identify at-risk students and create customized learning pathways.",
    source: "SAI Organization",
    sourceUrl: "https://thesai.org",
    url: "https://thesai.org/Publications/ViewPaper?Volume=15&Issue=1&Code=IJACSA&SerialNo=5",
    category: "research",
    tags: ["Machine Learning", "Education Technology", "Academic Performance", "Kazakhstan"],
    date: "2025-01-15"
  },
  {
    id: "12",
    title: "RoboKidz Robotics School in Uzbekistan Launches Free Master Classes",
    description: "RoboKidz, a leading robotics school in Tashkent, is offering free introductory master classes for children ages 6-8 interested in robotics and programming. The hands-on sessions introduce basic robotics concepts and programming in a fun, game-based format using LEGO educational sets.",
    source: "RoboKidz",
    sourceUrl: "https://robokidz.uz",
    url: "https://robokidz.uz/",
    category: "program",
    tags: ["Robotics", "Programming", "Children", "Uzbekistan", "Free"],
    date: "2025-01-05"
  },
  {
    id: "13",
    title: "Afghan Girls Denied Education Turn to Underground Schools",
    description: "Since the Taliban takeover, thousands of Afghan girls have been banned from secondary education. In response, an underground network of secret schools has emerged across Afghanistan, where volunteer teachers provide lessons in private homes and basements. These clandestine classrooms offer crucial STEM education to girls who would otherwise be denied their right to learn.",
    source: "The New Humanitarian",
    sourceUrl: "https://www.thenewhumanitarian.org",
    url: "https://www.thenewhumanitarian.org/news-feature/2022/02/02/Afghan-women-girls-education-Taliban",
    category: "news",
    tags: ["Afghanistan", "Underground Education", "Girls in STEM", "Resistance", "Volunteer Teaching"],
    date: "2025-05-28",
    image: ""
  },
  {
    id: "14",
    title: "Remote Learning Scholarship Program for Afghan Girls in STEM",
    description: "A coalition of international organizations has launched a scholarship program specifically designed for Afghan girls denied access to formal education. The program provides tablets, internet access, and online courses in STEM subjects taught by female instructors from around the world. The initiative aims to reach 5,000 girls across Afghanistan in its first year, focusing on rural and underserved areas.",
    source: "Global Education Initiative",
    sourceUrl: "https://www.globalpartnership.org",
    url: "https://www.globalpartnership.org/where-we-work/afghanistan",
    category: "scholarship",
    tags: ["Afghanistan", "Remote Learning", "STEM Scholarship", "Girls Education", "Digital Access"],
    date: "2025-04-15"
  }
];

const NewsCard = ({ item, index }: { item: NewsItem; index: number }) => {
  const { ref, isInView } = useInView(0.1);
  const preview = useLinkPreview(item.url);
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'news':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        );
      case 'scholarship':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
          </svg>
        );
      case 'competition':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'program':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.168 18.477 18.582 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'research':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'news': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'scholarship': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'competition': return 'bg-green-100 text-green-700 border-green-200';
      case 'program': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'research': return 'bg-pink-100 text-pink-700 border-pink-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Get image from link preview or use fallbacks
  const getImageUrl = () => {
    // First try to use the image from the link preview
    if (preview.image && !preview.loading) {
      return preview.image;
    }
    
    // Then try to use the explicitly provided image
    if (item.image) {
      return item.image;
    }
    
    // Default images based on category as fallback
    const defaultImages = {
      'news': '/images/homepage/IMG_9921.jpg',
      'scholarship': '/images/homepage/IMG_9920.JPG',
      'competition': '/images/homepage/IMG_9897.JPG',
      'program': '/images/homepage/IMG_9953.jpg',
      'research': '/images/homepage/IMG_9920.JPG'
    };
    
    return defaultImages[item.category] || defaultImages.news;
  };

  // Debugging info
  // console.log(`Preview for ${item.title}:`, preview);

  return (
    <div 
      ref={ref}
      className={`group transition-all duration-700 ease-out ${
        isInView 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-8 scale-95'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Card className={`h-full bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 overflow-hidden ${
        item.featured ? 'ring-2 ring-[#20a1d2]/30' : ''
      }`}>
        <div className="relative h-48 overflow-hidden">
          {preview.loading ? (
            <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : (
            <>
              <img
                src={getImageUrl()}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/homepage/IMG_9921.jpg'; // Fallback image
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            </>
          )}
          <div className="absolute top-3 left-3">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border backdrop-blur-sm ${getCategoryColor(item.category)}`}>
              {getCategoryIcon(item.category)}
              {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
            </div>
          </div>
          {item.featured && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-gradient-to-r from-[#20a1d2] to-[#3eb372] text-white border-0 shadow-lg">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1z" clipRule="evenodd" />
                  <path d="M12.293 4.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-2 2a1 1 0 01-1.414-1.414L12.586 8l-.293-.293a1 1 0 011.414-1.414z" />
                  <path d="M12.293 10.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-2 2a1 1 0 01-1.414-1.414L12.586 14l-.293-.293a1 1 0 011.414-1.414z" />
                  <path d="M6 10a1 1 0 011-1h3a1 1 0 110 2H7a1 1 0 01-1-1zm0 4a1 1 0 011-1h3a1 1 0 110 2H7a1 1 0 01-1-1z" />
                </svg>
                Featured
              </Badge>
            </div>
          )}
        </div>
        
        <CardHeader className="pb-3 pt-4">
          <CardTitle className="text-xl text-gray-900 group-hover:text-[#20a1d2] transition-colors duration-300 line-clamp-2">
            {item.title}
          </CardTitle>
          
          <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-[#3eb372]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{formatDate(item.date)}</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-[#e76713]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <span>{item.source}</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <p className="text-gray-600 line-clamp-3">{item.description}</p>
          
          {item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {item.tags.slice(0, 3).map((tag, idx) => (
                <span 
                  key={idx} 
                  className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors duration-300"
                >
                  {tag}
                </span>
              ))}
              {item.tags.length > 3 && (
                <span className="text-xs px-2 py-1 text-gray-500">
                  +{item.tags.length - 3} more
                </span>
              )}
            </div>
          )}
          
          <div className="pt-4">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-[#20a1d2] to-[#3eb372] hover:from-[#1b8ab3] hover:to-[#36a869] text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
            >
              Read More
              <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default function NewsOpportunities() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const heroRef = useInView(0.3);
  const statsRef = useInView(0.2);
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

  const categories = [
    { key: "all", label: "All", count: newsItems.length, icon: "🌟" },
    { key: "featured", label: "Featured", count: newsItems.filter(i => i.featured).length, icon: "⭐" },
    { key: "latest", label: "Latest", count: 5, icon: "🔥" },
    { key: "afghanistan", label: "Afghanistan", count: newsItems.filter(i => i.tags.includes("Afghanistan")).length, icon: "🇦🇫" },
    { key: "news", label: "News", count: newsItems.filter(i => i.category === "news").length, icon: "📰" },
    { key: "scholarship", label: "Scholarships", count: newsItems.filter(i => i.category === "scholarship").length, icon: "🎓" },
    { key: "competition", label: "Competitions", count: newsItems.filter(i => i.category === "competition").length, icon: "🏆" },
    { key: "program", label: "Programs", count: newsItems.filter(i => i.category === "program").length, icon: "🚀" },
    { key: "research", label: "Research", count: newsItems.filter(i => i.category === "research").length, icon: "🔬" }
  ];

  const filteredNews = newsItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    let matchesCategory = true;
    if (selectedCategory !== "all") {
      if (selectedCategory === "featured") {
        matchesCategory = !!item.featured;
      } else if (selectedCategory === "latest") {
        // Get the 5 most recent items
        const sortedByDate = [...newsItems].sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        const latestIds = sortedByDate.slice(0, 5).map(i => i.id);
        matchesCategory = latestIds.includes(item.id);
      } else if (selectedCategory === "afghanistan") {
        matchesCategory = item.tags.includes("Afghanistan");
      } else {
        matchesCategory = item.category === selectedCategory;
      }
    }
    
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Helmet>
        <title>STEM Opportunities for Central Asian Students | STEM Central Asia</title>
        <meta name="description" content="Current STEM scholarships, competitions, and programs for high school students in Kazakhstan, Kyrgyzstan, Uzbekistan, Tajikistan, and Turkmenistan. Find real opportunities in science, technology, engineering, and mathematics." />
        <meta name="keywords" content="STEM scholarships, STEM competitions, Central Asia, Kazakhstan, Kyrgyzstan, Uzbekistan, Tajikistan, Turkmenistan, high school, science, technology, engineering, mathematics" />
        <link rel="canonical" href="https://stemcentral.asia/news-opportunities" />
      </Helmet>

      <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen overflow-hidden">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div 
            className="absolute w-96 h-96 bg-[#20a1d2]/10 rounded-full blur-3xl animate-pulse"
            style={{
              top: `${15 + mousePosition.y * 0.1}%`,
              left: `${5 + mousePosition.x * 0.05}%`,
            }}
          />
          <div 
            className="absolute w-80 h-80 bg-[#3eb372]/10 rounded-full blur-3xl animate-pulse"
            style={{
              bottom: `${10 + mousePosition.y * 0.08}%`,
              right: `${10 + mousePosition.x * 0.06}%`,
              animationDelay: '1s'
            }}
          />
          <div 
            className="absolute w-64 h-64 bg-[#edbb4d]/10 rounded-full blur-3xl animate-pulse"
            style={{
              top: `${50 + mousePosition.y * 0.05}%`,
              left: `${50 + mousePosition.x * 0.04}%`,
              animationDelay: '2s'
            }}
          />
        </div>

        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-[#20a1d2] via-[#3eb372] to-[#20a1d2] text-white overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-5"></div>
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-800/30 via-purple-800/20 to-blue-900/30"></div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div 
              className="absolute top-20 left-20 w-24 h-24 bg-white/10 rounded-full blur-xl animate-float"
              style={{
                transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`
              }}
            />
            <div 
              className="absolute bottom-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float" 
              style={{ 
                animationDelay: '2s',
                transform: `translate(${mousePosition.x * -0.05}px, ${mousePosition.y * 0.08}px)`
              }}
            />
            <div 
              className="absolute top-1/2 left-1/3 w-20 h-20 bg-white/10 rounded-full blur-xl animate-float" 
              style={{ 
                animationDelay: '4s',
                transform: `translate(${mousePosition.x * 0.08}px, ${mousePosition.y * -0.06}px)`
              }}
            />
            {/* Added geometric elements */}
            <div className="absolute top-10 right-1/4 w-16 h-16 border-2 border-white/20 rounded-lg rotate-45 animate-spin-slow"></div>
            <div className="absolute bottom-1/3 left-1/5 w-20 h-20 border-2 border-white/20 rounded-full animate-pulse"></div>
            <div className="absolute top-1/3 right-1/5 w-12 h-12 border-2 border-white/10 rounded-md animate-bounce-slow"></div>
            
            {/* Science-themed decorative elements */}
            <div className="absolute top-20 right-20 opacity-20">
              <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="10" />
                <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>
            <div className="absolute bottom-20 left-20 opacity-20">
              <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 100 100">
                <path d="M30,70 L70,30" strokeWidth="2" />
                <path d="M30,30 L70,70" strokeWidth="2" />
                <rect x="25" y="25" width="50" height="50" strokeWidth="2" />
              </svg>
            </div>
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
              STEM <span 
                style={{
                  color: '#e9c446', 
                  textShadow: '0 1px 0 rgba(0,0,0,0.3), 0 0 10px rgba(233,196,70,0.7)', 
                  fontWeight: 800,
                  opacity: 1
                }} 
                className="animate-shimmer"
              >Opportunities</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto text-white/90 drop-shadow-md leading-relaxed mb-8">
              Discover the latest scholarships, competitions, research opportunities, and programs 
              in science, technology, engineering, and mathematics for Central Asian high school students.
            </p>
            
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-lg shadow-glow">
              <svg className="w-6 h-6 mr-3 text-[#edbb4d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span className="font-medium">Regularly Updated with Verified Opportunities</span>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section 
          ref={statsRef.ref}
          className={`py-12 bg-white border-b border-gray-100 transition-all duration-1000 ${
            statsRef.isInView 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {[
                { label: "Active Scholarships", value: "4+", icon: "🎓", color: "text-purple-600", bgColor: "bg-purple-100" },
                { label: "Open Competitions", value: "3", icon: "🏆", color: "text-green-600", bgColor: "bg-green-100" },
                { label: "STEM Programs", value: "3", icon: "🚀", color: "text-orange-600", bgColor: "bg-orange-100" }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center group hover:scale-105 transition-transform duration-300"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className={`mx-auto w-16 h-16 ${stat.bgColor} rounded-full flex items-center justify-center mb-3`}>
                    <div className="text-4xl">{stat.icon}</div>
                  </div>
                  <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-12 bg-gray-50">
          <div 
            ref={filtersRef.ref}
            className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
              filtersRef.isInView 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#20a1d2] to-[#3eb372] rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative">
                  <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-[#20a1d2] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <Input
                    type="search"
                    placeholder="Search news, scholarships, competitions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-[#20a1d2] rounded-xl shadow-lg w-full bg-white"
                  />
                </div>
              </div>
            </div>
            
            {/* Category Filters */}
            <div className="flex justify-center">
              <div className="inline-flex gap-3 flex-wrap justify-center bg-white p-2 rounded-2xl shadow-lg">
                {categories.map((category) => (
                  <Button
                    key={category.key}
                    variant={selectedCategory === category.key ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.key)}
                    className={`px-6 py-3 font-medium rounded-xl transition-all duration-300 transform hover:scale-105 ${
                      selectedCategory === category.key 
                        ? "bg-gradient-to-r from-[#20a1d2] to-[#3eb372] text-white shadow-lg hover:shadow-xl border-0" 
                        : "bg-white border-2 border-gray-200 hover:border-[#20a1d2] hover:text-[#20a1d2]"
                    }`}
                  >
                    <span className="mr-2 text-lg">{category.icon}</span>
                    {category.label}
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                      selectedCategory === category.key ? "bg-white/20" : "bg-gray-100"
                    }`}>
                      {category.count}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* News Grid */}
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredNews.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredNews.map((item, index) => (
                  <NewsCard key={item.id} item={item} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 12h-.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-600 mb-2">No items found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
                <Button 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  className="bg-gradient-to-r from-[#20a1d2] to-[#3eb372] text-white px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-[#20a1d2] via-[#3eb372] to-[#20a1d2] text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute top-10 right-10 w-16 h-16 border-2 border-white/20 rounded-full animate-spin-slow"></div>
            <div className="absolute bottom-10 left-10 w-16 h-16 border-2 border-white/20 rounded-lg rotate-45 animate-bounce-slow"></div>
          </div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Want to Submit an Opportunity?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              If you know of a STEM opportunity that would benefit Central Asian students, 
              we'd love to hear about it!
            </p>
            <div className="relative inline-block group">
              <div className="absolute -inset-1 bg-white rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-300"></div>
              <Link to="/join" className="relative inline-flex items-center justify-center bg-white text-[#20a1d2] hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
                Submit an Opportunity
                <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </Link>
            </div>
            <p className="mt-6 text-sm text-white/70">
              Our team will review your submission and respond within 2-3 business days.
            </p>
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
          @keyframes spin-slow {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          @keyframes pulse-slow {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.9;
            }
          }
          @keyframes shimmer {
            0%, 100% {
              text-shadow: 0 1px 0 rgba(0,0,0,0.3), 0 0 10px rgba(233,196,70,0.7);
            }
            25% {
              text-shadow: 0 1px 0 rgba(0,0,0,0.3), 0 0 15px rgba(233,196,70,0.8), 0 0 5px rgba(255,255,255,0.5);
            }
            50% {
              text-shadow: 0 1px 0 rgba(0,0,0,0.3), 0 0 10px rgba(233,196,70,0.7);
            }
            75% {
              text-shadow: 0 1px 0 rgba(0,0,0,0.3), 0 0 12px rgba(233,196,70,0.9), 0 0 7px rgba(255,255,255,0.5);
            }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          .animate-bounce-slow {
            animation: bounce-slow 3s ease-in-out infinite;
          }
          .animate-spin-slow {
            animation: spin-slow 15s linear infinite;
          }
          .animate-pulse-slow {
            animation: pulse-slow 2s ease-in-out infinite;
          }
          .animate-shimmer {
            animation: shimmer 3s ease-in-out infinite;
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
          .shadow-glow {
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
          }
          .bg-pattern {
            background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          }
        `
      }} />
    </>
  );
} 