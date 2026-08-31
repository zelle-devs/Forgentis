'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useScrollNavigation } from '@/app/hooks/useScrollNavigation';

const ScrollWrapper = ({ children }) => {
  const mainRef = useRef(null);
  const [activeSection, setActiveSection] = useState(0);
  
  useScrollNavigation();

  useEffect(() => {
    const main = document.getElementById('main-scroll-container');
    if (!main) return;
    
    mainRef.current = main;

    const handleScroll = () => {
      if (!main) return;
      
      const sections = main.querySelectorAll('.scroll-section, .footer-section');
      const scrollPosition = main.scrollTop;
      const viewportHeight = main.clientHeight;
      
      let currentSection = 0;
      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop - viewportHeight / 2 && 
            scrollPosition < sectionBottom - viewportHeight / 2) {
          currentSection = index;
        }
      });
      
      setActiveSection(currentSection);
    };

    main.addEventListener('scroll', handleScroll, { passive: true });
    return () => main.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main id="main-scroll-container" ref={mainRef}>
      <AnimatePresence mode="wait">
        {children}
      </AnimatePresence>
      
      {/* Progress Indicator */}
      <div className="scroll-progress" style={{
        position: 'fixed',
        right: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        {Array.from({ length: 10 }).map((_, index) => (
          <motion.div
            key={index}
            animate={{
              scale: activeSection === index ? 1.5 : 1,
              backgroundColor: activeSection === index ? '#0270EA' : '#555555',
              opacity: activeSection === index ? 1 : 0.5
            }}
            transition={{ duration: 0.3 }}
            style={{
              width: '4px',
              height: '20px',
              borderRadius: '2px',
              cursor: 'pointer'
            }}
            onClick={() => {
              const main = document.getElementById('main-scroll-container');
              const sections = main.querySelectorAll('.scroll-section, .footer-section');
              if (sections[index]) {
                main.scrollTo({
                  top: sections[index].offsetTop,
                  behavior: 'smooth'
                });
              }
            }}
          />
        ))}
      </div>
    </main>
  );
};

export default ScrollWrapper;