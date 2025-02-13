import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getCareers, getCertificates } from '@/lib/api';

interface Career {
  id: number;
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  description: string;
  current: boolean;
}

interface Certificate {
  id: number;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate: string | null;
  credentialUrl: string | null;
}

const LearningRoadmapSection = () => {
  const [careers, setCareers] = useState<Career[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [careerData, certData] = await Promise.all([
          getCareers(),
          getCertificates()
        ]);
        
        setCareers(careerData.sort((a: Career, b: Career) => 
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        ));
        
        setCertificates(certData.sort((a: Certificate, b: Certificate) => 
          new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime()
        ));
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  const timelineItems = [
    ...careers.map(career => ({
      type: 'career' as const,
      date: new Date(career.startDate),
      data: career,
    })),
    ...certificates.map(cert => ({
      type: 'certificate' as const,
      date: new Date(cert.issueDate),
      data: cert,
    }))
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-20" id="education">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold animate-gradient bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
            Learning Roadmap
          </h2>
          <p className="text-gray-400 mt-4 text-lg">My educational journey and professional development</p>
        </motion.div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-emerald-500 via-cyan-500 to-blue-500"></div>

          {timelineItems.map((item, index) => (
            <motion.div
              key={item.type === 'career' ? `career-${item.data.id}` : `cert-${item.data.id}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`relative flex ${index % 2 === 0 ? 'justify-end' : ''} mb-8`}
            >
              <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                <div className="glass-effect tech-border p-6 rounded-lg group hover:shadow-lg transition-all duration-300">
                  {item.type === 'career' ? (
                    <div className="flex flex-col gap-2">
                      <span className="text-sm font-medium text-emerald-400">Education</span>
                      <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-cyan-500 group-hover:bg-clip-text transition-all duration-300">
                        {item.data.position}
                      </h3>
                      <h4 className="text-lg font-semibold text-cyan-400">
                        {item.data.company}
                      </h4>
                      <p className="text-gray-400 text-sm">
                        {new Date(item.data.startDate).toLocaleDateString('en-US', { 
                          month: 'long', 
                          year: 'numeric' 
                        })} - {
                          item.data.current ? 'Present' : 
                          item.data.endDate ? new Date(item.data.endDate).toLocaleDateString('en-US', { 
                            month: 'long', 
                            year: 'numeric' 
                          }) : ''
                        }
                      </p>
                      <p className="text-gray-300 mt-2">{item.data.description}</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <span className="text-sm font-medium text-blue-400">Certification</span>
                      <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500 group-hover:bg-clip-text transition-all duration-300">
                        {item.data.name}
                      </h3>
                      <h4 className="text-lg font-semibold text-cyan-400">
                        {item.data.issuer}
                      </h4>
                      <div className="text-gray-400 text-sm space-y-1">
                        <p>Issued: {new Date(item.data.issueDate).toLocaleDateString('en-US', { 
                          month: 'long', 
                          year: 'numeric' 
                        })}</p>
                        {item.data.expiryDate && (
                          <p>Expires: {new Date(item.data.expiryDate).toLocaleDateString('en-US', { 
                            month: 'long', 
                            year: 'numeric' 
                          })}</p>
                        )}
                      </div>
                      {item.data.credentialUrl && (
                        <a
                          href={item.data.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center text-sm text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
                        >
                          View Credential
                          <svg
                            className="w-4 h-4 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Timeline dot */}
              <div className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full ${
                item.type === 'career' 
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500' 
                  : 'bg-gradient-to-r from-cyan-500 to-blue-500'
              } border-2 border-gray-900`}></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningRoadmapSection;