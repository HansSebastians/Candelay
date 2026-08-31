import { useState } from "react";
import { motion } from "motion/react";
import "../css/FaqSection.css";

const FAQ_ITEMS = [
  {
    q: "Format PDF apa yang didukung?",
    a: "Semua PDF standar termasuk teks dan gambar.",
  },
  {
    q: "Apakah file aman?",
    a: "File hanya diproses sementara dan tidak disimpan.",
  },
  {
    q: "Berapa ukuran maksimal?",
    a: "Maksimal 50MB.",
  },
  {
    q: "Apakah gratis?",
    a: "Ya, tersedia versi gratis dan premium.",
  },
];

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <section className="faq-section">
      <h2 className="section-title-faq">FAQ</h2>

      <div className="faq-list">
        {FAQ_ITEMS.map((item, i) => (
          <div
            key={i}
            className={`faq-item ${openFaq === i ? "open" : ""}`}
            onClick={() => setOpenFaq(openFaq === i ? null : i)}
          >
            <div className="faq-q">
              <span>{item.q}</span>
              <span>{openFaq === i ? "−" : "+"}</span>
            </div>

            <motion.div
              initial={false}
              animate={{
                height: openFaq === i ? "auto" : 0,
                opacity: openFaq === i ? 1 : 0,
              }}
              className="faq-a"
            >
              <p>{item.a}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
