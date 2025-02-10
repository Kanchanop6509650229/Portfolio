import { motion, useScroll, useTransform } from 'framer-motion';
import { RefObject } from 'react';

const skillsData = [
  { name: 'JavaScript', gradient: 'from-yellow-400 to-orange-500' },
  { name: 'TypeScript', gradient: 'from-blue-400 to-blue-600' },
  { name: 'React', gradient: 'from-cyan-400 to-blue-500' },
  { name: 'Node.js', gradient: 'from-green-400 to-green-600' },
  { name: 'Python', gradient: 'from-blue-500 to-indigo-500' },
  { name: 'SQL', gradient: 'from-orange-400 to-pink-500' }
];

const SkillsSection = () => {
  const { scrollYProgress } = useScroll({
    offset: ["start end", "end start"]
  });

  const backgroundScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.5, 0.3]);

  return (
    <section 
      className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 snap-start flex items-center justify-center relative overflow-hidden" 
      id="skills"
    >
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ opacity: backgroundOpacity, scale: backgroundScale }}
      >
        {/* Hexagonal Grid Pattern */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              delay: i * 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              width: '400px',
              height: '400px',
              background: `radial-gradient(hexagon at center, rgba(${
                i % 2 ? '52, 211, 153' : '16, 185, 129'
              }, 0.05) 0%, transparent 70%)`,
              transform: `rotate(${60 * i}deg)`,
              left: `${(i % 3) * 30}%`,
              top: `${Math.floor(i / 3) * 40}%`,
            }}
          />
        ))}

        {/* Moving Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <motion.path
            d="M 0,50 Q 50,0 100,50 T 200,50 T 300,50 T 400,50"
            stroke="rgba(52, 211, 153, 0.2)"
            strokeWidth="2"
            fill="none"
            initial={{ pathOffset: 0 }}
            animate={{ pathOffset: 1 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </svg>
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 [text-shadow:none]"
        >
          <h2 className="text-5xl font-bold animate-gradient bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <p className="text-gray-400 mt-4 text-lg">Crafting digital experiences with modern tools</p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {skillsData.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: false, amount: 0.2 }}
              className="group perspective-1000"
            >
              <motion.div 
                className={`glass-effect tech-pattern matrix-overlay tech-border glow-effect cyber-pulse
                         rounded-xl p-6 relative overflow-hidden
                         transform transition-all duration-500 ease-out
                         hover:scale-[1.02] hover:rotate-1 h-[200px]
                         flex items-center justify-center [text-shadow:none]`}
                whileHover={{ 
                  rotateX: 5,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
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
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;