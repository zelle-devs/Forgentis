'use client'
import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Building2, Layers, Store, Factory, Warehouse, Cog } from 'lucide-react'
import './LuminousProjects.css'

const LuminousProjects = () => {
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
  const [activeCard, setActiveCard] = useState(null)

  const projects = [
    {
      id: 1,
      icon: Building2,
      name: 'Project Alpha',
      sector: 'Architecture',
      scope: 'Laser-cut facade screens',
      description: 'Precision-cut metal screens for modern architectural facades.'
    },
    {
      id: 2,
      icon: Layers,
      name: 'Project Beta',
      sector: 'Construction',
      scope: 'Structural steel staircase',
      description: 'Custom structural steel staircase with precision welding.'
    },
    {
      id: 3,
      icon: Store,
      name: 'Project Gamma',
      sector: 'Retail',
      scope: 'Powder-coated shopfront',
      description: 'Durable powder-coated metal shopfront with modern finish.'
    },
    {
      id: 4,
      icon: Factory,
      name: 'Project Delta',
      sector: 'Industrial',
      scope: 'CNC machined components',
      description: 'High-tolerance CNC machined parts for industrial equipment.'
    },
    {
      id: 5,
      icon: Warehouse,
      name: 'Project Epsilon',
      sector: 'Logistics',
      scope: 'Warehouse structural steel',
      description: 'Complete structural steel framework for warehouse facility.'
    },
    {
      id: 6,
      icon: Cog,
      name: 'Project Zeta',
      sector: 'Manufacturing',
      scope: 'Custom machine bases',
      description: 'Heavy-duty machine bases with precision leveling.'
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
    <section className="lmp-section" ref={sectionRef}>
      <div className="lmp-bg">
        <div className="lmp-grid-pattern" />
        <div className="lmp-glow lmp-glow-left" />
        <div className="lmp-glow lmp-glow-right" />
      </div>

      <div className="container2">
        {/* Header */}
        <div className="lmp-header">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="lmp-eyebrow">Featured Projects</span>
          </motion.div>

          <motion.h2 
            className="lmp-title"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Selected Work.
          </motion.h2>

          <motion.p 
            className="lmp-body"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            A few of the jobs we have delivered. Full case studies on the Projects page.
          </motion.p>
        </div>

        {/* Desktop Grid - 3 Cards */}
        {!isMobile && (
          <div className="lmp-grid">
            {projects.slice(0, 3).map((project, index) => (
              <motion.div
                key={project.id}
                className={`lmp-card ${activeCard === project.id ? 'active' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.7, 
                  delay: 0.3 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1] 
                }}
                onMouseEnter={() => setActiveCard(project.id)}
                onMouseLeave={() => setActiveCard(null)}
              >
                {/* Light Layer */}
                <div className="lmp-light-layer">
                  <div className="lmp-slit" />
                  <div className="lmp-lumen">
                    <div className="lmp-min" />
                    <div className="lmp-mid" />
                    <div className="lmp-hi" />
                  </div>
                  <div className="lmp-darken">
                    <div className="lmp-sl" />
                    <div className="lmp-ll" />
                    <div className="lmp-slt" />
                    <div className="lmp-srt" />
                  </div>
                </div>

                {/* Content */}
                <div className="lmp-content">
                  <div className="lmp-icon">
                    <project.icon size={40} strokeWidth={1.5} />
                  </div>
                  <div className="lmp-bottom">
                    <h3 className="lmp-card-name">{project.name}</h3>
                    <span className="lmp-card-sector">{project.sector}</span>
                    <p className="lmp-card-scope">{project.scope}</p>
                    {/* <p className="lmp-card-description">{project.description}</p> */}
                    <button className="lmp-card-btn">
                      <ArrowRight size={18} strokeWidth={2} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Mobile Slider */}
        {isMobile && (
          <div 
            className="lmp-slider"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <div 
              className="lmp-slider-track"
              style={{ 
                transform: `translateX(-${currentSlide * 100}%)`,
                transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
              }}
            >
              {projects.map((project) => (
                <div key={project.id} className="lmp-slider-item">
                  <div className="lmp-card">
                    <div className="lmp-light-layer">
                      <div className="lmp-slit" />
                      <div className="lmp-lumen">
                        <div className="lmp-min" />
                        <div className="lmp-mid" />
                        <div className="lmp-hi" />
                      </div>
                      <div className="lmp-darken">
                        <div className="lmp-sl" />
                        <div className="lmp-ll" />
                      </div>
                    </div>
                    <div className="lmp-content">
                      <div className="lmp-icon">
                        <project.icon size={40} strokeWidth={1.5} />
                      </div>
                      <div className="lmp-bottom">
                        <h3 className="lmp-card-name">{project.name}</h3>
                        <span className="lmp-card-sector">{project.sector}</span>
                        <p className="lmp-card-scope">{project.scope}</p>
                        <button className="lmp-card-btn">
                          <ArrowRight size={18} strokeWidth={2} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lmp-slider-controls">
              <button className="lmp-slider-btn" onClick={prevSlide}>
                <ChevronLeft size={20} />
              </button>
              <div className="lmp-slider-dots">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    className={`lmp-slider-dot ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
              <button className="lmp-slider-btn" onClick={nextSlide}>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* CTA */}
        <motion.div 
          className="lmp-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <a href="/projects" className="btn btn-outline-blue lmp-cta-btn">
            View Projects <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default LuminousProjects