'use client'
import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Building2, Layers, Frame, Armchair, PenTool, Sparkles } from 'lucide-react'
import './WhatWeFabricate.css'

const WhatWeFabricate = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' })
  const [hoveredCard, setHoveredCard] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const mouseStartX = useRef(0)
  const mouseEndX = useRef(0)
  const isDragging = useRef(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const fabricateItems = [
    {
      id: 1,
      icon: Building2,
      title: 'Entrance Screens',
      description: 'Facades and cladding for modern architectural projects.',
      image: '/forgentis.jpeg'
    },
    {
      id: 2,
      icon: Layers,
      title: 'Railings & Staircases',
      description: 'Balustrades and structural support systems.',
      image: '/forgentis.jpeg'
    },
    {
      id: 3,
      icon: Frame,
      title: 'Structural Steel',
      description: 'Frames and supports for buildings and infrastructure.',
      image: '/forgentis.jpeg'
    },
    {
      id: 4,
      icon: Armchair,
      title: 'Furniture Bases',
      description: 'Fixtures and fittings for commercial spaces.',
      image: '/forgentis.jpeg'
    },
    {
      id: 5,
      icon: PenTool,
      title: 'Signage & Panels',
      description: 'Decorative metal panels and custom signage.',
      image: '/forgentis.jpeg'
    },
    {
      id: 6,
      icon: Sparkles,
      title: 'Custom Pieces',
      description: 'One-off pieces made to your exact drawing.',
      image: '/forgentis.jpeg'
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % fabricateItems.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + fabricateItems.length) % fabricateItems.length)
  }

  useEffect(() => {
    if (!isMobile || !isAutoPlaying) return
    const interval = setInterval(nextSlide, 3000)
    return () => clearInterval(interval)
  }, [isMobile, isAutoPlaying, currentSlide])

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

  return (
    <section className="what-we-fabricate" ref={sectionRef}>
      <div className="what-we-fabricate-bg">
        <div className="what-we-fabricate-grid" />
      </div>

      <div className="container2">
        <div className="what-we-fabricate-wrapper">
          {/* Left Content - 20% */}
          <div className="what-we-fabricate-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="what-we-fabricate-eyebrow">
                Our Expertise
              </span>
            </motion.div>

            <motion.h2 
              className="what-we-fabricate-title"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              What We Make.
            </motion.h2>

            <motion.div 
              className="what-we-fabricate-divider"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            />

            <motion.p 
              className="what-we-fabricate-body"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              Send us a drawing and we will make it in metal. Common work includes:
            </motion.p>

            <motion.div 
              className="what-we-fabricate-cta"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <a href="/work" className="btn btn-blue what-we-fabricate-btn">
                See Our Work <ArrowRight size={16} />
              </a>
            </motion.div>
          </div>

          {/* Right Cards - 80% */}
          {!isMobile && (
            <div className="what-we-fabricate-cards">
              {fabricateItems.map((item) => (
                <motion.div
                  key={item.id}
                  className={`what-we-fabricate-card ${hoveredCard === item.id ? 'hovered' : ''} ${hoveredCard !== null && hoveredCard !== item.id ? 'shrink' : ''}`}
                  onMouseEnter={() => setHoveredCard(item.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ 
                    duration: 0.7, 
                    delay: 0.2 + item.id * 0.1,
                    ease: [0.22, 1, 0.36, 1] 
                  }}
                >
                  {/* Top 50% - Image */}
                  <div 
                    className="what-we-fabricate-card-image"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  
                  {/* Bottom 50% - Black Content */}
                  <div className="what-we-fabricate-card-content">
                    <item.icon className="what-we-fabricate-card-icon" size={24} strokeWidth={1.5} />
                    <h3 className="what-we-fabricate-card-title">
                      {item.title}
                    </h3>
                    <p className="what-we-fabricate-card-description">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Mobile Slider */}
          {isMobile && (
            <div 
              className="what-we-fabricate-slider"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              <div 
                className="what-we-fabricate-slider-track"
                style={{ 
                  transform: `translateX(-${currentSlide * 100}%)`,
                  transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
                }}
              >
                {fabricateItems.map((item) => (
                  <div key={item.id} className="what-we-fabricate-slider-item">
                    <div className="what-we-fabricate-card">
                      <div 
                        className="what-we-fabricate-card-image"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                      <div className="what-we-fabricate-card-content">
                        <item.icon className="what-we-fabricate-card-icon" size={24} strokeWidth={1.5} />
                        <h3 className="what-we-fabricate-card-title">
                          {item.title}
                        </h3>
                        <p className="what-we-fabricate-card-description">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="what-we-fabricate-slider-controls">
                <button className="what-we-fabricate-slider-btn" onClick={prevSlide}>
                  <ChevronLeft size={20} />
                </button>
                <div className="what-we-fabricate-slider-dots">
                  {fabricateItems.map((_, index) => (
                    <button
                      key={index}
                      className={`what-we-fabricate-slider-dot ${index === currentSlide ? 'active' : ''}`}
                      onClick={() => setCurrentSlide(index)}
                    />
                  ))}
                </div>
                <button className="what-we-fabricate-slider-btn" onClick={nextSlide}>
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default WhatWeFabricate