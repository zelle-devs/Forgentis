'use client';

import { useState } from 'react';
import { ArrowRight, ChevronRight, ChevronDown, Mail, MapPin, Phone } from 'lucide-react';
import './Footer.css';
import Image from 'next/image';
import { BsFacebook, BsInstagram, BsLinkedin, BsYoutube } from 'react-icons/bs';

const DEFAULT_COMPANIES = [
  'Forgentis Fabrications',
  'Print Pack Advertising',
  'Beyvora Decor',
  'Imprint Galerie',
];

const DEFAULT_LINKS = ['About', 'Capabilities', 'Industries', 'Approach'];

const DEFAULT_SOCIALS = [
  { icon: BsLinkedin, href: '#', label: 'LinkedIn' },
  { icon: BsInstagram, href: '#', label: 'Instagram' },
  { icon: BsFacebook, href: '#', label: 'Facebook' },
  { icon: BsYoutube, href: '#', label: 'YouTube' },
];

const DEFAULT_BUTTONS = [
  { label: 'Start a Project', href: '#', variant: 'gold' },
  { label: 'Explore Our Companies', href: '#', variant: 'outline' },
  { label: 'Talk To Our Team', href: '#', variant: 'outline' },
  { label: 'Contact Us', href: '#', variant: 'outline' },
];

export default function Footer({
  description = 'A.J Group of Companies, a diversified manufacturing and design group. Metal fabrication, print, packaging, advertising, and design brands, under one standard of making.',
  companies = DEFAULT_COMPANIES,
  links = DEFAULT_LINKS,
  phone = '+92 21 111 254 111',
  email = 'hello@ajgroup.com',
  address = 'A.J House, 23/1, Korangi Industrial Area, Karachi 74900, Pakistan',
  socials = DEFAULT_SOCIALS,
  buttons = DEFAULT_BUTTONS,
}) {
  const year = new Date().getFullYear();

  // State for Mobile Accordions
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    if (openSection === section) {
      setOpenSection(null); // Close if already open
    } else {
      setOpenSection(section); // Open clicked section
    }
  };

  return (
    <footer className="aj-footer">
      {/* decorative angled panel — purely visual, sits behind the CTA column */}
      <div className="aj-footer-diagonal-image" aria-hidden="true">
  <Image
    src="/footer-bg.png"
    alt=""
    fill
    priority
    sizes="(max-width: 640px) 70vw, (max-width: 900px) 55vw, (max-width: 1279px) 45vw, 33vw"
    className="aj-footer-diagonal-image-img"
  />
</div>

      <div className="container">
        <div className="aj-footer-top">
          {/* ---- Brand ---- */}
          <div className="aj-footer-col aj-footer-brand">
            <div className="aj-footer-logo">
              <Image
              src= "logo2.png"
                // src="/logo.png"
                alt="A.J Group of Companies"
                width={220}
                height={80}
                className="aj-footer-logo-image"
                unoptimized={true}
              />
            </div>
            <p className="aj-footer-desc">{description}</p>
          </div>

          {/* ---- Our Companies (Accordion on Mobile) ---- */}
          <div className="aj-footer-col">
            <div className="aj-footer-heading-wrapper" onClick={() => toggleSection('companies')}>
              <span className="aj-footer-heading">Our Companies</span>
              <button 
                className="aj-footer-toggle" 
                
              >
                <ChevronDown size={16} className={`aj-toggle-icon ${openSection === 'companies' ? 'open' : ''}`} />
              </button>
            </div>
            <ul className={`aj-footer-list ${openSection === 'companies' ? 'open' : ''}`}>
              {companies.map((c) => (
                <li key={c}>
                  <a href="#">
                    <ChevronRight size={13} />
                    <span>{c}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ---- Quick Links (Accordion on Mobile) ---- */}
          <div className="aj-footer-col">
            <div className="aj-footer-heading-wrapper" onClick={() => toggleSection('links')}>
              <span className="aj-footer-heading">Quick Links</span>
              <button 
                className="aj-footer-toggle" 
                
              >
                <ChevronDown size={16} className={`aj-toggle-icon ${openSection === 'links' ? 'open' : ''}`} />
              </button>
            </div>
            <ul className={`aj-footer-list ${openSection === 'links' ? 'open' : ''}`}>
              {links.map((l) => (
                <li key={l}>
                  <a href="#">
                    <ChevronRight size={13} />
                    <span>{l}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ---- Get In Touch (Accordion on Mobile) ---- */}
          <div className="aj-footer-col aj-footer-contact">
            <div className="aj-footer-heading-wrapper" onClick={() => toggleSection('contact')}>
              <span className="aj-footer-heading">Get In Touch</span>
              <button 
                className="aj-footer-toggle" 
                
              >
                <ChevronDown size={16} className={`aj-toggle-icon ${openSection === 'contact' ? 'open' : ''}`} />
              </button>
            </div>
            <ul className={`aj-footer-contact-list ${openSection === 'contact' ? 'open' : ''}`}>
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

          {/* ---- CTA (sits over the diagonal panel) ---- */}
          <div className="aj-footer-col aj-footer-cta">
            <div className="aj-footer-socials">
              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label} className="aj-footer-social-btn">
                  <Icon size={16} />
                </a>
              ))}
            </div>

            <div className="aj-footer-buttons">
              {buttons.map((b) => (
                <a
                  key={b.label}
                  href={b.href}
                  className={`aj-footer-btn ${b.variant === 'gold' ? 'is-gold' : 'is-outline'}`}
                >
                  <span>{b.label}</span>
                  <ArrowRight size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ---- Bottom bar ---- */}
        <div className="aj-footer-bottom">
          <p className="aj-footer-copyright">
            © {year} A.J Group of Companies. All rights reserved.
          </p>
          <div className="aj-footer-bottom-links">
             <a href="#">Careers</a>
            <span className="aj-footer-dot">|</span>
            <a href="#">Contact</a>
            <span className="aj-footer-dot">|</span>
            <a href="#">Privacy Policy</a>
            <span className="aj-footer-dot">|</span>
            <a href="#">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}