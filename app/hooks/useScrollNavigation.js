'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function useScrollNavigation() {
  const isScrolling = useRef(false);
  const animationFrame = useRef(null);
  const lastScrollTime = useRef(0);
  const touchStartY = useRef(0);
  const touchStartTime = useRef(0);
  const touchDeltaY = useRef(0);
  const isTouching = useRef(false);
  const velocity = useRef(0);
  const lastTouchY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    const main = document.getElementById('main-scroll-container');
    if (!main) return;

    // Reset scroll position on route change
    main.scrollTop = 0;
    isScrolling.current = false;

    const getNavOffset = () => {
  const val = getComputedStyle(document.documentElement)
    .getPropertyValue('--navbar-height');
  return parseInt(val, 10) || 0;
};

    const getVisibleSections = () => {
      // Footer ko exclude karo
      return Array.from(main.querySelectorAll('.scroll-section:not(.footer-section)'));
    };

    const getFooterSection = () => {
      return main.querySelector('.footer-section');
    };

    const getCurrentSectionIndex = () => {
      const sections = getVisibleSections();
      const footer = getFooterSection();
      const scrollTop = main.scrollTop;
      const viewportHeight = main.clientHeight;
      
      // Check if in footer
      if (footer && scrollTop >= footer.offsetTop - viewportHeight / 2) {
        return sections.length - 1; // Return last page section
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
      const currentIndex = getCurrentSectionIndex();
      return sections[currentIndex] || sections[sections.length - 1];
    };

    const isSectionLarge = (section) => {
      if (!section) return false;
      const viewportHeight = main.clientHeight;
      const sectionHeight = section.scrollHeight;
      return section.getAttribute('data-section-type') === 'large' || 
             sectionHeight > viewportHeight * 1;
    };

    // Premium easing functions
    const easings = {
      smooth: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
      premium: (t) => {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
      },
      buttery: (t) => {
        return t < 0.5 
          ? 8 * t * t * t * t 
          : 1 - Math.pow(-2 * t + 2, 4) / 2;
      }
    };

    const smoothScrollTo = (targetPosition, duration = null, easingType = 'buttery') => {
      const startPosition = main.scrollTop;
      const distance = targetPosition - startPosition;
      
      if (Math.abs(distance) < 1) {
        isScrolling.current = false;
        return;
      }
      
      const scrollDuration = duration || Math.min(
        1200,
        Math.max(400, Math.abs(distance) * 0.8)
      );
      
      const startTime = performance.now();
      const easing = easings[easingType] || easings.buttery;

      const animateScroll = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / scrollDuration, 1);
        const easeProgress = easing(progress);
        
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

    const scrollToSection = (direction, customVelocity = null) => {
      const now = Date.now();
      if (now - lastScrollTime.current < 50) return;
      if (isScrolling.current) return;
      
      lastScrollTime.current = now;
      
      const sections = getVisibleSections();
      const footer = getFooterSection();
      if (sections.length === 0) return;

      const currentIndex = getCurrentSectionIndex();
      const currentSection = sections[currentIndex];
      const viewportHeight = main.clientHeight;
      const currentScroll = main.scrollTop;
      
      let targetPosition = null;
      let easingType = 'buttery';
      
      if (direction === 'down') {
        if (currentSection && isSectionLarge(currentSection)) {
          const sectionTop = currentSection.offsetTop;
          const sectionBottom = sectionTop + currentSection.scrollHeight;
          
          if (currentScroll + viewportHeight < sectionBottom - 20) {
            targetPosition = currentScroll + viewportHeight * 0.85;
            easingType = 'smooth';
          } else {
            const nextIndex = currentIndex + 1;
  if (nextIndex < sections.length) {
    targetPosition = Math.max(0, sections[nextIndex].offsetTop - getNavOffset()); // FIX
    easingType = 'premium';
  } else if (footer) {
    targetPosition = footer.offsetTop;
    easingType = 'premium';
  }
          }
        } else {
          const nextIndex = currentIndex + 1;
if (nextIndex < sections.length) {
  targetPosition = Math.max(0, sections[nextIndex].offsetTop - getNavOffset()); // FIX
  easingType = 'premium';
} else if (footer) {
  targetPosition = footer.offsetTop;
  easingType = 'premium';
}
        }
      } else if (direction === 'up') {
        const sectionTop = currentSection ? currentSection.offsetTop : 0;
        
       if (currentSection && isSectionLarge(currentSection) && currentScroll > sectionTop + 20) {
  targetPosition = currentScroll - viewportHeight * 0.85;
  easingType = 'smooth';

  if (targetPosition < sectionTop - getNavOffset()) {   // FIX
    targetPosition = Math.max(0, sectionTop - getNavOffset()); // FIX
  }

        } else {
         const prevIndex = currentIndex - 1;
if (prevIndex >= 0) {
  targetPosition = Math.max(0, sections[prevIndex].offsetTop - getNavOffset()); // FIX
  easingType = 'premium';
}
        }
      }

      if (targetPosition !== null) {
        targetPosition = Math.max(0, Math.min(targetPosition, main.scrollHeight - viewportHeight));
        
        const scrollDistance = targetPosition - currentScroll;
        
        let duration = null;
        if (customVelocity && Math.abs(customVelocity) > 1) {
          duration = Math.min(800, Math.max(300, Math.abs(scrollDistance) / Math.abs(customVelocity)));
        } else if (isSectionLarge(currentSection)) {
          duration = 500;
        }
        
        smoothScrollTo(targetPosition, duration, easingType);
      }
    };

    // Enhanced keyboard navigation
    const handleKeyDown = (e) => {
      const currentSection = getCurrentSection();
      const footer = getFooterSection();
      const currentScroll = main.scrollTop;
      const viewportHeight = main.clientHeight;
      
      // Check if in footer
      if (footer && currentScroll >= footer.offsetTop - 20) {
       if (e.key === 'ArrowUp' || e.key === 'PageUp') {
  e.preventDefault();
  const sections = getVisibleSections();
  if (sections.length > 0) {
    const lastSection = sections[sections.length - 1];
    smoothScrollTo(Math.max(0, lastSection.offsetTop - getNavOffset()), 600, 'premium'); // FIX
  }
}
        return;
      }
      
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        
        if (currentSection && isSectionLarge(currentSection)) {
          const sectionTop = currentSection.offsetTop;
          const sectionBottom = sectionTop + currentSection.scrollHeight;
          
          if (currentScroll + viewportHeight < sectionBottom - 20) {
            scrollToSection('down');
          } else {
            const sections = getVisibleSections();
            const currentIndex = getCurrentSectionIndex();
            const nextIndex = currentIndex + 1;
if (nextIndex < sections.length) {
  smoothScrollTo(Math.max(0, sections[nextIndex].offsetTop - getNavOffset()), 600, 'premium'); // FIX
} else if (footer) {
  smoothScrollTo(footer.offsetTop, 600, 'premium');
}
          }
        } else {
          scrollToSection('down');
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        
        if (currentSection && isSectionLarge(currentSection)) {
          const sectionTop = currentSection.offsetTop;
          
          if (currentScroll > sectionTop + 20) {
            scrollToSection('up');
          } else {
            const sections = getVisibleSections();
            const currentIndex = getCurrentSectionIndex();
           const prevIndex = currentIndex - 1;
if (prevIndex >= 0) {
  smoothScrollTo(Math.max(0, sections[prevIndex].offsetTop - getNavOffset()), 600, 'premium'); // FIX
}
          }
        } else {
          scrollToSection('up');
        }
      } else if (e.key === 'Home') {
        e.preventDefault();
        smoothScrollTo(0, 600, 'premium');
      } else if (e.key === 'End') {
        e.preventDefault();
        if (footer) {
          smoothScrollTo(footer.offsetTop, 600, 'premium');
        }
      }
    };

    // Enhanced wheel with momentum
    let momentumVelocity = 0;
    let lastWheelTime = 0;
    let wheelLock = false;          
let wheelLockTimeout = null;        
    
    const enhancedWheel = (e) => {
      const currentSection = getCurrentSection();
      const footer = getFooterSection();
      const currentScroll = main.scrollTop;
      const viewportHeight = main.clientHeight;
      
      // Check if in footer
      if (footer && currentScroll >= footer.offsetTop - 20) {
        const footerTop = footer.offsetTop;
       if (e.deltaY < 0 && currentScroll <= footerTop + 5) {
  e.preventDefault();
  const sections = getVisibleSections();
  if (sections.length > 0) {
    const lastSection = sections[sections.length - 1];
    smoothScrollTo(Math.max(0, lastSection.offsetTop - getNavOffset()), 600, 'premium'); // FIX
  }
}
        return; // Footer mein native scroll allow karo
      }
      
      if (currentSection && isSectionLarge(currentSection)) {
        const sectionTop = currentSection.offsetTop;
        const sectionBottom = sectionTop + currentSection.scrollHeight;
        
        const atTop = currentScroll <= sectionTop + 5;
        const atBottom = currentScroll + viewportHeight >= sectionBottom - 5;
        
        if ((atBottom && e.deltaY > 0) || (atTop && e.deltaY < 0)) {
          e.preventDefault();
          scrollToSection(e.deltaY > 0 ? 'down' : 'up');
        }
        return;
      }
      
      e.preventDefault();
      
      const now = Date.now();
      const timeDelta = now - lastWheelTime;
      lastWheelTime = now;
      
      if (timeDelta < 100) {
        momentumVelocity += e.deltaY * 0.1;
      } else {
        momentumVelocity = e.deltaY;
      }
      
      momentumVelocity = Math.max(-100, Math.min(100, momentumVelocity));
      
      if (isScrolling.current) return;
      
      const delta = e.deltaY;
      if (Math.abs(delta) < 10) return;
      
      if (wheelLock) return;

      wheelLock = true;               // NEW
  scrollToSection(delta > 0 ? 'down' : 'up');

  clearTimeout(wheelLockTimeout); // NEW
  wheelLockTimeout = setTimeout(() => { // NEW
    wheelLock = false;
  }, 1000); // tune karo: 700-1000ms range try karo apne touchpad pe
};

    // Premium touch handlers
    const handleTouchStart = (e) => {
      isTouching.current = true;
      touchStartY.current = e.touches[0].clientY;
      lastTouchY.current = e.touches[0].clientY;
      touchStartTime.current = Date.now();
      touchDeltaY.current = 0;
      velocity.current = 0;
    };
    
    const handleTouchMove = (e) => {
      if (!isTouching.current) return;
      
      const currentY = e.touches[0].clientY;
      const deltaY = currentY - lastTouchY.current;
      const currentTime = Date.now();
      const deltaTime = currentTime - touchStartTime.current;
      
      touchDeltaY.current = currentY - touchStartY.current;
      
      if (deltaTime > 0) {
        velocity.current = deltaY / deltaTime;
      }
      
      lastTouchY.current = currentY;
    };
    
    const handleTouchEnd = (e) => {
      isTouching.current = false;
      
      const currentSection = getCurrentSection();
      const footer = getFooterSection();
      const currentScroll = main.scrollTop;
      
      if (footer && currentScroll >= footer.offsetTop - 20) {
        return;
      }
      
      if (currentSection && isSectionLarge(currentSection)) {
        const sectionTop = currentSection.offsetTop;
        const sectionBottom = sectionTop + currentSection.scrollHeight;
        const viewportHeight = main.clientHeight;
        
        const atTop = currentScroll <= sectionTop + 20;
        const atBottom = currentScroll + viewportHeight >= sectionBottom - 20;
        
        if (!atTop && !atBottom) {
          return;
        }
      }
      
      const touchEndY = e.changedTouches[0].clientY;
      const totalDeltaY = touchEndY - touchStartY.current;
      const elapsedTime = Date.now() - touchStartTime.current;
      
      if (Math.abs(totalDeltaY) > 20 && elapsedTime < 500) {
        const swipeVelocity = velocity.current;
        
        if (totalDeltaY < 0) {
          scrollToSection('down', swipeVelocity);
        } else {
          scrollToSection('up', swipeVelocity);
        }
      }
    };

    // Event listeners
    window.addEventListener('keydown', handleKeyDown);
    main.addEventListener('wheel', enhancedWheel, { passive: false });
    main.addEventListener('touchstart', handleTouchStart, { passive: true });
    main.addEventListener('touchmove', handleTouchMove, { passive: true });
    main.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      main.removeEventListener('wheel', enhancedWheel);
      main.removeEventListener('touchstart', handleTouchStart);
      main.removeEventListener('touchmove', handleTouchMove);
      main.removeEventListener('touchend', handleTouchEnd);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [pathname]);
}

