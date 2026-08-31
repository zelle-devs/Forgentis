'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Factory, ShieldCheck, CheckCircle2, Award, ClipboardCheck } from 'lucide-react';
import Image from 'next/image';
import './FacilitiesQuality.css';

const FACILITY_METRICS = [
  { value: '25,000', suffix: 'sq ft', label: 'Floor Space' },
  { value: '40+', suffix: '', label: 'Machines' },
  { value: '10', suffix: 'ton', label: 'Lifting Capacity' },
];

const QUALITY_POINTS = [
  'Material inspection on arrival',
  'In-process quality checks',
  'Final sign-off before delivery',
  'Certification documentation',
];

export default function FacilitiesQuality() {
  return (
    <section className="fq-section">
      <div className="fq-bg">
        <div className="fq-grid-pattern" />
      </div>

      <div className="container2">
        <div className="fq-wrapper">
          {/* ============ LEFT - FACILITIES ============ */}
          <motion.div
            className="fq-left"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="fq-card fq-card-facility">
              {/* Image Area - Top Left 30% width, 50% height */}
              <div className="fq-image-area">
                <div className="fq-image-icon">
                  <Factory size={48} strokeWidth={1.5} />
                </div>
              </div>

              {/* Content Area - Right 70% */}
              <div className="fq-content-area">
                <span className="fq-eyebrow">Our Facility</span>
                <h2 className="fq-title">Built in Our Own Workshop</h2>
                <p className="fq-body">
                  We run our own fabrication floor with laser cutting, press brakes, 
                  welding bays, and finishing under one roof. That means we control 
                  the schedule and the standard from first cut to final check.
                </p>

                {/* Metrics Strip */}
                <div className="fq-metrics">
                  {FACILITY_METRICS.map((metric, index) => (
                    <div key={index} className="fq-metric">
                      <span className="fq-metric-value">
                        {metric.value}
                        <span className="fq-metric-suffix">{metric.suffix}</span>
                      </span>
                      <span className="fq-metric-label">{metric.label}</span>
                    </div>
                  ))}
                </div>

                <a href="/facility" className="btn btn-blue fq-btn">
                  Tour the Facility <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* ============ RIGHT - QUALITY ============ */}
          <motion.div
            className="fq-right"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="fq-card fq-card-quality">
              {/* Image Area - Top Left */}
              <div className="fq-image-area">
                <div className="fq-image-icon">
                  <ShieldCheck size={48} strokeWidth={1.5} />
                </div>
              </div>

              {/* Content Area */}
              <div className="fq-content-area">
                <span className="fq-eyebrow">Quality Control</span>
                <h2 className="fq-title">Checked at Every Stage</h2>
                <p className="fq-body">
                  We inspect material when it arrives, check parts during production, 
                  and sign off every job before it leaves. You get work that matches 
                  the drawing, plus the paperwork to prove it.
                </p>

                {/* Quality Points */}
                <div className="fq-quality-points">
                  {QUALITY_POINTS.map((point, index) => (
                    <div key={index} className="fq-quality-point">
                      <CheckCircle2 size={18} className="fq-quality-icon" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                <a href="/quality" className="btn btn-outline-blue fq-btn">
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