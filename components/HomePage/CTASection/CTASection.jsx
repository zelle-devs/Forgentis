'use client';

import { motion } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';
import './CTASection.css';

export default function CTASection({
  eyebrow = 'Request a Quote',
  headline = 'Have a Drawing? Get a Price.',
  body = "Send us your drawing or specification and we will come back with a clear quote.",
  buttonText = 'Get a Quote',
  buttonLink = '/contact',
}) {
  return (
    <section className="cta2-section">
      <div className="container2">
        <div className="cta2-wrapper">
          {/* Background Glow Effects */}
          <div className="cta2-glow cta2-glow--top" />
          <div className="cta2-glow cta2-glow--bottom" />

          {/* Content */}
          <motion.div 
            className="cta2-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Left - Eyebrow + Headline + Body */}
            <div className="cta2-text-group">
              <motion.span 
                className="cta2-eyebrow"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {eyebrow}
              </motion.span>
              
              <motion.h2 
                className="cta2-headline"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                {headline}
              </motion.h2>

              <motion.p 
                className="cta2-body"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                {body}
              </motion.p>
            </div>

            {/* Right - Button */}
            <motion.div 
              className="cta2-button-group"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <motion.a 
                href={buttonLink} 
                className="btn btn-blue cta2-btn"
                whileTap={{ scale: 0.98 }}
              >
                <FileText size={18} />
                {buttonText}
                <ArrowRight size={18} />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}