import './FeaturesSection.css'
import { Lightbulb, Target, BarChart3, Zap, FileText, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'

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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('features');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section id="features" className="features">
      <div className="features-container">
        <h2 className={`features-heading ${isVisible ? 'animate-in' : ''}`}>
          Why choose <span className="gradient-text">Resumind?</span>
        </h2>
        <p className={`features-subtitle ${isVisible ? 'animate-in' : ''}`}>
          Everything you need to land your dream job
        </p>
        <div className="features-grid">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div
                key={feature.id}
                className={`feature-card ${isVisible ? 'animate-in' : ''}`}
                style={{
                  animationDelay: isVisible ? `${index * 100}ms` : '0ms'
                }}
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