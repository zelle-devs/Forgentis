'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import '@/components/forgentisAnimation/Electricshock2.css';
import { INTRO_COMPLETE_EVENT } from '@/components/forgentisAnimation/Introconfig';

const displace = (x1, y1, x2, y2, offset, depth, points) => {
  if (depth <= 0) {
    points.push([x2, y2]);
    return;
  }
  const mx = (x1 + x2) / 2 + (Math.random() - 0.5) * offset;
  const my = (y1 + y2) / 2 + (Math.random() - 0.5) * (offset * 0.4);
  displace(x1, y1, mx, my, offset * 0.55, depth - 1, points);
  displace(mx, my, x2, y2, offset * 0.55, depth - 1, points);
};

const generateBolt = (x1, y1, x2, y2, offset = 14, depth = 4) => {
  const points = [[x1, y1]];
  displace(x1, y1, x2, y2, offset, depth, points);
  return points;
};

const pointsToPath = (points) =>
  points.reduce(
    (d, [x, y], i) => d + `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)} `,
    ''
  );

const generateBranch = (points, minIndex, maxIndex) => {
  const startIdx = Math.floor(minIndex + Math.random() * (maxIndex - minIndex));
  const [sx, sy] = points[startIdx];
  const angle = (Math.random() - 0.5) * 1.4 + Math.PI / 2.2;
  const length = 12 + Math.random() * 18;
  const ex = sx + Math.cos(angle) * length * (Math.random() > 0.5 ? 1 : -1);
  const ey = sy + Math.sin(angle) * length * 0.9;
  const branchPoints = generateBolt(sx, sy, ex, ey, 6, 2);
  return pointsToPath(branchPoints);
};

const useLightningPaths = (seedKey) =>
  useMemo(() => {
    const main = generateBolt(50, -2, 48, 102, 13, 5);
    const mainPath = pointsToPath(main);
    const branches = Array.from({ length: 3 + Math.floor(Math.random() * 2) }).map(() =>
      generateBranch(main, Math.floor(main.length * 0.2), Math.floor(main.length * 0.8))
    );
    return { mainPath, branches };
  }, [seedKey]);