// 'use client';

// import { useEffect, useRef } from 'react';
// import { usePathname } from 'next/navigation';

// export function useScrollNavigation() {
//   const isScrolling = useRef(false);
//   const animationFrame = useRef(null);
//   const lastScrollTime = useRef(0);
//   const touchStartY = useRef(0);
//   const touchStartTime = useRef(0);
//   const touchDeltaY = useRef(0);
//   const isTouching = useRef(false);
//   const velocity = useRef(0);
//   const lastTouchY = useRef(0);
//   const pathname = usePathname();

//   useEffect(() => {
//     const main = document.getElementById('main-scroll-container');
//     if (!main) return;

//     // Reset scroll position on route change
//     main.scrollTop = 0;
//     isScrolling.current = false;

//     const getVisibleSections = () => {
//       return Array.from(main.querySelectorAll('.scroll-section'));
//     };

//     const getCurrentSectionIndex = () => {
//       const sections = getVisibleSections();
//       const scrollTop = main.scrollTop;
//       const viewportHeight = main.clientHeight;
      
//       for (let i = 0; i < sections.length; i++) {
//         const sectionTop = sections[i].offsetTop;
//         const sectionBottom = sectionTop + sections[i].offsetHeight;
        
//         if (scrollTop >= sectionTop - viewportHeight / 2 && 
//             scrollTop < sectionBottom - viewportHeight / 2) {
//           return i;
//         }
//       }
//       return 0;
//     };

