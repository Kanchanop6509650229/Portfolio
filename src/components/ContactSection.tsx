import { motion } from 'framer-motion';

const contactData = [
  {
    platform: 'Email',
    value: 'your.email@example.com',
    gradient: 'from-red-500 to-pink-500',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20,4H4C2.895,4,2,4.895,2,6v12c0,1.105,0.895,2,2,2h16c1.105,0,2-0.895,2-2V6C22,4.895,21.105,4,20,4z M20,8.236l-8,4.882 L4,8.236V6h16V8.236z"/>
      </svg>
    )
  },
  {
    platform: 'GitHub',
    value: 'github.com/yourusername',
    link: 'https://github.com/yourusername',
    gradient: 'from-gray-600 to-gray-400',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    )
  },
  {
    platform: 'LinkedIn',
    value: 'linkedin.com/in/yourusername',
    link: 'https://linkedin.com/in/yourusername',
    gradient: 'from-blue-600 to-blue-400',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    )
  }
];

const ContactSection = () => {
  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 snap-start flex items-center justify-center relative overflow-hidden" id="contact">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
        {/* Circuit Lines */}
        <svg className="absolute inset-0 w-full h-full">
          {[...Array(4)].map((_, i) => (
            <g key={i}>
              <motion.path
                d={`M ${100 + i * 200},${50 + i * 100} L ${200 + i * 150},${50 + i * 100} L ${250 + i * 150},${100 + i * 100} L ${350 + i * 150},${100 + i * 100}`}
                stroke={`rgba(${i % 2 ? '244, 63, 94' : '236, 72, 153'}, 0.15)`}
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 3,
                  delay: i * 0.5,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear"
                }}
              />
              <motion.circle
                cx={350 + i * 150}
                cy={100 + i * 100}
                r="4"
                fill={`rgba(${i % 2 ? '244, 63, 94' : '236, 72, 153'}, 0.3)`}
                initial={{ scale: 0 }}
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.5 + 2,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              />
            </g>
          ))}
        </svg>

        {/* Pulsing Nodes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 rounded-full"
            initial={{ opacity: 0.3 }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              boxShadow: [
                '0 0 10px rgba(236, 72, 153, 0.3)',
                '0 0 20px rgba(236, 72, 153, 0.5)',
                '0 0 10px rgba(236, 72, 153, 0.3)'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            style={{
              background: 'rgba(236, 72, 153, 0.2)',
              left: `${20 + (i * 15)}%`,
              top: `${30 + ((i % 3) * 20)}%`,
            }}
          />
        ))}

        {/* Energy Wave */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 30% 30%, rgba(236, 72, 153, 0.03) 0%, transparent 50%)',
              'radial-gradient(circle at 70% 70%, rgba(244, 63, 94, 0.03) 0%, transparent 50%)',
            ]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-[48rem] h-[48rem] rounded-full bg-rose-500/5 blur-3xl"
          animate={{
            x: ["-20%", "20%"],
            y: ["15%", "-15%"],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          style={{
            top: "5%",
            right: "10%",
          }}
        />
        <motion.div
          className="absolute w-[42rem] h-[42rem] rounded-full bg-pink-500/5 blur-3xl"
          animate={{
            x: ["25%", "-25%"],
            y: ["-20%", "20%"],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          style={{
            bottom: "10%",
            left: "5%",
          }}
        />
        <motion.div
          className="absolute w-[38rem] h-[38rem] rounded-full bg-red-500/5 blur-3xl"
          animate={{
            x: ["-15%", "15%"],
            y: ["20%", "-20%"],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          style={{
            top: "35%",
            left: "30%",
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
            Get In Touch
          </h2>
          <p className="text-gray-400 mt-4 text-lg">Let&apos;s connect and create something amazing together</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactData.map((contact, index) => (
            <motion.div
              key={contact.platform}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group perspective-1000"
            >
              {contact.link ? (
                <a
                  href={contact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <ContactCard contact={contact} />
                </a>
              ) : (
                <ContactCard contact={contact} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactCard = ({ contact }: { contact: typeof contactData[number] }) => (
  <div className={`glass-effect tech-pattern matrix-overlay tech-border glow-effect cyber-pulse
                 rounded-xl p-8 relative overflow-hidden
                 transform transition-all duration-500 ease-out
                 hover:scale-[1.02] hover:rotate-1 h-[200px]
                 flex flex-col items-center justify-center space-y-4`}
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${contact.gradient} opacity-0 
                   group-hover:opacity-10 transition-opacity duration-500`}></div>
    
    <motion.div 
      className={`text-4xl bg-gradient-to-r ${contact.gradient} text-transparent bg-clip-text`}
      whileHover={{ scale: 1.05 }}
    >
      {contact.icon}
    </motion.div>
    
    <div className="text-center z-10">
      <h3 className={`text-xl font-bold bg-gradient-to-r ${contact.gradient} bg-clip-text text-transparent`}>
        {contact.platform}
      </h3>
      <p className="text-gray-300 text-sm mt-2">{contact.value}</p>
    </div>

    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
  </div>
);

export default ContactSection;