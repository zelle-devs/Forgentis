'use client'
import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, Building2, Layers, Frame, Armchair, PenTool, Sparkles } from 'lucide-react'
import './WhatWeFabricate.css'
import Image from 'next/image'

const DEFAULT_ITEMS = [
  {
    id: 1,
    icon: Building2,
    title: 'Entrance Screens',
    sector: '',
    description: 'Facades and cladding for modern architectural projects.',
    image: '/optimize/1o.webp'
  },
  {
    id: 2,
    icon: Layers,
    title: 'Railings & Staircases',
    sector: '',
    description: 'Balustrades and structural support systems.',
    image: '/optimize/2o.webp'
  },
  {
    id: 3,
    icon: Frame,
    title: 'Structural Steel',
    sector: '',
    description: 'Frames and supports for buildings and infrastructure.',
    image: '/optimize/3o.webp'
  },
  {
    id: 4,
    icon: Armchair,
    title: 'Furniture Bases',
    sector: '',
    description: 'Fixtures and fittings for commercial spaces.',
    image: '/optimize/4o.webp'
  },
  {
    id: 5,
    icon: PenTool,
    title: 'Signage & Panels',
    sector: '',
    description: 'Decorative metal panels and custom signage.',
    image: '/optimize/5o.webp'
  },
  {
    id: 6,
    icon: Sparkles,
    title: 'Custom Pieces',
    sector: '',
    description: 'One-off pieces made to your exact drawing.',
    image: '/optimize/6o.webp'
  }
];