//     const getCurrentSection = () => {
//       const sections = getVisibleSections();
//       const currentIndex = getCurrentSectionIndex();
//       return sections[currentIndex] || sections[0];
//     };

//     const isSectionLarge = (section) => {
//       if (!section) return false;
//       const viewportHeight = main.clientHeight;
//       const sectionHeight = section.scrollHeight;
//       return section.getAttribute('data-section-type') === 'large' || 
//              sectionHeight > viewportHeight * 1;
//     };

//     // Premium easing functions
//     const easings = {
//       smooth: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
//       premium: (t) => {
//         const c1 = 1.70158;
//         const c3 = c1 + 1;
//         return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
//       },
//       buttery: (t) => {
//         return t < 0.5 
//           ? 8 * t * t * t * t 
//           : 1 - Math.pow(-2 * t + 2, 4) / 2;
//       }
//     };

//     const smoothScrollTo = (targetPosition, duration = null, easingType = 'buttery') => {
//       const startPosition = main.scrollTop;
//       const distance = targetPosition - startPosition;
      
//       if (Math.abs(distance) < 1) {
//         isScrolling.current = false;
//         return;
//       }
      
//       const scrollDuration = duration || Math.min(
//         1200,
//         Math.max(400, Math.abs(distance) * 0.8)
//       );
      
