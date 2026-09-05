
// 'use client';

// import { useEffect, useRef } from 'react';
// import { usePathname } from 'next/navigation';

// export function useScrollNavigation() {
//   const pathname = usePathname();

//   const isNavigating = useRef(false);
//   const animationFrame = useRef(null);
//   const unlockTimeout = useRef(null);

//   const currentHeroSlide = useRef(0);
//   const totalHeroSlides = useRef(0);

//   const touchStartY = useRef(0);
//   const touchStartTime = useRef(0);
  
//   // NEW: Additional refs for better control
//   const wheelTimeout = useRef(null);
//   const lastWheelTime = useRef(0);
//   const isMobileDevice = useRef(false);

//   useEffect(() => {
//     const main = document.getElementById(
//       'main-scroll-container'
//     );

//     if (!main) return;

//     // =========================================================
//     // DEVICE DETECTION - Mobile vs Desktop
//     // =========================================================
//     const checkDevice = () => {
//       isMobileDevice.current = window.innerWidth <= 768;
//     };
    
//     checkDevice();
//     window.addEventListener('resize', checkDevice);

//     // =========================================================
//     // RESET
//     // =========================================================

//     main.scrollTop = 0;

//     isNavigating.current = false;
//     currentHeroSlide.current = 0;

//     if (animationFrame.current) {
//       cancelAnimationFrame(animationFrame.current);
//     }

//     if (unlockTimeout.current) {
//       clearTimeout(unlockTimeout.current);
//     }
    
//     if (wheelTimeout.current) {
//       clearTimeout(wheelTimeout.current);
//     }

//     // =========================================================
//     // HERO DETECTION
//     // =========================================================

//     const detectHero = () => {
//       const hero = main.querySelector(
//         '.hero-section'
//       );

//       if (!hero) {
//         totalHeroSlides.current = 0;
//         currentHeroSlide.current = 0;
//         return;
//       }

//       const dots = hero.querySelectorAll(
//         '.hero-dot'
//       );

//       totalHeroSlides.current = dots.length;

//       if (!dots.length) {
//         currentHeroSlide.current = 0;
//         return;
//       }

//       currentHeroSlide.current = Math.max(
//         0,
//         Math.min(
//           currentHeroSlide.current,
//           dots.length - 1
//         )
//       );
//     };

//     detectHero();

//     const mutationObserver =
//       new MutationObserver(() => {
//         requestAnimationFrame(detectHero);
//       });

//     mutationObserver.observe(main, {
//       childList: true,
//       subtree: true,
//     });

//     // =========================================================
//     // HERO EVENTS
//     // =========================================================

//     const handleHeroSlideChange = (event) => {
//       const index = Number(event.detail);

//       if (!Number.isNaN(index)) {
//         currentHeroSlide.current = index;
//       }
//     };

//     window.addEventListener(
//       'heroSlideChange',
//       handleHeroSlideChange
//     );

//     // =========================================================
//     // HELPERS
//     // =========================================================

//     const getNavOffset = () => {
//       const value =
//         getComputedStyle(
//           document.documentElement
//         ).getPropertyValue(
//           '--navbar-height'
//         );

//       return parseInt(value, 10) || 0;
//     };

//     const getSections = () => {
//       return Array.from(
//         main.querySelectorAll(
//           '.scroll-section:not(.footer-section)'
//         )
//       );
//     };

//     const getFooter = () => {
//       return main.querySelector(
//         '.footer-section'
//       );
//     };

//     const isHeroSection = (section) => {
//       return (
//         section &&
//         section.classList.contains(
//           'hero-section'
//         )
//       );
//     };

//     // =========================================================
//     // LARGE SECTION DETECTION
//     // =========================================================

//     const isLargeSection = (section) => {
//       if (!section) return false;

//       /*
//         First respect explicit page.js setting.
//       */

//       if (
//         section.dataset.sectionType ===
//         'large'
//       ) {
//         return true;
//       }

//       /*
//         Fallback for dynamically created sections.
//       */

//       return (
//         section.scrollHeight >
//         main.clientHeight * 1.1
//       );
//     };

//     // =========================================================
//     // CURRENT SECTION
//     // =========================================================

//     const getCurrentSectionIndex = () => {
//       const sections = getSections();

//       if (!sections.length) {
//         return -1;
//       }

//       const scrollTop = main.scrollTop;
//       const viewportHeight =
//         main.clientHeight;

//       const viewportCenter =
//         scrollTop +
//         viewportHeight / 2;

//       let closestIndex = 0;
//       let closestDistance = Infinity;

//       sections.forEach((section, index) => {
//         const center =
//           section.offsetTop +
//           section.offsetHeight / 2;

//         const distance = Math.abs(
//           viewportCenter - center
//         );

//         if (distance < closestDistance) {
//           closestDistance = distance;
//           closestIndex = index;
//         }
//       });

//       return closestIndex;
//     };

//     const getCurrentSection = () => {
//       const sections = getSections();

//       const index =
//         getCurrentSectionIndex();

//       if (index < 0) {
//         return null;
//       }

//       return sections[index] || null;
//     };

//     // =========================================================
//     // LARGE SECTION BOUNDARY
//     // =========================================================

//     const isAtSectionTop = (section) => {
//       if (!section) return true;

//       const sectionTop =
//         section.offsetTop;

//       return (
//         main.scrollTop <=
//         sectionTop + 8
//       );
//     };

//     const isAtSectionBottom = (section) => {
//       if (!section) return true;

//       const sectionTop =
//         section.offsetTop;

//       const sectionHeight =
//         section.scrollHeight;

//       const viewportHeight =
//         main.clientHeight;

//       const maxScroll =
//         sectionTop +
//         sectionHeight -
//         viewportHeight;

//       return (
//         main.scrollTop >=
//         maxScroll - 8
//       );
//     };

//     // =========================================================
//     // PREMIUM SMOOTH SCROLL (NO FADE/BLUR)
//     // =========================================================

//     const smoothScrollTo = (
//       targetPosition,
//       duration = 1000
//     ) => {
//       const startPosition =
//         main.scrollTop;

//       const distance =
//         targetPosition -
//         startPosition;

//       if (Math.abs(distance) < 1) {
//         isNavigating.current = false;
//         return;
//       }

//       if (animationFrame.current) {
//         cancelAnimationFrame(
//           animationFrame.current
//         );
//       }

//       const startTime =
//         performance.now();

//       // Custom premium easing - slow start, fast middle, smooth end
//       const premiumEase = (t) => {
//         // First 20% - very slow (preparing to move)
//         if (t < 0.2) {
//           const progress = t / 0.2;
//           return 0.15 * progress * progress * (3 - 2 * progress);
//         }
//         // 20% to 80% - fast acceleration
//         else if (t < 0.8) {
//           const progress = (t - 0.2) / 0.6;
//           return 0.15 + 0.8 * progress * progress * (3 - 2 * progress);
//         }
//         // Last 20% - smooth deceleration
//         else {
//           const progress = (t - 0.8) / 0.2;
//           return 0.95 + 0.05 * progress * progress * (3 - 2 * progress);
//         }
//       };

//       const animate = (now) => {
//         const elapsed =
//           now - startTime;

//         const progress = Math.min(
//           elapsed / duration,
//           1
//         );

//         const eased =
//           premiumEase(progress);

//         main.scrollTop =
//           startPosition +
//           distance * eased;

//         if (progress < 1) {
//           animationFrame.current =
//             requestAnimationFrame(
//               animate
//             );
//         } else {
//           // Ensure exact landing
//           main.scrollTop = targetPosition;
//           isNavigating.current = false;
//         }
//       };

//       animationFrame.current =
//         requestAnimationFrame(
//           animate
//         );
//     };

//     // =========================================================
//     // LOCK
//     // =========================================================

//     const lockNavigation = (
//       duration = 1100
//     ) => {
//       isNavigating.current = true;

//       if (unlockTimeout.current) {
//         clearTimeout(
//           unlockTimeout.current
//         );
//       }

//       unlockTimeout.current =
//         setTimeout(() => {
//           isNavigating.current = false;
//         }, duration);
//     };

//     // =========================================================
//     // HERO NAVIGATION
//     // =========================================================

//     const navigateHero = (direction) => {
//       const total =
//         totalHeroSlides.current;

//       if (!total) {
//         return false;
//       }

//       const current =
//         currentHeroSlide.current;

//       // -------------------------------------------------------
//       // NEXT HERO SLIDE
//       // -------------------------------------------------------

//       if (
//         direction === 'down' &&
//         current < total - 1
//       ) {
//         lockNavigation(1900);

//         window.dispatchEvent(
//           new CustomEvent(
//             'heroNavigation',
//             {
//               detail: 'next',
//             }
//           )
//         );

//         return true;
//       }

//       // -------------------------------------------------------
//       // PREVIOUS HERO SLIDE
//       // -------------------------------------------------------

//       if (
//         direction === 'up' &&
//         current > 0
//       ) {
//         lockNavigation(1900);

//         window.dispatchEvent(
//           new CustomEvent(
//             'heroNavigation',
//             {
//               detail: 'prev',
//             }
//           )
//         );

//         return true;
//       }

//       /*
//         false means Hero has reached
//         its boundary.
//       */

//       return false;
//     };

//     // =========================================================
//     // NORMAL SECTION NAVIGATION
//     // =========================================================

//     const navigateToSection = (
//       direction
//     ) => {
//       const sections = getSections();

//       if (!sections.length) {
//         return;
//       }

//       const currentIndex =
//         getCurrentSectionIndex();

//       if (currentIndex < 0) {
//         return;
//       }

//       let targetIndex =
//         currentIndex;

//       if (direction === 'down') {
//         targetIndex =
//           currentIndex + 1;
//       }

//       if (direction === 'up') {
//         targetIndex =
//           currentIndex - 1;
//       }

//       // -------------------------------------------------------
//       // NEXT SECTION
//       // -------------------------------------------------------

//       if (
//         direction === 'down' &&
//         targetIndex < sections.length
//       ) {
//         const target =
//           sections[targetIndex];

//         lockNavigation(1100);

//         smoothScrollTo(
//           Math.max(
//             0,
//             target.offsetTop -
//               getNavOffset()
//           ),
//           1000
//         );

//         return;
//       }

//       // -------------------------------------------------------
//       // PREVIOUS SECTION
//       // -------------------------------------------------------

//       if (
//         direction === 'up' &&
//         targetIndex >= 0
//       ) {
//         const target =
//           sections[targetIndex];

//         lockNavigation(1100);

//         smoothScrollTo(
//           Math.max(
//             0,
//             target.offsetTop -
//               getNavOffset()
//           ),
//           1000
//         );

//         return;
//       }

//       // -------------------------------------------------------
//       // FOOTER
//       // -------------------------------------------------------

//       if (
//         direction === 'down' &&
//         targetIndex >= sections.length
//       ) {
//         const footer =
//           getFooter();

//         if (footer) {
//           lockNavigation(1100);

//           smoothScrollTo(
//             footer.offsetTop,
//             1000
//           );
//         }
//       }
//     };

//     // =========================================================
//     // MASTER NAVIGATION
//     // =========================================================

//     const navigate = (direction) => {
//       // NEW: Mobile pe custom navigation disable
//       if (isMobileDevice.current) {
//         return; // Mobile pe normal scroll allowed
//       }

//       if (isNavigating.current) {
//         return;
//       }

//       const section =
//         getCurrentSection();

//       if (!section) {
//         return;
//       }

//       // =======================================================
//       // HERO
//       // =======================================================

//       if (isHeroSection(section)) {
//         /*
//           If Hero still has slides available,
//           consume the navigation.

//           IMPORTANT:
//           This prevents the next section
//           from opening before the last slide.
//         */

//         if (
//           navigateHero(direction)
//         ) {
//           return;
//         }

//         /*
//           Hero is at boundary.

//           Only now continue to
//           normal section navigation.
//         */
//       }

