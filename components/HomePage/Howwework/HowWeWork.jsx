'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Lightbulb, PenTool, Cog, Package, Check } from 'lucide-react';
import './HowWeWork.css';

const DEFAULT_STEPS = [
  { id: 1, icon: Cog, title: 'Cutting', desc: 'CNC laser cutting up to 25mm.' },
  { id: 2, icon: Cog, title: 'Forming', desc: 'Bending, forming, molding, and pinching.' },
  { id: 3, icon: Cog, title: 'Welding', desc: 'Welding and assembly.' },
  { id: 4, icon: Cog, title: 'Production', desc: 'Prototyping and production.' },
  { id: 5, icon: Cog, title: 'Finishing', desc: <>Industrial finishing,<br/> custom and architectural metalwork.</> },
];

export default function HowWeWork({
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
    <section className="fp-process-section">
      <div className="container2">
        <div className="fp-process-grid">
          {(hasContent || hasButton) && (
            <motion.div
              className="fp-process-content"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {eyebrow && <span className="fp-process-eyebrow">{eyebrow}</span>}
              {title && <h2 className="fp-process-title">{title}</h2>}
              {body && <p className="fp-process-body">{body}</p>}
              {hasButton && (
                <a href={buttonLink} className="btn btn-blue fp-process-btn">
                  {buttonText}
                  <ArrowRight size={16} />
                </a>
              )}
            </motion.div>
          )}

          {showTimeline && processSteps.length > 0 && (
            <motion.div
              className="fp-process-visual"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              <div className="fp-process-timeline">
                {processSteps.map((step, index) => {
                  const Icon = step.icon || Cog;
                  const delay = 0.8 + index * 0.25;
                  return (
                    <motion.div
                      key={step.id || index}
                      className={`fp-process-timeline-step step-${index + 1}`}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="fp-process-step-content">
                        <div className="fp-process-gear-bg">
                          <Icon size={80} className="fp-process-gear-icon" />
                        </div>
                        {step.title && <h3 className="fp-process-step-title">{step.title}</h3>}
                        {step.desc && <p className="fp-process-step-desc">{step.desc}</p>}
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