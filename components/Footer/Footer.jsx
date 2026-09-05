'use client';

import { useState } from 'react';
import { ChevronRight, ChevronDown, Mail, MapPin, Phone, Clock } from 'lucide-react';
import './Footer.css';
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

export default function Footer({
  tagline = 'Forgentis Fabrications. Metal, cut and built to last.',
  companyLinks = DEFAULT_COMPANY_LINKS,
  workLinks = DEFAULT_WORK_LINKS,
  phone = '+92 21 111 254 111',
  email = 'hello@forgentis.com',
  address = '23/1, Korangi Industrial Area, Karachi 74900, Pakistan',
  hours = 'Mon – Sat: 9:00 AM – 6:00 PM',
  socials = DEFAULT_SOCIALS,
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
    <footer className="aj-footer">
      <div className="aj-footer-diagonal-image" aria-hidden="true">
        <Image
          src="/optimize/footer-bg.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 640px) 70vw, (max-width: 900px) 55vw, (max-width: 1279px) 45vw, 33vw"
          className="aj-footer-diagonal-image-img"
        />
      </div>

      <div className="container">
        <div className="aj-footer-top">
          {/* Brand + Tagline */}
          <div className="aj-footer-col aj-footer-brand">
            <div className="aj-footer-logo">
              <Image
                src="ForgentisLogo1.png"
                alt="Forgentis Fabrication"
                width={220}
                height={80}
                className="aj-footer-logo-image"
                unoptimized={true}
              />
            </div>
            <p className="aj-footer-desc">{tagline}</p>
          </div>

          {/* Company */}
          <div className="aj-footer-col">
            <div className="aj-footer-heading-wrapper" onClick={() => toggleSection('company')}>
              <span className="aj-footer-heading">Company</span>
              <button className="aj-footer-toggle">
                <ChevronDown size={16} className={`aj-toggle-icon ${openSection === 'company' ? 'open' : ''}`} />
              </button>
            </div>
            <ul className={`aj-footer-list ${openSection === 'company' ? 'open' : ''}`}>
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
          <div className="aj-footer-col">
            <div className="aj-footer-heading-wrapper" onClick={() => toggleSection('work')}>
              <span className="aj-footer-heading">Work</span>
              <button className="aj-footer-toggle">
                <ChevronDown size={16} className={`aj-toggle-icon ${openSection === 'work' ? 'open' : ''}`} />
              </button>
            </div>
            <ul className={`aj-footer-list ${openSection === 'work' ? 'open' : ''}`}>
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

          {/* Contact */}
          <div className="aj-footer-col aj-footer-contact">
            <div className="aj-footer-heading-wrapper" onClick={() => toggleSection('contact')}>
              <span className="aj-footer-heading">Contact</span>
              <button className="aj-footer-toggle">
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

          {/* Hours + Socials */}
          <div className="aj-footer-col aj-footer-hours">
            <div className="aj-footer-heading-wrapper" onClick={() => toggleSection('hours')}>
              <span className="aj-footer-heading">Hours</span>
              <button className="aj-footer-toggle">
                <ChevronDown size={16} className={`aj-toggle-icon ${openSection === 'hours' ? 'open' : ''}`} />
              </button>
            </div>
            <ul className={`aj-footer-contact-list ${openSection === 'hours' ? 'open' : ''}`}>
              <li>
                <Clock size={15} />
                <span>{hours}</span>
              </li>
            </ul>
            <div className="aj-footer-socials">
              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label} className="aj-footer-social-btn">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="aj-footer-bottom">
          <p className="aj-footer-copyright">
            © {year} Forgentis Fabrications. All rights reserved.
          </p>
          <div className="aj-footer-bottom-links">
            <a href="#">Careers</a>
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