"use client";

import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState, useEffect } from 'react';

const navLinks = [
  { href: "#about", text: "About" },
  { href: "#skills", text: "Skills" },
  { href: "#projects", text: "Projects" },
  { href: "#education", text: "Education" },
  { href: "#contact", text: "Contact" }
];

const Navbar = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollY } = useScroll();
  const [lastScrollY, setLastScrollY] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const direction = latest > lastScrollY ? "down" : "up";
    if (direction === "down" && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setLastScrollY(latest);
  });

  // Smooth scroll handler
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === "#top") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState({}, '', '/');
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState({}, '', href);
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    navLinks.forEach(({ href }) => {
      const element = document.querySelector(href);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const containerVariants = {
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    },
    hidden: { 
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  const linkVariants = {
    visible: { 
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    },
    hidden: { 
      opacity: 0,
      y: -10,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.nav 
      className="fixed w-full z-50 px-8 py-6"
      variants={containerVariants}
      initial="visible"
      animate={hidden ? "hidden" : "visible"}
    >
      <motion.div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <motion.div
          variants={linkVariants}
          whileHover={{ scale: 1.05 }}
          className="relative"
        >
          <Link 
            href="/"
            className="text-2xl font-bold"
            onClick={(e) => handleClick(e, "#top")}
          >
            <motion.span 
              className="bg-gradient-to-r from-white to-white bg-clip-text text-transparent relative inline-block"
              whileHover={{ 
                backgroundImage: "linear-gradient(to right, #67e8f9, #818cf8, #c084fc)",
                transition: { duration: 0.3 }
              }}
            >
              YN
            </motion.span>
          </Link>
        </motion.div>

        <motion.div 
          className="flex flex-wrap justify-center gap-x-8 gap-y-4"
          variants={containerVariants}
        >
          {navLinks.map((link) => (
            <motion.div
              key={link.href}
              variants={linkVariants}
              onHoverStart={() => setHoveredLink(link.href)}
              onHoverEnd={() => setHoveredLink(null)}
              className="relative overflow-hidden"
            >
              <Link 
                href={link.href} 
                onClick={(e) => handleClick(e, link.href)}
                className={`text-sm uppercase tracking-widest transition-colors duration-300
                          ${activeSection === link.href.substring(1) 
                            ? 'text-white' 
                            : 'text-white/70 hover:text-white'}`}
              >
                <motion.span
                  className="relative inline-block py-1"
                  whileHover={{ y: -1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  {link.text}
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-[1px]"
                    initial={{ scaleX: 0 }}
                    animate={{ 
                      scaleX: hoveredLink === link.href || activeSection === link.href.substring(1) ? 1 : 0,
                      background: "linear-gradient(to right, #67e8f9, #818cf8, #c084fc)"
                    }}
                    transition={{ 
                      duration: 0.3,
                      ease: "easeInOut"
                    }}
                    style={{ originX: 0 }}
                  />
                </motion.span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;