const WhatWeFabricate = ({
  eyebrow = '',
  title = '',
  body = '',
  buttonText = '',
  buttonLink = '/work',
  items = [],
  showButton = false,
  showDivider = true,
  showSector = true,
  backgroundColor = '',
  backgroundImage = '',
  showGridPattern = true,
  eyebrowColor = '',
  titleColor = '',
  bodyColor = '',
  cardTitleColor = '',
  cardSectorColor = '',
  cardDescriptionColor = '',
  iconColor = '',
  cardBackground = 'var(--color-black)',
  cardHoverBackground = 'var(--color-black-light)',
  cardBorderColor = 'var(--color-dark-border)',
}) => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' })
  const [hoveredCard, setHoveredCard] = useState(1)
  const [isMobile, setIsMobile] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const mouseStartX = useRef(0)
  const mouseEndX = useRef(0)
  const isDragging = useRef(false)

  const fabricateItems = items.length > 0 ? items : DEFAULT_ITEMS;
  const hasContent = eyebrow || title || body;
  const hasButton = showButton && buttonText;

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

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
  }, [isMobile, isAutoPlaying, currentSlide, fabricateItems.length])

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
    <section 
      className="what-we-fabricate" 
      ref={sectionRef}
      style={backgroundColor ? { backgroundColor } : {}}
    >
      {backgroundImage && (
        <div 
          className="wwf-bg-image"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {showGridPattern && (
        <div className="what-we-fabricate-bg">
          <div className="what-we-fabricate-grid" />
        </div>
      )}

      <div className="container2">
        <div className="what-we-fabricate-wrapper">
          {/* Left Content */}
          {(hasContent || hasButton) && (
            <div className="what-we-fabricate-left">
              {eyebrow && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span 
                    className="what-we-fabricate-eyebrow"
                    style={eyebrowColor ? { color: eyebrowColor } : {}}
                  >
                    {eyebrow}
                  </span>
                </motion.div>
              )}

              {title && (
                <motion.h2 
                  className="what-we-fabricate-title"
                  style={titleColor ? { color: titleColor } : {}}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {title}
                </motion.h2>
              )}

              {showDivider && title && (
                <motion.div 
                  className="what-we-fabricate-divider"
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                />
              )}

              {body && (
                <motion.p 
                  className="what-we-fabricate-body"
                  style={bodyColor ? { color: bodyColor } : {}}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  {body}
                </motion.p>
              )}

              {hasButton && (
                <motion.div 
                  className="what-we-fabricate-cta"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a href={buttonLink} className="btn btn-blue what-we-fabricate-btn">
                    {buttonText} <ArrowRight size={16} />
                  </a>
                </motion.div>
              )}
            </div>
          )}

          {/* Desktop Cards */}
          {!isMobile && fabricateItems.length > 0 && (
            <div className="what-we-fabricate-cards">
              {fabricateItems.map((item) => {
                const Icon = item.icon || Sparkles;
                return (
                  <motion.div
                    key={item.id}
                    className={`what-we-fabricate-card ${hoveredCard === item.id ? 'hovered' : ''} ${hoveredCard !== null && hoveredCard !== item.id ? 'shrink' : ''}`}
                    onMouseEnter={() => setHoveredCard(item.id)}
                    onMouseLeave={() => setHoveredCard(1)}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ 
                      duration: 0.7, 
                      delay: 0.2 + item.id * 0.1,
                      ease: [0.22, 1, 0.36, 1] 
                    }}
                  >
                    {/* {item.image && (
                      <div 
                        className="what-we-fabricate-card-image"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                    )} */}
                    {item.image && (
  <div className="what-we-fabricate-card-image">
    <Image
      src={item.image}
      alt={item.title || 'Fabrication work'}
      fill
      sizes="(min-width: 1024px) 20vw, 100vw"
      className="what-we-fabricate-card-img"
    />
  </div>
)}
                    
                    <div 
                      className="what-we-fabricate-card-content"
                      style={{ background: cardBackground }}
                    >
                      <Icon 
                        className="what-we-fabricate-card-icon" 
                        size={24} 
                        strokeWidth={1.5}
                        style={iconColor ? { color: iconColor } : {}}
                      />
                      {item.title && (
                        <h3 
                          className="what-we-fabricate-card-title"
                          style={cardTitleColor ? { color: cardTitleColor } : {}}
                        >
                          {item.title}
                        </h3>
                      )}
                      {showSector && item.sector && (
                        <span 
                          className="what-we-fabricate-card-sector"
                          style={cardSectorColor ? { color: cardSectorColor } : {}}
                        >
                          {item.sector}
                        </span>
                      )}
                      {item.description && (
                        <p 
                          className="what-we-fabricate-card-description"
                          style={cardDescriptionColor ? { color: cardDescriptionColor } : {}}
                        >
                          {item.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Mobile Slider */}
          {isMobile && fabricateItems.length > 0 && (
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
                {fabricateItems.map((item) => {
                  const Icon = item.icon || Sparkles;
                  return (
                    <div key={item.id} className="what-we-fabricate-slider-item">
                      <div className="what-we-fabricate-card">
                        {/* {item.image && (
                          <div 
                            className="what-we-fabricate-card-image"
                            style={{ backgroundImage: `url(${item.image})` }}
                          />
                        )} */}
                        {item.image && (
  <div className="what-we-fabricate-card-image">
    <Image
      src={item.image}
      alt={item.title || 'Fabrication work'}
      fill
      sizes="100vw"
      className="what-we-fabricate-card-img"
    />
  </div>
)}
                        <div 
                          className="what-we-fabricate-card-content"
                          style={{ background: cardBackground }}
                        >
                          <Icon 
                            className="what-we-fabricate-card-icon" 
                            size={24} 
                            strokeWidth={1.5}
                            style={iconColor ? { color: iconColor } : {}}
                          />
                          {item.title && (
                            <h3 
                              className="what-we-fabricate-card-title"
                              style={cardTitleColor ? { color: cardTitleColor } : {}}
                            >
                              {item.title}
                            </h3>
                          )}
                          {showSector && item.sector && (
                            <span 
                              className="what-we-fabricate-card-sector"
                              style={cardSectorColor ? { color: cardSectorColor } : {}}
                            >
                              {item.sector}
                            </span>
                          )}
                          {item.description && (
                            <p 
                              className="what-we-fabricate-card-description"
                              style={cardDescriptionColor ? { color: cardDescriptionColor } : {}}
                            >
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {fabricateItems.length > 1 && (
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
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default WhatWeFabricate