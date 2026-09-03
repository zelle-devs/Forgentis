'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import './WeldingReveal.css';
import { INTRO_COMPLETE_EVENT } from '@/components/forgentisAnimation/Introconfig';

const WeldingReveal = () => {
  const pathname = usePathname();
  const [showLine, setShowLine] = useState(false);
  const [showImpact, setShowImpact] = useState(false);
  const [sparks, setSparks] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Har page change pe reset
    setShowLine(false);
    setShowImpact(false);
    setSparks([]);
    setIsComplete(false);

    const startAnimation = () => {
      // Welding line start
      setTimeout(() => {
        setShowLine(true);
      }, 300);

      // Bottom pe impact + sparks
      setTimeout(() => {
        setShowImpact(true);
        generateWeldingSparks();
      }, 1500);

      // Complete
      setTimeout(() => {
        setIsComplete(true);
      }, 3200);
    };

    const stored = window.sessionStorage.getItem('forgentis_intro_shown');
    
    if (stored === 'false') {
      // Intro already played - start welding animation after short delay
      startAnimation();
    } else {
      // Wait for intro to complete
      window.addEventListener(INTRO_COMPLETE_EVENT, startAnimation);
    }

    return () => {
      window.removeEventListener(INTRO_COMPLETE_EVENT, startAnimation);
    };
  }, [pathname]);

  const generateWeldingSparks = () => {
    const newSparks = [];
    // Welding sparks - orange/blue mix (metal welding look)
    for (let i = 0; i < 25; i++) {
      newSparks.push({
        id: i,
        x: 48 + Math.random() * 4,
        y: 80 + Math.random() * 10,
        size: 1 + Math.random() * 4,
        duration: 0.6 + Math.random() * 1.2,
        delay: Math.random() * 0.4,
        angle: -60 + Math.random() * 120,
        distance: 80 + Math.random() * 200,
        color: Math.random() > 0.5 ? 'spark-blue' : 'spark-orange',
      });
    }
    setSparks(newSparks);
  };

  if (isComplete) return null;

  return (
    <div className="welding-reveal-overlay">
      {/* Welding Arc Line */}
      <AnimatePresence>
        {showLine && (
          <motion.div
            className="welding-line-container"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Main welding arc */}
            <motion.div
              className="welding-arc"
              initial={{ 
                top: '-5%',
                height: '0%',
                opacity: 0,
              }}
              animate={{ 
                top: '0%',
                height: '100%',
                opacity: [0, 1, 0.9, 1, 0.8, 1, 0.7, 1],
              }}
              transition={{
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
                opacity: {
                  duration: 1.2,
                  times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1],
                },
              }}
            />

            {/* Welding glow - orange core + blue outer */}
            <motion.div
              className="welding-glow-core"
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ 
                opacity: [0, 1, 0.8, 1, 0.6],
                scale: [0.3, 1, 1.2, 0.9, 0],
              }}
              transition={{
                duration: 1.2,
                times: [0, 0.2, 0.5, 0.8, 1],
                ease: 'easeInOut',
              }}
            />

            {/* Blue electric outer glow */}
            <motion.div
              className="welding-glow-blue"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: [0, 0.8, 0.5, 0.7, 0],
                scale: [0.5, 1.5, 1, 1.3, 0],
              }}
              transition={{
                duration: 1.2,
                times: [0, 0.2, 0.5, 0.8, 1],
                ease: 'easeInOut',
              }}
            />

            {/* Welding flicker sparks along the line */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`weld-spark-${i}`}
                className={`welding-flicker ${Math.random() > 0.5 ? 'flicker-orange' : 'flicker-blue'}`}
                style={{
                  top: `${8 + i * 7}%`,
                  left: `${47 + (Math.random() * 6)}%`,
                }}
                initial={{ opacity: 0, scale: 0, x: 0 }}
                animate={{
                  opacity: [0, 1, 0.5, 1, 0],
                  scale: [0, 1.8, 1, 2, 0],
                  x: [0, Math.random() * 15 - 7.5, 0],
                  y: [0, Math.random() * 10 - 5, 0],
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.15 + i * 0.08,
                  repeat: Infinity,
                  repeatDelay: 0.2,
                }}
              />
            ))}

            {/* Welding tip at bottom */}
            <motion.div
              className="welding-tip"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0.8, 1],
                scale: [0, 1, 1.2, 1],
              }}
              transition={{
                duration: 0.6,
                delay: 0.9,
                ease: 'easeOut',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Welding Sparks Scatter */}
      <AnimatePresence>
        {showImpact && sparks.map((spark) => (
          <motion.div
            key={spark.id}
            className={`welding-spark-particle ${spark.color}`}
            style={{
              left: `${spark.x}%`,
              top: `${spark.y}%`,
              width: `${spark.size}px`,
              height: `${spark.size}px`,
            }}
            initial={{ 
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
            }}
            animate={{
              opacity: [1, 1, 0],
              x: Math.cos(spark.angle * Math.PI / 180) * spark.distance,
              y: Math.sin(spark.angle * Math.PI / 180) * spark.distance - 50,
              scale: [1, 0.8, 0],
            }}
            transition={{
              duration: spark.duration,
              delay: spark.delay,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}

        {/* Welding flash at bottom */}
        {showImpact && (
          <motion.div
            className="welding-impact-flash"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0.7, 0],
              scale: [0, 2.5, 3.5, 5],
            }}
            transition={{
              duration: 0.7,
              ease: 'easeOut',
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default WeldingReveal;