//       // =======================================================
//       // LARGE SECTION
//       // =======================================================

//       if (
//         isLargeSection(section)
//       ) {
//         /*
//           DOWN:

//           If content is NOT at bottom,
//           allow native scrolling.

//           If already at bottom,
//           go to next section.
//         */

//         if (
//           direction === 'down'
//         ) {
//           if (
//             !isAtSectionBottom(
//               section
//             )
//           ) {
//             return;
//           }

//           navigateToSection(
//             'down'
//           );

//           return;
//         }

//         /*
//           UP:

//           If content is NOT at top,
//           allow native scrolling.

//           If already at top,
//           go to previous section.
//         */

//         if (
//           direction === 'up'
//         ) {
//           if (
//             !isAtSectionTop(
//               section
//             )
//           ) {
//             return;
//           }

//           navigateToSection(
//             'up'
//           );

//           return;
//         }
//       }

//       // =======================================================
//       // NORMAL SECTION
//       // =======================================================

//       navigateToSection(
//         direction
//       );
//     };

//     // =========================================================
//     // KEYBOARD
//     // =========================================================

//     const handleKeyDown = (event) => {
//       // NEW: Mobile pe keyboard navigation disable
//       if (isMobileDevice.current) {
//         return;
//       }

//       const target =
//         event.target;

//       const isTyping =
//         target instanceof
//           HTMLInputElement ||
//         target instanceof
//           HTMLTextAreaElement ||
//         target instanceof
//           HTMLSelectElement ||
//         target?.isContentEditable;

//       if (isTyping) {
//         return;
//       }

//       const isNavigationKey =
//         event.key ===
//           'ArrowDown' ||
//         event.key ===
//           'ArrowUp' ||
//         event.key ===
//           'PageDown' ||
//         event.key ===
//           'PageUp' ||
//         event.key === ' ';

//       if (!isNavigationKey) {
//         return;
//       }

//       const section =
//         getCurrentSection();

//       if (!section) {
//         return;
//       }

//       // =======================================================
//       // LARGE SECTION KEYBOARD
//       // =======================================================

//       if (
//         isLargeSection(section) &&
//         !isHeroSection(section)
//       ) {
//         /*
//           Let browser/native scroll work
//           inside large sections.

//           Only intercept keyboard when
//           the section reaches its boundary.
//         */

//         if (
//           event.key ===
//             'ArrowDown' ||
//           event.key ===
//             'PageDown' ||
//           event.key === ' '
//         ) {
//           if (
//             !isAtSectionBottom(
//               section
//             )
//           ) {
//             return;
//           }

//           event.preventDefault();

//           if (
//             !isNavigating.current
//           ) {
//             navigate('down');
//           }

//           return;
//         }

//         if (
//           event.key ===
//             'ArrowUp' ||
//           event.key ===
//             'PageUp'
//         ) {
//           if (
//             !isAtSectionTop(
//               section
//             )
//           ) {
//             return;
//           }

//           event.preventDefault();

//           if (
//             !isNavigating.current
//           ) {
//             navigate('up');
//           }

//           return;
//         }
//       }

//       // =======================================================
//       // HERO / NORMAL SECTION
//       // =======================================================

//       event.preventDefault();

//       if (isNavigating.current) {
//         return;
//       }

//       if (
//         event.key ===
//           'ArrowDown' ||
//         event.key ===
//           'PageDown' ||
//         event.key === ' '
//       ) {
//         navigate('down');
//       }

//       if (
//         event.key ===
//           'ArrowUp' ||
//         event.key ===
//           'PageUp'
//       ) {
//         navigate('up');
//       }
//     };

//     // =========================================================
//     // WHEEL - IMPROVED WITH DEBOUNCING
//     // =========================================================

//     let wheelDelta = 0;
//     let wheelResetTimer = null;

//     const handleWheel = (event) => {
//       // NEW: Mobile pe wheel navigation disable
//       if (isMobileDevice.current) {
//         return; // Mobile pe normal scroll allowed
//       }

//       const section =
//         getCurrentSection();

//       if (!section) {
//         return;
//       }

//       // =======================================================
//       // LARGE SECTION
//       // =======================================================

//       if (
//         isLargeSection(section) &&
//         !isHeroSection(section)
//       ) {
//         /*
//           VERY IMPORTANT:

//           While inside a large section,
//           native wheel scrolling is allowed.

//           So DON'T call preventDefault()
//           here unless we're at a boundary.
//         */

//         const goingDown =
//           event.deltaY > 0;

//         const goingUp =
//           event.deltaY < 0;

//         // -----------------------------------------------------
//         // DOWN + NOT AT BOTTOM
//         // -----------------------------------------------------

//         if (
//           goingDown &&
//           !isAtSectionBottom(
//             section
//           )
//         ) {
//           return;
//         }

//         // -----------------------------------------------------
//         // UP + NOT AT TOP
//         // -----------------------------------------------------

//         if (
//           goingUp &&
//           !isAtSectionTop(
//             section
//           )
//         ) {
//           return;
//         }

//         /*
//           We are at a boundary.
//           From here our custom navigation
//           takes control.
//         */

//         event.preventDefault();
//       } else {
//         /*
//           Hero + normal sections:

//           Always use custom navigation.
//         */

//         event.preventDefault();
//       }

//       // =======================================================
//       // LOCK
//       // =======================================================

//       if (isNavigating.current) {
//         return;
//       }

//       // NEW: Debounce wheel events - only process one scroll at a time
//       const now = Date.now();
//       if (now - lastWheelTime.current < 150) {
//         return; // Ignore rapid wheel events
//       }
//       lastWheelTime.current = now;

//       wheelDelta += event.deltaY;

//       /*
//         Small trackpad movement:
//         wait for enough movement.
//       */

//       if (Math.abs(wheelDelta) < 40) {
//         if (wheelResetTimer) {
//           clearTimeout(
//             wheelResetTimer
//           );
//         }

//         wheelResetTimer =
//           setTimeout(() => {
//             wheelDelta = 0;
//           }, 100);

