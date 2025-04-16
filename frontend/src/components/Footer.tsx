import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Careers', path: '/careers' },
      { name: 'Press', path: '/press' },
    ],
    support: [
      { name: 'FAQ', path: '/faq' },
      { name: 'Help Center', path: '/help' },
      { name: 'Contact Us', path: '/contact' },
    ],
    legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Cookie Preferences', path: '/cookies' },
    ],
  };

  const socialLinks = [
    { icon: <FaFacebookF size={20} />, url: 'https://facebook.com' },
    { icon: <FaTwitter size={20} />, url: 'https://twitter.com' },
    { icon: <FaInstagram size={20} />, url: 'https://instagram.com' },
    { icon: <FaYoutube size={20} />, url: 'https://youtube.com' },
  ];

  return (
    <footer className="bg-black text-gray-400 py-12 mt-auto">
      <div className="container mx-auto px-4">
        {/* Social Media Links */}
        <div className="flex items-center space-x-6 mb-8">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-sm border-t border-gray-800 pt-8">
          <p>© {currentYear} STREAMFLIX. All rights reserved.</p>
          <p className="mt-2">
            STREAMFLIX is a demo streaming service created for educational purposes.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 