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
  
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const { scrollYProgress: aboutProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: skillsProgress } = useScroll({
    target: skillsRef,
    offset: ["start end", "end start"]
  });

  const heroY = useTransform(heroProgress, [0, 1], ["0%", "50%"]);
  const aboutY = useTransform(aboutProgress, [0, 1], ["10%", "-10%"]);
  const skillsY = useTransform(skillsProgress, [0, 1], ["5%", "-5%"]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white snap-y snap-mandatory overflow-y-scroll relative isolate" ref={containerRef}>
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-gray-900 to-transparent opacity-60 pointer-events-none -z-10" />
      <div className="relative z-0">
        <HeroSection heroRef={heroRef} heroY={heroY} />
        <AboutSection aboutRef={aboutRef} aboutY={aboutY} />
        <SkillsSection skillsRef={skillsRef} skillsY={skillsY} />
        <ProjectsSection />
        <EducationSection />
        <ContactSection />
      </div>
    </main>
  );
}
