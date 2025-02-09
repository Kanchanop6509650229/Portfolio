import { motion, MotionValue } from 'framer-motion';
import { RefObject } from 'react';

interface SkillsSectionProps {
  skillsRef: RefObject<HTMLDivElement | null>;
  skillsY: MotionValue<string>;
}

const SkillsSection = ({ skillsRef, skillsY }: SkillsSectionProps) => {
  return (
    <motion.section 
      ref={skillsRef}
      style={{ y: skillsY }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
      className="h-screen flex items-center py-20 px-4 animate__animated animate__fadeIn snap-start" 
      id="skills"
    >
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-4xl font-bold mb-12 text-center">Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'SQL'].map((skill) => (
            <div key={skill} className="bg-gray-700/50 p-4 rounded-lg text-center hover:bg-gray-600/50 transition">
              {skill}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default SkillsSection;