'use client';

import { useEffect, useRef } from 'react';

export function useScrollNavigation() {
  const isScrolling = useRef(false);
  const animationFrame = useRef(null);

  useEffect(() => {
    const main = document.getElementById('main-scroll-container');
    if (!main) return;

    const getSections = () => {
      return Array.from(main.querySelectorAll('.scroll-section, .footer-section'));
    };

    const smoothScrollTo = (targetPosition) => {
      const startPosition = main.scrollTop;
      const distance = targetPosition - startPosition;
      const duration = 800; // ms
      const startTime = performance.now();

      const easeInOutCubic = (t) => {
        return t < 0.5 
          ? 4 * t * t * t 
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const animateScroll = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = easeInOutCubic(progress);
        
        main.scrollTop = startPosition + distance * easeProgress;

        if (progress < 1) {
          animationFrame.current = requestAnimationFrame(animateScroll);
        } else {
          isScrolling.current = false;
        }
      };

      isScrolling.current = true;
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      animationFrame.current = requestAnimationFrame(animateScroll);
    };

    const scrollToSection = (direction) => {
      if (isScrolling.current) return;
      
      const sections = getSections();
      if (sections.length === 0) return;

      const currentScroll = main.scrollTop;
      const viewportHeight = main.clientHeight;
      
      let targetSection = null;
      
      if (direction === 'down') {
        for (let i = 0; i < sections.length; i++) {
          const sectionTop = sections[i].offsetTop;
          if (sectionTop > currentScroll + 50) {
            targetSection = sections[i];
            break;
          }
        }
      } else if (direction === 'up') {
        for (let i = sections.length - 1; i >= 0; i--) {
          const sectionBottom = sections[i].offsetTop + sections[i].offsetHeight;
          if (sectionBottom < currentScroll + viewportHeight - 50) {
            targetSection = sections[i];
            break;
          }
        }
      }

      if (targetSection) {
        smoothScrollTo(targetSection.offsetTop);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        scrollToSection('down');
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        scrollToSection('up');
      } else if (e.key === 'Home') {
        e.preventDefault();
        smoothScrollTo(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        const sections = getSections();
        if (sections.length > 0) {
          const lastSection = sections[sections.length - 1];
          smoothScrollTo(lastSection.offsetTop);
        }
      }
    };

    const handleWheel = (e) => {
      e.preventDefault();
      
      if (isScrolling.current) return;
      
      const delta = e.deltaY;
      
      if (Math.abs(delta) < 30) return;
      
      // Debounce wheel events
      setTimeout(() => {
        if (delta > 0) {
          scrollToSection('down');
        } else {
          scrollToSection('up');
        }
      }, 50);
    };

    // Event listeners
    window.addEventListener('keydown', handleKeyDown);
    main.addEventListener('wheel', handleWheel, { passive: false });
    
    // Touch support
    let touchStartY = 0;
    let touchStartTime = 0;
    
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    };
    
    const handleTouchEnd = (e) => {
      const touchEndY = e.changedTouches[0].clientY;
      const touchEndTime = Date.now();
      const deltaY = touchEndY - touchStartY;
      const deltaTime = touchEndTime - touchStartTime;
      
      // Fast swipe detection
      if (Math.abs(deltaY) > 50 && deltaTime < 300) {
        if (deltaY < 0) {
          scrollToSection('down');
        } else {
          scrollToSection('up');
        }
      }
    };
    
    main.addEventListener('touchstart', handleTouchStart, { passive: true });
    main.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      main.removeEventListener('wheel', handleWheel);
      main.removeEventListener('touchstart', handleTouchStart);
      main.removeEventListener('touchend', handleTouchEnd);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);
}