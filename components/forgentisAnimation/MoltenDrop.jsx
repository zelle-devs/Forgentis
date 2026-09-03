'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import './MoltenDrop.css';
import { INTRO_COMPLETE_EVENT } from '@/components/forgentisAnimation/Introconfig';

const MoltenDrop = () => {
  const pathname = usePathname();
  const [showDrop, setShowDrop] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [droplets, setDroplets] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setShowDrop(false);
    setShowSplash(false);
    setDroplets([]);
    setIsComplete(false);

    const startAnimation = () => {
      setTimeout(() => {
        setShowDrop(true);
      }, 300);

      setTimeout(() => {
        setShowSplash(true);
        generateDroplets();
      }, 1600);

      setTimeout(() => {
        setIsComplete(true);
      }, 3000);
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

  const generateDroplets = () => {
    const newDroplets = [];
    for (let i = 0; i < 30; i++) {
      newDroplets.push({
        id: i,
        x: 50,
        y: 85,
        size: 1 + Math.random() * 5,
        duration: 0.5 + Math.random() * 1.5,
        delay: Math.random() * 0.3,
        angle: Math.random() * 360,
        distance: 60 + Math.random() * 250,
        gravity: 100 + Math.random() * 200,
      });
    }
    setDroplets(newDroplets);
  };

  if (isComplete) return null;

  return (
    <div className="molten-drop-overlay">
      <AnimatePresence>
        {showDrop && (
          <motion.div
            className="molten-drop-container"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Main Molten Drop */}
            <motion.div
              className="molten-drop"
              initial={{ 
                top: '-5%',
                scale: 0.5,
                opacity: 0,
              }}
              animate={{ 
                top: '85%',
                scale: [0.5, 1, 1.2, 0.8],
                opacity: [0, 1, 1, 1],
              }}
              transition={{
                duration: 1.3,
                ease: [0.3, 0.8, 0.4, 1],
                scale: {
                  duration: 1.3,
                  times: [0, 0.6, 0.8, 1],
                },
              }}
            />

            {/* Glow Trail - drop ke peeche */}
            <motion.div
              className="molten-trail"
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: [0, 0.8, 0.4],
                height: '100%',
              }}
              transition={{
                duration: 1.3,
                ease: 'easeIn',
              }}
            />

            {/* Blue Neon Glow around drop */}
            <motion.div
              className="molten-glow"
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ 
                opacity: [0, 1, 0.8, 0.5],
                scale: [0.3, 1.5, 1.8, 0.8],
              }}
              transition={{
                duration: 1.3,
                times: [0, 0.4, 0.7, 1],
                ease: 'easeInOut',
              }}
            />

            {/* Fluid ripples on drop */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`ripple-${i}`}
                className="molten-ripple"
                style={{
                  top: `${70 + i * 3}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.6, 0],
                  scale: [0, 1 + i * 0.3, 1.5 + i * 0.4],
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.5 + i * 0.08,
                  repeat: Infinity,
                  repeatDelay: 0.2,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Splash Droplets */}
      <AnimatePresence>
        {showSplash && droplets.map((droplet) => (
          <motion.div
            key={droplet.id}
            className="molten-droplet"
            style={{
              left: `${droplet.x}%`,
              top: `${droplet.y}%`,
              width: `${droplet.size}px`,
              height: `${droplet.size}px`,
            }}
            initial={{ 
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
            }}
            animate={{
              opacity: [1, 1, 0],
              x: Math.cos(droplet.angle * Math.PI / 180) * droplet.distance,
              y: Math.sin(droplet.angle * Math.PI / 180) * droplet.distance + droplet.gravity,
              scale: [1, 0.7, 0],
            }}
            transition={{
              duration: droplet.duration,
              delay: droplet.delay,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}

        {/* Splash Impact */}
        {showSplash && (
          <>
            <motion.div
              className="molten-splash-ring"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0.5, 0],
                scale: [0, 2, 3, 4],
              }}
              transition={{
                duration: 0.8,
                ease: 'easeOut',
              }}
            />
            <motion.div
              className="molten-splash-glow"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0.6, 0],
                scale: [0, 3, 4, 5],
              }}
              transition={{
                duration: 0.6,
                ease: 'easeOut',
              }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MoltenDrop;