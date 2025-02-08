import 'animate.css';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Hero Section with Name */}
      <section className="h-screen flex items-center justify-center text-center px-4 animate__animated animate__fadeIn">
        <div>
          <h1 className="text-6xl font-bold mb-4">Your Name</h1>
          <p className="text-xl text-gray-300">Software Developer</p>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-20 px-4 bg-gray-800/50 animate__animated animate__fadeIn" id="about">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">About Me</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Write your brief introduction here. Share your passion for technology and what drives you as a developer.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 animate__animated animate__fadeIn" id="skills">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'SQL'].map((skill) => (
              <div key={skill} className="bg-gray-700/50 p-4 rounded-lg text-center hover:bg-gray-600/50 transition">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4 bg-gray-800/50 animate__animated animate__fadeIn" id="projects">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">My Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Project 1',
                description: 'Description of your first project.',
                tech: ['React', 'Node.js']
              },
              {
                title: 'Project 2',
                description: 'Description of your second project.',
                tech: ['Python', 'Django']
              }
            ].map((project) => (
              <div key={project.title} className="bg-gray-700/50 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="bg-gray-600 px-2 py-1 rounded text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 px-4 animate__animated animate__fadeIn" id="education">
        <div className="max-w-4xl mx-auto">
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
      <section className="py-20 px-4 bg-gray-800/50 animate__animated animate__fadeIn" id="contact">
        <div className="max-w-4xl mx-auto text-center">
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
