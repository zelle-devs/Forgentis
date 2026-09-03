'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useScrollNavigation } from '@/app/hooks/useScrollNavigation';
import { usePathname } from 'next/navigation';
import Footer2 from '@/components/Footer/Footer2';
import { AnimatePresence, motion } from 'framer-motion';

const ScrollWrapper = ({ children }) => {
  const mainRef = useRef(null);
  const [sections, setSections] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const pathname = usePathname();
  
  useScrollNavigation();

  // Detect section sizes - Footer ko EXCLUDE karo
  const analyzeSections = useCallback(() => {
    const main = document.getElementById('main-scroll-container');
    if (!main) return;

    // Footer ko exclude karo
    const sectionElements = main.querySelectorAll('.scroll-section:not(.footer-section)');
    const viewportHeight = window.innerHeight;
    const sectionData = [];

    sectionElements.forEach((section, index) => {
      const sectionHeight = section.scrollHeight;
      const isHero = index === 0;
      
      let type = 'normal';
      
      if (isHero) {
        type = 'hero';
      } else if (sectionHeight > viewportHeight * 1.2) {
        type = 'large';
        section.setAttribute('data-section-type', 'large');
      } else if (sectionHeight < viewportHeight * 0.6) {
        type = 'short';
        section.setAttribute('data-section-type', 'short');
      } else {
        section.setAttribute('data-section-type', 'normal');
      }

      sectionData.push({
        element: section,
        height: sectionHeight,
        type,
        index
      });
    });

    setSections(sectionData);
    setActiveIndex(0);
    console.log(`[${pathname}] Page sections (excluding footer):`, sectionData.length);
  }, [pathname]);

  useEffect(() => {
    setSections([]);
    setActiveIndex(0);
    
    const main = document.getElementById('main-scroll-container');
    if (main) {
      main.scrollTop = 0;
    }
    
    const initTimer = setTimeout(() => {
      analyzeSections();
    }, 300);
    
    window.addEventListener('load', analyzeSections);
    
    const handleResize = () => {
      clearTimeout(window.resizeTimeout);
      window.resizeTimeout = setTimeout(analyzeSections, 250);
    };
    
    window.addEventListener('resize', handleResize);
    
    const mainElement = document.getElementById('main-scroll-container');
    let mutationObserver = null;
    
    if (mainElement) {
      mutationObserver = new MutationObserver(() => {
        clearTimeout(window.analyzeTimeout);
        window.analyzeTimeout = setTimeout(analyzeSections, 100);
      });
      
      mutationObserver.observe(mainElement, {
        childList: true,
        subtree: true,
      });
    }
    
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(window.resizeTimeout);
      window.resizeTimeout = setTimeout(analyzeSections, 250);
    });
    
    if (mainElement) {
      mainElement.querySelectorAll('.scroll-section:not(.footer-section)').forEach(section => {
        resizeObserver.observe(section);
      });
    }
    
    return () => {
      clearTimeout(initTimer);
      window.removeEventListener('load', analyzeSections);
      window.removeEventListener('resize', handleResize);
      if (mutationObserver) mutationObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, [analyzeSections, pathname]);

  // Track active section
  useEffect(() => {
    const main = document.getElementById('main-scroll-container');
    if (!main || sections.length === 0) return;

    const handleScroll = () => {
      const scrollTop = main.scrollTop;
      const viewportHeight = main.clientHeight;
      const scrollCenter = scrollTop + viewportHeight / 2;
      
      let currentActive = sections.length - 1; // Default to last section
      
      sections.forEach((section, index) => {
        const sectionTop = section.element.offsetTop;
        const sectionBottom = sectionTop + section.element.offsetHeight;
        
        if (scrollCenter >= sectionTop && scrollCenter < sectionBottom) {
          currentActive = index;
        }
      });
      
      setActiveIndex(currentActive);
    };

    handleScroll();
    
    main.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      main.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);

  const handleDotClick = (index) => {
  const targetSection = sections[index]?.element;
  if (!targetSection) return;

  targetSection.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
};

  return (
    <main id="main-scroll-container" ref={mainRef}>
      {children}
      
      {/* Footer Section - Separate */}
      <section className="scroll-section footer-section" data-section-type="footer">
        <Footer2/>
      </section>
      
      {sections.length > 1 && (
  <div className="scroll-progress-indicator">
    {sections.map((section, index) => {
      const label = section.element.dataset.sectionLabel || `Section ${index + 1}`;
      return (
        <div
          key={`${pathname}-${index}`}
          className="scroll-dot-wrapper"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === index && (
              <motion.span
                className="scroll-dot-tooltip"
                initial={{ opacity: 0, x: 10, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.9 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>

          <button
            className={`scroll-dot ${activeIndex === index ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to ${label}`}
          />
        </div>
      );
    })}
  </div>
)}
    </main>
  );
};

export default ScrollWrapper;