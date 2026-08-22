'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import './WhoWeAre.css'

const WhoWeAre = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' })

  return (
    <section className="who-we-are" ref={sectionRef}>
      {/* Background Pattern */}
      <div className="who-we-are-bg">
        <div className="who-we-are-glow" />
      </div>

      <div className="container2">
        <div className="who-we-are-wrapper">
          {/* Left Content */}
          <div className="who-we-are-content">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="who-we-are-eyebrow">
                Who We Are
              </span>
            </motion.div>

            <motion.h2 
              className="who-we-are-title"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Built Around Metal and Precision.
            </motion.h2>

            <motion.div 
              className="who-we-are-divider"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            />

            <motion.p 
              className="who-we-are-body"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              Forgentis Fabrications is a metal fabrication company. We cut, 
              bend, weld, and finish steel, stainless, aluminum, and brass into 
              parts and structures for buildings and businesses. Some jobs are 
              a single part. Some are a full building's worth of steel. The 
              standard stays the same.
            </motion.p>

            <motion.div 
              className="who-we-are-cta"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <a href="/about" className="btn btn-blue who-we-are-btn">
                About Forgentis <ArrowRight size={16} />
              </a>
            </motion.div>
          </div>

          {/* Right Image */}
          <motion.div 
            className="who-we-are-image-wrapper"
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="who-we-are-image-container">
              <Image 
                src="/turkey.jpg"
                alt="Forgentis Fabrication - Metal work and precision"
                className="who-we-are-image"
                width={600}
                height={600}
                quality={100}
              />
              {/* Decorative Border */}
              <div className="who-we-are-image-border" />
              {/* Blue Accent Corner */}
              {/* <div className="who-we-are-image-accent" /> */}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default WhoWeAre