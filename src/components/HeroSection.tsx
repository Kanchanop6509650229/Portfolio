import { motion, MotionValue } from 'framer-motion';
import { RefObject } from 'react';

interface HeroSectionProps {
  heroRef: RefObject<HTMLDivElement | null>;
  heroY: MotionValue<string>;
}

const HeroSection = ({ heroRef, heroY }: HeroSectionProps) => {
  return (
    <motion.section 
      ref={heroRef}
      style={{ y: heroY }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="h-screen flex items-center justify-center text-center px-4 animate__animated animate__fadeIn relative snap-start"
    >
      <div>
        <h1 className="text-6xl font-bold mb-4">Your Name</h1>
        <p className="text-xl text-gray-300">Software Developer</p>
      </div>
    </motion.section>
  );
};

export default HeroSection;