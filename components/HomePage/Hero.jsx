'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
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
        className="hero"
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
                // initial={{
                //   opacity: 1,
                //   filter: 'blur(0px)',
                //   WebkitMaskImage: 'linear-gradient(to right, black 130%, transparent 150%)',
                //   maskImage: 'linear-gradient(to right, black 130%, transparent 150%)'
                // }}
                // animate={{
                //   opacity: 1,
                //   filter: 'blur(16px)',
                //   WebkitMaskImage: 'linear-gradient(to right, black -30%, transparent -10%)',
                //   maskImage: 'linear-gradient(to right, black -30%, transparent -10%)',
                //   transition: {
                //     duration: 1.6,
                //     ease: [0.65, 0, 0.35, 1]
                //   }
                // }}


//                 initial={{
//   opacity: 1,
//   filter: 'blur(0px)',
//   WebkitMaskImage: 'linear-gradient(to right, black 130%, transparent 150%)',
//   maskImage: 'linear-gradient(to right, black 130%, transparent 150%)'
// }}
// animate={{
//   opacity: 1,
//   filter: 'blur(20px) url(#water-wave)',
//   WebkitMaskImage: 'linear-gradient(to right, black -30%, transparent -10%)',
//   maskImage: 'linear-gradient(to right, black -30%, transparent -10%)',
//   transition: {
//     duration: 1.9,
//     ease: [0.45, 0, 0.2, 1]
//   }
// }}
     
initial={{
  opacity: 1,
  filter: 'blur(0px)',
  // WebkitMaskImage: `linear-gradient(to ${slideDirection === 'next' ? 'right' : 'left'}, black 130%, transparent 150%)`,
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
  // filter: 'blur(20px) url(#water-wave)',
  filter: 'blur(24px) url(#water-wave)',
  // WebkitMaskImage: `linear-gradient(to ${slideDirection === 'next' ? 'right' : 'left'}, black -30%, transparent -10%)`,
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
          </AnimatePresence>
        </div>

        {/* Slider dots */}
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
      </section>
    </>
  )
}

export default Hero

// 'use client'
// import { useState, useEffect, useCallback, useRef } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { ArrowRight } from 'lucide-react'
// import './Hero.css'

// const heroSlides = [
//   {
//     id: 1,
//     desktopImage: '/1d.png',
//     mobileImage: '/1m.png',
//     eyebrow: '',
//     title: 'WE SHAPE WHAT BUILDS',
//     subtitle: 'Precision fabrication for architecture, industry, and everything in between.',
//     primaryBtn: { text: 'Send Your Drawings', href: '/consultation' },
//     secondaryBtn: { text: 'Our Capabilities', href: '/capabilities' }
//   },
//   {
//     id: 2,
//     desktopImage: '/2d.png',
//     mobileImage: '/2m.png',
//     eyebrow: '',
//     title: 'CUT WITH PRECISION',
//     subtitle: 'Laser-cut metal, engineered to fit exactly.',
//     primaryBtn: { text: 'Start Your Project', href: '/consultation' },
//     secondaryBtn: { text: 'View Our Work', href: '/projects' }
//   },
//   {
//     id: 3,
//     desktopImage: '/3d.png',
//     mobileImage: '/3m.png',
//     eyebrow: '',
//     title: 'FROM FLAT TO FORM',
//     subtitle: 'Cut. Bent. Welded. Built into something real.',
//     primaryBtn: { text: 'Get a Quote', href: '/consultation' },
//     secondaryBtn: { text: 'Our Process', href: '/process' }
//   },
//   {
//     id: 4,
//     desktopImage: '/4d.png',
//     mobileImage: '/4m.png',
//     eyebrow: '',
//     title: 'BUILT FOR MORE THAN ONE PURPOSE',
//     subtitle: 'From architectural screens to structural steel.',
//     primaryBtn: { text: 'Send Your Drawings', href: '/consultation' },
//     secondaryBtn: { text: 'Our Capabilities', href: '/capabilities' }
//   },
//   {
//     id: 5,
//     desktopImage: '/5d.png',
//     mobileImage: '/5m.png',
//     eyebrow: '',
//     title: 'MADE TO YOUR DRAWING',
//     subtitle: 'Your specification in. Precision fabrication out.',
//     primaryBtn: { text: 'Start Your Project', href: '/consultation' },
//     secondaryBtn: { text: 'View Our Work', href: '/projects' }
//   },
//   {
//     id: 6,
//     desktopImage: '/6d.png',
//     mobileImage: '/6m.png',
//     eyebrow: '',
//     title: 'MAKE IT IN METAL',
//     subtitle: "Bring us the idea. We'll build the precision behind it.",
//     primaryBtn: { text: 'Send Your Drawings', href: '/consultation' },
//     secondaryBtn: { text: 'Our Capabilities', href: '/capabilities' }
//   }
// ]

