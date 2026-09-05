'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import './Whyforgentis.css';

const DEFAULT_POINTS = [
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
  eyebrow = '',
  headline = '',
  body = '',
  points = [],
  image = '',
  imageAlt = 'Forgentis manufacturing floor',
  showImage = true,
  showPoints = true,
  showArrowButton = true,
  backgroundColor = '',
  backgroundImage = '',
  boxBackground = 'var(--color-black)',
  boxBorder = 'var(--color-black-medium)',
  showBox = true,
}) {
  const displayPoints = points.length > 0 ? points : DEFAULT_POINTS;
  const hasHeader = eyebrow || headline || body;
  const hasImage = showImage && image;

  return (
    <section
      className="wf-section"
      style={backgroundColor ? { backgroundColor } : {}}
    >
      {/* Dynamic Background Image */}
      {backgroundImage && (
        <div className="wf-bg-image">
          <Image
            src={backgroundImage}
            alt=""
            fill
            sizes="100vw"
            className="wf-bg-img"
            aria-hidden="true"
          />
        </div>
      )}

      {/* Static Section Background */}
      <div className="wf-section-bg">
        <Image
          src="/optimize/title-bg2.webp"
          alt=""
          fill
          sizes="100vw"
          className="wf-section-bg-img"
          aria-hidden="true"
        />
      </div>

      <div className="container2">
        <div
          className={`${showBox ? 'box container' : 'container'}`}
          style={
            showBox
              ? {
                  backgroundColor: boxBackground,
                  borderColor: boxBorder,
                }
              : {}
          }
        >
          {/* Header */}
          {hasHeader && (
            <motion.div
              className="wf-header"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {eyebrow && (
                <span className="wf-eyebrow">
                  {eyebrow}
                </span>
              )}

              {headline && (
                <h2 className="wf-headline">
                  {headline}
                </h2>
              )}

              {body && (
                <p className="wf-body">
                  {body}
                </p>
              )}
            </motion.div>
          )}

          {/* Points List */}
          {showPoints && displayPoints.length > 0 && (
            <div className="wf-list">
              {displayPoints.map((point, index) => (
                <motion.div
                  key={point.id || index}
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
                  {point.number && (
                    <span className="wf-number">
                      {point.number}
                    </span>
                  )}

                  {point.title && (
                    <h3 className="wf-title">
                      {point.title}
                    </h3>
                  )}

                  {point.desc && (
                    <p className="wf-desc">
                      {point.desc}
                    </p>
                  )}

                  {showArrowButton && (
                    <span
                      className="wf-arrow-btn"
                      aria-hidden="true"
                    >
                      <ArrowUpRight
                        size={18}
                        className="wf-arrow-icon"
                      />
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {/* Image Strip */}
          {hasImage && (
            <motion.div
              className="wf-image-wrap"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="
                  (max-width: 767px) 100vw,
                  (max-width: 1439px) 90vw,
                  1200px
                "
                className="wf-image"
                draggable={false}
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

// 'use client';

// import { motion } from 'framer-motion';
// import { ArrowUpRight } from 'lucide-react';
// import './Whyforgentis.css';
// import Image from 'next/image';

// const DEFAULT_POINTS = [
//   {
//     number: '01',
//     title: 'It fits the first time',
//     desc: 'Every part is cut to tolerance and checked before it ships, so it goes together on site without rework.',
//   },
//   {
//     number: '02',
//     title: 'It arrives on schedule',
//     desc: 'We plan the material and the floor around your deadline, then keep you posted.',
//   },
//   {
//     number: '03',
//     title: 'One team, start to finish',
//     desc: 'From shop drawing to delivery, you deal with one point of contact.',
//   },
//   {
//     number: '04',
//     title: 'It is finished to last',
//     desc: 'Coatings and treatments are chosen for the job, the load, and the weather.',
//   },
// ];

// export default function WhyForgentis({
//   eyebrow = '',
//   headline = '',
//   body = '',
//   points = [],
//   image = '',
//   imageAlt = 'Forgentis manufacturing floor',
//   showImage = true,
//   showPoints = true,
//   showArrowButton = true,
//   backgroundColor = '',
//   backgroundImage = '',
//   boxBackground = 'var(--color-black)',
//   boxBorder = 'var(--color-black-medium)',
//   showBox = true,
// }) {
//   const displayPoints = points.length > 0 ? points : DEFAULT_POINTS;
//   const hasHeader = eyebrow || headline || body;
//   const hasImage = showImage && image;

//   return (
//     <section 
//       className="wf-section"
//       style={backgroundColor ? { backgroundColor } : {}}
//     >
//       {backgroundImage && (
//         <div 
//           className="wf-bg-image"
//           style={{ backgroundImage: `url(${backgroundImage})` }}
//         />
//       )}

//       <div className="container2">
//         <div 
//           className={`${showBox ? 'box container' : 'container'}`}
//           style={showBox ? { backgroundColor: boxBackground, borderColor: boxBorder } : {}}
//         >
//           {/* Header */}
//           {hasHeader && (
//             <motion.div
//               className="wf-header"
//               initial={{ opacity: 0, y: 24 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: '-10%' }}
//               transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
//             >
//               {eyebrow && <span className="wf-eyebrow">{eyebrow}</span>}
//               {headline && <h2 className="wf-headline">{headline}</h2>}
//               {body && <p className="wf-body">{body}</p>}
//             </motion.div>
//           )}

//           {/* Points List */}
//           {showPoints && displayPoints.length > 0 && (
//             <div className="wf-list">
//               {displayPoints.map((point, index) => (
//                 <motion.div
//                   key={point.id || index}
//                   className="wf-row"
//                   initial={{ opacity: 0, y: 18 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true, margin: '-10%' }}
//                   transition={{
//                     duration: 0.55,
//                     delay: index * 0.1,
//                     ease: [0.22, 1, 0.36, 1],
//                   }}
//                 >
//                   {point.number && <span className="wf-number">{point.number}</span>}
//                   {point.title && <h3 className="wf-title">{point.title}</h3>}
//                   {point.desc && <p className="wf-desc">{point.desc}</p>}
//                   {showArrowButton && (
//                     <span className="wf-arrow-btn" aria-hidden="true">
//                       <ArrowUpRight size={18} className="wf-arrow-icon" />
//                     </span>
//                   )}
//                 </motion.div>
//               ))}
//             </div>
//           )}

//           {/* Image Strip */}
//           {hasImage && (
//             <motion.div
//               className="wf-image-wrap"
//               initial={{ opacity: 0, scale: 0.98 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true, margin: '-10%' }}
//               transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
//             >
//               <Image 
//                 src={image} 
//                 alt={imageAlt} 
//                 width={1200} 
//                 height={800} 
//                 priority 
//                 className="wf-image" 
//                 draggable={false} 
//                 unoptimized={true} 
//               />
//             </motion.div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }