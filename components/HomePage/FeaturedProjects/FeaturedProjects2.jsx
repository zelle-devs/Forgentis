'use client'
import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import './FeaturedProjects2.css'

const FeaturedProjects2 = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' })
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const mouseStartX = useRef(0)
  const mouseEndX = useRef(0)
  const isDragging = useRef(false)
  
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const projects = [
    {
      id: 1,
      name: 'Project Alpha',
      sector: 'Architecture',
      scope: 'Laser-cut facade screens',
      image: '/optimize/forgentis.webp'
    },
    {
      id: 2,
      name: 'Project Beta',
      sector: 'Construction',
      scope: 'Structural steel staircase',
      image: '/optimize/forgentis.webp'
    },
    {
      id: 3,
      name: 'Project Gamma',
      sector: 'Retail',
      scope: 'Powder-coated shopfront',
      image: '/optimize/forgentis.webp'
    }
  ]

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % projects.length)
  }, [projects.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length)
  }, [projects.length])

  useEffect(() => {
    if (!isMobile || !isAutoPlaying) return
    const interval = setInterval(nextSlide, 3000)
    return () => clearInterval(interval)
  }, [isMobile, isAutoPlaying, nextSlide])

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
    <section className="fpj-section" ref={sectionRef}>
      <div className="fpj-bg">
        <div className="fpj-grid-pattern" />
        <div className="fpj-glow fpj-glow-left" />
        <div className="fpj-glow fpj-glow-right" />
      </div>

      <div className="container2">
        {/* Header */}
        <div className="fpj-header">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="fpj-eyebrow">
              Featured Projects
            </span>
          </motion.div>

          <motion.h2 
            className="fpj-title"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Selected Work.
          </motion.h2>

          <motion.p 
            className="fpj-body"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            A few of the jobs we have delivered. Full case studies on the Projects page.
          </motion.p>
        </div>

        {/* Desktop Grid - 3 Cards with Background Image */}
        {!isMobile && (
          <div className="fpj-grid">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="fpj-card"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.7, 
                  delay: 0.3 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1] 
                }}
              >
                {/* Background Image */}
                <div 
                  className="fpj-card-bg"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                {/* Dark Overlay */}
                <div className="fpj-card-overlay" />
                
                {/* Content - Bottom Left */}
                <div className="fpj-card-content">
                  <span className="fpj-card-sector">{project.sector}</span>
                  <h3 className="fpj-card-name">{project.name}</h3>
                  <p className="fpj-card-scope">{project.scope}</p>
                  <button className="fpj-card-btn">
                    <ArrowRight size={18} strokeWidth={2} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Mobile Slider */}
        {isMobile && (
          <div 
            className="fpj-slider"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <div 
              className="fpj-slider-track"
              style={{ 
                transform: `translateX(-${currentSlide * 100}%)`,
                transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
              }}
            >
              {projects.map((project) => (
                <div key={project.id} className="fpj-slider-item">
                  <div className="fpj-card">
                    <div 
                      className="fpj-card-bg"
                      style={{ backgroundImage: `url(${project.image})` }}
                    />
                    <div className="fpj-card-overlay" />
                    <div className="fpj-card-content">
                      <span className="fpj-card-sector">{project.sector}</span>
                      <h3 className="fpj-card-name">{project.name}</h3>
                      <p className="fpj-card-scope">{project.scope}</p>
                      <button className="fpj-card-btn">
                        <ArrowRight size={18} strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="fpj-slider-controls">
              <button className="fpj-slider-btn" onClick={prevSlide}>
                <ChevronLeft size={20} />
              </button>
              <div className="fpj-slider-dots">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    className={`fpj-slider-dot ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
              <button className="fpj-slider-btn" onClick={nextSlide}>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* CTA */}
        <motion.div 
          className="fpj-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <a href="/projects" className="btn btn-outline-blue fpj-cta-btn">
            View Projects <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedProjects2