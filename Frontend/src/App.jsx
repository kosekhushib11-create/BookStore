
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./home/Home";
import Courses from "./courses/Courses";
import Signup from "./components/Signup";
import Contact from "./components/Contact";
import About from "./components/About";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="dark:bg-slate-900 dark:text-white min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course" element={<Courses />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Toaster position="top-right" />
    </div>
  );
}

export default App;