//       const startTime = performance.now();
//       const easing = easings[easingType] || easings.buttery;

//       const animateScroll = (currentTime) => {
//         const elapsed = currentTime - startTime;
//         const progress = Math.min(elapsed / scrollDuration, 1);
//         const easeProgress = easing(progress);
        
//         main.scrollTop = startPosition + distance * easeProgress;

//         if (progress < 1) {
//           animationFrame.current = requestAnimationFrame(animateScroll);
//         } else {
//           isScrolling.current = false;
//         }
//       };

//       isScrolling.current = true;
//       if (animationFrame.current) {
//         cancelAnimationFrame(animationFrame.current);
//       }
//       animationFrame.current = requestAnimationFrame(animateScroll);
//     };

//     const scrollToSection = (direction, customVelocity = null) => {
//       const now = Date.now();
//       if (now - lastScrollTime.current < 50) return;
//       if (isScrolling.current) return;
      
//       lastScrollTime.current = now;
      
//       const sections = getVisibleSections();
//       if (sections.length === 0) return;

//       const currentIndex = getCurrentSectionIndex();
//       const currentSection = sections[currentIndex];
//       const viewportHeight = main.clientHeight;
//       const currentScroll = main.scrollTop;
      
//       let targetPosition = null;
//       let easingType = 'buttery';
      
