'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import './ElectricReveal.css';
import { INTRO_COMPLETE_EVENT } from '@/components/forgentisAnimation/Introconfig';

const ElectricReveal = () => {
  const pathname = usePathname();
  const [showLine, setShowLine] = useState(false);
  const [showShatter, setShowShatter] = useState(false);
  const [particles, setParticles] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Har page change pe reset karo
    setShowLine(false);
    setShowShatter(false);
    setParticles([]);
    setIsComplete(false);

    const startAnimation = () => {
      setTimeout(() => {
        setShowLine(true);
      }, 300);

      setTimeout(() => {
        setShowShatter(true);
        generateParticles();
      }, 1800);

      setTimeout(() => {
        setIsComplete(true);
      }, 3500);
    };

    const stored = window.sessionStorage.getItem('forgentis_intro_shown');
    
    if (stored === 'false') {
      // Intro already played - turant animation start
      startAnimation();
    } else {
      // Wait for intro complete
      window.addEventListener(INTRO_COMPLETE_EVENT, startAnimation);
    }

    return () => {
      window.removeEventListener(INTRO_COMPLETE_EVENT, startAnimation);
    };
  }, [pathname]); // pathname change pe re-run

  const generateParticles = () => {
    const newParticles = [];
    for (let i = 0; i < 15; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: 85 + Math.random() * 15,
        size: 2 + Math.random() * 6,
        duration: 0.8 + Math.random() * 1.5,
        delay: Math.random() * 0.5,
        angle: -30 + Math.random() * 60,
        distance: 50 + Math.random() * 150,
      });
    }
    setParticles(newParticles);
  };

  if (isComplete) return null;

  return (
    <div className="electric-reveal-overlay">
      {/* Main Electric Line */}
      <AnimatePresence>
        {showLine && (
          <motion.div
            className="electric-line-container"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="electric-line"
              initial={{ 
                top: '-10%',
                height: '0%',
                opacity: 0,
              }}
              animate={{ 
                top: '0%',
                height: '100%',
                opacity: [0, 1, 1, 1, 1, 1, 0.8, 1],
              }}
              transition={{
                duration: 1.5,
                ease: [0.16, 1, 0.3, 1],
                opacity: {
                  duration: 1.5,
                  times: [0, 0.1, 0.3, 0.5, 0.7, 0.9, 0.95, 1],
                },
              }}
            />
            
            {/* Electric current glow effect */}
            <motion.div
              className="electric-glow"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: [0, 0.8, 0.4, 0.9, 0.6, 0.8, 0],
                scale: [0.5, 1, 1.2, 0.9, 1.1, 1, 0],
              }}
              transition={{
                duration: 1.5,
                times: [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1],
                ease: 'easeInOut',
              }}
            />

            {/* Zigzag electric sparks */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`spark-${i}`}
                className="electric-spark"
                style={{
                  top: `${10 + i * 10}%`,
                  left: `${45 + (Math.random() * 10)}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + i * 0.15,
                  repeat: Infinity,
                  repeatDelay: 0.3,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shatter Particles at bottom */}
      <AnimatePresence>
        {showShatter && particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="electric-particle"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            initial={{ 
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
            }}
            animate={{
              opacity: [1, 1, 0],
              x: Math.cos(particle.angle * Math.PI / 180) * particle.distance,
              y: Math.sin(particle.angle * Math.PI / 180) * particle.distance - 30,
              scale: [1, 0.8, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}

        {/* Bottom impact flash */}
        {showShatter && (
          <motion.div
            className="electric-impact"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0.6, 0],
              scale: [0, 2, 3, 4],
            }}
            transition={{
              duration: 0.8,
              ease: 'easeOut',
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ElectricReveal;