import { motion, useScroll, useTransform } from 'framer-motion';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import * as BiIcons from 'react-icons/bi';
import * as DiIcons from 'react-icons/di';
import * as FaIcons from 'react-icons/fa';
import * as FcIcons from 'react-icons/fc';
import * as FiIcons from 'react-icons/fi';
import * as GiIcons from 'react-icons/gi';
import * as GoIcons from 'react-icons/go';
import * as GrIcons from 'react-icons/gr';
import * as HiIcons from 'react-icons/hi';
import * as ImIcons from 'react-icons/im';
import * as IoIcons from 'react-icons/io';
import * as Io5Icons from 'react-icons/io5';
import * as MdIcons from 'react-icons/md';
import * as RiIcons from 'react-icons/ri';
import * as SiIcons from 'react-icons/si';
import * as TiIcons from 'react-icons/ti';
import * as VscIcons from 'react-icons/vsc';
import * as TbIcons from 'react-icons/tb';
import * as TfiIcons from 'react-icons/tfi';
import { VscCode } from 'react-icons/vsc';
import { useEffect, useState } from 'react';
import { getSkills } from '@/lib/api';
import { IconType } from 'react-icons';

interface Skill {
  name: string;
  category: string;
  proficiency: number;
}

interface ProcessedSkill {
  name: string;
  proficiency: number;
  gradient: string;
  icon: IconType;
}

// Combine all icon sets
const allIcons = {
  ...AiIcons,
  ...BsIcons,
  ...BiIcons,
  ...DiIcons,
  ...FaIcons,
  ...FcIcons,
  ...FiIcons,
  ...GiIcons,
  ...GoIcons,
  ...GrIcons,
  ...HiIcons,
  ...ImIcons,
  ...IoIcons,
  ...Io5Icons,
  ...MdIcons,
  ...RiIcons,
  ...SiIcons,
  ...TiIcons,
  ...VscIcons,
  ...TbIcons,
  ...TfiIcons,
};

const findIcon = (skillName: string): IconType => {

  const cleanedName = skillName.replace(/[^a-zA-Z0-9]/g, '');

  const prefixes = [
    'Ai', 'Bs', 'Bi', 'Di', 'Fa', 'Fc', 'Fi', 'Gi', 'Go', 'Gr',
    'Hi', 'Im', 'Io', 'Io5', 'Md', 'Ri', 'Si', 'Ti', 'Vsc', 'Tb', 'Tfi'
  ];
  
  const possibleNames = prefixes.map(prefix => `${prefix}${cleanedName}`);
  
  for (const name of possibleNames) {
    if (allIcons[name]) {
      return allIcons[name];
    }
  }
  
  return VscIcons.VscCode;
};

// Dynamic icon mapping
interface IconMapInterface extends Record<string, IconType | ((name: string) => IconType)> {
  JavaScript: IconType;
  TypeScript: IconType;
  Python: IconType;
  React: IconType;
  HTML: IconType;
  'Tailwind CSS': IconType;
  'Node.js': IconType;
  Express: IconType;
  MySQL: IconType;
  Git: IconType;
  Docker: IconType;
  get(name: string): IconType;
}

const iconMap: IconMapInterface = {
  JavaScript: SiIcons.SiJavascript,
  TypeScript: SiIcons.SiTypescript,
  Python: SiIcons.SiPython,
  React: SiIcons.SiReact,
  HTML: SiIcons.SiHtml5,
  'Tailwind CSS': SiIcons.SiTailwindcss,
  'Node.js': SiIcons.SiNodedotjs,
  Express: SiIcons.SiExpress,
  MySQL: SiIcons.SiMysql,
  Git: SiIcons.SiGit,
  Docker: SiIcons.SiDocker,
  get(name: string): IconType {
    return (name in this && this[name] !== this.get)
      ? (this[name] as IconType)
      : findIcon(name);
  }
};

const gradientMap: { [key: string]: string } = {
  JavaScript: 'from-yellow-400 to-orange-500',
  TypeScript: 'from-blue-400 to-blue-600',
  Python: 'from-blue-500 to-indigo-500',
  React: 'from-cyan-400 to-blue-500',
  HTML: 'from-orange-400 to-red-500',
  'Tailwind CSS': 'from-teal-400 to-cyan-500',
  'Node.js': 'from-green-400 to-green-600',
  Express: 'from-gray-400 to-gray-600',
  MySQL: 'from-orange-400 to-pink-500',
  Git: 'from-red-400 to-orange-500',
  Docker: 'from-blue-400 to-cyan-500',
};

