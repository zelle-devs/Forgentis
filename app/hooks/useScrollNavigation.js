'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function useScrollNavigation() {
  const isScrolling = useRef(false);
  const animationFrame = useRef(null);
  const lastScrollTime = useRef(0);
  const pathname = usePathname();
  const currentHeroSlide = useRef(0);
  const totalHeroSlides = useRef(0);
  const heroSlideChangeLock = useRef(false);

const wheelAccumulator = useRef(0);
const wheelTimeout = useRef(null);
const wheelLockUntil = useRef(0);
const lastWheelEvent = useRef(0);

  useEffect(() => {
    const main = document.getElementById('main-scroll-container');
    if (!main) return;

    main.scrollTop = 0;
    isScrolling.current = false;
    currentHeroSlide.current = 0;

    // Detect hero slides dynamically
    const detectHeroSlides = () => {
      const heroSection = main.querySelector('.hero-section');
      if (heroSection) {
        const dots = heroSection.querySelectorAll('.hero-dot');
        totalHeroSlides.current = dots.length;
        
        // Reset current slide if out of bounds
        if (currentHeroSlide.current >= totalHeroSlides.current) {
          currentHeroSlide.current = totalHeroSlides.current - 1;
        }
      } else {
        totalHeroSlides.current = 0;
      }
    };
    
    detectHeroSlides();
    
    const observer = new MutationObserver(() => {
      setTimeout(detectHeroSlides, 100);
    });
    observer.observe(main, { childList: true, subtree: true });

    // Listen for hero slide changes from Hero component
    const handleHeroSlideChange = (e) => {
      currentHeroSlide.current = e.detail;
      heroSlideChangeLock.current = false;
    };
    window.addEventListener('heroSlideChange', handleHeroSlideChange);

    // Also listen for direct slide navigation events
    const handleHeroNavigation = (e) => {
      heroSlideChangeLock.current = true;
      setTimeout(() => {
        heroSlideChangeLock.current = false;
      }, 800); // Lock during animation
    };
    window.addEventListener('heroNavigation', handleHeroNavigation);

    const getNavOffset = () => {
      const val = getComputedStyle(document.documentElement)
        .getPropertyValue('--navbar-height');
      return parseInt(val, 10) || 0;
    };

    const getVisibleSections = () => {
      return Array.from(main.querySelectorAll('.scroll-section:not(.footer-section)'));
    };

    const getFooterSection = () => {
      return main.querySelector('.footer-section');
    };

    const isHeroSection = (section) => {
      return section && section.classList.contains('hero-section');
    };

    const getCurrentSectionIndex = () => {
      const sections = getVisibleSections();
      const footer = getFooterSection();
      const scrollTop = main.scrollTop;
      const viewportHeight = main.clientHeight;
      
      if (footer && scrollTop >= footer.offsetTop - viewportHeight / 2) {
        return sections.length - 1;
      }
      
      for (let i = 0; i < sections.length; i++) {
        const sectionTop = sections[i].offsetTop;
        const sectionBottom = sectionTop + sections[i].offsetHeight;
        
        if (scrollTop >= sectionTop - viewportHeight / 2 && 
            scrollTop < sectionBottom - viewportHeight / 2) {
          return i;
        }
      }
      return sections.length - 1;
    };

    const getCurrentSection = () => {
      const sections = getVisibleSections();
      return sections[getCurrentSectionIndex()] || sections[sections.length - 1];
    };

    const isSectionLarge = (section) => {
      if (!section) return false;
      const viewportHeight = main.clientHeight;
      const sectionHeight = section.scrollHeight;
      return sectionHeight > viewportHeight * 1.1;
    };

    const smoothScrollTo = (targetPosition, duration = 600) => {
      const startPosition = main.scrollTop;
      const distance = targetPosition - startPosition;
      
      if (Math.abs(distance) < 1) {
        isScrolling.current = false;
        return;
      }
      
      const startTime = performance.now();
      
      const animateScroll = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = progress < 0.5 
          ? 4 * progress * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
        main.scrollTop = startPosition + distance * easeProgress;

        if (progress < 1) {
          animationFrame.current = requestAnimationFrame(animateScroll);
        } else {
          isScrolling.current = false;
        }
      };

      isScrolling.current = true;
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
      animationFrame.current = requestAnimationFrame(animateScroll);
    };

    const navigateHeroSlide = (direction) => {
      if (heroSlideChangeLock.current) return true;
      
      // Dispatch event to Hero component
      window.dispatchEvent(new CustomEvent('heroNavigation', { 
        detail: direction === 'down' ? 'next' : 'prev' 
      }));
      
      // Update local state
      if (direction === 'down') {
        currentHeroSlide.current = Math.min(currentHeroSlide.current + 1, totalHeroSlides.current - 1);
      } else {
        currentHeroSlide.current = Math.max(currentHeroSlide.current - 1, 0);
      }
      
      // Notify Hero component about slide change
      window.dispatchEvent(new CustomEvent('heroSlideChange', { 
        detail: currentHeroSlide.current 
      }));
      
      return true;
    };

    const scrollToSection = (direction) => {
      const now = Date.now();
      if (now - lastScrollTime.current < 100) return;
      if (isScrolling.current) return;
      if (heroSlideChangeLock.current) return;
      
      lastScrollTime.current = now;
      
      const sections = getVisibleSections();
      const footer = getFooterSection();
      if (sections.length === 0) return;

      const currentIndex = getCurrentSectionIndex();
      const currentSection = sections[currentIndex];
      
      // Handle hero slides
      if (currentSection && isHeroSection(currentSection)) {
        if (direction === 'down' && currentHeroSlide.current < totalHeroSlides.current - 1) {
          navigateHeroSlide('down');
          return;
        }
        if (direction === 'up' && currentHeroSlide.current > 0) {
          navigateHeroSlide('up');
          return;
        }
      }
      
      // For large sections, allow internal scroll
      if (currentSection && isSectionLarge(currentSection) && !isHeroSection(currentSection)) {
        const sectionTop = currentSection.offsetTop;
        const sectionBottom = sectionTop + currentSection.scrollHeight;
        const currentScroll = main.scrollTop;
        const viewportHeight = main.clientHeight;
        
        // Allow native scroll within large sections
        return;
      }
      
      // Normal section navigation
      let targetIndex = currentIndex;
      if (direction === 'down') targetIndex = currentIndex + 1;
      else if (direction === 'up') targetIndex = currentIndex - 1;
      
      if (targetIndex >= 0 && targetIndex < sections.length) {
        smoothScrollTo(Math.max(0, sections[targetIndex].offsetTop - getNavOffset()));
      } else if (direction === 'down' && footer) {
        smoothScrollTo(footer.offsetTop);
      }
    };

    const handleKeyDown = (e) => {
      const currentSection = getCurrentSection();
      
      // Don't intercept if on large section (allow native scroll)
      if (currentSection && isSectionLarge(currentSection) && !isHeroSection(currentSection)) {
        return;
      }
      
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        scrollToSection('down');
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        scrollToSection('up');
      } else if (e.key === 'Home') {
        e.preventDefault();
        smoothScrollTo(0);
      }
    };
