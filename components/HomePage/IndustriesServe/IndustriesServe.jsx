'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Building, Home, ShoppingBag, Factory, UtensilsCrossed, Cog, Hospital } from 'lucide-react'
import './IndustriesServe.css'
import Image from 'next/image'

const DEFAULT_INDUSTRIES = [
  {
    id: 1,
    icon: Building,
    title: 'Construction & Infrastructure',
    description: 'Structural steel, support frames, and heavy-duty metalwork for large-scale building projects.'
  },
  {
    id: 2,
    icon: Home,
    title: 'Architecture & Interior',
    description: 'Custom metal installations, decorative screens, and precision finishing for modern spaces.'
  },
  {
    id: 3,
    icon: ShoppingBag,
    title: 'Retail & Commercial',
    description: 'Display systems, fixture bases, and branded metal elements for commercial environments.'
  },
  {
    id: 4,
    icon: Factory,
    title: 'Industrial & Manufacturing',
    description: 'Machine parts, safety components, and production-ready fabrication for industrial use.'
  },
  {
    id: 5,
    icon: Hospital,
    title: 'Hospitality',
    description: 'Custom furniture, railings, and architectural features for hotels and restaurants.'
  },
  {
    id: 6,
    icon: Cog,
    title: 'Engineering',
    description: 'Precision components, prototypes, and technical metalwork for engineering firms.'
  }
];

const IndustriesServe = ({
  eyebrow = '',
  title = '',
  body = '',
  industries = [],
  buttonText = '',
  buttonLink = '/industries',
  showButton = false,
  showCards = true,
  showArrowButton = true,
  backgroundColor = '',
  backgroundImage = '',
  containerBorderColor = '',
  eyebrowColor = '',
  titleColor = '',
  bodyColor = '',
  cardTitleColor = '',
  cardDescriptionColor = '',
  iconColor = '',
}) => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' })

  const displayIndustries = industries.length > 0 ? industries : DEFAULT_INDUSTRIES;
  const hasHeader = eyebrow || title || body;
  const hasCards = showCards && displayIndustries.length > 0;
  const hasButton = showButton && buttonText;

  return (
    <section 
  className="industries-serve" 
  ref={sectionRef}
  style={backgroundColor ? { backgroundColor } : {}}
>
  {/* Dynamic Background */}
  {backgroundImage && (
    <div className="industries-serve-bg-image">
      <Image
        src={backgroundImage}
        alt=""
        fill
        sizes="100vw"
        className="industries-serve-bg-img"
      />
    </div>
  )}

  {/* Default Section Background */}
  <div className="industries-serve-footer-bg">
    <Image
      src="/optimize/footer-bg.webp"
      alt=""
      fill
      sizes="100vw"
      className="industries-serve-footer-bg-img"
    />
  </div>

  {/* Background Glow */}
  <div className="industries-serve-bg">
    <div className="industries-serve-glow" />
  </div>

  <div className="container2">
        {/* Header */}
        {hasHeader && (
          <div className="industries-serve-header">
            {eyebrow && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <span 
                  className="industries-serve-eyebrow"
                  style={eyebrowColor ? { color: eyebrowColor } : {}}
                >
                  {eyebrow}
                </span>
              </motion.div>
            )}

            {title && (
              <motion.h2 
                className="industries-serve-title"
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
                className="industries-serve-body"
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

        {/* Industries Grid */}
        {hasCards && (
          <motion.div 
            className="industries-serve-container"
            style={containerBorderColor ? { borderColor: containerBorderColor } : {}}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {displayIndustries.map((industry, index) => {
              const Icon = industry.icon || Cog;
              return (
                <motion.div
                  key={industry.id || index}
                  className="industries-serve-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.4 + index * 0.08,
                    ease: [0.22, 1, 0.36, 1] 
                  }}
                >
                  {/* Card Header */}
                  <div className="industries-serve-card-header">
                    <Icon 
                      className="industries-serve-card-icon" 
                      size={28} 
                      strokeWidth={1.5}
                      style={iconColor ? { color: iconColor } : {}}
                    />
                    {showArrowButton && (
                      <button className="industries-serve-card-btn">
                        <ArrowRight size={18} strokeWidth={2} />
                      </button>
                    )}
                  </div>

                  {/* Card Body */}
                  {industry.title && (
                    <h3 
                      className="industries-serve-card-title"
                      style={cardTitleColor ? { color: cardTitleColor } : {}}
                    >
                      {industry.title}
                    </h3>
                  )}
                  {industry.description && (
                    <p 
                      className="industries-serve-card-description"
                      style={cardDescriptionColor ? { color: cardDescriptionColor } : {}}
                    >
                      {industry.description}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* CTA */}
        {hasButton && (
          <motion.div 
            className="industries-serve-cta"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <a href={buttonLink} className="btn btn-outline-blue industries-serve-cta-btn">
              {buttonText} <ArrowRight size={16} />
            </a>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default IndustriesServe