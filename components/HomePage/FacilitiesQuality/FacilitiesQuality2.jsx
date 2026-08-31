'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Factory, ShieldCheck, CheckCircle2 } from 'lucide-react';
import './FacilitiesQuality2.css';

const FACILITY_METRICS2 = [
  { value: '25,000', suffix: 'sq ft', label: 'Floor Space' },
  { value: '40+', suffix: '', label: 'Machines' },
  { value: '10', suffix: 'ton', label: 'Lifting Capacity' },
];

const QUALITY_POINTS2 = [
  'Material inspection on arrival',
  'In-process quality checks',
  'Final sign-off before delivery',
  'Certification documentation',
];

export default function FacilitiesQuality2() {
  return (
    <section className="fq2-section">
      <div className="fq2-bg">
        <div className="fq2-grid-pattern" />
      </div>

      <div className="container2">
        <div className="fq2-wrapper">
          {/* LEFT - FACILITIES */}
          <motion.div
            className="fq2-left"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="fq2-card fq2-card-facility">
              <div className="fq2-image-area">
                <div className="fq2-image-icon">
                  <Factory size={48} strokeWidth={1.5} />
                </div>
              </div>

              <div className="fq2-content-area">
                <span className="fq2-eyebrow">Our Facility</span>
                <h2 className="fq2-title">Built in Our Own Workshop</h2>
                <p className="fq2-body">
                  We run our own fabrication floor with laser cutting, press brakes, 
                  welding bays, and finishing under one roof. That means we control 
                  the schedule and the standard from first cut to final check.
                </p>

                <div className="fq2-metrics">
                  {FACILITY_METRICS2.map((metric, index) => (
                    <div key={index} className="fq2-metric">
                      <span className="fq2-metric-value">
                        {metric.value}
                        <span className="fq2-metric-suffix">{metric.suffix}</span>
                      </span>
                      <span className="fq2-metric-label">{metric.label}</span>
                    </div>
                  ))}
                </div>

                <a href="/facilities" className="btn btn-outline-blue fq2-btn">
                  Tour the Facility <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* RIGHT - QUALITY */}
          <motion.div
            className="fq2-right"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="fq2-card fq2-card-quality">
              <div className="fq2-image-area">
                <div className="fq2-image-icon">
                  <ShieldCheck size={48} strokeWidth={1.5} />
                </div>
              </div>

              <div className="fq2-content-area">
                <span className="fq2-eyebrow">Quality Control</span>
                <h2 className="fq2-title">Checked at Every Stage</h2>
                <p className="fq2-body">
                  We inspect material when it arrives, check parts during production, 
                  and sign off every job before it leaves. You get work that matches 
                  the drawing, plus the paperwork to prove it.
                </p>

                <div className="fq2-quality-points">
                  {QUALITY_POINTS2.map((point, index) => (
                    <div key={index} className="fq2-quality-point">
                      <CheckCircle2 size={18} className="fq2-quality-icon" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                <a href="/quality" className="btn btn-outline-blue fq2-btn">
                  Our Quality Standards <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}