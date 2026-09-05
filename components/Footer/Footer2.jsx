'use client';

import { useState } from 'react';
import { ChevronRight, ChevronDown, Mail, MapPin, Phone, Clock } from 'lucide-react';
import './Footer2.css';
import Image from 'next/image';
import Link from 'next/link';
import { BsFacebook, BsInstagram, BsLinkedin, BsYoutube } from 'react-icons/bs';

const DEFAULT_SOCIALS = [
  { icon: BsLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: BsInstagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: BsFacebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: BsYoutube, href: 'https://youtube.com', label: 'YouTube' },
];

const PROCESS_IMAGES = [
  { id: 1, number: '01', name: 'Cut', image: '/optimize/1cut.webp' },
  { id: 2, number: '02', name: 'Form', image: '/optimize/step2.webp' },
  { id: 3, number: '03', name: 'Weld', image: '/optimize/step3.webp' },
  { id: 4, number: '04', name: 'Finish', image: '/optimize/step4.webp' },
  { id: 5, number: '05', name: 'Deliver', image: '/optimize/step5.webp' },
];

const COMPANY_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Capabilities', href: '/capabilities' },
  { label: 'Industries', href: '/industries' },
  { label: 'Quality', href: '/quality' },
  { label: 'Facilities', href: '/facilities' },
];

const WORK_LINKS = [
  // { label: 'Projects', href: '/projects' },
  { label: 'Process', href: '/process' },
  // { label: 'Resources', href: '/resources' },
  { label: 'Request a Quote', href: '/consultation' },
];

// const BOTTOM_LINKS = [
//   { label: 'Careers', href: '/careers' },
//   { label: 'Privacy Policy', href: '/privacy' },
//   { label: 'Terms', href: '/terms' },
// ];

export default function Footer2({
  tagline = 'Forgentis Fabrications. Metal, cut and built to last.',
  phone = '+92 21 111 254 111',
  email = 'hello@forgentisfabrication.com',
  address = '23/1, Korangi Industrial Area, Karachi 74900, Pakistan',
  hours = 'Mon – Sat: 9:00 AM – 6:00 PM',
  socials = DEFAULT_SOCIALS,
  processImages = PROCESS_IMAGES,
  companyLinks = COMPANY_LINKS,
  workLinks = WORK_LINKS,
  // bottomLinks = BOTTOM_LINKS,
}) {
  const year = new Date().getFullYear();
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className='full'>
    <footer className="ftr2-footer">
      {/* Top Parallelogram Image Strip */}
      <div className="ftr2-process-strip">
        {processImages.map((item) => (
          <Link key={item.id} href="/process" className="ftr2-process-item">
            <div
              className="ftr2-process-image"
              style={{ backgroundImage: `url(${item.image})` }}
            />
            <div className="ftr2-process-overlay" />
            <div className="ftr2-process-label">
              <span className="ftr2-process-number">{item.number}</span>
              <span className="ftr2-process-name">{item.name}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Main Tagline */}
      <div className="ftr2-tagline-banner">
        <div className="ftr2-tagline-wrap">
          <span className="ftr2-tagline-line" />
          <p className="ftr2-tagline-text">{tagline}</p>
          <span className="ftr2-tagline-line" />
        </div>
      </div>

      {/* Bottom Content */}
      <div className="container">
        <div className="ftr2-main container">
          <div className="ftr2-top">
            {/* Brand + Socials */}
            <div className="ftr2-col ftr2-brand">
              <div className="ftr2-logo">
                <Image
                  src="optimize/footerlogo.webp"
                  alt="Forgentis Fabrication"
                  width={160}
                  height={60}
                  className="ftr2-logo-image"
                  unoptimized={true}
                />
              </div>
              <div className="ftr2-socials ftr2-socials-brand">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="ftr2-social-btn">
                    <Icon size={25} />
                  </a>
                ))}
              </div>
            </div>

            {/* Company */}
            <div className="ftr2-col">
              <div className="ftr2-heading-wrapper" onClick={() => toggleSection('company')}>
                <span className="ftr2-heading">Company</span>
                <button className="ftr2-toggle" aria-label="Toggle company links">
                  <ChevronDown size={16} className={`ftr2-toggle-icon ${openSection === 'company' ? 'open' : ''}`} />
                </button>
              </div>
              <ul className={`ftr2-list ${openSection === 'company' ? 'open' : ''}`}>
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>
                      <ChevronRight size={13} />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Work */}
            <div className="ftr2-col">
              <div className="ftr2-heading-wrapper" onClick={() => toggleSection('work')}>
                <span className="ftr2-heading">Work</span>
                <button className="ftr2-toggle" aria-label="Toggle work links">
                  <ChevronDown size={16} className={`ftr2-toggle-icon ${openSection === 'work' ? 'open' : ''}`} />
                </button>
              </div>
              <ul className={`ftr2-list ${openSection === 'work' ? 'open' : ''}`}>
                {workLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}>
                      <ChevronRight size={13} />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="ftr2-col ftr2-contact-col">
              <div className="ftr2-heading-wrapper" onClick={() => toggleSection('contact')}>
                <span className="ftr2-heading">Contact</span>
                <button className="ftr2-toggle" aria-label="Toggle contact details">
                  <ChevronDown size={16} className={`ftr2-toggle-icon ${openSection === 'contact' ? 'open' : ''}`} />
                </button>
              </div>
              <div className={`ftr2-contact-body ${openSection === 'contact' ? 'open' : ''}`}>
                <ul className="ftr2-contact-list">
                  <li>
                    <Phone size={15} />
                    <a href={`tel:${phone.replace(/\s+/g, '')}`}>{phone}</a>
                  </li>
                  <li>
                    <Mail size={15} />
                    <a href={`mailto:${email}`}>{email}</a>
                  </li>
                  <li>
                    <MapPin size={15} />
                    <span>{address}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="ftr2-bottom">
          <p className="ftr2-copyright">
            © {year} Forgentis Fabrications. All Rights Reserved.
          </p>
          <p className="ftr2-copyright">
            Designed and Managed by <span className='zelle'><a href="https://zellesolutions.com/" target='_blank'>Zelle Solutions Pvt. Ltd.</a></span>
          </p>
          {/* <div className="ftr2-hours-inline">
            <Clock size={13} />
            <span>{hours}</span>
          </div> */}
          {/* <div className="ftr2-bottom-links">
            {bottomLinks.map((link, index) => (
              <span key={link.label} className="ftr2-bottom-link-item">
                {index > 0 && <span className="ftr2-dot">|</span>}
                <Link href={link.href}>{link.label}</Link>
              </span>
            ))}
          </div> */}
        </div>
      </div>
    </footer>
    </div>
  );
}

