'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const SectionWrapper = ({
  children,
  className = '',
  id = '',
  index = 0,
  sectionType = 'normal',
  label = '',
}) => {
  const sectionRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      {
        threshold: 0.45,
        rootMargin: '-5% 0px -5% 0px',
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
    <section
      ref={sectionRef}
      className={`scroll-section ${className}`}
      id={id}
      data-section-type={sectionType}
      data-section-label={label}
      style={{
        position: 'relative',
        zIndex: index,
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 35,
          scale: 0.985,
        }}
        animate={{
          opacity: isActive ? 1 : 0,
          y: isActive ? 0 : 35,
          scale: isActive ? 1 : 0.985,
        }}
        transition={{
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          width: '100%',
        }}
      >
        {children}
      </motion.div>
    </section>
  );
};

export default SectionWrapper;

// 'use client';

// import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
// import { useRef, useEffect, useState } from 'react';

// const SectionWrapper = ({ children, className = '', id = '', index = 0 }) => {
//   const sectionRef = useRef(null);
//   const [isActive, setIsActive] = useState(false);
  
//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start end", "end start"]
//   });

//   // Smooth spring physics for buttery animation
//   const smoothProgress = useSpring(scrollYProgress, {
//     stiffness: 100,
//     damping: 30,
//     restDelta: 0.001
//   });

//   // Transform values with smooth spring
//   const y = useTransform(smoothProgress, [0, 1], ['100vh', '-20vh']);
//   const scale = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.9]);
//   const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.6]);
  
//   // Rotation for 3D effect
//   const rotateX = useTransform(smoothProgress, [0, 0.5, 1], [10, 0, -5]);
//   const rotateZ = useTransform(smoothProgress, [0, 0.5, 1], [-2, 0, 2]);

//   // Shadow effect
//   const boxShadow = useTransform(
//     smoothProgress,
//     [0, 0.5, 1],
//     [
//       '0 20px 60px rgba(0,0,0,0.5)',
//       '0 0px 0px rgba(0,0,0,0)',
//       '0 -20px 60px rgba(0,0,0,0.5)'
//     ]
//   );

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         setIsActive(entry.isIntersecting);
//       },
//       {
//         threshold: 0.5,
//         rootMargin: '-50px 0px -50px 0px'
//       }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => {
//       if (sectionRef.current) {
//         observer.unobserve(sectionRef.current);
//       }
//     };
//   }, []);

//   return (
//     <motion.section
//       ref={sectionRef}
//       className={`scroll-section ${className}`}
//       id={id}
//       style={{
//         y,
//         scale,
//         opacity,
//         rotateX,
//         rotateZ,
//         boxShadow,
//         transformStyle: 'preserve-3d',
//         perspective: '2000px',
//         position: 'relative',
//         zIndex: index,
//         willChange: 'transform, opacity',
//         background: 'var(--color-black)',
//       }}
//       initial={{ 
//         y: '100%',
//         opacity: 0,
//       }}
//       animate={{
//         y: isActive ? 0 : '100%',
//         opacity: isActive ? 1 : 0,
//         transition: {
//           duration: 1.2,
//           ease: [0.22, 1, 0.36, 1],
//         }
//       }}
//       exit={{ 
//         y: '-100%',
//         opacity: 0,
//         transition: {
//           duration: 0.8,
//           ease: [0.22, 1, 0.36, 1],
//         }
//       }}
//     >
//       <motion.div
//         style={{
//           width: '100%',
//           height: '100%',
//         }}
//       >
//         {children}
//       </motion.div>
//     </motion.section>
//   );
// };

// export default SectionWrapper;