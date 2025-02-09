import { motion, MotionValue } from 'framer-motion';
import { RefObject } from 'react';

interface HeroSectionProps {
  heroRef: RefObject<HTMLDivElement | null>;
  heroY: MotionValue<string>;
}

const HeroSection = ({ heroRef, heroY }: HeroSectionProps) => {
  return (
    <motion.section 
      id="top"
      ref={heroRef}
      className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 snap-start flex items-center justify-center relative overflow-hidden will-change-transform" 
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
        <motion.div
          className="absolute w-[40rem] h-[40rem] rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] bg-cyan-500/5 blur-3xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
            borderRadius: ['30% 70% 70% 30% / 30% 30% 70% 70%', '70% 30% 30% 70% / 70% 70% 30% 30%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          style={{
            top: "10%",
            right: "5%",
          }}
        />
        <motion.div
          className="absolute w-[35rem] h-[35rem] rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] bg-blue-500/5 blur-3xl"
          animate={{
            rotate: [360, 0],
            scale: [1.1, 1, 1.1],
            borderRadius: ['50% 50% 50% 50% / 60% 60% 40% 40%', '40% 40% 60% 60% / 50% 50% 50% 50%'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          style={{
            bottom: "15%",
            left: "10%",
          }}
        />
      </div>

      {/* Main content */}
      <motion.div
        style={{ y: heroY }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-8 relative z-10 [text-shadow:none]"
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="glass-effect tech-pattern matrix-overlay tech-border glow-effect cyber-pulse p-4 rounded-xl inline-block">
            <p className="text-gray-300 text-lg">Crafting digital experiences with modern technologies</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;