// const Hero = () => {
//   const [currentSlide, setCurrentSlide] = useState(0)
//   const [slideDirection, setSlideDirection] = useState('next')
//   const [animationPhase, setAnimationPhase] = useState('contentIn')
//   const [isMobile, setIsMobile] = useState(false)
//   const [travelX, setTravelX] = useState(1200)
//   const touchStartX = useRef(0)
//   const touchStartY = useRef(0)
//   const slideChangeLock = useRef(false)
//   const titleImage = '/optimize/title-bg.webp'
//   const [outgoingSlide, setOutgoingSlide] = useState(null)
//   // Shared jelly spring — same tuning as parent content bounce.
// // Reuse this constant everywhere so all pieces feel consistent.
// const jellySpring = { type: 'spring', stiffness: 50, damping: 10, mass: 1.3 }

//   useEffect(() => {
//     const checkViewport = () => {
//       setIsMobile(window.innerWidth <= 768)
//       setTravelX(window.innerWidth)
//     }
//     checkViewport()
//     window.addEventListener('resize', checkViewport)

//     const img = new Image()
//     img.src = titleImage
//     img.onerror = () => console.error('Title image not found:', titleImage)

//     return () => {
//       window.removeEventListener('resize', checkViewport)
//     }
//   }, [])

//   const changeSlide = useCallback((direction) => {
//   if (slideChangeLock.current) return

//   slideChangeLock.current = true
//   setSlideDirection(direction)

//   // Current image ko outgoing image ke taur par save karo
//   setOutgoingSlide(currentSlide)
//   setAnimationPhase('contentOut')

//   const newIndex =
//     direction === 'next'
//       ? (currentSlide + 1) % heroSlides.length
//       : (currentSlide - 1 + heroSlides.length) % heroSlides.length

//   // New slide thori der baad load hogi
//   setTimeout(() => {
//     setCurrentSlide(newIndex)
//     setAnimationPhase('imageIn')
//   }, 900)

//   setTimeout(() => {
//     setAnimationPhase('contentIn')
//   }, 1500)

//   setTimeout(() => {
//     setOutgoingSlide(null)
//     slideChangeLock.current = false
//   }, 2300)
// }, [currentSlide])

//   useEffect(() => {
//     const handleHeroNavigation = (e) => {
//       if (e.detail === 'next') {
//         changeSlide('next')
//       } else if (e.detail === 'prev') {
//         changeSlide('prev')
//       }
//     }
    
//     window.addEventListener('heroNavigation', handleHeroNavigation)
//     return () => window.removeEventListener('heroNavigation', handleHeroNavigation)
//   }, [changeSlide])

//   useEffect(() => {
//     window.dispatchEvent(new CustomEvent('heroSlideChange', { 
//       detail: currentSlide 
//     }))
//   }, [currentSlide])

//   const handleTouchStart = (e) => {
//     touchStartX.current = e.touches[0].clientX
//     touchStartY.current = e.touches[0].clientY
//   }

//   const handleTouchEnd = (e) => {
//     const deltaX = e.changedTouches[0].clientX - touchStartX.current
//     const deltaY = e.changedTouches[0].clientY - touchStartY.current
    
