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
