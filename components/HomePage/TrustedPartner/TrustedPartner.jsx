'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './TrustedPartner.css'

const TrustedPartner = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-15%' })
  
  // Counter animation state
  const [counters, setCounters] = useState({
    years: 0,
    projects: 0,
    tolerance: 0,
    facility: 0
  })

  // Counter animation logic
  useEffect(() => {
    if (isInView) {
      const duration = 2000 // 2 seconds
      const startTime = Date.now()
      
      const animateCounters = () => {
        const currentTime = Date.now()
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // Ease out function
        const easeOut = 1 - Math.pow(1 - progress, 3)
        
        setCounters({
          years: Math.round(easeOut * 4),
          projects: Math.round(easeOut * 15),
          tolerance: (easeOut * 0.01).toFixed(2),
          facility: Math.round(easeOut * 100)
        })
        
        if (progress < 1) {
          requestAnimationFrame(animateCounters)
        }
      }
      
      animateCounters()
    }
  }, [isInView])

  const metrics = [
    { 
      value: counters.years, 
      suffix: '+', 
      label: 'Years in Fabrication',
      description: 'In operation'
    },
    { 
      value: counters.projects, 
      suffix: '+', 
      label: 'Projects Delivered',
      description: 'Across sectors'
    },
    { 
      value: counters.tolerance, 
      suffix: '%', 
      label: 'Cutting Accuracy',
      description: 'Tolerance level'
    },
    { 
      value: counters.facility, 
      suffix: '%', 
      label: 'Facility Size',
      description: 'Workshop capacity'
    },
  ]

  const trustedLogos = [
    'ARCHITECTS',
    'CONTRACTORS',
    'MANUFACTURERS',
    'DESIGN STUDIOS',
    'REAL ESTATE',
    'ENGINEERING'
  ]

  return (
    <section className="trusted-partner" ref={sectionRef}>
      {/* Background Pattern */}
      <div className="trusted-partner-bg">
        <div className="trusted-partner-grid" />
      </div>

      <div className="container2">
        {/* Top Content - Centered */}
        <div className="trusted-partner-header">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="trusted-partner-eyebrow">
              Trusted Fabrication Partner
            </span>
          </motion.div>

          <motion.h2 
            className="trusted-partner-title"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            A Fabrication Partner Businesses Rely On.
          </motion.h2>

          <motion.p 
            className="trusted-partner-body"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Architects, contractors, and manufacturers send us their drawings 
            because the work comes back right the first time, cut to spec and 
            ready to install.
          </motion.p>
        </div>

        {/* Metrics Strip - Horizontal Line */}
        <motion.div 
          className="trusted-partner-metrics"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {metrics.map((metric, index) => (
            <div key={index} className="trusted-partner-metric">
              <div className="trusted-partner-metric-value">
                <span className="trusted-partner-metric-number">
                  {metric.value}
                </span>
                <span className="trusted-partner-metric-suffix">
                  {metric.suffix}
                </span>
              </div>
              <div className="trusted-partner-metric-label">
                {metric.label}
              </div>
              <div className="trusted-partner-metric-description">
                {metric.description}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Trust Strip */}
        <motion.div 
          className="trusted-partner-trust"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="trusted-partner-trust-label">
            Trusted by teams across
          </div>
          <div className="trusted-partner-logos">
            {trustedLogos.map((logo, index) => (
              <motion.div 
                key={index}
                className="trusted-partner-logo"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.6 + index * 0.1,
                  ease: [0.22, 1, 0.36, 1] 
                }}
                whileHover={{ 
                //   scale: 1.1,
                  transition: { duration: 0.3 }
                }}
              >
                {logo}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TrustedPartner