//     if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
//       if (deltaX > 0) changeSlide('prev')
//       else changeSlide('next')
//     }
//   }

//   const currentHeroData = heroSlides[currentSlide]

//   // Content always enters from the right, overshoots past its resting
//   // position (feels like it hits the left edge), then springs back — jelly feel
//   const contentVariants = {
//     contentOut: {
//       x: slideDirection === 'next' ? -200 : 200,
//       opacity: 0,
//       transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
//     },
//     imageIn: {
//       x: travelX,
//       opacity: 0,
//       transition: { duration: 0.1 }
//     },
//     contentIn: {
//       x: 0,
//       opacity: 1,
//       transition: {
//         // x: { type: 'spring', duration: 1.1, bounce: 0.45 },
//         // x: { type: 'spring', duration: 1.3, bounce: 0.35 },
//         // x: { type: 'spring', stiffness: 60, damping: 10, mass: 1.2 },
//         // x: { type: 'spring', stiffness: 45, damping: 9, mass: 1.5 },
//         x: { type: 'spring', stiffness: 50, damping: 10, mass: 1.3 },
//         opacity: { duration: 0.3, ease: 'easeOut' }
//       }
//     }
//   }

//   const imageVariants = {
//     contentOut: {
//       x: 0,
//       opacity: 1,
//       scale: 1,
//       transition: { duration: 0.4 }
//     },
//     imageIn: {
//       x: 0,
//       opacity: 1,
//       scale: 1,
//       transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
//     },
//     contentIn: {
//       x: 0,
//       opacity: 1,
//       scale: 1,
//       transition: { duration: 0.5 }
//     }
//   }

//   return (
//     <>
//       {/* <div className="hero-spacer" /> */}
      
//       <section 
//         className="hero"
//         onTouchStart={handleTouchStart}
//         onTouchEnd={handleTouchEnd}
//       >

// {/* <div className="hero-slider">
//   <motion.div
//     key={`bg-${currentSlide}`}
//     className="hero-slider-image active"
//     style={{ 
//       backgroundImage: `url(${isMobile ? currentHeroData.mobileImage : currentHeroData.desktopImage})`,
//       zIndex: 1
//     }}
//     initial={{ opacity: 0 }}
//     animate={{ 
//       opacity: 1,
//       scale: 1,
//       transition: { duration: 1, ease: 'easeOut' }
//     }}
//     exit={{ 
//       opacity: 0,
//       transition: { duration: 0.8, ease: 'easeInOut' }
//     }}
//   />

//   <AnimatePresence>
//     {animationPhase === 'contentOut' && (
//       <motion.div
//         key={`smoke-${currentSlide}`}
//         className="hero-slider-image"
//         style={{ 
//           backgroundImage: `url(${isMobile ? currentHeroData.mobileImage : currentHeroData.desktopImage})`,
//           zIndex: 2,
//           opacity: 1
//         }}
//         initial={{
//   opacity: 1,
//   filter: 'blur(0px)',
//   scale: 1,
//   WebkitMaskImage:
//     'linear-gradient(to right, black 0%, black 20%, black 40%, transparent 50%, transparent 60%, transparent 80%, transparent 100%)',
//   maskImage:
//     'linear-gradient(to right, black 0%, black 20%, black 40%, transparent 50%, transparent 60%, transparent 80%, transparent 100%)'
// }}
// animate={{
//   opacity: 0,
//   filter: 'blur(30px)',
//   scale: 1.1,
//   WebkitMaskImage:
//     'linear-gradient(to right, transparent 0%, transparent 20%, transparent 40%, black 60%, black 80%, black 100%)',
//   maskImage:
//     'linear-gradient(to right, transparent 0%, transparent 20%, transparent 40%, black 60%, black 80%, black 100%)',
//   transition: {
//     duration: 1.5,
//     ease: [0.22, 1, 0.36, 1],
//     opacity: { duration: 1.2, ease: 'easeInOut' },
//     filter: { duration: 1.5, ease: 'easeInOut' }
//   }
// }}
//       />
//     )}
//   </AnimatePresence>
// </div> */}
// <div className="hero-slider">

//   {/* NEW IMAGE */}
//   <motion.div
//     key={`new-${currentSlide}`}
//     className="hero-slider-image hero-new-image"
//     style={{
//       backgroundImage: `url(${
//         isMobile
//           ? currentHeroData.mobileImage
//           : currentHeroData.desktopImage
//       })`,
//       zIndex: 1
//     }}
//     initial={{
//       opacity: 1,
//       filter: 'blur(18px)',
//       scale: 1.03,

//       WebkitMaskImage:
//         'linear-gradient(to right, transparent 0%, transparent 55%, black 78%, black 100%)',
//       maskImage:
//         'linear-gradient(to right, transparent 0%, transparent 55%, black 78%, black 100%)'
//     }}
//     animate={{
//       filter: 'blur(0px)',
//       scale: 1,

//       WebkitMaskImage:
//         'linear-gradient(to right, black 0%, black 100%)',
//       maskImage:
//         'linear-gradient(to right, black 0%, black 100%)',

//       transition: {
//         duration: 2,
//         ease: [0.22, 1, 0.36, 1],
//         filter: {
//           duration: 1.8,
//           ease: 'easeOut'
//         },
//         scale: {
//           duration: 2,
//           ease: 'easeOut'
//         }
//       }
//     }}
//   />

//   {/* OLD IMAGE — RIGHT TO LEFT WIPE */}
//   <AnimatePresence>
//     {outgoingSlide !== null && (
//       <motion.div
//         key={`old-${outgoingSlide}`}
//         className="hero-slider-image hero-old-image"
//         style={{
//           backgroundImage: `url(${
//             isMobile
//               ? heroSlides[outgoingSlide].mobileImage
//               : heroSlides[outgoingSlide].desktopImage
//           })`,
//           zIndex: 2
//         }}
//         initial={{
//           opacity: 1,
//           filter: 'blur(0px)',

//           WebkitMaskImage:
//             'linear-gradient(to right, black 0%, black 100%)',
//           maskImage:
//             'linear-gradient(to right, black 0%, black 100%)'
//         }}
//         animate={{
//           opacity: 0.15,
//           filter: 'blur(8px)',

//           WebkitMaskImage: [
//             'linear-gradient(to right, black 0%, black 78%, rgba(0,0,0,.85) 86%, transparent 100%)',

//             'linear-gradient(to right, black 0%, black 55%, rgba(0,0,0,.8) 65%, transparent 78%, transparent 100%)',

//             'linear-gradient(to right, black 0%, black 28%, rgba(0,0,0,.65) 38%, transparent 52%, transparent 100%)',

//             'linear-gradient(to right, transparent 0%, transparent 100%)'
//           ],

//           maskImage: [
//             'linear-gradient(to right, black 0%, black 78%, rgba(0,0,0,.85) 86%, transparent 100%)',

//             'linear-gradient(to right, black 0%, black 55%, rgba(0,0,0,.8) 65%, transparent 78%, transparent 100%)',

//             'linear-gradient(to right, black 0%, black 28%, rgba(0,0,0,.65) 38%, transparent 52%, transparent 100%)',

//             'linear-gradient(to right, transparent 0%, transparent 100%)'
//           ],

//           transition: {
//             duration: 2,
//             ease: 'linear',

//             opacity: {
//               duration: 1.8,
//               ease: 'linear'
//             },

//             filter: {
//               duration: 1.6,
//               ease: 'easeOut'
//             },

//             WebkitMaskImage: {
//               duration: 2,
//               ease: 'linear'
//             },

//             maskImage: {
//               duration: 2,
//               ease: 'linear'
//             }
//           }
//         }}
//       />
//     )}
//   </AnimatePresence>

//   {/* SOFT WATER / FOG EDGE */}
//   <AnimatePresence>
//     {outgoingSlide !== null && (
//       <motion.div
//         key={`fog-${outgoingSlide}`}
//         className="hero-wipe-fog"
//         initial={{
//           x: '100%',
//           opacity: 0
//         }}
//         animate={{
//           x: '-100%',
//           opacity: [0, 0.45, 0.5, 0],
//           transition: {
//             duration: 2,
//             ease: 'linear',
//             opacity: {
//               duration: 2,
//               times: [0, 0.25, 0.65, 1],
//               ease: 'easeInOut'
//             }
//           }
//         }}
//       />
//     )}
//   </AnimatePresence>

// </div>


//         <div className="hero-overlay" />

//         <div className="container2">
//           <AnimatePresence mode="wait">
//             <motion.div 
//               key={currentSlide}
//               className="hero-content"
//               variants={contentVariants}
//               initial={{ x: travelX, opacity: 0 }}
//               animate={animationPhase}
//               exit={{ 
//                 x: slideDirection === 'next' ? -200 : 200, 
//                 opacity: 0,
//                 transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
//               }}
//             >
//               <motion.h1 className="hero-title">
//                 <motion.span
//                   className="hero-eyebrow"
//                   initial={{ opacity: 0, x: 100 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
//                 >
//                   {currentHeroData.eyebrow}
//                 </motion.span>

//                 <span 
//                   className="hero-title-clip"
//                   style={{ '--title-image': `url(${titleImage})` }}
//                 >
//                   <span
//                     className="hero-title-plain"
//                     style={{
//                       backgroundImage: `url(${titleImage})`,
//                       backgroundSize: 'cover',
//                       backgroundPosition: 'center',
//                       backgroundRepeat: 'no-repeat',
//                       WebkitBackgroundClip: 'text',
//                       backgroundClip: 'text',
//                       color: 'transparent',
//                       WebkitTextFillColor: 'transparent',
//                     }}
//                   >
//                     {currentHeroData.title}
//                   </span>
//                 </span>
//               </motion.h1>
// <motion.p 
//   className="hero-subtitle"
//   initial={{ opacity: 0, x: 150 }}
//   animate={{ opacity: 1, x: 0 }}
//   transition={{
//     x: { ...jellySpring, delay: 0.15 },
//     opacity: { duration: 0.35, ease: 'easeOut', delay: 0.15 }
//   }}
// >
//   {currentHeroData.subtitle}
// </motion.p>

// <motion.div 
//   className="hero-buttons"
//   initial={{ opacity: 0, x: 150 }}
//   animate={{ opacity: 1, x: 0 }}
//   transition={{
//     x: { ...jellySpring, delay: 0.3 },
//     opacity: { duration: 0.35, ease: 'easeOut', delay: 0.3 }
//   }}
// >
//   <a href={currentHeroData.primaryBtn.href} className="btn btn-blue hero-primary-btn">
//     {currentHeroData.primaryBtn.text} <ArrowRight size={16} />
//   </a>
//   <a href={currentHeroData.secondaryBtn.href} className="btn btn-outline-light hero-secondary-btn">
//     {currentHeroData.secondaryBtn.text}
//   </a>
// </motion.div>
//             </motion.div>
//           </AnimatePresence>
//         </div>

//         {/* Slider dots */}
//         <div className="hero-dots">
//           {heroSlides.map((_, index) => (
//             <button
//               key={index}
//               className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
//               onClick={() => {
//                 if (index === currentSlide) return

//                 slideChangeLock.current = false
//                 const direction = index > currentSlide ? 'next' : 'prev'
//                 setSlideDirection(direction)
//                 setAnimationPhase('contentOut')

//                 setTimeout(() => {
//                   setCurrentSlide(index)
//                   window.dispatchEvent(new CustomEvent('heroSlideChange', { 
//                     detail: index 
//                   }))
//                   setAnimationPhase('imageIn')
//                 }, 400)

//                 setTimeout(() => {
//                   setAnimationPhase('contentIn')
//                 }, 900)

//                 setTimeout(() => {
//                   slideChangeLock.current = false
//                 }, 1600)
//               }}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       </section>
//     </>
//   )
// }

// export default Hero
