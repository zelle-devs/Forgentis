'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import './Hero.css'

const Hero = () => {
  const heroImages = [
    '/forgentis.jpeg', 
    // '/hero1.jpeg', 
  ]

  // Title ke liye alag image
  const titleImage = '/title-bg.png' // Yahan apni title image ka path daalein

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isFirstLoad, setIsFirstLoad] = useState(true)

  // Scroll-based shrink effect
  const { scrollY } = useScroll()
  
  // Hero content shrink as user scrolls
  const contentScale = useTransform(scrollY, [0, 500], [1, 0.6])
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const contentY = useTransform(scrollY, [0, 500], [0, -100])
  
  // Video box fades out
  const videoOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const videoX = useTransform(scrollY, [0, 300], [0, 50])
  
  // Dots fade out
  const dotsOpacity = useTransform(scrollY, [0, 300], [1, 0])
  
  // Overlay - Base gradient always visible, scroll par aur dark
  const overlayOpacity = useTransform(scrollY, [0, 500], [1, 1.5])

  // Auto-play logic - Forward only
  useEffect(() => {
    if (heroImages.length <= 1) {
      setIsAutoPlaying(false)
      return
    }

    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, heroImages.length])

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }, [])

  // First load ke baad shatter animation band
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFirstLoad(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  // Slider variants - Forward direction only
  const sliderVariants = {
    enter: {
      x: '100%',
    },
    center: {
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      x: '-100%',
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

  return (
    <>
      <div className="hero-spacer" />
      
      <section className="hero">
        {/* Background Slider - Forward only window slide */}
        <div className="hero-slider">
          {isFirstLoad ? (
            // First load - Shatter effect
            <motion.div
              key={`first-${currentSlide}`}
              className="hero-slider-image active"
              style={{ backgroundImage: `url(${heroImages[currentSlide]})` }}
              initial="hidden"
              animate="visible"
              variants={shatterVariants}
            />
          ) : (
            // Normal slider - Forward only
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

        {/* Overlay - Hamesha visible, scroll par aur dark */}
        <motion.div 
          className="hero-overlay"
          style={{ opacity: overlayOpacity }}
        />

        {/* Content - Shrinks on scroll */}
        <div className="container2">
          <motion.div 
            className="hero-content"
            // style={{ 
            //   scale: contentScale,
            //   opacity: contentOpacity,
            //   y: contentY,
            // }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
                <motion.span 
    className="hero-eyebrow"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  >
    Precision metal fabrication
  </motion.span>

              <span className="hero-title-text">The</span>{' '}
              <span 
                className="hero-title-clip"
                style={{ backgroundImage: `url(${titleImage})` }}
              >
                Industrial Standard in Architectural Metalwork.
              </span>{' '}
            </motion.h1>
            
            <motion.p 
              className="hero-subtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              From structural steel to laser-cut screens, we shape raw metal into parts that fit right, hold strong, and last for years.
            </motion.p>
            
            <motion.div 
              className="hero-buttons"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <a href="/contact" className="btn btn-blue hero-primary-btn">
                Send Your Drawings <ArrowRight size={16} />
              </a>
              <a href="/companies" className="btn btn-outline-light hero-secondary-btn">
                See Our Work
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Slider Dots - Fade on scroll */}
        {heroImages.length > 1 && (
          <motion.div 
            className="hero-dots"
            style={{ opacity: dotsOpacity }}
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