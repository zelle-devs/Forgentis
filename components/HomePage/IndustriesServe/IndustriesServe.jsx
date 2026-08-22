'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Building, Home, ShoppingBag, Factory, UtensilsCrossed, Cog, Hospital } from 'lucide-react'
import './IndustriesServe.css'

const IndustriesServe = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' })

  const industries = [
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
  ]

  return (
    <section className="industries-serve" ref={sectionRef}>
      {/* Background */}
      <div className="industries-serve-bg">
        <div className="industries-serve-glow" />
      </div>

      <div className="container2">
        {/* Header */}
        <div className="industries-serve-header">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="industries-serve-eyebrow">
              Sectors We Cover
            </span>
          </motion.div>

          <motion.h2 
            className="industries-serve-title"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Industries We Serve.
          </motion.h2>

          <motion.p 
            className="industries-serve-body"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            We fabricate for teams that build and fit out spaces.
          </motion.p>
        </div>

        {/* Industries Grid Container */}
        <motion.div 
          className="industries-serve-container"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {industries.map((industry, index) => (
            <motion.div
              key={industry.id}
              className="industries-serve-card"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: 0.4 + index * 0.08,
                ease: [0.22, 1, 0.36, 1] 
              }}
            >
              {/* Card Header - Icon Left, Arrow Right */}
              <div className="industries-serve-card-header">
                <industry.icon 
                  className="industries-serve-card-icon" 
                  size={28} 
                  strokeWidth={1.5}
                />
                <button className="industries-serve-card-btn">
                  <ArrowRight size={18} strokeWidth={2} />
                </button>
              </div>

              {/* Card Body - Title & Description */}
              <h3 className="industries-serve-card-title">
                {industry.title}
              </h3>
              <p className="industries-serve-card-description">
                {industry.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="industries-serve-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <a href="/industries" className="btn btn-outline-blue industries-serve-cta-btn">
            See Industries <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default IndustriesServe