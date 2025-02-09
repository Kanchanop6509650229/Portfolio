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
      className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 snap-start py-20 px-4 flex items-center justify-center" 
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6"
      >
        <motion.h1 
          className="text-8xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient"
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Name
        </motion.h1>
        
        <motion.p 
          className="text-3xl text-gray-300"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Software Developer
        </motion.p>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;