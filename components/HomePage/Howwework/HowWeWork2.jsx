'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Lightbulb, PenTool, Cog, Package, Check } from 'lucide-react';
import './HowWeWork2.css';

const PROCESS_STEPS2 = [
  { icon: Lightbulb, title: 'Brief', desc: 'Understanding the requirment.' },
  { icon: PenTool, title: 'Define', desc: 'Shape the right solution.' },
  { icon: Cog, title: 'Create', desc: 'Design, engineer or develop.' },
  { icon: Package, title: 'Make', desc: 'Produce with precision.' },
  { icon: Check, title: 'Deliver', desc: 'Finish, Review & deliver exellence.' },
];

export default function HowWeWork2({
  eyebrow = 'How we work',
  title = 'From Concept to Completion.',
  body = "Every job runs the same clear path: brief, design review, material planning, production, quality checks, finishing, assembly, and delivery. You always know which stage your work is in.",
  buttonText = 'See Our Process',
  buttonLink = '/process',
}) {
  return (
    <section className="fp2-process-section">
      <div className="container2">
        <div className="fp2-process-grid">
          <motion.div
            className="fp2-process-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="fp2-process-eyebrow">{eyebrow}</span>
            <h2 className="fp2-process-title">{title}</h2>
            <p className="fp2-process-body">{body}</p>
            <a href={buttonLink} className="btn btn-blue fp2-process-btn">
              {buttonText}
              <ArrowRight size={16} />
            </a>
          </motion.div>

          <motion.div
            className="fp2-process-visual"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <div className="fp2-process-timeline">
              {PROCESS_STEPS2.map((step, index) => {
                const delay = 0.8 + index * 0.25;
                return (
                  <motion.div
                    key={index}
                    className={`fp2-process-timeline-step step-${index + 1}`}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Gear - Circle ke andar */}
                    <div className="fp2-process-gear-bg">
                      <Cog size={36} className="fp2-process-gear-icon" />
                    </div>

                    <div className="fp2-process-step-content">
                      <h3 className="fp2-process-step-title">{step.title}</h3>
                      <p className="fp2-process-step-desc">{step.desc}</p>
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