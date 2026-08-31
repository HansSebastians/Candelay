import "./TutorialAnimation.css";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

const STEPS = [
  {
    num: "1",
    title: "Upload Your PDF",
    desc: "Drag and drop or click Browse to select a file.",
  },
  {
    num: "2",
    title: "Set duration & language",
    desc: "Specify the audio duration and narration language.",
  },
  {
    num: "3",
    title: "Download & enjoy it",
    desc: "The MP3 audio is ready in less than 30 seconds.",
  },
];

const STEP_DURATION_MS = 5000;
const STEP_TICK_MS = 50;

const LANGUAGES = ["Indonesia", "English", "Other"];

const DEMO_FILE = { name: "laporan_q3.pdf", size: "2.4 MB" };
const DEMO_AUDIO = { name: "laporan_q3.mp3", duration: "30 menit", language: "Bahasa Indonesia" };

const SCENE_UPLOAD_TIMING = {
  hoverDelay: 600,
  uploadStartDelay: 1400,
  uploadTickMs: 40,
  uploadStep: 4,
  doneDelay: 300,
};

const SCENE_SETTINGS_TIMING = {
  typingStartDelay: 500,
  typingTickMs: 180,
  langSelectDelay: 1400,
  ctaLoadingDelay: 2400,
  ctaDoneDelay: 4200,
  durationTarget: "30",
};

const SCENE_DONE_TIMING = {
  popDelay: 300,
  popDuration: 400,
  fillStartDelay: 800,
  fillTickMs: 40,
  fillStep: 1.2,
  fillMax: 65,
};

function FileIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7B5EA7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function UploadArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5,12 12,5 19,12" />
    </svg>
  );
}

