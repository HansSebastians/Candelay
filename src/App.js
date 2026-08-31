import "./App.css";
import Navigation from "./utils/navigation";
import Footers from "./utils/Footers";
import AnimatedBackground from "./utils/AnimatedBackground";
import TutorialAnimation from "./utils/TutorialAnimation";
import FaqSection from "./utils/FaqSection";
import HeroUpload from "./utils/HeroUpload";

export default function App() {
  return (
    <div>
      <div className="app-wrapper">
        <AnimatedBackground />
        <Navigation />
        <HeroUpload />
      </div>

      <TutorialAnimation />
      <FaqSection />
      <Footers />
    </div>
  );
}