// More responsive version - triggers immediately when threshold reached
const handleWheel = (e) => {
  const currentSection = getCurrentSection();
  const now = Date.now();
  
  // Don't intercept wheel for large sections (allow native scroll)
  if (currentSection && isSectionLarge(currentSection) && !isHeroSection(currentSection)) {
    return;
  }
  
  e.preventDefault();
  
  // Check if locked
  if (now < wheelLockUntil.current) {
    return;
  }
  
  // Add to accumulator
  wheelAccumulator.current += e.deltaY;
  
  const delta = wheelAccumulator.current;
  
  // Check if threshold reached
  if (Math.abs(delta) < 50) {
    // Set timeout to clear accumulator if no more scroll
    if (wheelTimeout.current) {
      clearTimeout(wheelTimeout.current);
    }
    
    wheelTimeout.current = setTimeout(() => {
      wheelAccumulator.current = 0;
    }, 200);
    
    return;
  }
  
  // Threshold reached, trigger immediately
  const direction = delta > 0 ? 'down' : 'up';
  wheelAccumulator.current = 0;
  
  // Clear timeout
  if (wheelTimeout.current) {
    clearTimeout(wheelTimeout.current);
  }
  
  // If on hero section
  if (currentSection && isHeroSection(currentSection)) {
    // At last slide, go to next section
    if (direction === 'down' && currentHeroSlide.current === totalHeroSlides.current - 1) {
      const sections = getVisibleSections();
      const currentIndex = getCurrentSectionIndex();
      const nextIndex = currentIndex + 1;
      
      if (nextIndex < sections.length) {
        smoothScrollTo(Math.max(0, sections[nextIndex].offsetTop - getNavOffset()), 600);
        wheelLockUntil.current = Date.now() + 1000;
      }
      return;
    }
    
    // At first slide, go to previous section
    if (direction === 'up' && currentHeroSlide.current === 0) {
      const sections = getVisibleSections();
      const currentIndex = getCurrentSectionIndex();
      const prevIndex = currentIndex - 1;
      
      if (prevIndex >= 0) {
        smoothScrollTo(Math.max(0, sections[prevIndex].offsetTop - getNavOffset()), 600);
        wheelLockUntil.current = Date.now() + 1000;
      }
      return;
    }
    
    // Navigate hero slides
    if (direction === 'down' && currentHeroSlide.current < totalHeroSlides.current - 1) {
      navigateHeroSlide('down');
      wheelLockUntil.current = Date.now() + 600;
    } else if (direction === 'up' && currentHeroSlide.current > 0) {
      navigateHeroSlide('up');
      wheelLockUntil.current = Date.now() + 600;
    }
  } else {
    // Normal section navigation
    scrollToSection(direction);
    wheelLockUntil.current = Date.now() + 600;
  }
};
    // Touch handling
    let touchStartY = 0;
    let touchStartTime = 0;
    
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    };
    
    const handleTouchEnd = (e) => {
      const currentSection = getCurrentSection();
      
      // Don't intercept for large sections
      if (currentSection && isSectionLarge(currentSection) && !isHeroSection(currentSection)) {
        return;
      }
      
      const deltaY = e.changedTouches[0].clientY - touchStartY;
      const deltaTime = Date.now() - touchStartTime;
      
      // Only trigger for quick swipes
      if (Math.abs(deltaY) > 30 && deltaTime < 300) {
        scrollToSection(deltaY < 0 ? 'down' : 'up');
      }
    };

    // Event listeners
    window.addEventListener('keydown', handleKeyDown);
    main.addEventListener('wheel', handleWheel, { passive: false });
    main.addEventListener('touchstart', handleTouchStart, { passive: true });
    main.addEventListener('touchend', handleTouchEnd, { passive: true });

   return () => {
  window.removeEventListener('keydown', handleKeyDown);
  main.removeEventListener('wheel', handleWheel);
  main.removeEventListener('touchstart', handleTouchStart);
  main.removeEventListener('touchend', handleTouchEnd);
  window.removeEventListener('heroSlideChange', handleHeroSlideChange);
  window.removeEventListener('heroNavigation', handleHeroNavigation);
  observer.disconnect();
  if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
  if (wheelTimeout.current) clearTimeout(wheelTimeout.current);
  wheelAccumulator.current = 0; // Reset accumulator
};
  }, [pathname]);
}