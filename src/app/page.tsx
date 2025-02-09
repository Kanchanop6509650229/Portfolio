"use client";

import 'animate.css';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

export default function Home() {
  const containerRef = useRef(null);
  const targetRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"], {
    clamp: false
  });

  // Parallax scroll effects
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end -200%"] // Increased offset to require more scrolling
  });

  const { scrollYProgress: aboutProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end -100%"] // Increased offset to require more scrolling
  });

  const { scrollYProgress: skillsProgress } = useScroll({
    target: skillsRef,
    offset: ["start end", "end -100%"] // Increased offset to require more scrolling
  });

  const heroY = useTransform(heroProgress, [0, 1], ["0%", "100%"]); // Increased transform range
  const aboutY = useTransform(aboutProgress, [0, 1], ["30%", "-30%"]); // Increased transform range
  const skillsY = useTransform(skillsProgress, [0, 1], ["20%", "-20%"]); // Increased transform range

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white snap-y snap-mandatory overflow-y-scroll" ref={containerRef}>
      {/* Hero Section with Name */}
      <motion.section 
        ref={heroRef}
        style={{ y: heroY }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-screen flex items-center justify-center text-center px-4 animate__animated animate__fadeIn relative snap-start"
      >
        <div>
          <h1 className="text-6xl font-bold mb-4">Your Name</h1>
          <p className="text-xl text-gray-300">Software Developer</p>
        </div>
      </motion.section>

      {/* About Me Section */}
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

      {/* Skills Section */}
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

      {/* Projects Section */}
      <section className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 snap-start py-20 px-4" id="projects">
        <div className="max-w-7xl mx-auto">
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
            {[
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
            ].map((project, index) => (
              <motion.div
                key={project.title}
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
                        {project.tech.map((tech) => (
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
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Education Section */}
      <section className="h-screen flex items-center py-20 px-4 animate__animated animate__fadeIn snap-start" id="education">
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-4xl font-bold mb-12 text-center">Education</h2>
          <div className="space-y-8">
            <div className="bg-gray-700/50 p-6 rounded-lg">
              <h3 className="text-xl font-bold">Your Degree</h3>
              <p className="text-gray-300">Your University</p>
              <p className="text-gray-400">2019 - 2023</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="h-screen flex items-center py-20 px-4 bg-gray-800/50 animate__animated animate__fadeIn snap-start" id="contact">
        <div className="max-w-4xl mx-auto text-center w-full">
          <h2 className="text-4xl font-bold mb-8">Get In Touch</h2>
          <p className="text-xl mb-8">your.email@example.com</p>
          <div className="flex justify-center gap-6">
            <a href="https://github.com/Kanchanop6509650229" className="hover:text-gray-300 transition">
              GitHub
            </a>
            <a href="https://linkedin.com/in/yourusername" className="hover:text-gray-300 transition">
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
