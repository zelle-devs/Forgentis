// 'use client';

// import { motion } from 'framer-motion';
// import { useRef, useEffect, useState } from 'react';

// const COLS = 5;
// const ROWS = 3;
// const SHARD_COUNT = COLS * ROWS;

// // deterministic pseudo-random — SSR/CSR hydration mismatch se bachne ke liye
// // (Math.random() seedless use karoge to server aur client alag values denge)
// const seededRandom = (seed) => {
//   const x = Math.sin(seed * 9973) * 10000;
//   return x - Math.floor(x);
// };

// const buildShards = () => {
//   const shards = [];
//   let i = 0;
//   for (let r = 0; r < ROWS; r++) {
//     for (let c = 0; c < COLS; c++) {
//       const rand1 = seededRandom(i * 3 + 1);
//       const rand2 = seededRandom(i * 3 + 2);
//       const rand3 = seededRandom(i * 3 + 3);

//       shards.push({
//         id: i,
//         left: (c / COLS) * 100,
//         top: (r / ROWS) * 100,
//         width: 100 / COLS,
//         height: 100 / ROWS,
//         x: (rand1 - 0.5) * 500,       // bikharne par x offset (-250 to 250px)
//         y: (rand2 - 0.5) * 400,       // bikharne par y offset (-200 to 200px)
//         rotate: (rand3 - 0.5) * 140,  // bikharne par rotation (-70 to 70deg)
//         delay: seededRandom(i * 7 + 5) * 0.25,
//       });
//       i++;
//     }
//   }
//   return shards;
// };

// const SHARDS = buildShards();
// const PREMIUM_EASE = [0.16, 1, 0.3, 1];

// const SectionWrapper = ({ children, className = '', id = '', index = 0, sectionType = 'normal' }) => {
//   const sectionRef = useRef(null);
//   const [isActive, setIsActive] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => setIsActive(entry.isIntersecting),
//       { threshold: 0.35, rootMargin: '-10% 0px -10% 0px' }
//     );
//     if (sectionRef.current) observer.observe(sectionRef.current);
//     return () => {
//       if (sectionRef.current) observer.unobserve(sectionRef.current);
//     };
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className={`scroll-section ${className}`}
//       id={id}
//       data-section-type={sectionType}
//       style={{ position: 'relative', zIndex: index, overflow: 'hidden' }}
//     >
//       {/* Actual content — shards ke neeche gently fade/scale in */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.97 }}
//         animate={{
//           opacity: isActive ? 1 : 0,
//           scale: isActive ? 1 : 0.97,
//         }}
//         transition={{
//           duration: 0.6,
//           ease: PREMIUM_EASE,
//           delay: isActive ? 0.15 : 0,
//         }}
//         style={{ width: '100%', height: '100%' }}
//       >
//         {children}
//       </motion.div>

//       {/* Shatter shards — open par bikharte hain, close par reassemble hote hain */}
//       <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
//         {SHARDS.map((s) => (
//           <motion.div
//             key={s.id}
//             initial={false}
//             animate={
//               isActive
//                 ? { x: s.x, y: s.y, rotate: s.rotate, opacity: 0 }
//                 : { x: 0, y: 0, rotate: 0, opacity: 1 }
//             }
//             transition={{
//               duration: isActive ? 0.7 : 0.5,
//               ease: isActive ? [0.22, 1, 0.36, 1] : [0.4, 0, 0.2, 1],
//               delay: isActive ? s.delay : (SHARD_COUNT - s.id) * 0.008,
//             }}
//             style={{
//               position: 'absolute',
//               left: `${s.left}%`,
//               top: `${s.top}%`,
//               width: `${s.width}%`,
//               height: `${s.height}%`,
//               background: 'var(--color-bg, #0b0b0b)', // apne section ka actual bg color/token yahan lagao
//               border: '1px solid rgba(255,255,255,0.05)',
//               boxSizing: 'border-box',
//               willChange: 'transform, opacity',
//             }}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default SectionWrapper;


// 'use client';

// import { motion } from 'framer-motion';
// import { useRef, useEffect, useState } from 'react';

// const COLS = 5;
// const ROWS = 3;
// const SHARD_COUNT = COLS * ROWS;

// // deterministic pseudo-random — SSR/CSR hydration mismatch se bachne ke liye
// const seededRandom = (seed) => {
//   const x = Math.sin(seed * 9973) * 10000;
//   return x - Math.floor(x);
// };

// const buildShards = () => {
//   const shards = [];
//   let i = 0;
//   for (let r = 0; r < ROWS; r++) {
//     for (let c = 0; c < COLS; c++) {
//       const rand1 = seededRandom(i * 3 + 1);
//       const rand2 = seededRandom(i * 3 + 2);
//       const rand3 = seededRandom(i * 3 + 3);
//       shards.push({
//         id: i,
//         left: (c / COLS) * 100,
//         top: (r / ROWS) * 100,
//         width: 100 / COLS,
//         height: 100 / ROWS,
//         x: (rand1 - 0.5) * 400,
//         y: (rand2 - 0.5) * 320,
//         z: rand3 * 300,              // depth — 3D feel ke liye
//         rotate: (rand3 - 0.5) * 120,
//         rotateY: (rand1 - 0.5) * 60,
//         delay: seededRandom(i * 7 + 5) * 0.22,
//       });
//       i++;
//     }
//   }
//   return shards;
// };

