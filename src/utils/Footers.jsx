import "../css/Footers.css";
import { motion } from "motion/react";
import { Logo } from "./Icon";

const LINK_GROUPS = {
  Product: ["Features", "How it Works", "Pricing", "Changelog"],
  Company: ["About Us", "Blog", "Careers", "Press"],
  Support: ["Help Center", "Contact", "Privacy Policy", "Terms of Service"],
};

const SOCIAL_LINKS = [
  {
    label: "Twitter",
    path: "M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 16 2a4.48 4.48 0 0 0-4.48 4.48c0 .35.04.7.1 1.02A12.72 12.72 0 0 1 2.8 3.9s-4 9 5 13a11 11 0 0 1-6.8 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z",
  },
  {
    label: "GitHub",
    path: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22",
  },
  {
    label: "LinkedIn",
    path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  },
];

const LEGAL_LINKS = ["Privacy", "Terms", "Cookies"];

function SocialLink({ label, path }) {
  return (
    <motion.a
      href="#"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      title={label}
      className="footer-social-link"
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="footer-social-icon"
      >
        <path d={path} />
      </svg>
    </motion.a>
  );
}

function FooterLinkGroup({ category, items }) {
  return (
    <div>
      <p className="footer-links-title">{category}</p>
      <ul className="footer-links-list">
        {items.map((item) => (
          <li key={item}>
            <motion.a href="#" whileHover={{ x: 3 }} className="footer-links-item">
              {item}
            </motion.a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footers() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-brand-header">
              <Logo />
              <span className="footer-brand-name">Candelay</span>
            </div>

            <p className="footer-brand-desc">
              Turn your documents into podcasts instantly. Upload a PDF and let AI do the talking.
            </p>

            <div className="footer-social">
              {SOCIAL_LINKS.map((social) => (
                <SocialLink key={social.label} {...social} />
              ))}
            </div>
          </div>

          <div className="footer-links">
            {Object.entries(LINK_GROUPS).map(([category, items]) => (
              <FooterLinkGroup key={category} category={category} items={items} />
            ))}
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} Candelay. All rights reserved. Made by{" "}
            <span className="footer-copy-name">Hands Sabastian</span>
          </p>
          <div className="footer-bottom-links">
            {LEGAL_LINKS.map((item) => (
              <a key={item} href="#" className="footer-bottom-link">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}