const SkillsSection = () => {
  const [skillsByCategory, setSkillsByCategory] = useState<{ [key: string]: ProcessedSkill[] }>({});
  const { scrollYProgress } = useScroll({
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const skills = await getSkills();
        const grouped = skills.reduce((acc: { [key: string]: ProcessedSkill[] }, skill: Skill) => {
          if (!acc[skill.category]) {
            acc[skill.category] = [];
          }
          acc[skill.category].push({
            name: skill.name,
            proficiency: skill.proficiency,
            gradient: gradientMap[skill.name] || 'from-gray-400 to-gray-600',
            icon: iconMap.get(skill.name)
          });
          return acc;
        }, {});
        setSkillsByCategory(grouped);
      } catch (error) {
        console.error('Failed to fetch skills:', error);
      }
    };

    fetchSkills();
  }, []);

  const backgroundScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.5, 0.3]);

  return (
    <section 
      className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 snap-start flex items-center justify-center relative overflow-hidden py-20" 
      id="skills"
    >
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ opacity: backgroundOpacity, scale: backgroundScale }}
      >
        {/* Hexagonal Grid Pattern */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              delay: i * 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              width: '400px',
              height: '400px',
              background: `radial-gradient(hexagon at center, rgba(${
                i % 2 ? '52, 211, 153' : '16, 185, 129'
              }, 0.05) 0%, transparent 70%)`,
              transform: `rotate(${60 * i}deg)`,
              left: `${(i % 3) * 30}%`,
              top: `${Math.floor(i / 3) * 40}%`,
            }}
          />
        ))}

        {/* Moving Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <motion.path
            d="M 0,50 Q 50,0 100,50 T 200,50 T 300,50 T 400,50"
            stroke="rgba(52, 211, 153, 0.2)"
            strokeWidth="2"
            fill="none"
            initial={{ pathOffset: 0 }}
            animate={{ pathOffset: 1 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </svg>
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10 w-full px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 [text-shadow:none]"
        >
          <h2 className="text-5xl font-bold animate-gradient bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <p className="text-gray-400 mt-4 text-lg">Crafting digital experiences with modern tools</p>
        </motion.div>

        <div className="space-y-12">
          {Object.entries(skillsByCategory).map(([category, skills], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.2 }}
              className="space-y-4"
            >
              <motion.h3 
                className="text-2xl font-bold text-white mb-6 border-l-4 border-cyan-500 pl-4"
                initial={{ x: -20 }}
                whileInView={{ x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {category}
              </motion.h3>
              
              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
              >
                {skills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: false, amount: 0.2 }}
                      className="group perspective-1000"
                    >
                      <motion.div 
                        className={`glass-effect tech-pattern matrix-overlay tech-border glow-effect cyber-pulse
                                 rounded-lg p-3 relative overflow-hidden
                                 transform transition-all duration-500 ease-out
                                 hover:scale-[1.02] hover:rotate-1 h-[100px]
                                 flex flex-col items-center justify-center gap-2 [text-shadow:none]`}
                        whileHover={{ 
                          rotateX: 5,
                          rotateY: 5,
                          transition: { duration: 0.3 }
                        }}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${skill.gradient} opacity-0 
                                     group-hover:opacity-10 transition-opacity duration-500`}></div>
                        
                        <Icon className={`text-4xl group-hover:scale-110 transition-transform duration-300`} />
                        <motion.span 
                          className={`text-sm font-medium bg-gradient-to-r ${skill.gradient} bg-clip-text text-transparent text-center`}
                          whileHover={{ scale: 1.05 }}
                        >
                          {skill.name}
                        </motion.span>
                        
                        <div className="absolute bottom-1 left-0 w-full h-1 bg-gray-700 rounded">
                          <div 
                            className={`h-full rounded bg-gradient-to-r ${skill.gradient}`}
                            style={{ width: `${(skill.proficiency / 5) * 100}%` }}
                          />
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;