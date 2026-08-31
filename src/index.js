import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AboutMe from "./view/AboutMe";
import FeaturePage from "./view/FeaturePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/feature" element={<FeaturePage />} />
      <Route path="/about" element={<AboutMe />} />
    </Routes>
  </BrowserRouter>
);