function CheckIcon({ color = "#4fc4a1", size = 12, strokeWidth = 2.5 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
      <polygon points="5,3 19,12 5,21" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4fc4a1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function useSceneTimers(playing, setup) {
  useEffect(() => {
    if (!playing) return;

    const timeoutIds = [];
    const intervalIds = [];

    const after = (delay, fn) => {
      const id = setTimeout(fn, delay);
      timeoutIds.push(id);
      return id;
    };

    const every = (delay, fn) => {
      const id = setInterval(fn, delay);
      intervalIds.push(id);
      return id;
    };

    setup({ after, every });

    return () => {
      timeoutIds.forEach(clearTimeout);
      intervalIds.forEach(clearInterval);
    };
  }, [playing]);
}

function SceneUpload({ playing }) {
  const [phase, setPhase] = useState("idle");
  const [uploadPct, setUploadPct] = useState(0);

  useSceneTimers(playing, ({ after, every }) => {
    setPhase("idle");
    setUploadPct(0);

    after(SCENE_UPLOAD_TIMING.hoverDelay, () => setPhase("hover"));

    after(SCENE_UPLOAD_TIMING.uploadStartDelay, () => {
      setPhase("uploading");
      let value = 0;
      const intervalId = every(SCENE_UPLOAD_TIMING.uploadTickMs, () => {
        value = Math.min(value + SCENE_UPLOAD_TIMING.uploadStep, 100);
        setUploadPct(value);
        if (value >= 100) {
          clearInterval(intervalId);
          after(SCENE_UPLOAD_TIMING.doneDelay, () => setPhase("done"));
        }
      });
    });
  });

  const isDone = phase === "done";
  const isUploading = phase === "uploading";
  const isHover = phase === "hover";

  return (
    <div className={`tut-dropzone ${isHover || isUploading ? "tut-dz-hover" : ""} ${isDone ? "tut-dz-done" : ""}`}>
      <motion.div className="tut-dz-icon" animate={{ scale: isHover ? 1.08 : 1 }} transition={{ duration: 0.3 }}>
        <FileIcon />
      </motion.div>

      <p className="tut-dz-title">{isDone ? "File successfully uploaded!" : "Report_file.pdf"}</p>

      {!isUploading && !isDone && <p className="tut-dz-sub">or click to browse</p>}

      {!isUploading && !isDone && (
        <div className="tut-dz-btn">
          <UploadArrowIcon />
          Upload
        </div>
      )}

      {isUploading && (
        <div className="tut-up-progress">
          <div className="tut-up-bar">
            <div className="tut-up-fill" style={{ width: `${uploadPct}%` }} />
          </div>
          <p className="tut-up-text">Uploading... {uploadPct}%</p>
        </div>
      )}

      {isDone && (
        <motion.div className="tut-file-chip" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
          <CheckIcon />
          {DEMO_FILE.name} · {DEMO_FILE.size}
        </motion.div>
      )}
    </div>
  );
}

function SceneSettings({ playing }) {
  const [durationValue, setDurationValue] = useState("");
  const [selectedLangIndex, setSelectedLangIndex] = useState(null);
  const [ctaState, setCtaState] = useState("idle");

  useSceneTimers(playing, ({ after, every }) => {
    setDurationValue("");
    setSelectedLangIndex(null);
    setCtaState("idle");

    after(SCENE_SETTINGS_TIMING.typingStartDelay, () => {
      let i = 0;
      const intervalId = every(SCENE_SETTINGS_TIMING.typingTickMs, () => {
        setDurationValue((v) => v + SCENE_SETTINGS_TIMING.durationTarget[i++]);
        if (i >= SCENE_SETTINGS_TIMING.durationTarget.length) clearInterval(intervalId);
      });
    });

    after(SCENE_SETTINGS_TIMING.langSelectDelay, () => setSelectedLangIndex(0));
    after(SCENE_SETTINGS_TIMING.ctaLoadingDelay, () => setCtaState("loading"));
    after(SCENE_SETTINGS_TIMING.ctaDoneDelay, () => setCtaState("done"));
  });

  return (
    <div className="tut-settings">
      <div className="tut-sm-field">
        <p className="tut-sm-label">Duration (minute)</p>
        <div className={`tut-sm-input ${durationValue ? "tut-sm-typing" : ""}`}>
          {durationValue || <span style={{ opacity: 0.3 }}>e.g. 30</span>}
        </div>
      </div>

      <div className="tut-sm-field">
        <p className="tut-sm-label">Language</p>
        <div className="tut-sm-langs">
          {LANGUAGES.map((lang, i) => (
            <div key={lang} className={`tut-sm-lang ${selectedLangIndex === i ? "tut-sm-lang-sel" : ""}`}>
              {lang}
            </div>
          ))}
        </div>
      </div>

      <div className={`tut-sm-cta ${ctaState === "loading" ? "tut-sm-loading" : ""} ${ctaState === "done" ? "tut-sm-done" : ""}`}>
        {ctaState === "idle" && "Make It!"}
        {ctaState === "loading" && "uploading..."}
        {ctaState === "done" && "✓ Finished!"}
      </div>
    </div>
  );
}

function SceneDone({ playing }) {
  const [isPopping, setIsPopping] = useState(false);
  const [fillPct, setFillPct] = useState(0);

  useSceneTimers(playing, ({ after, every }) => {
    setIsPopping(false);
    setFillPct(0);

    after(SCENE_DONE_TIMING.popDelay, () => {
      setIsPopping(true);
      after(SCENE_DONE_TIMING.popDuration, () => setIsPopping(false));
    });

    after(SCENE_DONE_TIMING.fillStartDelay, () => {
      let value = 0;
      const intervalId = every(SCENE_DONE_TIMING.fillTickMs, () => {
        value = Math.min(value + SCENE_DONE_TIMING.fillStep, SCENE_DONE_TIMING.fillMax);
        setFillPct(value);
        if (value >= SCENE_DONE_TIMING.fillMax) clearInterval(intervalId);
      });
    });
  });

  return (
    <div className="tut-done">
      <motion.div
        className="tut-check-circle"
        animate={{ scale: isPopping ? 1.18 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        <CheckIcon size={28} strokeWidth={2.5} />
      </motion.div>

      <p className="tut-done-title">Audio ready for download!</p>
      <p className="tut-done-sub">
        {DEMO_AUDIO.name} · {DEMO_AUDIO.duration} · {DEMO_AUDIO.language}
      </p>

      <div className="tut-done-player">
        <div className="tut-dp-play">
          <PlayIcon />
        </div>
        <div className="tut-dp-info">
          <div className="tut-dp-track">
            <div className="tut-dp-fill" style={{ width: `${fillPct}%` }} />
          </div>
        </div>
      </div>

      <div className="tut-dl-btn">
        <DownloadIcon />
        Unduh MP3
      </div>
    </div>
  );
}

const SCENE_COMPONENTS = [SceneUpload, SceneSettings, SceneDone];

function useAutoAdvanceStep(stepCount) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);

  const stopTimer = () => clearInterval(timerRef.current);

  const startTimer = useCallback(() => {
    stopTimer();
    setProgress(0);
    timerRef.current = setInterval(() => {
      setProgress((value) => {
        const next = value + STEP_TICK_MS;
        if (next >= STEP_DURATION_MS) {
          stopTimer();
          return STEP_DURATION_MS;
        }
        return next;
      });
    }, STEP_TICK_MS);
  }, []);

  useEffect(() => {
    if (progress >= STEP_DURATION_MS) {
      setStep((s) => (s + 1) % stepCount);
    }
  }, [progress, stepCount]);

  useEffect(() => {
    startTimer();
    return stopTimer;
  }, [step, startTimer]);

  const goToStep = (index) => {
    stopTimer();
    setProgress(0);
    setStep(index);
  };

  return { step, goToStep };
}

function StepNavItem({ stepInfo, isActive, onSelect }) {
  return (
    <motion.div
      className={`tut-snav ${isActive ? "tut-snav-active" : ""}`}
      onClick={onSelect}
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className={`tut-snav-num ${isActive ? "tut-snav-num-active" : ""}`}>{stepInfo.num}</div>
      <div className="tut-snav-text">
        <h4>{stepInfo.title}</h4>
        <div className="tut-snav-text">{stepInfo.desc}</div>
      </div>
    </motion.div>
  );
}

export default function TutorialAnimation() {
  const { step, goToStep } = useAutoAdvanceStep(STEPS.length);
  const ActiveScene = SCENE_COMPONENTS[step];

  return (
    <div className="how-to-use">
      <div className="tut-wrap">
        <div className="tut-left">
          <h2 className="tut-heading">Three steps, audio ready.</h2>
          <p className="tut-sub">
            See firsthand how it works from uploading to having the audio ready to listen to.
          </p>

          <div className="tut-steps-nav">
            {STEPS.map((stepInfo, i) => (
              <StepNavItem
                key={stepInfo.num}
                stepInfo={stepInfo}
                isActive={step === i}
                onSelect={() => goToStep(i)}
              />
            ))}
          </div>

          <div className="tut-dots">
            {STEPS.map((stepInfo, i) => (
              <div
                key={stepInfo.num}
                className={`tut-dot ${step === i ? "tut-dot-active" : ""}`}
                onClick={() => goToStep(i)}
              />
            ))}
          </div>
        </div>

        <div className="tut-right">
          <div className="tut-screen">
            <div className="tut-screen-bar">
              <div className="tut-sdot" style={{ background: "#ff5f57" }} />
              <div className="tut-sdot" style={{ background: "#febc2e" }} />
              <div className="tut-sdot" style={{ background: "#28c840" }} />
            </div>

            <div className="tut-screen-body">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.28 }}
                  style={{ width: "100%" }}
                >
                  <ActiveScene playing={true} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}