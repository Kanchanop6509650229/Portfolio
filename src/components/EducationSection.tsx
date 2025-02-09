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
    <section className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 snap-start py-20 px-4" id="education">
      <div className="max-w-7xl mx-auto">
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