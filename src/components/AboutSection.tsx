import { motion, useScroll, useTransform } from 'framer-motion';

const AboutSection = () => {
  const { scrollYProgress } = useScroll({
    offset: ["start end", "end start"]
  });

  const backgroundScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.5, 0.3]);
  const contentScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  const orbitItems = [0, 1, 2, 3];

  return (
    <section 
      className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 snap-start flex items-center justify-center relative overflow-hidden" 
      id="about"
    >
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ opacity: backgroundOpacity, scale: backgroundScale }}
      >
        {orbitItems.map((i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full bg-blue-500/5 blur-2xl"
            animate={{
              x: [
                `${Math.sin(i * 90) * 40}%`,  // Using fixed angle multiplier
                `${Math.cos(i * 90) * 40}%`   // Using fixed angle multiplier
              ],
              y: [
                `${Math.cos(i * 90) * 40}%`,
                `${Math.sin(i * 90) * 40}%`
              ],
              scale: [1, 1.2, 0.8, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            style={{
              left: `${25 + (i * 15)}%`,  // Using index-based calculation
              top: `${25 + (i * 12)}%`,   // Using index-based calculation
            }}
          />
        ))}
        
        <motion.div
          className="absolute w-full h-full"
          animate={{
            background: [
              'radial-gradient(circle at 30% 30%, rgba(147, 51, 234, 0.05) 0%, transparent 70%)',
              'radial-gradient(circle at 70% 70%, rgba(147, 51, 234, 0.05) 0%, transparent 70%)',
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 [text-shadow:none]"
        >
          <h2 className="text-5xl font-bold animate-gradient bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-gray-400 mt-4 text-lg">Passionate about creating impactful solutions</p>
        </motion.div>

        <motion.div 
          style={{ scale: contentScale }}
          className="glass-effect tech-pattern matrix-overlay tech-border glow-effect cyber-pulse
                   rounded-xl p-8 relative overflow-hidden
                   transform transition-all duration-500 ease-out
                   hover:scale-[1.02] group [text-shadow:none]"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-blue-500 opacity-0 
                       group-hover:opacity-10 transition-opacity duration-500"></div>
          
          <div className="relative z-10">
            <p className="text-lg text-gray-300 leading-relaxed">
              Write your brief introduction here. Share your passion for technology and what drives you as a developer.
              Highlight your journey, experiences, and what makes you unique in the field of software development.
            </p>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;