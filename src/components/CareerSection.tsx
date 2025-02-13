import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getCareers } from '@/lib/api';

interface Career {
  id: number;
  degree: string;
  university: string;
  startDate: string;
  endDate: string | null;
  description: string;
}

const CareerSection = () => {
  const [careers, setCareers] = useState<Career[]>([]);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const data = await getCareers();
        setCareers(data.sort((a: Career, b: Career) => 
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        ));
      } catch (error) {
        console.error('Failed to fetch careers:', error);
      }
    };

    fetchCareers();
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-20" id="career">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold animate-gradient bg-gradient-to-r from-purple-400 via-pink-500 to-red-600 bg-clip-text text-transparent">
            Professional Journey
          </h2>
          <p className="text-gray-400 mt-4 text-lg">My career path and experience</p>
        </motion.div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-purple-500 via-pink-500 to-red-500"></div>

          {careers.map((career, index) => (
            <motion.div
              key={career.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`relative flex ${index % 2 === 0 ? 'justify-end' : ''} mb-8`}
            >
              <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                <div className="glass-effect tech-border p-6 rounded-lg">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold text-white">{career.university}</h3>
                    <h4 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                      {career.degree}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {new Date(career.startDate).toLocaleDateString('en-US', { 
                        month: 'long', 
                        year: 'numeric' 
                      })} - {
                        career.endDate ? new Date(career.endDate).toLocaleDateString('en-US', { 
                          month: 'long', 
                          year: 'numeric' 
                        }) : ''
                      }
                    </p>
                    <p className="text-gray-300 mt-2">{career.description}</p>
                  </div>
                </div>
              </div>

              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border-2 border-gray-900"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerSection;