'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Lightbulb, PenTool, Cog, Package, Check } from 'lucide-react';
import './HowWeWork2.css';

const DEFAULT_STEPS = [
  { id: 1, icon: Cog, title: 'Brief', desc: 'Understanding the requirment.' },
  { id: 2, icon: Cog, title: 'Define', desc: 'Shape the right solution.' },
  { id: 3, icon: Cog, title: 'Create', desc: 'Design, engineer or develop.' },
  { id: 4, icon: Cog, title: 'Make', desc: 'Produce with precision.' },
  { id: 5, icon: Cog, title: 'Deliver', desc: 'Finish, Review & deliver exellence.' },
];

export default function HowWeWork2({
  eyebrow = '',
  title = '',
  body = '',
  buttonText = '',
  buttonLink = '/process',
  steps = [],
  showButton = false,
  showTimeline = true,
}) {
  const processSteps = steps.length > 0 ? steps : DEFAULT_STEPS;
  const hasContent = eyebrow || title || body;
  const hasButton = showButton && buttonText;

  return (
    <section className="fp2-process-section">
      <div className="container2">
        <div className="fp2-process-grid">
          {(hasContent || hasButton) && (
            <motion.div
              className="fp2-process-content"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {eyebrow && (
                <span className="fp2-process-eyebrow">{eyebrow}</span>
              )}
              {title && (
                <h2 className="fp2-process-title">{title}</h2>
              )}
              {body && (
                <p className="fp2-process-body">{body}</p>
              )}
              {hasButton && (
                <a href={buttonLink} className="btn btn-blue fp2-process-btn">
                  {buttonText}
                  <ArrowRight size={16} />
                </a>
              )}
            </motion.div>
          )}

          {showTimeline && processSteps.length > 0 && (
            <motion.div
              className="fp2-process-visual"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              <div className="fp2-process-timeline">
                {processSteps.map((step, index) => {
                  const Icon = step.icon || Cog;
                  const delay = 0.8 + index * 0.25;
                  return (
                    <motion.div
                      key={step.id || index}
                      className={`fp2-process-timeline-step step-${index + 1}`}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="fp2-process-gear-bg">
                        <Icon size={36} className="fp2-process-gear-icon" />
                      </div>

                      <div className="fp2-process-step-content">
                        {step.title && (
                          <h3 className="fp2-process-step-title">{step.title}</h3>
                        )}
                        {step.desc && (
                          <p className="fp2-process-step-desc">{step.desc}</p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}