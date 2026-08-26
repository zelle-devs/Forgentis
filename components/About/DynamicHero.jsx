'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import './DynamicHero.css'

const AnimatedTitle = ({ text, className = '' }) => {
  const words = text.split(' ');

  return (
    <span className={`dhero-title-animated ${className}`}>
      {words.map((word, wordIndex) => (
        <span className="dhero-title-word" key={`${word}-${wordIndex}`}>
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={`${char}-${charIndex}`}
              className="dhero-title-letter"
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
                duration: 0.8,
                delay: 1.2 + (wordIndex * 0.2) + (charIndex * 0.04),
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {char}
            </motion.span>
          ))}
          {wordIndex < words.length - 1 && (
            <span className="dhero-title-space">&nbsp;</span>
          )}
        </span>
      ))}
    </span>
  );
};

export default function DynamicHero({
  eyebrow = '',
  headline = '',
  subhead = '',
  body = '',
  primaryButtonText = '',
  primaryButtonLink = '',
  secondaryButtonText = '',
  secondaryButtonLink = '',
  heroImages = [],
  titleImage = '',
  rightImage = '',
  rightImageAlt = 'Hero Image',
  backgroundColor = 'var(--color-black)',
  showRightImage = false,
}) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isFirstLoad, setIsFirstLoad] = useState(true)

  const hasMultipleImages = heroImages.length > 1

  useEffect(() => {
    if (!hasMultipleImages) {
      setIsAutoPlaying(false)
      return
    }
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, heroImages.length, hasMultipleImages])

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFirstLoad(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const sliderVariants = {
    enter: { x: '100%' },
    center: { x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
    exit: { x: '-100%', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  }

  const shatterVariants = {
    hidden: { y: '-100%', opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
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

  const words = headline ? headline.split(' ') : []
  const middleIndex = Math.ceil(words.length / 2)
  const firstHalf = words.slice(0, middleIndex).join(' ')
  const secondHalf = words.slice(middleIndex).join(' ')

  return (
    <div className='hero-spacer'>
    <section className="dhero" style={{ backgroundColor }}>
      {/* Background Slider */}
      {hasMultipleImages && (
        <div className="dhero-slider">
          {isFirstLoad ? (
            <motion.div
              key={`first-${currentSlide}`}
              className="dhero-slider-image active"
              style={{ backgroundImage: `url(${heroImages[currentSlide]})` }}
              initial="hidden"
              animate="visible"
              variants={shatterVariants}
            />
          ) : (
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={currentSlide}
                className="dhero-slider-image active"
                style={{ backgroundImage: `url(${heroImages[currentSlide]})` }}
                variants={sliderVariants}
                initial="enter"
                animate="center"
                exit="exit"
              />
            </AnimatePresence>
          )}
        </div>
      )}

      {/* Single image background */}
      {heroImages.length === 1 && (
        <div 
          className="dhero-single-image"
          style={{ backgroundImage: `url(${heroImages[0]})` }}
        />
      )}

      {/* Overlay */}
      <div className="dhero-overlay" />

      {/* Content */}
      <div className="container2">
        <div className={`dhero-wrapper ${showRightImage ? 'has-image' : ''}`}>
          {/* Left Content */}
          <motion.div
            className="dhero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* Eyebrow */}
            {eyebrow && (
              <motion.span
                className="dhero-eyebrow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {eyebrow}
              </motion.span>
            )}

            {/* Headline */}
            {headline && (
              <motion.h1 className="dhero-title" initial={{ opacity: 1 }} animate={{ opacity: 1 }}>
                <span className="dhero-title-line">
                  <AnimatedTitle text={firstHalf} className="dhero-title-white" />
                </span>{' '}
                {secondHalf && (
                  <span className="dhero-title-clip" style={{ '--title-image': `url(${titleImage})` }}>
                    <AnimatedTitle text={secondHalf} />
                  </span>
                )}
              </motion.h1>
            )}

            {/* Subhead */}
            {subhead && (
              <motion.p
                className="dhero-subhead"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {subhead}
              </motion.p>
            )}

            {/* Body */}
            {body && (
              <motion.p
                className="dhero-body"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {body}
              </motion.p>
            )}

            {/* Buttons - sirf tab show jab text ho */}
            {(primaryButtonText || secondaryButtonText) && (
              <motion.div
                className="dhero-buttons"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {primaryButtonText && (
                  <a href={primaryButtonLink} className="btn btn-blue dhero-primary-btn">
                    {primaryButtonText} <ArrowRight size={16} />
                  </a>
                )}
                {secondaryButtonText && (
                  <a href={secondaryButtonLink} className="btn btn-outline-light dhero-secondary-btn">
                    {secondaryButtonText}
                  </a>
                )}
              </motion.div>
            )}
          </motion.div>

          {/* Right Image Container */}
          {showRightImage && rightImage && (
            <motion.div
              className="dhero-right-image"
              initial={{ opacity: 0, x: 40, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="dhero-image-container">
                <Image
                  src={rightImage}
                  alt={rightImageAlt}
                  fill
                  priority
                  unoptimized={true}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="dhero-image"
                />
                {/* Decorative border */}
                <div className="dhero-image-border" />
                {/* Blue accent corner */}
                <div className="dhero-image-accent" />
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Dots */}
      {hasMultipleImages && (
        <div className="dhero-dots">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`dhero-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
    </div>
  )
}