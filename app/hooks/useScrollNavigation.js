'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function useScrollNavigation() {
  const pathname = usePathname();

  const isNavigating = useRef(false);
  const animationFrame = useRef(null);
  const unlockTimeout = useRef(null);

  const currentHeroSlide = useRef(0);
  const totalHeroSlides = useRef(0);

  const touchStartY = useRef(0);
  const touchStartTime = useRef(0);

  useEffect(() => {
    const main = document.getElementById(
      'main-scroll-container'
    );

    if (!main) return;

    // =========================================================
    // RESET
    // =========================================================

    main.scrollTop = 0;

    isNavigating.current = false;
    currentHeroSlide.current = 0;

    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }

    if (unlockTimeout.current) {
      clearTimeout(unlockTimeout.current);
    }

    // =========================================================
    // HERO DETECTION
    // =========================================================

    const detectHero = () => {
      const hero = main.querySelector(
        '.hero-section'
      );

      if (!hero) {
        totalHeroSlides.current = 0;
        currentHeroSlide.current = 0;
        return;
      }

      const dots = hero.querySelectorAll(
        '.hero-dot'
      );

      totalHeroSlides.current = dots.length;

      if (!dots.length) {
        currentHeroSlide.current = 0;
        return;
      }

      currentHeroSlide.current = Math.max(
        0,
        Math.min(
          currentHeroSlide.current,
          dots.length - 1
        )
      );
    };

    detectHero();

    const mutationObserver =
      new MutationObserver(() => {
        requestAnimationFrame(detectHero);
      });

    mutationObserver.observe(main, {
      childList: true,
      subtree: true,
    });

    // =========================================================
    // HERO EVENTS
    // =========================================================

    const handleHeroSlideChange = (event) => {
      const index = Number(event.detail);

      if (!Number.isNaN(index)) {
        currentHeroSlide.current = index;
      }
    };

    window.addEventListener(
      'heroSlideChange',
      handleHeroSlideChange
    );

    // =========================================================
    // HELPERS
    // =========================================================

    const getNavOffset = () => {
      const value =
        getComputedStyle(
          document.documentElement
        ).getPropertyValue(
          '--navbar-height'
        );

      return parseInt(value, 10) || 0;
    };

    const getSections = () => {
      return Array.from(
        main.querySelectorAll(
          '.scroll-section:not(.footer-section)'
        )
      );
    };

    const getFooter = () => {
      return main.querySelector(
        '.footer-section'
      );
    };

    const isHeroSection = (section) => {
      return (
        section &&
        section.classList.contains(
          'hero-section'
        )
      );
    };

    // =========================================================
    // LARGE SECTION DETECTION
    // =========================================================

    const isLargeSection = (section) => {
      if (!section) return false;

      /*
        First respect explicit page.js setting.
      */

      if (
        section.dataset.sectionType ===
        'large'
      ) {
        return true;
      }

      /*
        Fallback for dynamically created sections.
      */

      return (
        section.scrollHeight >
        main.clientHeight * 1.1
      );
    };

    // =========================================================
    // CURRENT SECTION
    // =========================================================

    const getCurrentSectionIndex = () => {
      const sections = getSections();

      if (!sections.length) {
        return -1;
      }

      const scrollTop = main.scrollTop;
      const viewportHeight =
        main.clientHeight;

      const viewportCenter =
        scrollTop +
        viewportHeight / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      sections.forEach((section, index) => {
        const center =
          section.offsetTop +
          section.offsetHeight / 2;

        const distance = Math.abs(
          viewportCenter - center
        );

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      return closestIndex;
    };

    const getCurrentSection = () => {
      const sections = getSections();

      const index =
        getCurrentSectionIndex();

      if (index < 0) {
        return null;
      }

      return sections[index] || null;
    };

    // =========================================================
    // LARGE SECTION BOUNDARY
    // =========================================================

    const isAtSectionTop = (section) => {
      if (!section) return true;

      const sectionTop =
        section.offsetTop;

      return (
        main.scrollTop <=
        sectionTop + 8
      );
    };

    const isAtSectionBottom = (section) => {
      if (!section) return true;

      const sectionTop =
        section.offsetTop;

      const sectionHeight =
        section.scrollHeight;

      const viewportHeight =
        main.clientHeight;

      const maxScroll =
        sectionTop +
        sectionHeight -
        viewportHeight;

      return (
        main.scrollTop >=
        maxScroll - 8
      );
    };

    // =========================================================
    // SMOOTH SECTION SCROLL
    // =========================================================

    const smoothScrollTo = (
      targetPosition,
      duration = 750
    ) => {
      const startPosition =
        main.scrollTop;

      const distance =
        targetPosition -
        startPosition;

      if (Math.abs(distance) < 1) {
        return;
      }

      if (animationFrame.current) {
        cancelAnimationFrame(
          animationFrame.current
        );
      }

      const startTime =
        performance.now();

      const easeInOut = (t) => {
        return t < 0.5
          ? 4 * t * t * t
          : 1 -
              Math.pow(
                -2 * t + 2,
                3
              ) /
                2;
      };

      const animate = (now) => {
        const elapsed =
          now - startTime;

        const progress = Math.min(
          elapsed / duration,
          1
        );

        const eased =
          easeInOut(progress);

        main.scrollTop =
          startPosition +
          distance * eased;

        if (progress < 1) {
          animationFrame.current =
            requestAnimationFrame(
              animate
            );
        }
      };

      animationFrame.current =
        requestAnimationFrame(
          animate
        );
    };

    // =========================================================
    // LOCK
    // =========================================================

    const lockNavigation = (
      duration = 850
    ) => {
      isNavigating.current = true;

      if (unlockTimeout.current) {
        clearTimeout(
          unlockTimeout.current
        );
      }

      unlockTimeout.current =
        setTimeout(() => {
          isNavigating.current = false;
        }, duration);
    };

    // =========================================================
    // HERO NAVIGATION
    // =========================================================

    const navigateHero = (direction) => {
      const total =
        totalHeroSlides.current;

      if (!total) {
        return false;
      }

      const current =
        currentHeroSlide.current;

      // -------------------------------------------------------
      // NEXT HERO SLIDE
      // -------------------------------------------------------

      if (
        direction === 'down' &&
        current < total - 1
      ) {
        lockNavigation(1900);

        window.dispatchEvent(
          new CustomEvent(
            'heroNavigation',
            {
              detail: 'next',
            }
          )
        );

        return true;
      }

      // -------------------------------------------------------
      // PREVIOUS HERO SLIDE
      // -------------------------------------------------------

      if (
        direction === 'up' &&
        current > 0
      ) {
        lockNavigation(1900);

        window.dispatchEvent(
          new CustomEvent(
            'heroNavigation',
            {
              detail: 'prev',
            }
          )
        );

        return true;
      }

      /*
        false means Hero has reached
        its boundary.
      */

      return false;
    };

    // =========================================================
    // NORMAL SECTION NAVIGATION
    // =========================================================

    const navigateToSection = (
      direction
    ) => {
      const sections = getSections();

      if (!sections.length) {
        return;
      }

      const currentIndex =
        getCurrentSectionIndex();

      if (currentIndex < 0) {
        return;
      }

      let targetIndex =
        currentIndex;

      if (direction === 'down') {
        targetIndex =
          currentIndex + 1;
      }

      if (direction === 'up') {
        targetIndex =
          currentIndex - 1;
      }

      // -------------------------------------------------------
      // NEXT SECTION
      // -------------------------------------------------------

      if (
        direction === 'down' &&
        targetIndex < sections.length
      ) {
        const target =
          sections[targetIndex];

        lockNavigation(850);

        smoothScrollTo(
          Math.max(
            0,
            target.offsetTop -
              getNavOffset()
          ),
          750
        );

        return;
      }

      // -------------------------------------------------------
      // PREVIOUS SECTION
      // -------------------------------------------------------

      if (
        direction === 'up' &&
        targetIndex >= 0
      ) {
        const target =
          sections[targetIndex];

        lockNavigation(850);

        smoothScrollTo(
          Math.max(
            0,
            target.offsetTop -
              getNavOffset()
          ),
          750
        );

        return;
      }

      // -------------------------------------------------------
      // FOOTER
      // -------------------------------------------------------

      if (
        direction === 'down' &&
        targetIndex >= sections.length
      ) {
        const footer =
          getFooter();

        if (footer) {
          lockNavigation(850);

          smoothScrollTo(
            footer.offsetTop,
            750
          );
        }
      }
    };

    // =========================================================
    // MASTER NAVIGATION
    // =========================================================

    const navigate = (direction) => {
      if (isNavigating.current) {
        return;
      }

      const section =
        getCurrentSection();

      if (!section) {
        return;
      }

      // =======================================================
      // HERO
      // =======================================================

      if (isHeroSection(section)) {
        /*
          If Hero still has slides available,
          consume the navigation.

          IMPORTANT:
          This prevents the next section
          from opening before the last slide.
        */

        if (
          navigateHero(direction)
        ) {
          return;
        }

        /*
          Hero is at boundary.

          Only now continue to
          normal section navigation.
        */
      }

      // =======================================================
      // LARGE SECTION
      // =======================================================

      if (
        isLargeSection(section)
      ) {
        /*
          DOWN:

          If content is NOT at bottom,
          allow native scrolling.

          If already at bottom,
          go to next section.
        */

        if (
          direction === 'down'
        ) {
          if (
            !isAtSectionBottom(
              section
            )
          ) {
            return;
          }

          navigateToSection(
            'down'
          );

          return;
        }

        /*
          UP:

          If content is NOT at top,
          allow native scrolling.

          If already at top,
          go to previous section.
        */

        if (
          direction === 'up'
        ) {
          if (
            !isAtSectionTop(
              section
            )
          ) {
            return;
          }

          navigateToSection(
            'up'
          );

          return;
        }
      }

      // =======================================================
      // NORMAL SECTION
      // =======================================================

      navigateToSection(
        direction
      );
    };

    // =========================================================
    // KEYBOARD
    // =========================================================

    const handleKeyDown = (event) => {
      const target =
        event.target;

      const isTyping =
        target instanceof
          HTMLInputElement ||
        target instanceof
          HTMLTextAreaElement ||
        target instanceof
          HTMLSelectElement ||
        target?.isContentEditable;

      if (isTyping) {
        return;
      }

      const isNavigationKey =
        event.key ===
          'ArrowDown' ||
        event.key ===
          'ArrowUp' ||
        event.key ===
          'PageDown' ||
        event.key ===
          'PageUp' ||
        event.key === ' ';

      if (!isNavigationKey) {
        return;
      }

      const section =
        getCurrentSection();

      if (!section) {
        return;
      }

      // =======================================================
      // LARGE SECTION KEYBOARD
      // =======================================================

      if (
        isLargeSection(section) &&
        !isHeroSection(section)
      ) {
        /*
          Let browser/native scroll work
          inside large sections.

          Only intercept keyboard when
          the section reaches its boundary.
        */

        if (
          event.key ===
            'ArrowDown' ||
          event.key ===
            'PageDown' ||
          event.key === ' '
        ) {
          if (
            !isAtSectionBottom(
              section
            )
          ) {
            return;
          }

          event.preventDefault();

          if (
            !isNavigating.current
          ) {
            navigate('down');
          }

          return;
        }

        if (
          event.key ===
            'ArrowUp' ||
          event.key ===
            'PageUp'
        ) {
          if (
            !isAtSectionTop(
              section
            )
          ) {
            return;
          }

          event.preventDefault();

          if (
            !isNavigating.current
          ) {
            navigate('up');
          }

          return;
        }
      }

      // =======================================================
      // HERO / NORMAL SECTION
      // =======================================================

      event.preventDefault();

      if (isNavigating.current) {
        return;
      }

      if (
        event.key ===
          'ArrowDown' ||
        event.key ===
          'PageDown' ||
        event.key === ' '
      ) {
        navigate('down');
      }

      if (
        event.key ===
          'ArrowUp' ||
        event.key ===
          'PageUp'
      ) {
        navigate('up');
      }
    };

    // =========================================================
    // WHEEL
    // =========================================================

    let wheelDelta = 0;
    let wheelResetTimer = null;

    const handleWheel = (event) => {
      const section =
        getCurrentSection();

      if (!section) {
        return;
      }

      // =======================================================
      // LARGE SECTION
      // =======================================================

      if (
        isLargeSection(section) &&
        !isHeroSection(section)
      ) {
        /*
          VERY IMPORTANT:

          While inside a large section,
          native wheel scrolling is allowed.

          So DON'T call preventDefault()
          here unless we're at a boundary.
        */

        const goingDown =
          event.deltaY > 0;

        const goingUp =
          event.deltaY < 0;

        // -----------------------------------------------------
        // DOWN + NOT AT BOTTOM
        // -----------------------------------------------------

        if (
          goingDown &&
          !isAtSectionBottom(
            section
          )
        ) {
          return;
        }

        // -----------------------------------------------------
        // UP + NOT AT TOP
        // -----------------------------------------------------

        if (
          goingUp &&
          !isAtSectionTop(
            section
          )
        ) {
          return;
        }

        /*
          We are at a boundary.
          From here our custom navigation
          takes control.
        */

        event.preventDefault();
      } else {
        /*
          Hero + normal sections:

          Always use custom navigation.
        */

        event.preventDefault();
      }

      // =======================================================
      // LOCK
      // =======================================================

      if (isNavigating.current) {
        return;
      }

      wheelDelta += event.deltaY;

      /*
        Small trackpad movement:
        wait for enough movement.
      */

      if (Math.abs(wheelDelta) < 40) {
        if (wheelResetTimer) {
          clearTimeout(
            wheelResetTimer
          );
        }

        wheelResetTimer =
          setTimeout(() => {
            wheelDelta = 0;
          }, 100);

        return;
      }

      const direction =
        wheelDelta > 0
          ? 'down'
          : 'up';

      /*
        Consume the complete
        wheel gesture.
      */

      wheelDelta = 0;

      if (wheelResetTimer) {
        clearTimeout(
          wheelResetTimer
        );
      }

      navigate(direction);
    };

    // =========================================================
    // TOUCH
    // =========================================================

    const handleTouchStart = (
      event
    ) => {
      if (!event.touches?.length) {
        return;
      }

      touchStartY.current =
        event.touches[0].clientY;

      touchStartTime.current =
        performance.now();
    };

    const handleTouchEnd = (
      event
    ) => {
      if (
        !event.changedTouches
          ?.length
      ) {
        return;
      }

      if (isNavigating.current) {
        return;
      }

      const section =
        getCurrentSection();

      if (!section) {
        return;
      }

      const endY =
        event.changedTouches[0]
          .clientY;

      const deltaY =
        endY -
        touchStartY.current;

      const deltaTime =
        performance.now() -
        touchStartTime.current;

      if (
        Math.abs(deltaY) < 45 ||
        deltaTime > 600
      ) {
        return;
      }

      const direction =
        deltaY < 0
          ? 'down'
          : 'up';

      // =======================================================
      // LARGE SECTION
      // =======================================================

      if (
        isLargeSection(section) &&
        !isHeroSection(section)
      ) {
        /*
          Inside large section:

          Swipe down while not at bottom
          should behave like native scroll.

          Swipe up while not at top
          should behave like native scroll.

          Boundary swipe navigates section.
        */

        if (
          direction === 'down' &&
          !isAtSectionBottom(
            section
          )
        ) {
          return;
        }

        if (
          direction === 'up' &&
          !isAtSectionTop(
            section
          )
        ) {
          return;
        }
      }

      navigate(direction);
    };

    // =========================================================
    // HOME / END
    // =========================================================

    const handleHomeEnd = (
      event
    ) => {
      const target =
        event.target;

      const isTyping =
        target instanceof
          HTMLInputElement ||
        target instanceof
          HTMLTextAreaElement ||
        target instanceof
          HTMLSelectElement ||
        target?.isContentEditable;

      if (isTyping) {
        return;
      }

      if (event.key === 'Home') {
        event.preventDefault();

        if (
          isNavigating.current
        ) {
          return;
        }

        lockNavigation(850);

        smoothScrollTo(
          0,
          800
        );
      }

      if (event.key === 'End') {
        event.preventDefault();

        if (
          isNavigating.current
        ) {
          return;
        }

        const footer =
          getFooter();

        if (footer) {
          lockNavigation(850);

          smoothScrollTo(
            footer.offsetTop,
            800
          );
        }
      }
    };

    // =========================================================
    // LISTENERS
    // =========================================================

    window.addEventListener(
      'keydown',
      handleKeyDown,
      { passive: false }
    );

    window.addEventListener(
      'keydown',
      handleHomeEnd,
      { passive: false }
    );

    main.addEventListener(
      'wheel',
      handleWheel,
      { passive: false }
    );

    main.addEventListener(
      'touchstart',
      handleTouchStart,
      { passive: true }
    );

    main.addEventListener(
      'touchend',
      handleTouchEnd,
      { passive: true }
    );

    // =========================================================
    // CLEANUP
    // =========================================================

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown
      );

      window.removeEventListener(
        'keydown',
        handleHomeEnd
      );

      main.removeEventListener(
        'wheel',
        handleWheel
      );

      main.removeEventListener(
        'touchstart',
        handleTouchStart
      );

      main.removeEventListener(
        'touchend',
        handleTouchEnd
      );

      window.removeEventListener(
        'heroSlideChange',
        handleHeroSlideChange
      );

      mutationObserver.disconnect();

      if (animationFrame.current) {
        cancelAnimationFrame(
          animationFrame.current
        );
      }

      if (unlockTimeout.current) {
        clearTimeout(
          unlockTimeout.current
        );
      }

      if (wheelResetTimer) {
        clearTimeout(
          wheelResetTimer
        );
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
//   const pathname = usePathname();
//   const currentHeroSlide = useRef(0);
//   const totalHeroSlides = useRef(0);
//   const heroSlideChangeLock = useRef(false);

// const wheelAccumulator = useRef(0);
// const wheelTimeout = useRef(null);
// const wheelLockUntil = useRef(0);
// const lastWheelEvent = useRef(0);

//   useEffect(() => {
//     const main = document.getElementById('main-scroll-container');
//     if (!main) return;

//     main.scrollTop = 0;
//     isScrolling.current = false;
//     currentHeroSlide.current = 0;

//     // Detect hero slides dynamically
//     const detectHeroSlides = () => {
//       const heroSection = main.querySelector('.hero-section');
//       if (heroSection) {
//         const dots = heroSection.querySelectorAll('.hero-dot');
//         totalHeroSlides.current = dots.length;
        
//         // Reset current slide if out of bounds
//         if (currentHeroSlide.current >= totalHeroSlides.current) {
//           currentHeroSlide.current = totalHeroSlides.current - 1;
//         }
//       } else {
//         totalHeroSlides.current = 0;
//       }
//     };
    
//     detectHeroSlides();
    
//     const observer = new MutationObserver(() => {
//       setTimeout(detectHeroSlides, 100);
//     });
//     observer.observe(main, { childList: true, subtree: true });

//     // Listen for hero slide changes from Hero component
//     const handleHeroSlideChange = (e) => {
//       currentHeroSlide.current = e.detail;
//       heroSlideChangeLock.current = false;
//     };
//     window.addEventListener('heroSlideChange', handleHeroSlideChange);

//     // Also listen for direct slide navigation events
//     const handleHeroNavigation = (e) => {
//       heroSlideChangeLock.current = true;
//       setTimeout(() => {
//         heroSlideChangeLock.current = false;
//       }, 800); // Lock during animation
//     };
//     window.addEventListener('heroNavigation', handleHeroNavigation);

//     const getNavOffset = () => {
//       const val = getComputedStyle(document.documentElement)
//         .getPropertyValue('--navbar-height');
//       return parseInt(val, 10) || 0;
//     };

//     const getVisibleSections = () => {
//       return Array.from(main.querySelectorAll('.scroll-section:not(.footer-section)'));
//     };

//     const getFooterSection = () => {
//       return main.querySelector('.footer-section');
//     };

//     const isHeroSection = (section) => {
//       return section && section.classList.contains('hero-section');
//     };

//     const getCurrentSectionIndex = () => {
//       const sections = getVisibleSections();
//       const footer = getFooterSection();
//       const scrollTop = main.scrollTop;
//       const viewportHeight = main.clientHeight;
      
//       if (footer && scrollTop >= footer.offsetTop - viewportHeight / 2) {
//         return sections.length - 1;
//       }
      
//       for (let i = 0; i < sections.length; i++) {
//         const sectionTop = sections[i].offsetTop;
//         const sectionBottom = sectionTop + sections[i].offsetHeight;
        
//         if (scrollTop >= sectionTop - viewportHeight / 2 && 
//             scrollTop < sectionBottom - viewportHeight / 2) {
//           return i;
//         }
//       }
//       return sections.length - 1;
//     };

//     const getCurrentSection = () => {
//       const sections = getVisibleSections();
//       return sections[getCurrentSectionIndex()] || sections[sections.length - 1];
//     };

//     const isSectionLarge = (section) => {
//       if (!section) return false;
//       const viewportHeight = main.clientHeight;
//       const sectionHeight = section.scrollHeight;
//       return sectionHeight > viewportHeight * 1.1;
//     };

//     const smoothScrollTo = (targetPosition, duration = 600) => {
//       const startPosition = main.scrollTop;
//       const distance = targetPosition - startPosition;
      
//       if (Math.abs(distance) < 1) {
//         isScrolling.current = false;
//         return;
//       }
      
//       const startTime = performance.now();
      
//       const animateScroll = (currentTime) => {
//         const elapsed = currentTime - startTime;
//         const progress = Math.min(elapsed / duration, 1);
//         const easeProgress = progress < 0.5 
//           ? 4 * progress * progress * progress 
//           : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
//         main.scrollTop = startPosition + distance * easeProgress;

//         if (progress < 1) {
//           animationFrame.current = requestAnimationFrame(animateScroll);
//         } else {
//           isScrolling.current = false;
//         }
//       };

//       isScrolling.current = true;
//       if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
//       animationFrame.current = requestAnimationFrame(animateScroll);
//     };

//     const navigateHeroSlide = (direction) => {
//       if (heroSlideChangeLock.current) return true;
      
//       // Dispatch event to Hero component
//       window.dispatchEvent(new CustomEvent('heroNavigation', { 
//         detail: direction === 'down' ? 'next' : 'prev' 
//       }));
      
//       // Update local state
//       if (direction === 'down') {
//         currentHeroSlide.current = Math.min(currentHeroSlide.current + 1, totalHeroSlides.current - 1);
//       } else {
//         currentHeroSlide.current = Math.max(currentHeroSlide.current - 1, 0);
//       }
      
//       // Notify Hero component about slide change
//       window.dispatchEvent(new CustomEvent('heroSlideChange', { 
//         detail: currentHeroSlide.current 
//       }));
      
//       return true;
//     };

//     const scrollToSection = (direction) => {
//       const now = Date.now();
//       if (now - lastScrollTime.current < 100) return;
//       if (isScrolling.current) return;
//       if (heroSlideChangeLock.current) return;
      
//       lastScrollTime.current = now;
      
//       const sections = getVisibleSections();
//       const footer = getFooterSection();
//       if (sections.length === 0) return;

//       const currentIndex = getCurrentSectionIndex();
//       const currentSection = sections[currentIndex];
      
//       // Handle hero slides
//       if (currentSection && isHeroSection(currentSection)) {
//         if (direction === 'down' && currentHeroSlide.current < totalHeroSlides.current - 1) {
//           navigateHeroSlide('down');
//           return;
//         }
//         if (direction === 'up' && currentHeroSlide.current > 0) {
//           navigateHeroSlide('up');
//           return;
//         }
//       }
      
//       // For large sections, allow internal scroll
//       if (currentSection && isSectionLarge(currentSection) && !isHeroSection(currentSection)) {
//         const sectionTop = currentSection.offsetTop;
//         const sectionBottom = sectionTop + currentSection.scrollHeight;
//         const currentScroll = main.scrollTop;
//         const viewportHeight = main.clientHeight;
        
//         // Allow native scroll within large sections
//         return;
//       }
      
//       // Normal section navigation
//       let targetIndex = currentIndex;
//       if (direction === 'down') targetIndex = currentIndex + 1;
//       else if (direction === 'up') targetIndex = currentIndex - 1;
      
//       if (targetIndex >= 0 && targetIndex < sections.length) {
//         smoothScrollTo(Math.max(0, sections[targetIndex].offsetTop - getNavOffset()));
//       } else if (direction === 'down' && footer) {
//         smoothScrollTo(footer.offsetTop);
//       }
//     };

//     const handleKeyDown = (e) => {
//       const currentSection = getCurrentSection();
      
//       // Don't intercept if on large section (allow native scroll)
//       if (currentSection && isSectionLarge(currentSection) && !isHeroSection(currentSection)) {
//         return;
//       }
      
//       if (e.key === 'ArrowDown' || e.key === 'PageDown') {
//         e.preventDefault();
//         scrollToSection('down');
//       } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
//         e.preventDefault();
//         scrollToSection('up');
//       } else if (e.key === 'Home') {
//         e.preventDefault();
//         smoothScrollTo(0);
//       }
//     };
// // More responsive version - triggers immediately when threshold reached
// const handleWheel = (e) => {
//   const currentSection = getCurrentSection();
//   const now = Date.now();
  
//   // Don't intercept wheel for large sections (allow native scroll)
//   if (currentSection && isSectionLarge(currentSection) && !isHeroSection(currentSection)) {
//     return;
//   }
  
//   e.preventDefault();
  
//   // Check if locked
//   if (now < wheelLockUntil.current) {
//     return;
//   }
  
//   // Add to accumulator
//   wheelAccumulator.current += e.deltaY;
  
//   const delta = wheelAccumulator.current;
  
//   // Check if threshold reached
//   if (Math.abs(delta) < 50) {
//     // Set timeout to clear accumulator if no more scroll
//     if (wheelTimeout.current) {
//       clearTimeout(wheelTimeout.current);
//     }
    
//     wheelTimeout.current = setTimeout(() => {
//       wheelAccumulator.current = 0;
//     }, 200);
    
//     return;
//   }
  
//   // Threshold reached, trigger immediately
//   const direction = delta > 0 ? 'down' : 'up';
//   wheelAccumulator.current = 0;
  
//   // Clear timeout
//   if (wheelTimeout.current) {
//     clearTimeout(wheelTimeout.current);
//   }
  
//   // If on hero section
//   if (currentSection && isHeroSection(currentSection)) {
//     // At last slide, go to next section
//     if (direction === 'down' && currentHeroSlide.current === totalHeroSlides.current - 1) {
//       const sections = getVisibleSections();
//       const currentIndex = getCurrentSectionIndex();
//       const nextIndex = currentIndex + 1;
      
//       if (nextIndex < sections.length) {
//         smoothScrollTo(Math.max(0, sections[nextIndex].offsetTop - getNavOffset()), 600);
//         wheelLockUntil.current = Date.now() + 1000;
//       }
//       return;
//     }
    
//     // At first slide, go to previous section
//     if (direction === 'up' && currentHeroSlide.current === 0) {
//       const sections = getVisibleSections();
//       const currentIndex = getCurrentSectionIndex();
//       const prevIndex = currentIndex - 1;
      
//       if (prevIndex >= 0) {
//         smoothScrollTo(Math.max(0, sections[prevIndex].offsetTop - getNavOffset()), 600);
//         wheelLockUntil.current = Date.now() + 1000;
//       }
//       return;
//     }
    
//     // Navigate hero slides
//     if (direction === 'down' && currentHeroSlide.current < totalHeroSlides.current - 1) {
//       navigateHeroSlide('down');
//       wheelLockUntil.current = Date.now() + 600;
//     } else if (direction === 'up' && currentHeroSlide.current > 0) {
//       navigateHeroSlide('up');
//       wheelLockUntil.current = Date.now() + 600;
//     }
//   } else {
//     // Normal section navigation
//     scrollToSection(direction);
//     wheelLockUntil.current = Date.now() + 600;
//   }
// };
//     // Touch handling
//     let touchStartY = 0;
//     let touchStartTime = 0;
    
//     const handleTouchStart = (e) => {
//       touchStartY = e.touches[0].clientY;
//       touchStartTime = Date.now();
//     };
    
//     const handleTouchEnd = (e) => {
//       const currentSection = getCurrentSection();
      
//       // Don't intercept for large sections
//       if (currentSection && isSectionLarge(currentSection) && !isHeroSection(currentSection)) {
//         return;
//       }
      
//       const deltaY = e.changedTouches[0].clientY - touchStartY;
//       const deltaTime = Date.now() - touchStartTime;
      
//       // Only trigger for quick swipes
//       if (Math.abs(deltaY) > 30 && deltaTime < 300) {
//         scrollToSection(deltaY < 0 ? 'down' : 'up');
//       }
//     };

//     // Event listeners
//     window.addEventListener('keydown', handleKeyDown);
//     main.addEventListener('wheel', handleWheel, { passive: false });
//     main.addEventListener('touchstart', handleTouchStart, { passive: true });
//     main.addEventListener('touchend', handleTouchEnd, { passive: true });

//    return () => {
//   window.removeEventListener('keydown', handleKeyDown);
//   main.removeEventListener('wheel', handleWheel);
//   main.removeEventListener('touchstart', handleTouchStart);
//   main.removeEventListener('touchend', handleTouchEnd);
//   window.removeEventListener('heroSlideChange', handleHeroSlideChange);
//   window.removeEventListener('heroNavigation', handleHeroNavigation);
//   observer.disconnect();
//   if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
//   if (wheelTimeout.current) clearTimeout(wheelTimeout.current);
//   wheelAccumulator.current = 0; // Reset accumulator
// };
//   }, [pathname]);
// }