// 'use client';

// import { useState } from 'react';
// import { ChevronRight, ChevronDown, Mail, MapPin, Phone, Clock } from 'lucide-react';
// import './Footer2.css';
// import Image from 'next/image';
// import { BsFacebook, BsInstagram, BsLinkedin, BsYoutube } from 'react-icons/bs';

// const DEFAULT_COMPANY_LINKS = ['About', 'Capabilities', 'Industries', 'Quality', 'Facilities'];
// const DEFAULT_WORK_LINKS = ['Projects', 'Process', 'Resources', 'Request a Quote'];

// const DEFAULT_SOCIALS = [
//   { icon: BsLinkedin, href: '#', label: 'LinkedIn' },
//   { icon: BsInstagram, href: '#', label: 'Instagram' },
//   { icon: BsFacebook, href: '#', label: 'Facebook' },
//   { icon: BsYoutube, href: '#', label: 'YouTube' },
// ];

// const PROCESS_IMAGES = [
//   { id: 1, number: '01', name: 'Cut', image: '/step1.png' },
//   { id: 2, number: '02', name: 'Form', image: '/step2.png' },
//   { id: 3, number: '03', name: 'Weld', image: '/step3.png' },
//   { id: 4, number: '04', name: 'Finish', image: '/step4.png' },
//   { id: 5, number: '05', name: 'Deliver', image: '/step5.png' },
// ];

// export default function Footer2({
//   tagline = 'Forgentis Fabrications. Metal, cut and built to last.',
//   companyLinks = DEFAULT_COMPANY_LINKS,
//   workLinks = DEFAULT_WORK_LINKS,
//   phone = '+92 21 111 254 111',
//   email = 'hello@forgentis.com',
//   address = '23/1, Korangi Industrial Area, Karachi 74900, Pakistan',
//   hours = 'Mon – Sat: 9:00 AM – 6:00 PM',
//   socials = DEFAULT_SOCIALS,
//   processImages = PROCESS_IMAGES,
// }) {
//   const year = new Date().getFullYear();
//   const [openSection, setOpenSection] = useState(null);

//   const toggleSection = (section) => {
//     if (openSection === section) {
//       setOpenSection(null);
//     } else {
//       setOpenSection(section);
//     }
//   };

//   return (
//     <footer className="ftr2-footer">
//       {/* Top Parallelogram Image Strip — untouched */}
//       <div className="ftr2-process-strip">
//         {processImages.map((item) => (
//           <div key={item.id} className="ftr2-process-item">
//             <div
//               className="ftr2-process-image"
//               style={{ backgroundImage: `url(${item.image})` }}
//             />
//             <div className="ftr2-process-overlay" />
//             <div className="ftr2-process-label">
//               <span className="ftr2-process-number">{item.number}</span>
//               <span className="ftr2-process-name">{item.name}</span>
//             </div>
//           </div>
//         ))}
//       </div>

