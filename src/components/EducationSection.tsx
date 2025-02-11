import { motion } from 'framer-motion';

const roadmapData = [
  {
    title: 'Your Degree',
    institution: 'Your University',
    period: '2019 - 2023',
    description: 'Brief description of your major studies and achievements',
    gradient: 'from-purple-600 to-blue-500',
    icon: '🎓'
  },
  {
    title: 'Certification',
    institution: 'Online Platform',
    period: '2023',
    description: 'Relevant certifications or additional education',
    gradient: 'from-cyan-400 to-emerald-500',
    icon: '📜'
  }
];

const EducationSection = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 snap-start flex items-center justify-center relative overflow-hidden" id="education">
      {/* Background effects */}
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

      <div className="max-w-7xl mx-auto relative z-10 w-full px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold animate-gradient bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Learning Roadmap
          </h2>
          <p className="text-gray-400 mt-4 text-lg">My journey through education and growth</p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 to-purple-600 h-full"
          />

          {roadmapData.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`flex items-center mb-12 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              } relative`}
            >
              {/* Timeline node with fixed positioning */}
              <div className="absolute left-1/2 -translate-x-1/2 inline-flex items-center justify-center">
                <div className="relative w-12 h-12 transform-gpu">
                  <motion.div
                    whileHover="hover"
                    animate="rest"
                    variants={{
                      hover: { scale: 1.2 },
                      rest: { scale: 1 }
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-2xl transform-gpu"
                    style={{ transformOrigin: 'center center' }}
                  >
                    {item.icon}
                  </motion.div>
                </div>
              </div>

              {/* Content card */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'pr-16' : 'pl-16'}`}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="glass-effect tech-pattern matrix-overlay tech-border glow-effect cyber-pulse
                             rounded-xl p-6 relative overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-5`}></div>
                  <div className="relative z-10 space-y-3">
                    <motion.h3 
                      className={`text-2xl font-bold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}
                    >
                      {item.title}
                    </motion.h3>
                    <p className="text-xl text-gray-300">{item.institution}</p>
                    <p className="text-gray-400">{item.period}</p>
                    <p className="text-gray-300 text-sm">{item.description}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;