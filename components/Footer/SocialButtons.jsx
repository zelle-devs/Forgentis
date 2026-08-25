'use client';

import { BsFacebook, BsInstagram, BsLinkedin, BsYoutube } from 'react-icons/bs';
import './SocialButtons.css';

const DEFAULT_SOCIALS = [
  { icon: BsLinkedin, href: '#', label: 'LinkedIn', social: 'linkedin' },
  { icon: BsInstagram, href: '#', label: 'Instagram', social: 'instagram' },
  { icon: BsFacebook, href: '#', label: 'Facebook', social: 'facebook' },
  { icon: BsYoutube, href: '#', label: 'YouTube', social: 'youtube' },
];

export default function SocialButtons({ socials = DEFAULT_SOCIALS }) {
  return (
    <ul className="sbtn-list">
      {socials.map(({ icon: Icon, href, label, social }) => (
        <li key={label} className="sbtn-icon-content" data-social={social}>
          <a
            data-social={social}
            aria-label={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="sbtn-filled"></div>
            <Icon size={22} />
          </a>
          {/* <div className="sbtn-tooltip">{label}</div> */}
        </li>
      ))}
    </ul>
  );
}