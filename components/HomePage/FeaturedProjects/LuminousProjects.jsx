'use client'
import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Building2, Layers, Store, Factory, Warehouse, Cog, LocationEdit } from 'lucide-react'
import './LuminousProjects.css'
import { FaLocationPin } from 'react-icons/fa6'

const DEFAULT_PROJECTS = [
  {
    id: 1,
    icon: Building2,
    name: 'Project Alpha',
    sector: 'Architecture',
    location: 'Dubai, UAE',
    scope: 'Laser-cut facade screens',
    description: 'Precision-cut metal screens for modern architectural facades.'
  },
  {
    id: 2,
    icon: Layers,
    name: 'Project Beta',
    sector: 'Construction',
    location: 'Karachi, Pakistan',
    scope: 'Structural steel staircase',
    description: 'Custom structural steel staircase with precision welding.'
  },
  {
    id: 3,
    icon: Store,
    name: 'Project Gamma',
    sector: 'Retail',
    location: 'London, UK',
    scope: 'Powder-coated shopfront',
    description: 'Durable powder-coated metal shopfront with modern finish.'
  },
  {
    id: 4,
    icon: Factory,
    name: 'Project Delta',
    sector: 'Industrial',
    location: 'Doha, Qatar',
    scope: 'CNC machined components',
    description: 'High-tolerance CNC machined parts for industrial equipment.'
  },
  {
    id: 5,
    icon: Warehouse,
    name: 'Project Epsilon',
    sector: 'Logistics',
    location: 'Riyadh, KSA',
    scope: 'Warehouse structural steel',
    description: 'Complete structural steel framework for warehouse facility.'
  },
  {
    id: 6,
    icon: Cog,
    name: 'Project Zeta',
    sector: 'Manufacturing',
    location: 'Abu Dhabi, UAE',
    scope: 'Custom machine bases',
    description: 'Heavy-duty machine bases with precision leveling.'
  }
];

const LuminousProjects = ({
  eyebrow = '',
  title = '',
  body = '',
  projects = [],
  buttonText = '',
  buttonLink = '/projects',
  showButton = false,
  showCards = true,
  showDescription = false,
  showLocation = true,
  showArrowButton = true,
  backgroundColor = '',
  backgroundImage = '',
  showGridPattern = true,
  showGlow = true,
  eyebrowColor = '',
  titleColor = '',
  bodyColor = '',
  cardNameColor = '',
  cardSectorColor = '',
  cardScopeColor = '',
  cardDescriptionColor = '',
  cardLocationColor = '',
  iconColor = '',
}) => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' })
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const mouseStartX = useRef(0)
  const mouseEndX = useRef(0)
  const isDragging = useRef(false)
  
  const [currentSlide, setCurrentSlide] = useState(0)
 const [isMobile, setIsMobile] = useState(false)
const [isSliderMode, setIsSliderMode] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [activeCard, setActiveCard] = useState(null)

  const displayProjects = projects.length > 0 ? projects : DEFAULT_PROJECTS;
  const hasHeader = eyebrow || title || body;
  const hasCards = showCards && displayProjects.length > 0;
  const hasButton = showButton && buttonText;

 useEffect(() => {
  const checkScreenSize = () => {
    const mobile = window.innerWidth < 1024;
    const slider = mobile || displayProjects.length > 3;
    setIsMobile(mobile);
    setIsSliderMode(slider);
  }
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
  return () => window.removeEventListener('resize', checkScreenSize)
}, [displayProjects.length])

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % displayProjects.length)
  }, [displayProjects.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + displayProjects.length) % displayProjects.length)
  }, [displayProjects.length])

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

  const renderCard = (project, index) => {
    const Icon = project.icon || Cog;
    return (
      <motion.div
        key={project.id || index}
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

        <div className="lmp-content">
          <div className="lmp-icon">
            <Icon size={40} strokeWidth={1.5} style={iconColor ? { color: iconColor } : {}} />
          </div>
          <div className="lmp-bottom">
            {project.name && (
              <h3 className="lmp-card-name" style={cardNameColor ? { color: cardNameColor } : {}}>
                {project.name}
              </h3>
            )}
            {project.sector && (
              <span className="lmp-card-sector" style={cardSectorColor ? { color: cardSectorColor } : {}}>
                {project.sector}
              </span>
            )}
            {showLocation && project.location && (
              <span className="lmp-card-location" style={cardLocationColor ? { color: cardLocationColor } : {}}>
              <FaLocationPin/> {project.location}
              </span>
            )}
            {project.scope && (
              <p className="lmp-card-scope" style={cardScopeColor ? { color: cardScopeColor } : {}}>
                {project.scope}
              </p>
            )}
            {showDescription && project.description && (
              <p className="lmp-card-description" style={cardDescriptionColor ? { color: cardDescriptionColor } : {}}>
                {project.description}
              </p>
            )}
            {showArrowButton && (
              <button className="lmp-card-btn">
                <ArrowRight size={18} strokeWidth={2} />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section 
      className="lmp-section" 
      ref={sectionRef}
      style={backgroundColor ? { backgroundColor } : {}}
    >
      {backgroundImage && (
        <div className="lmp-bg-image" style={{ backgroundImage: `url(${backgroundImage})` }} />
      )}

      {showGridPattern && (
        <div className="lmp-bg">
          <div className="lmp-grid-pattern" />
        </div>
      )}

      {showGlow && (
        <>
          <div className="lmp-glow lmp-glow-left" />
          <div className="lmp-glow lmp-glow-right" />
        </>
      )}

      <div className="container2">
        {/* Header */}
        {hasHeader && (
          <div className="lmp-header">
            {eyebrow && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="lmp-eyebrow" style={eyebrowColor ? { color: eyebrowColor } : {}}>
                  {eyebrow}
                </span>
              </motion.div>
            )}

            {title && (
              <motion.h2 
                className="lmp-title"
                style={titleColor ? { color: titleColor } : {}}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                {title}
              </motion.h2>
            )}

            {body && (
              <motion.p 
                className="lmp-body"
                style={bodyColor ? { color: bodyColor } : {}}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                {body}
              </motion.p>
            )}
          </div>
        )}

        {/* Desktop Grid */}
        {hasCards && !isMobile && (
          <div className="lmp-grid">
            {displayProjects.slice(0, 3).map((project, index) => renderCard(project, index))}
          </div>
        )}

        {/* Mobile Slider */}
        {hasCards && isMobile && (
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
              {displayProjects.map((project, index) => (
                <div key={project.id || index} className="lmp-slider-item">
                  {renderCard(project, index)}
                </div>
              ))}
            </div>

            <div className="lmp-slider-controls">
              <button className="lmp-slider-btn" onClick={prevSlide}>
                <ChevronLeft size={20} />
              </button>
              <div className="lmp-slider-dots">
                {displayProjects.map((_, index) => (
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
        {hasButton && (
          <motion.div 
            className="lmp-cta"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <a href={buttonLink} className="btn btn-outline-blue lmp-cta-btn">
              {buttonText} <ArrowRight size={16} />
            </a>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default LuminousProjects