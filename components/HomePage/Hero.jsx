'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowDown } from 'lucide-react'
import './Hero.css'

const heroSlides = [
  {
    id: 1,
    desktopImage: '/optimize/1d.webp',
    mobileImage: '/optimize/1m.webp',
    eyebrow: '',
    title: 'WE SHAPE WHAT BUILDS',
    subtitle: 'Precision fabrication for architecture, industry, and everything in between.',
    primaryBtn: { text: 'Send Your Drawings', href: '/consultation' },
    secondaryBtn: { text: 'Our Capabilities', href: '/capabilities' }
  },
  {
    id: 2,
    desktopImage: '/optimize/2d.webp',
    mobileImage: '/optimize/2m.webp',
    eyebrow: '',
    title: 'CUT WITH PRECISION',
    subtitle: 'Laser-cut metal, engineered to fit exactly.',
    primaryBtn: { text: 'Start Your Project', href: '/consultation' },
    secondaryBtn: { text: 'View Our Work', href: '/projects' }
  },
  {
    id: 3,
    desktopImage: '/optimize/3d.webp',
    mobileImage: '/optimize/3m.webp',
    eyebrow: '',
    title: 'FROM FLAT TO FORM',
    subtitle: 'Cut. Bent. Welded. Built into something real.',
    primaryBtn: { text: 'Get a Quote', href: '/consultation' },
    secondaryBtn: { text: 'Our Process', href: '/process' }
  },
  {
    id: 4,
    desktopImage: '/optimize/4d.webp',
    mobileImage: '/optimize/4m.webp',
    eyebrow: '',
    title: 'BUILT FOR MORE THAN ONE PURPOSE',
    subtitle: 'From architectural screens to structural steel.',
    primaryBtn: { text: 'Send Your Drawings', href: '/consultation' },
    secondaryBtn: { text: 'Our Capabilities', href: '/capabilities' }
  },
  {
    id: 5,
    desktopImage: '/optimize/5d.webp',
    mobileImage: '/optimize/5m.webp',
    eyebrow: '',
    title: 'MADE TO YOUR DRAWING',
    subtitle: 'Your specification in. Precision fabrication out.',
    primaryBtn: { text: 'Start Your Project', href: '/consultation' },
    secondaryBtn: { text: 'View Our Work', href: '/projects' }
  },
  {
    id: 6,
    desktopImage: '/optimize/6d.webp',
    mobileImage: '/optimize/6m.webp',
    eyebrow: '',
    title: 'MAKE IT IN METAL',
    subtitle: "Bring us the idea. We'll build the precision behind it.",
    primaryBtn: { text: 'Send Your Drawings', href: '/consultation' },
    secondaryBtn: { text: 'Our Capabilities', href: '/capabilities' }
  }
]

// Shared jelly spring — same tuning as parent content bounce.
const jellySpring = { type: 'spring', stiffness: 50, damping: 10, mass: 1.3 }

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slideDirection, setSlideDirection] = useState('next')
  const [animationPhase, setAnimationPhase] = useState('contentIn')
  const [isMobile, setIsMobile] = useState(false)
  const [travelX, setTravelX] = useState(1200)
  const [outgoingSlide, setOutgoingSlide] = useState(null)
  const [introComplete, setIntroComplete] = useState(false) // NEW: Track intro completion
  const [heroVisible, setHeroVisible] = useState(false) // NEW: Control hero visibility
  
  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const slideChangeLock = useRef(false)
  const titleImage = '/optimize/title-bg.webp'

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth <= 768)
      setTravelX(window.innerWidth)
    }
    checkViewport()
    window.addEventListener('resize', checkViewport)

    const img = new Image()
    img.src = titleImage
    img.onerror = () => console.error('Title image not found:', titleImage)

    return () => {
      window.removeEventListener('resize', checkViewport)
    }
  }, [])

  // NEW: Listen for intro completion event
    // NEW: Listen for intro completion event
  useEffect(() => {
    const handleIntroComplete = () => {
      setIntroComplete(true)
      
      // Slight delay to sync with website reveal animation
      setTimeout(() => {
        setHeroVisible(true)
        
        // Dispatch event that hero content is ready
        window.dispatchEvent(new CustomEvent('heroContentReady'))
      }, 400) // Adjust this to match your website slide-up duration
    }

    // Check if intro already played (sessionStorage)
    const introAlreadyPlayed = () => {
      try {
        return window.sessionStorage.getItem("forgentis_intro_shown") === "false"
      } catch (err) {
        return true
      }
    }

    // If intro already played, show hero immediately
    if (introAlreadyPlayed()) {
      setIntroComplete(true)
      setHeroVisible(true)
      
      // Dispatch event after slight delay for content animation
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('heroContentReady'))
      }, 800) // Give time for hero content animation to complete
    } else {
      // Listen for intro completion event
      window.addEventListener("welcomeAnimationComplete", handleIntroComplete)
    }

    return () => {
      window.removeEventListener("welcomeAnimationComplete", handleIntroComplete)
    }
  }, [])

  const changeSlide = useCallback((direction) => {
    if (slideChangeLock.current) return
    slideChangeLock.current = true

    setSlideDirection(direction)

    const previousIndex = currentSlide
    const newIndex =
      direction === 'next'
        ? (currentSlide + 1) % heroSlides.length
        : (currentSlide - 1 + heroSlides.length) % heroSlides.length

    // New image ko turant base/background bana do — ye "peeche" wait kar raha hoga
    setOutgoingSlide(previousIndex)
    setCurrentSlide(newIndex)
    window.dispatchEvent(new CustomEvent('heroSlideChange', { detail: newIndex }))

    setAnimationPhase('contentOut')

    setTimeout(() => {
      setAnimationPhase('imageIn')
    }, 500)

    setTimeout(() => {
      setAnimationPhase('contentIn')
    }, 1100)

    setTimeout(() => {
      // Smoke wipe khatam hone ke baad old layer hata do
      setOutgoingSlide(null)
      slideChangeLock.current = false
    }, 1800)
  }, [currentSlide])

  useEffect(() => {
    const handleHeroNavigation = (e) => {
      if (e.detail === 'next') {
        changeSlide('next')
      } else if (e.detail === 'prev') {
        changeSlide('prev')
      }
    }
    
    window.addEventListener('heroNavigation', handleHeroNavigation)
    return () => window.removeEventListener('heroNavigation', handleHeroNavigation)
  }, [changeSlide])

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current
    const deltaY = e.changedTouches[0].clientY - touchStartY.current
    
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0) changeSlide('prev')
      else changeSlide('next')
    }
  }

  const currentHeroData = heroSlides[currentSlide]

  // Content always enters from the right, overshoots past its resting
  // position (feels like it hits the left edge), then springs back — jelly feel
  const contentVariants = {
    contentOut: {
      x: slideDirection === 'next' ? -200 : 200,
      opacity: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    },
    imageIn: {
      x: travelX,
      opacity: 0,
      transition: { duration: 0.1 }
    },
    contentIn: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 50, damping: 10, mass: 1.3 },
        opacity: { duration: 0.3, ease: 'easeOut' }
      }
    }
  }

  return (
    <>
      <section 
        className={`hero ${heroVisible ? 'hero-visible' : 'hero-hidden'}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >

        <svg width="0" height="0" style={{ position: 'absolute' }}>
  
  <filter id="water-wave">
  {/* <feTurbulence
    type="turbulence"
    baseFrequency="0.02 0.09"
    numOctaves="3"
    seed="7"
    result="noise"
  />
  <feDisplacementMap
    in="SourceGraphic"
    in2="noise"
    scale="85"
    xChannelSelector="R"
    yChannelSelector="G"
  /> */}
  <feTurbulence
  type="fractalNoise"
  baseFrequency="0.008 0.045"
  numOctaves="3"
  seed="17"
  result="noise"
/>

<feDisplacementMap
  in="SourceGraphic"
  in2="noise"
  scale="120"
  xChannelSelector="R"
  yChannelSelector="G"
/>
</filter>
</svg>

        <div className="hero-slider">

          {/* BASE LAYER — naya image hamesha turant yahan maujood hai */}
          <div
            className="hero-slider-image hero-base-image"
            style={{
              backgroundImage: `url(${
                isMobile ? currentHeroData.mobileImage : currentHeroData.desktopImage
              })`,
              zIndex: 1
            }}
          />

          {/* TOP LAYER — purana image smoke ki tarah right-to-left dissolve hoga */}
          <AnimatePresence>
            {outgoingSlide !== null && (
              <motion.div
                key={`old-${outgoingSlide}`}
                className="hero-slider-image hero-old-image"
                style={{
                  backgroundImage: `url(${
                    isMobile
                      ? heroSlides[outgoingSlide].mobileImage
                      : heroSlides[outgoingSlide].desktopImage
                  })`,
                  zIndex: 2
                }}
                initial={{
                  opacity: 1,
                  filter: 'blur(0px)',
                  WebkitMaskImage: [
                    'linear-gradient(92deg, black 0%, black 45%, rgba(0,0,0,.95) 55%, rgba(0,0,0,.55) 64%, transparent 76%, transparent 100%)',
                    'linear-gradient(88deg, black 0%, black 34%, rgba(0,0,0,.85) 47%, rgba(0,0,0,.35) 61%, transparent 72%, transparent 100%)',
                    'linear-gradient(94deg, black 0%, black 24%, rgba(0,0,0,.7) 39%, rgba(0,0,0,.25) 53%, transparent 67%, transparent 100%)',
                    'linear-gradient(90deg, transparent 0%, transparent 100%)'
                  ],
                  maskImage: `linear-gradient(to ${slideDirection === 'next' ? 'right' : 'left'}, black 130%, transparent 150%)`
                }}
                animate={{
                  opacity: 1,
                  filter: 'blur(24px) url(#water-wave)',
                  WebkitMaskImage: [
                    'linear-gradient(92deg, black 0%, black 45%, rgba(0,0,0,.95) 55%, rgba(0,0,0,.55) 64%, transparent 76%, transparent 100%)',
                    'linear-gradient(88deg, black 0%, black 34%, rgba(0,0,0,.85) 47%, rgba(0,0,0,.35) 61%, transparent 72%, transparent 100%)',
                    'linear-gradient(94deg, black 0%, black 24%, rgba(0,0,0,.7) 39%, rgba(0,0,0,.25) 53%, transparent 67%, transparent 100%)',
                    'linear-gradient(90deg, transparent 0%, transparent 100%)'
                  ],
                  maskImage: `linear-gradient(to ${slideDirection === 'next' ? 'right' : 'left'}, black -30%, transparent -10%)`,
                  transition: {
                    duration: 1.9,
                    ease: [0.45, 0, 0.2, 1]
                  }
                }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
              />
            )}
          </AnimatePresence>
        </div>

        <div className="hero-overlay" />

        <div className="container2">
          <AnimatePresence mode="wait">
            {heroVisible && ( // Only render content when hero is visible
              <motion.div 
                key={currentSlide}
                className="hero-content"
                variants={contentVariants}
                initial={{ x: travelX, opacity: 0 }}
                animate={animationPhase}
                exit={{ 
                  x: slideDirection === 'next' ? -200 : 200, 
                  opacity: 0,
                  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
                }}
              >
                <motion.h1 className="hero-title">
                  <motion.span
                    className="hero-eyebrow"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {currentHeroData.eyebrow}
                  </motion.span>

                  <span 
                    className="hero-title-clip"
                    style={{ '--title-image': `url(${titleImage})` }}
                  >
                    <span
                      className="hero-title-plain"
                      style={{
                        backgroundImage: `url(${titleImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {currentHeroData.title}
                    </span>
                  </span>
                </motion.h1>

                <motion.p 
                  className="hero-subtitle"
                  initial={{ opacity: 0, x: 150 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    x: { ...jellySpring, delay: 0.15 },
                    opacity: { duration: 0.35, ease: 'easeOut', delay: 0.15 }
                  }}
                >
                  {currentHeroData.subtitle}
                </motion.p>

                <motion.div 
                  className="hero-buttons"
                  initial={{ opacity: 0, x: 150 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    x: { ...jellySpring, delay: 0.3 },
                    opacity: { duration: 0.35, ease: 'easeOut', delay: 0.3 }
                  }}
                >
                  <a href={currentHeroData.primaryBtn.href} className="btn btn-blue hero-primary-btn">
                    {currentHeroData.primaryBtn.text} <ArrowRight size={16} />
                  </a>
                  <a href={currentHeroData.secondaryBtn.href} className="btn btn-outline-light hero-secondary-btn">
                    {currentHeroData.secondaryBtn.text}
                  </a>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Scroll Down Indicator */}
        {heroVisible && (
          <motion.div
            className="hero-scroll-indicator"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              className="hero-scroll-text"
              animate={{ y: [0, 8, 0] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: 'easeInOut' 
              }}
            >
              SCROLL TO EXPLORE
            </motion.span>
            <motion.div
              className="hero-scroll-icon"
              animate={{ y: [0, 6, 0] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: 'easeInOut' 
              }}
            >
              <ArrowDown size={16} />
            </motion.div>
          </motion.div>
        )}
        
        {/* Slider dots */}
        {heroVisible && (
          <div className="hero-dots">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => {
                  if (index === currentSlide || slideChangeLock.current) return
                  const direction = index > currentSlide ? 'next' : 'prev'
                  changeSlide(direction)
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </section>
    </>
  )
}

export default Hero