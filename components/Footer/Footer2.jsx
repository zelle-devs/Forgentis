'use client';

import { useState } from 'react';
import { ChevronRight, ChevronDown, Mail, MapPin, Phone, Clock } from 'lucide-react';
import './Footer2.css';
import Image from 'next/image';
import { BsFacebook, BsInstagram, BsLinkedin, BsYoutube } from 'react-icons/bs';

const DEFAULT_COMPANY_LINKS = ['About', 'Capabilities', 'Industries', 'Quality', 'Facilities'];
const DEFAULT_WORK_LINKS = ['Projects', 'Process', 'Resources', 'Request a Quote'];

const DEFAULT_SOCIALS = [
  { icon: BsLinkedin, href: '#', label: 'LinkedIn' },
  { icon: BsInstagram, href: '#', label: 'Instagram' },
  { icon: BsFacebook, href: '#', label: 'Facebook' },
  { icon: BsYoutube, href: '#', label: 'YouTube' },
];

const PROCESS_IMAGES = [
  { id: 1, number: '01', name: 'Cut', image: '/Step1.png' },
  { id: 2, number: '02', name: 'Form', image: '/Step2.png' },
  { id: 3, number: '03', name: 'Weld', image: '/Step3.png' },
  { id: 4, number: '04', name: 'Finish', image: '/Step4.png' },
  { id: 5, number: '05', name: 'Deliver', image: '/Step5.png' },
];

export default function Footer2({
  tagline = 'Forgentis Fabrications. Metal, cut and built to last.',
  companyLinks = DEFAULT_COMPANY_LINKS,
  workLinks = DEFAULT_WORK_LINKS,
  phone = '+92 21 111 254 111',
  email = 'hello@forgentis.com',
  address = '23/1, Korangi Industrial Area, Karachi 74900, Pakistan',
  hours = 'Mon – Sat: 9:00 AM – 6:00 PM',
  socials = DEFAULT_SOCIALS,
  processImages = PROCESS_IMAGES,
}) {
  const year = new Date().getFullYear();
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    if (openSection === section) {
      setOpenSection(null);
    } else {
      setOpenSection(section);
    }
  };

  return (
    <footer className="ftr2-footer">
      {/* Top Parallelogram Image Strip — untouched */}
      <div className="ftr2-process-strip">
        {processImages.map((item) => (
          <div key={item.id} className="ftr2-process-item">
            <div
              className="ftr2-process-image"
              style={{ backgroundImage: `url(${item.image})` }}
            />
            <div className="ftr2-process-overlay" />
            <div className="ftr2-process-label">
              <span className="ftr2-process-number">{item.number}</span>
              <span className="ftr2-process-name">{item.name}</span>
            </div>
          </div>
        ))}
      </div>

{/* Main Tagline */}
      <div className="ftr2-tagline-banner">
        <div className="ftr2-tagline-wrap">
          <span className="ftr2-tagline-line" />
          <p className="ftr2-tagline-text">
            Forgentis Fabrications. Metal, cut and built to last.
          </p>
          <span className="ftr2-tagline-line" />
        </div>
      </div>
      
      {/* Bottom Content */}
      <div className="container">
        <div className="ftr2-main container">
          <div className="ftr2-top">
            {/* Brand + Hours */}
            <div className="ftr2-col ftr2-brand">
              <div className="ftr2-logo">
                <Image
                  src="footerlogo.png"
                  alt="Forgentis Fabrication"
                  width={160}
                  height={60}
                  className="ftr2-logo-image"
                  unoptimized={true}
                />
              </div>
              {/* <p className="ftr2-desc">{tagline}</p> */}

              <div className="ftr2-hours-block">
                <span className="ftr2-hours-icon">
                  <Clock size={15} />
                </span>
                <div className="ftr2-hours-text">
                  <span className="ftr2-hours-label">Working Hours</span>
                  <span className="ftr2-hours-value">{hours}</span>
                </div>
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
                  <li key={link}>
                    <a href="#">
                      <ChevronRight size={13} />
                      <span>{link}</span>
                    </a>
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
                  <li key={link}>
                    <a href="#">
                      <ChevronRight size={13} />
                      <span>{link}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact + Socials */}
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
                <div className="ftr2-socials">
                  {socials.map(({ icon: Icon, href, label }) => (
                    <a key={label} href={href} aria-label={label} className="ftr2-social-btn">
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

       {/* Bottom bar */}
<div className="ftr2-bottom">

  <p className="ftr2-copyright">
    © {year} Forgentis Fabrications. All rights reserved.
  </p>
  {/* Socials - Center */}
  <div className="ftr2-socials">
    {socials.map(({ icon: Icon, href, label }) => (
      <a key={label} href={href} aria-label={label} className="ftr2-social-btn">
        <Icon size={14} />
      </a>
    ))}
  </div>
  <div className="ftr2-bottom-links">
    <a href="#">Careers</a>
    <span className="ftr2-dot">|</span>
    <a href="#">Privacy Policy</a>
    <span className="ftr2-dot">|</span>
    <a href="#">Terms</a>
  </div>
</div>
      </div>
    </footer>
  );
}