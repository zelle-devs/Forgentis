'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import './Whyforgentis.css';

const POINTS = [
  {
    number: '01',
    title: 'It fits the first time',
    desc: 'Every part is cut to tolerance and checked before it ships, so it goes together on site without rework.',
  },
  {
    number: '02',
    title: 'It arrives on schedule',
    desc: 'We plan the material and the floor around your deadline, then keep you posted.',
  },
  {
    number: '03',
    title: 'One team, start to finish',
    desc: 'From shop drawing to delivery, you deal with one point of contact.',
  },
  {
    number: '04',
    title: 'It is finished to last',
    desc: 'Coatings and treatments are chosen for the job, the load, and the weather.',
  },
];

export default function WhyForgentis({
  eyebrow = 'The Forgentis Standard',
  headline = 'Why Forgentis.',
  body = 'Four reasons manufacturers keep coming back to us, project after project.',
  points = POINTS,
  image = '/turkey.jpg',
  imageAlt = 'Forgentis manufacturing floor',
}) {
  return (
    <section className="wf-section">
      <div className="container2">

        {/* ==============================
            CENTERED HEADER
        ============================== */}

        <motion.div
          className="wf-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {eyebrow && <span className="wf-eyebrow">{eyebrow}</span>}
          <h2 className="wf-headline">{headline}</h2>
          {body && <p className="wf-body">{body}</p>}
        </motion.div>

        {/* ==============================
            POINTS LIST
        ============================== */}

        <div className="wf-list">
          {points.map((point, index) => (
            <motion.div
              key={index}
              className="wf-row"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{
                duration: 0.55,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="wf-number">{point.number}</span>
              <h3 className="wf-title">{point.title}</h3>
              <p className="wf-desc">{point.desc}</p>
              <span className="wf-arrow-btn" aria-hidden="true">
                <ArrowUpRight size={18} className="wf-arrow-icon" />
              </span>
            </motion.div>
          ))}
        </div>

        {/* ==============================
            FULL WIDTH IMAGE STRIP
        ============================== */}

        <motion.div
          className="wf-image-wrap"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src={image} alt={imageAlt} className="wf-image" draggable={false} />
        </motion.div>

      </div>
    </section>
  );
}