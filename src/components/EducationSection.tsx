import { motion } from 'framer-motion';

const educationData = [
  {
    degree: 'Your Degree',
    university: 'Your University',
    period: '2019 - 2023',
    description: 'Brief description of your major studies and achievements',
    gradient: 'from-purple-600 to-blue-500'
  },
  {
    degree: 'Certification',
    university: 'Online Platform',
    period: '2023',
    description: 'Relevant certifications or additional education',
    gradient: 'from-cyan-400 to-emerald-500'
  }
];

const EducationSection = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 snap-start flex items-center justify-center relative overflow-hidden" id="education">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
        {/* Flowing curves */}
        <svg className="absolute inset-0 w-full h-full">
          {[...Array(3)].map((_, i) => (
            <motion.path
              key={i}
              d={`M ${-100 + i * 200},${100 + i * 100} C ${200 + i * 100},${150 + i * 50} ${400 - i * 100},${200 - i * 50} ${600 + i * 200},${300 + i * 100}`}
              stroke={`rgba(${i === 0 ? '251, 191, 36' : i === 1 ? '249, 115, 22' : '234, 179, 8'}, 0.15)`}
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 2,
              }}
            />
          ))}
        </svg>

        {/* Light orbs */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.8,
              repeatType: "reverse",
            }}
            style={{
              background: `radial-gradient(circle at center, ${
                i % 2 ? 'rgba(251, 191, 36, 0.1)' : 'rgba(249, 115, 22, 0.1)'
              } 0%, transparent 70%)`,
              left: `${20 + (i * 15)}%`,
              top: `${30 + (i * 10)}%`,
              filter: 'blur(20px)',
            }}
          />
        ))}

        {/* Diagonal lines */}
        <div className="absolute inset-0" style={{ opacity: 0.1 }}>
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[150%] w-px bg-gradient-to-b from-transparent via-yellow-500/20 to-transparent"
              initial={{ opacity: 0, transform: 'translateX(0) rotate(45deg)' }}
              animate={{ 
                opacity: [0, 0.5, 0],
                transform: ['translateX(0) rotate(45deg)', 'translateX(100px) rotate(45deg)']
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              style={{
                left: `${i * 10}%`,
                top: '-25%',
              }}
            />
          ))}
        </div>

        <motion.div
          className="absolute w-[45rem] h-[45rem] rounded-full bg-amber-500/5 blur-3xl"
          animate={{
            x: ["25%", "-25%"],
            y: ["-20%", "20%"],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          style={{
            top: "10%",
            left: "15%",
          }}
        />
        <motion.div
          className="absolute w-[40rem] h-[40rem] rounded-full bg-orange-500/5 blur-3xl"
          animate={{
            x: ["-20%", "20%"],
            y: ["25%", "-25%"],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          style={{
            bottom: "15%",
            right: "10%",
          }}
        />
        <motion.div
          className="absolute w-[35rem] h-[35rem] rounded-full bg-yellow-500/5 blur-3xl"
          animate={{
            x: ["15%", "-15%"],
            y: ["-15%", "15%"],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          style={{
            top: "40%",
            right: "25%",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold animate-gradient bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Education
          </h2>
          <p className="text-gray-400 mt-4 text-lg">Building a strong foundation for innovation</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {educationData.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group perspective-1000"
            >
              <div className={`glass-effect tech-pattern matrix-overlay tech-border glow-effect cyber-pulse
                           rounded-xl p-8 relative overflow-hidden
                           transform transition-all duration-500 ease-out
                           hover:scale-[1.02] hover:rotate-1`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${edu.gradient} opacity-0 
                             group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className="relative z-10 space-y-4">
                  <motion.h3 
                    className={`text-2xl font-bold bg-gradient-to-r ${edu.gradient} bg-clip-text text-transparent`}
                    whileHover={{ scale: 1.01 }}
                  >
                    {edu.degree}
                  </motion.h3>
                  <div className="space-y-2">
                    <p className="text-xl text-gray-300">{edu.university}</p>
                    <p className="text-gray-400">{edu.period}</p>
                    <p className="text-gray-300 text-sm">{edu.description}</p>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;