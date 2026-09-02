'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useScrollNavigation } from '@/app/hooks/useScrollNavigation';
import { usePathname } from 'next/navigation';
import Footer2 from '@/components/Footer/Footer2';

const ScrollWrapper = ({ children }) => {
  const mainRef = useRef(null);
  const [sections, setSections] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const pathname = usePathname();
  
  useScrollNavigation();

  // Detect section sizes and categorize them
  const analyzeSections = useCallback(() => {
    const main = document.getElementById('main-scroll-container');
    if (!main) return;

    const sectionElements = main.querySelectorAll('.scroll-section');
    const viewportHeight = window.innerHeight;
    const sectionData = [];

    sectionElements.forEach((section, index) => {
      const sectionHeight = section.scrollHeight;
      const isHero = index === 0;
      const isFooter = index === sectionElements.length - 1;
      
      let type = 'normal';
      
      if (isHero) {
        type = 'hero';
      } else if (isFooter) {
        type = 'footer';
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
    setActiveIndex(0); // Reset active index
    console.log(`[${pathname}] Sections detected:`, sectionData.length);
  }, [pathname]);

  useEffect(() => {
    // Reset on route change
    setSections([]);
    setActiveIndex(0);
    
    // Scroll to top on route change
    const main = document.getElementById('main-scroll-container');
    if (main) {
      main.scrollTop = 0;
    }
    
    // Initial analyze after content loads
    const initTimer = setTimeout(() => {
      analyzeSections();
    }, 300);
    
    // Also run after window load
    window.addEventListener('load', analyzeSections);
    
    // Re-analyze on resize
    const handleResize = () => {
      clearTimeout(window.resizeTimeout);
      window.resizeTimeout = setTimeout(analyzeSections, 250);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Observe section size changes with MutationObserver
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
    
    // ResizeObserver for section size changes
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(window.resizeTimeout);
      window.resizeTimeout = setTimeout(analyzeSections, 250);
    });
    
    if (mainElement) {
      mainElement.querySelectorAll('.scroll-section').forEach(section => {
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

  // Track active section - Fixed calculation
  useEffect(() => {
    const main = document.getElementById('main-scroll-container');
    if (!main || sections.length === 0) return;

    const handleScroll = () => {
      const scrollTop = main.scrollTop;
      const viewportHeight = main.clientHeight;
      const scrollCenter = scrollTop + viewportHeight / 2;
      
      let currentActive = 0;
      
      sections.forEach((section, index) => {
        const sectionTop = section.element.offsetTop;
        const sectionBottom = sectionTop + section.element.offsetHeight;
        
        // Check if scroll center is within this section
        if (scrollCenter >= sectionTop && scrollCenter < sectionBottom) {
          currentActive = index;
        }
      });
      
      setActiveIndex(currentActive);
    };

    // Initial call
    handleScroll();
    
    main.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      main.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);

  const handleDotClick = (index) => {
    const main = document.getElementById('main-scroll-container');
    if (!main || !sections[index]) return;
    
    const targetSection = sections[index].element;
    const targetPosition = targetSection.offsetTop;
    
    main.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  };

  return (
    <main id="main-scroll-container" ref={mainRef}>
      {children}
      
      {/* Footer Section - Always at the end */}
      <section className="scroll-section footer-section" data-section-type="footer">
        <Footer2/>
      </section>
      
      {/* Scroll Progress Indicator - Only show if more than 1 section */}
      {sections.length > 1 && (
        <div className="scroll-progress-indicator">
          {sections.map((section, index) => (
            <button
              key={`${pathname}-${index}`}
              className={`scroll-dot ${activeIndex === index ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to section ${index + 1}`}
              title={`Section ${index + 1}`}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default ScrollWrapper;