// const SHARDS = buildShards();
// const PREMIUM_EASE = [0.22, 1, 0.36, 1];

// const SectionWrapper = ({ children, className = '', id = '', index = 0, sectionType = 'normal', label = '' }) => {
//   const sectionRef = useRef(null);
//   const [isActive, setIsActive] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => setIsActive(entry.isIntersecting),
//       {
//         threshold: 0.5,
//         rootMargin: '-50px 0px -50px 0px',
//       }
//     );
//     if (sectionRef.current) observer.observe(sectionRef.current);
//     return () => {
//       if (sectionRef.current) observer.unobserve(sectionRef.current);
//     };
//   }, []);

//   return (
//     // Plain <section> — koi transform/position/animation yahan nahi, scroll-snap ko touch nahi karta
//     <section
//       ref={sectionRef}
//       className={`scroll-section ${className}`}
//       id={id}
//       data-section-type={sectionType}
//       data-section-label={label}
//       style={{ position: 'relative', zIndex: index, overflow: 'hidden' }}
//     >
//       {/* Content — sirf ye animate hota hai, section ki jagah/size kabhi nahi badalti */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.96 }}
//         animate={{
//           opacity: isActive ? 1 : 0,
//           scale: isActive ? 1 : 0.96,
//         }}
//         transition={{ duration: 0.7, ease: PREMIUM_EASE, delay: isActive ? 0.15 : 0 }}
//         style={{ width: '100%', height: '100%', transformStyle: 'preserve-3d', perspective: '1200px' }}
//       >
//         {children}
//       </motion.div>

//       {/* Shatter shards overlay — 3D depth ke saath bikharte/reassemble hote hain */}
//       <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', perspective: '1200px' }}>
//         {SHARDS.map((s) => (
//           <motion.div
//             key={s.id}
//             initial={false}
//             animate={
//               isActive
//                 ? { x: s.x, y: s.y, z: s.z, rotate: s.rotate, rotateY: s.rotateY, opacity: 0 }
//                 : { x: 0, y: 0, z: 0, rotate: 0, rotateY: 0, opacity: 1 }
//             }
//             transition={{
//               duration: isActive ? 0.75 : 0.5,
//               ease: isActive ? [0.22, 1, 0.36, 1] : [0.4, 0, 0.2, 1],
//               delay: isActive ? s.delay : (SHARD_COUNT - s.id) * 0.008,
//             }}
//             style={{
//               position: 'absolute',
//               left: `${s.left}%`,
//               top: `${s.top}%`,
//               width: `${s.width}%`,
//               height: `${s.height}%`,
//               background: 'var(--color-bg, #0b0b0b)', // apna actual section bg color yahan lagao
//               border: '1px solid rgba(255,255,255,0.04)',
//               boxSizing: 'border-box',
//               transformStyle: 'preserve-3d',
//               willChange: 'transform, opacity',
//             }}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default SectionWrapper;


'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const SectionWrapper = ({ children, className = '', id = '', index = 0 }) => {
  const sectionRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Smooth spring physics for buttery animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Transform values with smooth spring
  const y = useTransform(smoothProgress, [0, 1], ['100vh', '-20vh']);
  const scale = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.9]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.6]);
  
  // Rotation for 3D effect
  const rotateX = useTransform(smoothProgress, [0, 0.5, 1], [10, 0, -5]);
  const rotateZ = useTransform(smoothProgress, [0, 0.5, 1], [-2, 0, 2]);

  // Shadow effect
  const boxShadow = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [
      '0 20px 60px rgba(0,0,0,0.5)',
      '0 0px 0px rgba(0,0,0,0)',
      '0 -20px 60px rgba(0,0,0,0.5)'
    ]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      {
        threshold: 0.5,
        rootMargin: '-50px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      className={`scroll-section ${className}`}
      id={id}
      style={{
        y,
        scale,
        opacity,
        rotateX,
        rotateZ,
        boxShadow,
        transformStyle: 'preserve-3d',
        perspective: '2000px',
        position: 'relative',
        zIndex: index,
        willChange: 'transform, opacity',
      }}
      initial={{ 
        y: '100%',
        opacity: 0,
      }}
      animate={{
        y: isActive ? 0 : '100%',
        opacity: isActive ? 1 : 0,
        transition: {
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }
      }}
      exit={{ 
        y: '-100%',
        opacity: 0,
        transition: {
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }
      }}
    >
      <motion.div
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        {children}
      </motion.div>
    </motion.section>
  );
};

export default SectionWrapper;