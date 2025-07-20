import Link from 'next/link';
import React from 'react';
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';

// Data for social links - easier to manage
const socialLinks = [
  {
    name: 'GitHub',
    icon: FaGithub,
    url: 'https://github.com/yourprofile',
  },
  {
    name: 'Email',
    icon: FaEnvelope,
    url: 'mailto:abdullahmukadam21@gmail.com',
  },
  {
    name: 'Twitter',
    icon: FaTwitter,
    url: 'https://twitter.com/yourprofile',
  },
  {
    name: 'LinkedIn',
    icon: FaLinkedin,
    url: 'https://linkedin.com/in/yourprofile',
  },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white font-brcolage-grotesque p-6 rounded-2xl md:px-8 md:py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-y-6 md:gap-x-4">
        
        {/* Left Side: Brand and Copyright */}
        <div className="text-center md:text-left">
          <h2 className="font-bold text-2xl">Editta</h2>
          <p className="text-sm text-gray-400 mt-1">
            &copy; {new Date().getFullYear()} Editta. All rights reserved.
          </p>
        </div>

        {/* Center: Legal Links */}
        <nav className="flex gap-x-6">
          <Link href="/terms" className="text-sm hover:text-gray-300 transition-colors duration-300">
            Terms & Conditions
          </Link>
          <Link href="/privacy" className="text-sm hover:text-gray-300 transition-colors duration-300">
            Privacy Policy
          </Link>
        </nav>

        {/* Right Side: Social Media Icons */}
        <div className="flex items-center gap-x-5">
          {socialLinks.map((social) => (
            <Link
              key={social.name}
              href={social.url}
              aria-label={`Visit our ${social.name} page`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 transition-colors duration-300"
            >
              <social.icon size={22} />
            </Link>
          ))}
        </div>
        
      </div>
    </footer>
  );
}