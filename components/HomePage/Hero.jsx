'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import './Hero.css'
import {
  INTRO_STORAGE_KEY,
  INTRO_COMPLETE_EVENT,
  INTRO_TOTAL_DURATION,
} from '@/components/forgentisAnimation/Introconfig'

const AnimatedTitle = ({ text, className = '', startDelay = 0 }) => {
  const words = text.split(' ');

  return (
    <span className={`hero-title-animated ${className}`}>
      {words.map((word, wordIndex) => (
        <span className="hero-title-word" key={`${word}-${wordIndex}`}>
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={`${char}-${charIndex}`}
              className="hero-title-letter"
              initial={{
                opacity: 0,
                y: 70,
                rotateX: -90,
                rotateY: 25,
                rotateZ: 5,
                scale: 0.7,
              }}
              animate={{
                opacity: 1,
                y: 0,
                rotateX: 0,
                rotateY: 0,
                rotateZ: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.6,
                delay: startDelay + (wordIndex * 0.15) + (charIndex * 0.03),
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {char}
            </motion.span>
          ))}

          {wordIndex < words.length - 1 && (
            <span className="hero-title-space">&nbsp;</span>
          )}
        </span>
      ))}
    </span>
  );
};

const Hero = () => {
  const heroImages = [
    '/hero.jpeg', 
    // '/hero1.jpeg', 
  ]

  const titleImage = '/title-bg.png'
  
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [animationReady, setAnimationReady] = useState(false)
  const [startAnimations, setStartAnimations] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Mark component as mounted (client-side only)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Check if welcome animation has played and sync animations
  useEffect(() => {
    if (!isMounted) return

    const checkWelcomeAnimation = () => {
      try {
        // Check if welcome animation will show or already shown
        const toShow = window.sessionStorage.getItem(INTRO_STORAGE_KEY)

        if (toShow === 'false') {
          // Welcome animation already played this session
          setAnimationReady(true)
          setTimeout(() => setStartAnimations(true), 100)
        } else {
          // Welcome animation is playing now.
          // Wait for it to finish — INTRO_TOTAL_DURATION comes
          // from the same shared config the intro itself uses,
          // so this can never drift out of sync with it. The
          // 'welcomeAnimationComplete' listener below will
          // normally fire first (the intro dispatches it the
          // instant it finishes); this timeout is just a
          // safety net in case that listener attaches a beat
          // too late.
          const welcomeDuration = INTRO_TOTAL_DURATION

          setTimeout(() => {
            setAnimationReady(true)
            setTimeout(() => setStartAnimations(true), 200)
          }, welcomeDuration)
        }
      } catch (err) {
        // sessionStorage unavailable - start immediately
        setAnimationReady(true)
        setTimeout(() => setStartAnimations(true), 100)
      }
    }

    checkWelcomeAnimation()

    // Listen for the real completion event from the intro —
    // this is what actually keeps things in sync; the timeout
    // above is only a fallback.
    const handleWelcomeComplete = () => {
      setAnimationReady(true)
      setTimeout(() => setStartAnimations(true), 200)
    }

    window.addEventListener(INTRO_COMPLETE_EVENT, handleWelcomeComplete)

    return () => {
      window.removeEventListener(INTRO_COMPLETE_EVENT, handleWelcomeComplete)
    }
  }, [isMounted])

  // Auto-play logic - starts after animations
  useEffect(() => {
    if (!startAnimations) return
    if (heroImages.length <= 1) {
      setIsAutoPlaying(false)
      return
    }

    setIsAutoPlaying(true)
  }, [startAnimations, heroImages.length])

  // Auto-play interval
  useEffect(() => {
    if (!isAutoPlaying || !animationReady) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, animationReady, heroImages.length])

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }, [])

  // First load shatter animation timing
  useEffect(() => {
    if (!startAnimations) return
    const timer = setTimeout(() => {
      setIsFirstLoad(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [startAnimations])

  // Scroll-based effects
  const { scrollY } = useScroll()
  const contentScale = useTransform(scrollY, [0, 500], [1, 0.6])
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const contentY = useTransform(scrollY, [0, 500], [0, -100])
  const dotsOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const overlayOpacity = useTransform(scrollY, [0, 500], [1, 1.5])

  // Slider variants
  const sliderVariants = {
    enter: {
      x: '100%',
      opacity: 0,
    },
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      x: '-100%',
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  // First load shatter variants
  const shatterVariants = {
    hidden: {
      y: '-100%',
      opacity: 0,
      clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)',
    },
    visible: {
      y: 0,
      opacity: 1,
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
        clipPath: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.5 },
      },
    },
  }

  // Always render same structure for hydration
  // Use CSS to hide/show based on state
  return (
    <>
      <div className="hero-spacer" />
      
      <section className="hero">

      {/* <section className={`hero ${!isMounted || !animationReady ? 'hero-hidden' : 'hero-visible'}`}> */}
        {/* Background Slider */}
        <div className="hero-slider">
          {isFirstLoad ? (
            <motion.div
              key={`first-${currentSlide}`}
              className="hero-slider-image active"
              style={{ backgroundImage: `url(${heroImages[currentSlide]})` }}
              initial="hidden"
              animate={isMounted && animationReady ? "visible" : "hidden"}
              variants={shatterVariants}
            />
          ) : (
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={currentSlide}
                className="hero-slider-image active"
                style={{ backgroundImage: `url(${heroImages[currentSlide]})` }}
                variants={sliderVariants}
                initial="enter"
                animate="center"
                exit="exit"
              />
            </AnimatePresence>
          )}
        </div>

        {/* Overlay */}
        <motion.div 
          className="hero-overlay"
          style={{ opacity: overlayOpacity }}
          initial={{ opacity: 0 }}
          animate={isMounted && animationReady ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        />

        {/* Content */}
        <div className="container2">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={startAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
     
<motion.h1 className="hero-title">
  <motion.span
    className="hero-eyebrow"
    initial={{ opacity: 0, y: 20 }}
    animate={startAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
    transition={{
      delay: 0.8,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    }}
  >
    Precision metal fabrication
  </motion.span>

  {/* ALL TITLE TEXT WITH METAL IMAGE */}
  <span
    className="hero-title-clip"
    style={{ '--title-image': `url(${titleImage})` }}
  >
    <AnimatedTitle 
      text="The Industrial Standard in Architectural Metalwork" 
      startDelay={0.9}
    />
  </span>
</motion.h1>      
            <motion.p 
              className="hero-subtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={startAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 2.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              From structural steel to laser-cut screens, we shape raw metal into parts that fit right, hold strong, and last for years.
            </motion.p>
            
            <motion.div 
              className="hero-buttons"
              initial={{ opacity: 0, y: 30 }}
              animate={startAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 2.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <a href="/consultation" className="btn btn-blue hero-primary-btn">
                Send Your Drawings <ArrowRight size={16} />
              </a>
              <a href="/capabilities" className="btn btn-outline-light hero-secondary-btn">
                Our Capabilites
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Slider Dots */}
        {heroImages.length > 1 && (
          <motion.div 
            className="hero-dots"
            style={{ opacity: dotsOpacity }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5, duration: 0.5 }}
          >
            {heroImages.map((_, index) => (
              <button
                key={index}
                className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </motion.div>
        )}
      </section>
    </>
  )
}

export default Hero