//       if (direction === 'down') {
//         if (currentSection && isSectionLarge(currentSection)) {
//           const sectionTop = currentSection.offsetTop;
//           const sectionBottom = sectionTop + currentSection.scrollHeight;
          
//           if (currentScroll + viewportHeight < sectionBottom - 20) {
//             targetPosition = currentScroll + viewportHeight * 0.85;
//             easingType = 'smooth';
//           } else {
//             const nextIndex = currentIndex + 1;
//             if (nextIndex < sections.length) {
//               targetPosition = sections[nextIndex].offsetTop;
//               easingType = 'premium';
//             }
//           }
//         } else {
//           const nextIndex = currentIndex + 1;
//           if (nextIndex < sections.length) {
//             targetPosition = sections[nextIndex].offsetTop;
//             easingType = 'premium';
//           }
//         }
//       } else if (direction === 'up') {
//         const sectionTop = currentSection ? currentSection.offsetTop : 0;
        
//         if (currentSection && isSectionLarge(currentSection) && currentScroll > sectionTop + 20) {
//           targetPosition = currentScroll - viewportHeight * 0.85;
//           easingType = 'smooth';
          
//           if (targetPosition < sectionTop) {
//             targetPosition = sectionTop;
//           }
//         } else {
//           const prevIndex = currentIndex - 1;
//           if (prevIndex >= 0) {
//             targetPosition = sections[prevIndex].offsetTop;
//             easingType = 'premium';
//           }
//         }
//       }

//       if (targetPosition !== null) {
//         targetPosition = Math.max(0, Math.min(targetPosition, main.scrollHeight - viewportHeight));
        
//         const scrollDistance = targetPosition - currentScroll;
        
//         let duration = null;
//         if (customVelocity && Math.abs(customVelocity) > 1) {
//           duration = Math.min(800, Math.max(300, Math.abs(scrollDistance) / Math.abs(customVelocity)));
//         } else if (isSectionLarge(currentSection)) {
//           duration = 500;
//         }
        
//         smoothScrollTo(targetPosition, duration, easingType);
//       }
//     };

//     // Enhanced keyboard navigation
//     const handleKeyDown = (e) => {
//       const currentSection = getCurrentSection();
      
//       if (e.key === 'ArrowDown' || e.key === 'PageDown') {
//         if (currentSection && isSectionLarge(currentSection)) {
//           return;
//         }
//         e.preventDefault();
//         scrollToSection('down');
//       } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
//         if (currentSection && isSectionLarge(currentSection)) {
//           return;
//         }
//         e.preventDefault();
//         scrollToSection('up');
//       } else if (e.key === 'Home') {
//         e.preventDefault();
//         smoothScrollTo(0, 600, 'premium');
//       } else if (e.key === 'End') {
//         e.preventDefault();
//         const sections = getVisibleSections();
//         if (sections.length > 0) {
//           const lastSection = sections[sections.length - 1];
//           smoothScrollTo(lastSection.offsetTop, 600, 'premium');
//         }
//       }
//     };