//         return;
//       }

//       const direction =
//         wheelDelta > 0
//           ? 'down'
//           : 'up';

//       /*
//         Consume the complete
//         wheel gesture.
//       */

//       wheelDelta = 0;

//       if (wheelResetTimer) {
//         clearTimeout(
//           wheelResetTimer
//         );
//       }

//       navigate(direction);
//     };

//     // =========================================================
//     // TOUCH - IMPROVED FOR MOBILE (Normal Scroll)
//     // =========================================================

//     const handleTouchStart = (
//       event
//     ) => {
//       if (!event.touches?.length) {
//         return;
//       }

//       touchStartY.current =
//         event.touches[0].clientY;

//       touchStartTime.current =
//         performance.now();
//     };

//     const handleTouchEnd = (
//       event
//     ) => {
//       // NEW: Mobile pe touch navigation disable (normal scroll)
//       if (isMobileDevice.current) {
//         return; // Mobile pe normal scroll allowed
//       }

//       if (
//         !event.changedTouches
//           ?.length
//       ) {
//         return;
//       }

//       if (isNavigating.current) {
//         return;
//       }

//       const section =
//         getCurrentSection();

//       if (!section) {
//         return;
//       }

//       const endY =
//         event.changedTouches[0]
//           .clientY;

//       const deltaY =
//         endY -
//         touchStartY.current;

//       const deltaTime =
//         performance.now() -
//         touchStartTime.current;

//       // NEW: Stricter swipe detection for mobile
//       if (
//         Math.abs(deltaY) < 50 ||
//         deltaTime > 500
//       ) {
//         return;
//       }

//       const direction =
//         deltaY < 0
//           ? 'down'
//           : 'up';

//       // =======================================================
//       // LARGE SECTION
//       // =======================================================

//       if (
//         isLargeSection(section) &&
//         !isHeroSection(section)
//       ) {
//         /*
//           Inside large section:

//           Swipe down while not at bottom
//           should behave like native scroll.

//           Swipe up while not at top
//           should behave like native scroll.

//           Boundary swipe navigates section.
//         */

//         if (
//           direction === 'down' &&
//           !isAtSectionBottom(
//             section
//           )
//         ) {
//           return;
//         }

//         if (
//           direction === 'up' &&
//           !isAtSectionTop(
//             section
//           )
//         ) {
//           return;
//         }
//       }

//       navigate(direction);
//     };

//     // =========================================================
//     // HOME / END
//     // =========================================================

//     const handleHomeEnd = (
//       event
//     ) => {
//       // NEW: Mobile pe Home/End navigation disable
//       if (isMobileDevice.current) {
//         return;
//       }

//       const target =
//         event.target;

//       const isTyping =
//         target instanceof
//           HTMLInputElement ||
//         target instanceof
//           HTMLTextAreaElement ||
//         target instanceof
//           HTMLSelectElement ||
//         target?.isContentEditable;

//       if (isTyping) {
//         return;
//       }

//       if (event.key === 'Home') {
//         event.preventDefault();

//         if (
//           isNavigating.current
//         ) {
//           return;
//         }

//         lockNavigation(1100);

//         smoothScrollTo(
//           0,
//           1000
//         );
//       }

//       if (event.key === 'End') {
//         event.preventDefault();

//         if (
//           isNavigating.current
//         ) {
//           return;
//         }

//         const footer =
//           getFooter();

//         if (footer) {
//           lockNavigation(1100);

//           smoothScrollTo(
//             footer.offsetTop,
//             1000
//           );
//         }
//       }
//     };

//     // =========================================================
//     // LISTENERS
//     // =========================================================

//     window.addEventListener(
//       'keydown',
//       handleKeyDown,
//       { passive: false }
//     );

//     window.addEventListener(
//       'keydown',
//       handleHomeEnd,
//       { passive: false }
//     );

//     main.addEventListener(
//       'wheel',
//       handleWheel,
//       { passive: false }
//     );

//     main.addEventListener(
//       'touchstart',
//       handleTouchStart,
//       { passive: true }
//     );

//     main.addEventListener(
//       'touchend',
//       handleTouchEnd,
//       { passive: true }
//     );

//     // =========================================================
//     // CLEANUP
//     // =========================================================

//     return () => {
//       window.removeEventListener('resize', checkDevice);
      
//       window.removeEventListener(
//         'keydown',
//         handleKeyDown
//       );

//       window.removeEventListener(
//         'keydown',
//         handleHomeEnd
//       );

//       main.removeEventListener(
//         'wheel',
//         handleWheel
//       );

//       main.removeEventListener(
//         'touchstart',
//         handleTouchStart
//       );

//       main.removeEventListener(
//         'touchend',
//         handleTouchEnd
//       );

//       window.removeEventListener(
//         'heroSlideChange',
//         handleHeroSlideChange
//       );

//       mutationObserver.disconnect();

//       if (animationFrame.current) {
//         cancelAnimationFrame(
//           animationFrame.current
//         );
//       }

//       if (unlockTimeout.current) {
//         clearTimeout(
//           unlockTimeout.current
//         );
//       }

//       if (wheelResetTimer) {
//         clearTimeout(
//           wheelResetTimer
//         );
//       }
      
//       if (wheelTimeout.current) {
//         clearTimeout(
//           wheelTimeout.current
//         );
//       }
//     };
//   }, [pathname]);
// }