const ElectricShock2 = () => {
  const pathname = usePathname();
  const [showShock, setShowShock] = useState(false);
  const [showBalls, setShowBalls] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [balls, setBalls] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [boltKey, setBoltKey] = useState(0);
  const shakeRef = useRef(null);

  const { mainPath, branches } = useLightningPaths(boltKey);

  useEffect(() => {
    setShowShock(false);
    setShowBalls(false);
    setShowFlash(false);
    setBalls([]);
    setIsComplete(false);
    setBoltKey((k) => k + 1);

    const startAnimation = () => {
      setBoltKey((k) => k + 1);

      // Shock line start
      setTimeout(() => {
        setShowShock(true);
      }, 300);

      // Impact flash + screen shake
      setTimeout(() => {
        setShowFlash(true);
        if (shakeRef.current) {
          shakeRef.current.classList.remove('shock-shake');
          void shakeRef.current.offsetWidth;
          shakeRef.current.classList.add('shock-shake');
        }
      }, 1050);

      // Line fade out
      setTimeout(() => {
        setShowShock(false);
      }, 1400);

      // Bottom pe sparks scatter
      setTimeout(() => {
        setShowBalls(true);
        generateBalls();
      }, 1150);

      // Animation complete
      setTimeout(() => {
        setIsComplete(true);
      }, 4500);
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
    const ballCount = 126;

    for (let i = 0; i < ballCount; i++) {
      const depth = Math.random();
      newBalls.push({
        id: i,
        x: 28 + Math.random() * 44,
        y: 82 + Math.random() * 12,
        size: 5 + depth * 16,
        depth,
        duration: 0.9 + Math.random() * 1.8,
        delay: Math.random() * 0.25,
        bounceHeight: 60 + depth * 220,
        direction: Math.random() > 0.5 ? 1 : -1,
        distance: 40 + depth * 220,
        hue: Math.random() > 0.6 ? 'white' : 'blue',
        rotate: (Math.random() - 0.5) * 720,
      });
    }
    setBalls(newBalls);
  };

  if (isComplete) return null;

  return (
    <div className="electric-shock-overlay" ref={shakeRef}>
      {/* Full-screen impact flash */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            className="shock-screen-flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.55, 0.15, 0] }}
            transition={{ duration: 0.5, times: [0, 0.15, 0.4, 1], ease: 'easeOut' }}
            onAnimationComplete={() => setShowFlash(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showShock && (
          <motion.div
            key={boltKey}
            className="shock-container"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3, ease: 'easeOut' } }}
          >
            {/* Ambient depth glow */}
            <motion.div
              className="shock-depth-glow"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{
                opacity: [0, 0.9, 0.5, 0.8, 0],
                scale: [0.4, 1.3, 1, 1.15, 0.6],
              }}
              transition={{ duration: 1.1, times: [0, 0.3, 0.5, 0.7, 1], ease: 'easeInOut' }}
            />

            <svg className="shock-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <filter id="boltCrackle" x="-60%" y="-20%" width="220%" height="140%">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.9"
                    numOctaves="2"
                    seed={boltKey}
                    result="noise"
                  >
                    <animate
                      attributeName="seed"
                      values={`${boltKey};${boltKey + 8};${boltKey + 3};${boltKey}`}
                      dur="0.25s"
                      repeatCount="4"
                    />
                  </feTurbulence>
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.2" />
                </filter>

                <filter id="boltBlurSoft" x="-80%" y="-80%" width="260%" height="260%">
                  <feGaussianBlur stdDeviation="1.6" />
                </filter>
                <filter id="boltBlurWide" x="-120%" y="-120%" width="340%" height="340%">
                  <feGaussianBlur stdDeviation="4.5" />
                </filter>

                <linearGradient id="boltGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-blue-light)" />
                  <stop offset="45%" stopColor="var(--color-blue-main)" />
                  <stop offset="100%" stopColor="var(--color-blue-light)" />
                </linearGradient>
              </defs>

              {/* Layer 1: wide outer bloom */}
              <motion.path
                d={mainPath}
                fill="none"
                stroke="var(--color-blue-glow)"
                strokeWidth="3.2"
                strokeLinecap="round"
                filter="url(#boltBlurWide)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: [0, 0.9, 0.5, 0.85, 0.3, 0.7, 0],
                }}
                transition={{ duration: 0.75, ease: 'easeIn' }}
              />

              {/* Layer 2: mid glow */}
              <motion.path
                d={mainPath}
                fill="none"
                stroke="url(#boltGradient)"
                strokeWidth="1.3"
                strokeLinecap="round"
                filter="url(#boltCrackle)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: [0, 1, 0.6, 1, 0.4, 1, 0],
                }}
                transition={{
                  duration: 0.75,
                  ease: 'easeIn',
                  opacity: { duration: 0.9, times: [0, 0.12, 0.28, 0.42, 0.56, 0.7, 1] },
                }}
              />

              {/* Layer 3: hot white core */}
              <motion.path
                d={mainPath}
                fill="none"
                stroke="#ffffff"
                strokeWidth="0.4"
                strokeLinecap="round"
                filter="url(#boltBlurSoft)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: [0, 1, 0.7, 1, 0.5, 0],
                }}
                transition={{ duration: 0.6, ease: 'easeIn' }}
              />

              {/* Branch forks */}
              {branches.map((branchPath, i) => (
                <motion.path
                  key={`branch-${boltKey}-${i}`}
                  d={branchPath}
                  fill="none"
                  stroke="var(--color-blue-light)"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                  filter="url(#boltBlurSoft)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: 1,
                    opacity: [0, 0.9, 0, 0.7, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.15 + i * 0.06,
                    ease: 'easeOut',
                  }}
                />
              ))}
            </svg>

            {/* Flash sparks along the line */}
            {[...Array(14)].map((_, i) => (
              <motion.div
                key={`flash-${i}`}
                className="shock-flash"
                style={{
                  top: `${5 + i * 6.8}%`,
                  left: `${44 + (Math.random() * 12)}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.6 + Math.random(), 0],
                  x: [0, (Math.random() - 0.5) * 34, 0],
                  y: [0, (Math.random() - 0.5) * 16, 0],
                }}
                transition={{
                  duration: 0.35,
                  delay: 0.08 + i * 0.06,
                  repeat: Infinity,
                  repeatDelay: 0.2,
                }}
              />
            ))}

            {/* Impact point - fade out with line */}
            <motion.div
              className="shock-impact-point"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0.8, 0],
                scale: [0, 1.3, 1.8, 0],
              }}
              transition={{ duration: 0.7, delay: 0.7, ease: 'easeOut' }}
            />

            {/* Expanding shockwave rings - patli, full screen tak */}
            <motion.div
              className="shock-ring"
              initial={{ opacity: 0, scale: 0.1 }}
              animate={{
                opacity: [0, 0.9, 0.6, 0.3, 0],
                scale: [0.1, 8, 18, 30, 45],
              }}
              transition={{ duration: 1.8, delay: 0.72, ease: 'easeOut' }}
            />
            <motion.div
              className="shock-ring shock-ring--delayed"
              initial={{ opacity: 0, scale: 0.1 }}
              animate={{
                opacity: [0, 0.5, 0.3, 0.15, 0],
                scale: [0.1, 10, 25, 40, 60],
              }}
              transition={{ duration: 2.2, delay: 0.85, ease: 'easeOut' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bouncing 3D Sparks */}
      <AnimatePresence>
        {showBalls &&
          balls.map((ball) => (
            <motion.div
              key={ball.id}
              className={`shock-ball shock-ball--${ball.hue}`}
              style={{
                left: `${ball.x}%`,
                top: `${ball.y}%`,
                width: `${ball.size}px`,
                height: `${ball.size}px`,
                zIndex: Math.round(ball.depth * 10),
                filter: `blur(${(1 - ball.depth) * 0.6}px)`,
              }}
              initial={{ opacity: 1, x: 0, y: 0, scale: 0.4, rotate: 0 }}
              animate={{
                opacity: [1, 1, 1, 0],
                x: ball.direction * ball.distance,
                rotate: ball.rotate,
                y: [0, -ball.bounceHeight, 0, -ball.bounceHeight * 0.45, 0, -ball.bounceHeight * 0.18, 0],
                scaleY: [0.4, 1, 0.55, 1, 0.7, 1, 0.4],
                scaleX: [1.2, 0.9, 1.3, 0.95, 1.15, 0.95, 1.2],
              }}
              transition={{
                duration: ball.duration,
                delay: ball.delay,
                ease: 'easeOut',
                times: [0, 0.2, 0.4, 0.55, 0.7, 0.85, 1],
              }}
            />
          ))}

        {/* Bottom impact flash - patla, full screen expand */}
        {showBalls && (
          <motion.div
            className="shock-bottom-flash"
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{
              opacity: [0, 0.8, 0.5, 0.2, 0],
              scale: [0.2, 5, 12, 25, 40],
            }}
            transition={{ duration: 2, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ElectricShock2;