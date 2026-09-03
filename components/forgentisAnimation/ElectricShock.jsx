'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import './ElectricShock.css';
import { INTRO_COMPLETE_EVENT } from '@/components/forgentisAnimation/Introconfig';

const ElectricShock = () => {
  const pathname = usePathname();
  const [showShock, setShowShock] = useState(false);
  const [showBalls, setShowBalls] = useState(false);
  const [balls, setBalls] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setShowShock(false);
    setShowBalls(false);
    setBalls([]);
    setIsComplete(false);

    const startAnimation = () => {
      // Shock line start
      setTimeout(() => {
        setShowShock(true);
      }, 300);

      // Bottom pe balls scatter
      setTimeout(() => {
        setShowBalls(true);
        generateBalls();
      }, 1200);

      // Animation complete
      setTimeout(() => {
        setIsComplete(true);
      }, 3500);
    };

    const stored = window.sessionStorage.getItem('forgentis_intro_shown');
    
    if (stored === 'false') {
      startAnimation();
    } else {
      window.addEventListener(INTRO_COMPLETE_EVENT, startAnimation);
    }

    return () => {
      window.removeEventListener(INTRO_COMPLETE_EVENT, startAnimation);
    };
  }, [pathname]);

  const generateBalls = () => {
    const newBalls = [];
    const ballCount = 20;
    
    for (let i = 0; i < ballCount; i++) {
      newBalls.push({
        id: i,
        x: 30 + Math.random() * 40, // Bottom area spread
        y: 80 + Math.random() * 15,
        size: 4 + Math.random() * 12,
        duration: 1 + Math.random() * 2,
        delay: Math.random() * 0.3,
        bounceHeight: 100 + Math.random() * 200,
        bounceCount: 2 + Math.random() * 3,
        direction: Math.random() > 0.5 ? 1 : -1,
        distance: 50 + Math.random() * 200,
      });
    }
    setBalls(newBalls);
  };

  if (isComplete) return null;

  return (
    <div className="electric-shock-overlay">
      <AnimatePresence>
        {showShock && (
          <motion.div
            className="shock-container"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Main Shock Line - Zigzag */}
            <motion.svg
              className="shock-svg"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.8, 1, 0.6, 1, 0.4, 1] }}
              transition={{
                duration: 1,
                times: [0, 0.1, 0.25, 0.4, 0.55, 0.7, 0.85, 1],
              }}
            >
              {/* Zigzag lightning path */}
              <motion.path
                d="M 50 0 L 45 15 L 55 25 L 42 40 L 58 55 L 45 70 L 52 85 L 48 100"
                fill="none"
                stroke="var(--color-blue-main)"
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 0.8,
                  ease: 'easeIn',
                }}
              />
              
              {/* Glow line */}
              <motion.path
                d="M 50 0 L 45 15 L 55 25 L 42 40 L 58 55 L 45 70 L 52 85 L 48 100"
                fill="none"
                stroke="var(--color-blue-light)"
                strokeWidth="0.2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.1,
                  ease: 'easeIn',
                }}
                style={{
                  filter: 'blur(1px)',
                }}
              />
            </motion.svg>

            {/* Shock Glow */}
            <motion.div
              className="shock-glow"
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ 
                opacity: [0, 1, 0.5, 0.8, 0.3],
                scale: [0.3, 1.5, 1, 1.2, 0.5],
              }}
              transition={{
                duration: 1,
                times: [0, 0.3, 0.5, 0.7, 1],
                ease: 'easeInOut',
              }}
            />

            {/* Flash sparks along the line */}
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={`flash-${i}`}
                className="shock-flash"
                style={{
                  top: `${8 + i * 9}%`,
                  left: `${45 + (Math.random() * 10)}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 2, 0],
                  x: [0, (Math.random() - 0.5) * 30, 0],
                  y: [0, (Math.random() - 0.5) * 15, 0],
                }}
                transition={{
                  duration: 0.4,
                  delay: 0.1 + i * 0.08,
                  repeat: Infinity,
                  repeatDelay: 0.15,
                }}
              />
            ))}

            {/* Impact point at bottom */}
            <motion.div
              className="shock-impact-point"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0.8, 1],
                scale: [0, 1, 1.5, 1],
              }}
              transition={{
                duration: 0.5,
                delay: 0.7,
                ease: 'easeOut',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bouncing Balls */}
      <AnimatePresence>
        {showBalls && balls.map((ball) => (
          <motion.div
            key={ball.id}
            className="shock-ball"
            style={{
              left: `${ball.x}%`,
              top: `${ball.y}%`,
              width: `${ball.size}px`,
              height: `${ball.size}px`,
            }}
            initial={{ 
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
            }}
            animate={{
              opacity: [1, 1, 1, 0],
              x: ball.direction * ball.distance,
              y: [
                0,
                -ball.bounceHeight,
                0,
                -ball.bounceHeight * 0.5,
                0,
                -ball.bounceHeight * 0.25,
                0,
              ],
              scale: [1, 0.8, 1, 0.9, 1, 0.95, 0],
            }}
            transition={{
              duration: ball.duration,
              delay: ball.delay,
              ease: 'easeOut',
              times: [0, 0.2, 0.4, 0.55, 0.7, 0.85, 1],
            }}
          />
        ))}

        {/* Bottom impact flash */}
        {showBalls && (
          <motion.div
            className="shock-bottom-flash"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0.5, 0],
              scale: [0, 3, 4, 5],
            }}
            transition={{
              duration: 0.6,
              ease: 'easeOut',
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ElectricShock;