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
  const [isCompact, setIsCompact] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setIsCompact(true);
    } else {
      setIsCompact(false);
    }
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
    normal: { 
      y: 0,
      padding: "1rem",
    },
    compact: { 
      y: 0,
      padding: "0.5rem 1rem",
    }
  };

  const backgroundVariants = {
    normal: {
      background: "linear-gradient(135deg, rgba(103, 232, 249, 0.03), rgba(129, 140, 248, 0.03), rgba(192, 132, 252, 0.03))",
      backdropFilter: "blur(8px)",
      borderColor: "rgba(255, 255, 255, 0.1)",
    },
    compact: {
      background: "linear-gradient(135deg, rgba(103, 232, 249, 0.05), rgba(129, 140, 248, 0.05), rgba(192, 132, 252, 0.05))",
      backdropFilter: "blur(12px)",
      borderColor: "rgba(103, 232, 249, 0.1)",
    }
  };

  const menuVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  return (
    <motion.nav 
      className="fixed w-full z-50 px-4 md:px-8"
      variants={containerVariants}
      initial="normal"
      animate={isCompact ? "compact" : "normal"}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className={`max-w-6xl mx-auto rounded-2xl px-6 py-4 gradient-border-effect navbar-glass
                   ${isCompact ? 'shadow-[0_4px_24px_-1px_rgba(103,232,249,0.1)]' : 'shadow-none'}`}
        variants={backgroundVariants}
        initial="normal"
        animate={isCompact ? "compact" : "normal"}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative"
          >
            <Link 
              href="/"
              className="text-2xl font-bold"
              onClick={(e) => handleClick(e, "#top")}
            >
              <motion.span 
                className="bg-gradient-to-r from-[#67e8f9] via-[#818cf8] to-[#c084fc] bg-clip-text text-transparent"
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              >
                YN
              </motion.span>
            </Link>
          </motion.div>

          {/* Hamburger Menu for Mobile */}
          <button 
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <motion.span 
                className="w-full h-0.5 bg-white rounded-full"
                animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              />
              <motion.span 
                className="w-full h-0.5 bg-white rounded-full"
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              />
              <motion.span 
                className="w-full h-0.5 bg-white rounded-full"
                animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              />
            </div>
          </button>

          {/* Desktop Menu */}
          <motion.div 
            className="hidden md:flex items-center space-x-8"
            animate={{ 
              scale: isCompact ? 0.95 : 1,
              opacity: 1 
            }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link) => (
              <motion.div
                key={link.href}
                onHoverStart={() => setHoveredLink(link.href)}
                onHoverEnd={() => setHoveredLink(null)}
                className="relative"
              >
                <Link 
                  href={link.href} 
                  onClick={(e) => handleClick(e, link.href)}
                  className={`text-sm uppercase tracking-wider transition-all duration-300
                            ${activeSection === link.href.substring(1) 
                              ? 'text-white' 
                              : 'text-white/70 hover:text-white'}`}
                >
                  <motion.div
                    className="relative py-2 px-3 rounded-lg"
                    whileHover={{ 
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                    }}
                  >
                    {link.text}
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#67e8f9] via-[#818cf8] to-[#c084fc]"
                      initial={{ scaleX: 0 }}
                      animate={{ 
                        scaleX: hoveredLink === link.href || activeSection === link.href.substring(1) ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      style={{ originX: 0 }}
                    />
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className="md:hidden"
          initial="closed"
          animate={isMenuOpen ? "open" : "closed"}
          variants={menuVariants}
        >
          <motion.div className="flex flex-col space-y-4 pt-4">
            {navLinks.map((link) => (
              <motion.div
                key={link.href}
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: -10 }
                }}
              >
                <Link 
                  href={link.href} 
                  onClick={(e) => {
                    handleClick(e, link.href);
                    setIsMenuOpen(false);
                  }}
                  className={`block py-2 px-4 rounded-lg text-sm uppercase tracking-wider transition-all duration-300
                            ${activeSection === link.href.substring(1) 
                              ? 'text-white bg-white/10' 
                              : 'text-white/70 hover:text-white hover:bg-white/5'}`}
                >
                  {link.text}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;