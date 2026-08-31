import "./App.css";
import { useState } from "react";
import Navigation from "./utils/navigation";
import Footers from "./utils/Footers";
import AnimatedBackground from "./utils/AnimatedBackground";
import { motion } from "motion/react";
import TutorialAnimation from "./TutorialAnimation";
import FaqSection from "./utils/FaqSection";

function App() {
  const [duration, setDuration] = useState("");
  const [language, setLanguage] = useState("Indonesia");
  const [fileName, setFileName] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const languages = ["Indonesia", "English", "Other"];

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  };

  return (
    <div>
      <div className="app-wrapper">
        <AnimatedBackground />
        <Navigation />

        <section className="hero">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="hero-title"
          >
            From Pages to{" "}
            <sp an className="hero-title-gradient">
              Podcast
            </sp>
            <br />
            in Seconds.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hero-subtitle"
          >
            Drop any PDF and we'll transform it into a natural-sounding audio
            experience — no editing required.
          </motion.p>
        </section>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="cards-container"
        >
          <label htmlFor="file-upload" className="upload-label">
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="upload-card"
            >
              <div className="upload-icon-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  fill="none"
                  stroke="#555"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>

              {fileName ? (
                <div className="upload-filename">
                  <p>{fileName}</p>
                  <p>Click to change file</p>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <p>Drop your PDF here</p>
                  <p>or click to browse</p>
                </div>
              )}

              <motion.div
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                className="upload-btn"
              >
                Upload
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="13"
                  height="13"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="19" x2="12" y2="5" />
                  <polyline points="5,12 12,5 19,12" />
                </svg>
              </motion.div>
            </motion.div>
            <input
              id="file-upload"
              type="file"
              accept=".pdf"
              onChange={handleFile}
              className="file-input-hidden"
            />
          </label>

          <div className="settings-card">
            <div className="field-group">
              <span className="field-label">Duration</span>
              <input
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 30"
                className="field-input"
              />
            </div>

            <div className="divider" />

            <div className="field-group">
              <span className="field-label">Language</span>
              <div className="language-group">
                {languages.map((lang) => (
                  <motion.button
                    key={lang}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => setLanguage(lang)}
                    className={`lang-btn ${language === lang ? "active" : "inactive"}`}
                  >
                    {lang}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="divider" />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="cta-btn"
            >
              Make It!
            </motion.button>

            <p className="cta-hint">
              Processing usually takes under 30 seconds
            </p>
          </div>
        </motion.div>
      </div>

      <TutorialAnimation />
      <FaqSection />       
      <Footers />
    </div>
  );
}

export default App;
