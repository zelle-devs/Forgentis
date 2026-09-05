'use client';

import { motion } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';
import Image from 'next/image';
import './CTASection.css';

export default function CTASection({
  eyebrow = '',
  headline = '',
  body = '',
  buttonText = '',
  buttonLink = '/consultation',
  showButton = true,
  buttonIcon = true,
  buttonIconComponent = null,
  buttonIconSize = 18,
  buttonIconPosition = 'left',
  showGlow = true,
  showGridPattern = true,
  backgroundColor = '',
  backgroundImage = '',
  wrapperBackground = 'rgba(13, 13, 13, 0.85)',
  wrapperBorder = 'var(--color-dark-border)',
  eyebrowColor = '',
  headlineColor = '',
  bodyColor = '',
}) {
  const hasContent = eyebrow || headline || body;
  const hasButton = showButton && buttonText;

  const ButtonIcon = buttonIconComponent || FileText;

  return (
    <section
      className="cta2-section"
      style={backgroundColor ? { backgroundColor } : {}}
    >
      {/* Dynamic Background Image */}
      {backgroundImage && (
        <div className="cta2-bg-image">
          <Image
            src={backgroundImage}
            alt=""
            fill
            sizes="100vw"
            className="cta2-bg-img"
            aria-hidden="true"
          />
        </div>
      )}

      {/* Static Section Background */}
      <div className="cta2-section-bg">
        <Image
          src="/optimize/title-bg2.webp"
          alt=""
          fill
          sizes="100vw"
          className="cta2-section-bg-img"
          aria-hidden="true"
        />
      </div>

      <div className="container2">
        <div
          className="cta2-wrapper"
          style={{
            background: wrapperBackground,
            borderColor: wrapperBorder,
          }}
        >
          {/* Background Glow Effects */}
          {showGlow && (
            <>
              <div className="cta2-glow cta2-glow--top" />
              <div className="cta2-glow cta2-glow--bottom" />
            </>
          )}

          {/* Grid Pattern */}
          {showGridPattern && (
            <div className="cta2-grid-pattern" />
          )}

          {/* Content */}
          {(hasContent || hasButton) && (
            <motion.div
              className={`cta2-content ${
                !hasButton ? 'no-button' : ''
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
                margin: '-10%',
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Left - Text */}
              {hasContent && (
                <div className="cta2-text-group">

                  {eyebrow && (
                    <motion.span
                      className="cta2-eyebrow"
                      style={
                        eyebrowColor
                          ? { color: eyebrowColor }
                          : {}
                      }
                      initial={{
                        opacity: 0,
                        x: -20,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        delay: 0.2,
                      }}
                    >
                      {eyebrow}
                    </motion.span>
                  )}

                  {headline && (
                    <motion.h2
                      className="cta2-headline"
                      style={
                        headlineColor
                          ? { color: headlineColor }
                          : {}
                      }
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.7,
                        delay: 0.3,
                      }}
                    >
                      {headline}
                    </motion.h2>
                  )}

                  {body && (
                    <motion.p
                      className="cta2-body"
                      style={
                        bodyColor
                          ? { color: bodyColor }
                          : {}
                      }
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.7,
                        delay: 0.4,
                      }}
                    >
                      {body}
                    </motion.p>
                  )}

                </div>
              )}

              {/* Right - Button */}
              {hasButton && (
                <motion.div
                  className="cta2-button-group"
                  initial={{
                    opacity: 0,
                    x: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: 0.5,
                  }}
                >
                  <motion.a
                    href={buttonLink}
                    className="btn btn-blue cta2-btn"
                    whileTap={{ scale: 0.98 }}
                  >
                    {buttonIcon &&
                      buttonIconPosition === 'left' && (
                        <ButtonIcon
                          size={buttonIconSize}
                        />
                      )}

                    {buttonText}

                    {buttonIcon &&
                      buttonIconPosition === 'right' && (
                        <ButtonIcon
                          size={buttonIconSize}
                        />
                      )}

                    <ArrowRight
                      size={buttonIconSize}
                    />
                  </motion.a>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

// 'use client';

// import { motion } from 'framer-motion';
// import { ArrowRight, FileText } from 'lucide-react';
// import './CTASection.css';

// export default function CTASection({
//   eyebrow = '',
//   headline = '',
//   body = '',
//   buttonText = '',
//   buttonLink = '/consultation',
//   showButton = true,
//   buttonIcon = true,
//   buttonIconComponent = null,  
//   buttonIconSize = 18,  
//   buttonIconPosition = 'left',
//   showGlow = true,
//   showGridPattern = true,
//   backgroundColor = '',
//   backgroundImage = '',
//   wrapperBackground = 'rgba(13, 13, 13, 0.85)',
//   wrapperBorder = 'var(--color-dark-border)',
//   eyebrowColor = '',
//   headlineColor = '',
//   bodyColor = '',
// }) {
//   const hasContent = eyebrow || headline || body;
//   const hasButton = showButton && buttonText;

//   return (
//     <section 
//       className="cta2-section"
//       style={backgroundColor ? { backgroundColor } : {}}
//     >
//       {backgroundImage && (
//         <div 
//           className="cta2-bg-image"
//           style={{ backgroundImage: `url(${backgroundImage})` }}
//         />
//       )}

//       <div className="container2">
//         <div 
//           className="cta2-wrapper"
//           style={{ 
//             background: wrapperBackground,
//             borderColor: wrapperBorder,
//           }}
//         >
//           {/* Background Glow Effects */}
//           {showGlow && (
//             <>
//               <div className="cta2-glow cta2-glow--top" />
//               <div className="cta2-glow cta2-glow--bottom" />
//             </>
//           )}

//           {/* Grid Pattern */}
//           {showGridPattern && <div className="cta2-grid-pattern" />}

//           {/* Content */}
//           {(hasContent || hasButton) && (
//             <motion.div 
//               className={`cta2-content ${!hasButton ? 'no-button' : ''}`}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: '-10%' }}
//               transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
//             >
//               {/* Left - Eyebrow + Headline + Body */}
//               {hasContent && (
//                 <div className="cta2-text-group">
//                   {eyebrow && (
//                     <motion.span 
//                       className="cta2-eyebrow"
//                       style={eyebrowColor ? { color: eyebrowColor } : {}}
//                       initial={{ opacity: 0, x: -20 }}
//                       whileInView={{ opacity: 1, x: 0 }}
//                       viewport={{ once: true }}
//                       transition={{ duration: 0.6, delay: 0.2 }}
//                     >
//                       {eyebrow}
//                     </motion.span>
//                   )}
                  
//                   {headline && (
//                     <motion.h2 
//                       className="cta2-headline"
//                       style={headlineColor ? { color: headlineColor } : {}}
//                       initial={{ opacity: 0, y: 20 }}
//                       whileInView={{ opacity: 1, y: 0 }}
//                       viewport={{ once: true }}
//                       transition={{ duration: 0.7, delay: 0.3 }}
//                     >
//                       {headline}
//                     </motion.h2>
//                   )}

//                   {body && (
//                     <motion.p 
//                       className="cta2-body"
//                       style={bodyColor ? { color: bodyColor } : {}}
//                       initial={{ opacity: 0, y: 20 }}
//                       whileInView={{ opacity: 1, y: 0 }}
//                       viewport={{ once: true }}
//                       transition={{ duration: 0.7, delay: 0.4 }}
//                     >
//                       {body}
//                     </motion.p>
//                   )}
//                 </div>
//               )}

//               {/* Right - Button */}
//               {hasButton && (
//                 <motion.div 
//                   className="cta2-button-group"
//                   initial={{ opacity: 0, x: 30 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.7, delay: 0.5 }}
//                 >
//                    <motion.a 
//       href={buttonLink} 
//       className="btn btn-blue cta2-btn"
//       whileTap={{ scale: 0.98 }}
//     >
//       {buttonIcon && buttonIconComponent && buttonIconPosition === 'left' && (
//         <buttonIconComponent size={buttonIconSize} />
//       )}
//       {buttonIcon && !buttonIconComponent && buttonIconPosition === 'left' && (
//         <FileText size={buttonIconSize} />
//       )}
//       {buttonText}
//       {buttonIcon && buttonIconComponent && buttonIconPosition === 'right' && (
//         <buttonIconComponent size={buttonIconSize} />
//       )}
//       {buttonIcon && !buttonIconComponent && buttonIconPosition === 'right' && (
//         <FileText size={buttonIconSize} />
//       )}
//       <ArrowRight size={buttonIconSize} />
//     </motion.a>
//                 </motion.div>
//               )}
//             </motion.div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }