'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Lightbulb, PenTool, Cog, Package, Check } from 'lucide-react';
import { FiSettings } from 'react-icons/fi';
import './HowWeWork.css';

const PROCESS_STEPS = [
  { icon: Lightbulb, title: 'Brief', desc: 'Understanding the requirment.' },
  { icon: PenTool, title: 'Define', desc: 'Shape the right solution.' },
  { icon: Cog, title: 'Create', desc: 'Design, engineer or develop.' },
  { icon: Package, title: 'Make', desc: 'Produce with precision.' },
  { icon: Check, title: 'Deliver', desc: 'Finish, Review & deliver exellence.' },
];

export default function HowWeWork({
  eyebrow = 'How we work',
  title = 'From Concept to Completion.',
  body = "Every job runs the same clear path: brief, design review, material planning, production, quality checks, finishing, assembly, and delivery. You always know which stage your work is in.",
  buttonText = 'See Our Process',
  buttonLink = '/process',
}) {
  return (
    <section className="fp-process-section">
      <div className="container2">
        <div className="fp-process-grid">
          <motion.div
            className="fp-process-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="fp-process-eyebrow">{eyebrow}</span>
            <h2 className="fp-process-title">{title}</h2>
            <p className="fp-process-body">{body}</p>
            <a href={buttonLink} className="btn btn-blue fp-process-btn">
              {buttonText}
              <ArrowRight size={16} />
            </a>
          </motion.div>

          <motion.div
            className="fp-process-visual"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <div className="fp-process-timeline">
              {PROCESS_STEPS.map((step, index) => {
                const delay = 0.8 + index * 0.25;
                return (
                  <motion.div
                    key={index}
                    className={`fp-process-timeline-step step-${index + 1}`}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="fp-process-step-content">
                      <div className="fp-process-gear-bg">
                        {/* <FiSettings size={80} className="fp-process-gear-icon" /> */}
                        <Cog size={80} className="fp-process-gear-icon" />
                        
                      </div>
                      <h3 className="fp-process-step-title">{step.title}</h3>
                      <p className="fp-process-step-desc">{step.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}