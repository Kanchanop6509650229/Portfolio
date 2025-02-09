import { motion, MotionValue } from 'framer-motion';
import { RefObject } from 'react';

interface SkillsSectionProps {
  skillsRef: RefObject<HTMLDivElement | null>;
  skillsY: MotionValue<string>;
}

const skillsData = [
  { name: 'JavaScript', gradient: 'from-yellow-400 to-orange-500' },
  { name: 'TypeScript', gradient: 'from-blue-400 to-blue-600' },
  { name: 'React', gradient: 'from-cyan-400 to-blue-500' },
  { name: 'Node.js', gradient: 'from-green-400 to-green-600' },
  { name: 'Python', gradient: 'from-blue-500 to-indigo-500' },
  { name: 'SQL', gradient: 'from-orange-400 to-pink-500' }
];

const SkillsSection = ({ skillsRef, skillsY }: SkillsSectionProps) => {
  return (
    <motion.section 
      ref={skillsRef}
      style={{ y: skillsY }}
      className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 snap-start py-20 px-4" 
      id="skills"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold animate-gradient bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <p className="text-gray-400 mt-4 text-lg">Crafting digital experiences with modern tools</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillsData.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group perspective-1000"
            >
              <div className={`glass-effect tech-pattern matrix-overlay tech-border glow-effect cyber-pulse
                           rounded-xl p-6 relative overflow-hidden
                           transform transition-all duration-500 ease-out
                           hover:scale-[1.02] hover:rotate-1 h-[200px]
                           flex items-center justify-center`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${skill.gradient} opacity-0 
                             group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <motion.h3 
                  className={`text-2xl font-bold bg-gradient-to-r ${skill.gradient} bg-clip-text text-transparent`}
                  whileHover={{ scale: 1.05 }}
                >
                  {skill.name}
                </motion.h3>

                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default SkillsSection;