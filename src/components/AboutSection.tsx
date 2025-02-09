import { motion, MotionValue } from 'framer-motion';
import { RefObject } from 'react';

interface AboutSectionProps {
  aboutRef: RefObject<HTMLDivElement | null>;
  aboutY: MotionValue<string>;
}

const AboutSection = ({ aboutRef, aboutY }: AboutSectionProps) => {
  return (
    <motion.section 
      ref={aboutRef}
      style={{ y: aboutY }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
      className="h-screen flex items-center py-20 px-4 bg-gray-800/50 animate__animated animate__fadeIn snap-start" 
      id="about"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">About Me</h2>
        <p className="text-lg text-gray-300 leading-relaxed">
          Write your brief introduction here. Share your passion for technology and what drives you as a developer.
        </p>
      </div>
    </motion.section>
  );
};

export default AboutSection;