//     // Enhanced wheel with momentum
//     let momentumVelocity = 0;
//     let lastWheelTime = 0;
    
//     const enhancedWheel = (e) => {
//       const currentSection = getCurrentSection();
      
//       if (currentSection && isSectionLarge(currentSection)) {
//         const sectionTop = currentSection.offsetTop;
//         const sectionBottom = sectionTop + currentSection.scrollHeight;
//         const currentScroll = main.scrollTop;
//         const viewportHeight = main.clientHeight;
        
//         const atTop = currentScroll <= sectionTop + 5;
//         const atBottom = currentScroll + viewportHeight >= sectionBottom - 5;
        
//         if ((atBottom && e.deltaY > 0) || (atTop && e.deltaY < 0)) {
//           e.preventDefault();
//           scrollToSection(e.deltaY > 0 ? 'down' : 'up');
//         }
//         return;
//       }
      
//       e.preventDefault();
      
//       const now = Date.now();
//       const timeDelta = now - lastWheelTime;
//       lastWheelTime = now;
      
//       if (timeDelta < 100) {
//         momentumVelocity += e.deltaY * 0.1;
//       } else {
//         momentumVelocity = e.deltaY;
//       }
      
//       momentumVelocity = Math.max(-100, Math.min(100, momentumVelocity));
      
//       if (isScrolling.current) return;
      
//       const delta = e.deltaY;
//       if (Math.abs(delta) < 10) return;
      
//       scrollToSection(delta > 0 ? 'down' : 'up', momentumVelocity);
      
//       setTimeout(() => {
//         momentumVelocity = 0;
//       }, 150);
//     };

//     // Premium touch handlers
//     const handleTouchStart = (e) => {
//       isTouching.current = true;
//       touchStartY.current = e.touches[0].clientY;
//       lastTouchY.current = e.touches[0].clientY;
//       touchStartTime.current = Date.now();
//       touchDeltaY.current = 0;
//       velocity.current = 0;
//     };
    
//     const handleTouchMove = (e) => {
//       if (!isTouching.current) return;
      
//       const currentY = e.touches[0].clientY;
//       const deltaY = currentY - lastTouchY.current;
//       const currentTime = Date.now();
//       const deltaTime = currentTime - touchStartTime.current;
      
//       touchDeltaY.current = currentY - touchStartY.current;
      
//       if (deltaTime > 0) {
//         velocity.current = deltaY / deltaTime;
//       }
      
//       lastTouchY.current = currentY;
//     };
    
//     const handleTouchEnd = (e) => {
//       isTouching.current = false;
      
//       const currentSection = getCurrentSection();
      
//       if (currentSection && isSectionLarge(currentSection)) {
//         return;
//       }
      
//       const touchEndY = e.changedTouches[0].clientY;
//       const totalDeltaY = touchEndY - touchStartY.current;
//       const elapsedTime = Date.now() - touchStartTime.current;
      
//       if (Math.abs(totalDeltaY) > 20 && elapsedTime < 500) {
//         const swipeVelocity = velocity.current;
        
//         if (totalDeltaY < 0) {
//           scrollToSection('down', swipeVelocity);
//         } else {
//           scrollToSection('up', swipeVelocity);
//         }
//       }
//     };

//     // Event listeners
//     window.addEventListener('keydown', handleKeyDown);
//     main.addEventListener('wheel', enhancedWheel, { passive: false });
//     main.addEventListener('touchstart', handleTouchStart, { passive: true });
//     main.addEventListener('touchmove', handleTouchMove, { passive: true });
//     main.addEventListener('touchend', handleTouchEnd, { passive: true });

//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//       main.removeEventListener('wheel', enhancedWheel);
//       main.removeEventListener('touchstart', handleTouchStart);
//       main.removeEventListener('touchmove', handleTouchMove);
//       main.removeEventListener('touchend', handleTouchEnd);
//       if (animationFrame.current) {
//         cancelAnimationFrame(animationFrame.current);
//       }
//     };
//   }, [pathname]); // Re-run on route change
// }
