import { motion } from "motion/react";

const Footers = () => {
  const links = {
    Product: ["Features", "How it Works", "Pricing", "Changelog"],
    Company: ["About Us", "Blog", "Careers", "Press"],
    Support: ["Help Center", "Contact", "Privacy Policy", "Terms of Service"],
  };

  return (
    <footer style={{ backgroundColor: "#0a0a0a", color: "white", padding: "72px 0 0" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 40px" }}>

        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "48px", paddingBottom: "56px" }}>

          <div style={{ maxWidth: "280px" }}>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <svg width="46" height="36" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="f_bar" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%"   stopColor="#c44dff"/>
                    <stop offset="50%"  stopColor="#7b2ff7"/>
                    <stop offset="100%" stopColor="#00c6ff"/>
                  </linearGradient>
                </defs>
                <rect x="0"  y="10" width="3.2" height="8"  rx="1.6" fill="url(#f_bar)"/>
                <rect x="5"  y="6"  width="3.2" height="16" rx="1.6" fill="url(#f_bar)"/>
                <rect x="10" y="2"  width="3.2" height="24" rx="1.6" fill="url(#f_bar)"/>
                <rect x="15" y="0"  width="3.2" height="28" rx="1.6" fill="url(#f_bar)"/>
                <rect x="20" y="2"  width="3.2" height="24" rx="1.6" fill="url(#f_bar)"/>
                <rect x="25" y="6"  width="3.2" height="16" rx="1.6" fill="url(#f_bar)"/>
                <rect x="30" y="10" width="3.2" height="8"  rx="1.6" fill="url(#f_bar)"/>
              </svg>

              <span style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "20px",
                fontWeight: "700",
                background: "linear-gradient(90deg, #c44dff, #7b2ff7, #00c6ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Candelay
              </span>
            </div>

            <p style={{ fontSize: "14px", color: "#aaa", lineHeight: "1.7", margin: "0 0 24px" }}>
              Turn your documents into podcasts instantly. Upload a PDF and let AI do the talking.
            </p>

            <div style={{ display: "flex", gap: "10px" }}>
              {[
                { label: "Twitter", path: "M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 16 2a4.48 4.48 0 0 0-4.48 4.48c0 .35.04.7.1 1.02A12.72 12.72 0 0 1 2.8 3.9s-4 9 5 13a11 11 0 0 1-6.8 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" },
                { label: "GitHub", path: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" },
                { label: "LinkedIn", path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" },
              ].map(({ label, path }) => (
                <motion.a
                  key={label}
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title={label}
                  style={{
                    width: "36px", height: "36px",
                    borderRadius: "9px",
                    backgroundColor: "#141414",
                    border: "1px solid #222",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    textDecoration: "none",
                  }}
                  onMouseEnter={e => e.currentTarget.querySelector("svg").style.stroke = "#fff"}
                  onMouseLeave={e => e.currentTarget.querySelector("svg").style.stroke = "#666"}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                    stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    style={{ transition: "stroke 0.2s" }}>
                    <path d={path}/>
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: "64px", flexWrap: "wrap" }}>
            {Object.entries(links).map(([category, items]) => (
              <div key={category}>
                <p style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#555",
                  letterSpacing: "1.2px",
                  textTransform: "uppercase",
                  margin: "0 0 16px",
                }}>
                  {category}
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                  {items.map(item => (
                    <li key={item}>
                      <motion.a
                        href="#"
                        whileHover={{ x: 3 }}
                        style={{
                          fontSize: "14px",
                          color: "white",
                          textDecoration: "none",
                          display: "inline-block",
                          transition: "opacity 0.2s",
                        }}
                        onMouseEnter={e => e.currentTarget.style.opacity = "0.6"}
                        onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                      >
                        {item}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: "1px", backgroundColor: "#1a1a1a" }} />

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "24px 0",
          flexWrap: "wrap",
          gap: "12px",
        }}>
          <p style={{ fontSize: "13px", color: "#555", margin: 0 }}>
            © {new Date().getFullYear()} Candelay. All rights reserved. Made by{" "}
            <span style={{ color: "white", fontWeight: "500" }}>Hands Sabastian</span>
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            {["Privacy", "Terms", "Cookies"].map(item => (
              <a
                key={item}
                href="#"
                style={{ fontSize: "13px", color: "white", textDecoration: "none", transition: "opacity 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.opacity = "0.5"}
                onMouseLeave={e => e.currentTarget.style.opacity = "1"}
              >
                {item}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footers;