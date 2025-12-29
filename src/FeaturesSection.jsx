import './FeaturesSection.css'
import { Lightbulb, Target, BarChart3, Zap, FileText, Sparkles } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'

const features = [
  {
    id: 1,
    title: 'AI-Powered Writing',
    description: 'Our AI analyzes job descriptions and crafts compelling bullet points that highlight your achievements.',
    icon: Lightbulb
  },
  {
    id: 2,
    title: 'ATS Optimization',
    description: 'Get your resume past applicant tracking systems with keyword optimization and proper formatting.',
    icon: Target
  },
  {
    id: 3,
    title: 'Match Score Analysis',
    description: 'See how well your resume matches job requirements with real-time scoring and suggestions.',
    icon: BarChart3
  },
  {
    id: 4,
    title: 'Instant Generation',
    description: 'Create professional resumes in minutes with our intelligent template system.',
    icon: Zap
  },
  {
    id: 5,
    title: 'Multiple Templates',
    description: 'Choose from beautifully designed templates that work across all industries and experience levels.',
    icon: FileText
  },
  {
    id: 6,
    title: 'Smart Suggestions',
    description: 'Get personalized recommendations to improve your content, formatting, and overall presentation.',
    icon: Sparkles
  }
]

export default function FeaturesSection() {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [headingVisible, setHeadingVisible] = useState(false);
  const cardRefs = useRef([]);

  useEffect(() => {
    // Observer for heading and subtitle
    const headingObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeadingVisible(true);
        }
      },
      { 
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    const headingSection = document.getElementById('features-heading');
    if (headingSection) headingObserver.observe(headingSection);

    // Observer for individual cards
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardIndex = cardRefs.current.indexOf(entry.target);
            setVisibleCards(prev => new Set([...prev, cardIndex]));
          }
        });
      },
      { 
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe all cards
    cardRefs.current.forEach((card) => {
      if (card) cardObserver.observe(card);
    });

    return () => {
      if (headingSection) headingObserver.unobserve(headingSection);
      cardRefs.current.forEach((card) => {
        if (card) cardObserver.unobserve(card);
      });
    };
  }, []);

  return (
    <section id="features" className="features">
      <div className="features-container">
        <div id="features-heading">
          <h2 className={`features-heading ${headingVisible ? 'animate-in' : ''}`}>
            Why choose <span className="gradient-text">Resumind?</span>
          </h2>
          <p className={`features-subtitle ${headingVisible ? 'animate-in' : ''}`}>
            Everything you need to land your dream job
          </p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div
                key={feature.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={`feature-card ${visibleCards.has(index) ? 'animate-in' : ''}`}
              >
                <div className="feature-icon">
                  <IconComponent size={40} color="#6347eb" strokeWidth={1.5} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}