// {/* Main Tagline */}
//       <div className="ftr2-tagline-banner">
//         <div className="ftr2-tagline-wrap">
//           <span className="ftr2-tagline-line" />
//           <p className="ftr2-tagline-text">
//             Forgentis Fabrications. Metal, cut and built to last.
//           </p>
//           <span className="ftr2-tagline-line" />
//         </div>
//       </div>
      
//       {/* Bottom Content */}
//       <div className="container">
//         <div className="ftr2-main container">
//           <div className="ftr2-top">
//             {/* Brand + Hours */}
//             <div className="ftr2-col ftr2-brand">
//               <div className="ftr2-logo">
//                 <Image
//                   src="footerlogo.png"
//                   alt="Forgentis Fabrication"
//                   width={160}
//                   height={60}
//                   className="ftr2-logo-image"
//                   unoptimized={true}
//                 />
//               </div>

//                             <div className="ftr2-socials ftr2-socials-brand">
//                 {socials.map(({ icon: Icon, href, label }) => (
//                   <a key={label} href={href} aria-label={label} className="ftr2-social-btn">
//                     <Icon size={25} />
//                   </a>
//                 ))}
//               </div>
//             </div>

//             {/* Company */}
//             <div className="ftr2-col">
//               <div className="ftr2-heading-wrapper" onClick={() => toggleSection('company')}>
//                 <span className="ftr2-heading">Company</span>
//                 <button className="ftr2-toggle" aria-label="Toggle company links">
//                   <ChevronDown size={16} className={`ftr2-toggle-icon ${openSection === 'company' ? 'open' : ''}`} />
//                 </button>
//               </div>
//               <ul className={`ftr2-list ${openSection === 'company' ? 'open' : ''}`}>
//                 {companyLinks.map((link) => (
//                   <li key={link}>
//                     <a href="#">
//                       <ChevronRight size={13} />
//                       <span>{link}</span>
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Work */}
//             <div className="ftr2-col">
//               <div className="ftr2-heading-wrapper" onClick={() => toggleSection('work')}>
//                 <span className="ftr2-heading">Work</span>
//                 <button className="ftr2-toggle" aria-label="Toggle work links">
//                   <ChevronDown size={16} className={`ftr2-toggle-icon ${openSection === 'work' ? 'open' : ''}`} />
//                 </button>
//               </div>
//               <ul className={`ftr2-list ${openSection === 'work' ? 'open' : ''}`}>
//                 {workLinks.map((link) => (
//                   <li key={link}>
//                     <a href="#">
//                       <ChevronRight size={13} />
//                       <span>{link}</span>
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Contact + Socials */}
//             <div className="ftr2-col ftr2-contact-col">
//               <div className="ftr2-heading-wrapper" onClick={() => toggleSection('contact')}>
//                 <span className="ftr2-heading">Contact</span>
//                 <button className="ftr2-toggle" aria-label="Toggle contact details">
//                   <ChevronDown size={16} className={`ftr2-toggle-icon ${openSection === 'contact' ? 'open' : ''}`} />
//                 </button>
//               </div>
//               <div className={`ftr2-contact-body ${openSection === 'contact' ? 'open' : ''}`}>
//                 <ul className="ftr2-contact-list">
//                   <li>
//                     <Phone size={15} />
//                     <a href={`tel:${phone.replace(/\s+/g, '')}`}>{phone}</a>
//                   </li>
//                   <li>
//                     <Mail size={15} />
//                     <a href={`mailto:${email}`}>{email}</a>
//                   </li>
//                   <li>
//                     <MapPin size={15} />
//                     <span>{address}</span>
//                   </li>
//                 </ul>
               
//               </div>
//             </div>
//           </div>
//         </div>

//        {/* Bottom bar */}
// <div className="ftr2-bottom">

//   <p className="ftr2-copyright">
//     © {year} Forgentis Fabrications. All rights reserved.
//   </p>
//     <div className="ftr2-hours-inline">
//     <Clock size={13} />
//     <span>{hours}</span>
//   </div>
//   <div className="ftr2-bottom-links">
//     <a href="#">Careers</a>
//     <span className="ftr2-dot">|</span>
//     <a href="#">Privacy Policy</a>
//     <span className="ftr2-dot">|</span>
//     <a href="#">Terms</a>
//   </div>
// </div>
//       </div>
//     </footer>
//   );
// }