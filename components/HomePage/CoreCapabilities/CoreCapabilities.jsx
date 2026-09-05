'use client'
import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import './CoreCapabilities.css'
import Image from 'next/image'

const CoreCapabilities = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' })
  const sliderRef = useRef(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const mouseStartX = useRef(0)
  const mouseEndX = useRef(0)
  const isDragging = useRef(false)
  
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const capabilities = [
    {
      id: 1,
      title: 'Laser & CNC Precision',
      description: 'Laser cutting, 3D pipe cutting, bending and machining held to fine tolerances.',
      image: '/optimize/1.webp'
    },
    {
      id: 2,
      title: 'Structural & Architectural Scope',
      description: 'Entrance screens, cladding, structural framing, furniture bases and decorative metal installations.',
      image: '/optimize/2.webp'
    },
    {
      id: 3,
      title: 'Industrial Finishes',
      description: 'PVD coatings, electrostatic powder coating and brushed or matte stainless, treated for durability.',
      image: '/optimize/3.webp'
    },
    {
      id: 4,
      title: 'Contract-Ready Delivery',
      description: 'CAD shop-drawing approvals, certified materials and scalable production to schedule.',
      image: '/optimize/4.webp'
    }
  ]

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % capabilities.length)
  }, [capabilities.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + capabilities.length) % capabilities.length)
  }, [capabilities.length])

  // Auto-play
  useEffect(() => {
    if (!isMobile || !isAutoPlaying) return

    const interval = setInterval(() => {
      nextSlide()
    }, 3000)

    return () => clearInterval(interval)
  }, [isMobile, isAutoPlaying, nextSlide])

  // Touch Events
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    setIsAutoPlaying(false)
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current
    
    if (Math.abs(swipeDistance) > 50) {
      if (swipeDistance > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }
    
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  // Mouse Drag Events
  const handleMouseDown = (e) => {
    isDragging.current = true
    mouseStartX.current = e.clientX
    setIsAutoPlaying(false)
  }

  const handleMouseMove = (e) => {
    if (isDragging.current) {
      mouseEndX.current = e.clientX
    }
  }

  const handleMouseUp = () => {
    if (isDragging.current) {
      const dragDistance = mouseStartX.current - mouseEndX.current
      
      if (Math.abs(dragDistance) > 50) {
        if (dragDistance > 0) {
          nextSlide()
        } else {
          prevSlide()
        }
      }
      
      isDragging.current = false
      setTimeout(() => setIsAutoPlaying(true), 5000)
    }
  }

  const handleMouseLeave = () => {
    if (isDragging.current) {
      isDragging.current = false
      setTimeout(() => setIsAutoPlaying(true), 5000)
    }
  }

  return (
    <section className="core-capabilities" ref={sectionRef}>
      <div className="core-capabilities-bg">
        <div className="core-capabilities-grid" />
      </div>

      <div className="container2">
        {/* Header Content - Top */}
        <div className="core-capabilities-header">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="core-capabilities-eyebrow">
              Core Capabilities
            </span>
          </motion.div>

          <motion.h2 
            className="core-capabilities-title"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            What We Do Best
          </motion.h2>
        </div>

        {/* Desktop Grid - 4 Cards in One Row */}
        {!isMobile && (
          <div className="core-capabilities-grid">
            {capabilities.map((capability, index) => (
              <motion.div
                key={capability.id}
                className="core-capabilities-card"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.7, 
                  delay: 0.2 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1] 
                }}
              >
                {/* <div 
                  className="core-capabilities-card-bg"
                  style={{ backgroundImage: `url(${capability.image})` }}
                /> */}
                <div className="core-capabilities-card-bg">
  <Image
    src={capability.image}
    alt={capability.title}
    fill
    sizes="(min-width: 1440px) 25vw, (min-width: 1024px) 25vw, 100vw"
    className="core-capabilities-card-image"
  />
</div>
                <div className="core-capabilities-card-overlay" />
                <div className="core-capabilities-card-content">
                  <h3 className="core-capabilities-card-title">
                    {capability.title}
                  </h3>
                  <p className="core-capabilities-card-description">
                    {capability.description}
                  </p>
                  <button className="core-capabilities-card-btn">
                    <ArrowRight size={18} strokeWidth={2} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Mobile/Tablet Slider */}
        {isMobile && (
          <div 
            className="core-capabilities-slider"
            ref={sliderRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            <div 
              className="core-capabilities-slider-track"
              style={{ 
                transform: `translateX(-${currentSlide * 100}%)`,
                transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
              }}
            >
              {capabilities.map((capability) => (
                <div key={capability.id} className="core-capabilities-slider-item">
                  <div className="core-capabilities-card">
                    {/* <div 
                      className="core-capabilities-card-bg"
                      style={{ backgroundImage: `url(${capability.image})` }}
                    /> */}
                    <div className="core-capabilities-card-bg">
  <Image
    src={capability.image}
    alt={capability.title}
    fill
    sizes="(max-width: 1023px) 100vw"
    className="core-capabilities-card-image"
  />
</div>
                    <div className="core-capabilities-card-overlay" />
                    <div className="core-capabilities-card-content">
                      <h3 className="core-capabilities-card-title">
                        {capability.title}
                      </h3>
                      <p className="core-capabilities-card-description">
                        {capability.description}
                      </p>
                      <button className="core-capabilities-card-btn">
                        <ArrowRight size={18} strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Slider Controls */}
            <div className="core-capabilities-slider-controls">
              <button 
                className="core-capabilities-slider-btn"
                onClick={prevSlide}
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="core-capabilities-slider-dots">
                {capabilities.map((_, index) => (
                  <button
                    key={index}
                    className={`core-capabilities-slider-dot ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              <button 
                className="core-capabilities-slider-btn"
                onClick={nextSlide}
                aria-label="Next slide"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* CTA - Below Cards */}
        <motion.div 
          className="core-capabilities-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <a href="/capabilities" className="btn btn-blue core-capabilities-cta-btn">
            View Capabilities <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default CoreCapabilities