import { useState } from "react";
import { motion } from "motion/react";
import "../css/Settingscard.css";

const LANGUAGES = ["Indonesia", "English", "Other"];

export default function SettingsCard() {
  const [duration, setDuration] = useState("");
  const [language, setLanguage] = useState(LANGUAGES[0]);

  return (
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
          {LANGUAGES.map((lang) => (
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

      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="cta-btn">
        Make It!
      </motion.button>

      <p className="cta-hint">Processing usually takes under 30 seconds</p>
    </div>
  );
}