// ***********************************************


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
  
  // NEW: Additional refs for better control
  const wheelTimeout = useRef(null);
  const lastWheelTime = useRef(0);
  const isTouchDevice = useRef(false);

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
    
    // NEW: Detect touch device
    isTouchDevice.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }

    if (unlockTimeout.current) {
      clearTimeout(unlockTimeout.current);
    }
    
    if (wheelTimeout.current) {
      clearTimeout(wheelTimeout.current);
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
    // PREMIUM SMOOTH SCROLL (NO FADE/BLUR)
    // =========================================================

    const smoothScrollTo = (
      targetPosition,
      duration = 1000
    ) => {
      const startPosition =
        main.scrollTop;

      const distance =
        targetPosition -
        startPosition;

      if (Math.abs(distance) < 1) {
        isNavigating.current = false;
        return;
      }

      if (animationFrame.current) {
        cancelAnimationFrame(
          animationFrame.current
        );
      }

      const startTime =
        performance.now();

      // Custom premium easing - slow start, fast middle, smooth end
      const premiumEase = (t) => {
        // First 20% - very slow (preparing to move)
        if (t < 0.2) {
          const progress = t / 0.2;
          return 0.15 * progress * progress * (3 - 2 * progress);
        }
        // 20% to 80% - fast acceleration
        else if (t < 0.8) {
          const progress = (t - 0.2) / 0.6;
          return 0.15 + 0.8 * progress * progress * (3 - 2 * progress);
        }
        // Last 20% - smooth deceleration
        else {
          const progress = (t - 0.8) / 0.2;
          return 0.95 + 0.05 * progress * progress * (3 - 2 * progress);
        }
      };

      const animate = (now) => {
        const elapsed =
          now - startTime;

        const progress = Math.min(
          elapsed / duration,
          1
        );

        const eased =
          premiumEase(progress);

        main.scrollTop =
          startPosition +
          distance * eased;

        if (progress < 1) {
          animationFrame.current =
            requestAnimationFrame(
              animate
            );
        } else {
          // Ensure exact landing
          main.scrollTop = targetPosition;
          isNavigating.current = false;
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
      duration = 1100
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

        lockNavigation(1100);

        smoothScrollTo(
          Math.max(
            0,
            target.offsetTop -
              getNavOffset()
          ),
          1000
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

        lockNavigation(1100);

        smoothScrollTo(
          Math.max(
            0,
            target.offsetTop -
              getNavOffset()
          ),
          1000
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
          lockNavigation(1100);

          smoothScrollTo(
            footer.offsetTop,
            1000
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
    // WHEEL - IMPROVED WITH DEBOUNCING
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

      // NEW: Debounce wheel events - only process one scroll at a time
      const now = Date.now();
      if (now - lastWheelTime.current < 150) {
        return; // Ignore rapid wheel events
      }
      lastWheelTime.current = now;

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
    // TOUCH - IMPROVED FOR MOBILE
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

      // NEW: Stricter swipe detection for mobile
      if (
        Math.abs(deltaY) < 50 ||
        deltaTime > 500
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

        lockNavigation(1100);

        smoothScrollTo(
          0,
          1000
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
          lockNavigation(1100);

          smoothScrollTo(
            footer.offsetTop,
            1000
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
      
      if (wheelTimeout.current) {
        clearTimeout(
          wheelTimeout.current
        );
      }
    };
  }, [pathname]);
}



// ***************************************************************





// 'use client';

// import { useEffect, useRef } from 'react';
// import { usePathname } from 'next/navigation';

// export function useScrollNavigation() {
//   const pathname = usePathname();

//   const isNavigating = useRef(false);
//   const animationFrame = useRef(null);
//   const unlockTimeout = useRef(null);

//   const currentHeroSlide = useRef(0);
//   const totalHeroSlides = useRef(0);

//   const touchStartY = useRef(0);
//   const touchStartTime = useRef(0);

//   useEffect(() => {
//     const main = document.getElementById(
//       'main-scroll-container'
//     );

//     if (!main) return;

//     // =========================================================
//     // RESET
//     // =========================================================

//     main.scrollTop = 0;

//     isNavigating.current = false;
//     currentHeroSlide.current = 0;

//     if (animationFrame.current) {
//       cancelAnimationFrame(animationFrame.current);
//     }

//     if (unlockTimeout.current) {
//       clearTimeout(unlockTimeout.current);
//     }

//     // =========================================================
//     // HERO DETECTION
//     // =========================================================

//     const detectHero = () => {
//       const hero = main.querySelector(
//         '.hero-section'
//       );

//       if (!hero) {
//         totalHeroSlides.current = 0;
//         currentHeroSlide.current = 0;
//         return;
//       }

//       const dots = hero.querySelectorAll(
//         '.hero-dot'
//       );

//       totalHeroSlides.current = dots.length;

//       if (!dots.length) {
//         currentHeroSlide.current = 0;
//         return;
//       }

//       currentHeroSlide.current = Math.max(
//         0,
//         Math.min(
//           currentHeroSlide.current,
//           dots.length - 1
//         )
//       );
//     };

//     detectHero();

//     const mutationObserver =
//       new MutationObserver(() => {
//         requestAnimationFrame(detectHero);
//       });

//     mutationObserver.observe(main, {
//       childList: true,
//       subtree: true,
//     });

//     // =========================================================
//     // HERO EVENTS
//     // =========================================================

//     const handleHeroSlideChange = (event) => {
//       const index = Number(event.detail);

//       if (!Number.isNaN(index)) {
//         currentHeroSlide.current = index;
//       }
//     };

//     window.addEventListener(
//       'heroSlideChange',
//       handleHeroSlideChange
//     );

//     // =========================================================
//     // HELPERS
//     // =========================================================

//     const getNavOffset = () => {
//       const value =
//         getComputedStyle(
//           document.documentElement
//         ).getPropertyValue(
//           '--navbar-height'
//         );

//       return parseInt(value, 10) || 0;
//     };

//     const getSections = () => {
//       return Array.from(
//         main.querySelectorAll(
//           '.scroll-section:not(.footer-section)'
//         )
//       );
//     };

//     const getFooter = () => {
//       return main.querySelector(
//         '.footer-section'
//       );
//     };

//     const isHeroSection = (section) => {
//       return (
//         section &&
//         section.classList.contains(
//           'hero-section'
//         )
//       );
//     };

//     // =========================================================
//     // LARGE SECTION DETECTION
//     // =========================================================

//     const isLargeSection = (section) => {
//       if (!section) return false;

//       /*
//         First respect explicit page.js setting.
//       */

//       if (
//         section.dataset.sectionType ===
//         'large'
//       ) {
//         return true;
//       }

//       /*
//         Fallback for dynamically created sections.
//       */

//       return (
//         section.scrollHeight >
//         main.clientHeight * 1.1
//       );
//     };

//     // =========================================================
//     // CURRENT SECTION
//     // =========================================================

//     const getCurrentSectionIndex = () => {
//       const sections = getSections();

//       if (!sections.length) {
//         return -1;
//       }

//       const scrollTop = main.scrollTop;
//       const viewportHeight =
//         main.clientHeight;

//       const viewportCenter =
//         scrollTop +
//         viewportHeight / 2;

//       let closestIndex = 0;
//       let closestDistance = Infinity;

//       sections.forEach((section, index) => {
//         const center =
//           section.offsetTop +
//           section.offsetHeight / 2;

//         const distance = Math.abs(
//           viewportCenter - center
//         );

//         if (distance < closestDistance) {
//           closestDistance = distance;
//           closestIndex = index;
//         }
//       });

//       return closestIndex;
//     };

//     const getCurrentSection = () => {
//       const sections = getSections();

//       const index =
//         getCurrentSectionIndex();

//       if (index < 0) {
//         return null;
//       }

//       return sections[index] || null;
//     };

//     // =========================================================
//     // LARGE SECTION BOUNDARY
//     // =========================================================

//     const isAtSectionTop = (section) => {
//       if (!section) return true;

//       const sectionTop =
//         section.offsetTop;

//       return (
//         main.scrollTop <=
//         sectionTop + 8
//       );
//     };

//     const isAtSectionBottom = (section) => {
//       if (!section) return true;

//       const sectionTop =
//         section.offsetTop;

//       const sectionHeight =
//         section.scrollHeight;

//       const viewportHeight =
//         main.clientHeight;

//       const maxScroll =
//         sectionTop +
//         sectionHeight -
//         viewportHeight;

//       return (
//         main.scrollTop >=
//         maxScroll - 8
//       );
//     };

//     // =========================================================
//     // PREMIUM SMOOTH SCROLL (NO FADE/BLUR)
//     // =========================================================

//     const smoothScrollTo = (
//       targetPosition,
//       duration = 1000
//     ) => {
//       const startPosition =
//         main.scrollTop;

//       const distance =
//         targetPosition -
//         startPosition;

//       if (Math.abs(distance) < 1) {
//         return;
//       }

//       if (animationFrame.current) {
//         cancelAnimationFrame(
//           animationFrame.current
//         );
//       }

//       const startTime =
//         performance.now();

//       // Custom premium easing - slow start, fast middle, smooth end
//       const premiumEase = (t) => {
//         // First 20% - very slow (preparing to move)
//         if (t < 0.2) {
//           const progress = t / 0.2;
//           return 0.15 * progress * progress * (3 - 2 * progress);
//         }
//         // 20% to 80% - fast acceleration
//         else if (t < 0.8) {
//           const progress = (t - 0.2) / 0.6;
//           return 0.15 + 0.8 * progress * progress * (3 - 2 * progress);
//         }
//         // Last 20% - smooth deceleration
//         else {
//           const progress = (t - 0.8) / 0.2;
//           return 0.95 + 0.05 * progress * progress * (3 - 2 * progress);
//         }
//       };

//       const animate = (now) => {
//         const elapsed =
//           now - startTime;

//         const progress = Math.min(
//           elapsed / duration,
//           1
//         );

//         const eased =
//           premiumEase(progress);

//         main.scrollTop =
//           startPosition +
//           distance * eased;

//         if (progress < 1) {
//           animationFrame.current =
//             requestAnimationFrame(
//               animate
//             );
//         }
//       };

//       animationFrame.current =
//         requestAnimationFrame(
//           animate
//         );
//     };

//     // =========================================================
//     // LOCK
//     // =========================================================

//     const lockNavigation = (
//       duration = 1100
//     ) => {
//       isNavigating.current = true;

//       if (unlockTimeout.current) {
//         clearTimeout(
//           unlockTimeout.current
//         );
//       }

//       unlockTimeout.current =
//         setTimeout(() => {
//           isNavigating.current = false;
//         }, duration);
//     };

//     // =========================================================
//     // HERO NAVIGATION
//     // =========================================================

//     const navigateHero = (direction) => {
//       const total =
//         totalHeroSlides.current;

//       if (!total) {
//         return false;
//       }

//       const current =
//         currentHeroSlide.current;

//       // -------------------------------------------------------
//       // NEXT HERO SLIDE
//       // -------------------------------------------------------

//       if (
//         direction === 'down' &&
//         current < total - 1
//       ) {
//         lockNavigation(1900);

//         window.dispatchEvent(
//           new CustomEvent(
//             'heroNavigation',
//             {
//               detail: 'next',
//             }
//           )
//         );

//         return true;
//       }

//       // -------------------------------------------------------
//       // PREVIOUS HERO SLIDE
//       // -------------------------------------------------------

//       if (
//         direction === 'up' &&
//         current > 0
//       ) {
//         lockNavigation(1900);

//         window.dispatchEvent(
//           new CustomEvent(
//             'heroNavigation',
//             {
//               detail: 'prev',
//             }
//           )
//         );

//         return true;
//       }

//       /*
//         false means Hero has reached
//         its boundary.
//       */

//       return false;
//     };

//     // =========================================================
//     // NORMAL SECTION NAVIGATION
//     // =========================================================

//     const navigateToSection = (
//       direction
//     ) => {
//       const sections = getSections();

//       if (!sections.length) {
//         return;
//       }

//       const currentIndex =
//         getCurrentSectionIndex();

//       if (currentIndex < 0) {
//         return;
//       }

//       let targetIndex =
//         currentIndex;

//       if (direction === 'down') {
//         targetIndex =
//           currentIndex + 1;
//       }

//       if (direction === 'up') {
//         targetIndex =
//           currentIndex - 1;
//       }

//       // -------------------------------------------------------
//       // NEXT SECTION
//       // -------------------------------------------------------

//       if (
//         direction === 'down' &&
//         targetIndex < sections.length
//       ) {
//         const target =
//           sections[targetIndex];

//         lockNavigation(1100);

//         smoothScrollTo(
//           Math.max(
//             0,
//             target.offsetTop -
//               getNavOffset()
//           ),
//           1000
//         );

//         return;
//       }

//       // -------------------------------------------------------
//       // PREVIOUS SECTION
//       // -------------------------------------------------------

//       if (
//         direction === 'up' &&
//         targetIndex >= 0
//       ) {
//         const target =
//           sections[targetIndex];

//         lockNavigation(1100);

//         smoothScrollTo(
//           Math.max(
//             0,
//             target.offsetTop -
//               getNavOffset()
//           ),
//           1000
//         );

//         return;
//       }

//       // -------------------------------------------------------
//       // FOOTER
//       // -------------------------------------------------------

//       if (
//         direction === 'down' &&
//         targetIndex >= sections.length
//       ) {
//         const footer =
//           getFooter();

//         if (footer) {
//           lockNavigation(1100);

//           smoothScrollTo(
//             footer.offsetTop,
//             1000
//           );
//         }
//       }
//     };

//     // =========================================================
//     // MASTER NAVIGATION
//     // =========================================================

//     const navigate = (direction) => {
//       if (isNavigating.current) {
//         return;
//       }

//       const section =
//         getCurrentSection();

//       if (!section) {
//         return;
//       }

//       // =======================================================
//       // HERO
//       // =======================================================

//       if (isHeroSection(section)) {
//         /*
//           If Hero still has slides available,
//           consume the navigation.

//           IMPORTANT:
//           This prevents the next section
//           from opening before the last slide.
//         */

//         if (
//           navigateHero(direction)
//         ) {
//           return;
//         }

//         /*
//           Hero is at boundary.

//           Only now continue to
//           normal section navigation.
//         */
//       }

//       // =======================================================
//       // LARGE SECTION
//       // =======================================================

//       if (
//         isLargeSection(section)
//       ) {
//         /*
//           DOWN:

//           If content is NOT at bottom,
//           allow native scrolling.

//           If already at bottom,
//           go to next section.
//         */

//         if (
//           direction === 'down'
//         ) {
//           if (
//             !isAtSectionBottom(
//               section
//             )
//           ) {
//             return;
//           }

//           navigateToSection(
//             'down'
//           );

//           return;
//         }

//         /*
//           UP:

//           If content is NOT at top,
//           allow native scrolling.

//           If already at top,
//           go to previous section.
//         */

//         if (
//           direction === 'up'
//         ) {
//           if (
//             !isAtSectionTop(
//               section
//             )
//           ) {
//             return;
//           }

//           navigateToSection(
//             'up'
//           );

//           return;
//         }
//       }

//       // =======================================================
//       // NORMAL SECTION
//       // =======================================================

//       navigateToSection(
//         direction
//       );
//     };

//     // =========================================================
//     // KEYBOARD
//     // =========================================================

//     const handleKeyDown = (event) => {
//       const target =
//         event.target;

//       const isTyping =
//         target instanceof
//           HTMLInputElement ||
//         target instanceof
//           HTMLTextAreaElement ||
//         target instanceof
//           HTMLSelectElement ||
//         target?.isContentEditable;

//       if (isTyping) {
//         return;
//       }

//       const isNavigationKey =
//         event.key ===
//           'ArrowDown' ||
//         event.key ===
//           'ArrowUp' ||
//         event.key ===
//           'PageDown' ||
//         event.key ===
//           'PageUp' ||
//         event.key === ' ';

//       if (!isNavigationKey) {
//         return;
//       }

//       const section =
//         getCurrentSection();

//       if (!section) {
//         return;
//       }

//       // =======================================================
//       // LARGE SECTION KEYBOARD
//       // =======================================================

//       if (
//         isLargeSection(section) &&
//         !isHeroSection(section)
//       ) {
//         /*
//           Let browser/native scroll work
//           inside large sections.

//           Only intercept keyboard when
//           the section reaches its boundary.
//         */

//         if (
//           event.key ===
//             'ArrowDown' ||
//           event.key ===
//             'PageDown' ||
//           event.key === ' '
//         ) {
//           if (
//             !isAtSectionBottom(
//               section
//             )
//           ) {
//             return;
//           }

//           event.preventDefault();

//           if (
//             !isNavigating.current
//           ) {
//             navigate('down');
//           }

//           return;
//         }

//         if (
//           event.key ===
//             'ArrowUp' ||
//           event.key ===
//             'PageUp'
//         ) {
//           if (
//             !isAtSectionTop(
//               section
//             )
//           ) {
//             return;
//           }

//           event.preventDefault();

//           if (
//             !isNavigating.current
//           ) {
//             navigate('up');
//           }

//           return;
//         }
//       }

//       // =======================================================
//       // HERO / NORMAL SECTION
//       // =======================================================

//       event.preventDefault();

//       if (isNavigating.current) {
//         return;
//       }

//       if (
//         event.key ===
//           'ArrowDown' ||
//         event.key ===
//           'PageDown' ||
//         event.key === ' '
//       ) {
//         navigate('down');
//       }

//       if (
//         event.key ===
//           'ArrowUp' ||
//         event.key ===
//           'PageUp'
//       ) {
//         navigate('up');
//       }
//     };

//     // =========================================================
//     // WHEEL
//     // =========================================================

//     let wheelDelta = 0;
//     let wheelResetTimer = null;

//     const handleWheel = (event) => {
//       const section =
//         getCurrentSection();

//       if (!section) {
//         return;
//       }

//       // =======================================================
//       // LARGE SECTION
//       // =======================================================

//       if (
//         isLargeSection(section) &&
//         !isHeroSection(section)
//       ) {
//         /*
//           VERY IMPORTANT:

//           While inside a large section,
//           native wheel scrolling is allowed.

//           So DON'T call preventDefault()
//           here unless we're at a boundary.
//         */

//         const goingDown =
//           event.deltaY > 0;

//         const goingUp =
//           event.deltaY < 0;

//         // -----------------------------------------------------
//         // DOWN + NOT AT BOTTOM
//         // -----------------------------------------------------

//         if (
//           goingDown &&
//           !isAtSectionBottom(
//             section
//           )
//         ) {
//           return;
//         }

//         // -----------------------------------------------------
//         // UP + NOT AT TOP
//         // -----------------------------------------------------

//         if (
//           goingUp &&
//           !isAtSectionTop(
//             section
//           )
//         ) {
//           return;
//         }

//         /*
//           We are at a boundary.
//           From here our custom navigation
//           takes control.
//         */

//         event.preventDefault();
//       } else {
//         /*
//           Hero + normal sections:

//           Always use custom navigation.
//         */

//         event.preventDefault();
//       }

//       // =======================================================
//       // LOCK
//       // =======================================================

//       if (isNavigating.current) {
//         return;
//       }

//       wheelDelta += event.deltaY;

//       /*
//         Small trackpad movement:
//         wait for enough movement.
//       */

//       if (Math.abs(wheelDelta) < 40) {
//         if (wheelResetTimer) {
//           clearTimeout(
//             wheelResetTimer
//           );
//         }

//         wheelResetTimer =
//           setTimeout(() => {
//             wheelDelta = 0;
//           }, 100);

//         return;
//       }

//       const direction =
//         wheelDelta > 0
//           ? 'down'
//           : 'up';

//       /*
//         Consume the complete
//         wheel gesture.
//       */

//       wheelDelta = 0;

//       if (wheelResetTimer) {
//         clearTimeout(
//           wheelResetTimer
//         );
//       }

//       navigate(direction);
//     };

//     // =========================================================
//     // TOUCH
//     // =========================================================

//     const handleTouchStart = (
//       event
//     ) => {
//       if (!event.touches?.length) {
//         return;
//       }

//       touchStartY.current =
//         event.touches[0].clientY;

//       touchStartTime.current =
//         performance.now();
//     };

//     const handleTouchEnd = (
//       event
//     ) => {
//       if (
//         !event.changedTouches
//           ?.length
//       ) {
//         return;
//       }

//       if (isNavigating.current) {
//         return;
//       }

//       const section =
//         getCurrentSection();

//       if (!section) {
//         return;
//       }

//       const endY =
//         event.changedTouches[0]
//           .clientY;

//       const deltaY =
//         endY -
//         touchStartY.current;

//       const deltaTime =
//         performance.now() -
//         touchStartTime.current;

//       if (
//         Math.abs(deltaY) < 45 ||
//         deltaTime > 600
//       ) {
//         return;
//       }

//       const direction =
//         deltaY < 0
//           ? 'down'
//           : 'up';

//       // =======================================================
//       // LARGE SECTION
//       // =======================================================

//       if (
//         isLargeSection(section) &&
//         !isHeroSection(section)
//       ) {
//         /*
//           Inside large section:

//           Swipe down while not at bottom
//           should behave like native scroll.

//           Swipe up while not at top
//           should behave like native scroll.

//           Boundary swipe navigates section.
//         */

//         if (
//           direction === 'down' &&
//           !isAtSectionBottom(
//             section
//           )
//         ) {
//           return;
//         }

//         if (
//           direction === 'up' &&
//           !isAtSectionTop(
//             section
//           )
//         ) {
//           return;
//         }
//       }

//       navigate(direction);
//     };

//     // =========================================================
//     // HOME / END
//     // =========================================================

//     const handleHomeEnd = (
//       event
//     ) => {
//       const target =
//         event.target;

//       const isTyping =
//         target instanceof
//           HTMLInputElement ||
//         target instanceof
//           HTMLTextAreaElement ||
//         target instanceof
//           HTMLSelectElement ||
//         target?.isContentEditable;

//       if (isTyping) {
//         return;
//       }

//       if (event.key === 'Home') {
//         event.preventDefault();

//         if (
//           isNavigating.current
//         ) {
//           return;
//         }

//         lockNavigation(1100);

//         smoothScrollTo(
//           0,
//           1000
//         );
//       }

//       if (event.key === 'End') {
//         event.preventDefault();

//         if (
//           isNavigating.current
//         ) {
//           return;
//         }

//         const footer =
//           getFooter();

//         if (footer) {
//           lockNavigation(1100);

//           smoothScrollTo(
//             footer.offsetTop,
//             1000
//           );
//         }
//       }
//     };

//     // =========================================================
//     // LISTENERS
//     // =========================================================

//     window.addEventListener(
//       'keydown',
//       handleKeyDown,
//       { passive: false }
//     );

//     window.addEventListener(
//       'keydown',
//       handleHomeEnd,
//       { passive: false }
//     );

//     main.addEventListener(
//       'wheel',
//       handleWheel,
//       { passive: false }
//     );

//     main.addEventListener(
//       'touchstart',
//       handleTouchStart,
//       { passive: true }
//     );

//     main.addEventListener(
//       'touchend',
//       handleTouchEnd,
//       { passive: true }
//     );

//     // =========================================================
//     // CLEANUP
//     // =========================================================

//     return () => {
//       window.removeEventListener(
//         'keydown',
//         handleKeyDown
//       );

//       window.removeEventListener(
//         'keydown',
//         handleHomeEnd
//       );

//       main.removeEventListener(
//         'wheel',
//         handleWheel
//       );

//       main.removeEventListener(
//         'touchstart',
//         handleTouchStart
//       );

//       main.removeEventListener(
//         'touchend',
//         handleTouchEnd
//       );

//       window.removeEventListener(
//         'heroSlideChange',
//         handleHeroSlideChange
//       );

//       mutationObserver.disconnect();

//       if (animationFrame.current) {
//         cancelAnimationFrame(
//           animationFrame.current
//         );
//       }

//       if (unlockTimeout.current) {
//         clearTimeout(
//           unlockTimeout.current
//         );
//       }

//       if (wheelResetTimer) {
//         clearTimeout(
//           wheelResetTimer
//         );
//       }
//     };
//   }, [pathname]);
// }