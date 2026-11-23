import { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { AboutSection } from './components/AboutSection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { MembershipContactSection } from './components/MembershipContactSection';
import { Navbar } from './components/Navbar';
import { ScrollProgressBar } from './components/ScrollMotion';
import { TestimonialsSection } from './components/TestimonialsSection';
import { TrainersSection } from './components/TrainersSection';

export default function App() {
  const [preselectedInterest, setPreselectedInterest] = useState<string>('');

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleJoinClick = () => {
    setPreselectedInterest('Monthly Floor Access');
    scrollToSection('membership');
  };

  const handleEnquireContext = (contextLabel: string) => {
    setPreselectedInterest(contextLabel);
    scrollToSection('membership');
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#080808] text-white">
        <ScrollProgressBar />
        <Navbar onJoinClick={handleJoinClick} />

        <main>
          <HeroSection
            onExploreClick={() => scrollToSection('facilities')}
            onStartJourneyClick={handleJoinClick}
          />
          <AboutSection />
          <FacilitiesSection
            onEnquireZone={(zone) => handleEnquireContext(`Facility Tour — ${zone}`)}
          />
          <TrainersSection
            onEnquireTrainer={(name) => handleEnquireContext(`Coaching Enquiry — ${name}`)}
          />
          <TestimonialsSection onStartJourneyClick={handleEnquireContext} />
          <MembershipContactSection preselectedInterest={preselectedInterest} />
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
}
