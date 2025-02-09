"use client";

import 'animate.css';
import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import EducationSection from '../components/EducationSection';
import ContactSection from '../components/ContactSection';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax scroll effects with proper typing
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end -200%"]
  });

  const { scrollYProgress: aboutProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end -100%"]
  });

  const { scrollYProgress: skillsProgress } = useScroll({
    target: skillsRef,
    offset: ["start end", "end -100%"]
  });

  const heroY = useTransform(heroProgress, [0, 1], ["0%", "100%"]);
  const aboutY = useTransform(aboutProgress, [0, 1], ["30%", "-30%"]);
  const skillsY = useTransform(skillsProgress, [0, 1], ["20%", "-20%"]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white snap-y snap-mandatory overflow-y-scroll" ref={containerRef}>
      <HeroSection heroRef={heroRef} heroY={heroY} />
      <AboutSection aboutRef={aboutRef} aboutY={aboutY} />
      <SkillsSection skillsRef={skillsRef} skillsY={skillsY} />
      <ProjectsSection />
      <EducationSection />
      <ContactSection />
    </main>
  );
}
