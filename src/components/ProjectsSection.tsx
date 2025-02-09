import { motion } from 'framer-motion';

interface Project {
  title: string;
  description: string;
  tech: string[];
  gradient: string;
  size: string;
  height: string;
  github: string;
}

const projectData = [
  {
    title: 'Neural Network Visualizer',
    description: 'Interactive 3D visualization of neural networks with real-time training data.',
    tech: ['Three.js', 'TensorFlow.js', 'WebGL', 'React'],
    gradient: 'from-blue-600 to-cyan-500',
    size: 'col-span-12 md:col-span-8',
    height: 'h-[300px]',
    github: 'https://github.com/yourusername/neural-network-viz'
  },
  {
    title: 'Quantum Computing Simulator',
    description: 'Web-based quantum circuit simulator with visual programming interface.',
    tech: ['TypeScript', 'WebAssembly', 'Rust'],
    gradient: 'from-purple-600 to-pink-500',
    size: 'col-span-12 md:col-span-4',
    height: 'h-[300px]',
    github: 'https://github.com/yourusername/quantum-sim'
  },
  {
    title: 'Edge Computing Platform',
    description: 'Distributed computing platform for IoT devices with real-time analytics.',
    tech: ['Kubernetes', 'Rust', 'gRPC', 'InfluxDB'],
    gradient: 'from-green-500 to-emerald-400',
    size: 'col-span-12 md:col-span-6',
    height: 'h-[250px]',
    github: 'https://github.com/yourusername/edge-platform'
  },
  {
    title: 'Blockchain Analytics',
    description: 'Real-time blockchain data analysis and visualization platform.',
    tech: ['Web3.js', 'D3.js', 'Node.js', 'MongoDB'],
    gradient: 'from-orange-500 to-yellow-400',
    size: 'col-span-12 md:col-span-6',
    height: 'h-[250px]',
    github: 'https://github.com/yourusername/blockchain-analytics'
  }
];

const ProjectCard = ({ project, index }: { project: Project, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className={`group ${project.size} perspective-1000`}
    >
      <div 
        className={`${project.height} glass-effect tech-pattern matrix-overlay tech-border glow-effect cyber-pulse
                   rounded-xl p-6 relative overflow-hidden
                   transform transition-all duration-500 ease-out
                   hover:scale-[1.02] hover:rotate-1`}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 
                      group-hover:opacity-10 transition-opacity duration-500`}></div>
        
        <div className="h-full flex flex-col justify-between relative z-10">
          <div>
            <motion.h3 
              className="text-2xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
              whileHover={{ scale: 1.01 }}
            >
              {project.title}
            </motion.h3>
            <p className="text-gray-300 line-clamp-2">{project.description}</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech: string) => (
                <motion.span
                  key={tech}
                  whileHover={{ 
                    scale: 1.1,
                    transition: { duration: 0.2 }
                  }}
                  className={`px-3 py-1 rounded-full text-sm font-medium
                            bg-gradient-to-r ${project.gradient} bg-opacity-10
                            border border-gray-700 hover:border-gray-500
                            transition-all duration-300`}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
            
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn inline-flex items-center gap-2 px-4 py-2 rounded-lg
                       bg-gradient-to-r from-gray-800 to-gray-700
                       hover:from-gray-700 hover:to-gray-600
                       border border-gray-600 hover:border-gray-500
                       transition-all duration-300 ease-out
                       tech-border glow-effect"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="font-medium">View on GitHub</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-500/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 rounded-lg" />
            </motion.a>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 snap-start flex items-center justify-center relative overflow-hidden" id="projects">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
        {/* Constellation Points */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-indigo-400/30"
            initial={{ opacity: 0.2 }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
              boxShadow: [
                '0 0 10px rgba(129, 140, 248, 0.3)',
                '0 0 20px rgba(129, 140, 248, 0.5)',
                '0 0 10px rgba(129, 140, 248, 0.3)',
              ],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
          />
        ))}

        {/* Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full">
          <motion.path
            stroke="rgba(129, 140, 248, 0.1)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            d="M 100,100 L 300,150 L 200,300 L 400,250 Z"
          />
        </svg>

        {/* Glowing Background Areas */}
        <motion.div
          className="absolute w-[60rem] h-[60rem] rounded-full"
          animate={{
            background: [
              'radial-gradient(circle at center, rgba(99, 102, 241, 0.03) 0%, transparent 70%)',
              'radial-gradient(circle at center, rgba(139, 92, 246, 0.03) 0%, transparent 70%)',
            ],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full py-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold animate-gradient bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-gray-400 mt-4 text-lg">Building the future, one line at a time</p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {projectData.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;