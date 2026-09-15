import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";

import Home from "./pages/Home";
import BiteWise from "./pages/projects/BiteWise";
import Zeuty from "./pages/projects/Zeuty";
import GDGCommandHub from "./pages/projects/GDGCommandHub";
import GECAI from "./pages/projects/GECAI";
import ConnectFour from "./pages/projects/ConnectFour";

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/projects/gdg-command-hub"
            element={<GDGCommandHub />}
          />
          <Route path="/projects/gec-ai" element={<GECAI />} />
          <Route
            path="/projects/connect-four-ai"
            element={<ConnectFour />}
          />

          <Route path="/projects/bitewise" element={<BiteWise />} />
          <Route path="/projects/zeuty" element={<Zeuty />} />
        </Routes>

        <footer className="border-t border-white/10 py-10 text-center text-sm text-zinc-500">
          © {new Date().getFullYear()} Khushi Patel. Built with React + Tailwind.
        </footer>
      </BrowserRouter>
    </div>
  );
}