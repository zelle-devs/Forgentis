'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './TrustedPartner.css'
import Image from 'next/image'

const TrustedPartner = ({
  eyebrow = '',
  title = '',
  body = '',
  metrics = [],
  trustLabel = '',
  logos = [],
  showMetrics = false,
  showTrustStrip = false,
  backgroundImage = '',
  backgroundColor = 'var(--color-black)',
  overlayOpacity = 0.9,
  eyebrowColor = '',
  titleColor = '',
  bodyColor = '',
  metricNumberColor = '',
  metricLabelColor = '',
  metricDescriptionColor = '',
  metricSuffixColor = '',
  metricHoverColor = '',
  trustLabelColor = '',
  logoColor = '',
  logoBackground = 'var(--color-black-light)',
  logoBorderColor = 'var(--color-dark-border)',
  logoHoverColor = 'var(--color-blue-main)',
  logoHoverBackground = 'var(--color-black-medium)',
  logoHoverBorderColor = 'var(--color-blue-main)',
  showGridPattern = true,
}) => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-15%' })
  
  const [counters, setCounters] = useState({})

  useEffect(() => {
    if (isInView && metrics.length > 0) {
      const duration = 2000
      const startTime = Date.now()
      
      const animateCounters = () => {
        const currentTime = Date.now()
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easeOut = 1 - Math.pow(1 - progress, 3)
        
        const newCounters = {}
        metrics.forEach(metric => {
          if (metric.target !== undefined) {
            if (metric.decimal) {
              newCounters[metric.id] = (easeOut * metric.target).toFixed(metric.decimal)
            } else {
              newCounters[metric.id] = Math.round(easeOut * metric.target)
            }
          } else {
            newCounters[metric.id] = metric.value
          }
        })
        
        setCounters(newCounters)
        
        if (progress < 1) {
          requestAnimationFrame(animateCounters)
        }
      }
      
      animateCounters()
    }
  }, [isInView, metrics])

  const displayMetrics = metrics.map(metric => ({
    ...metric,
    value: counters[metric.id] !== undefined ? counters[metric.id] : metric.value || 0,
  }))

  const hasContent = eyebrow || title || body
  const hasMetrics = showMetrics && metrics.length > 0
  const hasTrustStrip = showTrustStrip && logos.length > 0

  return (
    <section 
      className="trusted-partner" 
      ref={sectionRef}
      style={{ backgroundColor }}
    >
      {/* {backgroundImage && (
        <div 
          className="trusted-partner-bg-image"
          style={{ 
            backgroundImage: `url(${backgroundImage})`,
            opacity: overlayOpacity,
          }}
        />
      )} */}

{backgroundImage && (
  <div
    className="trusted-partner-bg-image"
    style={{ opacity: overlayOpacity }}
  >
    <Image
      src={backgroundImage}
      alt=""
      fill
      priority={false}
      sizes="100vw"
      unoptimized={true}
      style={{
        objectFit: 'cover',
      }}
    />
  </div>
)}

      {showGridPattern && (
        <div className="trusted-partner-bg">
          <div className="trusted-partner-grid" />
        </div>
      )}

      <div className="container2">
        {hasContent && (
          <div className="trusted-partner-header">
            {eyebrow && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <span 
                  className="trusted-partner-eyebrow"
                  style={eyebrowColor ? { color: eyebrowColor } : {}}
                >
                  {eyebrow}
                </span>
              </motion.div>
            )}

            {title && (
              <motion.h2 
                className="trusted-partner-title"
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
                className="trusted-partner-body"
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

        {hasMetrics && (
          <motion.div 
            className="trusted-partner-metrics"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {displayMetrics.map((metric, index) => (
              <div key={metric.id || index} className="trusted-partner-metric">
                <div className="trusted-partner-metric-value">
                  <span 
                    className="trusted-partner-metric-number"
                    style={metricNumberColor ? { color: metricNumberColor } : {}}
                  >
                    {metric.value}
                  </span>
                  {metric.suffix && (
                    <span 
                      className="trusted-partner-metric-suffix"
                      style={metricSuffixColor ? { color: metricSuffixColor } : {}}
                    >
                      {metric.suffix}
                    </span>
                  )}
                </div>
                {metric.label && (
                  <div 
                    className="trusted-partner-metric-label"
                    style={metricLabelColor ? { color: metricLabelColor } : {}}
                  >
                    {metric.label}
                  </div>
                )}
                {metric.description && (
                  <div 
                    className="trusted-partner-metric-description"
                    style={metricDescriptionColor ? { color: metricDescriptionColor } : {}}
                  >
                    {metric.description}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}

        {hasTrustStrip && (
          <motion.div 
            className="trusted-partner-trust"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {trustLabel && (
              <div 
                className="trusted-partner-trust-label"
                style={trustLabelColor ? { color: trustLabelColor } : {}}
              >
                {trustLabel}
              </div>
            )}
            <div className="trusted-partner-logos">
              {logos.map((logo, index) => (
                <motion.div 
                  key={logo.id || index}
                  className="trusted-partner-logo"
                  style={{
                    color: logoColor || undefined,
                    background: logoBackground,
                    borderColor: logoBorderColor,
                    ...(logoColor && { '--logo-hover-color': logoHoverColor }),
                    ...(logoBackground && { '--logo-hover-bg': logoHoverBackground }),
                    ...(logoBorderColor && { '--logo-hover-border': logoHoverBorderColor }),
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.6 + index * 0.1,
                    ease: [0.22, 1, 0.36, 1] 
                  }}
                >
                  {logo.name || logo}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default TrustedPartner