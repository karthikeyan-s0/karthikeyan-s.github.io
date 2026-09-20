import { useState, useEffect, useCallback } from 'react';
import Lenis from 'lenis';
import { CinematicLoader } from './components/Loader/CinematicLoader';
import { FloatingNav } from './components/Navigation/FloatingNav';
import { CustomCursor } from './components/Cursor/CustomCursor';
import { GrainOverlay } from './components/Effects/GrainOverlay';
import { SoundToggle } from './components/Effects/SoundToggle';
import { SceneManager } from './components/ThreeScene/SceneManager';
import { ScrollProgress } from './components/Navigation/ScrollProgress';
import { HeroSection } from './components/Hero/HeroSection';
import { AboutSection } from './components/About/AboutSection';
import { SkillsSection } from './components/Skills/SkillsSection';
import { ProjectsSection } from './components/Projects/ProjectsSection';
import { JourneySection } from './components/Journey/JourneySection';
import { CertificationsSection } from './components/Certifications/CertificationsSection';
import { ConnectSection } from './components/Connect/ConnectSection';
import { ContactSection } from './components/Contact/ContactSection';

export function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoaderComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.8,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const reqId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(reqId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-space-950 text-slate-100 font-sans selection:bg-accent-cyan/30 selection:text-white">
      {/* Cinematic Preloader - runs strictly once and completely unmounts */}
      {!isLoaded && <CinematicLoader onComplete={handleLoaderComplete} />}

      {/* Atmospheric Film Grain & Vignette */}
      <GrainOverlay />

      {/* Custom Lerping Cursor */}
      <CustomCursor />

      {/* Ambient Audio Toggle */}
      <SoundToggle />

      {/* Master 3D Spatial Flythrough Canvas */}
      <SceneManager />

      {/* Floating Glass Navigation */}
      <FloatingNav />

      {/* Minimal Vertical Scroll Progress */}
      <ScrollProgress />

      {/* Main Spatial Narrative Flow */}
      <main className="relative z-10 flex flex-col w-full">
        <HeroSection isLoaded={isLoaded} />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <JourneySection />
        <CertificationsSection />
        <ConnectSection />
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
