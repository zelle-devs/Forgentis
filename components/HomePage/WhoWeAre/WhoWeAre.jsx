'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import './WhoWeAre.css'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
})

const WhoWeAre = ({
  eyebrow = '', title = '', body = '', buttonText = '', buttonLink = '/about',
  imageSrc = '', imageAlt = 'Forgentis Fabrication', showDivider = true,
  showButton = false, showImage = true, backgroundColor = 'var(--color-black-light)',
  backgroundGlow = true, imagePosition = 'right',
}) => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' })
  const reduceMotion = useReducedMotion()

  const hasContent = eyebrow || title || body
  const hasButton = showButton && buttonText
  const hasImage = showImage && imageSrc
  const imageDirection = imagePosition === 'left' ? -60 : 60

  return (
    <section className="who-we-are" ref={sectionRef} style={{ backgroundColor }}>
      {backgroundGlow && (
        <div className="who-we-are-bg"><div className="who-we-are-glow" /></div>
      )}

      <div className="container2">
        <div className={`who-we-are-wrapper ${imagePosition === 'left' ? 'image-left' : ''}`}>
          {(hasContent || hasButton) && (
            <div className="who-we-are-content">
              {eyebrow && (
                <motion.div {...fadeUp(0)} animate={isInView ? fadeUp(0).animate : {}}>
                  <span className="who-we-are-eyebrow">{eyebrow}</span>
                </motion.div>
              )}

              {title && (
                <motion.h2 className="who-we-are-title" {...fadeUp(0.1)} animate={isInView ? fadeUp(0.1).animate : {}}>
                  {title}
                </motion.h2>
              )}

              {showDivider && title && (
                <motion.div 
                  className="who-we-are-divider"
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                />
              )}

              {body && (
                <motion.p className="who-we-are-body" {...fadeUp(0.3)} animate={isInView ? fadeUp(0.3).animate : {}}>
                  {body}
                </motion.p>
              )}

              {hasButton && (
                <motion.div className="who-we-are-cta" {...fadeUp(0.4)} animate={isInView ? fadeUp(0.4).animate : {}}>
                  <a href={buttonLink} className="btn btn-blue who-we-are-btn">
                    {buttonText} <ArrowRight size={16} />
                  </a>
                </motion.div>
              )}
            </div>
          )}

          {hasImage && (
            <motion.div 
              className="who-we-are-image-wrapper"
              initial={{ opacity: 0, x: reduceMotion ? 0 : imageDirection }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="who-we-are-image-container">
                <Image 
                  src={imageSrc} alt={imageAlt} className="who-we-are-image"
                  width={600} height={600} quality={90} loading="lazy"
                />
                <div className="who-we-are-image-border" />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

export default WhoWeAre